"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_pillarCalculator = require("../../utils/pillarCalculator.js");
const _sfc_main = {
  data() {
    return {
      userInfoComplete: false,
      userInfo: null,
      pillars: [],
      elements: [],
      analysis: {
        character: "",
        career: "",
        love: "",
        health: ""
      },
      showPillars: false,
      showElements: false,
      showAnalysis: false
    };
  },
  onShow() {
    this.checkUserInfo();
  },
  methods: {
    checkUserInfo() {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      if (userInfo && userInfo.birthDate && userInfo.birthTime && userInfo.birthPlace) {
        this.userInfoComplete = true;
        this.userInfo = userInfo;
        this.calculatePillars();
      } else {
        this.userInfoComplete = false;
      }
    },
    goToUserCenter() {
      common_vendor.index.switchTab({
        url: "/pages/user/index"
      });
    },
    calculatePillars() {
      const { pillars, elements } = utils_pillarCalculator.calculatePillars(this.userInfo.birthDate, this.userInfo.birthTime);
      this.pillars = pillars;
      this.elements = elements;
      setTimeout(() => {
        this.showPillars = true;
        setTimeout(() => {
          this.showElements = true;
          setTimeout(() => {
            this.showAnalysis = true;
          }, 500);
        }, 500);
      }, 100);
      this.generateAnalysis(elements);
    },
    getAnalysisTitle(key) {
      const titleMap = {
        character: "性格特点",
        career: "事业运势",
        love: "感情运势",
        health: "健康建议"
      };
      return titleMap[key];
    },
    generateAnalysis(elements) {
      const mainElement = elements.reduce((prev, current) => {
        return prev.value > current.value ? prev : current;
      });
      const analysisMap = {
        "木": {
          character: "命主五行属木，性格温和善良，富有同情心。木主仁，为人正直，但有时过于理想化。",
          career: "事业发展宜选择与木相关的行业，如教育、医疗、环保等领域。",
          love: "感情运势较为稳定，但需注意避免过于理想化，学会包容和妥协。",
          health: "需注意肝胆系统的保养，建议多进行户外活动，保持心情愉悦。"
        },
        "火": {
          character: "命主五行属火，性格热情开朗，富有创造力。火主礼，为人热情，但需注意控制情绪。",
          career: "事业发展宜选择与火相关的行业，如文化、艺术、传媒等领域。",
          love: "感情运势较为顺利，但需注意与伴侣的沟通，避免因性格急躁而产生矛盾。",
          health: "需注意心脏和血液循环系统的保养，建议多进行有氧运动，保持心情愉悦。"
        },
        "土": {
          character: "命主五行属土，性格稳重踏实，富有责任感。土主信，为人诚信，但有时过于保守。",
          career: "事业发展宜选择与土相关的行业，如建筑、房地产、农业等领域。",
          love: "感情运势较为稳定，但需注意避免过于保守，学会表达情感。",
          health: "需注意脾胃系统的保养，建议保持规律作息，注意饮食健康。"
        },
        "金": {
          character: "命主五行属金，性格果断坚毅，富有正义感。金主义，为人正直，但有时过于固执。",
          career: "事业发展宜选择与金相关的行业，如金融、法律、科技等领域。",
          love: "感情运势较为顺利，但需注意避免过于固执，学会灵活变通。",
          health: "需注意呼吸系统的保养，建议多进行深呼吸练习，保持室内空气流通。"
        },
        "水": {
          character: "命主五行属水，性格聪明机智，富有智慧。水主智，为人聪慧，但有时过于敏感。",
          career: "事业发展宜选择与水相关的行业，如贸易、物流、旅游等领域。",
          love: "感情运势较为顺利，但需注意避免过于敏感，学会理性思考。",
          health: "需注意肾脏和泌尿系统的保养，建议多喝水，保持规律作息。"
        }
      };
      this.analysis = analysisMap[mainElement.name];
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.userInfoComplete
  }, !$data.userInfoComplete ? {
    b: common_vendor.o((...args) => $options.goToUserCenter && $options.goToUserCenter(...args))
  } : {
    c: common_vendor.f($data.pillars, (pillar, index, i0) => {
      return {
        a: common_vendor.t(pillar.name),
        b: common_vendor.t(pillar.time),
        c: common_vendor.t(pillar.value),
        d: common_vendor.t(pillar.element),
        e: index,
        f: index * 0.2 + "s"
      };
    }),
    d: $data.showPillars ? 1 : "",
    e: $data.showPillars ? 1 : "",
    f: common_vendor.f($data.elements, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.value),
        c: item.value + "%",
        d: item.color,
        e: index,
        f: index * 0.2 + "s"
      };
    }),
    g: $data.showElements ? 1 : "",
    h: $data.showElements ? 1 : "",
    i: common_vendor.f($data.analysis, (item, key, i0) => {
      return {
        a: common_vendor.t($options.getAnalysisTitle(key)),
        b: common_vendor.t(item),
        c: key,
        d: key * 0.2 + "s"
      };
    }),
    j: $data.showAnalysis ? 1 : "",
    k: $data.showAnalysis ? 1 : ""
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/birth/index.js.map
