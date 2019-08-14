// pages/renewal/index.js
const request = require('../../utils/request.js')
import {
  API,
  HOST
} from '../../utils/config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lookArr: [],
    topArr: [],
    lookId: undefined,
    topId: undefined,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    request({
      url: API.chargeList,
      method: 'POST',
      success: res => {
        if (res.data.length !== 0) {
          this.setData({
            lookArr: res.data.filter(ele => ele.type == 1),
            topArr: res.data.filter(ele => ele.type == 2)
          })
        }
      },
    })
  },
  changeId(e) {
    let {
      id,
      type
    } = e.currentTarget.dataset;
    this.setData({
      [type]: id
    })
  },
  pay() {
    if (!this.data.lookId && !this.data.topId) {
      return wx.showToast({
        title: '未选择充值项',
        icon: 'none'
      })
    }
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