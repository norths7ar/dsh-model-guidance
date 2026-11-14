window.__ModuleLoader__.load({
  id: "dsh-model-guidance",
  factory: (require) => {
    const React = require("react");
    const h = React.createElement;
    const {
      Button,
      Input,
      Modal,
      Checkbox,
      IconPlusOutlineRegular,
      IconCopyOutlineRegular,
      IconTrashOutlineRegular,
      IconCloseOutlineRegular,
    } = require("@deepseek-ai/dsh-client-ui-primitives");
    // Browser copy is registered with the host locale service; user-authored text is never translated.
    const DICTIONARIES = {
      zh: {
        title: "提示词",
        guides: "提示词",
        new: "新建",
        newGuide: "新提示词",
        unnamed: "未命名提示词",
        editGuide: "编辑提示词",
        guideName: "名称",
        instructions: "正文",
        subtitle: "为不同模型设置提示词与行为偏好",
        defaultPrompt: "默认",
        saveOne: "保存",
        discardOne: "放弃",
        discardAll: "放弃全部",
        dirtyCount: "{count} 条未保存",
        unsaved: "未保存",
        overwriteOneHelp:
          "用当前提示词及相关模型绑定覆盖最新配置中的对应内容。其他提示词正文不变。",
        deleted: "待删除",
        saveDependency: "先保存“{name}”，完成模型绑定转移",
        defaultSource: "DSH {version} · 标准模式 · 只读",
        defaultVariable: "{{model}} 由 DSH 填入当前模型 ID；自定义提示词也支持。",
        promptVariables: "支持 {{model}}（模型 ID）、{{provider}}（Provider ID）。",
        promptVariableRules:
          "由 DSH 替换。变量名不能加空格；未知变量会报错，代码块和反斜杠不作转义。",
        copy: "复制",
        deleteItem: "删除“{name}”",
        delete: "删除提示词",
        deleteTitle: "删除这条提示词？",
        deleteHelp: "删除“{name}”及其模型绑定。保存后生效。",
        dirty: "未保存修改",
        selectedModels: "适用模型",
        selectModels: "选择模型",
        modelCount: "{count} 个模型",
        unbind: "解除 {name} 的绑定",
        unavailableModel: "当前不在模型目录中",
        boundTo: "已绑定：{name}",
        search: "搜索模型名、ID 或提供方",
        refresh: "刷新模型目录",
        refreshAction: "刷新",
        catalogLoading: "正在刷新模型目录…",
        catalogError: "模型目录加载失败：{error}",
        providerFailures: "部分提供方加载失败：{names}。已有绑定仍可解除。",
        noModels: "当前没有可用模型或已有绑定。",
        noMatches: "没有匹配的模型。",
        done: "完成",
        cancel: "取消",
        close: "关闭",
        help: "帮助",
        helpText:
          "替换所选模型的角色提示词，保留 DSH 的其他系统指令和工具规则。保存后从下一次请求生效；正文留空或未绑定时使用默认内容。",
        loading: "正在加载配置…",
        refreshing: "正在重新读取配置，草稿已保留…",
        refreshFailed: "重新读取配置失败，草稿已保留。请重新连接后重试。",
        unavailable: "插件配置当前不可用。",
        readonly: "配置为只读。",
        save: "保存全部",
        saving: "正在保存…",
        discard: "放弃修改",
        loadLatest: "载入最新",
        overwrite: "用草稿覆盖最新",
        conflict: "配置已在其他位置更新，草稿已保留。请载入最新配置，或确认用本地草稿覆盖。",
        saveRejected: "保存未被接受；草稿已保留，请复核后重试。",
        saveFailed: "保存失败；草稿已保留：{error}",
        overwriteTitle: "覆盖最新配置？",
        overwriteHelp:
          "这会用全部本地提示词和绑定替换你刚看到的配置，不会合并其他修改。如果配置又变了，保存会被拒绝，草稿会保留。",
        transferTitle: "转移模型绑定？",
        transferHelp: "将 {model} 从“{from}”转移到“{to}”。保存相关提示词或保存全部后生效。",
        transfer: "转移绑定",
      },
      en: {
        title: "Prompts",
        guides: "Prompts",
        new: "New",
        newGuide: "New prompt",
        unnamed: "Untitled prompt",
        editGuide: "Edit prompt",
        guideName: "Name",
        instructions: "Prompt text",
        subtitle: "Set prompts and behavioral preferences for each model",
        defaultPrompt: "Default",
        saveOne: "Save",
        discardOne: "Discard",
        discardAll: "Discard all",
        dirtyCount: "{count} unsaved",
        unsaved: "Unsaved",
        overwriteOneHelp:
          "Replace this prompt and its related model bindings in the latest configuration. Other prompt text stays unchanged.",
        deleted: "Pending deletion",
        saveDependency: "Save “{name}” first to move the model binding",
        defaultSource: "DSH {version} · Standard mode · Read only",
        defaultVariable:
          "DSH replaces {{model}} with the current model ID. Custom prompts support it too.",
        promptVariables: "Supports {{model}} (model ID) and {{provider}} (provider ID).",
        promptVariableRules:
          "Resolved by DSH. Names cannot contain spaces. Unknown variables cause an error; code blocks and backslashes do not escape them.",
        copy: "Duplicate",
        deleteItem: "Delete “{name}”",
        delete: "Delete prompt",
        deleteTitle: "Delete this prompt?",
        deleteHelp: "Delete “{name}” and its model bindings when saved.",
        dirty: "Unsaved changes",
        selectedModels: "Applies to",
        selectModels: "Select models",
        modelCount: "{count} models",
        unbind: "Unbind {name}",
        unavailableModel: "Not in the current catalog",
        boundTo: "Bound to: {name}",
        search: "Search model name, ID, or provider",
        refresh: "Refresh model catalog",
        refreshAction: "Refresh",
        catalogLoading: "Refreshing model catalog…",
        catalogError: "Could not load model catalog: {error}",
        providerFailures:
          "Some providers could not load: {names}. Existing bindings can still be removed.",
        noModels: "No available models or existing bindings.",
        noMatches: "No matching models.",
        done: "Done",
        cancel: "Cancel",
        close: "Close",
        help: "Help",
        helpText:
          "Replaces the role prompt for selected models and leaves other DSH system instructions and tool rules intact. Saved changes apply from the next request. Blank prompts and unbound models use the default.",
        loading: "Loading configuration…",
        refreshing: "Reloading configuration. Your draft is retained…",
        refreshFailed:
          "Could not reload configuration. Your draft is retained. Reconnect to retry.",
        unavailable: "Plugin configuration is currently unavailable.",
        readonly: "Configuration is read-only.",
        save: "Save all",
        saving: "Saving…",
        discard: "Discard changes",
        loadLatest: "Load latest",
        overwrite: "Overwrite latest with draft",
        conflict:
          "Configuration changed elsewhere. Your draft is retained. Load the latest configuration or confirm overwriting it with your local draft.",
        saveRejected: "Save was not accepted. Your draft is retained; review and retry.",
        saveFailed: "Save failed. Your draft is retained: {error}",
        overwriteTitle: "Overwrite the latest configuration?",
        overwriteHelp:
          "Your draft replaces all prompts and bindings in the configuration you just reviewed. It does not merge other changes. If the configuration changes again, saving is blocked and your draft is kept.",
        transferTitle: "Move model binding?",
        transferHelp:
          "Move {model} from “{from}” to “{to}” when you save either related prompt or save all.",
        transfer: "Move binding",
      },
    };
    const ENTRY_ID = "local-model-guidance";
    const DEFAULT_PROMPT_ID = Symbol("built-in prompt");
    // @deepseek-ai/dsh-web-app, presets/standard.patch.yml (DeepSeek, MIT).
    const DEFAULT_PROMPT_VERSION = "0.2.2-rc.3";
    const DEFAULT_PROMPT_TEXT = "You are a coding agent powered by the {{model}} model.";
    const STYLE_ID = "dsh-model-guidance/client";
    const own = (object, key) => (Object.hasOwn(object, key) ? object[key] : undefined);
    const emptyData = () => ({ guides: {}, bindings: {} });
    const routeKey = (provider, model) => JSON.stringify([provider, model]);

    const PANEL_CSS = `
      .dmg-root { width:100%; height:100%; min-width:0; min-height:0; display:flex; flex-direction:column; overflow:hidden; color:var(--dsw-alias-label-primary); font-size:14px; line-height:22px; container:dmg-root / inline-size; }
      .dmg-root *, .dmg-dialog * { box-sizing:border-box; }
      .dmg-scroll { flex:1; min-height:0; overflow:auto; overscroll-behavior:contain; }
      .dmg-pageWidth { width:100%; max-width:1056px; margin:auto; padding:28px clamp(24px,4vw,48px); }
      .dmg-header { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:24px; }
      [data-platform="darwin"] .dmg-header { padding-top:var(--dsh-frame-top-clearance, 0px); }
      .dmg-title { margin:0; font-size:20px; line-height:28px; font-weight:500; }
      .dmg-layout { display:grid; grid-template-columns:190px minmax(0,1fr); align-items:start; gap:32px; }
      .dmg-guideRail, .dmg-editorPane, .dmg-editor, .dmg-field, .dmg-modelBody { min-width:0; display:flex; flex-direction:column; }
      .dmg-editorPane { gap:12px; }
      .dmg-titleGroup, .dmg-editorControls, .dmg-boundHead, .dmg-searchRow, .dmg-providerHead, .dmg-actions { display:flex; align-items:center; gap:8px; }
      .dmg-editorControls, .dmg-boundHead, .dmg-providerHead { justify-content:space-between; }
      .dmg-titleGroup { flex-direction:column; align-items:flex-start; gap:4px; }
      .dmg-newButton, .dmg-itemActions button { height:32px; border-radius:12px; white-space:nowrap; }
      .dmg-editorControls { flex-wrap:wrap; margin-top:24px; padding-top:16px; border-top:1px solid var(--dsw-alias-border-l4); }
      .dmg-itemHeader { display:flex; align-items:center; justify-content:space-between; gap:12px; min-height:36px; }
      .dmg-itemActions { display:flex; align-items:center; gap:8px; flex:none; white-space:nowrap; }
      .dmg-itemActions > span { width:48px; text-align:right; }
      .dmg-mobileSelect { display:none; }
      .dmg-mobileRail { display:none; align-items:center; gap:6px; }
      .dmg-mobileRail .dmg-mobileSelect { min-width:0; flex:1; }
      .dmg-guideRow[data-deleted="true"] .dmg-guideName { text-decoration:line-through; color:var(--dsw-alias-label-tertiary); }
      .dmg-modelPickerLink, .dmg-dependency { font:inherit; font-size:12px; color:var(--dsw-alias-label-secondary); background:none; border:0; padding:0; text-align:left; cursor:pointer; }
      .dmg-modelPickerLink:hover, .dmg-modelPickerLink:focus-visible, .dmg-dependency:hover { text-decoration:underline; }
      .dmg-modelPickerLink:disabled { cursor:default; opacity:.6; }
      .dmg-editorControls > .dmg-muted { flex:1 1 150px; }
      .dmg-railTitle, .dmg-fieldLabel, .dmg-providerName { margin:0; font-size:12px; line-height:18px; font-weight:500; color:var(--dsw-alias-label-secondary); }
      .dmg-guideList { margin:0; padding:0; list-style:none; display:flex; flex-direction:column; gap:2px; }
      .dmg-guideRow { min-width:0; display:flex; align-items:center; border-radius:var(--dsw-radius-md); }
      /* Name hover highlights the row; the selected row takes precedence. */
      .dmg-guideRow:where(:has(> .dmg-guideSelect:hover), :has(> .dmg-guideSelect:focus-visible)) { background:var(--dsw-alias-interactive-bg-hover); }
      /* Only suppress the name button's fill; action icons keep host hover/press feedback. */
      .dmg-root .dmg-guideRow > .dmg-guideSelect,
      .dmg-root .dmg-guideRow > .dmg-guideSelect:hover:not(:disabled),
      .dmg-root .dmg-guideRow > .dmg-guideSelect:active:not(:disabled) { background:transparent; }
      .dmg-guideSelect { flex:1; min-width:0; justify-content:flex-start; text-align:left; }
      .dmg-iconButton { flex:none; }
      .dmg-guideRow[data-active="true"] { background:var(--dsw-specific-sidebar-nav-item-active, var(--dsw-alias-interactive-bg-hover-solid)); }
      .dmg-guideName { flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
      .dmg-dirty { flex:none; width:6px; height:6px; border-radius:50%; background:var(--dsw-alias-state-warn-primary); }
      .dmg-editor { gap:24px; }
      .dmg-field { gap:6px; }
      .dmg-defaultMeta { display:grid; gap:2px; }
      .dmg-nameInput { width:180px; max-width:220px; min-width:60px; flex:0 1 180px; border:1px solid var(--dsw-alias-border-l4); }
      .dmg-searchInput { flex:1; min-width:0; }
      .dmg-searchRow > button { flex:none; white-space:nowrap; }
      .dmg-textarea { font:inherit; color:var(--dsw-alias-label-primary); background:var(--dsw-alias-bg-layer-1); border:.5px solid var(--dsw-alias-border-l4); border-radius:var(--dsw-radius-md); }
      .dmg-textarea { width:100%; height:clamp(280px,42vh,480px); padding:12px; line-height:24px; resize:none; }
      .dmg-textarea:focus-visible { outline:none; border-color:var(--dsw-focus-ring-color); }
      .dmg-textarea:disabled { opacity:.6; resize:none; }
      .dmg-bindings { display:flex; flex-direction:column; gap:8px; }
      .dmg-boundList { display:flex; flex-wrap:wrap; gap:6px; max-height:160px; overflow:auto; }
      .dmg-boundChip { min-width:0; max-width:100%; display:flex; align-items:center; gap:4px; padding-left:8px; border:.5px solid var(--dsw-alias-border-l3); border-radius:var(--dsw-radius-md); }
      .dmg-boundName { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:12px; }
      .dmg-muted { margin:0; color:var(--dsw-alias-label-tertiary); font-size:12px; line-height:18px; overflow-wrap:anywhere; }
      .dmg-error { color:var(--dsw-alias-state-error-primary); }
      .dmg-warning { color:var(--dsw-alias-state-warn-label); }
      .dmg-dialog { width:min(640px,100%); }
      .dmg-dialogBody { display:flex; flex-direction:column; gap:12px; min-width:0; }
      .dmg-candidateScroll { max-height:min(52vh,480px); overflow:auto; overscroll-behavior:contain; }
      .dmg-provider + .dmg-provider { margin-top:12px; }
      .dmg-providerHead { padding:6px 8px; }
      .dmg-modelRow { display:flex; align-items:flex-start; gap:10px; padding:8px; border-radius:var(--dsw-radius-md); }
      .dmg-modelRow:hover { background:var(--dsw-alias-interactive-bg-hover); }
      .dmg-modelBody { gap:2px; overflow-wrap:anywhere; }
      .dmg-modelName { font-size:13px; line-height:20px; }
      .dmg-actions { flex-wrap:wrap; justify-content:flex-end; }
      @container dmg-root (max-width:760px) { .dmg-layout { grid-template-columns:160px minmax(0,1fr); gap:24px; } .dmg-itemHeader { gap:8px; } .dmg-itemActions { gap:4px; } }
      @container dmg-root (max-width:620px) { .dmg-layout { grid-template-columns:minmax(0,1fr); gap:20px; } .dmg-guideList { display:none; } .dmg-mobileRail { display:flex; } .dmg-mobileSelect { display:block; width:100%; height:36px; font:inherit; border:1px solid var(--dsw-alias-border-l4); border-radius:8px; background:var(--dsw-alias-bg-layer-1); color:inherit; } }
    `;

    function equivalent(a, b) {
      if (Object.is(a, b)) return true;
      if (a === null || b === null || typeof a !== "object" || typeof b !== "object") return false;
      const keys = Object.keys(a);
      return (
        keys.length === Object.keys(b).length &&
        keys.every((key) => Object.hasOwn(b, key) && equivalent(a[key], b[key]))
      );
    }

    function guideState(data, id) {
      return {
        guide: own(data.guides ?? {}, id),
        bindings: Object.entries(data.bindings ?? {})
          .flatMap(([provider, models]) =>
            Object.entries(models)
              .filter(([, owner]) => owner === id)
              .map(([model]) => routeKey(provider, model)),
          )
          .sort(),
      };
    }

    function makeDraft(previous, latest) {
      const base = previous.draft?.base ?? structuredClone(latest.value?.data ?? emptyData());
      return {
        base,
        data: structuredClone(previous.draft?.data ?? base),
        revision: previous.draft?.revision ?? latest.revision,
      };
    }

    function cleanDraft(draft) {
      return equivalent(draft.data, draft.base) ? null : draft;
    }

    // A binding transfer is one route change, shared by its old and new owner.
    function routeChanges(base, data, id) {
      const changes = [];
      for (const provider of new Set([
        ...Object.keys(base.bindings),
        ...Object.keys(data.bindings),
      ])) {
        const before = own(base.bindings, provider) ?? {};
        const after = own(data.bindings, provider) ?? {};
        for (const model of new Set([...Object.keys(before), ...Object.keys(after)])) {
          const from = own(before, model);
          const to = own(after, model);
          if (from !== to && (id === undefined || from === id || to === id)) {
            changes.push({ provider, model, from, to });
          }
        }
      }
      return changes;
    }

    function setRoute(data, provider, model, owner) {
      const models = { ...(own(data.bindings, provider) ?? {}) };
      if (owner === undefined) delete models[model];
      else models[model] = owner;
      if (Object.keys(models).length) data.bindings[provider] = models;
      else delete data.bindings[provider];
    }

    function projectDraft(target, draft, id) {
      const result = structuredClone(target);
      const ids =
        id === undefined
          ? new Set([...Object.keys(draft.base.guides), ...Object.keys(draft.data.guides)])
          : [id];
      for (const key of ids) {
        const before = own(draft.base.guides, key);
        const after = own(draft.data.guides, key);
        if (id === undefined && equivalent(before, after)) continue;
        if (after === undefined) delete result.guides[key];
        else result.guides[key] = structuredClone(after);
      }
      for (const { provider, model, to } of routeChanges(draft.base, draft.data, id)) {
        if (
          id === undefined &&
          to !== undefined &&
          own(result.guides, to) === undefined &&
          own(draft.data.guides, to) !== undefined
        ) {
          result.guides[to] = structuredClone(draft.data.guides[to]);
        }
        setRoute(result, provider, model, to);
      }
      for (const [provider, models] of Object.entries(result.bindings)) {
        for (const [model, owner] of Object.entries(models)) {
          const removed =
            own(draft.base.guides, owner) !== undefined &&
            own(draft.data.guides, owner) === undefined;
          if (removed && (id === undefined || owner === id))
            setRoute(result, provider, model, undefined);
        }
      }
      result.guides = Object.fromEntries(
        [...new Set([...Object.keys(draft.data.guides), ...Object.keys(result.guides)])]
          .filter((key) => own(result.guides, key) !== undefined)
          .map((key) => [key, result.guides[key]]),
      );
      return result;
    }

    function saveDependencies(draft, target, id) {
      if (id === undefined) return [];
      return [
        ...new Set(
          routeChanges(draft.base, draft.data, id)
            .map(({ to }) => to)
            .filter(
              (owner) =>
                owner !== undefined && owner !== id && own(target.guides, owner) === undefined,
            ),
        ),
      ];
    }

    function discardGuideDraft(draft, id) {
      const next = { ...draft, data: structuredClone(draft.data) };
      const original = own(draft.base.guides, id);
      if (original === undefined) delete next.data.guides[id];
      else next.data.guides[id] = structuredClone(original);
      for (const { provider, model, from } of routeChanges(draft.base, draft.data, id)) {
        // A different prompt's pending deletion keeps its routes unbound.
        const owner =
          from !== undefined && own(next.data.guides, from) !== undefined ? from : undefined;
        setRoute(next.data, provider, model, owner);
      }
      return cleanDraft(next);
    }

    function createSharedStore(initial) {
      let snapshot = initial;
      const listeners = new Set();
      return {
        getSnapshot() {
          return snapshot;
        },
        subscribe(listener) {
          listeners.add(listener);
          return () => {
            listeners.delete(listener);
          };
        },
        update(updater) {
          const next = updater(snapshot);
          if (next === undefined || next === snapshot) return;
          snapshot = next;
          for (const listener of [...listeners]) listener();
        },
      };
    }

    function createCatalogSource(ctx) {
      let snapshot = { groups: [], failures: [], loading: true, error: "" };
      let generation = 0;
      let disposed = false;
      const listeners = new Set();

      function setSnapshot(patch) {
        snapshot = { ...snapshot, ...patch };
        for (const listener of [...listeners]) listener();
      }

      async function refresh() {
        const current = ++generation;
        setSnapshot({ loading: true, error: "" });
        try {
          const response = await ctx.remote.session.modelCatalog();
          if (disposed || current !== generation) return;
          if (!response.ok) throw new Error(response.error?.message ?? "Unknown error");
          setSnapshot({
            groups: response.value?.groups ?? [],
            failures: response.value?.failures ?? [],
            loading: false,
            error: "",
          });
        } catch (error) {
          if (disposed || current !== generation) return;
          setSnapshot({
            loading: false,
            error: error instanceof Error ? error.message : String(error),
          });
        }
      }

      function start() {
        const disposers = [
          ctx.remote.$on("llm/adapters-updated", refresh),
          ctx.remote.$on("settings/document-updated", refresh),
          ctx.on("connection/reset", refresh),
        ];
        void refresh();
        return () => {
          disposed = true;
          generation += 1;
          for (const dispose of disposers) dispose();
        };
      }

      return {
        source: {
          getSnapshot() {
            return snapshot;
          },
          subscribe(listener) {
            listeners.add(listener);
            return () => {
              listeners.delete(listener);
            };
          },
          refresh,
        },
        start,
      };
    }

    function modelRows(groups, ...bindingSets) {
      const rows = new Map();
      for (const group of groups ?? []) {
        for (const model of group.models ?? []) {
          rows.set(routeKey(group.id, model.id), {
            provider: group.id,
            model: model.id,
            providerName: group.name || group.id,
            modelName: model.name || model.id,
            available: true,
          });
        }
      }
      for (const bindings of bindingSets) {
        for (const [provider, models] of Object.entries(bindings ?? {})) {
          for (const model of Object.keys(models ?? {})) {
            const key = routeKey(provider, model);
            if (!rows.has(key)) {
              rows.set(key, {
                provider,
                model,
                providerName: provider,
                modelName: model,
                available: false,
              });
            }
          }
        }
      }
      return [...rows.entries()];
    }

    function GuidanceIcon({ size = 16 }) {
      return h(
        "svg",
        {
          width: size,
          height: size,
          viewBox: "0 0 24 24",
          fill: "none",
          "aria-hidden": "true",
        },
        h("path", {
          d: "M5.5 4.75h8.25A2.25 2.25 0 0 1 16 7v12H7.75A2.25 2.25 0 0 1 5.5 16.75V4.75Z",
          stroke: "currentColor",
          strokeWidth: 1.6,
          strokeLinejoin: "round",
        }),
        h("path", {
          d: "M8.5 8h4.25M8.5 11h4.25",
          stroke: "currentColor",
          strokeWidth: 1.6,
          strokeLinecap: "round",
        }),
        h("path", {
          d: "M16 7h1.75A2.25 2.25 0 0 1 20 9.25v10H11",
          stroke: "currentColor",
          strokeWidth: 1.6,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }),
      );
    }

    function GuidancePage({ form, guidanceStore, catalog, locale, t }) {
      const formSource = React.useMemo(
        () => ({
          subscribe: (listener) => form.subscribe(listener),
          getSnapshot: () => form.getSnapshot(),
        }),
        [form],
      );
      const snapshot = React.useSyncExternalStore(formSource.subscribe, formSource.getSnapshot);
      const ui = React.useSyncExternalStore(guidanceStore.subscribe, guidanceStore.getSnapshot);
      const catalogState = React.useSyncExternalStore(catalog.subscribe, catalog.getSnapshot);
      const localeSource = React.useMemo(
        () => ({
          subscribe: (listener) => locale.subscribe(listener),
          getSnapshot: () => locale.getSnapshot(),
        }),
        [locale],
      );
      React.useSyncExternalStore(localeSource.subscribe, localeSource.getSnapshot);
      const nameInput = React.useRef(null);
      const lastFocusToken = React.useRef(ui.focusNameToken);
      const [pickerOpen, setPickerOpen] = React.useState(false);
      const [confirmation, setConfirmation] = React.useState(null);

      React.useEffect(() => {
        if (ui.focusNameToken === lastFocusToken.current) return;
        lastFocusToken.current = ui.focusNameToken;
        const input = nameInput.current;
        if (input !== null) {
          input.focus();
          input.select();
        }
      }, [ui.focusNameToken]);

      const accepted = snapshot.value?.data ?? emptyData();
      const draftData = ui.draft?.data;
      const data = draftData ?? accepted;
      const guides = data.guides ?? {};
      const base = ui.draft?.base ?? accepted;
      const guideIds = [...new Set([...Object.keys(guides), ...Object.keys(base.guides)])];
      const activeId =
        ui.selectedId === DEFAULT_PROMPT_ID ||
        (ui.selectedId !== null && guideIds.includes(ui.selectedId))
          ? ui.selectedId
          : (guideIds[0] ?? DEFAULT_PROMPT_ID);
      const builtIn = activeId === DEFAULT_PROMPT_ID;
      const defaultPrompt = { name: t("defaultPrompt"), text: DEFAULT_PROMPT_TEXT };
      const deleted = !builtIn && own(guides, activeId) === undefined;
      const guide = builtIn ? defaultPrompt : (own(guides, activeId) ?? own(base.guides, activeId));
      const ready = snapshot.status === "ready";
      const editable = ready && snapshot.writable === true && !ui.saving && !ui.refreshing;
      const conflicted = ui.draft !== null && !equivalent(accepted, ui.draft.base);
      const groups = catalogState.groups ?? [];
      const failures = catalogState.failures ?? [];
      const allRows = modelRows(groups, accepted.bindings, draftData?.bindings);
      const ownerOf = (provider, model) => own(own(data.bindings ?? {}, provider) ?? {}, model);
      const boundRows = builtIn
        ? []
        : allRows.filter(([, row]) => ownerOf(row.provider, row.model) === activeId);
      const query = ui.search.trim().toLowerCase();
      const filteredRows =
        query === ""
          ? allRows
          : allRows.filter(
              ([, row]) =>
                row.provider.toLowerCase().includes(query) ||
                row.providerName.toLowerCase().includes(query) ||
                row.model.toLowerCase().includes(query) ||
                row.modelName.toLowerCase().includes(query),
            );

      const providerGroups = [];
      const providerMap = new Map();
      for (const entry of filteredRows) {
        const row = entry[1];
        let providerGroup = providerMap.get(row.provider);
        if (providerGroup === undefined) {
          providerGroup = {
            id: row.provider,
            name: row.providerName,
            rows: [],
          };
          providerMap.set(row.provider, providerGroup);
          providerGroups.push(providerGroup);
        }
        providerGroup.rows.push(entry);
      }

      function openGuide(id) {
        setPickerOpen(false);
        guidanceStore.update((previous) =>
          previous.selectedId === id ? previous : { ...previous, selectedId: id },
        );
      }

      function editGuide(change) {
        guidanceStore.update((previous) => {
          if (previous.saving || previous.refreshing) return previous;
          const latest = form.getSnapshot();
          if (latest.status !== "ready" || latest.writable !== true) return previous;
          const next = makeDraft(previous, latest);
          if (change(next.data) === false) return previous;
          return { ...previous, draft: cleanDraft(next), message: null };
        });
      }

      function addGuide(sourceId) {
        guidanceStore.update((previous) => {
          if (previous.saving || previous.refreshing) return previous;
          const latest = form.getSnapshot();
          if (latest.status !== "ready" || latest.writable !== true) return previous;
          const next = makeDraft(previous, latest);
          const source =
            sourceId === undefined
              ? { name: t("newGuide"), text: "" }
              : own(next.data.guides ?? {}, sourceId);
          if (source === undefined) return previous;
          let id;
          do {
            id =
              "guide-" +
              (globalThis.crypto?.randomUUID?.() ??
                Date.now().toString(36) + "-" + Math.random().toString(36).slice(2));
          } while (own(next.data.guides ?? {}, id) !== undefined);
          next.data.guides = {
            [id]: { name: source.name ?? "", text: source.text ?? "" },
            ...(next.data.guides ?? {}),
          };
          return {
            ...previous,
            draft: cleanDraft(next),
            selectedId: id,
            focusNameToken: previous.focusNameToken + 1,
            message: null,
          };
        });
      }

      function deleteGuide(id) {
        if (id === DEFAULT_PROMPT_ID) return;
        guidanceStore.update((previous) => {
          if (previous.saving || previous.refreshing) return previous;
          const latest = form.getSnapshot();
          if (latest.status !== "ready" || latest.writable !== true) return previous;
          const next = makeDraft(previous, latest);
          if (own(next.data.guides ?? {}, id) === undefined) return previous;
          delete next.data.guides[id];

          const nextBindings = { ...(next.data.bindings ?? {}) };
          for (const [provider, models] of Object.entries(nextBindings)) {
            const kept = { ...models };
            for (const [model, guideId] of Object.entries(kept)) {
              if (guideId === id) delete kept[model];
            }
            if (Object.keys(kept).length === 0) delete nextBindings[provider];
            else nextBindings[provider] = kept;
          }
          next.data.bindings = nextBindings;
          return {
            ...previous,
            draft: cleanDraft(next),
            selectedId: activeId === id ? id : previous.selectedId,
            message: null,
          };
        });
      }

      function toggleBinding(provider, model, checked, confirmedOwner) {
        if (builtIn || deleted) return;
        const owner = ownerOf(provider, model);
        if (checked && owner !== undefined && owner !== activeId && confirmedOwner !== owner) {
          setConfirmation({ kind: "transfer", provider, model, owner, target: activeId });
          return;
        }
        editGuide((next) => {
          const nextBindings = { ...(next.bindings ?? {}) };
          const models = { ...(nextBindings[provider] ?? {}) };
          const owner = own(models, model);
          if (checked) {
            if (owner !== undefined && owner !== activeId && owner !== confirmedOwner) return false;
            models[model] = activeId;
            nextBindings[provider] = models;
          } else {
            if (owner !== activeId) return false;
            delete models[model];
            if (Object.keys(models).length === 0) delete nextBindings[provider];
            else nextBindings[provider] = models;
          }
          next.bindings = nextBindings;
        });
      }

      function discardDraft() {
        guidanceStore.update((previous) => {
          if (previous.saving || previous.refreshing || previous.draft === null) return previous;
          return {
            ...previous,
            draft: null,
            message: null,
          };
        });
      }

      function discardCurrent() {
        guidanceStore.update((previous) => {
          if (previous.saving || previous.refreshing || !previous.draft || builtIn) return previous;
          return { ...previous, draft: discardGuideDraft(previous.draft, activeId), message: null };
        });
      }

      function requestSave(id) {
        if (conflicted) {
          const latest = form.getSnapshot();
          setConfirmation({
            kind: "overwrite",
            target: id,
            reviewed: {
              revision: latest.revision,
              data: structuredClone(latest.value?.data ?? emptyData()),
            },
          });
        } else void saveDraft(undefined, id);
      }

      async function saveDraft(reviewed, id) {
        const before = guidanceStore.getSnapshot();
        if (before.saving || before.refreshing || before.draft === null) return;
        const latest = form.getSnapshot();
        if (latest.status !== "ready" || latest.writable !== true) return;
        // Host reloads can change the revision without changing prompt data.
        // Compare content for conflicts; fence the write with the latest revision.
        const expected = reviewed ?? { revision: before.draft.revision, data: before.draft.base };
        if (saveDependencies(before.draft, expected.data, id).length) return;
        if (!equivalent(latest.value?.data ?? emptyData(), expected.data)) {
          guidanceStore.update((previous) => ({
            ...previous,
            message: {
              kind: "warning",
              key: "conflict",
            },
          }));
          return;
        }

        const committed =
          id === undefined ? before.draft.data : projectDraft(expected.data, before.draft, id);
        const acquisition = { started: false };
        guidanceStore.update((previous) => {
          if (previous.saving || previous.refreshing || previous.draft === null) return previous;
          acquisition.started = true;
          return { ...previous, saving: true, message: null };
        });
        if (!acquisition.started) return;

        try {
          const ok = await form.mutate(
            [{ op: "set", path: ["data"], value: committed }],
            latest.revision,
          );
          guidanceStore.update((previous) => ({
            ...previous,
            saving: false,
            draft: !ok
              ? previous.draft
              : id === undefined
                ? null
                : cleanDraft({
                    base: structuredClone(committed),
                    data: projectDraft(committed, before.draft),
                    revision: form.getSnapshot().revision,
                  }),
            message: ok ? null : { kind: "error", key: "saveRejected" },
          }));
        } catch (error) {
          guidanceStore.update((previous) => ({
            ...previous,
            saving: false,
            message: {
              kind: "error",
              key: "saveFailed",
              params: { error: error instanceof Error ? error.message : String(error) },
            },
          }));
        }
      }

      const isGuideDirty = (id) => !equivalent(guideState(data, id), guideState(base, id));
      const dirtyCount = guideIds.filter(isGuideDirty).length;
      const currentDirty = !builtIn && isGuideDirty(activeId);
      const dependencies =
        ui.draft && !builtIn ? saveDependencies(ui.draft, accepted, activeId) : [];
      const nameOf = (id) =>
        id === DEFAULT_PROMPT_ID
          ? defaultPrompt.name
          : (own(guides, id) ?? own(base.guides, id))?.name || t("unnamed");
      const button = (label, onClick, props = {}) => h(Button, { onClick, ...props }, label);
      const iconButton = (icon, label, onClick, disabled) =>
        button(null, onClick, {
          className: "dmg-iconButton",
          icon: h(icon, { size: 16, "aria-hidden": true }),
          variant: "ghost",
          size: "sm",
          title: label,
          "aria-label": label,
          disabled,
        });
      const statusText = ui.refreshing
        ? t(ui.refreshError ? "refreshFailed" : "refreshing")
        : ui.saving
          ? t("saving")
          : conflicted
            ? t("conflict")
            : ui.message
              ? t(ui.message.key, ui.message.params)
              : ready && !snapshot.writable
                ? t("readonly")
                : ui.draft !== null
                  ? t("dirty")
                  : "";
      const changeField = (field, value) =>
        editGuide((next) => {
          if (builtIn) return false;
          const target = own(next.guides ?? {}, activeId);
          if (target === undefined) return false;
          target[field] = value;
        });
      const modelSummary = h(
        "section",
        { className: "dmg-bindings", "aria-label": t("selectedModels") },
        h(
          "div",
          { className: "dmg-boundHead" },
          h(
            "button",
            {
              type: "button",
              className: "dmg-modelPickerLink",
              disabled: !editable || deleted,
              "aria-label": t("selectModels"),
              onClick: () => setPickerOpen(true),
            },
            t("selectedModels"),
            " · ",
            boundRows.length,
          ),
        ),
        boundRows.length
          ? h(
              "div",
              { className: "dmg-boundList" },
              ...boundRows.map(([key, row]) =>
                h(
                  "div",
                  {
                    key,
                    className: "dmg-boundChip",
                    title:
                      row.providerName +
                      " / " +
                      row.model +
                      (!row.available ? " · " + t("unavailableModel") : ""),
                  },
                  h(
                    "span",
                    { className: "dmg-boundName" },
                    row.modelName,
                    " · ",
                    row.providerName,
                    !row.available &&
                      h("span", { className: "dmg-warning" }, " · ", t("unavailableModel")),
                  ),
                  iconButton(
                    IconCloseOutlineRegular,
                    t("unbind", { name: row.modelName }),
                    () => toggleBinding(row.provider, row.model, false),
                    !editable,
                  ),
                ),
              ),
            )
          : null,
      );
      const editor = h(
        "section",
        { className: "dmg-editor", "aria-label": t("editGuide") },
        h(
          "div",
          { className: "dmg-itemHeader" },
          builtIn
            ? h("span", null, guide.name)
            : h(Input, {
                ref: nameInput,
                id: "dmg-guide-name",
                className: "dmg-nameInput",
                value: guide.name ?? "",
                disabled: !editable || deleted,
                "aria-label": t("guideName"),
                autoComplete: "off",
                onChange: (event) => changeField("name", event.target.value),
              }),
          !builtIn &&
            h(
              "div",
              { className: "dmg-itemActions" },
              h(
                "span",
                { className: "dmg-muted dmg-warning", role: "status" },
                currentDirty ? t("unsaved") : "",
              ),
              button(t("discardOne"), discardCurrent, {
                variant: "ghost",
                disabled: ui.saving || ui.refreshing || !currentDirty,
              }),
              button(t("saveOne"), () => requestSave(activeId), {
                variant: "primary",
                disabled: !editable || !currentDirty || dependencies.length > 0,
              }),
            ),
        ),
        ...dependencies.map((id) =>
          h(
            "button",
            { key: id, type: "button", className: "dmg-dependency", onClick: () => openGuide(id) },
            t("saveDependency", { name: nameOf(id) }),
          ),
        ),
        deleted && h("p", { className: "dmg-muted" }, t("deleted")),
        builtIn
          ? h(
              "div",
              { className: "dmg-defaultMeta" },
              h(
                "p",
                { className: "dmg-muted" },
                t("defaultSource", { version: DEFAULT_PROMPT_VERSION }),
              ),
              h("p", { className: "dmg-muted" }, t("defaultVariable")),
            )
          : !deleted && modelSummary,
        h(
          "label",
          { className: "dmg-field", htmlFor: "dmg-guide-text" },
          h("span", { className: "dmg-fieldLabel" }, t("instructions")),
          !builtIn &&
            h(
              "span",
              { className: "dmg-muted", title: t("promptVariableRules") },
              t("promptVariables"),
            ),
          h("textarea", {
            id: "dmg-guide-text",
            className: "dmg-textarea",
            rows: 12,
            value: guide.text ?? "",
            disabled: !builtIn && (!editable || deleted),
            readOnly: builtIn || deleted,
            onChange:
              builtIn || deleted ? undefined : (event) => changeField("text", event.target.value),
          }),
        ),
      );
      const picker = h(
        Modal,
        {
          open: pickerOpen && !builtIn && !deleted,
          onClose: () => setPickerOpen(false),
          title: t("selectModels"),
          closeLabel: t("close"),
          className: "dmg-dialog",
          footer: button(t("done"), () => setPickerOpen(false), { variant: "primary" }),
        },
        h(
          "div",
          { className: "dmg-dialogBody" },
          h(
            "div",
            { className: "dmg-searchRow" },
            h(Input, {
              type: "search",
              className: "dmg-searchInput",
              value: ui.search,
              placeholder: t("search"),
              "aria-label": t("search"),
              "data-modal-autofocus": true,
              onChange: (event) => {
                const search = event.target.value;
                guidanceStore.update((previous) => ({ ...previous, search }));
              },
            }),
            button(
              t("refreshAction"),
              () => {
                void catalog.refresh();
              },
              {
                size: "sm",
                disabled: catalogState.loading,
                title: t("refresh"),
                "aria-label": t("refresh"),
              },
            ),
          ),
          catalogState.loading &&
            h("p", { className: "dmg-muted", role: "status" }, t("catalogLoading")),
          catalogState.error &&
            h(
              "p",
              { className: "dmg-muted dmg-error", role: "alert" },
              t("catalogError", { error: catalogState.error }),
            ),
          failures.length > 0 &&
            h(
              "p",
              { className: "dmg-muted dmg-warning", role: "status" },
              t("providerFailures", { names: failures.map((item) => item.name).join(", ") }),
            ),
          h(
            "div",
            { className: "dmg-candidateScroll" },
            providerGroups.length
              ? providerGroups.map((group) =>
                  h(
                    "section",
                    { key: group.id, className: "dmg-provider", "aria-label": group.name },
                    h(
                      "div",
                      { className: "dmg-providerHead" },
                      h("h3", { className: "dmg-providerName" }, group.name),
                      h(
                        "span",
                        { className: "dmg-muted" },
                        t("modelCount", { count: group.rows.length }),
                      ),
                    ),
                    ...group.rows.map(([key, row]) => {
                      const owner = ownerOf(row.provider, row.model);
                      const occupied = owner !== undefined && owner !== activeId;
                      return h(
                        "div",
                        { key, className: "dmg-modelRow" },
                        h(Checkbox, {
                          checked: owner === activeId,
                          disabled: !editable,
                          onChange: (checked) => toggleBinding(row.provider, row.model, checked),
                          label: h(
                            "span",
                            { className: "dmg-modelBody" },
                            h("span", { className: "dmg-modelName" }, row.modelName),
                            h(
                              "span",
                              { className: "dmg-muted" },
                              row.providerName + " / " + row.model,
                            ),
                            !row.available &&
                              h(
                                "span",
                                { className: "dmg-muted dmg-warning" },
                                t("unavailableModel"),
                              ),
                            occupied &&
                              h(
                                "span",
                                { className: "dmg-muted" },
                                t("boundTo", { name: nameOf(owner) }),
                              ),
                          ),
                        }),
                      );
                    }),
                  ),
                )
              : h("p", { className: "dmg-muted" }, t(query ? "noMatches" : "noModels")),
          ),
        ),
      );
      const confirm =
        confirmation &&
        h(Modal, {
          open: true,
          onClose: () => setConfirmation(null),
          closeLabel: t("close"),
          className: "dmg-dialog",
          title: t(confirmation.kind + "Title"),
          description:
            confirmation.kind === "overwrite"
              ? t(confirmation.target === undefined ? "overwriteHelp" : "overwriteOneHelp")
              : confirmation.kind === "delete"
                ? t("deleteHelp", { name: nameOf(confirmation.target) })
                : t("transferHelp", {
                    model: confirmation.model,
                    from: nameOf(confirmation.owner),
                    to: nameOf(confirmation.target),
                  }),
          footer: h(
            "div",
            { className: "dmg-actions" },
            button(t("cancel"), () => setConfirmation(null)),
            button(
              t(confirmation.kind),
              () => {
                if (confirmation.kind === "overwrite") {
                  void saveDraft(confirmation.reviewed, confirmation.target);
                } else if (confirmation.kind === "delete") {
                  deleteGuide(confirmation.target);
                } else if (confirmation.target === activeId) {
                  toggleBinding(
                    confirmation.provider,
                    confirmation.model,
                    true,
                    confirmation.owner,
                  );
                }
                setConfirmation(null);
              },
              { variant: "primary", disabled: !editable },
            ),
          ),
        });
      const editorControls = h(
        "div",
        { className: "dmg-editorControls" },
        h(
          "p",
          {
            className:
              "dmg-muted" +
              (conflicted ? " dmg-warning" : ui.message?.kind === "error" ? " dmg-error" : ""),
            role: "status",
            "aria-live": "polite",
          },
          ui.refreshing || ui.saving || conflicted || ui.message || (ready && !snapshot.writable)
            ? statusText
            : t("dirtyCount", { count: dirtyCount }),
        ),
        h(
          "div",
          { className: "dmg-actions" },
          button(t(conflicted ? "loadLatest" : "discardAll"), discardDraft, {
            variant: "ghost",
            disabled: ui.saving || ui.refreshing || ui.draft === null,
          }),
          button(
            t(ui.saving ? "saving" : conflicted ? "overwrite" : "save"),
            () => {
              if (conflicted) {
                const latest = form.getSnapshot();
                setConfirmation({
                  kind: "overwrite",
                  reviewed: {
                    revision: latest.revision,
                    data: structuredClone(latest.value?.data ?? emptyData()),
                  },
                });
              } else void saveDraft();
            },
            { variant: "primary", disabled: !editable || ui.draft === null },
          ),
        ),
      );
      return h(
        "section",
        { className: "dmg-root", "aria-label": t("title"), "aria-busy": ui.saving || undefined },
        h(
          "div",
          { className: "dmg-scroll" },
          h(
            "div",
            { className: "dmg-pageWidth" },
            h(
              "header",
              { className: "dmg-header" },
              h(
                "div",
                { className: "dmg-titleGroup" },
                h("h1", { className: "dmg-title" }, t("title")),
                h("p", { className: "dmg-muted" }, t("subtitle")),
              ),
              button(t("new"), () => addGuide(), {
                icon: h(IconPlusOutlineRegular, { size: 16, "aria-hidden": true }),
                variant: "primary",
                className: "dmg-newButton",
                size: "sm",
                disabled: !editable,
              }),
            ),
            !ready
              ? h(
                  "div",
                  { className: "dmg-editorPane" },
                  h(
                    "p",
                    { className: "dmg-muted", role: "status" },
                    t(snapshot.status === "unavailable" ? "unavailable" : "loading"),
                  ),
                )
              : h(
                  "div",
                  { className: "dmg-layout" },
                  h(
                    "aside",
                    { className: "dmg-guideRail", "aria-label": t("guides") },
                    h(
                      "div",
                      { className: "dmg-mobileRail" },
                      h(
                        "select",
                        {
                          className: "dmg-mobileSelect",
                          "aria-label": t("guides"),
                          value: builtIn ? "" : activeId,
                          onChange: (event) => openGuide(event.target.value || DEFAULT_PROMPT_ID),
                        },
                        ...[DEFAULT_PROMPT_ID, ...guideIds].map((id) =>
                          h(
                            "option",
                            {
                              key: id === DEFAULT_PROMPT_ID ? "default" : id,
                              value: id === DEFAULT_PROMPT_ID ? "" : id,
                            },
                            nameOf(id) +
                              (id !== DEFAULT_PROMPT_ID && isGuideDirty(id)
                                ? " · " + t(own(guides, id) ? "unsaved" : "deleted")
                                : ""),
                          ),
                        ),
                      ),
                      !builtIn &&
                        !deleted &&
                        iconButton(
                          IconCopyOutlineRegular,
                          t("copy"),
                          () => addGuide(activeId),
                          !editable,
                        ),
                      !builtIn &&
                        !deleted &&
                        iconButton(
                          IconTrashOutlineRegular,
                          t("deleteItem", { name: nameOf(activeId) }),
                          () => setConfirmation({ kind: "delete", target: activeId }),
                          !editable,
                        ),
                    ),
                    h(
                      "ul",
                      { className: "dmg-guideList" },
                      ...[DEFAULT_PROMPT_ID, ...guideIds].map((id) =>
                        h(
                          "li",
                          {
                            key: id === DEFAULT_PROMPT_ID ? "built-in" : "custom:" + id,
                            className: "dmg-guideRow",
                            "data-active": id === activeId ? "true" : "false",
                            "data-deleted":
                              id !== DEFAULT_PROMPT_ID && own(guides, id) === undefined
                                ? "true"
                                : undefined,
                          },
                          button(
                            h(
                              React.Fragment,
                              null,
                              h("span", { className: "dmg-guideName" }, nameOf(id)),
                              id !== DEFAULT_PROMPT_ID &&
                                isGuideDirty(id) &&
                                h("span", {
                                  className: "dmg-dirty",
                                  role: "img",
                                  "aria-label": t("dirty"),
                                }),
                            ),
                            () => openGuide(id),
                            {
                              className: "dmg-guideSelect",
                              variant: "ghost",
                              size: "sm",
                              title: nameOf(id),
                              "aria-current": id === activeId ? "page" : undefined,
                            },
                          ),
                          id !== DEFAULT_PROMPT_ID &&
                            own(guides, id) !== undefined &&
                            iconButton(
                              IconCopyOutlineRegular,
                              t("copy", { name: nameOf(id) }),
                              () => addGuide(id),
                              !editable,
                            ),
                          id !== DEFAULT_PROMPT_ID &&
                            own(guides, id) !== undefined &&
                            iconButton(
                              IconTrashOutlineRegular,
                              t("deleteItem", { name: nameOf(id) }),
                              () => setConfirmation({ kind: "delete", target: id }),
                              !editable,
                            ),
                        ),
                      ),
                    ),
                  ),
                  h("div", { className: "dmg-editorPane" }, editor),
                ),
            editorControls,
          ),
        ),
        picker,
        confirm,
      );
    }

    function apply(ctx) {
      ctx.effect(() => ctx.locale.register(ENTRY_ID, DICTIONARIES), "model-guidance: translations");
      const t = ctx.locale.bind(ENTRY_ID);
      ctx.effect(() => {
        const tag = document.createElement("style");
        tag.dataset.pluginCss = STYLE_ID;
        tag.textContent = PANEL_CSS;
        document.head.append(tag);
        return () => tag.remove();
      }, "model-guidance: styles");

      const form = ctx.configForms.get(ENTRY_ID);
      const guidanceStore = createSharedStore({
        selectedId: null,
        search: "",
        draft: null,
        saving: false,
        refreshing: false,
        refreshError: false,
        message: null,
        focusNameToken: 0,
      });
      const catalogController = createCatalogSource(ctx);
      ctx.effect(() => catalogController.start(), "model-guidance: model catalog");
      ctx.effect(() => {
        const mirror = ctx.configForms.describe();
        let generation = 0;
        let disposed = false;
        let waiting = false;
        const settle = async (current) => {
          waiting = true;
          // The settings provider starts its refresh from this same event.
          // Join it after all synchronous reset listeners have run.
          await Promise.resolve();
          try {
            await mirror.ensure();
            if (disposed || current !== generation) return;
            const failed = mirror.getSnapshot().error !== null;
            guidanceStore.update((previous) => ({
              ...previous,
              refreshing: failed,
              refreshError: failed,
            }));
          } catch {
            if (disposed || current !== generation) return;
            guidanceStore.update((previous) => ({
              ...previous,
              refreshing: true,
              refreshError: true,
            }));
          } finally {
            if (current === generation) waiting = false;
          }
        };
        const reset = () => {
          const current = ++generation;
          guidanceStore.update((previous) => ({
            ...previous,
            refreshing: true,
            refreshError: false,
          }));
          return settle(current);
        };
        const stopReset = ctx.on("connection/reset", reset);
        // A later successful host refresh also recovers from a failed reset.
        const stopMirror = mirror.subscribe(() => {
          if (!waiting && guidanceStore.getSnapshot().refreshing) void settle(generation);
        });
        return () => {
          disposed = true;
          generation += 1;
          stopReset();
          stopMirror();
        };
      }, "model-guidance: reconnect freshness");

      ctx.slots.inject("main", () =>
        ctx.slots.register(
          {
            name: "main",
            key: ENTRY_ID,
            inject: () => ({
              form,
              locale: ctx.locale,
              t,
              guidanceStore,
              catalog: catalogController.source,
            }),
          },
          GuidancePage,
        ),
      );

      ctx.slots.inject("sidebar.panellist", () =>
        ctx.slots.register(
          {
            name: "sidebar.panellist",
            id: ENTRY_ID,
            order: 20,
            label: () => t("title"),
            locale: ENTRY_ID,
          },
          GuidanceIcon,
        ),
      );
    }

    return { apply, inject: ["slots", "locale", "configForms", "remote", "remote.session"] };
  },
});
