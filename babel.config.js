
//  引入vuepress代码高亮
const components = require('prismjs/components');
const allLanguages = Object.keys(components.languages).filter((item) => item !== 'meta');


module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],

  // vuepress代码高亮
  plugins: [
    [
      'prismjs',
      {
        // 引入全部语言
        languages: allLanguages,

        // 引入指定语言
        // languages: ['json'],
      },
    ],
  ],
}
