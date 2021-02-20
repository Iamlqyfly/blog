// plopfile.js 文件
module.exports = function(plop){
  plop.setGenerator('test',{
      description: 'generate a test',
      prompts: [
        {
          type: 'input',
          name: 'pageName',
          message: '请输入文件夹名称',
        },
        {
          type: 'input',
          name: 'less',
          message: '需要less文件吗？(y/n)',
        },{
          type: 'confirm',
          name: 'hasNavbar',
          message: '需要页面导航栏吗？(y/n)',
          default: this.hasNavbar
        }
      ],
      actions: data => {
        const { pageName, less, hasNavbar } = data;
        const name = '{{pageName}}';
        let actions = [];
        if (pageName) {
          actions.push({
            type: 'add',
            path: `src/${name}/index.vue`,
            templateFile: 'plop-demo/index.hbs',
            data: {
              name: name,
              hasNavbar: hasNavbar, // 是否有操作按钮
            }
          });
        }
        if (less === 'y') {
          actions.push({
            type: 'add',
            path: `src/${name}/index.less`,
            templateFile: 'plop-demo/index.less',
          })
        }
        return actions;
      }
    });
  }