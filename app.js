import {
  API
  , STORAGE
} from './utils/config.js';
const moment = require('./utils/moment.min.js');
App({
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
    month: null,
    userInfo: null,
    modules: null,
    token: null,
    applist: [
    ],
    getCurrent: true
  }
})