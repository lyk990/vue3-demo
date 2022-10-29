export function shouldUpdateComponent(preVNode, nextVNode) {
  const { props: prevProps } = preVNode;
  const { props: nextProps } = nextVNode;

  for (const key in nextProps) {
    if (nextProps[key] !== preVNode[key]) {
      return true;
    }
  }
  return false;
}
