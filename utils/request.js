const app = getApp();

/**
 * 封装请求
 * @param {JSONObject} options 请求参数
 * @example
 {
   url: '/Wxuser/api',
   method: 'POST',
   loading: true, boolean | timestep（毫秒）
   data: {
     key: "value"
   },
   success: (res) => {
     // res={code: 0, data: ..., desc: ''}
   }
 }
 */
const request = (options) => {
  const loading = options.loading == null || options.loading ? setTimeout(() => {
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    });
  }, typeof options.loading == 'number' ? options.loading : 300) : 0;
  return wx.request({
    method: options.method || 'GET',
    dataType: options.dataType || 'json',
    responseType: options.responseType || 'text',
    ...options,
    header: {
      'content-type': options.contentType || 'application/json',
      ...options.header,
      token: app.globalData.token
    },
    success: function (res) {
      if (res.data.code === 10004) {
        app.getUserInfo(() => {
          request(options);
        });
      } else {
        typeof options.success === 'function' && options.success.call(this, res.data, res);
      }
    },
    fail: function () {
      console.error(res.data)
    },
    complete: function () {
      clearTimeout(loading);
      wx.hideLoading();
    }
  });
}

module.exports = request