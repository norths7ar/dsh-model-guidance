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
    [
      "Button",
      "Input",
      "Modal",
      "Checkbox",
      "IconPlusOutlineRegular",
      "IconCopyOutlineRegular",
      "IconTrashOutlineRegular",
      "IconQuestionOutlineRegular",
      "IconCloseOutlineRegular",
      "IconRefreshOutlineRegular",
    ].map((name) => [name, name]),
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
      const ok = await mutation(operations, revision);
      if (ok)
        snapshot = {
          ...snapshot,
          revision: snapshot.revision + 1,
          value: { data: structuredClone(operations[0].value) },
        };
      return ok;
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
      find(
        (node) =>
          (node.type === "Button" || node.type === "button") &&
          (node.children.includes(text) || node.props["aria-label"] === text),
      ).props.onClick(),
    tick: () => new Promise((resolve) => setImmediate(resolve)),
  };
}

function select(app, id) {
  app.store.update((previous) => ({ ...previous, selectedId: id }));
}

function changeDraft(app, change) {
  app.store.update((previous) => {
    const draft = structuredClone(previous.draft);
    change(draft.data);
    return { ...previous, draft };
  });
}

function confirmOverwrite(app) {
  const modal = app.find(
    (node) => node.type === "Modal" && node.props.title === "Overwrite the latest configuration?",
  );
  modal.props.footer.children
    .find((node) => node.children.includes("Overwrite latest with draft"))
    .props.onClick();
}

test("single deletion saves at the latest revision when content is unchanged", async () => {
  const app = harness();
  app.edit("A draft");
  select(app, "b");
  app.click("Delete “Other”");
  app.click("Delete prompt");
  app.setSnapshot({ revision: 2 });
  app.click("Save");
  await app.tick();
  assert.equal(app.calls.length, 1);
  assert.equal(app.calls[0].revision, 2);
  assert.equal(app.calls[0].operations[0].value.guides.b, undefined);
  assert.equal(app.store.getSnapshot().draft.data.guides.a.text, "A draft");
  app.setSnapshot({ revision: 4 });
  select(app, "a");
  app.click("Save");
  await app.tick();
  assert.equal(app.calls.length, 2);
  assert.equal(app.calls[1].revision, 4);
  assert.equal(app.store.getSnapshot().draft, null);
});

test("single saves preserve other text drafts and rebase the next save revision", async () => {
  const app = harness();
  app.edit("A changed");
  select(app, "b");
  app.edit("B changed");
  select(app, "a");
  app.click("Save");
  await app.tick();
  assert.equal(app.calls[0].operations[0].value.guides.b.text, "second");
  assert.equal(app.store.getSnapshot().draft.data.guides.b.text, "B changed");
  assert.equal(app.store.getSnapshot().draft.revision, 2);
  select(app, "b");
  app.click("Save");
  await app.tick();
  assert.equal(app.calls[1].revision, 2);
  assert.equal(app.store.getSnapshot().draft, null);
});

test("saving either route owner moves binding without saving the other's text", async () => {
  const app = harness();
  app.edit("A draft");
  changeDraft(app, (data) => {
    data.bindings.provider.occupied = "a";
    data.guides.b.text = "B draft";
  });
  app.click("Save");
  await app.tick();
  assert.equal(app.calls[0].operations[0].value.bindings.provider.occupied, "a");
  assert.equal(app.calls[0].operations[0].value.guides.b.text, "second");
  assert.equal(app.store.getSnapshot().draft.data.guides.b.text, "B draft");
});

