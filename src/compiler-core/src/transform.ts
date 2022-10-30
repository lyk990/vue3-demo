export function transform(root, options) {
  const context = createTransfromContext(root, options);
  // 1.遍历- 深度优先搜索
  traverseNode(root, context);
}

function createTransfromContext(root, options) {
  const context = {
    root,
    nodeTransforms: options.nodeTransforms || [],
  };
  return context;
}
function traverseNode(node: any, context) {
  // if (node.type === NodeTypes.TEXT) {
  //   node.content = node.content + "mini-vue";
  // }

  const nodeTransforms = context.nodeTransforms;

  for (let i = 0; i < nodeTransforms.length; i++) {
    const transform = nodeTransforms[i];
    transform(node);
  }
  tranfChildren(node, context);
}
function tranfChildren(node, context) {
  const children = node.children;

  if (children) {
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      traverseNode(node, context);
    }
  }
}
