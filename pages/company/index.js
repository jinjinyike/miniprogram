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
      name: '阿拉善xx有限公司',
      id: 1,
      type: '钢铁企业',
      is_top: true
    }, {
      name: '阿拉善xx有限公司',
      id: 2,
      type: '钢铁企业',
      is_top: true
    }, {
      name: '阿拉善xx有限公司',
      id: 3,
      type: '钢铁企业',
      is_top: false
    }],
    search: {
      kw: '',
      pagesize: 10,
      pagenum: 1
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  handleKeyInput(e) {
    let kw = e.detail.value;
    let {
      search
    } = this.data
    search.kw = kw;
    search.pagenum = 1;
    this.setData({
      search
    }, _ => {
      this.getList()
    })
  },
  getList() {
    let obj = this.data.search
    request({
      url: API.companyList,
      data: obj,
      method: 'POST',
      success: res => {
        if (res.data.length == 0) return
        obj.pagenum += 1;
        this.setData({
          list: this.data.list.concat(res.data),
          search: obj
        })
      },
      fail: function(res) {},
    })
  },
  gotorelease() {
    wx.navigateTo({
      url: '../release/index',
    })
  },
  gotoinfo(e) {
    let id = e.datail.target.dataset.id
    wx.navigateTo({
      url: '../companyinfo/index?id=' + id,
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