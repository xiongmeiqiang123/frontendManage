const response = {
    success: function (data={}) {
        return {
            status: true,
            data
        }
    },

    fail: function (msg = '') {
        return {
            status: false,
            msg
        }
    }
}

module.exports = response;
