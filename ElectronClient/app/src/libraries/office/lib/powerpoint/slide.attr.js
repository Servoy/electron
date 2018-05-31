var attributes = {
  /**
    * Sets the PowerPoint slide to the passed name or outputs the name of a PowerPoint slide if the parameter 'name' is not defined.
    * @method pos
    * @param {Number} pos
    * @chainable
    *
    * @example
    * Returns the name of the slide and writes it to the variable 'slideName'.
    * @example
    *     var slideName = slide.name()
    *
    * @example
    * Sets the slide name.
    * @example
    *     slide.name('Slide Fu Bar')
    */
  name: function (name) {
    return this.attr('Name', name)
  },

  /**
  * Sets the PowerPoint slide to the passed position or outputs the position of a PowerPoint slide if the pos parameter is not set.
  * @method pos
  * @param {Number} pos
  * @chainable
  *
  * @example
  * Returns the position of the slide and writes it to the variable 'sildePos'.
  * @example
  *     var slidePos = slide.pos()
  *
  * @example
  * Push the slide to the third place.
  * @example
  *     slide.pos(3)
  */
  pos: function (pos) {
    return this.attr('Pos', pos)
  },

  /**
  * Returns the number of a PowerPoint slide.
  * @method number
  * @chainable
  * @readonly
  *
  * @example
  * Returns the number of the slide and writes it to the variable 'sildeNum'.
  * @example
  *     var slideNum = slide.number()
  */
  number: function () {
    return this.attr('Number')
  }

}

module.exports = attributes
