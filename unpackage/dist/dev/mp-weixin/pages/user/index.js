"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      formData: {
        birthDate: "",
        birthTime: "",
        birthPlace: "",
        gender: "",
        name: ""
      }
    };
  },
  computed: {
    userInitial() {
      return this.formData.name ? this.formData.name.charAt(0) : "?";
    }
  },
  onLoad() {
    this.getUserInfo();
  },
  methods: {
    // 获取用户信息
    async getUserInfo() {
      try {
        const localUserInfo = common_vendor.index.getStorageSync("userInfo");
        if (localUserInfo) {
          this.formData = localUserInfo;
          return;
        }
        const db = common_vendor.nr.database();
        const userInfo = common_vendor.index.getStorageSync("userInfo");
        if (userInfo && userInfo._id) {
          const res = await db.collection("user").doc(userInfo._id).get();
          if (res.data && res.data.length > 0) {
            this.formData = res.data[0];
            common_vendor.index.setStorageSync("userInfo", this.formData);
          }
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/user/index.vue:111", "获取用户信息失败：", e);
        common_vendor.index.showToast({
          title: "获取用户信息失败",
          icon: "none"
        });
      }
    },
    // 日期选择
    onDateChange(e) {
      this.formData.birthDate = e.detail.value;
    },
    // 时间选择
    onTimeChange(e) {
      this.formData.birthTime = e.detail.value;
    },
    // 提交表单
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }
      try {
        const db = common_vendor.nr.database();
        let userInfo = common_vendor.index.getStorageSync("userInfo");
        if (userInfo && userInfo._id) {
          await db.collection("user").doc(userInfo._id).update(this.formData);
        } else {
          const res = await db.collection("user").add(this.formData);
          userInfo = {
            _id: res.id,
            ...this.formData
          };
        }
        common_vendor.index.setStorageSync("userInfo", userInfo);
        getApp().globalData.userInfo = userInfo;
        common_vendor.index.showToast({
          title: "保存成功",
          icon: "success"
        });
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/user/index.vue:164", "保存用户信息失败：", e);
        common_vendor.index.showToast({
          title: "保存失败",
          icon: "none"
        });
      }
    },
    // 表单验证
    validateForm() {
      if (!this.formData.name) {
        common_vendor.index.showToast({
          title: "请输入姓名",
          icon: "none"
        });
        return false;
      }
      if (!this.formData.gender) {
        common_vendor.index.showToast({
          title: "请选择性别",
          icon: "none"
        });
        return false;
      }
      if (!this.formData.birthDate) {
        common_vendor.index.showToast({
          title: "请选择出生日期",
          icon: "none"
        });
        return false;
      }
      if (!this.formData.birthTime) {
        common_vendor.index.showToast({
          title: "请选择出生时间",
          icon: "none"
        });
        return false;
      }
      if (!this.formData.birthPlace) {
        common_vendor.index.showToast({
          title: "请输入出生地点",
          icon: "none"
        });
        return false;
      }
      return true;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($options.userInitial),
    b: common_vendor.t($data.formData.name || "未设置"),
    c: common_vendor.t($data.formData.gender === "male" ? "男" : $data.formData.gender === "female" ? "女" : "未设置"),
    d: $data.formData.name,
    e: common_vendor.o(($event) => $data.formData.name = $event.detail.value),
    f: $data.formData.gender === "male" ? 1 : "",
    g: common_vendor.o(($event) => $data.formData.gender = "male"),
    h: $data.formData.gender === "female" ? 1 : "",
    i: common_vendor.o(($event) => $data.formData.gender = "female"),
    j: common_vendor.t($data.formData.birthDate || "请选择出生日期"),
    k: $data.formData.birthDate,
    l: common_vendor.o((...args) => $options.onDateChange && $options.onDateChange(...args)),
    m: common_vendor.t($data.formData.birthTime || "请选择出生时间"),
    n: $data.formData.birthTime,
    o: common_vendor.o((...args) => $options.onTimeChange && $options.onTimeChange(...args)),
    p: $data.formData.birthPlace,
    q: common_vendor.o(($event) => $data.formData.birthPlace = $event.detail.value),
    r: common_vendor.o((...args) => $options.submitForm && $options.submitForm(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/index.js.map
