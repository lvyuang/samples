layer.run((context) => {
  context.use('item-node').forEach((itemNode, itemData) => {
    itemNode.addEventListener('contextmenu', (event) => {
      Menu.show(event, [
        MenuItem({
          'title': '在新窗口打开',
          'onClick': () => {
            Link.openInNewTab('/?key=' + itemData.key)
          },
        }),
        MenuItemDivider(),
        MenuItem({
          'title': '删除',
          'onClick': () => {
            Dialog.open({
              'title': '确认删除此项吗？',
              'description': '删除后不可恢复',
              'buttons': {
                'ok': {
                  'title': '确认',
                  'onClick': () => {
                    Dialog.close()
                  }
                },
                'cancel': {
                  'title': '取消',
                  'onClick': () => {
                    Dialog.close()
                  }
                }
              }
            })
          },
        })
      ])
    })
  })
})
