const devKeys = require("./keys.dev.js")
const prodKeys = require("./keys.prod.js")
console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === "production") {
    console.log('true')
    module.exports = prodKeys;
    
} else {
    module.exports = devKeys;
}

