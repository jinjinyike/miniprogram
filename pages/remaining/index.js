// pages/remaining/index.js
const app = getApp();
const moment =require('../../utils/moment.min.js')
const request = require('../../utils/request');
import {
  API,
  HOST
} from '../../utils/config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_expire_time: 0,
    top_expire_time: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    request({
      url: API.expire,
      data: {
        id: app.globalData.userInfo.id
      },
      method: 'POST',
      success: res => {
        if (res.data) {
          this.setData({ ...res.data,
            expire_day: moment(res.data.show_expire_time).diff(moment(), 'days'),
            top_day: moment(res.data.top_expire_time).diff(moment(), 'days')
          }
          )
        }
      },
    })
  },
  gotopay() {
    wx.navigateTo({
      url: '../renewal/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

})