// pages/selfDetail/index.js
const request = require('../../utils/request');
const moment = require('../../utils/moment.min.js')
const md5 = require('../../utils/md5.js')

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
    HOST,
    name:'',
    address:'',
    avatar:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    request({
      url: API.selfInfo,
      data: {
        id: app.globalData.userInfo.id
      },
      method: 'POST',
      success: res => {
        if(res.data){
            this.setData({...res.data})
        }
      }
    })
  },
  bindinput(e) {
    let key = e.target.dataset.type;
    this.setData({
      [key]: e.detail.value
    })
  },
  save(){
    if(!this.data.name||!this.data.address){
      return wx.showToast({
        title: '未填写完整',
        icon:'none'
      })
    }
    let {name,address}=this.data
    request({
      url: API.updIndex,
      data: {
        name,address
      },
      method: 'POST',
      success: res => {
        if (res.code==0) {
          wx.showToast({
            title: '修改成功',
          })
        }
      }
    })
  },
  upload() {
    wx.chooseImage({
      success: res => {
        console.log(res)
        this.setData({
          avatar: res.tempFilePaths[0]
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
          url: API.headImg, //仅为示例，非真实的接口地址
          filePath: res.tempFilePaths[0],
          header: {
            ...obj
          },
          name: 'avatar' ,
          // formData: {
          //   [`avatar`]: name
          // },
          success: res => {
            if (res.code == 2000){
              wx.showToast({
                title: '修改成功',
              })
            }
          }
        })
      }
    })
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})