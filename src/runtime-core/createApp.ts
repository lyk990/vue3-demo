import { createVNode } from "./vnode";
// import { render } from "./renderer";

export function createAppAPI(render) {
  return function createApp(rootComponent) {
    return {
      mount(rootContainer) {
        // 先转换成虚拟节点(vnode)
        // 所有的逻辑操作都会基于虚拟节点（vnode）来做处理
        const vnode = createVNode(rootComponent);
        render(vnode, rootContainer);
      },
    };
  };
}
