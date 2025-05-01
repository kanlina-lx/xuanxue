"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      showAnimation: true,
      showFortune: false,
      currentStep: 0,
      userInfo: null,
      fortuneData: {
        // ... 其他数据
      },
      analysisLines: [],
      palaces: [],
      spouseStars: [],
      starPaths: [],
      yearAnalysis: [],
      traits: [],
      timeWindows: [],
      warnings: [],
      dimensions: [],
      finalReport: {
        show: false,
        content: []
      },
      stars: [],
      showRecalculateBtn: false
    };
  },
  onLoad() {
    this.initBackground();
    this.getUserInfo();
  },
  onShow() {
    this.checkUserInfoUpdate();
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    initBackground() {
      const cachedStars = common_vendor.index.getStorageSync("backgroundStars");
      if (cachedStars && cachedStars.length > 0) {
        this.stars = cachedStars;
        return;
      }
      const windowWidth = common_vendor.index.getSystemInfoSync().windowWidth;
      const windowHeight = common_vendor.index.getSystemInfoSync().windowHeight;
      const stars = Array(200).fill().map(() => ({
        x: Math.random() * windowWidth,
        y: Math.random() * windowHeight,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.5,
        delay: Math.random() * 2
      }));
      common_vendor.index.setStorageSync("backgroundStars", stars);
      this.stars = stars;
    },
    startAnalysis() {
      if (!this.userInfo || !this.userInfo.birthDate) {
        common_vendor.index.__f__("error", "at pages/love/index.vue:259", "用户信息不完整");
        common_vendor.index.switchTab({
          url: "/pages/user/index",
          fail: (err) => {
            common_vendor.index.__f__("error", "at pages/love/index.vue:263", "跳转失败:", err);
            common_vendor.index.showToast({
              title: "请先完善个人信息",
              icon: "none",
              duration: 2e3
            });
          }
        });
        return;
      }
      this.currentStep = 0;
      this.analysisLines = [];
      this.palaces = [];
      this.spouseStars = [];
      this.starPaths = [];
      this.yearAnalysis = [];
      this.traits = [];
      this.timeWindows = [];
      this.warnings = [];
      this.dimensions = [];
      this.finalReport = {
        show: false,
        content: []
      };
      this.analyzePalace();
    },
    analyzePalace() {
      const seed = this.getSeed(this.userInfo.birthDate);
      this.analysisLines = [
        { text: "正在分析命盘...", show: false },
        { text: "正在定位夫妻宫...", show: false },
        { text: "正在分析主星...", show: false }
      ];
      this.palaces = Array(12).fill().map((_, index) => {
        const palaceSeed = this.hashString(seed + index);
        const stars = [
          "紫微",
          "天机",
          "太阳",
          "武曲",
          "天同",
          "廉贞",
          "天府",
          "太阴",
          "贪狼",
          "巨门",
          "天相",
          "天梁"
        ];
        const starIndex = palaceSeed % stars.length;
        return {
          name: [
            "命宫",
            "兄弟宫",
            "夫妻宫",
            "子女宫",
            "财帛宫",
            "疾厄宫",
            "迁移宫",
            "仆役宫",
            "官禄宫",
            "田宅宫",
            "福德宫",
            "父母宫"
          ][index],
          star: stars[starIndex],
          show: false
        };
      });
      this.analysisLines.forEach((line, index) => {
        setTimeout(() => {
          this.$set(this.analysisLines, index, { ...line, show: true });
          if (index === 1) {
            this.$set(this.palaces, 2, { ...this.palaces[2], show: true });
          }
        }, index * 500);
      });
      setTimeout(() => {
        this.currentStep = 1;
        this.analyzeSpouseStar();
      }, 2e3);
    },
    analyzeSpouseStar() {
      const seed = this.getSeed(this.userInfo.birthDate);
      this.analysisLines = [
        { text: "正在解析夫妻宫主星...", show: false },
        { text: "正在分析星曜特质...", show: false },
        { text: "正在计算星曜影响...", show: false }
      ];
      this.spouseStars = Array(3).fill().map((_, index) => {
        const starSeed = this.hashString(seed + "spouse" + index);
        const traits = [
          "主贵气，配偶气质高雅",
          "主智慧，配偶聪明机敏",
          "主光明，配偶热情开朗",
          "主刚毅，配偶性格坚毅",
          "主温和，配偶性格温和",
          "主多情，配偶感情丰富"
        ];
        const traitIndex = starSeed % traits.length;
        return {
          name: ["紫微", "天机", "太阳", "武曲", "天同", "廉贞"][starSeed % 6],
          desc: traits[traitIndex],
          show: false
        };
      });
      this.analysisLines.forEach((line, index) => {
        setTimeout(() => {
          this.$set(this.analysisLines, index, { ...line, show: true });
          if (index < 2) {
            this.$set(this.spouseStars, index, { ...this.spouseStars[index], show: true });
          }
        }, index * 500);
      });
      setTimeout(() => {
        this.currentStep = 2;
        this.analyzeStarPath();
      }, 2e3);
    },
    analyzeStarPath() {
      const seed = this.getSeed(this.userInfo.birthDate);
      this.analysisLines = [
        { text: "正在计算红鸾星轨迹...", show: false },
        { text: "正在计算天喜星轨迹...", show: false },
        { text: "正在分析星曜交汇...", show: false }
      ];
      this.starPaths = Array(2).fill().map((_, index) => {
        const pathSeed = this.hashString(seed + "path" + index);
        const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
        const yearOffset = pathSeed % 5 + 1;
        return {
          name: index === 0 ? "红鸾" : "天喜",
          time: `${currentYear + yearOffset}-${currentYear + yearOffset + 1}`,
          show: false
        };
      });
      this.analysisLines.forEach((line, index) => {
        setTimeout(() => {
          this.$set(this.analysisLines, index, { ...line, show: true });
          if (index < 2) {
            this.$set(this.starPaths, index, { ...this.starPaths[index], show: true });
          }
        }, index * 500);
      });
      setTimeout(() => {
        this.currentStep = 3;
        this.analyzeYear();
      }, 2e3);
    },
    analyzeYear() {
      const seed = this.getSeed(this.userInfo.birthDate);
      this.analysisLines = [
        { text: "正在分析大运...", show: false },
        { text: "正在计算流年...", show: false },
        { text: "正在预测运势...", show: false }
      ];
      this.yearAnalysis = Array(3).fill().map((_, index) => {
        const yearSeed = this.hashString(seed + "year" + index);
        const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
        const yearOffset = yearSeed % 3;
        const descriptions = [
          "桃花运旺盛，易遇正缘",
          "感情稳定，适合结婚",
          "感情考验，需要经营",
          "感情升温，适合表白",
          "感情波动，需要沟通"
        ];
        const descIndex = yearSeed % descriptions.length;
        return {
          time: `${currentYear + yearOffset}年`,
          desc: descriptions[descIndex],
          show: false
        };
      });
      this.analysisLines.forEach((line, index) => {
        setTimeout(() => {
          this.$set(this.analysisLines, index, { ...line, show: true });
          if (index < 2) {
            this.$set(this.yearAnalysis, index, { ...this.yearAnalysis[index], show: true });
          }
        }, index * 500);
      });
      setTimeout(() => {
        this.currentStep = 4;
        this.analyzeTraits();
      }, 2e3);
    },
    analyzeTraits() {
      const seed = this.getSeed(this.userInfo.birthDate);
      this.analysisLines = [
        { text: "正在分析性格特质...", show: false },
        { text: "正在计算匹配度...", show: false },
        { text: "正在生成特质报告...", show: false }
      ];
      this.traits = Array(3).fill().map((_, index) => {
        const traitSeed = this.hashString(seed + "trait" + index);
        const traits = [
          { name: "性格互补", base: 80 },
          { name: "价值观", base: 85 },
          { name: "生活习惯", base: 75 },
          { name: "兴趣爱好", base: 70 },
          { name: "沟通方式", base: 90 }
        ];
        const traitIndex = traitSeed % traits.length;
        const match = Math.min(100, traits[traitIndex].base + traitSeed % 10);
        return {
          name: traits[traitIndex].name,
          match,
          show: false
        };
      });
      this.analysisLines.forEach((line, index) => {
        setTimeout(() => {
          this.$set(this.analysisLines, index, { ...line, show: true });
          if (index < 2) {
            this.$set(this.traits, index, { ...this.traits[index], show: true });
          }
        }, index * 500);
      });
      setTimeout(() => {
        this.currentStep = 5;
        this.analyzeTimeWindow();
      }, 2e3);
    },
    analyzeTimeWindow() {
      const seed = this.getSeed(this.userInfo.birthDate);
      this.analysisLines = [
        { text: "正在计算姻缘时间...", show: false },
        { text: "正在分析最佳时机...", show: false },
        { text: "正在生成时间窗口...", show: false }
      ];
      this.timeWindows = Array(3).fill().map((_, index) => {
        const windowSeed = this.hashString(seed + "window" + index);
        const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
        const month = windowSeed % 12 + 1;
        const yearOffset = Math.floor(index / 2);
        const descriptions = [
          "桃花运旺盛，易遇正缘",
          "感情升温，适合表白",
          "感情稳定，适合结婚",
          "感情考验，需要经营",
          "感情波动，需要沟通"
        ];
        const descIndex = windowSeed % descriptions.length;
        return {
          time: `${currentYear + yearOffset}年${month}月`,
          desc: descriptions[descIndex],
          show: false
        };
      });
      this.analysisLines.forEach((line, index) => {
        setTimeout(() => {
          this.$set(this.analysisLines, index, { ...line, show: true });
          if (index < 2) {
            this.$set(this.timeWindows, index, { ...this.timeWindows[index], show: true });
          }
        }, index * 500);
      });
      setTimeout(() => {
        this.currentStep = 6;
        this.analyzeWarning();
      }, 2e3);
    },
    analyzeWarning() {
      const seed = this.getSeed(this.userInfo.birthDate);
      this.analysisLines = [
        { text: "正在分析感情危机...", show: false },
        { text: "正在计算预警时间...", show: false },
        { text: "正在生成预警报告...", show: false }
      ];
      this.warnings = Array(3).fill().map((_, index) => {
        const warningSeed = this.hashString(seed + "warning" + index);
        const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
        const month = warningSeed % 12 + 1;
        const yearOffset = Math.floor(index / 2) + 1;
        const descriptions = [
          "感情波动期，需要沟通",
          "外界干扰，需要信任",
          "感情考验，需要坚持",
          "价值观冲突，需要理解",
          "生活习惯差异，需要磨合"
        ];
        const descIndex = warningSeed % descriptions.length;
        return {
          time: `${currentYear + yearOffset}年${month}月`,
          desc: descriptions[descIndex],
          show: false
        };
      });
      this.analysisLines.forEach((line, index) => {
        setTimeout(() => {
          this.$set(this.analysisLines, index, { ...line, show: true });
          if (index < 2) {
            this.$set(this.warnings, index, { ...this.warnings[index], show: true });
          }
        }, index * 500);
      });
      setTimeout(() => {
        this.currentStep = 7;
        this.analyzeDimension();
      }, 2e3);
    },
    analyzeDimension() {
      const seed = this.getSeed(this.userInfo.birthDate);
      this.analysisLines = [
        { text: "正在生成三维模型...", show: false },
        { text: "正在计算维度得分...", show: false },
        { text: "正在生成最终报告...", show: false }
      ];
      this.dimensions = Array(3).fill().map((_, index) => {
        const dimSeed = this.hashString(seed + "dimension" + index);
        const dimensions = [
          { name: "性格维度", value: "互补型", base: 80 },
          { name: "时间维度", value: "近期型", base: 85 },
          { name: "空间维度", value: "同城型", base: 75 },
          { name: "价值观维度", value: "契合型", base: 90 },
          { name: "生活维度", value: "协调型", base: 70 }
        ];
        const dimIndex = dimSeed % dimensions.length;
        const score = Math.min(100, dimensions[dimIndex].base + dimSeed % 10);
        return {
          name: dimensions[dimIndex].name,
          value: dimensions[dimIndex].value,
          score,
          show: false
        };
      });
      this.analysisLines.forEach((line, index) => {
        setTimeout(() => {
          this.$set(this.analysisLines, index, { ...line, show: true });
          if (index < 2) {
            this.$set(this.dimensions, index, { ...this.dimensions[index], show: true });
          }
        }, index * 500);
      });
      setTimeout(() => {
        this.generateFinalReport();
      }, 2e3);
    },
    generateFinalReport() {
      this.getSeed(this.userInfo.birthDate);
      this.finalReport.content = [
        { type: "title", text: "正缘分析报告", show: false },
        { type: "summary", text: "基于您的命盘分析，以下是您的正缘特征和姻缘预测：", show: false },
        { type: "section", title: "正缘特征", items: [
          `性格互补型，匹配度${this.traits[0].match}%`,
          `价值观高度契合，匹配度${this.traits[1].match}%`,
          `生活习惯基本一致，匹配度${this.traits[2].match}%`
        ], show: false },
        { type: "section", title: "最佳相遇时间", items: [
          `${this.timeWindows[0].time}：${this.timeWindows[0].desc}`,
          `${this.timeWindows[1].time}：${this.timeWindows[1].desc}`,
          `${this.timeWindows[2].time}：${this.timeWindows[2].desc}`
        ], show: false },
        { type: "section", title: "感情发展建议", items: [
          `${this.warnings[0].time}：${this.warnings[0].desc}`,
          `${this.warnings[1].time}：${this.warnings[1].desc}`,
          `${this.warnings[2].time}：${this.warnings[2].desc}`
        ], show: false },
        { type: "conclusion", text: `综合分析显示，您的正缘将在${this.starPaths[0].time}年间出现，建议把握时机，主动出击。`, show: false }
      ];
      this.finalReport.content.forEach((item, index) => {
        setTimeout(() => {
          this.$set(this.finalReport.content, index, { ...item, show: true });
        }, index * 500);
      });
      setTimeout(() => {
        this.finalReport.show = true;
      }, this.finalReport.content.length * 500);
    },
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
    },
    // 生成种子值
    getSeed(birthday) {
      const birthDate = new Date(birthday);
      return birthDate.getTime().toString();
    },
    // 计算运势值
    calculateValue(seed, type) {
      const hash = this.hashString(seed + type);
      return Math.floor(hash % 30 + 70);
    },
    // 简单的字符串哈希函数
    hashString(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
      }
      return Math.abs(hash);
    },
    // 获取用户信息
    async getUserInfo() {
      try {
        const userInfo = common_vendor.index.getStorageSync("userInfo");
        if (userInfo && userInfo.birthDate) {
          common_vendor.index.__f__("log", "at pages/love/index.vue:721", "获取到的用户信息:", userInfo);
          this.userInfo = userInfo;
          this.startAnalysis();
        } else {
          common_vendor.index.__f__("log", "at pages/love/index.vue:725", "用户信息不完整:", userInfo);
          common_vendor.index.switchTab({
            url: "/pages/user/index",
            fail: (err) => {
              common_vendor.index.__f__("error", "at pages/love/index.vue:730", "跳转失败:", err);
              common_vendor.index.showToast({
                title: "请先完善个人信息",
                icon: "none",
                duration: 2e3
              });
            }
          });
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/love/index.vue:740", "获取用户信息失败:", e);
        common_vendor.index.switchTab({
          url: "/pages/user/index",
          fail: (err) => {
            common_vendor.index.__f__("error", "at pages/love/index.vue:744", "跳转失败:", err);
            common_vendor.index.showToast({
              title: "请先完善个人信息",
              icon: "none",
              duration: 2e3
            });
          }
        });
      }
    },
    // 检查用户信息是否更新
    async checkUserInfoUpdate() {
      try {
        const userInfo = common_vendor.index.getStorageSync("userInfo");
        if (userInfo && userInfo.birthDate) {
          if (JSON.stringify(userInfo) !== JSON.stringify(this.userInfo)) {
            common_vendor.index.__f__("log", "at pages/love/index.vue:762", "用户信息已更新:", userInfo);
            this.userInfo = userInfo;
            this.currentStep = 0;
            this.analysisLines = [];
            this.palaces = [];
            this.spouseStars = [];
            this.starPaths = [];
            this.yearAnalysis = [];
            this.traits = [];
            this.timeWindows = [];
            this.warnings = [];
            this.dimensions = [];
            this.finalReport = {
              show: false,
              content: []
            };
            this.startAnalysis();
          }
        } else {
          common_vendor.index.__f__("log", "at pages/love/index.vue:783", "用户信息不完整:", userInfo);
          common_vendor.index.switchTab({
            url: "/pages/user/index",
            fail: (err) => {
              common_vendor.index.__f__("error", "at pages/love/index.vue:787", "跳转失败:", err);
              common_vendor.index.showToast({
                title: "请先完善个人信息",
                icon: "none",
                duration: 2e3
              });
            }
          });
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/love/index.vue:797", "检查用户信息更新失败:", e);
        common_vendor.index.switchTab({
          url: "/pages/user/index",
          fail: (err) => {
            common_vendor.index.__f__("error", "at pages/love/index.vue:801", "跳转失败:", err);
            common_vendor.index.showToast({
              title: "请先完善个人信息",
              icon: "none",
              duration: 2e3
            });
          }
        });
      }
    },
    // 计算运势
    calculateFortune() {
      if (!this.userInfo || !this.userInfo.birthDate) {
        common_vendor.index.__f__("error", "at pages/love/index.vue:815", "用户信息缺失");
        common_vendor.index.navigateTo({
          url: "/pages/user/index",
          fail: (err) => {
            common_vendor.index.__f__("error", "at pages/love/index.vue:819", "跳转失败:", err);
            common_vendor.index.redirectTo({
              url: "/pages/user/index",
              fail: (err2) => {
                common_vendor.index.__f__("error", "at pages/love/index.vue:823", "重定向失败:", err2);
                common_vendor.index.showToast({
                  title: "请先完善个人信息",
                  icon: "none",
                  duration: 2e3
                });
              }
            });
          }
        });
        return;
      }
      const seed = this.getSeed(this.userInfo.birthDate);
      this.fortuneData.bazi = {
        career: this.calculateValue(seed, "career"),
        wealth: this.calculateValue(seed, "wealth"),
        relationship: this.calculateValue(seed, "relationship")
      };
      this.fortuneData.ziwei = {
        minggong: this.calculateValue(seed, "minggong"),
        shengong: this.calculateValue(seed, "shengong")
      };
      this.fortuneData.qimen = {
        tianpan: this.calculateValue(seed, "tianpan"),
        dipan: this.calculateValue(seed, "dipan")
      };
      this.fortuneData.advice = {
        good: this.generateAdvice(seed, "good"),
        bad: this.generateAdvice(seed, "bad")
      };
      this.startAnimation();
    },
    goToHome() {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    },
    closeReport() {
      this.finalReport.show = false;
    },
    recalculate() {
      common_vendor.index.redirectTo({
        url: "/pages/love/index"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.stars, (star, index, i0) => {
      return {
        a: "star-" + index,
        b: star.x + "px",
        c: star.y + "px",
        d: star.size + "px",
        e: star.size + "px",
        f: star.opacity,
        g: star.delay + "s"
      };
    }),
    b: $data.currentStep === 0
  }, $data.currentStep === 0 ? {
    c: common_vendor.f($data.palaces, (palace, index, i0) => {
      return {
        a: common_vendor.t(palace.name),
        b: common_vendor.t(palace.star),
        c: index,
        d: palace.show ? 1 : ""
      };
    }),
    d: common_vendor.f($data.analysisLines, (line, index, i0) => {
      return {
        a: common_vendor.t(line.text),
        b: index,
        c: line.show ? 1 : ""
      };
    })
  } : {}, {
    e: $data.currentStep === 1
  }, $data.currentStep === 1 ? {
    f: common_vendor.f($data.spouseStars, (star, index, i0) => {
      return {
        a: common_vendor.t(star.name),
        b: common_vendor.t(star.desc),
        c: index,
        d: star.show ? 1 : ""
      };
    }),
    g: common_vendor.f($data.analysisLines, (line, index, i0) => {
      return {
        a: common_vendor.t(line.text),
        b: index,
        c: line.show ? 1 : ""
      };
    })
  } : {}, {
    h: $data.currentStep === 2
  }, $data.currentStep === 2 ? {
    i: common_vendor.f($data.starPaths, (path, index, i0) => {
      return {
        a: common_vendor.t(path.name),
        b: common_vendor.t(path.time),
        c: index,
        d: path.show ? 1 : ""
      };
    }),
    j: common_vendor.f($data.analysisLines, (line, index, i0) => {
      return {
        a: common_vendor.t(line.text),
        b: index,
        c: line.show ? 1 : ""
      };
    })
  } : {}, {
    k: $data.currentStep === 3
  }, $data.currentStep === 3 ? {
    l: common_vendor.f($data.yearAnalysis, (year, index, i0) => {
      return {
        a: common_vendor.t(year.time),
        b: common_vendor.t(year.desc),
        c: index,
        d: year.show ? 1 : ""
      };
    }),
    m: common_vendor.f($data.analysisLines, (line, index, i0) => {
      return {
        a: common_vendor.t(line.text),
        b: index,
        c: line.show ? 1 : ""
      };
    })
  } : {}, {
    n: $data.currentStep === 4
  }, $data.currentStep === 4 ? {
    o: common_vendor.f($data.traits, (trait, index, i0) => {
      return {
        a: common_vendor.t(trait.name),
        b: trait.match + "%",
        c: common_vendor.t(trait.match),
        d: index,
        e: trait.show ? 1 : ""
      };
    }),
    p: common_vendor.f($data.analysisLines, (line, index, i0) => {
      return {
        a: common_vendor.t(line.text),
        b: index,
        c: line.show ? 1 : ""
      };
    })
  } : {}, {
    q: $data.currentStep === 5
  }, $data.currentStep === 5 ? {
    r: common_vendor.f($data.timeWindows, (window, index, i0) => {
      return {
        a: common_vendor.t(window.time),
        b: common_vendor.t(window.desc),
        c: index,
        d: window.show ? 1 : ""
      };
    }),
    s: common_vendor.f($data.analysisLines, (line, index, i0) => {
      return {
        a: common_vendor.t(line.text),
        b: index,
        c: line.show ? 1 : ""
      };
    })
  } : {}, {
    t: $data.currentStep === 6
  }, $data.currentStep === 6 ? {
    v: common_vendor.f($data.warnings, (warning, index, i0) => {
      return {
        a: common_vendor.t(warning.time),
        b: common_vendor.t(warning.desc),
        c: index,
        d: warning.show ? 1 : ""
      };
    }),
    w: common_vendor.f($data.analysisLines, (line, index, i0) => {
      return {
        a: common_vendor.t(line.text),
        b: index,
        c: line.show ? 1 : ""
      };
    })
  } : {}, {
    x: $data.currentStep === 7
  }, $data.currentStep === 7 ? {
    y: common_vendor.f($data.dimensions, (dim, index, i0) => {
      return {
        a: common_vendor.t(dim.name),
        b: common_vendor.t(dim.value),
        c: dim.score + "%",
        d: index,
        e: dim.show ? 1 : ""
      };
    }),
    z: common_vendor.f($data.analysisLines, (line, index, i0) => {
      return {
        a: common_vendor.t(line.text),
        b: index,
        c: line.show ? 1 : ""
      };
    })
  } : {}, {
    A: $data.finalReport.show
  }, $data.finalReport.show ? {
    B: common_vendor.f($data.finalReport.content, (item, index, i0) => {
      return common_vendor.e({
        a: item.type === "title"
      }, item.type === "title" ? {
        b: common_vendor.t(item.text)
      } : item.type === "summary" ? {
        d: common_vendor.t(item.text)
      } : item.type === "section" ? {
        f: common_vendor.t(item.title),
        g: common_vendor.f(item.items, (subItem, subIndex, i1) => {
          return {
            a: common_vendor.t(subItem),
            b: subIndex
          };
        })
      } : item.type === "conclusion" ? {
        i: common_vendor.t(item.text)
      } : {}, {
        c: item.type === "summary",
        e: item.type === "section",
        h: item.type === "conclusion",
        j: index,
        k: common_vendor.n(item.type),
        l: common_vendor.n({
          "show": item.show
        })
      });
    }),
    C: common_vendor.o((...args) => $options.recalculate && $options.recalculate(...args)),
    D: common_vendor.o((...args) => $options.goToHome && $options.goToHome(...args)),
    E: common_vendor.o((...args) => $options.closeReport && $options.closeReport(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/love/index.js.map
