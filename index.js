const { Declaration } = require('postcss')

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = () => {
  return {
    postcssPlugin: 'postcss-at-property-fallback',

    AtRule: {
      property: (atRule, {result}) => {
        const prop = atRule.params
        const { value } = atRule.nodes.find(
          node => node.prop === 'initial-value'
        ) || {}

        if (value) {
          atRule.after(new Declaration({ prop, value }))
        } else {
          result.warn(`No intial value for @property ${prop}`)
        }
      }
    }
  }
}

module.exports.postcss = true
