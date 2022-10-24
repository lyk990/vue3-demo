import { h, renderSlots } from "../../lib/guide-mini-vue.esm.js";

export const Foo = {
  setup(props, { emit }) {},
  render() {
    const foo = h("p", {}, "foo");
    console.log(this.$slots);
    // 具名插槽
    // 作用域插槽
    const age = 18;
    return h("div", {}, [
      renderSlots(this.$slots, "header", { age }),
      foo,
      renderSlots(this.$slots, "footer"),
    ]);
  },
};
