const postcss = require('postcss')
const { equal } = require('node:assert')
const { test } = require('node:test')

const plugin = require('./')

test('Add fallback', async () => {
const input =
`
@property --foo {
  syntax: '<color>';
  initial-value: magenta;
  inherits: true;
}
`

const output =
`
@property --foo {
  syntax: '<color>';
  initial-value: magenta;
  inherits: true;
}
--foo: magenta
`

let result = await postcss([plugin()]).process(input, { from: undefined })
equal(result.css, output)
equal(result.warnings().length, 0)
})

test('Add nested fallback', async () => {
const input =
`
.a {
  .b {
    @property --foo {
      syntax: '<color>';
      initial-value: magenta;
      inherits: true;
    }
  }
}
`

const output =
`
.a {
  .b {
    @property --foo {
      syntax: '<color>';
      initial-value: magenta;
      inherits: true;
    }
    --foo: magenta
  }
}
`

let result = await postcss([plugin()]).process(input, { from: undefined })
equal(result.css, output)
equal(result.warnings().length, 0)
})

test('Ignore (wand warn) when no inital value', async () => {
const input =
`
@property --foo {
  syntax: '<color>';
  inherits: true;
}
`

const output =
`
@property --foo {
  syntax: '<color>';
  inherits: true;
}
`
let result = await postcss([plugin()]).process(input, { from: undefined })
equal(result.css, output)
equal(result.warnings().length, 1)
})
