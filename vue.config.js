var bodyParser = require("body-parser")

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  configureWebpack: {
    devServer: {
      before(app) {
        //中间件
        app.use(function(req,res,next){
          if (/^\/api/.test(req.path)) {//只判断请求接口
            if (req.path == '/api/login' || req.headers.token) {
              next()
            } else {
              res.sendStatus(401)
            }
          } else {
            next()
          }
        })
        //安装post body解析器
        app.use(bodyParser.urlencoded({extended:true}))

        app.get('/api/goods',function(req,res){
          const { id, foo } = req.query
          console.log(id,foo)
          res.json({
            code: 0,
            list: [{
                id:1,
                text: '123',
                price: 100
              },{
                id:1,
                text: '456',
                price: 200
              }]
          })
        })

        
        app.get('/api/logout',function(req,res){
          res.json({
            code: -1
          })
        })

        app.post('/api/login',function(req,res){
          console.log(req.body)
          const { username, password } = req.body
          if (username == 'admin' && password == 'yddkt123') {
            let token = new Date().getTime() + 7*24*3600*1000
            res.json({
              code: 0,
              token: token
            })
          } else {
            res.json({
              code: 1,
              message: '您登录失败了啊'
            })
          }
        })
      }
    }
  }
}
