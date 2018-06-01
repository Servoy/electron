'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Util {
  /**
   * Create the work directory.
   *
   * @return {String} The path of the created directory, failure is null.
   */
  static createWorkDir() {
    const dir = _path2.default.join(_os2.default.tmpdir(), _uuid2.default.v4());
    _fs2.default.mkdirSync(dir);

    const stat = _fs2.default.statSync(dir);
    return stat && stat.isDirectory() ? dir : null;
  }

  /**
   * Delete a files.
   *
   * @param {Array.<String>} paths File paths.
   */
  static deleteFiles(paths) {
    paths.forEach(path => {
      try {
        const stat = _fs2.default.statSync(path);
        if (stat && stat.isFile()) {
          _fs2.default.unlinkSync(path);
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  /**
   * Filter by size to the specified image informations.
   *
   * @param {Array.<ImageInfo>} images Image file informations.
   * @param {Array.<Number>}    sizes  Required sizes.
   *
   * @return {Array.<ImageInfo>} Filtered image informations.
   */
  static filterImagesBySizes(images, sizes) {
    return images.filter(image => {
      return sizes.some(size => {
        return image.size === size;
      });
    }).sort((a, b) => {
      return a.size - b.size;
    });
  }

  /**
   * Convert a values to a flat array.
   *
   * @param  {Array.<String|Array>} values Values ([ 'A', 'B', [ 'C', 'D' ] ]).
   *
   * @return {Array.<String>} Flat array ([ 'A', 'B', 'C', 'D' ]).
   */
  static flattenValues(values) {
    const paths = [];
    values.forEach(value => {
      if (!value) {
        return;
      }

      if (Array.isArray(value)) {
        value.forEach(path => {
          paths.push(path);
        });
      } else {
        paths.push(value);
      }
    });

    return paths;
  }

  /**
   * Check the icon sizes.
   * Compare the standard sizes with the options specified sizes to get the sizes actually needed.
   *
   * @param {Array.<Number>} defaltSizes Sizes of the defalt.
   * @param {Object}         options     CLI options.
   * @param {String}         type        Type of the icon, 'ico' or 'icns'.
   *
   * @return {Array.<Number>} Checked sizes.
   */
  static checkImageSizes(defaltSizes, options, type) {
    return options && options.sizes && options.sizes[type] ? options.sizes[type] : defaltSizes;
  }
}
exports.default = Util;