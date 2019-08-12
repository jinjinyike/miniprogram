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
    list: [{
      name: '收购硅锰合金1000吨,联系电话:1333333 3333',
      id: 1,
      type: '钢铁企业',
      is_top: true
    }, {
      name: '收购硅锰合金1000吨,联系电话:1333333 3333',
      id: 2,
      type: '钢铁企业',
      is_top: true
    }, {
      name: '收购硅锰合金1000吨,联系电话:1333333 3333',
      id: 3,
      type: '钢铁企业',
      is_top: false
    }],
    arr: ['锡盟'],
    search: {
      kw: '',
      pagesize: 10,
      pagenum: 1,
      type: '1'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList()
  },
  handleKeyInput(e) {
    let kw = e.detail.value;
    let {
      search
    } = this.data
    search.kw = kw;
    search.pagenum = 1;
    this.setData({
      search,
      list: []
    }, _ => {
      this.getList()
    })
  },
  getList() {
    let obj = this.data.search
    request({
      url: API.newsShowList,
      data: obj,
      method: 'POST',
      success: res => {
        if (res.data.length == 0) return
        obj.pagenum += 1;
        this.setData({
          list: this.data.list.concat(res.data.list),
          search: obj
        })
      },
      fail: function(res) {},
    })
  },
  gotorelease() {
    wx.navigateTo({
      url: '../infoRelease/index',
    })
  },
  gotoinfo(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../infoRelease/index?id=' + id,
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

})