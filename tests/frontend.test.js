import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const source = await readFile(new URL("../client.js", import.meta.url), "utf8");

// Offline contract harness: retain the real page handlers and shared stores,
// but represent host primitives as elements rather than simulating their DOM.
function harness(
  initial = {
    guides: { a: { name: "我的指南", text: "original" }, b: { name: "Other", text: "second" } },
    bindings: { provider: { missing: "a", occupied: "b" } },
  },
) {
  let stateIndex = 0;
  let states = [];
  const React = {
    Fragment: "Fragment",
    createElement: (type, props, ...children) => ({
      type,
      props: props ?? {},
      children: children.flat(Infinity),
    }),
    useMemo: (fn) => fn(),
    useRef: (current) => ({ current }),
    useEffect: () => {},
    useState: (initialState) => {
      const index = stateIndex++;
      if (!(index in states)) states[index] = initialState;
      return [
        states[index],
        (value) => {
          states[index] = typeof value === "function" ? value(states[index]) : value;
        },
      ];
    },
    useSyncExternalStore: (_, getSnapshot) => getSnapshot(),
  };
  let plugin;
  const primitives = Object.fromEntries(
    ["Button", "Input", "Modal", "Menu", "Checkbox"].map((name) => [name, name]),
  );
  vm.runInNewContext(source, {
    window: {
      __ModuleLoader__: {
        load: ({ factory }) => {
          plugin = factory((id) => (id === "react" ? React : primitives));
        },
      },
    },
    structuredClone,
    document: { createElement: () => ({ dataset: {}, remove() {} }), head: { append() {} } },
    console,
  });
  let snapshot = {
    status: "ready",
    writable: true,
    revision: 1,
    value: { data: structuredClone(initial) },
  };
  let language = "en";
  let dictionaries;
  let page;
  let injected;
  let mutation = async () => true;
  const calls = [];
  const events = {};
  let refresh = Promise.resolve();
  let refreshError = null;
  const mirror = {
    ensure: () => refresh,
    getSnapshot: () => ({ error: refreshError }),
    subscribe: () => () => {},
  };
  let catalogReply = {
    ok: true,
    value: {
      groups: [
        {
          id: "provider",
          name: "Provider",
          models: [
            { id: "available", name: "Available" },
            { id: "occupied", name: "Occupied" },
          ],
        },
      ],
      failures: [],
    },
  };
  const locale = {
    register: (_, dicts) => {
      dictionaries = dicts;
      return () => {};
    },
    bind:
      () =>
      (key, params = {}) =>
        dictionaries[language][key].replace(/\{(\w+)\}/g, (_, name) => String(params[name])),
    getSnapshot: () => ({ active: language }),
    subscribe: () => () => {},
  };
  const form = {
    getSnapshot: () => snapshot,
    subscribe: () => () => {},
    mutate: async (operations, revision) => {
      calls.push({ operations, revision });
      return mutation(operations, revision);
    },
  };
  plugin.apply({
    locale,
    configForms: {
      describe: () => mirror,
      get: (id) => {
        assert.equal(id, "local-model-guidance");
        return form;
      },
    },
    effect: (fn) => fn(),
    remote: {
      session: { modelCatalog: async () => catalogReply },
      $on: (event, fn) => {
        events[event] = fn;
        return () => {};
      },
    },
    on: (event, fn) => {
      const previous = events[event];
      events[event] = () => Promise.all([previous?.(), fn()]);
      return () => {};
    },
    slots: {
      inject: (_, fn) => fn(),
      register: (entry, component) => {
        if (entry.name === "main") {
          page = component;
          injected = entry.inject();
        }
      },
    },
  });
  const render = () => {
    stateIndex = 0;
    return page(injected);
  };
  const walk = (root) => {
    if (!root || typeof root !== "object") return [];
    return [
      root,
      ...root.children.flatMap(walk),
      ...[root.props.footer, root.props.anchor, root.props.label].flatMap(walk),
    ];
  };
  const nodes = () => walk(render());
  const find = (predicate) => {
    const node = nodes().find(predicate);
    assert.ok(node, "Expected UI element");
    return node;
  };
  return {
    calls,
    events,
    render,
    nodes,
    find,
    store: injected.guidanceStore,
    catalog: injected.catalog,
    holdRefresh: () => {
      let settle;
      refresh = new Promise((resolve) => {
        settle = resolve;
      });
      return (error = null) => {
        refreshError = error;
        settle();
      };
    },
    setLanguage: (next) => {
      language = next;
    },
    setSnapshot: (patch) => {
      snapshot = { ...snapshot, ...patch };
    },
    setMutation: (fn) => {
      mutation = fn;
    },
    setCatalog: (reply) => {
      catalogReply = reply;
    },
    remount: () => {
      states = [];
    },
    edit: (value, id = "dmg-guide-text") =>
      find((node) => node.props.id === id).props.onChange({ target: { value } }),
    click: (text) =>
      find((node) => node.type === "Button" && node.children.includes(text)).props.onClick(),
    tick: () => new Promise((resolve) => setImmediate(resolve)),
  };
}

