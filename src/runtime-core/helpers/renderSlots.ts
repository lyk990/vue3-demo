import { createVNode, Fragment } from "../vnode";

export function renderSlots(slots, name, props) {
  const slot = slots[name];
  if (slot) {
    if (typeof slot === "function") {
      // children是不可以有array
      // 只需要把children渲染出来即可
      return createVNode(Fragment, {}, slot(props));
    }
  }
}
