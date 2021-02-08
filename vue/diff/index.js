import { 
  createElement,
  render,
  renderDom
} from './element.js';
import patch from './patch.js';
import diff from './diff.js';

let virtualDom = createElement('ul',{ class: 'list'}, [
  createElement('li', { class: 'item' }, ['a']),
  createElement('li', { class: 'item' }, ['b']),
  createElement('li', { class: 'item' }, ['c'])
])

let virtualDom2 = createElement('ul', { class: 'list-group' }, [
  createElement('li', { class: 'item' }, ['1']),
  createElement('li', { class: 'item' }, ['b']),
  createElement('p', {class: 'page'}, [
      createElement('a', {class:'link', href: 'https://www.so.com/', target: '_blank'}, ['so'])
  ]),
  createElement('li', {class: 'wkk'}, ['wkk'])
]);

// 将虚拟dom转化成了真实dom并渲染到页面
let el = render(virtualDom);
renderDom(el, document.body) // === document.body.appendChild(el)

let patches = diff(virtualDom, virtualDom2);
console.log(patches);

// 给元素打补丁，重新更新视图
patch(el, patches);