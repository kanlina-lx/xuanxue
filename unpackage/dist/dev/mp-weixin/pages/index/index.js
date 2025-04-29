"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      currentDate: "",
      functionList: [
        {
          name: "今日运势",
          icon: "/static/images/fortune.png",
          path: "/pages/daily/index"
        },
        {
          name: "正缘分析",
          icon: "/static/images/love.png",
          path: "/pages/love/index"
        },
        {
          name: "生辰四柱",
          icon: "/static/images/birth.png",
          path: "/pages/birth/index"
        },
        {
          name: "十神分析",
          icon: "/static/images/gods.png",
          path: "/pages/gods/index"
        },
        {
          name: "周易占卜",
          icon: "/static/images/zhouyi.png",
          path: "/pages/iching/index"
        },
        {
          name: "周公解梦",
          icon: "/static/images/dream.png",
          path: "/pages/dream/index"
        },
        {
          name: "星座运势",
          icon: "/static/images/star.png",
          path: "/pages/star/index"
        },
        {
          name: "塔罗占卜",
          icon: "/static/images/tarot.png",
          path: "/pages/tarot/index"
        }
      ],
      fortuneList: [
        {
          name: "财运",
          value: "★★★★☆",
          icon: "/static/images/money.png"
        },
        {
          name: "事业",
          value: "★★★☆☆",
          icon: "/static/images/career.png"
        },
        {
          name: "感情",
          value: "★★★★★",
          icon: "/static/images/love.png"
        },
        {
          name: "健康",
          value: "★★★☆☆",
          icon: "/static/images/health.png"
        }
      ],
      clickEffects: []
    };
  },
  onLoad() {
    this.getCurrentDate();
  },
  methods: {
    getCurrentDate() {
      const date = /* @__PURE__ */ new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      this.currentDate = `${year}年${month}月${day}日`;
    },
    navigateTo(path) {
      common_vendor.index.navigateTo({
        url: path
      });
    },
    handleClick(event, path) {
      const effect = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
        scale: 0,
        opacity: 1
      };
      this.clickEffects.push(effect);
      setTimeout(() => {
        effect.scale = 1;
        effect.opacity = 0;
      }, 50);
      setTimeout(() => {
        this.clickEffects = this.clickEffects.filter((e) => e !== effect);
      }, 3e3);
      this.navigateTo(path);
    },
    // 跳转到今日运势
    goToDaily() {
      common_vendor.index.navigateTo({
        url: "/pages/daily/index"
      });
    },
    // 跳转到正缘分析
    goToLove() {
      common_vendor.index.navigateTo({
        url: "/pages/love/index"
      });
    },
    // 跳转到生辰四柱
    goToBirth() {
      common_vendor.index.navigateTo({
        url: "/pages/birth/index"
      });
    },
    // 跳转到十神分析
    goToGods() {
      common_vendor.index.navigateTo({
        url: "/pages/gods/index"
      });
    },
    // 跳转到周易占卜
    goToIching() {
      common_vendor.index.navigateTo({
        url: "/pages/iching/index"
      });
    },
    // 跳转到周公解梦
    goToDream() {
      common_vendor.index.navigateTo({
        url: "/pages/dream/index"
      });
    },
    // 跳转到星座运势
    goToStar() {
      common_vendor.index.navigateTo({
        url: "/pages/star/index"
      });
    },
    // 跳转到塔罗占卜
    goToTarot() {
      common_vendor.index.navigateTo({
        url: "/pages/tarot/index"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.clickEffects, (effect, index, i0) => {
      return {
        a: common_vendor.f(8, (sparkle, sIndex, i1) => {
          return {
            a: sIndex,
            b: "rotate(" + sIndex * 45 + "deg)"
          };
        }),
        b: index,
        c: effect.x + "px",
        d: effect.y + "px",
        e: "scale(" + effect.scale + ")",
        f: effect.opacity
      };
    }),
    b: common_vendor.f(15, (item, index, i0) => {
      return {
        a: index
      };
    }),
    c: Math.random() * 100 + "%",
    d: Math.random() * 100 + "%",
    e: Math.random() * 5 + "s",
    f: Math.random() * 2 + 2 + "s",
    g: "rotate(" + (Math.random() * 60 - 30) + "deg)",
    h: common_vendor.f(50, (item, index, i0) => {
      return {
        a: "star" + index
      };
    }),
    i: Math.random() * 100 + "%",
    j: Math.random() * 100 + "%",
    k: Math.random() * 3 + "s",
    l: "scale(" + (Math.random() * 0.5 + 0.5) + ")",
    m: common_assets._imports_0,
    n: common_vendor.f($data.functionList, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.name),
        c: index,
        d: common_vendor.o(($event) => $options.handleClick($event, item.path), index)
      };
    }),
    o: common_vendor.t($data.currentDate),
    p: common_vendor.f($data.fortuneList, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.value),
        d: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
