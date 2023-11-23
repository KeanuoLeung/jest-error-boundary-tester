import renderer from 'react-test-renderer';
import Link from './src/App';

const TARGET = 'ErrorBoundary';

it('changes the class when hovered', () => {
  const component = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>
  );
  let tree = component.getInstance();
  const componentNames = [];
  const test = { ...component.root._fiber };
  test._parent = component.root._fiber;
  const nodeList = [test];
  let curNode;
  function findNearestParentName(node) {
    let curNode = node;
    while (!curNode?.type?.name) {
      curNode = curNode._parent;
    }
    return curNode?.type?.name;
  }
  while ((curNode = nodeList.pop())) {
    if (curNode.child) {
      nodeList.push({ ...curNode.child, _parent: curNode });
    }
    if (curNode.sibling) {
      nodeList.push({ ...curNode.sibling, _parent: curNode._parent });
    }

    if (curNode?.type?.name === TARGET) {
      componentNames.push({
        name: curNode?.type?.name ?? curNode?.type,
        parent: findNearestParentName(curNode?._parent),
      });
    }
  }

  console.log('component names', componentNames);
  console.log('this is tree!!!', component.root._fiber.child);
});
