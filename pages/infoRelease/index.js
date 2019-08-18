// pages/infoRelease/index.js
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
        name: '出售'
      },
      {
        id: 2,
        name: '收购'
      }
    ],
    index: 1,
    idx: 0,
    objectArray1: [],
    id: '',
    info: {
      name: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.id) {
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
    } else {
      this.getkeys()
    }
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
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let key = e.currentTarget.dataset.key
    this.setData({
      [key]: e.detail.value
    })
  },
  formSubmit(e) {
    console.log(e)
    let obj = e.detail.value;
    obj.is_top = obj.is_top ? 1 : 0; //是否置顶0-非，1-是
    obj.type = this.data.objectArray[this.data.index].id; //类型1-出售-2收购
    obj.label = this.data.objectArray1[this.data.idx].name; //类型1-出售-2收购
    for (let key in obj) {
      if (!obj[key] && obj[key] !== 0) {
        wx.showToast({
          title: '请填写完整信息',
          icon: 'none'
        })
        return
      }
    }
    obj.user_id = app.globalData.userInfo.id;
    request({
      url: API.newsAdd,
      data: obj,
      method: 'POST',
      success: res => {
        if (res.code == 0) {
          let url = obj.type == 1 ? '../sell/index' : '../buy/index'
          wx.switchTab({
            url: url,
          })
        } else {
          wx.showToast({
            title: '发布失败',
            icon: 'none'
          })
        }

      },
      fail: function(res) {},
    })
  },

  switchChange(e) {
    console.log(e)
    let {
      id
    } = this.data;
    if (!id) return
    let value = e.detail.value;
    console.log(API.delConcernNews)
    request({
      url: value ? API.concernNews : API.delConcernNews,
      data: {
        id
      },
      method: 'POST',
      success: res => {
        if (res.code == 0) {
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