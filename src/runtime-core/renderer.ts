import { createComponentInstance, setupComponent } from "./component";
import { ShapeFlags } from "../shared/shapeFlags";
import { Fragment, Text } from "./vnode";
import { createAppAPI } from "./createApp";

export function createRenderer(options) {
  const { createElement, patchProp, insert } = options;
  
  function render(vnode, container) {
    // 调用patch方法
    // 主要就是用来对比两次虚拟dom的方法，做的主要就是diff的操作

    patch(vnode, container, null);
  }

  function patch(vnode, container, parentComponent) {
    // 去处理组件
    //  TODO 判断是不是element类型
    // processELement()
    const { type, shapeFlag } = vnode;
    switch (type) {
      case Fragment:
        processFragment(vnode, container, parentComponent);
        break;
      case Text:
        processText(vnode, container);
        break;
      default:
        // Fragment -> 只渲染chidlren
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processELement(vnode, container, parentComponent);
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(vnode, container, parentComponent);
        }
        break;
    }
  }

  function processText(vnode: any, container: any) {
    // Implement
    const { children } = vnode;
    const textNode = (vnode.el = document.createTextNode(children));
    container.append(textNode);
  }

  function processFragment(vnode: any, container: any, parentComponent) {
    // Implement
    mountChildren(vnode, container, parentComponent);
  }

  function processELement(vnode: any, container: any, parentComponent) {
    mountElement(vnode, container, parentComponent);
  }
  function mountElement(vnode: any, container: any, parentComponent) {
    // cancas
    // new Element()
    const el = (vnode.el = createElement(vnode.type));
    const { children, shapeFlag } = vnode;
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children;
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      // vnode
      mountChildren(vnode, el, parentComponent);
    }
    const { props } = vnode;
    for (const key in props) {
      const val = props[key];
      patchProp(el, key, val);
    }
    // container.append(el);
    insert(el, container);
  }

  function mountChildren(vnode, container, parentComponent) {
    vnode.children.forEach((v) => {
      patch(v, container, parentComponent);
    });
  }

  function processComponent(vnode: any, container: any, parentComponent) {
    mountComponent(vnode, container, parentComponent);
  }

  function mountComponent(initialVNode: any, container: any, parentComponent) {
    const instance = createComponentInstance(initialVNode, parentComponent);

    setupComponent(instance);
    setupRenderEffect(instance, initialVNode, container);
  }

  function setupRenderEffect(instance: any, initialVNode, container) {
    const { proxy } = instance;
    const subTree = instance.render.call(proxy);

    // vnode -> patch
    // vnode -> element -> mountElement
    patch(subTree, container, instance);
    initialVNode.el = subTree.el;
    return {
      createApp: createAppAPI(render)
    }
  }
}
