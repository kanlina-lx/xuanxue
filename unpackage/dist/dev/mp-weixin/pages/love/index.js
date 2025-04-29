"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      loveAnalysis: {
        features: ["温柔体贴", "事业有成", "家庭观念强", "幽默风趣"],
        timing: "未来1-2年内",
        advice: "保持开放心态，多参与社交活动",
        score: 85,
        personalityMatch: "你们性格互补，能够互相理解和支持。你的理性思维与对方的感性特质形成良好的平衡。",
        valueMatch: "在家庭观念、事业发展等方面有很高的契合度，对未来的规划也较为一致。",
        interactionMode: "相处模式以互相尊重、平等沟通为主，能够共同成长。",
        reminders: [
          { type: "good", content: "近期有桃花运，注意把握机会" },
          { type: "good", content: "适合参加社交活动，扩大交际圈" },
          { type: "bad", content: "避免过于理想化，保持理性判断" }
        ]
      }
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.loveAnalysis.features, (tag, index, i0) => {
      return {
        a: common_vendor.t(tag),
        b: index
      };
    }),
    b: common_vendor.t($data.loveAnalysis.timing),
    c: common_vendor.t($data.loveAnalysis.advice),
    d: common_vendor.t($data.loveAnalysis.score),
    e: $data.loveAnalysis.score + "%",
    f: common_vendor.t($data.loveAnalysis.personalityMatch),
    g: common_vendor.t($data.loveAnalysis.valueMatch),
    h: common_vendor.t($data.loveAnalysis.interactionMode),
    i: common_vendor.f($data.loveAnalysis.reminders, (item, index, i0) => {
      return {
        a: common_vendor.t(item.type === "good" ? "✓" : "!"),
        b: common_vendor.t(item.content),
        c: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/love/index.js.map
