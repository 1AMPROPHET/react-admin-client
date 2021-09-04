day 01

## 1. 项目开发准备
  # 1. 项目描述
  # 2. 技术选型
  # 3. API接口/接口文档/测试接口

## 2. 启动项目开发
  # 1. 使用react脚手架创建项目
  # 2. 开发环境运行：npm start
  # 3. 生产环境打包运行：npm run biuld serve biuld

## 3. git管理项目
  # 1. 创建远程仓库
  # 2. 创建本地仓库
      1. 配置.gitignore
      2. git init
      3. git add
      4. git commit -m 'init'
  # 3. 将本地仓库推送到远程仓库
      1. git remote add origin url
      2. git push origin master
  # 4. 在本地创建dev分支，并推送到远程
      1. git checkout -b dev
      2. git push origin dev
  # 5. 如果本地有修改
      1. git add 
      2. git commit -m 'xxx'
      3. git push origin dev
  # 6. 新的同事：克隆仓库
      1. git clonedev
      2. git ckeckout -b dev origin/dev
      3. git pull origin dev 
  # 7. 远程修改
      1. git pull origin dev

## 4. 创建项目的基本结构
  # api：ajax请求的模块
  # components：非路由组件
  # pages：路由组件
  # App.js：应用的根组件
  # index.js：入口js文件

## 5. 引入antd
  # 下载antd包
  # 按需打包：只打包import引入组件的js/css
    1. 下载工具包
    2. config-overrides.js
    3. package.json
  # 自定义主题
    1. 下载工具包
    2. config-overrides.js
  # 使用antd组件
    1. 根据antd的文档编写

## 6. 引入路由
  # 下载包：react-router-dom
  # 拆分应用路由:
    1. Login: 登录
    2. Admin：后台管理界面
  # 注册路由
    <Route path='xxx' component={}>

## 7. Login的静态组件
  # 1. 自定义了一部分组件样式布局
  # 2. 使用antd的组件实现登录表单界面
    Form/Form.Item
    Input
    Icon
    Button

## 8. 收集表单数据和表单的前台校验
  # v4.x 与 v3.x 有较大区别，详细见文档
  # 1. 主要是使用name属性来定义，包括'username', 'password'等
  # 2. 操作表单数据
    myRef = React.createRef()

    handleSubmit = (value) => {
      this.myRef.current.validateFields().then(values => {

      }).catch(() => {
        
      })
    }

    <Form ref={this.myRef}></Form>


day 02

## 1. 后台应用
  # 启动后台应用：mongod服务必须启动
  # 使用postman测试接口（根据接口文档）
    1. 访问测试：post请求的参数在body中设置
    2. 保存测试接口
    3. 导出/导入所有测试接口

## 2. 编写ajax代码
  # ajax请求函数模块：api/ajax.js
    1) 封装axios + promise
      函数的返回值是promise对象 ===> 后面用上async/await
      自己创建promise
        1. 内部统一处理异常：外部的调用都不使用try catch来处理异常请求
        2. 异步返回是响应数据：外部的调用异步得到的就是数据
    2) 接口请求函数模块：api/index.js
      根据接口文档编写（一定要有这个能力）
      接口请求：使用ajax 返回promise对象
    3) 解决跨域问题
      配置代理 ===> 解决开发环境
      编码：package.json：proxy：“http://localhost：5000”
      或者setupProxy.js文件
        const proxy = require('http-proxy-middleware')

        module.exports = function(app) {
          app.use(
            proxy('/proxy', {                      // 遇见/api1前缀，出发该代理配置
              target: 'http://localhost:5000',    // 请求转发给谁
              changeOrigin: true,                 // 控制服务器收到的响应头中host字段的值
              pathRewrite: {'^/proxy': ''}         // 重写请求路径 
            })
          )
        }

    4) 对代理的理解
      1. 是什么
        具有特定功能的程序
      2. 运行在哪？
        前台应用端
        只能在开发时使用
      3. 作用
        解决开发时的ajax请求跨域问题
        A.监视并拦截请求
        B.转发请求
      4. 配置代理
        告诉代理服务器一些信息：比如转发的目标地址
        开发环境：前端工程师
        生产环境：后端工程师
    5) async和await
      简化promise对象
    
