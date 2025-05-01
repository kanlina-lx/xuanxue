"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userInfoComplete: false,
      userInfo: null,
      currentStep: 0,
      pillars: [],
      elements: {},
      fortune: {
        overall: "",
        career: "",
        wealth: "",
        love: "",
        health: ""
      },
      analysisLines: [
        { text: "正在分析八字...", show: false },
        { text: "正在计算天干地支...", show: false },
        { text: "正在生成命盘...", show: false }
      ],
      elementLines: [
        { text: "正在分析五行...", show: false },
        { text: "正在计算旺衰...", show: false },
        { text: "正在生成运势...", show: false }
      ],
      fortuneLines: [
        { text: "正在分析运势...", show: false },
        { text: "正在计算吉凶...", show: false },
        { text: "正在生成建议...", show: false }
      ],
      showReport: false,
      reportItems: [
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ],
      lastUpdateTime: null,
      stars: [],
      meteors: [],
      showRecalculateBtn: false
    };
  },
  onShow() {
    this.checkUserInfo();
  },
  onLoad() {
    this.initBackground();
  },
  watch: {
    "userInfo.birthDate": {
      handler(newVal) {
        if (newVal) {
          this.resetAnalysis();
          this.startAnalysis();
        }
      },
      deep: true
    }
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
    resetAnalysis() {
      this.currentStep = 0;
      this.pillars = [];
      this.elements = {};
      this.fortune = {
        overall: "",
        career: "",
        wealth: "",
        love: "",
        health: ""
      };
      this.showReport = false;
      this.reportItems = this.reportItems.map(() => ({ show: false }));
      this.lastUpdateTime = (/* @__PURE__ */ new Date()).getTime();
      common_vendor.index.removeStorageSync("fortuneData");
    },
    checkUserInfo() {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      if (userInfo && userInfo.birthDate && userInfo.birthTime && userInfo.birthPlace) {
        this.userInfoComplete = true;
        if (JSON.stringify(userInfo) !== JSON.stringify(this.userInfo)) {
          this.userInfo = userInfo;
          this.resetAnalysis();
          this.startAnalysis();
        }
      } else {
        this.userInfoComplete = false;
      }
    },
    goToUserCenter() {
      common_vendor.index.switchTab({
        url: "/pages/user/index"
      });
    },
    startAnalysis() {
      if (!this.userInfo || !this.userInfo.birthDate) {
        common_vendor.index.__f__("error", "at pages/daily/index.vue:233", "用户信息不完整");
        common_vendor.index.switchTab({
          url: "/pages/user/index",
          fail: (err) => {
            common_vendor.index.__f__("error", "at pages/daily/index.vue:237", "跳转失败:", err);
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
      this.pillars = [];
      this.elements = {};
      this.fortune = {
        overall: "",
        career: "",
        wealth: "",
        love: "",
        health: ""
      };
      this.showReport = false;
      this.reportItems = this.reportItems.map(() => ({ show: false }));
      this.lastUpdateTime = (/* @__PURE__ */ new Date()).getTime();
      this.analyzePillars();
    },
    analyzePillars() {
      this.analysisLines = this.analysisLines.map((line) => ({ ...line, show: false }));
      this.analysisLines.forEach((line, index) => {
        setTimeout(() => {
          this.$set(this.analysisLines, index, { ...line, show: true });
        }, index * 500);
      });
      setTimeout(() => {
        const today = /* @__PURE__ */ new Date();
        const birthDate = new Date(this.userInfo.birthDate);
        const birthTime = this.userInfo.birthTime.split(":");
        const birthHour = parseInt(birthTime[0]);
        const birthMinute = parseInt(birthTime[1]);
        const seed = this.generateSeed(birthDate, birthHour, birthMinute);
        const pillars = this.generatePillars(seed, today);
        this.pillars = pillars.map((pillar) => ({ ...pillar, show: false }));
        this.pillars.forEach((pillar, index) => {
          setTimeout(() => {
            this.$set(this.pillars, index, { ...pillar, show: true });
          }, index * 200);
        });
        setTimeout(() => {
          this.currentStep = 1;
          this.analyzeElements();
        }, 2e3);
      }, 1500);
    },
    analyzeElements() {
      this.elementLines = this.elementLines.map((line) => ({ ...line, show: false }));
      this.elementLines.forEach((line, index) => {
        setTimeout(() => {
          this.$set(this.elementLines, index, { ...line, show: true });
        }, index * 500);
      });
      setTimeout(() => {
        const birthDate = new Date(this.userInfo.birthDate);
        const birthTime = this.userInfo.birthTime.split(":");
        const birthHour = parseInt(birthTime[0]);
        const birthMinute = parseInt(birthTime[1]);
        const elements = this.calculateElements(birthDate, birthHour, birthMinute);
        this.elements = elements;
        setTimeout(() => {
          this.currentStep = 2;
          this.analyzeFortune();
        }, 2e3);
      }, 1500);
    },
    analyzeFortune() {
      this.fortuneLines = this.fortuneLines.map((line) => ({ ...line, show: false }));
      this.fortuneLines.forEach((line, index) => {
        setTimeout(() => {
          this.$set(this.fortuneLines, index, { ...line, show: true });
        }, index * 500);
      });
      setTimeout(() => {
        const birthDate = new Date(this.userInfo.birthDate);
        const birthTime = this.userInfo.birthTime.split(":");
        const birthHour = parseInt(birthTime[0]);
        const birthMinute = parseInt(birthTime[1]);
        const birthPlace = this.userInfo.birthPlace;
        const fortune = this.calculateFortune(birthDate, birthHour, birthMinute, birthPlace);
        this.fortune = fortune;
        setTimeout(() => {
          this.showReport = true;
          this.reportItems.forEach((item, index) => {
            setTimeout(() => {
              this.$set(this.reportItems, index, { ...item, show: true });
            }, index * 500);
          });
        }, 2e3);
      }, 1500);
    },
    // 生成种子值
    generateSeed(birthDate, birthHour, birthMinute) {
      const year = birthDate.getFullYear();
      const month = birthDate.getMonth() + 1;
      const day = birthDate.getDate();
      return year * 1e6 + month * 1e4 + day * 100 + birthHour * 10 + birthMinute;
    },
    // 生成八字
    generatePillars(seed, today) {
      const heavenlyStems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
      const earthlyBranches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
      const elements = ["木", "火", "土", "金", "水"];
      const yearIndex = (seed + today.getFullYear()) % heavenlyStems.length;
      const monthIndex = (seed + today.getMonth() + 1) % heavenlyStems.length;
      const dayIndex = (seed + today.getDate()) % heavenlyStems.length;
      const hourIndex = (seed + today.getHours()) % heavenlyStems.length;
      return [
        {
          name: "年柱",
          value: heavenlyStems[yearIndex] + earthlyBranches[yearIndex % earthlyBranches.length],
          element: elements[yearIndex % elements.length]
        },
        {
          name: "月柱",
          value: heavenlyStems[monthIndex] + earthlyBranches[monthIndex % earthlyBranches.length],
          element: elements[monthIndex % elements.length]
        },
        {
          name: "日柱",
          value: heavenlyStems[dayIndex] + earthlyBranches[dayIndex % earthlyBranches.length],
          element: elements[dayIndex % elements.length]
        },
        {
          name: "时柱",
          value: heavenlyStems[hourIndex] + earthlyBranches[hourIndex % earthlyBranches.length],
          element: elements[hourIndex % elements.length]
        }
      ];
    },
    // 计算五行
    calculateElements(birthDate, birthHour, birthMinute) {
      const seed = this.generateSeed(birthDate, birthHour, birthMinute);
      const elements = ["木", "火", "土", "金", "水"];
      const result = {};
      elements.forEach((element, index) => {
        const strength = seed * (index + 1) % 100;
        result[element] = strength;
      });
      return result;
    },
    // 计算运势
    calculateFortune(birthDate, birthHour, birthMinute, birthPlace) {
      const seed = this.generateSeed(birthDate, birthHour, birthMinute);
      const placeSeed = this.hashString(birthPlace);
      const combinedSeed = seed + placeSeed;
      const careerTemplates = [
        "工作顺利，有贵人相助",
        "需要谨慎处理工作关系",
        "有新的工作机会出现",
        "工作压力较大，需要调整心态",
        "适合学习新技能，提升自己"
      ];
      const wealthTemplates = [
        "财运亨通，有意外之财",
        "需要谨慎投资，避免风险",
        "正财稳定，偏财一般",
        "有破财风险，注意理财",
        "适合进行长期投资规划"
      ];
      const loveTemplates = [
        "桃花运旺盛，易遇良缘",
        "感情稳定，适合进一步发展",
        "需要多沟通，避免误会",
        "单身者有机会遇到心仪对象",
        "注意处理感情中的小矛盾"
      ];
      const healthTemplates = [
        "身体健康，精力充沛",
        "注意休息，避免过度劳累",
        "需要加强锻炼，提高免疫力",
        "注意饮食健康，避免暴饮暴食",
        "保持良好的作息习惯"
      ];
      const careerIndex = combinedSeed * 1 % careerTemplates.length;
      const wealthIndex = combinedSeed * 2 % wealthTemplates.length;
      const loveIndex = combinedSeed * 3 % loveTemplates.length;
      const healthIndex = combinedSeed * 4 % healthTemplates.length;
      const overallScore = seed % 60 + 40;
      let overallDesc = "";
      if (overallScore >= 90) {
        overallDesc = "大吉大利，诸事顺遂";
      } else if (overallScore >= 80) {
        overallDesc = "运势不错，把握机会";
      } else if (overallScore >= 70) {
        overallDesc = "运势平稳，稳中求进";
      } else if (overallScore >= 60) {
        overallDesc = "运势一般，谨慎行事";
      } else {
        overallDesc = "运势低迷，韬光养晦";
      }
      return {
        overall: overallDesc,
        career: careerTemplates[careerIndex],
        wealth: wealthTemplates[wealthIndex],
        love: loveTemplates[loveIndex],
        health: healthTemplates[healthIndex]
      };
    },
    // 字符串哈希函数
    hashString(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
      }
      return Math.abs(hash);
    },
    getFortuneTitle(key) {
      const titleMap = {
        overall: "整体运势",
        career: "事业运势",
        wealth: "财运分析",
        love: "感情运势",
        health: "健康建议"
      };
      return titleMap[key];
    },
    goToHome() {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    },
    closeReport() {
      this.showReport = false;
    },
    recalculate() {
      common_vendor.index.redirectTo({
        url: "/pages/daily/index"
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
    b: !$data.userInfoComplete
  }, !$data.userInfoComplete ? {
    c: common_vendor.o((...args) => $options.goToUserCenter && $options.goToUserCenter(...args))
  } : common_vendor.e({
    d: $data.currentStep === 0
  }, $data.currentStep === 0 ? {
    e: common_vendor.f($data.analysisLines, (line, index, i0) => {
      return {
        a: common_vendor.t(line.text),
        b: "analysis-line-" + index,
        c: line.show ? 1 : ""
      };
    }),
    f: common_vendor.f($data.pillars, (pillar, index, i0) => {
      return {
        a: common_vendor.t(pillar.name),
        b: common_vendor.t(pillar.value),
        c: common_vendor.t(pillar.element),
        d: "pillar-" + index,
        e: pillar.show ? 1 : ""
      };
    }),
    g: "bazi-analysis-" + $data.lastUpdateTime
  } : {}, {
    h: $data.currentStep === 1
  }, $data.currentStep === 1 ? {
    i: common_vendor.f($data.elementLines, (line, index, i0) => {
      return {
        a: common_vendor.t(line.text),
        b: "element-line-" + index,
        c: line.show ? 1 : ""
      };
    }),
    j: common_vendor.f($data.elements, (value, element, i0) => {
      return {
        a: common_vendor.t(element),
        b: common_vendor.t(value.toFixed(1)),
        c: "element-cell-" + element
      };
    }),
    k: "element-analysis-" + $data.lastUpdateTime
  } : {}, {
    l: $data.currentStep === 2
  }, $data.currentStep === 2 ? {
    m: common_vendor.f($data.fortuneLines, (line, index, i0) => {
      return {
        a: common_vendor.t(line.text),
        b: "fortune-line-" + index,
        c: line.show ? 1 : ""
      };
    }),
    n: common_vendor.f($data.fortune, (value, key, i0) => {
      return {
        a: common_vendor.t($options.getFortuneTitle(key)),
        b: common_vendor.t(value),
        c: "fortune-cell-" + key
      };
    }),
    o: "fortune-analysis-" + $data.lastUpdateTime
  } : {}, {
    p: $data.showReport
  }, $data.showReport ? {
    q: common_vendor.f($data.reportItems, (reportItem, index, i0) => {
      return common_vendor.e({
        a: index === 0
      }, index === 0 ? {} : {}, {
        b: index === 1
      }, index === 1 ? {
        c: common_vendor.t($data.fortune.overall)
      } : {}, {
        d: index === 2
      }, index === 2 ? common_vendor.e({
        e: _ctx.key !== "overall"
      }, _ctx.key !== "overall" ? {
        f: common_vendor.f($data.fortune, (value, key, i1) => {
          return {
            a: common_vendor.t($options.getFortuneTitle(key)),
            b: common_vendor.t(value),
            c: "section-item-" + key
          };
        })
      } : {}) : {}, {
        g: index === 3
      }, index === 3 ? {} : {}, {
        h: reportItem.show ? 1 : "",
        i: "report-item-" + index
      });
    }),
    r: common_vendor.o((...args) => $options.recalculate && $options.recalculate(...args)),
    s: common_vendor.o((...args) => $options.goToHome && $options.goToHome(...args)),
    t: "final-report-" + $data.lastUpdateTime
  } : {}));
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/daily/index.js.map
