// 组件 provide 和 inject 功能
import { h, provide, inject } from "../../lib/guide-mini-vue.esm.js";

// const ProviderOne = {
//   setup() {
//     provide("foo", "foo");
//     provide("bar", "bar");
//     return () => h(ProviderTwo);
//   },
// };
const Consumer = {
  name: "Consumer",
  setup() {
    const foo = inject("foo");
    const bar = inject("bar");
    const baz = inject("baz", () => "bazDefault")
    return {
      foo,
      bar,
      baz
    };
  },
  render() {
    return h("div", {}, `Consumer: - ${this.foo}-${this.bar}-${this.baz}`);
  },
};

const Provider = {
  name: "Provider",
  setup() {
    provide("foo", "foo");
    provide("bar", "bar");
  },
  render() {
    return h("div", {}, [h("p", {}, "Provider"), h(ProviderTwo)]);
  },
};

const ProviderTwo = {
  name: "ProbiderTwo",
  setup() {
    // // override parent value
    provide("foo", "fooOverride");
    // provide("baz", "baz");
    const foo = inject("foo");
    // // 这里获取的 foo 的值应该是 "foo"
    // // 这个组件的子组件获取的 foo ，才应该是 fooOverride
    // if (foo !== "foo") {
    //   throw new Error("Foo should equal to foo");
    // }
    // return () => h(Consumer);
    return {
      foo,
    };
  },
  render() {
    return h("div", {}, [h("p", {}, `ProviderTwo, foo: ${this.foo}`), h(Consumer)]);
  },
};

export default {
  name: "App",
  setup() {},
  render() {
    return h("div", {}, [h("p", {}, "apiInject"), h(Provider)]);
  },
};
