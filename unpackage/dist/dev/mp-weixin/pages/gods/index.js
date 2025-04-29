"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      gods: [
        { name: "正官", value: "甲", description: "代表权力、地位" },
        { name: "偏官", value: "乙", description: "代表压力、挑战" },
        { name: "正印", value: "丙", description: "代表智慧、学识" },
        { name: "偏印", value: "丁", description: "代表灵感、创意" },
        { name: "正财", value: "戊", description: "代表财富、收入" },
        { name: "偏财", value: "己", description: "代表投资、理财" },
        { name: "食神", value: "庚", description: "代表才华、技艺" },
        { name: "伤官", value: "辛", description: "代表创新、突破" },
        { name: "比肩", value: "壬", description: "代表朋友、合作" },
        { name: "劫财", value: "癸", description: "代表竞争、挑战" }
      ],
      pattern: {
        main: "正官格",
        characteristics: "命主具有领导才能，做事稳重，有责任心。适合从事管理、行政等工作。",
        advice: "建议多培养决策能力，注意平衡工作与生活。"
      },
      fortunes: [
        { name: "事业运", value: 85 },
        { name: "财运", value: 75 },
        { name: "感情运", value: 70 },
        { name: "健康运", value: 80 }
      ]
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.gods, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.value),
        c: common_vendor.t(item.description),
        d: index
      };
    }),
    b: common_vendor.t($data.pattern.main),
    c: common_vendor.t($data.pattern.characteristics),
    d: common_vendor.t($data.pattern.advice),
    e: common_vendor.f($data.fortunes, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.value + "%",
        c: common_vendor.t(item.value),
        d: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/gods/index.js.map
