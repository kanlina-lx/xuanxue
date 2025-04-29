"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      birthDate: "",
      birthTime: "",
      birthPlace: "",
      showResult: false,
      pillars: [
        { name: "年柱", value: "甲子", element: "木" },
        { name: "月柱", value: "乙丑", element: "木" },
        { name: "日柱", value: "丙寅", element: "火" },
        { name: "时柱", value: "丁卯", element: "火" }
      ],
      elements: [
        { name: "木", value: 30 },
        { name: "火", value: 40 },
        { name: "土", value: 10 },
        { name: "金", value: 15 },
        { name: "水", value: 5 }
      ],
      analysis: {
        characteristics: "命主五行属火，性格热情开朗，富有创造力。木火相生，主聪明才智，但需注意控制情绪。",
        advice: "建议多接触水属性的事物，以平衡五行。事业发展宜选择与火、木相关的行业。"
      }
    };
  },
  methods: {
    onDateChange(e) {
      this.birthDate = e.detail.value;
    },
    onTimeChange(e) {
      this.birthTime = e.detail.value;
    },
    calculate() {
      if (!this.birthDate || !this.birthTime || !this.birthPlace) {
        common_vendor.index.showToast({
          title: "请填写完整信息",
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
    a: common_vendor.t($data.birthDate || "请选择日期"),
    b: $data.birthDate,
    c: common_vendor.o((...args) => $options.onDateChange && $options.onDateChange(...args)),
    d: common_vendor.t($data.birthTime || "请选择时间"),
    e: $data.birthTime,
    f: common_vendor.o((...args) => $options.onTimeChange && $options.onTimeChange(...args)),
    g: $data.birthPlace,
    h: common_vendor.o(($event) => $data.birthPlace = $event.detail.value),
    i: common_vendor.o((...args) => $options.calculate && $options.calculate(...args)),
    j: $data.showResult
  }, $data.showResult ? {
    k: common_vendor.f($data.pillars, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.value),
        c: common_vendor.t(item.element),
        d: index
      };
    })
  } : {}, {
    l: $data.showResult
  }, $data.showResult ? {
    m: common_vendor.f($data.elements, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.value + "%",
        c: common_vendor.t(item.value),
        d: index
      };
    }),
    n: common_vendor.t($data.analysis.characteristics),
    o: common_vendor.t($data.analysis.advice)
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/birth/index.js.map
