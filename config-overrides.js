// 配置具体规则
const {override, fixBabelImports, addLessLoader} = require('customize-cra')
const { getThemeVariables } = require('antd/dist/theme');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: getThemeVariables({
        dark: true, // 开启暗黑模式
        // compact: true, // 开启紧凑模式
      })
    }
  })
);