## 3. 实现登录(包含自动登录)
  # Login.jsx
    1. 调用登陆的接口请求
    2. 如果失败，显示错误信息
    3. 如果成功：
      保存user到local中/内存中
      跳转到admin
    4. 如果内存中的user有值，自动跳转到admin
  # src/index.js
    读取local中的user到内存中
  # admin.jsx
    判断如果内存中没有user，自动跳转到Login
  # storage.js
    包含使用localStorage来保存user相关操作的工具模块
    使用第三方库store
      简化编码
      兼容不同浏览器
  # memoryUtil.js
    用来在内存中保存user的工具类

## 4. 搭建Admin
  # 整体布局使用antd layout组件
  # 拆分组件
    1. leftNav
  # 子路由

## 5. LeftNav组件
  # 使用antd Menu 和 SubMenu
  # 使用react-router
    1. withRouter()：包装非路由组件，返回一个新的路由组件，传入history/location/match属性
    2. history：push() replace() goBack()
    3. location:pathname属性
    4. match params属性
  # 生命周期(待改进)
    使用 UNSAFE_componentWillUpdata()
  # 动态生成Item和SubMenu的数据
    1.map()
    2.reduce()
  # 2个问题
    刷新时如何选中对应菜单
      selectedKey={['/path']}
    刷新子菜单时，如何展开选中的子菜单列表
      子菜单的某一项的key === 目前的路由路径
      defaultOpenKey={['key']}


day 03

## 1. Header组件
  # 界面静态布局
    三角形效果
  # 获取登录用户的名称显示
    memoryUtils
  # 当前时间
    Date()
  # 循环定时器，每隔一秒更新当前显示时间状态
    formatDate()
  # 天气
    阿里天气，申请key
  # 导航项的标题
    得到path，withRouter包装
  # 退出登录
    Modal组件
    清除User缓存和Local
    跳转到Login

day 04

## 1. 使用antd组件构建分类列表界面
  Card
  Table
  Button
  Icon

## 2. 相关接口请求函数
  获取一级/二级分类列表
  添加分类
  更新分类

## 3. 异步显示一级分类列表
  设计一级分类列表状态：category
  异步获取一级分类列表
  更新状态，显示

## 4.显示二级分类列表
  设计状态：subCategory，parentId，categoryName
  显示二级分类列表：根据parentId和path，异步获取列表
  setState()：
  setState更新是异步的，直接读取状态值十九的状态值
  setState({}， callback)，回调函数是在状态更新完后才执行

## 5. 更新分类
  # 界面
    antd组件：Modal，Form，Input
    显示/隐藏：showStatus
  # 功能
    addCaegory，updateCategory
    调用更新分类的接口
    重新获取分类


day 05

## 1. 分页列表
  # 纯前台分页
    请求获取数据：一次获取所有数据，翻页时不需要再发请求
    请求接口：
      不需要特别指定：页码（pageNum）和每页数量（pageSize）
      响应数据：所有数据的数组
  # 基于后台分页
    请求数据：每次只获取当前页数据，翻页时发请求
    请求接口：
      需要指定页码（pageNum）和每页数量（pageSize）
      响应数据：
        当前页的数组
        总页数
  # 如何选择
    根据数据的数量

## 2. 分类搜索
  # 1. 界面
    antd组件：Modal，Form，Select，Input
    显示/隐藏：showStatus
  # 2. 功能
    父组件得到子组件的数据
    调用添加分类的接口
    重新获取分类列表

## 3. Product整体路由
  # 1. 配置子路由：
    ProductHome/Detail/Add&Update
    <Route> <Switch> <Redirect>
  # 2. 匹配路由的逻辑
    默认：逐层匹配 <Route path="/product" component={ProductHome}/>
    exact: 精确匹配

