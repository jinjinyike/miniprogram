const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    header: {
      type: String,
      value: '掌上合金'
    }
  },
  data: {
    statusBarHeight: 20
  },
  ready() {
    this.setData({
      showBack: getCurrentPages().length > 1,
      statusBarHeight: app.globalData.statusBarHeight
    });
  },
  methods: {
    back() {
      wx.navigateBack();
    }
  }
})