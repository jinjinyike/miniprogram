// pages/companyinfo/index.js
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
    name: 111,
    info: {
      name: '河南省XXX有限责任公司',
      type: 1,
      url: '',
      desc: '',
      address: '',
      major: '',
      link_name: '张先生',
      link_phone: '13333333333',
      link_email: '123456789@qq.com'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: '企业详情',
    })
    let id = options.id;
    request({
      url: API.companyInfo,
      data: {
        id
      },
      method: 'POST',
      success: res => {
        this.setData({
          info: res.data
        })
      },
    })
  },
  switchChange(e) {
    console.log(e)
    let {
      id
    } = this.data.info;
    let value = e.detail.value;
    request({
      url: value ? API.concernCompany : API.delConcernCompany,
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
  cancel() {
    let value = this.data.info.is_concern
    request({
      url: value != 1 ? API.concernCompany : API.delConcernCompany,
      data: {
        id: this.data.info.id
      },
      method: 'POST',
      success: res => {
        if (res.code == 0) {
          let info = this.data.info;
          info.is_concern = info.is_concern == 1 ? 0 : 1;
          this.setData({
            info
          })
          wx.showToast({
            title: value ? '取消关注成功' : '关注成功',
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

})