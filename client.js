window.__ModuleLoader__.load({
  id: "dsh-model-guidance",
  factory: (require) => {
    const React = require("react");
    const h = React.createElement;
    const {
      Button,
      Input,
      Modal,
      Menu,
      Checkbox,
    } = require("@deepseek-ai/dsh-client-ui-primitives");
    // Browser copy is registered with the host locale service; user-authored text is never translated.
    const DICTIONARIES = {
      zh: {
        title: "模型行为指南",
        guides: "行为指南",
        new: "新建",
        newGuide: "新指南",
        unnamed: "未命名指南",
        selectGuide: "选择行为指南",
        editGuide: "编辑行为指南",
        guideName: "指南名称",
        instructions: "行为指令",
        more: "更多操作",
        delete: "删除指南",
        deleteTitle: "删除这条指南？",
        deleteHelp: "删除“{name}”及其模型绑定。保存全部后生效。",
        dirty: "未保存修改",
        noGuides: "暂无指南",
        emptyTitle: "还没有行为指南",
        deletedTitle: "已删除全部指南",
        emptyHelp: "新建一条指南，填写行为指令并选择模型。",
        deletedHelp: "删除仍在草稿中。保存全部后生效，放弃则恢复当前配置。",
        selectedModels: "已选模型",
        selectModels: "选择模型",
        modelCount: "{count} 个模型",
        unbind: "解除 {name} 的绑定",
        noBindings: "尚未选择模型",
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
          "指南正文替换绑定模型的角色指导。保存后从下一次模型步骤开始生效；正文留空的指南和未绑定的模型沿用 DSH 默认角色指导。正文按原文使用，不展开模板变量。所有指南和模型选择共同保存在一份草稿中，离开页面再回来仍会保留。",
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
          "这会用本地全部指南和绑定替换刚刚复核的最新配置，不会合并其他位置的修改。若配置再次变化，保存会被拒绝，草稿仍会保留。",
        transferTitle: "转移模型绑定？",
        transferHelp: "将 {model} 从“{from}”转移到“{to}”。保存全部后生效。",
        transfer: "转移绑定",
      },
      en: {
        title: "Model guidance",
        guides: "Guides",
        new: "New",
        newGuide: "New guide",
        unnamed: "Untitled guide",
        selectGuide: "Select guide",
        editGuide: "Edit guide",
        guideName: "Guide name",
        instructions: "Instructions",
        more: "More actions",
        delete: "Delete guide",
        deleteTitle: "Delete this guide?",
        deleteHelp: "Delete “{name}” and its model bindings. This takes effect when you save all.",
        dirty: "Unsaved changes",
        noGuides: "No guides yet",
        emptyTitle: "No model guidance yet",
        deletedTitle: "All guides deleted",
        emptyHelp: "Create a guide, write instructions, and select models.",
        deletedHelp:
          "Deletions are still a draft. Save all to apply them, or discard to restore the current configuration.",
        selectedModels: "Selected models",
        selectModels: "Select models",
        modelCount: "{count} models",
        unbind: "Unbind {name}",
        noBindings: "No models selected",
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
          "Guide text replaces the role guidance of its bound models, starting with the next model step after saving. Empty guides and unbound models use DSH default role guidance. Text is used verbatim without expanding template variables. All guides and model selections share one draft, which is retained when you leave and return to this page.",
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
          "This replaces all guides and bindings in the reviewed configuration with your local draft, without merging changes made elsewhere. If the configuration changes again, the save will be rejected and your draft retained.",
        transferTitle: "Move model binding?",
        transferHelp: "Move {model} from “{from}” to “{to}”. This takes effect when you save all.",
        transfer: "Move binding",
      },
    };
    const ENTRY_ID = "local-model-guidance";
    const STYLE_ID = "dsh-model-guidance/client";
    const own = (object, key) => (Object.hasOwn(object, key) ? object[key] : undefined);
    const emptyData = () => ({ guides: {}, bindings: {} });
    const routeKey = (provider, model) => JSON.stringify([provider, model]);

    const PANEL_CSS = `
      .dmg-root { width:100%; height:100%; min-width:0; min-height:0; display:flex; flex-direction:column; overflow:hidden; color:var(--dsw-alias-label-primary); font-size:14px; line-height:22px; container:dmg-root / inline-size; }
      .dmg-root *, .dmg-dialog * { box-sizing:border-box; }
      .dmg-scroll { flex:1; min-height:0; overflow:auto; overscroll-behavior:contain; }
      .dmg-pageWidth, .dmg-footerInner { width:100%; max-width:1056px; margin:auto; padding:24px 32px; }
      .dmg-header { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:24px; }
      [data-platform="darwin"] .dmg-header { padding-top:var(--dsh-frame-top-clearance, 0px); }
      .dmg-title { margin:0; font-size:20px; line-height:28px; font-weight:500; }
      .dmg-layout { display:grid; grid-template-columns:208px minmax(0,1fr); align-items:start; gap:24px; }
      .dmg-guideRail, .dmg-editorPane, .dmg-editor, .dmg-field, .dmg-modelBody { min-width:0; display:flex; flex-direction:column; }
      .dmg-guideRail, .dmg-editorPane { gap:12px; }
      .dmg-railHead, .dmg-editorHead, .dmg-boundHead, .dmg-searchRow, .dmg-providerHead, .dmg-actions { display:flex; align-items:center; gap:8px; }
      .dmg-railHead, .dmg-boundHead, .dmg-providerHead { justify-content:space-between; }
      .dmg-railTitle, .dmg-fieldLabel, .dmg-providerName { margin:0; font-size:12px; line-height:18px; font-weight:500; color:var(--dsw-alias-label-secondary); }
      .dmg-guideList { margin:0; padding:0; list-style:none; display:flex; flex-direction:column; gap:2px; }
      .dmg-guideRow { min-width:0; }
      .dmg-guideSelect { width:100%; justify-content:flex-start; text-align:left; }
      .dmg-guideRow[data-active="true"] { border-radius:var(--dsw-radius-md); background:var(--dsw-specific-sidebar-nav-item-active, var(--dsw-alias-interactive-bg-hover-solid)); }
      .dmg-guideName { flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
      .dmg-dirty { flex:none; width:6px; height:6px; border-radius:50%; background:var(--dsw-alias-state-warn-primary); }
      .dmg-editor { gap:18px; padding:20px; border:.5px solid var(--dsw-alias-settings-card-stroke); border-radius:var(--dsw-radius-xl); background:var(--dsw-alias-settings-card-fill); }
      .dmg-editorHead { align-items:flex-end; }
      .dmg-nameField { flex:1; }
      .dmg-field { gap:6px; }
      .dmg-nameInput { width:100%; min-width:0; }
      .dmg-searchInput { flex:1; min-width:0; }
      .dmg-searchRow > button { flex:none; white-space:nowrap; }
      .dmg-textarea, .dmg-select { font:inherit; color:var(--dsw-alias-label-primary); background:var(--dsw-alias-bg-layer-1); border:.5px solid var(--dsw-alias-border-l4); border-radius:var(--dsw-radius-md); }
      .dmg-textarea { width:100%; min-height:280px; padding:10px; line-height:22px; resize:vertical; }
      .dmg-select { width:100%; min-width:0; height:36px; padding:0 10px; }
      .dmg-textarea:focus-visible, .dmg-select:focus-visible { outline:2px solid var(--dsw-focus-ring-color); outline-offset:1px; }
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
      .dmg-blank { padding:40px 8px; text-align:center; }
      .dmg-blank h2 { margin:0 0 8px; font-size:16px; font-weight:500; }
      .dmg-footer { flex:none; border-top:.5px solid var(--dsw-alias-border-l2); }
      .dmg-footerInner { display:flex; align-items:center; justify-content:space-between; gap:12px; padding-block:12px; }
      .dmg-actions { flex-wrap:wrap; justify-content:flex-end; }
      .dmg-mobileBar { display:none; }
      .dmg-mobileBar select { flex:1; width:auto; min-width:0; }
      .dmg-mobileBar > button { flex:none; white-space:nowrap; }
      @container dmg-root (max-width:760px) { .dmg-layout { grid-template-columns:minmax(0,1fr); } .dmg-guideRail { display:none; } .dmg-mobileBar { display:flex; gap:8px; } }
      @container dmg-root (max-width:520px) { .dmg-pageWidth, .dmg-footerInner { padding-inline:16px; } .dmg-editor { padding:14px; } .dmg-footerInner { flex-direction:column; align-items:stretch; } }
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
      const [openMenuId, setOpenMenuId] = React.useState(null);
      const [pickerOpen, setPickerOpen] = React.useState(false);
      const [helpOpen, setHelpOpen] = React.useState(false);
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
      const guideIds = Object.keys(guides);
      const activeId =
        ui.selectedId !== null && own(guides, ui.selectedId) !== undefined
          ? ui.selectedId
          : guideIds[0];
      const guide = activeId === undefined ? undefined : own(guides, activeId);
      const ready = snapshot.status === "ready";
      const editable = ready && snapshot.writable === true && !ui.saving && !ui.refreshing;
      const conflicted =
        ui.draft !== null &&
        (snapshot.revision !== ui.draft.revision || !equivalent(accepted, ui.draft.base));
      const groups = catalogState.groups ?? [];
      const failures = catalogState.failures ?? [];
      const allRows = modelRows(groups, accepted.bindings, draftData?.bindings);
      const ownerOf = (provider, model) => own(own(data.bindings ?? {}, provider) ?? {}, model);
      const boundRows =
        activeId === undefined
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

      function addGuide() {
        let id;
        const currentData = guidanceStore.getSnapshot().draft?.data ?? accepted;
        do {
          id =
            "guide-" +
            (globalThis.crypto?.randomUUID?.() ??
              Date.now().toString(36) + "-" + Math.random().toString(36).slice(2));
        } while (own(currentData.guides ?? {}, id) !== undefined);

        guidanceStore.update((previous) => {
          if (previous.saving || previous.refreshing) return previous;
          const latest = form.getSnapshot();
          if (latest.status !== "ready" || latest.writable !== true) return previous;
          const next = makeDraft(previous, latest);
          next.data.guides = {
            [id]: { name: t("newGuide"), text: "" },
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
        setOpenMenuId(null);
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
            selectedId: previous.selectedId === id ? null : previous.selectedId,
            message: null,
          };
        });
      }

      function toggleBinding(provider, model, checked, confirmedOwner) {
        if (activeId === undefined) return;
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
        setOpenMenuId(null);
      }

      async function saveDraft(reviewed) {
        const before = guidanceStore.getSnapshot();
        if (before.saving || before.refreshing || before.draft === null) return;
        const latest = form.getSnapshot();
        if (latest.status !== "ready" || latest.writable !== true) return;
        // A reconnect may reset the host's revision counter. Compare the accepted
        // content as well, and bind overwrite consent to the exact reviewed state.
        const expected = reviewed ?? { revision: before.draft.revision, data: before.draft.base };
        if (
          latest.revision !== expected.revision ||
          !equivalent(latest.value?.data ?? emptyData(), expected.data)
        ) {
          guidanceStore.update((previous) => ({
            ...previous,
            message: {
              kind: "warning",
              key: "conflict",
            },
          }));
          return;
        }

        const acquisition = { started: false };
        guidanceStore.update((previous) => {
          if (previous.saving || previous.refreshing || previous.draft === null) return previous;
          acquisition.started = true;
          return { ...previous, saving: true, message: null };
        });
        if (!acquisition.started) return;

        try {
          const ok = await form.mutate(
            [{ op: "set", path: ["data"], value: before.draft.data }],
            expected.revision,
          );
          guidanceStore.update((previous) => ({
            ...previous,
            saving: false,
            draft: ok ? null : previous.draft,
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

      const base = ui.draft?.base ?? accepted;
      const isGuideDirty = (id) => !equivalent(guideState(data, id), guideState(base, id));
      const nameOf = (id) => own(guides, id)?.name || t("unnamed");
      const button = (label, onClick, props = {}) => h(Button, { onClick, ...props }, label);
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
          const target = own(next.guides, activeId);
          if (target === undefined) return false;
          target[field] = value;
        });
      const createButton = () =>
        button(t("new"), addGuide, { variant: "outline", size: "sm", disabled: !editable });
      const guideOptions = guideIds.map((id) =>
        h("option", { key: id, value: id }, nameOf(id) + (isGuideDirty(id) ? " •" : "")),
      );
      const modelSummary = h(
        "section",
        { className: "dmg-bindings", "aria-label": t("selectedModels") },
        h(
          "div",
          { className: "dmg-boundHead" },
          h(
            "span",
            { className: "dmg-fieldLabel" },
            t("selectedModels"),
            " · ",
            t("modelCount", { count: boundRows.length }),
          ),
          button(t("selectModels"), () => setPickerOpen(true), {
            size: "sm",
            variant: "outline",
            disabled: !editable,
          }),
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
                  button("×", () => toggleBinding(row.provider, row.model, false), {
                    size: "sm",
                    disabled: !editable,
                    "aria-label": t("unbind", { name: row.modelName }),
                  }),
                ),
              ),
            )
          : h("p", { className: "dmg-muted" }, t("noBindings")),
      );
      const editor =
        guide === undefined
          ? h(
              "div",
              { className: "dmg-blank" },
              h("h2", null, t(ui.draft === null ? "emptyTitle" : "deletedTitle")),
              h(
                "p",
                { className: "dmg-muted" },
                t(ui.draft === null ? "emptyHelp" : "deletedHelp"),
              ),
            )
          : h(
              "section",
              { className: "dmg-editor", "aria-label": t("editGuide") },
              h(
                "div",
                { className: "dmg-editorHead" },
                h(
                  "label",
                  { className: "dmg-field dmg-nameField", htmlFor: "dmg-guide-name" },
                  h("span", { className: "dmg-fieldLabel" }, t("guideName")),
                  h(Input, {
                    ref: nameInput,
                    id: "dmg-guide-name",
                    className: "dmg-nameInput",
                    value: guide.name ?? "",
                    disabled: !editable,
                    autoComplete: "off",
                    onChange: (event) => changeField("name", event.target.value),
                  }),
                ),
                h(Menu, {
                  open: openMenuId === activeId,
                  onClose: () => setOpenMenuId(null),
                  align: "end",
                  portal: true,
                  autoFocus: true,
                  anchor: button(
                    "⋯",
                    () => setOpenMenuId(openMenuId === activeId ? null : activeId),
                    {
                      disabled: !editable,
                      "aria-label": t("more"),
                      "aria-haspopup": "menu",
                      "aria-expanded": openMenuId === activeId,
                    },
                  ),
                  items: [{ id: "delete", label: t("delete"), danger: true }],
                  onSelect: () => {
                    setOpenMenuId(null);
                    setConfirmation({ kind: "delete", target: activeId });
                  },
                }),
              ),
              modelSummary,
              h(
                "label",
                { className: "dmg-field", htmlFor: "dmg-guide-text" },
                h("span", { className: "dmg-fieldLabel" }, t("instructions")),
                h("textarea", {
                  id: "dmg-guide-text",
                  className: "dmg-textarea",
                  rows: 12,
                  value: guide.text ?? "",
                  disabled: !editable,
                  onChange: (event) => changeField("text", event.target.value),
                }),
              ),
            );
      const picker = h(
        Modal,
        {
          open: pickerOpen && guide !== undefined,
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
              ? t("overwriteHelp")
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
                  void saveDraft(confirmation.reviewed);
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
              h("h1", { className: "dmg-title" }, t("title")),
              button(t("help"), () => setHelpOpen(true), { size: "sm" }),
            ),
            !ready
              ? h(
                  "p",
                  { className: "dmg-muted", role: "status" },
                  t(snapshot.status === "unavailable" ? "unavailable" : "loading"),
                )
              : h(
                  "div",
                  { className: "dmg-layout" },
                  h(
                    "aside",
                    { className: "dmg-guideRail", "aria-label": t("guides") },
                    h(
                      "div",
                      { className: "dmg-railHead" },
                      h("h2", { className: "dmg-railTitle" }, t("guides")),
                      createButton(),
                    ),
                    h(
                      "ul",
                      { className: "dmg-guideList" },
                      ...guideIds.map((id) =>
                        h(
                          "li",
                          {
                            key: id,
                            className: "dmg-guideRow",
                            "data-active": id === activeId ? "true" : "false",
                          },
                          button(
                            h(
                              React.Fragment,
                              null,
                              h("span", { className: "dmg-guideName" }, nameOf(id)),
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
                              "aria-current": id === activeId ? "page" : undefined,
                            },
                          ),
                        ),
                      ),
                    ),
                    !guideIds.length && h("p", { className: "dmg-muted" }, t("noGuides")),
                  ),
                  h(
                    "div",
                    { className: "dmg-editorPane" },
                    h(
                      "div",
                      { className: "dmg-mobileBar" },
                      h(
                        "select",
                        {
                          className: "dmg-select",
                          "aria-label": t("selectGuide"),
                          value: activeId ?? "",
                          onChange: (event) => openGuide(event.target.value),
                        },
                        guideOptions.length
                          ? guideOptions
                          : h("option", { value: "" }, t("noGuides")),
                      ),
                      createButton(),
                    ),
                    editor,
                  ),
                ),
          ),
        ),
        (ui.draft !== null || ui.saving || statusText) &&
          h(
            "footer",
            { className: "dmg-footer" },
            h(
              "div",
              { className: "dmg-footerInner" },
              h(
                "p",
                {
                  className:
                    "dmg-muted" +
                    (conflicted
                      ? " dmg-warning"
                      : ui.message?.kind === "error"
                        ? " dmg-error"
                        : ""),
                  role: "status",
                  "aria-live": "polite",
                },
                statusText,
              ),
              h(
                "div",
                { className: "dmg-actions" },
                button(t(conflicted ? "loadLatest" : "discard"), discardDraft, {
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
            ),
          ),
        picker,
        confirm,
        h(Modal, {
          open: helpOpen,
          onClose: () => setHelpOpen(false),
          title: t("help"),
          closeLabel: t("close"),
          description: t("helpText"),
          className: "dmg-dialog",
        }),
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
