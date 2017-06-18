const mongoose = require('mongoose')
const Store = mongoose.model('Store')

exports.homePage = (req, res, next) => {
  res.render('index')
}

exports.addStore = (req, res, next) => {
  res.render('editStore', { title: 'Add Store' })
}

exports.createStore = async (req, res, next) => {
  const store = await (new Store(req.body)).save()
  req.flash('success', `Successfully Created ${store.name}. Care to review?`)
  res.redirect(`/store/${store.slug}`)
}

exports.getStores = async (req, res) => {
  const stores = await Store.find()
  res.render('stores', { title: 'Stores', stores })
}

exports.editStore = async(req, res) => {
  const store = await Store.findOne({ _id: req.params.id })
  res.render('editStore', { title: 'Edit Store', store })
}

exports.updateStore = async(req, res) => {
  req.body.location.type = 'Point'
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true
  }).exec()
  req.flash('success', `Successfull updated ${store.name}. <a href="/stores/${store.slug}">View Store =></a>`)
  res.redirect(`/stores/${store._id}/edit`)
}
