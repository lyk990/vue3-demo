import { isObject } from "./../shared/index";
import { trackEffects, triggerEffects, isTracking } from "./effect";
import { hasChanged } from "../shared/index";
import { reactive } from "./reactive";

class RefImpl {
  private _value: any;
  public dep;
  private _rawValue: any;
  private _v_isRef = true;
  constructor(value) {
    this._rawValue = value;
    // 查看value1是否是一个对象,
    this._value = covert(value);
    this.dep = new Set();
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newValue) {
    // 已经先去修改了value的
    // hasChange
    if (hasChanged(newValue, this._rawValue)) {
      this._rawValue = newValue;
      this._value = covert(newValue);
      this._v_isRef = true
      triggerEffects(this.dep);
    }
  }
}

/**
 * @description: 是对象就变成响应式对象
 * @param {*} value
 * @return {*}
 */
function covert(value) {
  return isObject(value) ? reactive(value) : value;
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffects(ref.dep);
  }
}

export function ref(value) {
  return new RefImpl(value);
}

export function isRef(ref) {
  return !!ref._v_isRef;
}

export function unRef(ref) {
  // 看看是不是一个ref对象
  return isRef(ref) ? ref.value : ref;
}
/**
 * @description: 对setup中的return进行处理，在模板语法汇总不需要使用.value 
 * @param {*} objectWithRefs
 * @return {*}
 */
export function proxyRefs(objectWithRefs) {
  return new Proxy(objectWithRefs, {
    get(target, key) {
      return unRef(Reflect.get(target, key));
    },
    set(target, key, value) {
      if (isRef(target[key]) && !isRef(value)) {
        return (target[key].value = value);
      } else {
        return Reflect.set(target, key, value);
      }
    },
  });
}
