"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_hexagramData = require("../../utils/hexagram-data.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      question: "",
      result: {
        original: {
          name: "",
          lines: "",
          judgment: "",
          image: "",
          explanation: "",
          fortune: "",
          career: "",
          love: "",
          wealth: "",
          health: "",
          reminder: ""
        },
        changed: null
      },
      history: [],
      isDivining: false,
      coins: Array(3).fill().map(() => ({
        flipping: false,
        result: null,
        showResult: false
      })),
      processText: "请静心默念所问之事...",
      currentYao: 0,
      allCoinResults: [],
      stars: common_vendor.index.getStorageSync("backgroundStars") || [],
      meteors: common_vendor.index.getStorageSync("backgroundMeteors") || [],
      showResult: false,
      showHexagram: false,
      showJudgment: false,
      showImage: false,
      showChanged: false,
      showExplanation: false,
      showFortune: false,
      showAdvice: false,
      showCoins: false,
      throwCoinsResolve: null,
      shellStars: Array(20).fill().map(() => ({
        x: Math.random() * 160 - 80,
        y: Math.random() * 160 - 80,
        rotation: Math.random() * 360,
        delay: Math.random() * 2
      })),
      coinResults: [],
      isShaking: false
    };
  },
  methods: {
    // 修改初始化星空背景的方法
    initBackground() {
      if (common_vendor.index.getStorageSync("backgroundStars") && common_vendor.index.getStorageSync("backgroundMeteors")) {
        this.stars = common_vendor.index.getStorageSync("backgroundStars");
        this.meteors = common_vendor.index.getStorageSync("backgroundMeteors");
        return;
      }
      const windowWidth = common_vendor.index.getSystemInfoSync().windowWidth;
      const windowHeight = common_vendor.index.getSystemInfoSync().windowHeight;
      const stars = Array(100).fill().map(() => ({
        x: Math.random() * windowWidth,
        y: Math.random() * windowHeight,
        size: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.5,
        delay: Math.random() * 2
      }));
      const meteors = Array(5).fill().map(() => ({
        x: Math.random() * windowWidth,
        y: Math.random() * windowHeight,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        delay: Math.random() * 3
      }));
      common_vendor.index.setStorageSync("backgroundStars", stars);
      common_vendor.index.setStorageSync("backgroundMeteors", meteors);
      this.stars = stars;
      this.meteors = meteors;
    },
    // 星星移动到目标位置
    async moveStarsToTarget() {
      return new Promise((resolve) => {
        const centerX = common_vendor.index.getSystemInfoSync().windowWidth / 2;
        const centerY = common_vendor.index.getSystemInfoSync().windowHeight / 2;
        this.stars.forEach((star) => {
          star.startX = star.x;
          star.startY = star.y;
          star.targetX = centerX;
          star.targetY = centerY;
          star.progress = 0;
          star.speed = Math.random() * 0.02 + 0.01;
          star.size = Math.random() * 1 + 0.5;
          star.opacity = Math.random() * 0.5 + 0.5;
        });
        const interval = setInterval(() => {
          let allReached = true;
          this.stars.forEach((star) => {
            if (star.progress < 1) {
              allReached = false;
              star.progress += star.speed;
              const easeProgress = 1 - Math.pow(1 - star.progress, 3);
              star.x = star.startX + (star.targetX - star.startX) * easeProgress;
              star.y = star.startY + (star.targetY - star.startY) * easeProgress;
              if (star.progress > 0.7) {
                star.size = star.size * (1 - (star.progress - 0.7) * 2);
                star.opacity = 1 - (star.progress - 0.7) * 2;
              }
            }
          });
          if (allReached) {
            clearInterval(interval);
            resolve();
          }
        }, 16);
      });
    },
    // 星星散开形成文字
    async scatterStarsToText(text, startX, startY, fontSize) {
      const canvas = common_vendor.index.createCanvasContext("textCanvas");
      canvas.setFontSize(fontSize);
      canvas.setTextBaseline("top");
      canvas.setFillStyle("#fff");
      canvas.fillText(text, 0, 0);
      const { width, height } = await new Promise((resolve) => {
        canvas.measureText(text, (res) => {
          resolve(res);
        });
      });
      const imageData = await new Promise((resolve) => {
        canvas.draw(false, () => {
          common_vendor.index.canvasGetImageData({
            canvasId: "textCanvas",
            x: 0,
            y: 0,
            width,
            height,
            success: (res) => {
              resolve(res);
            }
          });
        });
      });
      const textStars = [];
      const centerX = common_vendor.index.getSystemInfoSync().windowWidth / 2;
      const centerY = common_vendor.index.getSystemInfoSync().windowHeight / 2;
      for (let y = 0; y < height; y += 2) {
        for (let x = 0; x < width; x += 2) {
          const index = (y * width + x) * 4;
          if (imageData.data[index + 3] > 0) {
            textStars.push({
              startX: centerX,
              startY: centerY,
              targetX: startX + x,
              targetY: startY + y,
              x: centerX,
              y: centerY,
              size: Math.random() * 1.5 + 0.5,
              opacity: 1,
              active: true,
              progress: 0,
              speed: Math.random() * 0.02 + 0.01
            });
          }
        }
      }
      return textStars;
    },
    // 星星汇聚成硬币
    async formCoin() {
      const centerX = common_vendor.index.getSystemInfoSync().windowWidth / 2;
      const centerY = common_vendor.index.getSystemInfoSync().windowHeight / 2;
      const coinSize = 120;
      const coinGap = 160;
      const coinResults = Array(3).fill().map(() => Math.random() > 0.5 ? "正" : "反");
      await this.moveStarsToTarget();
      const coinStars = [];
      for (let coinIndex = 0; coinIndex < 3; coinIndex++) {
        const offsetX = (coinIndex - 1) * coinGap;
        for (let i = 0; i < 360; i++) {
          const angle = i / 180 * Math.PI;
          coinStars.push({
            x: centerX + offsetX + Math.cos(angle) * coinSize / 2,
            y: centerY + Math.sin(angle) * coinSize / 2,
            size: 2,
            opacity: 1,
            active: true,
            isBorder: true,
            angle
          });
        }
        const textStars = await this.scatterStarsToText(
          coinResults[coinIndex],
          centerX + offsetX - 20,
          centerY - 20,
          40
        );
        coinStars.push(...textStars);
      }
      this.stars = coinStars;
      await new Promise((resolve) => setTimeout(resolve, 2e3));
      return coinResults;
    },
    // 修改 throwCoins 方法
    async throwCoins() {
      if (this.showCoins) {
        this.showCoins = false;
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
      this.isShaking = true;
      this.coinResults = Array(3).fill().map(() => Math.random() > 0.5 ? "正" : "反");
      this.showCoins = true;
      setTimeout(() => {
        this.isShaking = false;
      }, 300);
      if (this.throwCoinsResolve) {
        this.throwCoinsResolve();
        this.throwCoinsResolve = null;
      }
      return this.coinResults;
    },
    // 生成单爻
    generateYao(coinResults) {
      const positiveCount = coinResults.filter((result) => result === "正").length;
      let value;
      let isChanging = false;
      switch (positiveCount) {
        case 3:
          value = 9;
          isChanging = true;
          break;
        case 2:
          value = 7;
          break;
        case 1:
          value = 8;
          break;
        case 0:
          value = 6;
          isChanging = true;
          break;
      }
      return {
        value,
        isChanging
      };
    },
    // 生成完整卦象
    async generateHexagram() {
      const lines = this.allCoinResults.map((coinResults) => this.generateYao(coinResults));
      const originalBinary = lines.map((l) => {
        return l.value === 7 || l.value === 9 ? "1" : "0";
      }).join("");
      const originalId = utils_hexagramData.hexagramMap[originalBinary] || 1;
      const changedBinary = lines.map((l) => {
        if (l.isChanging) {
          return l.value === 9 ? "0" : "1";
        } else {
          return l.value === 7 || l.value === 9 ? "1" : "0";
        }
      }).join("");
      const changedId = utils_hexagramData.hexagramMap[changedBinary] || 1;
      try {
        const { result: hexagramData } = await common_vendor.nr.callFunction({
          name: "hexagram",
          data: {
            action: "getHexagram",
            originalId,
            changedId
          }
        });
        return {
          original: {
            ...hexagramData.original,
            lines: originalBinary.split("")
          },
          changed: hexagramData.changed ? {
            ...hexagramData.changed,
            lines: changedBinary.split("")
          } : null,
          changingLines: lines.map((l, index) => l.isChanging ? 6 - index : null).filter((i) => i !== null)
        };
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/iching/index.vue:512", "获取卦象数据失败:", error);
        return {
          original: utils_hexagramData.hexagrams[0],
          changed: null,
          changingLines: []
        };
      }
    },
    // 执行占卜
    async divinate() {
      if (!this.question) {
        common_vendor.index.showToast({
          title: "请输入问题",
          icon: "none"
        });
        return;
      }
      this.isDivining = true;
      this.processText = "请点击龟壳开始占卜...";
      this.showResult = false;
      this.currentYao = 0;
      this.allCoinResults = [];
      this.showCoins = false;
      try {
        for (let yao = 0; yao < 6; yao++) {
          this.currentYao = yao + 1;
          this.processText = `请点击龟壳投掷第${this.currentYao}爻...`;
          await new Promise((resolve) => {
            this.throwCoinsResolve = resolve;
          });
          const coinResults = await this.throwCoins();
          this.allCoinResults.push(coinResults);
        }
        this.processText = "卦象生成中...";
        this.result = await this.generateHexagram();
        this.saveToHistory();
        this.showResult = true;
        this.showHexagram = true;
        this.showJudgment = true;
        this.showImage = true;
        this.showChanged = true;
        this.showExplanation = true;
        this.showFortune = true;
        this.showAdvice = true;
        this.processText = "占卜完成";
      } finally {
        this.isDivining = false;
        this.throwCoinsResolve = null;
      }
    },
    // 本地存储历史记录
    saveToHistory() {
      this.history.unshift({
        date: (/* @__PURE__ */ new Date()).toISOString(),
        question: this.question,
        ...this.result
      });
      this.history = this.history.slice(0, 3);
      common_vendor.index.setStorageSync("divinationHistory", this.history);
    },
    // 加载历史记录
    loadHistory() {
      this.history = common_vendor.index.getStorageSync("divinationHistory") || [];
    },
    // 获取卦象解释
    getGuaExplanation(gua) {
      return this.guaExplanations[gua.name] || "暂无详细解释";
    },
    // 获取吉凶判断
    getFortune(gua, type) {
      var _a;
      return ((_a = this.fortuneData[gua.name]) == null ? void 0 : _a[type]) || "暂无判断";
    },
    // 获取建议
    getAdvice(gua) {
      return this.adviceData[gua.name] || [];
    }
  },
  onLoad() {
    this.initBackground();
  },
  mounted() {
    this.loadHistory();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.meteors, (meteor, index, i0) => {
      return {
        a: index,
        b: meteor.x + "px",
        c: meteor.y + "px",
        d: `scale(${meteor.size})`,
        e: meteor.opacity,
        f: meteor.delay + "s"
      };
    }),
    b: common_vendor.f($data.stars, (star, index, i0) => {
      return {
        a: index,
        b: star.x + "px",
        c: star.y + "px",
        d: `scale(${star.size})`,
        e: star.opacity,
        f: star.delay + "s"
      };
    }),
    c: $data.question,
    d: common_vendor.o(($event) => $data.question = $event.detail.value),
    e: $data.isDivining
  }, $data.isDivining ? common_vendor.e({
    f: common_assets._imports_0$1,
    g: $data.showCoins
  }, $data.showCoins ? {
    h: common_vendor.f($data.coinResults, (result, index, i0) => {
      return {
        a: "/static/images/yingbi-" + (result === "正" ? "zheng" : "z") + ".png",
        b: index,
        c: index * 0.2 + "s"
      };
    })
  } : {}, {
    i: common_vendor.o((...args) => $options.throwCoins && $options.throwCoins(...args)),
    j: $data.isShaking ? 1 : "",
    k: common_vendor.t($data.processText),
    l: $data.currentYao > 0
  }, $data.currentYao > 0 ? {
    m: common_vendor.t($data.currentYao)
  } : {}) : {}, {
    n: $data.showResult && $data.showHexagram
  }, $data.showResult && $data.showHexagram ? common_vendor.e({
    o: common_vendor.t($data.result.original.name),
    p: common_vendor.f($data.result.original.lines, (line, index, i0) => {
      return common_vendor.e({
        a: line === "1"
      }, line === "1" ? {} : {}, {
        b: index
      });
    }),
    q: $data.result.changed
  }, $data.result.changed ? {
    r: common_vendor.t($data.result.changed.name),
    s: common_vendor.f($data.result.changed.lines, (line, index, i0) => {
      return common_vendor.e({
        a: line === "1"
      }, line === "1" ? {} : {}, {
        b: index
      });
    })
  } : {}) : {}, {
    t: common_vendor.t($data.isDivining ? "占卜中..." : "开始占卜"),
    v: $data.isDivining && !$data.showCoins
  }, $data.isDivining && !$data.showCoins ? {} : {}, {
    w: common_vendor.o((...args) => $options.divinate && $options.divinate(...args)),
    x: $data.isDivining,
    y: $data.showResult
  }, $data.showResult ? common_vendor.e({
    z: $data.showHexagram
  }, $data.showHexagram ? {
    A: common_vendor.t($data.result.original.name)
  } : {}, {
    B: $data.showJudgment
  }, $data.showJudgment ? {
    C: common_vendor.t($data.result.original.judgment)
  } : {}, {
    D: $data.showImage
  }, $data.showImage ? {
    E: common_vendor.t($data.result.original.image)
  } : {}, {
    F: $data.showChanged && $data.result.changed
  }, $data.showChanged && $data.result.changed ? {
    G: common_vendor.t($data.result.changed.name),
    H: common_vendor.t($data.result.changed.judgment)
  } : {}, {
    I: $data.showExplanation
  }, $data.showExplanation ? {
    J: common_vendor.t($data.result.original.explanation)
  } : {}, {
    K: $data.showFortune
  }, $data.showFortune ? {
    L: common_vendor.t($data.result.original.fortune),
    M: common_vendor.t($data.result.original.career),
    N: common_vendor.t($data.result.original.love),
    O: common_vendor.t($data.result.original.wealth),
    P: common_vendor.t($data.result.original.health),
    Q: common_vendor.t($data.result.original.reminder)
  } : {}) : {}, {
    R: $data.history.length > 0
  }, $data.history.length > 0 ? {
    S: common_vendor.f($data.history, (item, idx, i0) => {
      var _a, _b;
      return {
        a: common_vendor.t(item.date.slice(0, 10)),
        b: common_vendor.t(item.question),
        c: common_vendor.t(((_a = item.original) == null ? void 0 : _a.name) || "未知卦象"),
        d: common_vendor.t(((_b = item.changed) == null ? void 0 : _b.name) || "无变卦"),
        e: idx
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/iching/index.js.map
