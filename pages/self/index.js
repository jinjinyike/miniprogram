const request = require('../../utils/request');
const moment = require('../../utils/moment.min.js')
const app = getApp();

import {
  API,
  HOST
} from '../../utils/config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    HOST,
    show_expire_time: 0,
    top_expire_time: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  gotoidentify(e) {
    console.log(e)
    let type = e.currentTarget.dataset.type;
    console.log(type)
    wx.navigateTo({
      url: `../identify/index?type=${type}`,
    })
  },
  gotorest() {
    wx.navigateTo({
      url: '../remaining/index',
    })
  },
  gotopay() {
    wx.navigateTo({
      url: '../renewal/index',
    })
  },
  gotohistory(){
    wx.navigateTo({
      url: '../history/index',
    })
  },
  gotoconcat(){
    wx.navigateTo({
      url: '../concat/index',
    })
  },
  selfDetail(){
    wx.navigateTo({
      url: '../selfDetail/index',
    })
  },
  gotorelease(){
    let url = '../release/index'
    if (this.data.company_id!=0){
      let id = this.data.company_id
      url = '../release/index?id='+id
    }
    wx.navigateTo({
      url,
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
    request({
      url: API.selfInfo,
      data: {
        id: app.globalData.userInfo.id
      },
      method: 'POST',
      success: res => {
        if (res.data) {
          this.setData({
            ...res.data,
            expire_day: moment(res.data.show_expire_time).diff(moment(), 'days'),
            top_day: moment(res.data.top_expire_time).diff(moment(), 'days')
          })
        }
      },
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})