import { create, act } from 'react-test-renderer';

/**
 * nodeType = component => type = Function:StyledComponent
 * nodeType = component => type = Function:name
 * nodeType = host      => type = name
 */
const getTypename = child => {
  if (typeof child !== 'object') {
    return typeof child;
  }

  return child.nodeType === 'host' ? child.type : child.type.name;
}

const recursiveFindStyledComponent = (found, tree, name, isLeaf) => {
  const { rendered } = tree;
  
  if (!rendered) { return []; }

  const typename = getTypename(rendered);
  if (typename === 'string') { return []; };

  if (typename === 'StyledComponent') {
    const renderedTypename = getTypename(rendered.rendered);
    if (renderedTypename === name) {
      found.push(rendered);
    }
  }

  if (isLeaf) { return found; }

  const tab = findAllStyledComponent(rendered, name, isLeaf);
  tab.forEach(item => found.push(item));

  return found;
};

const findAllStyledComponent = (tree, name, isLeaf = false) => {
  const { rendered } = tree;
  
  if (!rendered) { return []; }

  let found = [];

  if (!Array.isArray(rendered)) {
    return recursiveFindStyledComponent(found, tree, name, isLeaf);
  }

  rendered.forEach(child => {
    const typename = getTypename(child);
    if (typename === 'string') return;
    
    if (typename === 'StyledComponent') {
      const renderedTypename = getTypename(child.rendered);
      if (renderedTypename === name) {
        found.push(child);
      }
    }
    
    if (isLeaf) { return found; }

    const tab = findAllStyledComponent(child, name, isLeaf);
    tab.forEach(item => found.push(item));
  });
  return found;
};

export const withTestFeatures = source => {
  source.root.findAllStyledComponent = name => findAllStyledComponent(source.toTree(), name);
  return source;
};

const render = (component) => {
  let tree;
  act(() => {
    tree = create(component);
  });
  return withTestFeatures(tree);  
};

export const update = (tree, component) => {
  act(() => {
    tree = tree.update(component)
  });
  return withTestFeatures(tree);
}

export default render;
