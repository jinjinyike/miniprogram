import {
  API,
  STORAGE
} from './utils/config.js';
const moment = require('./utils/moment.min.js');
App({
  onLaunch() {
    wx.login({
      success:res=> {
        this.globalData.code = res.code
      }
    })
    //测试用的
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        console.log(res)
        if (!this.globalData.userInfo) {
          this.globalData.userInfo = JSON.parse(res.data)
        }
      },
    })

  },
  updateGlobal(data, page) {
    this.globalData = {
      ...this.globalData,
      ...data
    }
    page && page.setData({
      ...data
    })
  },
  // 防止登录失败死循环
  loginCount: 0,
  globalData: {
    statusBarHeight: 20,
    userInfo: null,
    token: null,
    getCurrent: true,
    code: ''
  }
})