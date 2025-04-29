"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      starIndex: 0,
      stars: ["白羊座", "金牛座", "双子座", "巨蟹座", "狮子座", "处女座", "天秤座", "天蝎座", "射手座", "摩羯座", "水瓶座", "双鱼座"],
      showResult: false,
      fortune: {
        date: "2024-03-20",
        overall: 4,
        love: 3,
        career: 4,
        wealth: 3,
        analysis: "今日整体运势较好，适合开展新项目。感情方面需要多沟通，事业上有贵人相助。",
        luckyNumbers: [3, 7, 9],
        luckyColors: ["金色", "紫色"],
        advice: [
          { type: "good", content: "适合参加社交活动" },
          { type: "good", content: "可以尝试新事物" },
          { type: "bad", content: "避免冲动消费" }
        ]
      }
    };
  },
  methods: {
    onStarChange(e) {
      this.starIndex = e.detail.value;
    },
    checkFortune() {
      this.showResult = true;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.stars[$data.starIndex] || "请选择星座"),
    b: $data.starIndex,
    c: $data.stars,
    d: common_vendor.o((...args) => $options.onStarChange && $options.onStarChange(...args)),
    e: common_vendor.o((...args) => $options.checkFortune && $options.checkFortune(...args)),
    f: $data.showResult
  }, $data.showResult ? {
    g: common_vendor.t($data.stars[$data.starIndex]),
    h: common_vendor.t($data.fortune.date),
    i: common_vendor.f(5, (star, index, i0) => {
      return {
        a: index,
        b: index < $data.fortune.overall ? 1 : ""
      };
    }),
    j: common_vendor.f(5, (star, index, i0) => {
      return {
        a: index,
        b: index < $data.fortune.love ? 1 : ""
      };
    }),
    k: common_vendor.f(5, (star, index, i0) => {
      return {
        a: index,
        b: index < $data.fortune.career ? 1 : ""
      };
    }),
    l: common_vendor.f(5, (star, index, i0) => {
      return {
        a: index,
        b: index < $data.fortune.wealth ? 1 : ""
      };
    })
  } : {}, {
    m: $data.showResult
  }, $data.showResult ? {
    n: common_vendor.t($data.fortune.analysis),
    o: common_vendor.f($data.fortune.luckyNumbers, (num, index, i0) => {
      return {
        a: common_vendor.t(num),
        b: index
      };
    }),
    p: common_vendor.f($data.fortune.luckyColors, (color, index, i0) => {
      return {
        a: common_vendor.t(color),
        b: index
      };
    })
  } : {}, {
    q: $data.showResult
  }, $data.showResult ? {
    r: common_vendor.f($data.fortune.advice, (item, index, i0) => {
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
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/star/index.js.map
