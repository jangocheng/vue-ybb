var ENV = {
  baseURL: '/jeeplus',
  serverRootUrl: '/jeeplus',
  moduleName: 'jeeplus',
  version: '1.0',
  environment: process.env.NODE_ENV,
  defaultLocale: 'zh',
  apiNameSpace: 'api',
  hostEndpoint: 'jeeplus',
  fileUploadUrl: '',
  photoPreviewUrl: 'http://192.168.0.126:8080',
  routeRootPath: null,
  ak: 'UumHQfPwy15fjcsjnz6FeyKzUCWg72D3',
  appid: 'wx0e6a3484de6ac151'
}

if (ENV.environment === 'development') {
  ENV.baseURL = `http://192.168.0.126:8080/jeeplus/${ENV.apiNameSpace}`
}
if (ENV.environment === 'production') {
  // ENV.photoPreviewUrl = `http://192.168.0.14:8080/`
  // ENV.baseURL = `http://192.168.0.14:8080/ybb/${ENV.apiNameSpace}`
  ENV.photoPreviewUrl = `http://crm.ebohr.cn:3030/`
  ENV.baseURL = `http://crm.ebohr.cn:3030/ybb/${ENV.apiNameSpace}`
  // ENV.photoPreviewUrl = `http://www.szhhxh.com/`
  // ENV.baseURL = `http://www.szhhxh.com/ybb/${ENV.apiNameSpace}`
  // ENV.photoPreviewUrl = `http://cnc.ebohr.cn:3032/`
  // ENV.baseURL = `http://cnc.ebohr.cn:3032/ybb/${ENV.apiNameSpace}`
}

export default ENV
