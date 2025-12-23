const nodeCache = require('node-cache')
const cache = new nodeCache({stdTTL:3600})
module.exports = cache