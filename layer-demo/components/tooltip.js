const Tooltip = (function () {
  return {
    'show': (hostNode, text) => {
      const offset = hostNode.getBoundingClientRect()
      const node = document.createElement('div')
      node.innerHTML = text
      node.style.cssText = `
        position: absolute;
        left: ${200}px;
        top: ${offset.y}px;
        border: 1px solid #ddd;
        padding: 5px;
      `
      node.id = 'tooltip-' + Date.now()
      document.body.appendChild(node)
      return node.id
    },
    'hide': (id) => {
      const node = document.getElementById(id)

      if (node) {
        document.body.removeChild(node)
      }
    },
  }
})()