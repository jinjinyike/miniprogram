// pages/release/index.js
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
    objectArray: [{
        id: 1,
        name: '生产厂家'
      },
      {
        id: 2,
        name: '销售公司'
      }
    ],
    index: 0,
    idx: 0,
    objectArray1: [{
        id: 1,
        name: '金属'
      },
      {
        id: 2,
        name: '锰铁'
      }, {
        id: 3,
        name: '硅'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getkeys()
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
  formSubmit(e) {
    console.log(e)
    let obj = e.detail.value;
    obj.is_top = obj.is_top ? 1 : 0; //是否置顶0-非，1-是
    obj.type = Number(obj.type) + 1; //公司类型1-生产厂家，2-销售公司
    obj.major = this.data.objectArray1[this.data.idx].id; //公司类型1-生产厂家，2-销售公司
    //major字段待定
    for (let key in obj) {
      if (!obj[key] && obj[key] !== 0) {
        wx.showToast({
          title: '请填写完整信息',
          icon: 'none'
        })
        break
      }
    }
    obj.user_id = app.globalData.userInfo.id;
    request({
      url: API.releaseCompany,
      data: obj,
      method: 'POST',
      success: res => {
        if (res.code == 0) {
          wx.switchTab({
            url: '../company/index',
          })
        }else{
          wx.showToast({
            title: res.msg,
            icon:'none'
          })
        }

      },
      fail: function(res) {},
    })

  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  gotoback() {
    wx.navigateBack({
      delta: 1,
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