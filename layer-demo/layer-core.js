function Context(layer) {
  this.layer = layer
}

Context.prototype.use = function (categoryName) {
  const forEach = (callback) => {
    this.layer.getAll(categoryName).forEach((item) => {
      callback.call(null, ...item)
    })
  }

  return {
    forEach
  }
}

function Layer() {
  this.categories = {}
}

Layer.prototype.pick = function (categoryName, ...args) {
  if (!(categoryName in this.categories)) {
    this.categories[categoryName] = []
  }

  this.categories[categoryName].push(args)
}

Layer.prototype.getAll = function (categoryName) {
  return this.categories[categoryName]
}

Layer.prototype.run = function (callback) {
  try {
    const context = new Context(this)
    callback(context)
  } catch (ex) {
    console.error(ex)
  }
}

const layer = new Layer()