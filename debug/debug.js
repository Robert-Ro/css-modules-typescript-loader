const fs = require('fs')
const compiler = require('../test/compiler.js')
const gen = require('./index-debug.js')

const getCssMoudle = async () => {
  await compiler('./entry.js')

  // const declaration = fs.readFileSync(require.resolve('./index.css.d.ts'), 'utf-8')

  // expect(declaration).toMatchSnapshot()
}

const decode = () => {
  const content = fs.readFileSync('./output.js', 'utf-8').toString()
  const css = gen(content)
  console.log(css)
}

decode()
