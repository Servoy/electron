var attributes = {
  /**
  * Sets the name of a PowerPoint object to the passed value or returns the name of the PowerPoint object if the parameter 'name' is not defined.
  * @method name
  * @param {String} name
  * @chainable
  *
  * @example
  * Reads the name of the PowerPoint object and writes it in the variable 'shapeName'.
  * @example
  *     var shapeName = $shapes('selector').name();
  *
  * @example
  * Changes the name of the PowerPoint object in 'Textbox_1337'.
  * @example
  *     $shapes('selector').name('Textbox_1337')
  */
  name: function (name) {
    return this.attr('Name', name)
  },

  /**
  * Sets the text of a PowerPoint object to the passed value or returns the text of the PowerPoint object if the parameter 'text' is not defined.
  * @method text
  * @param {String} text
  * @chainable
  *
  * @example
  * Reads the text of the PowerPoint object and writes it in the variable 'shapeText'.
  * @example
  *     var shapeText = $shapes('selector').text()
  *
  * @example
  * Sets the text of the PowerPoint object 'Fu Bar'.
  * @example
  *     $shapes('selector').text('Fu Bar')
  */
  text: function (text) {
    return this.attr('Text', text)
  },

  /**
  *
Sets the value of the distance to the top of a PowerPoint object to the passed value or returns the value of the distance to the top of the PowerPoint object, if the parameter 'top' is not defined.
  * @method top
  * @param {Number} top
  * @chainable
  *
  * @example
  * Reads the Distance Up value of the PowerPoint object and writes it to the variable 'shapeTop'.
  * @example
  *     var shapeTop = $shapes('selector').top()
  *
  * @example
  * Sets the value of the distance upwards of the PowerPoint object 1337.
  * @example
  *     $shapes('selector').top(1337)
  */
  top: function (top) {
    return this.attr('Top', top)
  },

  /**
  * Sets the value of the distance to the left of a PowerPoint object to the passed value or returns the value of the distance to the left of the PowerPoint object if the parameter 'left' is not defined.
  * @method left
  * @param {Number} left
  * @chainable
  *
  * @example
  * Reads the value of the distance to the left of the PowerPoint object and writes it to the variable 'shapeLeft'.
  * @example
  *     var shapeLeft = $shapes('selector').left()
  *
  * @example
  * Sets the value of the distance to the left of the PowerPoint object 1337.
  * @example
  *     $shapes('selector').left(1337)
  */
  left: function (left) {
    return this.attr('Left', left)
  },

  /**
  * Sets the height of a PowerPoint object to the passed value, or returns the value of the height of the PowerPoint object if the height parameter is undefined.
  * @method height
  * @param {Number} height
  * @chainable
  *
  * @example
  * Reads the value of the height of the PowerPoint object and writes it in the variable 'shapeHeight'.
  * @example
  *     var shapeHeight = $shapes('selector').height()
  *
  * @example
  * Sets the value of the height of the PowerPoint object 1337.
  * @example
  *     $shapes('selector').height(1337)
  */
  height: function (height) {
    return this.attr('Height', height)
  },

  /**
  * Sets the width of a PowerPoint object to the passed value, or returns the value of the width of the PowerPoint object if the width parameter is undefined.
  * @method width
  * @param {Number} width
  * @chainable
  *
  * @example
  * Reads the value of the width of the PowerPoint object and writes it in the variable 'shapeWidth'.
  * @example
  *     var shapeWidth = $shapes('selector').width()
  *
  * @example
  * Sets the value of the width of the PowerPoint object 1337.
  * @example
  *     $shapes('selector').width(1337)
  */
  width: function (width) {
    return this.attr('Width', width)
  },

  /**
  * Rotates a PowerPoint object right by the passed value or returns the value of the rotation of a PowerPoint object if the 'rotation' parameter is not defined.
  * @method rotation
  * @param {Number} rotation
  * @chainable
  *
  * @example
  * Reads the value of the rotation of the PowerPoint object and writes it into the variable'shapeRotation'.
  * @example
  *     var shapeRotation = $shapes('selector').rotation()
  *
  * @example
  * Rotates the PowerPoint object 90 degrees to the right.
  * @example
  *     $shapes('selector').rotation(90)
  */
  rotation: function (rotation) {
    return this.attr('Rotation', rotation)
  },

  /**
  *
Fills a PowerPoint object with the color with the passed value or returns the value of the color with which the PowerPoint object is filled if the parameter 'fill' is not defined.
  * @method fill
  * @param {Number} fill
  * @chainable
  *
  * @example
  * Reads out the value of the color of the PowerPoint object and writes it to the variable 'shapeColor'.
  * @example
  *     var shapeColor = $shapes('selector').fill()
  *
  * @example
  *  Fills the PowerPoint object with the color with the value '#FF9900'.
  * @example
  *     $shapes('selector').fill('FF9900')
  */
  fill: function (fill) {
    return this.attr('Fill', fill)
  },

  /**
  * Returns the next so-called 'parent' (parent, parent) of a PowerPoint object.
  * @method parent
  * @chainable
  *
  * @example
  * Reads the parent of the PowerPoint object and writes it to the variable 'shapeParent'.
  * @example
  *     var shapeParent = $shapes('selector').parent()
  */
  parent: function () {
    throw new Error('Not implemented.')
  // return this.attr('Parent')
  },

  altText: function (altText) {
    return this.attr('AltText', altText)
  },

  title: function (title) {
    return this.attr('Title', title)
  },

  type: function () {
    return this.attr('Type')
  }

}

module.exports = attributes
