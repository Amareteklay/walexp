// move-build-to-root.js
const fs = require("fs-extra")
const path = require("path")

const buildPath = path.join(__dirname, "build")
const files = fs.readdirSync(buildPath)

files.forEach((file) => {
  fs.moveSync(path.join(buildPath, file), path.join(__dirname, file), {
    overwrite: true,
  })
})

fs.removeSync(buildPath)
