"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      question: "",
      showResult: false,
      spread: {
        name: "三张牌阵",
        cards: [
          {
            name: "愚者",
            position: "过去",
            meaning: "代表新的开始和冒险精神"
          },
          {
            name: "女祭司",
            position: "现在",
            meaning: "代表直觉和内在智慧"
          },
          {
            name: "太阳",
            position: "未来",
            meaning: "代表成功和光明前景"
          }
        ]
      },
      summary: {
        overall: "整体运势较好，新的开始带来机遇，需要保持开放和积极的心态。",
        advice: "建议多倾听内心的声音，保持乐观积极的态度。",
        reminders: [
          { type: "good", content: "适合尝试新事物" },
          { type: "good", content: "多关注内心感受" },
          { type: "bad", content: "避免过度理想化" }
        ]
      }
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
    e: common_vendor.t($data.spread.name),
    f: common_vendor.f($data.spread.cards, (card, index, i0) => {
      return {
        a: common_vendor.t(card.name),
        b: common_vendor.t(card.position),
        c: index
      };
    })
  } : {}, {
    g: $data.showResult
  }, $data.showResult ? {
    h: common_vendor.f($data.spread.cards, (card, index, i0) => {
      return {
        a: common_vendor.t(card.position),
        b: common_vendor.t(card.meaning),
        c: index
      };
    })
  } : {}, {
    i: $data.showResult
  }, $data.showResult ? {
    j: common_vendor.t($data.summary.overall),
    k: common_vendor.t($data.summary.advice)
  } : {}, {
    l: $data.showResult
  }, $data.showResult ? {
    m: common_vendor.f($data.summary.reminders, (item, index, i0) => {
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
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/tarot/index.js.map
