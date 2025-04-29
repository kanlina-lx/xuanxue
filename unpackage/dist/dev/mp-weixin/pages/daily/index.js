"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      showAnimation: true,
      showFortune: false,
      currentStep: 0,
      currentDate: "",
      userBirthday: "",
      // 用户生日
      userInfo: null,
      // 添加用户信息对象
      fortuneData: {
        bazi: {
          career: 0,
          wealth: 0,
          relationship: 0
        },
        ziwei: {
          minggong: 0,
          shengong: 0
        },
        qimen: {
          tianpan: 0,
          dipan: 0
        },
        advice: {
          good: [],
          bad: []
        }
      },
      calculationLines: [],
      baziPillars: [],
      ziweiPalaces: [],
      qimenGrid: [],
      liuyaoLines: [],
      meihuaPetals: [],
      taiyiStars: [],
      liurenPalaces: [],
      zeriDays: [],
      fengshuiDirections: []
    };
  },
  onShow() {
    this.checkUserInfoUpdate();
  },
  mounted() {
    const now = /* @__PURE__ */ new Date();
    this.currentDate = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
    this.getUserInfo();
  },
  methods: {
    // 获取用户信息
    async getUserInfo() {
      try {
        const userInfo = common_vendor.index.getStorageSync("userInfo");
        if (userInfo && userInfo.birthDate) {
          common_vendor.index.__f__("log", "at pages/daily/index.vue:321", "获取到的用户信息:", userInfo);
          this.userInfo = userInfo;
          this.userBirthday = userInfo.birthDate;
          this.calculateFortune();
        } else {
          common_vendor.index.__f__("log", "at pages/daily/index.vue:326", "用户信息不完整:", userInfo);
          common_vendor.index.switchTab({
            url: "/pages/user/index"
          });
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/daily/index.vue:333", "获取用户信息失败:", e);
        common_vendor.index.switchTab({
          url: "/pages/user/index"
        });
      }
    },
    // 检查用户信息是否更新
    async checkUserInfoUpdate() {
      try {
        const userInfo = common_vendor.index.getStorageSync("userInfo");
        if (userInfo && userInfo.birthDate) {
          if (JSON.stringify(userInfo) !== JSON.stringify(this.userInfo)) {
            common_vendor.index.__f__("log", "at pages/daily/index.vue:347", "用户信息已更新:", userInfo);
            this.userInfo = userInfo;
            this.userBirthday = userInfo.birthDate;
            this.showAnimation = true;
            this.showFortune = false;
            this.calculateFortune();
          }
        } else {
          common_vendor.index.__f__("log", "at pages/daily/index.vue:357", "用户信息不完整:", userInfo);
          common_vendor.index.switchTab({
            url: "/pages/user/index"
          });
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/daily/index.vue:363", "检查用户信息更新失败:", e);
        common_vendor.index.switchTab({
          url: "/pages/user/index"
        });
      }
    },
    // 计算运势
    calculateFortune() {
      if (!this.userBirthday) {
        common_vendor.index.__f__("error", "at pages/daily/index.vue:373", "用户生日信息缺失，当前userBirthday:", this.userBirthday);
        common_vendor.index.__f__("error", "at pages/daily/index.vue:374", "当前用户信息:", this.userInfo);
        common_vendor.index.switchTab({
          url: "/pages/user/index"
        });
        return;
      }
      const seed = this.getSeed(this.userBirthday, this.currentDate);
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
    // 生成种子值
    getSeed(birthday, date) {
      const birthDate = new Date(birthday);
      const currentDate = new Date(date);
      return `${birthDate.getTime()}_${currentDate.getTime()}`;
    },
    // 计算运势值
    calculateValue(seed, type) {
      const hash = this.hashString(seed + type);
      return Math.floor(hash % 30 + 70);
    },
    // 生成建议
    generateAdvice(seed, type) {
      const goodAdvices = [
        "投资理财",
        "商务洽谈",
        "约会",
        "学习进修",
        "健身运动",
        "签订合同",
        "求职面试",
        "搬家",
        "装修",
        "旅行"
      ];
      const badAdvices = [
        "冲动消费",
        "重大决策",
        "借贷",
        "赌博",
        "争吵",
        "熬夜",
        "暴饮暴食",
        "剧烈运动",
        "危险活动",
        "拖延"
      ];
      const hash = this.hashString(seed + type);
      const advices = type === "good" ? goodAdvices : badAdvices;
      const count = hash % 3 + 1;
      const result = [];
      for (let i = 0; i < count; i++) {
        const index = (hash + i) % advices.length;
        result.push(advices[index]);
      }
      return result;
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
    startAnimation() {
      this.showAnimation = true;
      this.currentStep = 0;
      this.calculationLines = [];
      this.baziPillars = [];
      this.ziweiPalaces = [];
      this.qimenGrid = [];
      this.liuyaoLines = [];
      this.meihuaPetals = [];
      this.taiyiStars = [];
      this.liurenPalaces = [];
      this.zeriDays = [];
      this.fengshuiDirections = [];
      this.animateBazi();
    },
    animateBazi() {
      this.calculationLines = [
        { text: "正在计算真太阳时...", show: false },
        { text: "正在计算年柱...", show: false },
        { text: "正在计算月柱...", show: false },
        { text: "正在计算日柱...", show: false },
        { text: "正在计算时柱...", show: false }
      ];
      this.calculationLines.forEach((line, index) => {
        setTimeout(() => {
          this.$set(this.calculationLines, index, { ...line, show: true });
          if (index > 0) {
            this.$set(this.baziPillars, index - 1, {
              gan: ["甲", "乙", "丙", "丁"][index - 1],
              zhi: ["子", "丑", "寅", "卯"][index - 1],
              show: true
            });
          }
        }, index * 300);
      });
      setTimeout(() => {
        this.currentStep = 1;
        this.animateZiwei();
      }, 2e3);
    },
    animateZiwei() {
      this.calculationLines = [
        { text: "正在定位命宫...", show: false },
        { text: "正在计算身宫...", show: false },
        { text: "正在排布十二宫...", show: false },
        { text: "正在安放主星...", show: false }
      ];
      this.ziweiPalaces = Array(12).fill().map((_, index) => ({
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
        show: false
      }));
      this.calculationLines.forEach((line, index) => {
        setTimeout(() => {
          this.$set(this.calculationLines, index, { ...line, show: true });
          if (index === 0) {
            this.$set(this.ziweiPalaces, 0, { ...this.ziweiPalaces[0], show: true });
          } else if (index === 1) {
            this.$set(this.ziweiPalaces, 6, { ...this.ziweiPalaces[6], show: true });
          } else if (index === 2) {
            this.ziweiPalaces.forEach((palace, i) => {
              if (i !== 0 && i !== 6) {
                setTimeout(() => {
                  this.$set(this.ziweiPalaces, i, { ...palace, show: true });
                }, (i - 1) * 100);
              }
            });
          }
        }, index * 300);
      });
      setTimeout(() => {
        this.currentStep = 2;
        this.animateQimen();
      }, 2e3);
    },
    animateQimen() {
      this.calculationLines = [
        { text: "正在排布九宫...", show: false },
        { text: "正在计算八门...", show: false },
        { text: "正在定位天盘...", show: false },
        { text: "正在计算地盘...", show: false }
      ];
      this.qimenGrid = Array(9).fill().map((_, index) => ({
        show: false,
        value: ["坎", "坤", "震", "巽", "中", "乾", "兑", "艮", "离"][index]
      }));
      this.calculationLines.forEach((line, index) => {
        setTimeout(() => {
          this.$set(this.calculationLines, index, { ...line, show: true });
          if (index === 0) {
            this.qimenGrid.forEach((cell, i) => {
              setTimeout(() => {
                this.$set(this.qimenGrid, i, { ...cell, show: true });
              }, i * 100);
            });
          }
        }, index * 300);
      });
      setTimeout(() => {
        this.currentStep = 3;
        this.animateLiuyao();
      }, 2e3);
    },
    animateLiuyao() {
      this.calculationLines = [
        { text: "正在起卦...", show: false },
        { text: "正在排卦...", show: false },
        { text: "正在分析卦象...", show: false },
        { text: "正在解读爻辞...", show: false }
      ];
      this.liuyaoLines = Array(6).fill().map((_, index) => ({
        name: ["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"][index],
        type: Math.random() > 0.5 ? "yang" : "yin",
        show: false
      }));
      this.calculationLines.forEach((line, index) => {
        setTimeout(() => {
          this.$set(this.calculationLines, index, { ...line, show: true });
          if (index < 2) {
            this.$set(this.liuyaoLines, index, { ...this.liuyaoLines[index], show: true });
          }
        }, index * 300);
      });
      setTimeout(() => {
        this.currentStep = 4;
        this.animateMeihua();
      }, 2e3);
    },
    animateMeihua() {
      this.calculationLines = [
        { text: "正在取数...", show: false },
        { text: "正在计算卦象...", show: false },
        { text: "正在分析卦辞...", show: false },
        { text: "正在解读结果...", show: false }
      ];
      this.meihuaPetals = Array(5).fill().map((_, index) => ({
        text: ["乾", "兑", "离", "震", "巽"][index],
        show: false
      }));
      this.calculationLines.forEach((line, index) => {
        setTimeout(() => {
          this.$set(this.calculationLines, index, { ...line, show: true });
          if (index < 3) {
            this.$set(this.meihuaPetals, index, { ...this.meihuaPetals[index], show: true });
          }
        }, index * 300);
      });
      setTimeout(() => {
        this.currentStep = 5;
        this.animateTaiyi();
      }, 2e3);
    },
    animateTaiyi() {
      this.calculationLines = [
        { text: "正在计算太乙数...", show: false },
        { text: "正在排布太乙盘...", show: false },
        { text: "正在分析太乙卦...", show: false },
        { text: "正在解读太乙数...", show: false }
      ];
      this.taiyiStars = Array(9).fill().map((_, index) => ({
        text: ["天乙", "太乙", "文昌", "天马", "禄存", "天厨", "天福", "天德", "天贵"][index],
        show: false
      }));
      this.calculationLines.forEach((line, index) => {
        setTimeout(() => {
          this.$set(this.calculationLines, index, { ...line, show: true });
          if (index < 3) {
            this.$set(this.taiyiStars, index, { ...this.taiyiStars[index], show: true });
          }
        }, index * 300);
      });
      setTimeout(() => {
        this.currentStep = 6;
        this.animateLiuren();
      }, 2e3);
    },
    animateLiuren() {
      this.calculationLines = [
        { text: "正在计算六壬数...", show: false },
        { text: "正在排布六壬盘...", show: false },
        { text: "正在分析六壬卦...", show: false },
        { text: "正在解读六壬数...", show: false }
      ];
      this.liurenPalaces = Array(12).fill().map((_, index) => ({
        text: ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"][index],
        show: false
      }));
      this.calculationLines.forEach((line, index) => {
        setTimeout(() => {
          this.$set(this.calculationLines, index, { ...line, show: true });
          if (index < 3) {
            this.$set(this.liurenPalaces, index, { ...this.liurenPalaces[index], show: true });
          }
        }, index * 300);
      });
      setTimeout(() => {
        this.currentStep = 7;
        this.animateZeri();
      }, 2e3);
    },
    animateZeri() {
      this.calculationLines = [
        { text: "正在计算黄历...", show: false },
        { text: "正在分析吉凶...", show: false },
        { text: "正在选择吉日...", show: false },
        { text: "正在确定时辰...", show: false }
      ];
      this.zeriDays = Array(7).fill().map((_, index) => ({
        text: ["初一", "初二", "初三", "初四", "初五", "初六", "初七"][index],
        lucky: Math.random() > 0.5,
        show: false
      }));
      this.calculationLines.forEach((line, index) => {
        setTimeout(() => {
          this.$set(this.calculationLines, index, { ...line, show: true });
          if (index < 3) {
            this.$set(this.zeriDays, index, { ...this.zeriDays[index], show: true });
          }
        }, index * 300);
      });
      setTimeout(() => {
        this.currentStep = 8;
        this.animateFengshui();
      }, 2e3);
    },
    animateFengshui() {
      this.calculationLines = [
        { text: "正在计算方位...", show: false },
        { text: "正在分析风水...", show: false },
        { text: "正在确定吉位...", show: false },
        { text: "正在解读风水...", show: false }
      ];
      this.fengshuiDirections = Array(8).fill().map((_, index) => ({
        text: ["东", "东南", "南", "西南", "西", "西北", "北", "东北"][index],
        lucky: Math.random() > 0.5,
        show: false
      }));
      this.calculationLines.forEach((line, index) => {
        setTimeout(() => {
          this.$set(this.calculationLines, index, { ...line, show: true });
          if (index < 3) {
            this.$set(this.fengshuiDirections, index, { ...this.fengshuiDirections[index], show: true });
          }
        }, index * 300);
      });
      setTimeout(() => {
        this.showAnimation = false;
        setTimeout(() => {
          this.$nextTick(() => {
            this.showFortune = true;
          });
        }, 500);
      }, 2e3);
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
  }, $data.showAnimation ? common_vendor.e({
    c: $data.currentStep === 0
  }, $data.currentStep === 0 ? {
    d: common_vendor.f($data.baziPillars, (pillar, index, i0) => {
      return {
        a: common_vendor.t(pillar.gan),
        b: common_vendor.t(pillar.zhi),
        c: index,
        d: pillar.show ? 1 : ""
      };
    }),
    e: common_vendor.f($data.calculationLines, (line, index, i0) => {
      return {
        a: common_vendor.t(line.text),
        b: index,
        c: line.show ? 1 : ""
      };
    })
  } : {}, {
    f: $data.currentStep === 1
  }, $data.currentStep === 1 ? {
    g: common_vendor.f($data.ziweiPalaces, (palace, index, i0) => {
      return {
        a: common_vendor.t(palace.name),
        b: index,
        c: `rotate(${index * 30}deg)`,
        d: palace.show ? 1 : ""
      };
    }),
    h: common_vendor.f($data.calculationLines, (line, index, i0) => {
      return {
        a: common_vendor.t(line.text),
        b: index,
        c: line.show ? 1 : ""
      };
    })
  } : {}, {
    i: $data.currentStep === 2
  }, $data.currentStep === 2 ? {
    j: common_vendor.f($data.qimenGrid, (cell, index, i0) => {
      return {
        a: common_vendor.t(cell.value),
        b: index,
        c: cell.show ? 1 : ""
      };
    }),
    k: common_vendor.f($data.calculationLines, (line, index, i0) => {
      return {
        a: common_vendor.t(line.text),
        b: index,
        c: line.show ? 1 : ""
      };
    })
  } : {}, {
    l: $data.currentStep === 3
  }, $data.currentStep === 3 ? {
    m: common_vendor.f($data.liuyaoLines, (yao, index, i0) => {
      return {
        a: common_vendor.t(yao.name),
        b: index,
        c: yao.show ? 1 : "",
        d: yao.type === "yang" ? 1 : "",
        e: yao.type === "yin" ? 1 : ""
      };
    }),
    n: common_vendor.f($data.calculationLines, (line, index, i0) => {
      return {
        a: common_vendor.t(line.text),
        b: index,
        c: line.show ? 1 : ""
      };
    })
  } : {}, {
    o: $data.currentStep === 4
  }, $data.currentStep === 4 ? {
    p: common_vendor.f($data.meihuaPetals, (petal, index, i0) => {
      return {
        a: common_vendor.t(petal.text),
        b: index,
        c: petal.show ? 1 : ""
      };
    }),
    q: common_vendor.f($data.calculationLines, (line, index, i0) => {
      return {
        a: common_vendor.t(line.text),
        b: index,
        c: line.show ? 1 : ""
      };
    })
  } : {}, {
    r: $data.currentStep === 5
  }, $data.currentStep === 5 ? {
    s: common_vendor.f($data.taiyiStars, (star, index, i0) => {
      return {
        a: common_vendor.t(star.text),
        b: index,
        c: star.show ? 1 : ""
      };
    }),
    t: common_vendor.f($data.calculationLines, (line, index, i0) => {
      return {
        a: common_vendor.t(line.text),
        b: index,
        c: line.show ? 1 : ""
      };
    })
  } : {}, {
    v: $data.currentStep === 6
  }, $data.currentStep === 6 ? {
    w: common_vendor.f($data.liurenPalaces, (palace, index, i0) => {
      return {
        a: common_vendor.t(palace.text),
        b: index,
        c: palace.show ? 1 : ""
      };
    }),
    x: common_vendor.f($data.calculationLines, (line, index, i0) => {
      return {
        a: common_vendor.t(line.text),
        b: index,
        c: line.show ? 1 : ""
      };
    })
  } : {}, {
    y: $data.currentStep === 7
  }, $data.currentStep === 7 ? {
    z: common_vendor.f($data.zeriDays, (day, index, i0) => {
      return {
        a: common_vendor.t(day.text),
        b: index,
        c: day.show ? 1 : "",
        d: day.lucky ? 1 : ""
      };
    }),
    A: common_vendor.f($data.calculationLines, (line, index, i0) => {
      return {
        a: common_vendor.t(line.text),
        b: index,
        c: line.show ? 1 : ""
      };
    })
  } : {}, {
    B: $data.currentStep === 8
  }, $data.currentStep === 8 ? {
    C: common_vendor.f($data.fengshuiDirections, (dir, index, i0) => {
      return {
        a: common_vendor.t(dir.text),
        b: index,
        c: dir.show ? 1 : "",
        d: dir.lucky ? 1 : ""
      };
    }),
    D: common_vendor.f($data.calculationLines, (line, index, i0) => {
      return {
        a: common_vendor.t(line.text),
        b: index,
        c: line.show ? 1 : ""
      };
    })
  } : {}) : {}, {
    E: !$data.showAnimation && $data.showFortune
  }, !$data.showAnimation && $data.showFortune ? {
    F: common_vendor.t($data.currentDate),
    G: $data.fortuneData.bazi.career + "%",
    H: common_vendor.t($data.fortuneData.bazi.career),
    I: $data.fortuneData.bazi.wealth + "%",
    J: common_vendor.t($data.fortuneData.bazi.wealth),
    K: $data.fortuneData.bazi.relationship + "%",
    L: common_vendor.t($data.fortuneData.bazi.relationship),
    M: $data.fortuneData.ziwei.minggong + "%",
    N: common_vendor.t($data.fortuneData.ziwei.minggong),
    O: $data.fortuneData.ziwei.shengong + "%",
    P: common_vendor.t($data.fortuneData.ziwei.shengong),
    Q: $data.fortuneData.qimen.tianpan + "%",
    R: common_vendor.t($data.fortuneData.qimen.tianpan),
    S: $data.fortuneData.qimen.dipan + "%",
    T: common_vendor.t($data.fortuneData.qimen.dipan),
    U: common_vendor.t($data.fortuneData.advice.good.join("、")),
    V: common_vendor.t($data.fortuneData.advice.bad.join("、"))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/daily/index.js.map
