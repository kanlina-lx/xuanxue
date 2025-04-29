"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/daily/index.js";
  "./pages/user/index.js";
  "./pages/love/index.js";
  "./pages/birth/index.js";
  "./pages/gods/index.js";
  "./pages/iching/index.js";
  "./pages/dream/index.js";
  "./pages/star/index.js";
  "./pages/tarot/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:4", "App Launch");
    this.initGlobalData();
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:9", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:12", "App Hide");
  },
  methods: {
    initGlobalData() {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      if (userInfo) {
        this.globalData.userInfo = userInfo;
      }
    }
  },
  globalData: {
    userInfo: null
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
