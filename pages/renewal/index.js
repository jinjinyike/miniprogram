// pages/renewal/index.js
const request = require('../../utils/request.js')
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
    lookArr: [],
    topArr: [],
    lookId: null,
    topId: null,
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
    let _id;
    _id = this.data[type] == id ? null : id
    this.setData({
      [type]: String(_id)
    })
  },
  pay() {
    if (this.data.lookId == null && this.data.topId == null) {
      return wx.showToast({
        title: '未选择充值项',
        icon: 'none'
      })
    }
    // if (this.data.lookId != null && this.data.topId != null) {
    //   return wx.showToast({
    //     title: '只能选择一项充值项',
    //     icon: 'none'
    //   })
    // }
    let {
      lookId,
      topId
    } = this.data;
    let obj = {}
    let amount = 0
    console.log(121)
    if (lookId!=null) {
      amount += this.data.lookArr[lookId].amount
    }
    if (topId) {
      amount += this.data.topArr[topId].amount
    }
    obj = {
      show_id: lookId ? this.data.lookArr[lookId].id : 0,
      top_id: topId ? this.data.topArr[topId].id : 0,
      // time: this.data.lookArr[lookId].time,
      amount: amount
    }
    // obj.amount = 0.01; //ceshi
    wx.login({
      success: res => {
        request({
          url: API.payOrder,
          data: {
            code: res.code,
            ...obj
          },
          method: 'POST',
          success: (res) => {
            let data = res.data
            let _msg = JSON.parse(data.msg)
            console.log(data)
            wx.requestPayment({
              timeStamp: _msg.timeStamp,
              nonceStr: _msg.nonceStr,
              package: _msg.package,
              signType: 'MD5',
              paySign: _msg.paySign,
              success: res => {
                console.log(res)
                request({
                  url: API.checkwxPay + data.out_trade_no,
                  method: 'GET',
                  success: res => {
                    wx.navigateTo({
                      url: '../success/index?type=2',
                    })
                  },
                  fail: function(res) {},
                  complete: function(res) {},
                })

              },
              fail(res) {
                wx.showToast({
                  title: '支付失败',
                  icon: 'none'
                })
                // wx.navigateTo({
                //   url: '../fail/index?type=2',
                // })
              }
            })
          },
          fail: function(res) {},
          complete: function(res) {},
        })
      }
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