test("draft survives page remount, marks only changed guides, and clears on reverting", () => {
  const app = harness();
  app.edit("changed");
  assert.equal(app.store.getSnapshot().draft.data.guides.a.text, "changed");
  assert.equal(app.nodes().filter((node) => node.props.className === "dmg-dirty").length, 1);
  app.remount();
  assert.equal(app.find((node) => node.props.id === "dmg-guide-text").props.value, "changed");
  app.edit("original");
  assert.equal(app.store.getSnapshot().draft, null);
});

test("new guide followed by delete is not dirty; editor owns the delete menu", () => {
  const app = harness();
  app.click("New");
  const menu = app.find((node) => node.type === "Menu");
  assert.equal(JSON.stringify(menu.props.items.map((item) => item.id)), '["delete"]');
  menu.props.onSelect("delete");
  assert.notEqual(app.store.getSnapshot().draft, null);
  app.click("Delete guide");
  assert.equal(app.store.getSnapshot().draft, null);
});

test("binding transfers require confirmation and mark both guides; missing models can unbind", async () => {
  const app = harness();
  await app.tick();
  app.click("Select models");
  const checkboxes = app.nodes().filter((node) => node.type === "Checkbox");
  const occupied = checkboxes.find((node) => JSON.stringify(node.props.label).includes("Occupied"));
  occupied.props.onChange(true);
  assert.equal(app.store.getSnapshot().draft, null);
  app.click("Move binding");
  assert.equal(app.store.getSnapshot().draft.data.bindings.provider.occupied, "a");
  assert.equal(app.nodes().filter((node) => node.props.className === "dmg-dirty").length, 2);
  app.find((node) => node.props["aria-label"] === "Unbind missing").props.onClick();
  assert.equal(app.store.getSnapshot().draft.data.bindings.provider.missing, undefined);
});

test("locale updates all chrome without translating guide text or names", () => {
  const app = harness();
  app.edit("user authored 中文");
  app.setLanguage("zh");
  assert.ok(app.nodes().some((node) => node.children.includes("保存全部")));
  assert.equal(app.find((node) => node.props.id === "dmg-guide-name").props.value, "我的指南");
  assert.equal(
    app.find((node) => node.props.id === "dmg-guide-text").props.value,
    "user authored 中文",
  );
});

test("conflict requires explicit overwrite and uses the reviewed revision", async () => {
  const app = harness();
  app.edit("local");
  app.setSnapshot({ revision: 2 });
  app.click("Overwrite latest with draft");
  assert.equal(app.calls.length, 0);
  const modal = app.find(
    (node) => node.type === "Modal" && node.props.title === "Overwrite the latest configuration?",
  );
  modal.props.footer.children[1].props.onClick();
  await app.tick();
  assert.equal(app.calls[0].revision, 2);
  assert.equal(app.calls[0].operations.length, 1);
  assert.equal(JSON.stringify(app.calls[0].operations[0].path), '["data"]');
  assert.equal(app.store.getSnapshot().draft, null);
});

