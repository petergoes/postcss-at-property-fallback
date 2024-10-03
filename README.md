# postcss-at-property-fallback

> [PostCSS] plugin providing `@property`'s `initial-value` fallback.

Browsers that do not support the `@property` syntax (yet), will not register the
default value. This plugin defines the custom property directly after the
`@property` definition with the initial value as its value.

```css
/* Input */
@property --bg-color {
  syntax: '<color>';
  initial-value: magenta;
}
```

```css
/* Output */
@property --bg-color {
  syntax: '<color>';
  initial-value: magenta;
}
--bg-property: magenta;
```

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-at-property-fallback
```

**Step 2:** Check your project for existing PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-at-property-fallback'),
    require('autoprefixer')
  ]
}
```

[PostCSS]: https://github.com/postcss/postcss
[official docs]: https://github.com/postcss/postcss#usage
