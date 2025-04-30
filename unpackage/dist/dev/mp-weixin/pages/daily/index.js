"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_fortuneCalculator = require("../../utils/fortuneCalculator.js");
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
      lastUpdateTime: null
    };
  },
  onShow() {
    this.checkUserInfo();
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
    },
    checkUserInfo() {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      if (userInfo && userInfo.birthDate && userInfo.birthTime && userInfo.birthPlace) {
        this.userInfoComplete = true;
        this.userInfo = userInfo;
        this.resetAnalysis();
        this.startAnalysis();
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
        const { pillars } = utils_fortuneCalculator.calculateFortune(today, this.userInfo.birthDate);
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
        const today = /* @__PURE__ */ new Date();
        const { elements, userChart } = utils_fortuneCalculator.calculateFortune(today, this.userInfo.birthDate);
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
        const today = /* @__PURE__ */ new Date();
        const { fortune } = utils_fortuneCalculator.calculateFortune(today, this.userInfo.birthDate);
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
        a: "star-" + i,
        b: common_vendor.s($options.getStarStyle(i))
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
    r: "final-report-" + $data.lastUpdateTime
  } : {}));
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/daily/index.js.map