test("a second change during confirmation prevents overwrite and retains draft", async () => {
  const app = harness();
  app.edit("local");
  app.setSnapshot({ revision: 2 });
  app.click("Overwrite latest with draft");
  const modal = app.find(
    (node) => node.type === "Modal" && node.props.title === "Overwrite the latest configuration?",
  );
  app.setSnapshot({ revision: 3 });
  modal.props.footer.children[1].props.onClick();
  await app.tick();
  assert.equal(app.calls.length, 0);
  assert.equal(app.store.getSnapshot().draft.data.guides.a.text, "local");
  app.click("Load latest");
  assert.equal(app.store.getSnapshot().draft, null);
});

test("save rejection and exception retain draft; read-only prevents edits", async () => {
  const app = harness();
  app.edit("local");
  app.setMutation(async () => false);
  app.click("Save all");
  await app.tick();
  assert.equal(app.store.getSnapshot().draft.data.guides.a.text, "local");
  app.setMutation(async () => {
    throw new Error("offline");
  });
  app.click("Save all");
  await app.tick();
  assert.equal(app.store.getSnapshot().saving, false);
  assert.equal(app.store.getSnapshot().message.key, "saveFailed");
  app.setSnapshot({ writable: false });
  app.edit("blocked");
  assert.equal(app.store.getSnapshot().draft.data.guides.a.text, "local");
  assert.equal(app.find((node) => node.props.id === "dmg-guide-text").props.disabled, true);
});

test("same revision after reconnect cannot silently overwrite changed content", async () => {
  const app = harness();
  app.edit("local");
  app.setSnapshot({
    value: { data: { guides: { a: { name: "remote", text: "remote" } }, bindings: {} } },
  });
  app.click("Overwrite latest with draft");
  const modal = app.find(
    (node) => node.type === "Modal" && node.props.title === "Overwrite the latest configuration?",
  );
  app.setSnapshot({
    value: { data: { guides: { a: { name: "newer", text: "newer" } }, bindings: {} } },
  });
  modal.props.footer.children[1].props.onClick();
  await app.tick();
  assert.equal(app.calls.length, 0);
  assert.equal(app.store.getSnapshot().draft.data.guides.a.text, "local");
});

test("reset blocks stale ready edits and saves until the host refresh settles", async () => {
  const app = harness();
  app.edit("local");
  const staleSave = app.find((node) => node.type === "Button" && node.children.includes("Save all"))
    .props.onClick;
  const finish = app.holdRefresh();
  const resetting = app.events["connection/reset"]();
  assert.equal(app.store.getSnapshot().refreshing, true);
  staleSave();
  app.edit("blocked");
  await app.tick();
  assert.equal(app.calls.length, 0);
  assert.equal(app.store.getSnapshot().draft.data.guides.a.text, "local");
  finish();
  await resetting;
  assert.equal(app.store.getSnapshot().refreshing, false);
  app.click("Save all");
  await app.tick();
  assert.equal(app.calls.length, 1);
});

test("failed reconnect refresh keeps draft locked until a successful reconnect", async () => {
  const app = harness();
  app.edit("local");
  const fail = app.holdRefresh();
  const first = app.events["connection/reset"]();
  fail("offline");
  await first;
  assert.equal(app.store.getSnapshot().refreshing, true);
  assert.equal(app.store.getSnapshot().refreshError, true);
  const recover = app.holdRefresh();
  const second = app.events["connection/reset"]();
  recover();
  await second;
  assert.equal(app.store.getSnapshot().refreshing, false);
  assert.equal(app.store.getSnapshot().draft.data.guides.a.text, "local");
});

test("catalog invalidations recover after failure without dropping rows or drafts", async () => {
  const app = harness();
  await app.tick();
  app.edit("local");
  app.setCatalog({ ok: false, error: { message: "offline" } });
  await app.events["llm/adapters-updated"]();
  assert.equal(app.catalog.getSnapshot().error, "offline");
  assert.equal(app.catalog.getSnapshot().groups.length, 1);
  app.setCatalog({ ok: true, value: { groups: [], failures: [] } });
  await app.events["connection/reset"]();
  assert.equal(app.catalog.getSnapshot().error, "");
  assert.equal(app.store.getSnapshot().draft.data.guides.a.text, "local");
  assert.ok(app.find((node) => node.props["aria-label"] === "Unbind missing"));
});