test("new destination dependency is reachable and never implicitly saved with old owner", async () => {
  const app = harness();
  app.click("New");
  const id = app.store.getSnapshot().selectedId;
  changeDraft(app, (data) => {
    data.bindings.provider.missing = id;
  });
  select(app, "a");
  assert.equal(
    app.find((node) => node.type === "Button" && node.children.includes("Save")).props.disabled,
    true,
  );
  app.click("Save");
  assert.equal(app.calls.length, 0);
  app.find((node) => node.props.className === "dmg-dependency").props.onClick();
  assert.equal(app.store.getSnapshot().selectedId, id);
  app.click("Save");
  await app.tick();
  assert.equal(app.calls[0].operations[0].value.bindings.provider.missing, id);
  assert.equal(Object.keys(app.calls[0].operations[0].value.guides)[0], id);
  assert.equal(app.store.getSnapshot().draft, null);
});

test("discarding a transfer preserves another prompt's pending deletion", () => {
  const app = harness();
  app.edit("A draft");
  changeDraft(app, (data) => {
    delete data.guides.b;
    data.bindings.provider.occupied = "a";
  });
  app.click("Discard");
  const draft = app.store.getSnapshot().draft;
  assert.equal(draft.data.guides.a.text, "original");
  assert.equal(draft.data.guides.b, undefined);
  assert.equal(draft.data.bindings.provider.occupied, undefined);
  select(app, "b");
  assert.equal(
    app.find((node) => node.type === "Button" && node.children.includes("Save")).props.disabled,
    false,
  );
  app.click("Discard");
  assert.equal(app.store.getSnapshot().draft, null);
});

test("single delete overwrite removes remote-added routes to the deleted prompt", async () => {
  const app = harness();
  select(app, "a");
  app.edit("draft");
  const remote = structuredClone(app.store.getSnapshot().draft.base);
  remote.bindings.provider.extra = "a";
  changeDraft(app, (data) => {
    delete data.guides.a;
    delete data.bindings.provider.missing;
  });
  app.setSnapshot({ revision: 2, value: { data: remote } });
  app.click("Save");
  confirmOverwrite(app);
  await app.tick();
  assert.equal(app.calls[0].operations[0].value.guides.a, undefined);
  assert.equal(app.calls[0].operations[0].value.bindings.provider.extra, undefined);
});

test("single overwrite restores current route-only prompt without rolling back other remote text", async () => {
  const app = harness();
  app.edit("original");
  app.edit("temporary");
  changeDraft(app, (data) => {
    data.guides.a.text = "original";
    data.bindings.provider.occupied = "a";
  });
  const remote = structuredClone(app.store.getSnapshot().draft.base);
  delete remote.guides.a;
  delete remote.bindings.provider.missing;
  remote.guides.b.text = "remote B";
  app.setSnapshot({ revision: 2, value: { data: remote } });
  app.click("Save");
  confirmOverwrite(app);
  await app.tick();
  assert.equal(app.calls[0].operations[0].value.guides.a.text, "original");
  assert.equal(app.calls[0].operations[0].value.guides.b.text, "remote B");
  assert.equal(app.store.getSnapshot().draft, null);
});

test("remaining route-only draft retains missing owner for later independent save", async () => {
  const app = harness();
  app.edit("A changed");
  changeDraft(app, (data) => {
    data.bindings.provider.available = "b";
  });
  const remote = structuredClone(app.store.getSnapshot().draft.base);
  delete remote.guides.b;
  delete remote.bindings.provider.occupied;
  app.setSnapshot({ revision: 2, value: { data: remote } });
  app.click("Save");
  confirmOverwrite(app);
  await app.tick();
  assert.equal(app.calls[0].operations[0].value.guides.b, undefined);
  assert.equal(app.store.getSnapshot().draft.data.guides.b.text, "second");
  assert.equal(app.store.getSnapshot().draft.data.bindings.provider.available, "b");
});

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

test("new prompt followed by direct row deletion is not dirty", () => {
  const app = harness();
  app.click("New");
  app.find((node) => node.props["aria-label"] === "Delete “New prompt”").props.onClick();
  assert.notEqual(app.store.getSnapshot().draft, null);
  app.click("Delete prompt");
  assert.equal(app.store.getSnapshot().draft, null);
});

