/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @returns {length}
 */
const getUniqueListBy=(arr, key) => {
  return [...new Map(arr.map(item => [item[key], item])).values()]
}

module.exports = getUniqueListBy;
