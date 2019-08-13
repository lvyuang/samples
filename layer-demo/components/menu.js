const Menu = {
  'show': (event, menuItems) => {
    if (Menu.isExists()) {
      Menu.clear()
    }

    event.preventDefault()

    const menuNode = Menu.create(event)

    menuItems.forEach((menuItem) => {
      menuNode.appendChild(menuItem.create())
    })
  },
  'isExists': () => {
    const menuNode = document.getElementById('#menu#')

    return !!menuNode
  },
  'clear': () => {
    const menuNode = document.getElementById('#menu#')

    if (menuNode) {
      menuNode.parentNode.removeChild(menuNode)
      document.removeEventListener('click', Menu.removeHandler)
    }
  },
  'create': (event) => {
    const menuNode = document.createElement('div')
    menuNode.id = '#menu#'
    menuNode.style.cssText = `
      position: absolute;
      left: ${event.clientX}px;
      top: ${event.clientY}px;
      border: 1px solid #ddd;
      border-radius: 2px;
      width: 200px;
      background-color: white;
    `;
    menuNode.addEventListener('click', (event) => {
      event.stopPropagation()
    })
    document.body.appendChild(menuNode)
    document.addEventListener('click', Menu.removeHandler)

    return menuNode
  },
  'removeHandler': () => {
    Menu.clear();
  }
}

const MenuItem = (options) => {
  return {
    'create': () => {
      const node = document.createElement('div')
      node.style.cssText = `
        padding: 4px 8px;
        cursor: pointer;
      `
      node.innerHTML = options.title
      node.addEventListener('click', () => {
        options.onClick && options.onClick()
        Menu.clear()
      })
      return node
    },
  }
}

const MenuItemDivider = () => {
  return {
    'create': () => {
      const node = document.createElement('div')
      node.style.cssText = `
        height: 1px;
        background-color: red;
        margin: 5px;
      `
      return node
    },
  }
}