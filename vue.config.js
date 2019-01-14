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
        app.get('/api/goods',function(req,res){
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

        
        app.get('/api/login',function(req,res){
          const {username , password} = req.query
          if (username === '123' && password === '123') {
            res.json({
              code: 0,
              token: '999'
            })
          } else {
            res.json({
              code: 1,
              message: '您登录失败了'
            })
          }
        })
      }
    }
  }
}
