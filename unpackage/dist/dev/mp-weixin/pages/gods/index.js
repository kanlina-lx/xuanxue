"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_tenGodsCalculator = require("../../utils/tenGodsCalculator.js");
const _sfc_main = {
  data() {
    return {
      showAnimation: true,
      currentStep: 0,
      userInfo: null,
      analysisLines: [
        { text: "正在分析天干...", show: false },
        { text: "正在计算十神...", show: false },
        { text: "正在生成结果...", show: false }
      ],
      branchLines: [
        { text: "正在分析地支...", show: false },
        { text: "正在计算藏干...", show: false },
        { text: "正在生成结果...", show: false }
      ],
      combinationLines: [
        { text: "正在分析组合...", show: false },
        { text: "正在计算影响...", show: false },
        { text: "正在生成结果...", show: false }
      ],
      gods: [],
      branches: [],
      combinations: [],
      showReport: false,
      reportItems: [
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ],
      report: {
        summary: "",
        details: {},
        conclusion: ""
      }
    };
  },
  onShow() {
    this.checkUserInfo();
  },
  methods: {
    checkUserInfo() {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      if (userInfo && userInfo.birthDate && userInfo.birthTime && userInfo.birthPlace) {
        this.userInfo = userInfo;
        this.startAnalysis();
      } else {
        common_vendor.index.switchTab({
          url: "/pages/user/index"
        });
      }
    },
    startAnalysis() {
      this.analyzeTenGods();
    },
    analyzeTenGods() {
      this.analysisLines = this.analysisLines.map((line) => ({ ...line, show: false }));
      this.analysisLines.forEach((line, index) => {
        setTimeout(() => {
          this.$set(this.analysisLines, index, { ...line, show: true });
        }, index * 500);
      });
      setTimeout(() => {
        const { gods } = utils_tenGodsCalculator.calculateTenGods(this.userInfo.birthDate);
        this.gods = gods.map((god) => ({ ...god, show: false }));
        this.gods.forEach((god, index) => {
          setTimeout(() => {
            this.$set(this.gods, index, { ...god, show: true });
          }, index * 200);
        });
        setTimeout(() => {
          this.currentStep = 1;
          this.analyzeBranchGods();
        }, 2e3);
      }, 1500);
    },
    analyzeBranchGods() {
      this.branchLines = this.branchLines.map((line) => ({ ...line, show: false }));
      this.branchLines.forEach((line, index) => {
        setTimeout(() => {
          this.$set(this.branchLines, index, { ...line, show: true });
        }, index * 500);
      });
      setTimeout(() => {
        const { branches } = utils_tenGodsCalculator.calculateTenGods(this.userInfo.birthDate);
        this.branches = branches.map((branch) => ({ ...branch, show: false }));
        this.branches.forEach((branch, index) => {
          setTimeout(() => {
            this.$set(this.branches, index, { ...branch, show: true });
          }, index * 200);
        });
        setTimeout(() => {
          this.currentStep = 2;
          this.analyzeCombinations();
        }, 2e3);
      }, 1500);
    },
    analyzeCombinations() {
      this.combinationLines = this.combinationLines.map((line) => ({ ...line, show: false }));
      this.combinationLines.forEach((line, index) => {
        setTimeout(() => {
          this.$set(this.combinationLines, index, { ...line, show: true });
        }, index * 500);
      });
      setTimeout(() => {
        const { combinations } = utils_tenGodsCalculator.calculateTenGods(this.userInfo.birthDate);
        this.combinations = combinations.map((combo) => ({ ...combo, show: false }));
        this.combinations.forEach((combo, index) => {
          setTimeout(() => {
            this.$set(this.combinations, index, { ...combo, show: true });
          }, index * 200);
        });
        setTimeout(() => {
          this.generateReport();
        }, 2e3);
      }, 1500);
    },
    generateReport() {
      const { report } = utils_tenGodsCalculator.calculateTenGods(this.userInfo.birthDate);
      this.report = report;
      this.reportItems.forEach((item, index) => {
        setTimeout(() => {
          this.$set(this.reportItems, index, { ...item, show: true });
        }, index * 500);
      });
      setTimeout(() => {
        this.showReport = true;
      }, this.reportItems.length * 500);
    },
    getReportTitle(key) {
      const titleMap = {
        dominant: "主导十神",
        strength: "十神力量",
        balance: "五行平衡",
        career: "事业建议",
        wealth: "财运分析",
        relationship: "感情分析"
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
        a: i,
        b: common_vendor.s($options.getStarStyle(i))
      };
    }),
    b: $data.currentStep === 0
  }, $data.currentStep === 0 ? {
    c: common_vendor.f($data.analysisLines, (line, index, i0) => {
      return {
        a: common_vendor.t(line.text),
        b: index,
        c: line.show ? 1 : ""
      };
    }),
    d: common_vendor.f($data.gods, (god, index, i0) => {
      return {
        a: common_vendor.t(god.name),
        b: common_vendor.t(god.value),
        c: common_vendor.t(god.type),
        d: index,
        e: god.show ? 1 : ""
      };
    })
  } : {}, {
    e: $data.currentStep === 1
  }, $data.currentStep === 1 ? {
    f: common_vendor.f($data.branchLines, (line, index, i0) => {
      return {
        a: common_vendor.t(line.text),
        b: index,
        c: line.show ? 1 : ""
      };
    }),
    g: common_vendor.f($data.branches, (branch, index, i0) => {
      return {
        a: common_vendor.t(branch.name),
        b: common_vendor.f(branch.gods, (god, gIndex, i1) => {
          return {
            a: common_vendor.t(god.name),
            b: common_vendor.t((god.weight * 100).toFixed(0)),
            c: gIndex
          };
        }),
        c: index,
        d: branch.show ? 1 : ""
      };
    })
  } : {}, {
    h: $data.currentStep === 2
  }, $data.currentStep === 2 ? {
    i: common_vendor.f($data.combinationLines, (line, index, i0) => {
      return {
        a: common_vendor.t(line.text),
        b: index,
        c: line.show ? 1 : ""
      };
    }),
    j: common_vendor.f($data.combinations, (combo, index, i0) => {
      return {
        a: common_vendor.t(combo.name),
        b: common_vendor.t(combo.desc),
        c: combo.score + "%",
        d: common_vendor.t(combo.score),
        e: index,
        f: combo.show ? 1 : ""
      };
    })
  } : {}, {
    k: $data.showReport
  }, $data.showReport ? {
    l: common_vendor.f($data.reportItems, (item, index, i0) => {
      return common_vendor.e({
        a: index === 0
      }, index === 0 ? {} : {}, {
        b: index === 1
      }, index === 1 ? {
        c: common_vendor.t($data.report.summary)
      } : {}, {
        d: index === 2
      }, index === 2 ? {
        e: common_vendor.f($data.report.details, (value, key, i1) => {
          return {
            a: common_vendor.t($options.getReportTitle(key)),
            b: common_vendor.t(value),
            c: key
          };
        })
      } : {}, {
        f: index === 3
      }, index === 3 ? {
        g: common_vendor.t($data.report.conclusion)
      } : {}, {
        h: index,
        i: item.show ? 1 : ""
      });
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/gods/index.js.map
