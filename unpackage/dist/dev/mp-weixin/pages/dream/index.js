"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      dream: "",
      showResult: false,
      dreamAnalysis: {
        types: ["预知梦", "心理梦", "愿望梦"],
        meaning: "此梦预示着近期可能会有新的机遇出现，需要保持开放的心态。",
        psychology: "反映了您对未来的期待和担忧，建议保持积极乐观的心态。",
        fortunes: [
          { name: "事业运", value: 75 },
          { name: "财运", value: 80 },
          { name: "感情运", value: 70 },
          { name: "健康运", value: 85 }
        ],
        advice: [
          { type: "good", content: "近期适合尝试新事物" },
          { type: "good", content: "多与朋友交流分享" },
          { type: "bad", content: "避免过度劳累" }
        ]
      }
    };
  },
  methods: {
    interpret() {
      if (!this.dream) {
        common_vendor.index.showToast({
          title: "请输入梦境内容",
          icon: "none"
        });
        return;
      }
      this.showResult = true;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.dream,
    b: common_vendor.o(($event) => $data.dream = $event.detail.value),
    c: common_vendor.o((...args) => $options.interpret && $options.interpret(...args)),
    d: $data.showResult
  }, $data.showResult ? {
    e: common_vendor.f($data.dreamAnalysis.types, (tag, index, i0) => {
      return {
        a: common_vendor.t(tag),
        b: index
      };
    }),
    f: common_vendor.t($data.dreamAnalysis.meaning),
    g: common_vendor.t($data.dreamAnalysis.psychology)
  } : {}, {
    h: $data.showResult
  }, $data.showResult ? {
    i: common_vendor.f($data.dreamAnalysis.fortunes, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.value + "%",
        c: common_vendor.t(item.value),
        d: index
      };
    })
  } : {}, {
    j: $data.showResult
  }, $data.showResult ? {
    k: common_vendor.f($data.dreamAnalysis.advice, (item, index, i0) => {
      return {
        a: common_vendor.t(item.type === "good" ? "✓" : "!"),
        b: common_vendor.t(item.content),
        c: index
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/dream/index.js.map
