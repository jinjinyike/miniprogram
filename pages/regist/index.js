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
    phone: '',
    btntext: '获取验证码',
    verify: '',
    type: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.type == 1 ? '手机登录' : '手机注册',
    })
    this.setData({
      type: options.type
    })
  },
  bindinput(e) {
    let key = e.target.dataset.key;
    this.setData({
      [key]: e.detail.value
    })
  },
  getCode() {
    var _this = this;
    if (this.data.btntext !== '获取验证码') return wx.showToast({
      title: '请稍后再试',
      icon: 'none'
    })
    if (!(/^1[3456789]\d{9}$/.test(this.data.phone))) {
      return wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none'
      })
    }
    request({
      url: API.getCode,
      data: {
        phone: this.data.phone
      },
      method: 'POST',
      loading: false,
      success: res => {
        var coden = 10 // 定义60秒的倒计时
        var codeV = setInterval(function() {
          _this.setData({ // _this这里的作用域不同了
            btntext: (--coden) + 's'
          })
          if (coden == -1) { // 清除setInterval倒计时，这里可以做很多操作，按钮变回原样等
            clearInterval(codeV)
            _this.setData({
              btntext: '获取验证码'
            })
          }
        }, 1000) //  1000是1秒
      },
      // fail: function(res) {},
      // complete: function(res) {},
    })
  },
  submit() {
    const {
      phone,
      verify,
      type
    } = this.data
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      return wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none'
      })
    }
    if (!verify || verify.length !== 4) {
      return wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
    }
    wx.request({
      url: type == 1 ? API.login : API.regist,
      data: {
        phone,
        verify
      },
      type: 'POST',
      success: res => {
        if (type == 1) {
          wx.navigateTo({
            url: '../company/index',
          })
        } else {
          wx.navigateTo({
            url: '../identify/index',
          })
        }

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

  }
})