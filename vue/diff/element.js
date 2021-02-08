// 虚拟DOM元素的类，构建实例对象，用来描述dom
class Element {
  constructor(type, props, children) {
    this.type = type;
    this.props = props;
    this.children = children
  }
}

// 设置属性
function setAttr(node, key, value) {
  switch(key) {
    // node是一个input或者Textarea
    case 'value': 
      if (node.tagNmae.toUpperCase() == 'INPUT' || node.tagNmae.toUpperCase() == 'TEXTAREA') {
        node.value = value;
      } else {
        node.setAttribute(key, value);
      }
      break;
    case 'style': 
      node.style.cssText = value;
      break;  
    default: 
      node.setAttribute(key, value);
      break;
  }
}

// 返回虚拟节点object
function createElement(type, props, children) {
  return new Element(type, props, children);
}

// render方法可以将vNode转为真实DOM
function render(eleObj) {
  let el = document.createElement(eleObj.type);
  for (let key in eleObj.props) {
    setAttr(el, key, eleObj.props[key]);
  }
  // 如果子节点是一个元素的话，就调用它的render方法创建子节点的真实DOM，
  // 如果是一个字符串的话，创建一个文件节点就可以了
  eleObj.children.forEach(child => {
    child = (child instanceof Element) ? render(child) : document.createTextNode(child);
    el.appendChild(child);
  })
  return el;
}

function renderDom(el, target) {
  // console.log(target, el)
  target.appendChild(el);
}

export {
  createElement,
  render,
  Element,
  renderDom,
  setAttr
}