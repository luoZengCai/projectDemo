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

        app.get('/api/goods',function(req,res){
          const { id, foo} = req.query
          console.log(id,foo)
          res.json({
            code: 0,
            slider: [
              {
                id: 21,
                img: "/img/01.jpg"
              },
              {
                id: 22,
                img: "/img/02.jpg"
              },
              {
                id: 23,
                img: "/img/03.jpg"
              },
              {
                id: 24,
                img: "/img/04.jpg"
              }
            ],
            data: {
              fe: [
                {
                  id: 1,
                  title: "Vue2.x实战",
                  price: "100",
                  img: "/img/01.jpg",
                  count: 100
                },
                {
                  id: 2,
                  title: "React16.x实战",
                  price: "120",
                  img: "/img/03.jpg",
                  count: 100
                },
                {
                  id: 3,
                  title: "nodejs实战",
                  price: "80",
                  img: "/img/02.jpg",
                  count: 100
                },
                {
                  id: 4,
                  title: "前端工程化",
                  price: "110",
                  img: "/img/04.jpg",
                  count: 100
                },
                {
                  id: 5,
                  title: "面试",
                  price: "200",
                  img: "/img/02.jpg",
                  count: 100
                },
                {
                  id: 6,
                  title: "前端安全",
                  price: "30",
                  img: "/img/05.jpg",
                  count: 100
                }
              ],
              python: [
                {
                  id: 7,
                  title: "Python基础语法",
                  price: "120",
                  img: "/img/03.jpg",
                  count: 101
                },
                {
                  id: 8,
                  title: "Flask实战",
                  price: "80",
                  img: "/img/02.jpg",
                  count: 100
                },
                {
                  id: 9,
                  title: "Django实战",
                  price: "110",
                  img: "/img/01.jpg",
                  count: 100
                },
                {
                  id: 10,
                  title: "Python语法进阶",
                  price: "200",
                  img: "/img/04.jpg",
                  count: 100
                }
              ],
              java: [
                {
                  id: 11,
                  title: "java入门实战",
                  price: "80",
                  img: "/img/02.jpg",
                  count: 100
                },
                {
                  id: 12,
                  title: "spring boot实战",
                  price: "110",
                  img: "/img/01.jpg",
                  count: 100
                },
                {
                  id: 13,
                  title: "Java高并发",
                  price: "30",
                  img: "/img/04.jpg",
                  count: 100
                }
              ],
              bigdata: [
                {
                  id: 14,
                  title: "大数据实战",
                  price: "200",
                  img: "/img/01.jpg",
                  count: 100
                },
                {
                  id: 15,
                  title: "Hadoop实战",
                  price: "120",
                  img: "/img/03.jpg",
                  count: 100
                },
                {
                  id: 16,
                  title: "Kafka平台",
                  price: "80",
                  img: "/img/02.jpg",
                  count: 100
                }
              ],
              ai: [
                {
                  id: 17,
                  title: "算法实战",
                  price: "100",
                  img: "/img/01.jpg",
                  count: 100
                },
                {
                  id: 18,
                  title: "个性化推荐",
                  price: "120",
                  img: "/img/03.jpg",
                  count: 100
                },
                {
                  id: 19,
                  title: "机器学习",
                  price: "80",
                  img: "/img/02.jpg",
                  count: 100
                },
                {
                  id: 20,
                  title: "AI实战",
                  price: "110",
                  img: "/img/05.jpg",
                  count: 100
                }
              ]
            },
            keys: ["fe", "python", "java", "bigdata", "ai"]
          });
        })

        
        app.get('/api/logout',function(req,res){
          res.json({
            code: -1
          })
        })

        
        //安装post body解析器
        app.use(bodyParser.urlencoded({extended:true}))
        // use bodyParser-json
        app.use(bodyParser.json())
        // use bodyParser-text
        // app.use(bodyParser.text({type:"txt"}))

        app.post('/api/login',function(req,res){
          console.log(req.body)
          const {username , password} = req.body
          if (username == 'admin' && password == 'yddkt123') {
            let token = new Date().getTime() + 7*24*3600*1000
            res.json({
              code: 0,
              token: token
            })
          } else {
            res.json({
              code: 1,
              message: '登陆失败'
            })
          }
        })
      }
    }
  }
}
