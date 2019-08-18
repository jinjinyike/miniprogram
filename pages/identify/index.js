// pages/identify/index.js
const app = getApp();
const moment = require('../../utils/moment.min.js');
const md5 = require('../../utils/md5.js')
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
    name: '',
    img: '',
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // type 1注册身份验证 2营业执照 3个人-身份认证
  onLoad: function(options) {
    console.log(options)
    let type = options.type
    wx.setNavigationBarTitle({
      title: type == 2 ? '企业营业执照' : '身份认证'
    })
    this.setData({
      type
    })

    if (type != 1) {
      request({
        url: type == 3 ? API.identity : API.business,
        data: {
          id: app.globalData.userInfo.id
        },
        method: 'POST',
        success: res => {
          if (res.data && type == 3) {
            this.setData({
              show: true,
              name: res.data.name,
              img: HOST + res.data.identity_card
            })
          }
          if (res.data && type == 2 && res.data.company_name) {
            this.setData({
              show: true,
              name: res.data.company_name,
              img: HOST+res.data.business_license
            })
          }
        },
      })
    }
  },
  upload() {
    if (this.data.show) return
    wx.chooseImage({
      success: res => {
        console.log(res)
        this.setData({
          img: res.tempFilePaths[0]
        })
      }
    })
  },
  submit() {
    const {
      img,
      name,
      type
    } = this.data;
    if (!name) return wx.showToast({
      title: `请填写${type == 2 ? '企业名称' :"姓名"}`,
      icon: 'none'
    })
    if (!img) return wx.showToast({
      title: `请选择${type == 2 ? '营业执照照片' :'身份证照片'}`,
      icon: 'none'
    })
    let obj = {}
    if (app.globalData.userInfo) {
      obj = {
        id: app.globalData.userInfo.id,
        time: moment().unix()
      }
      obj.crfs = md5(`${obj.time}company${obj.id}`)
    }
    wx.uploadFile({
      url: type == 2 ? API.businessAdd : API.identityAdd, //仅为示例，非真实的接口地址
      filePath: img,
      header: {
        ...obj
      },
      name: type == 2 ? 'business_license' : 'identity_card',
      formData: {
        [`${type == 2 ?'company_name':'name'}`]: name
      },
      success: res => {
        console.log(res.data)
        if (res.code == 0) {
          if (type == 1) {
            wx.redirectTo({
              url: '../success/index?type=1',
            })
          } else {
            wx.switchTab({
              url: '../self/index',
            })
          }

        } else {
          wx.showToast({
            title: '认证失败',
            icon: 'none'
          })
        }
      },
      fail:err=>{
        wx.showToast({
          title: '认证失败',
          icon:'none'
        })
      }
    })
  },
  bindinput(e) {
    this.setData({
      name: e.detail.value
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

})