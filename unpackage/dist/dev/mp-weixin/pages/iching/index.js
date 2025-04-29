"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      question: "",
      showResult: false,
      hexagram: {
        name: "乾卦",
        meaning: "天行健，君子以自强不息",
        lines: [
          { type: "yang" },
          { type: "yang" },
          { type: "yang" },
          { type: "yang" },
          { type: "yang" },
          { type: "yang" }
        ]
      },
      interpretation: {
        overall: "整体运势较为顺利，但需保持谦逊谨慎。",
        career: "事业发展前景良好，适合开拓进取。",
        love: "感情运势平稳，需多沟通交流。",
        wealth: "财运亨通，但需注意理财规划。"
      },
      advice: [
        { type: "good", content: "近期适合开展新项目" },
        { type: "good", content: "多与贵人交流合作" },
        { type: "bad", content: "避免冲动决策" }
      ]
    };
  },
  methods: {
    startDivination() {
      if (!this.question) {
        common_vendor.index.showToast({
          title: "请输入问题",
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
    a: $data.question,
    b: common_vendor.o(($event) => $data.question = $event.detail.value),
    c: common_vendor.o((...args) => $options.startDivination && $options.startDivination(...args)),
    d: $data.showResult
  }, $data.showResult ? {
    e: common_vendor.t($data.hexagram.name),
    f: common_vendor.f($data.hexagram.lines, (line, index, i0) => {
      return {
        a: line.type === "yang" ? 1 : "",
        b: line.type === "yin" ? 1 : "",
        c: index
      };
    }),
    g: common_vendor.t($data.hexagram.meaning)
  } : {}, {
    h: $data.showResult
  }, $data.showResult ? {
    i: common_vendor.t($data.interpretation.overall),
    j: common_vendor.t($data.interpretation.career),
    k: common_vendor.t($data.interpretation.love),
    l: common_vendor.t($data.interpretation.wealth)
  } : {}, {
    m: $data.showResult
  }, $data.showResult ? {
    n: common_vendor.f($data.advice, (item, index, i0) => {
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
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/iching/index.js.map
