"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      question: "",
      showResult: false,
      showAnimation: false,
      isShuffling: false,
      deck: [],
      selectedCards: [],
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
      },
      // 塔罗牌数据
      tarotCards: [
        { name: "愚者", meaning: "新的开始，冒险，天真" },
        { name: "魔术师", meaning: "创造力，技能，专注" },
        { name: "女祭司", meaning: "直觉，神秘，智慧" }
        // ... 其他牌
      ]
    };
  },
  methods: {
    // 开始占卜
    startDivination() {
      if (!this.question) {
        common_vendor.index.showToast({
          title: "请输入问题",
          icon: "none"
        });
        return;
      }
      this.showAnimation = true;
      this.isShuffling = true;
      this.initializeDeck();
      setTimeout(() => {
        this.isShuffling = false;
        this.drawCards();
      }, 2e3);
    },
    // 初始化牌组
    initializeDeck() {
      this.deck = this.tarotCards.map((card) => ({
        ...card,
        selected: false,
        position: Math.random() * 360
      }));
    },
    // 获取卡片样式
    getCardStyle(index) {
      const card = this.deck[index];
      return {
        transform: `rotate(${card.position}deg)`,
        zIndex: card.selected ? 100 : index
      };
    },
    // 抽牌
    drawCards() {
      const selectedIndices = [];
      while (selectedIndices.length < 3) {
        const index = Math.floor(Math.random() * this.deck.length);
        if (!selectedIndices.includes(index)) {
          selectedIndices.push(index);
        }
      }
      selectedIndices.forEach((index, i) => {
        setTimeout(() => {
          this.$set(this.deck[index], "selected", true);
          this.selectedCards.push(this.deck[index]);
          if (i === selectedIndices.length - 1) {
            setTimeout(() => {
              this.showAnimation = false;
              this.showResult = true;
            }, 1e3);
          }
        }, i * 500);
      });
    },
    // 获取星星样式
    getStarStyle(index) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 2 + 1;
      const delay = Math.random() * 2;
      return {
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}rpx`,
        height: `${size}rpx`,
        animationDelay: `${delay}s`
      };
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f(200, (i, k0, i0) => {
      return {
        a: i,
        b: common_vendor.s($options.getStarStyle(i))
      };
    }),
    b: $data.showAnimation
  }, $data.showAnimation ? {
    c: common_vendor.f($data.deck, (card, index, i0) => {
      return common_vendor.e({
        a: card.selected
      }, card.selected ? {
        b: common_vendor.t(card.name),
        c: common_vendor.t(card.meaning)
      } : {}, {
        d: index,
        e: common_vendor.s($options.getCardStyle(index)),
        f: card.selected ? 1 : ""
      });
    }),
    d: $data.isShuffling ? 1 : ""
  } : {}, {
    e: !$data.showAnimation
  }, !$data.showAnimation ? common_vendor.e({
    f: $data.question,
    g: common_vendor.o(($event) => $data.question = $event.detail.value),
    h: common_vendor.o((...args) => $options.startDivination && $options.startDivination(...args)),
    i: $data.showResult
  }, $data.showResult ? {
    j: common_vendor.t($data.spread.name),
    k: common_vendor.f($data.spread.cards, (card, index, i0) => {
      return {
        a: common_vendor.t(card.name),
        b: common_vendor.t(card.position),
        c: index
      };
    })
  } : {}, {
    l: $data.showResult
  }, $data.showResult ? {
    m: common_vendor.f($data.spread.cards, (card, index, i0) => {
      return {
        a: common_vendor.t(card.position),
        b: common_vendor.t(card.meaning),
        c: index
      };
    })
  } : {}, {
    n: $data.showResult
  }, $data.showResult ? {
    o: common_vendor.t($data.summary.overall),
    p: common_vendor.t($data.summary.advice)
  } : {}, {
    q: $data.showResult
  }, $data.showResult ? {
    r: common_vendor.f($data.summary.reminders, (item, index, i0) => {
      return {
        a: common_vendor.t(item.type === "good" ? "✓" : "!"),
        b: common_vendor.t(item.content),
        c: index
      };
    })
  } : {}) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/tarot/index.js.map
