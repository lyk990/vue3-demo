import { isObject } from "../shared";
import { createComponentInstance, setupComponent } from "./component";

export function render(vnode, container) {
  // 调用patch方法
  // 主要就是用来对比两次虚拟dom的方法，做的主要就是diff的操作

  patch(vnode, container);
}

function patch(vnode, container) {
  // 去处理组件
  //  TODO 判断是不是element类型
  // processELement()
  if (typeof vnode.type === "string") {
    processELement(vnode, container);
  } else if (isObject(vnode.type)) {
    processComponent(vnode, container);
  }
}
function processELement(vnode: any, container: any) {
  mountElement(vnode, container);
}
function mountElement(vnode: any, container: any) {
  const el = document.createElement(vnode.type);
  const { children } = vnode;
  if (typeof children == "string") {
    el.textContent = children;
  } else if (Array.isArray(children)) {
    // vnode
    mountChildren(vnode, el)
  }
  const { props } = vnode;
  for (const key in props) {
    const val = props[key];
    el.setAttribute(key, val);
  }
  container.append(el);
}

function mountChildren(vnode, container) {
  vnode.children.forEach(v => {
    patch(v, container)
  });
}
 
function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountComponent(vnode: any, container: any) {
  const instance = createComponentInstance(vnode);

  setupComponent(instance);
  setupRenderEffect(instance, container);
}

function setupRenderEffect(instance, container) {
  const subTree = instance.render();

  // vnode -> patch
  // vnode -> element -> mountElement
  patch(subTree, container);
}
