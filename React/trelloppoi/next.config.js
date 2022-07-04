const path = require('path')

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    },
    reactStrictMode: false // react-beautiful-dnd needs this at Develop Mode.
}