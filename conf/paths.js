const path = require('path')

 const miuiFront =  path.join(__dirname, '../release/miui-sys-front-for-build')
 const admin =  path.join(__dirname, '../release/mqs-admin-for-build')
 console.log(miuiFront, 'miuiFront------------------------------------');
module.exports = {
    miuiFront,
    admin
};
