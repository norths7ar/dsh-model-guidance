import assert from "node:assert/strict";
import test from "node:test";
import { apply } from "../index.js";

function setup(initialData) {
  let data = initialData;
  let hook;
  const ctx = {
    inject() {},
    on(event, listener, options) {
      assert.equal(event, "system-prompt/assemble");
      assert.deepEqual(options, { prepend: true });
      hook = listener;
    },
  };
  apply(ctx, { data: { get: () => data } });
  return {
    assemble: (assembly) => hook({}, {}, async () => assembly),
    update: (nextData) => {
      data = nextData;
    },
  };
}

function assembly(provider = "provider-a", model = "model-a") {
  return {
    variables: { provider, model, other: "unchanged" },
    sections: [
      { name: "deployment:persona-prefix", text: "default persona", interpolate: true },
      { name: "deployment:tools", text: "tools", interpolate: true },
    ],
    metadata: { keep: true },
  };
}

function data(text = "custom persona") {
  return {
    guides: { guide: { name: "Guide", text } },
    bindings: { "provider-a": { "model-a": "guide" } },
  };
}

test("matches the exact provider and model returned by downstream assembly", async () => {
  const plugin = setup(data());
  assert.equal((await plugin.assemble(assembly())).sections[0].text, "custom persona");
  for (const [provider, model] of [
    ["provider-b", "model-a"],
    ["provider-a", "model-b"],
    ["Provider-a", "model-a"],
  ]) {
    const original = assembly(provider, model);
    assert.equal(await plugin.assemble(original), original);
  }
});

test("missing, stale, and empty bindings keep the original persona", async () => {
  const cases = [
    { guides: {}, bindings: {} },
    { guides: {}, bindings: { "provider-a": { "model-a": "deleted" } } },
    { guides: {}, bindings: { "provider-a": { "model-a": "" } } },
    data(""),
    data(" \n\t "),
  ];
  for (const config of cases) {
    const original = assembly();
    assert.equal(await setup(config).assemble(original), original);
  }
});

test("replaces only persona without mutating the original assembly", async () => {
  const original = assembly();
  const before = structuredClone(original);
  original.sections.forEach(Object.freeze);
  Object.freeze(original.sections);
  Object.freeze(original);
  const result = await setup(data()).assemble(original);
  assert.deepEqual(original, before);
  assert.notEqual(result, original);
  assert.notEqual(result.sections, original.sections);
  assert.equal(result.sections[1], original.sections[1]);
  assert.equal(result.variables, original.variables);
  assert.equal(result.metadata, original.metadata);
  assert.deepEqual(result.sections[0], {
    ...original.sections[0],
    text: "custom persona",
    interpolate: false,
  });
});

test("keeps template-looking guide text literal", async () => {
  const text = "{{model}} ${provider} {model} <%= model %>";
  const result = await setup(data(text)).assemble(assembly());
  assert.equal(result.sections[0].text, text);
  assert.equal(result.sections[0].interpolate, false);
});

test("reads updated volatile config for each assembly", async () => {
  const plugin = setup(data("first"));
  assert.equal((await plugin.assemble(assembly())).sections[0].text, "first");
  plugin.update(data("second"));
  assert.equal((await plugin.assemble(assembly())).sections[0].text, "second");
  plugin.update({ guides: {}, bindings: {} });
  const original = assembly();
  assert.equal(await plugin.assemble(original), original);
});
