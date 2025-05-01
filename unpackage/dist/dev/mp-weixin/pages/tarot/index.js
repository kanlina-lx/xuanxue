"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      question: "",
      showResult: false,
<<<<<<< HEAD
      // 星星动画相关状态
      isStarsMoving: false,
      // 星星是否随机运动
      showCelestialShift: false,
      // 星星斗转星移效果
      formCardShape: false,
      flickerStars: false,
      flickeringIndex: -1,
      fadeOutStars: false,
      hideContent: false,
      // 是否隐藏内容
      showProcessText: false,
      // 显示占卜中文字
      starsMovementInterval: null,
      // 用于保存定时器ID
      // 生成随机星星 - 增加数量和大小变化
      stars: Array.from({ length: 150 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 3,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        rotation: Math.random() * 360
        // 添加旋转角度属性
      })),
=======
      showAnimation: false,
      isShuffling: false,
      deck: [],
      selectedCards: [],
>>>>>>> 9bf0e697fe6edbac06ac482b8a83cc0df9086e57
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
  mounted() {
    this.startStarsMovement();
    common_vendor.index.onWindowResize(() => {
      if (this.starsMovementInterval) {
        clearInterval(this.starsMovementInterval);
        this.startStarsMovement();
      }
    });
  },
  beforeDestroy() {
    if (this.starsMovementInterval) {
      clearInterval(this.starsMovementInterval);
      this.starsMovementInterval = null;
    }
  },
  methods: {
<<<<<<< HEAD
    // 星星随机运动
    startStarsMovement() {
      if (this.starsMovementInterval) {
        clearInterval(this.starsMovementInterval);
      }
      this.starsMovementInterval = setInterval(() => {
        if (!this.isStarsMoving && !this.showCelestialShift)
          return;
        this.stars.forEach((star) => {
          if (this.isStarsMoving && !this.showCelestialShift) {
            star.x += star.speedX;
            star.y += star.speedY;
            if (star.x > 105)
              star.x = -5;
            if (star.x < -5)
              star.x = 105;
            if (star.y > 105)
              star.y = -5;
            if (star.y < -5)
              star.y = 105;
            star.rotation = (star.rotation + 0.1) % 360;
          }
          if (this.showCelestialShift) {
            star.x += star.speedX * 5;
            star.y += star.speedY * 5;
            star.rotation = (star.rotation + 2) % 360;
            if (star.x > 105 || star.x < -5 || star.y > 105 || star.y < -5) {
              star.x = Math.random() * 100;
              star.y = Math.random() * 100;
              star.speedX = (Math.random() - 0.5) * 0.4;
              star.speedY = (Math.random() - 0.5) * 0.4;
              star.size = 1 + Math.random() * 3;
            }
          }
        });
      }, 50);
    },
=======
    // 开始占卜
>>>>>>> 9bf0e697fe6edbac06ac482b8a83cc0df9086e57
    startDivination() {
      if (!this.question) {
        common_vendor.index.showToast({
          title: "请输入问题",
          icon: "none"
        });
        return;
      }
<<<<<<< HEAD
      this.showResult = false;
      this.formCardShape = false;
      this.flickerStars = false;
      this.fadeOutStars = false;
      this.hideContent = true;
      this.isStarsMoving = true;
      setTimeout(() => {
        this.showProcessText = true;
        setTimeout(() => {
          this.showCelestialShift = true;
          setTimeout(() => {
            this.formCardShape = true;
            setTimeout(() => {
              this.startFlickering();
              const fadeOutTime = 2e3 + Math.random() * 1e3;
              setTimeout(() => {
                this.fadeOutStars = true;
                setTimeout(() => {
                  this.isStarsMoving = false;
                  this.showCelestialShift = false;
                  this.formCardShape = false;
                  this.flickerStars = false;
                  this.fadeOutStars = false;
                  this.showResult = true;
                  this.hideContent = false;
                  this.showProcessText = false;
                  this.flickeringIndex = -1;
                }, 1e3);
              }, fadeOutTime);
            }, 500);
          }, 1e3);
        }, 1500);
      }, 500);
    },
    startFlickering() {
      this.flickerStars = true;
      this.flickerSequence();
    },
    flickerSequence() {
      const randomIndex = Math.floor(Math.random() * this.stars.length);
      this.flickeringIndex = randomIndex;
      setTimeout(() => {
        if (this.flickerStars && !this.fadeOutStars) {
          this.flickerSequence();
        }
      }, 300 + Math.random() * 300);
=======
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
>>>>>>> 9bf0e697fe6edbac06ac482b8a83cc0df9086e57
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
<<<<<<< HEAD
    a: $data.showCelestialShift
  }, $data.showCelestialShift ? {} : {}, {
    b: common_vendor.f($data.stars, (star, index, i0) => {
      return {
        a: index,
        b: $data.flickerStars && $data.flickeringIndex === index ? 1 : "",
        c: star.x + "%",
        d: star.y + "%",
        e: star.size + "rpx",
        f: star.size + "rpx",
        g: index * 0.05 + "s"
      };
    }),
    c: $data.isStarsMoving ? 1 : "",
    d: $data.showCelestialShift ? 1 : "",
    e: $data.formCardShape ? 1 : "",
    f: $data.fadeOutStars ? 0 : 1,
    g: $data.showCelestialShift ? 1 : "",
    h: $data.question,
    i: common_vendor.o(($event) => $data.question = $event.detail.value),
    j: common_vendor.o((...args) => $options.startDivination && $options.startDivination(...args)),
    k: $data.showResult
  }, $data.showResult ? {
    l: common_vendor.t($data.spread.name),
    m: common_vendor.f($data.spread.cards, (card, index, i0) => {
=======
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
>>>>>>> 9bf0e697fe6edbac06ac482b8a83cc0df9086e57
      return {
        a: common_vendor.t(card.name),
        b: common_vendor.t(card.position),
        c: index
      };
    })
  } : {}, {
<<<<<<< HEAD
    n: $data.showResult
  }, $data.showResult ? {
    o: common_vendor.f($data.spread.cards, (card, index, i0) => {
=======
    l: $data.showResult
  }, $data.showResult ? {
    m: common_vendor.f($data.spread.cards, (card, index, i0) => {
>>>>>>> 9bf0e697fe6edbac06ac482b8a83cc0df9086e57
      return {
        a: common_vendor.t(card.position),
        b: common_vendor.t(card.meaning),
        c: index
      };
    })
  } : {}, {
<<<<<<< HEAD
    p: $data.showResult
  }, $data.showResult ? {
    q: common_vendor.t($data.summary.overall),
    r: common_vendor.t($data.summary.advice)
  } : {}, {
    s: $data.showResult
  }, $data.showResult ? {
    t: common_vendor.f($data.summary.reminders, (item, index, i0) => {
=======
    n: $data.showResult
  }, $data.showResult ? {
    o: common_vendor.t($data.summary.overall),
    p: common_vendor.t($data.summary.advice)
  } : {}, {
    q: $data.showResult
  }, $data.showResult ? {
    r: common_vendor.f($data.summary.reminders, (item, index, i0) => {
>>>>>>> 9bf0e697fe6edbac06ac482b8a83cc0df9086e57
      return {
        a: common_vendor.t(item.type === "good" ? "✓" : "!"),
        b: common_vendor.t(item.content),
        c: index
      };
    })
<<<<<<< HEAD
  } : {}, {
    v: $data.hideContent ? 1 : "",
    w: $data.hideContent && !$data.showResult
  }, $data.hideContent && !$data.showResult ? {
    x: $data.showProcessText ? 1 : ""
  } : {});
=======
  } : {}) : {});
>>>>>>> 9bf0e697fe6edbac06ac482b8a83cc0df9086e57
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/tarot/index.js.map
