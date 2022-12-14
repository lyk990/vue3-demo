import { extend } from "./../shared/index";

let activeEffect;
let shouldTrack;
export class ReactiveEffect {
  private _fn: any;
  deps = [];
  active = true; // 是否激活
  onStop?: () => void;
  public scheduler: Function | undefined;
  constructor(fn, scheduler?: Function) {
    this._fn = fn; // 副作用函数
    this.scheduler = scheduler;
  }
  run() {
    // 1.会收集依赖
    // shouldTrack来做区分
    // 执行fn，但是不收集依赖
    if (!this.active) {
      return this._fn();
    }
    // 应该收集
    shouldTrack = true; // 赋值给全局
    activeEffect = this; // 赋值给全局
    const result = this._fn();
    // reset
    shouldTrack = false;
    return result;
  }
  stop() {
    if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}

function cleanupEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect);
  });
  effect.deps.length = 0;
}

const targetMap = new Map();
export function track(target, key) {
  if (!isTracking()) return;
  //   target -> key -> dep
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    // 初始化， 第一次触发响应式的时候没有收集依赖
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    // 初始化， 第一次触发响应式的时候没有收集依赖
    dep = new Set();
    depsMap.set(key, dep);
  }

  // 已经在dep中， 查看dep之前是否已经添加过，添加过的话，就不添加了
  trackEffects(dep);
  // const dep = new Set()
}

export function trackEffects(dep) {
  if (dep.has(activeEffect)) return;
  dep.add(activeEffect);
  activeEffect.deps.push(dep);
}

export function isTracking() {
  return shouldTrack && activeEffect !== undefined;
}

export function trigger(target, key) {
  let depsMap = targetMap.get(target);
  let dep = depsMap.get(key);
  triggerEffects(dep);
}

export function triggerEffects(dep) {
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
/**
 * @description: 在响应式数据发生改变的时候触发，例如：watch、computed 
 * @param {*} fn
 * @param {any} options  允许指定调度器
 * @return {*}
 */
export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler);
  Object.assign(_effect, options);
  extend(_effect, options);
  _effect.run(); // return fn
  const runner: any = _effect.run.bind(_effect);
  runner.effect = _effect;

  return runner;
}

export function stop(runner) {
  runner.effect.stop();
}
