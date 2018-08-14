const path = require('path')

function join(dir = '') {
    return  path.join(__dirname, dir)
}
module.exports = {
    'admin': join('../release/mqs-admin-for-build'),
    'easyspark': join('../release/easyspark-for-build')
};
