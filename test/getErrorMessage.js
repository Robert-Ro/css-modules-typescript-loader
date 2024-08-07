/**
 *
 * @param {Error} error
 * @returns
 */
module.exports = (error) => {
  const type = typeof error
  return (type === 'object' ? error.stack : type === 'string' ? error : '')
    .split(process.cwd())
    .join('')
    .match(/(Error: .*?)\s{4}at /s)[1]
}
