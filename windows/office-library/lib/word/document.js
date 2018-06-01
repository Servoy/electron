var fs = require('fs')
var application = require('./application')

function Document (documentPath) {
  documentPath = documentPath || null
  var nativeDocument
  var document = this
  if (fs.existsSync(documentPath)) {
    nativeDocument = application.open(documentPath, true)
  } else {
    nativeDocument = application.fetch(documentPath, true)
  }


  document.textReplace = function (find, replace) {
    if (typeof find === 'string' && typeof replace === 'string') {
      nativePresentation.textReplace({'find': find, 'replace': replace}, true)
    } else if (typeof find === 'object') {
      replace = (typeof replace === 'function') ? replace : true
      nativePresentation.textReplace({'batch': find}, replace)
    }
    return presentation
  }

  document.attr = function (input, cb) {
    cb = cb || true
    return nativePresentation.attr(input, cb)
  }

  document.dispose = function () {
    return nativePresentation.dispose(null, true)
  }

  document.quit = function (cb) {
    cb = cb || true
    nativePresentation.close(null, true)
    application.quit(null, cb)
  }
  document.close = function (cb) {
    cb = cb || true
    nativePresentation.close(null, cb)
  }

  document.save = function (cb) {
    cb = cb || true
    nativePresentation.save(null, cb)
  }

  document.saveAs = function (input, cb) {
    cb = cb || true
    nativePresentation.saveAs(input, cb)
  }

  document.saveAsCopy = function (input, cb) {
    cb = cb || true
    nativePresentation.saveAs(input, cb)
  }

  // * Attr shortcuts
  document.path = function () {
    return presentation.attr('Path', true)
  }

  document.name = function () {
    return presentation.attr('Name', true)
  }

  document.fullName = function () {
    return presentation.attr('FullName', true)
  }

  document.builtinProp = function (prop, value) {
    if (typeof prop !== 'string') {
      return nativeDocument.properties(null, true).getAllBuiltinProperties(null, true)
    } else if (typeof value !== 'string') {
      return nativeDocument.properties(null, true).getBuiltinProperty(prop, true)
    } else {
      return nativeDocument.properties(null, true).setBuiltinProperty({'prop': prop, 'value': value}, true)
    }
  }

  document.customProp = function (prop, value) {
    if (typeof prop !== 'string') {
      return nativeDocument.properties(null, true).getAllCustomProperties(null, true)
    } else if (typeof value !== 'string') {
      return nativeDocument.properties(null, true).getCustomProperty(prop, true)
    } else {
      return nativeDocument.properties(null, true).setCustomProperty({'prop': prop, 'value': value}, true)
    }
  }

  document.tag = {
    get: function (name) {
      return nativeDocument.tags(null, true).get(name, true)
    },
    set: function (name, value) {
      nativeDocument.tags(null, true).set({name: name, value: value}, true)
      return presentation
    },
    remove: function (name) {
      nativeDocument.tags(null, true).remove(name, true)
      return presentation
    }
  }

  document.tags = nativeDocument.tags(null, true).all(null, true)

  document.getType = function () {
    return nativeDocument.getType(null, true)
  }

}

module.exports = Document
