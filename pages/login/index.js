const app = getApp();
const request = require('../../utils/request');
const moment = require('../../utils/moment.min.js')
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
  onLoad: function (options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.type == 2 ? '手机注册' : '手机登录',
    })
    this.setData({
      type: options.type==2?2:1
    })
  },
  bindinput(e) {
    let key = e.target.dataset.key;
    this.setData({
      [key]: e.detail.value
    })
  },
  getCode() {
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
        console.warn('请求后')
        console.warn(res)
        console.warn('请求结果上')
        if (!res.code) {
          let _this = this;
          let coden = 60 // 定义60秒的倒计时
          let codeV = setInterval(function () {
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
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }

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
    if(!phone){
      return wx.showToast({
        title: '请输入手机号码',
        icon:'none'
      })
    }
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      return wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none'
      })
    }
    if ((!verify || verify.length !== 6) && type == 2) {
      return wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
    }
    let obj = {
      phone
    }
    if (type == 2) {
      obj.verify = verify
    }
    request({
      url: type == 1 ? API.login : API.regist,
      data: obj,
      method: 'POST',
      success: res => {
        if (res.code !== 0) {
          return wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
        if (type == 1) {
          app.globalData.userInfo = res.data;
          wx.setStorage({
            key: 'userInfo',
            data: JSON.stringify(res.data),
          })
          // wx.switchTab({
          //   url: '../self/index',
          // })
          if (moment().isBefore(res.data.show_expire_time)) {
            //正常登录
            wx.switchTab({
              url: '../self/index',
            })

          } else {
            //使用期限已到
            wx.navigateTo({
              url: '../fail/index?type=1',
            })
          }

        }
        if (type == 2) {
          //注册
          app.globalData.userInfo = res.data;
          wx.setStorage({
            key: 'userInfo',
            data: JSON.stringify(res.data),
          })
          //注册——身份验证
          wx.navigateTo({
            url: '../identify/index?type=1',
          })
        }
      }
    })
  },
  noLogin(){
    request({
      url: API.login,
      data: { phone:'18623728375'},
      method: 'POST',
      success: res => {
        if (res.code !== 0) {
          return wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
        wx.switchTab({
            url: '../self/index',
          })
      }
    })
  },
  gotoregister(){
    let path
    if(this.data.type==2){
      path ='../login/index?type=1'
    }else{
      path = '../login/index?type=2'
    }
    wx.navigateTo({
      url: path,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  }
})