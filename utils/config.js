const HOST = 'http://www.haixm.cn';

module.exports = {
  HOST,
  STORAGE: {
    SWITCHBAR: 'TRUSTAPP_SWITCHBAR',
    DATERANGE: 'TRUSTAPP_DATERANGE'
  },
  API: {
    login: `${HOST}/api/auth/login`,
    getCode: `${HOST}/api/auth/sendMessage`,
    regist: `${HOST}/api/auth/register`,
    identityAdd: `${HOST}/api/about/identityAdd`, //身份认证
    identity: `${HOST}/api/about/identity`, //身份查询
    businessAdd: `${HOST}/api/about/businessAdd`, //营业执照认证
    business: `${HOST}/api/about/business`, //营业查询
    expire: `${HOST}/api/about/expire`, //期限剩余
    history: `${HOST}/api/about/news`, //历史发布
    releaseCompany: `${HOST}/api/company/create`, //发布企业
  }
}