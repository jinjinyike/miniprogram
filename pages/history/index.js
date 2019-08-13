// pages/history/index.js
const app = getApp();
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
    search: {
      pagenum: 1,
      pagesize: 10
    },
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList()
  },
  getList() {
    request({
      url: API.history,
      data: this.data.search,
      method: 'POST',
      success: res => {
        let search = this.data.search;
        secarch.pagenum += 1;
        if (res.data.list.length) {
          this.setData({
            list: res.data,
            secarch
          })
        }
      },
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})