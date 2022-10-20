import { readonly, isReadonly, isProxy } from "../reactive";

describe("readonly", () => {
  it("happy path", () => {
    // not set
    const original = { foo: 1, bar: { baz: 2 } };
    const wrapped = readonly(original);
    expect(wrapped).not.toBe(original);
    expect(wrapped.foo).not.toBe(original);
    expect(isReadonly(original)).toBe(false);
    expect(isReadonly(wrapped.bar)).toBe(true);
    expect(isReadonly(original.bar)).toBe(false);
    expect(wrapped.foo).toBe(1);
    expect(isProxy(wrapped)).toBe(true);
    // expect(isReactive(wrapped)).toBe(false);
    // expect(isReadonly(wrapped)).toBe(true);
    // expect(isReactive(original)).toBe(false);
    // expect(isReadonly(original)).toBe(false);
    // expect(isReactive(wrapped.bar)).toBe(false);
    // expect(isReadonly(wrapped.bar)).toBe(true);
    // expect(isReactive(original.bar)).toBe(false);
    // expect(isReadonly(original.bar)).toBe(false);
    // get
    expect(wrapped.foo).toBe(1);
  });
  it("should call console.warn then call set", () => {
    // console.warn
    // mock
    console.warn = jest.fn();
    const user = readonly({
      age: 10,
    });
    user.age = 11;

    expect(console.warn).toBeCalled();
  });
});
