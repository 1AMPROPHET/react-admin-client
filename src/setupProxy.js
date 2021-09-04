const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/proxy', {                      // 遇见/api1前缀，出发该代理配置
      target: 'http://localhost:5000',    // 请求转发给谁
      changeOrigin: true,                 // 控制服务器收到的响应头中host字段的值
      pathRewrite: {'^/proxy': ''}         // 重写请求路径 
    }),
    // proxy('/api2', {
    //   target: 'http://localhost:5001',
    //   changeOrigin: true,
    //   pathRewrite: {'^/api2': ''}
    // })
  )
}