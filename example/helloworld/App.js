import { h } from "../../lib/guide-mini-vue.esm.js";

export const App = {
  render() {
    return h("div", "hi, mini-vue" + this.msg);
  },
  setup() {
    // composition api
    return {
      msg: "mini-vue",
    };
  },
};
