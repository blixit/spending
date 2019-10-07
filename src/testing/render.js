import { create, act } from 'react-test-renderer';

const render = (component) => {
  let root;
  act(() => {
    root = create(component);
  });
  return root;  
};

export const update = (root, component) => {
  act(() => {
    root = root.update(component)
  });
  return root;
}

export default render;
