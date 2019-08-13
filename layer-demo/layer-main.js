const data = [
  {
    key: 1,
    title: 'item1',
  },
  {
    key: 2,
    title: 'item2',
  },
  {
    key: 3,
    title: 'item3',
  },
  {
    key: 4,
    title: 'item4',
  },
  {
    key: 5,
    title: 'item5',
  },
]

function render(data, rootNode) {
  data.forEach((itemData) => {
    const itemNode = document.createElement('div')
    itemNode.id = itemData.key
    itemNode.innerHTML = itemData.title
    itemNode.style.cssText = `
      padding: 5px;
      cursor: pointer;
    `
    layer.pick('item-node', itemNode, itemData)
    rootNode.appendChild(itemNode)
  });
}

render(data, document.getElementById('root'))