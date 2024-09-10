export interface TreeNode {
  id: string;
  children: string;
  pid: string;
}

type Fn = (...args: any[]) => any;

// 默认 TreeNode 字段
const DEFAULT_CONFIG: TreeNode = {
  id: 'id',
  children: 'children',
  pid: 'pid',
};

const getConfig = (config: Partial<TreeNode>) =>
  Object.assign({}, DEFAULT_CONFIG, config);

// 列表转化为树形结构
export function listToTree<T = any>(
  list: any[],
  config: Partial<TreeNode> = {},
): T[] {
  const conf = getConfig(config) as TreeNode;
  const nodeMap = new Map();
  const result: T[] = [];
  const { id, children, pid } = conf;

  for (const node of list) {
    node[children] = node[children] || [];
    nodeMap.set(node[id], node);
  }
  for (const node of list) {
    const parent = nodeMap.get(node[pid]);
    (parent ? parent.children : result).push(node);
  }
  return result;
}

// 平铺树
export function treeToList<T = any>(
  tree: any,
  config: Partial<TreeNode> = {},
): T {
  config = getConfig(config);
  const { children } = config;
  const result: any = [...tree];
  for (let i = 0; i < result.length; i++) {
    if (!result[i][children!]) continue;
    result.splice(i + 1, 0, ...result[i][children!]);
  }
  return result;
}

// 查找符合条件的一个节点
export function searchNode<T = any>(
  tree: any,
  func: Fn,
  config: Partial<TreeNode> = {},
): T | null {
  config = getConfig(config);
  const { children } = config;
  const list = [...tree];
  for (const node of list) {
    if (func(node)) return node;
    if (node[children!]) {
      list.push(...node[children!]);
    }
  }
  return null;
}

// 查找符合条件的所有节点
export function searchAllNode<T = any>(
  tree: any,
  func: Fn,
  config: Partial<TreeNode> = {},
): T[] {
  config = getConfig(config);
  const { children } = config;
  const list = [...tree];
  const result: T[] = [];
  for (const node of list) {
    if (func(node)) {
      result.push(node);
    }
    if (node[children!]) {
      list.push(...node[children!]);
    }
  }
  return result;
}

// 查找路径
export function searchPath<T = any>(
  tree: any,
  func: Fn,
  config: Partial<TreeNode> = {},
): T | T[] | null {
  config = getConfig(config);
  const path: T[] = [];
  const list = [...tree];
  const visitedSet = new Set();
  const { children } = config;
  while (list.length) {
    const node = list[0];
    if (visitedSet.has(node)) {
      path.pop();
      list.shift();
    } else {
      visitedSet.add(node);
      if (node[children!]) {
        list.unshift(...node[children!]);
      }
      path.push(node);
      if (func(node)) {
        return path;
      }
    }
  }
  return null;
}

// 查找全部路径
export function searchAllPath(
  tree: any,
  func: Fn,
  config: Partial<TreeNode> = {},
) {
  config = getConfig(config);
  const path: any[] = [];
  const list = [...tree];
  const result: any[] = [];
  const visitedSet = new Set(),
    { children } = config;
  while (list.length) {
    const node = list[0];
    if (visitedSet.has(node)) {
      path.pop();
      list.shift();
    } else {
      visitedSet.add(node);
      if (node[children!]) {
        list.unshift(...node[children!]);
      }
      path.push(node);
      if (func(node)) {
        result.push([...path]);
      }
    }
  }
  return result;
}

// 根据条件过滤
export function filter<T = any>(
  tree: T[],
  func: (n: T) => boolean,
  config: Partial<TreeNode> = {},
): T[] {
  config = getConfig(config);
  const children = config.children as string;
  function listFilter(list: T[]) {
    return list
      .map((node: any) => ({ ...node }))
      .filter((node) => {
        node[children] = node[children] && listFilter(node[children]);
        return func(node) || (node[children] && node[children].length);
      });
  }
  return listFilter(tree);
}

/**
 * 遍历树结构
 * @param tree
 * @param func
 * @param config
 * @returns
 */
export function traverseNode<T = any>(
  tree: T[],
  func: (n: T) => any,
  config: Partial<TreeNode> = {},
): void {
  config = getConfig(config);
  const list: any[] = [...tree];
  const { children } = config;
  for (let i = 0; i < list.length; i++) {
    //func 返回true就终止遍历，避免大量节点场景下无意义循环，引起浏览器卡顿
    if (func(list[i])) {
      return;
    }
    if (children && list[i][children]) {
      list.splice(i + 1, 0, ...list[i][children]);
    }
  }
}

/**
 * 递归遍历树结构
 * @param treeData 树
 * @param callback 回调
 * @param parentNode 父节点
 */
export function recursiveNode(treeData: any[], callback: Fn, parentNode = {}) {
  treeData.forEach((node) => {
    const newNode = callback(node, parentNode) || node;
    if (node.children) {
      recursiveNode(node.children, callback, newNode);
    }
  });
}
