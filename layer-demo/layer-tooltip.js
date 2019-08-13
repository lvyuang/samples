layer.run((context) => {
  context.use('item-node').forEach((itemNode, itemData) => {
    itemNode.addEventListener('mouseenter', () => {
      const tooltipId = Tooltip.show(itemNode, itemData.title)
      const leaveHandler = () => {
        Tooltip.hide(tooltipId)
        itemNode.removeEventListener('mouseleave', leaveHandler)
      }

      itemNode.addEventListener('mouseleave', leaveHandler)
    })
  })
})