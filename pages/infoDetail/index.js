// pages/infoDetail/index.js
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
    HOST,
    info: {
      name: ''
    },
    objectArray1: [],
    idx: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getkeys()
    request({
      url: API.newsInfo,
      data: {
        id: options.id
      },
      method: 'POST',
      success: res => {
        this.setData({
          id: options.id,
          info: res.data
        })
      },
    })
  },
  getkeys() {
    request({
      url: API.labelList,
      method: 'POST',
      success: res => {
        this.setData({
          objectArray1: res.data
        })
      },
    })
  },
  cancel() {
    let value = this.data.info.is_top
    request({
      url: value != 1 ? API.concernNews : API.delConcernNews,
      data: {
        id:this.data.info.id
      },
      method: 'POST',
      success: res => {
        if (res.code == 0) {
          let info=this.data.info;
          info.is_top==1?0:1;
          this.setData({info})
          wx.showToast({
            title: value ? '关注成功' : '取消关注成功',
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})