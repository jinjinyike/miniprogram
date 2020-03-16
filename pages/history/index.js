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
  gotoinfo(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../infoDetail/index?id=' + id,
    })
  },
  del(e) {
    let id = e.currentTarget.dataset.id
    request({
      url: API.delHis,
      data: {
        id
      },
      method: 'POST',
      success: res => {
        let list = this.data.list
        for (let i = 0; i < list.length; i++) {
          if (list[i].id == id) {
            list.splice(i, 1)
            this.setData({
              list
            })
            wx.showToast({
              title: '删除成功',
            })
            return
          }
        }

      }
    })
  },
  getList() {
    request({
      url: API.history,
      data: this.data.search,
      method: 'POST',
      success: res => {
        let search = this.data.search;
        search.pagenum += 1;
        if (res.data.list.length) {
          let list = this.data.list
          this.setData({
            list: list.concat(res.data.list),
            search
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