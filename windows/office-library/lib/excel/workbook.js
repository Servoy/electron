var fs = require('fs')
var application = require('./application')

function Workbook (workbookPath) {
  workbookPath = workbookPath || null
  var nativeWorkbook
  var workbook = this
  if (fs.existsSync(workbookPath)) {
    nativeWorkbook = application.open(workbookPath, true)
  } else {
    nativeWorkbook = application.fetch(workbookPath, true)
  }

  workbook.textReplace = function (find, replace) {
    if (typeof find === 'string' && typeof replace === 'string') {
      nativeWorkbook.textReplace({'find': find, 'replace': replace}, true)
    } else if (typeof find === 'object') {
      replace = (typeof replace === 'function') ? replace : true
      nativeWorkbook.textReplace({'batch': find}, replace)
    }
    return presentation
  }

  workbook.attr = function (input, cb) {
    cb = cb || true
    return nativeWorkbook.attr(input, cb)
  }

  workbook.dispose = function () {
    return nativeWorkbook.dispose(null, true)
  }

  workbook.quit = function (cb) {
    cb = cb || true
    nativeWorkbook.close(null, true)
    application.quit(null, cb)
  }
  workbook.close = function (cb) {
    cb = cb || true
    nativeWorkbook.close(null, cb)
  }

  workbook.save = function (cb) {
    cb = cb || true
    nativeWorkbook.save(null, cb)
  }

  workbook.saveAs = function (input, cb) {
    cb = cb || true
    nativeWorkbook.saveAs(input, cb)
  }

  workbook.saveAsCopy = function (input, cb) {
    cb = cb || true
    nativeWorkbook.saveAs(input, cb)
  }

  // * Attr shortcuts
  workbook.path = function () {
    return workbook.attr('Path', true)
  }

  workbook.name = function () {
    return workbook.attr('Name', true)
  }

  workbook.fullName = function () {
    return workbook.attr('FullName', true)
  }

  workbook.builtinProp = function (prop, value) {
    if (typeof prop !== 'string') {
      return nativeWorkbook.properties(null, true).getAllBuiltinProperties(null, true)
    } else if (typeof value !== 'string') {
      return nativeWorkbook.properties(null, true).getBuiltinProperty(prop, true)
    } else {
      return nativeWorkbook.properties(null, true).setBuiltinProperty({'prop': prop, 'value': value}, true)
    }
  }

  workbook.customProp = function (prop, value) {
    if (typeof prop !== 'string') {
      return nativeWorkbook.properties(null, true).getAllCustomProperties(null, true)
    } else if (typeof value !== 'string') {
      return nativeWorkbook.properties(null, true).getCustomProperty(prop, true)
    } else {
      return nativeWorkbook.properties(null, true).setCustomProperty({'prop': prop, 'value': value}, true)
    }
  }

  workbook.tag = {
    get: function (name) {
      return nativeWorkbook.tags(null, true).get(name, true)
    },
    set: function (name, value) {
      nativeWorkbook.tags(null, true).set({name: name, value: value}, true)
      return presentation
    },
    remove: function (name) {
      nativeWorkbook.tags(null, true).remove(name, true)
      return presentation
    }
  }

  workbook.tags = nativeWorkbook.tags(null, true).all(null, true)

  workbook.getType = function () {
    return nativeWorkbook.getType(null, true)
  }
}

module.exports = Workbook
