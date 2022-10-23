import { camelize, toHandlerKey } from "../shared";

export function emit(instance, event, ...args) {
  // instance.props -> event
  const { props } = instance;
  // add -> Add
  // add-foo -> addFoo

  const handlerName = toHandlerKey(camelize(event));
  const handler = props[handlerName];
  handler && handler(...args);
}
