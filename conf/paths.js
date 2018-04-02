const path = require('path')

function join(dir = '') {
    return  path.join(__dirname, dir)
}
module.exports = {
    'miui-sys-front':  join('../release/miui-sys-front-for-build'),
    'admin': join('../release/mqs-admin-for-build'),
    'easyspark': join('../release/easyspark-for-build')
};