test("duplicating a custom prompt selects a new editable draft without copying bindings", async () => {
  const app = harness();
  app.find((node) => node.props["aria-label"] === "Duplicate").props.onClick();
  const { selectedId, draft } = app.store.getSnapshot();
  assert.notEqual(selectedId, "a");
  assert.equal(
    JSON.stringify(draft.data.guides[selectedId]),
    '{"name":"我的指南","text":"original"}',
  );
  assert.equal(JSON.stringify(draft.data.bindings), '{"provider":{"missing":"a","occupied":"b"}}');
  assert.equal(app.find((node) => node.props.id === "dmg-guide-text").props.value, "original");
  app.edit("copy changed");
  assert.equal(app.store.getSnapshot().draft.data.guides.a.text, "original");
  assert.equal(app.store.getSnapshot().draft.data.guides[selectedId].text, "copy changed");
  app.click("Save all");
  await app.tick();
  assert.equal(Object.keys(app.calls[0].operations[0].value.guides).length, 3);
});

test("built-in default is selectable and read only without custom controls or config data", () => {
  const app = harness({ guides: {}, bindings: {} });
  const text = app.find((node) => node.props.id === "dmg-guide-text");
  assert.equal(text.props.readOnly, true);
  assert.equal(text.props.disabled, false);
  assert.equal(text.props.onChange, undefined);
  assert.equal(text.props.value, "You are a coding agent powered by the {{model}} model.");
  assert.ok(!app.nodes().some((node) => node.props.id === "dmg-guide-name"));
  assert.ok(!app.nodes().some((node) => node.children.includes("Select models")));
  assert.ok(!app.nodes().some((node) => /^(Delete|Duplicate) “/.test(node.props["aria-label"])));
  assert.equal(app.store.getSnapshot().draft, null);
  app.click("New");
  assert.equal(Object.keys(app.store.getSnapshot().draft.data.guides).length, 1);
  const defaultRow = app.find((node) => node.type === "Button" && node.props.title === "Default");
  defaultRow.props.onClick();
  assert.equal(app.find((node) => node.props.id === "dmg-guide-text").props.readOnly, true);
  assert.ok(app.nodes().some((node) => node.children.includes("Save all")));
  assert.ok(!app.nodes().some((node) => node.type === "footer"));
});

test("binding transfers require confirmation and mark both guides; missing models can unbind", async () => {
  const app = harness();
  await app.tick();
  app.click("Applies to · 1");
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
  const remote = structuredClone(app.store.getSnapshot().draft.base);
  remote.guides.a.text = "remote";
  app.setSnapshot({ revision: 2, value: { data: remote } });
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
  const remote = structuredClone(app.store.getSnapshot().draft.base);
  remote.guides.a.text = "remote";
  app.setSnapshot({ revision: 2, value: { data: remote } });
  app.click("Overwrite latest with draft");
  const modal = app.find(
    (node) => node.type === "Modal" && node.props.title === "Overwrite the latest configuration?",
  );
  const newer = structuredClone(remote);
  newer.guides.a.text = "newer remote";
  app.setSnapshot({ revision: 3, value: { data: newer } });
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

test("an unavailable configuration keeps draft status and discard visible but disables saving", () => {
  const app = harness();
  app.edit("local");
  app.setSnapshot({ status: "unavailable" });
  assert.ok(app.nodes().some((node) => node.children.includes("1 unsaved")));
  assert.ok(
    app
      .nodes()
      .some((node) => node.children.includes("Plugin configuration is currently unavailable.")),
  );
  const save = app.find((node) => node.type === "Button" && node.children.includes("Save all"));
  assert.equal(save.props.disabled, true);
  const discard = app.find(
    (node) => node.type === "Button" && node.children.includes("Discard all"),
  );
  assert.equal(discard.props.disabled, false);
  discard.props.onClick();
  assert.equal(app.store.getSnapshot().draft, null);
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
