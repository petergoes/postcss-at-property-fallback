const postcss = require('postcss')
const plugin = require('./')

const input =
`
.a {
  @property --foo {
    syntax: '<color>';
    initial-value: #000000;
  }

  background-color: #ffffff;
  --foo: #444444;
}
`

async function run() {
  let result = await postcss([plugin()]).process(input, { from: undefined })
  console.log(result.css)
}

run()
