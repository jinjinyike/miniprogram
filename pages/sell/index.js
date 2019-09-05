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
    list: [],
    moldArr: [{
      id: 'a',
      name: '关注'
    }, {
      id: 'b',
      name: '推荐'
    }],
    search: {
      mold: 'a',
      kw: '关注',
      name: '',
      pagesize: 10,
      pagenum: 1,
      type: '1' //1出售 2收购
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getkeys()
    // this.getList()
  },
  getkeys() {
    request({
      url: API.labelList,
      method: 'POST',
      success: res => {
        this.setData({
          moldArr: this.data.moldArr.concat(res.data)
        })
      },
    })
  },
  handleKeyInput(e) {
    let kw = e.detail.value;
    let {
      search
    } = this.data
    search.name = kw;
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
    let mold
    switch (obj.kw) {
      case '关注':
        mold = 1;
        break
      case '推荐':
        mold = 2;
        break
      default:
        mold = 3;
        break
    }
    wx.showLoading({
      title: '数据加载中...',
    })
    request({
      url: API.newsShowList,
      data: {
        ...obj,
        mold
      },
      method: 'POST',
      // loading:true,
      success: res => {
        if (res.data.length == 0) return
        obj.pagenum += 1;
        this.setData({
          list: this.data.list.concat(res.data.list),
          search: obj
        })
      },
      fail: function(res) {},
      complete:function(){
        wx.hideLoading()
      }
    })
  },
  // 切换label
  changekey(e) {
    let {
      id,
      kw
    } = e.currentTarget.dataset;
    let search = this.data.search;
    search.mold = id;
    search.kw = kw;
    search.pagenum = 1;
    this.setData({
      search,
      list: []
    }, _ => {
      this.getList()
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
    let {
      search
    } = this.data
    search.pagenum = 1;
    this.setData({
      search,
      list: []
    }, _ => {
      this.getList()
    })
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