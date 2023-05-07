module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:23121/',//接口的前缀
                ws:true,//代理websocked
                changeOrigin:true,//虚拟的站点需要更管origin
                pathRewrite:{
                    '^/api':'/api'//重写路径
                }
            }
        }
    }
}