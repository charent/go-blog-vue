module.exports = {
    publicPath: '/',
    lintOnSave: false,  // 是否开启保存检测
    devServer: {
        open: false,    // 项目启动后是否用浏览器打开
        host: '127.0.0.1',
        port: 8081,
        https: false,

        proxy: {
            '/api': {
            target: 'http://127.0.0.1:8085', // 后端接口域名
            changeOrigin: true,       // 是否跨域
            ws: true,            // 是否代理 websockets
            secure: false,          // 是否https接口
            pathRewrite: {         // 路径重置，将路径的/api替换为空字符
                '^/api': ''
            }
            }
        }
    }
};