## 4. ProductHome组件
  # 1.分页显示
    界面 <Card> <Table> <Select> <Input> <Button>
    状态：goods total
    接口请求函数需要的数据：pageNum，pageSize
    异步获取第一页数据显示
      调用分页接口请求函数，获取到当前页的products和总和记录total
      更新状态：products/total
    翻页：
      绑定翻页的监听，监听回调得到pageNum
      异步获取指定页码的数据并显示
  
  # 2. 分页显示
    请求接口函数需要的数据
      pageSize：每页的条目数
      pageNum：当前请求的页码
      productDesc productName searchName 根据商品描述，名称搜索
    状态：searchType searchName 在用户操作时实时收集数据
    异步搜索显示分页列表
      如果searchName有值，调用搜索接口请求函数获取数据并更新状态

  # 3. 更新商品状态
  初始显示：根据product的status属性来显示 status = 1 / 2
  点击切换：
    绑定点击监听
    异步请求更新状态

  # 4. 进入详情界面
    history.push('/product/detail', {product})

  # 5. 进入添加界面
    history.push('/product/addupdate')

## 5. ProductDetail组件
  # 1. 读取商品数据：this.props.location.state.product
  # 2. 显示商品信息
  # 3. 异步显示商品所属分类名称
    pCategoryId === 0 异步获取categoryId的分类名称
    pCategoryId !== 0 异步获取pCategoryId/categoryId的分类名称
  # 4. Promise.all([promise1, promise2])
    返回值是promise对象
    异步得到的是所有promise的结果的数组
    特点：一次发送多个请求，只有当所有结果都成功，才成功，并得到成功的数据，一旦有一个失败，返回失败


day 06

## 1. Add&Update
  # 1. 基本界面
    Card / Form / Input / TextArea / Button
    FormItem的Label标题和layout
  # 2. 分类的级联列表
    Cascader的基本使用
    异步获取一级分类列表，生成一级分类options
    如果当前是更新二级分类的商品，异步获取对应的二级分类列表，生成二级分类options，并添加为对应的option的
    async 函数返回的是一个新的promise对象，promise的结果和值由async函数的结果决定
    当选择某一级分类项时，异步获取相对应的二级分类列表，生成二级分类options，并添加为当前的option的children
  # 3. 表单数据收集和验证

## 2. PicturesWall
  # 1. antd组件
    Upload / Modal / Icon
    根据示例Demo改造编写
  # 2. 上传图片
    在<Upload>上配置接口的path和请求参数名
    监视文件状态改变：上传中/上传完成/删除
    在上传成功时，保存好相关信息：name，url
    为父组件提供获取已上传图片文件名数组的方法
  # 3. 删除图片
    当文件状态变为删除时，调用删除图片的接口删除上传到后台的图片
  # 4. 父组件调用子组件方法：ref
    this.uploadPicRef.current.getImages()

day 07 

## 1. RichTextEditor
  # 1. 使用基于react的富文本编程插件库：react-draft-wysiwyg
  # 2. 参考库的Demo和API文档编写
  # 3. 如果还有不确定，百度搜索，指定相对准确的关键字

## 2. 完成商品添加与修改功能
  # 1. 收集输入数据
    通过Form收集：name/desc/price/pCategoryId/categoryId
    通过ref收集：img/detail
    如果是更新收集：_id
    将收集数据封装成product对象
  # 2. 更新商品
    定义添加和更新的接口请求函数
    调用接口请求函数，如果成功返回并返回商品列表

## 3. 角色管理
  # 1. 角色前台分页显示
  # 2. 添加角色
  # 3. 给指定角色授权
    界面：Tree
    状态：checkedKeys，根据传入的role的menus进行初始化
    勾选某个Node是，更新checkedKeys
    点击Ok时：通过ref读取到子组件中的checkedKeys作为要更新product新的menus
              发送请求更新product
    解决默认勾选不正常的bug：利用组件的componentWillReceiveProps()
