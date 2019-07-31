// const HOST = 'http://vnmgwawf78.test.app.itrustdata.com';
const HOST = 'https://trustapp.com.cn';
const PHONE = '151-1798-2818';

module.exports = {
  HOST,
  PHONE,
  STORAGE: {
    SWITCHBAR: 'TRUSTAPP_SWITCHBAR',
    DATERANGE: 'TRUSTAPP_DATERANGE'
  },
  API: {
    login: `${HOST}/WxLogin/login`,
  }
}