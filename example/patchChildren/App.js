import { h } from "../../lib/guide-mini-vue.esm.js";
// import PatchChildren from "./PatchChildren.js";
import ArrayToText from "./ArrayToText.js";
import ArrayToArray from "./ArrayToArray.js";
import TextToText from "./TextToText.js";
import TextToArray from "./TextToArray.js";

export default {
  name: "App",
  setup() {},

  render() {
    return h("div", { tId: 1 }, [
      h("p", {}, "主页"),
      // 老的是array 新的是text
      // h(ArrayToText),
      // 老的是text 新的是text
      // h(TextToText),
      // 老的是text 新的是array
      h(TextToArray),
      // 老的是array 新的是array
      // h(ArrayToArray),
    ]);
  },
};
