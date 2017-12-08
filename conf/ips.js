let name = {
    zhangyang: 'http://10.232.39.9:8082',
    liuxiwen: 'http://10.232.33.9:8082',
    localhost: 'http://127.0.0.1:3001',
    linlin: 'http://10.232.33.23:8082',
    mqsas: 'http://sys.pt.miui.com',
    test: 'http://test.sys.pt.miui.com',
    preview: 'http://preview.sys.pt.miui.com',
    zhicai: 'http://10.232.32.30:8082',
    anqi: 'http://10.232.39.18:8082',
    dawei: 'http://10.232.33.44:8088',
    liuyilan: 'http://10.232.33.8:8082',
    wangbin: 'http://10.232.33.42:8082',
    maqihao: 'http://10.232.39.16:8082'
}
const ips = [
    {
        name: '本地',
        key: 'localhost',
        ip: 'http://127.0.0.1:3001'
    },
    {
        name: '线上',
        key: 'production',
        ip: 'http://sys.pt.miui.com'
    }, {
        name: 'preview环境',
        key: 'preview',
        ip: 'http://preview.sys.pt.miui.com'
    }, {
        name: '测试环境',
        key: 'test',
        ip: 'http://test.sys.pt.miui.com'
    }, {
        name: '蔡大伟',
        key: 'caidawei',
        ip: 'http://10.232.33.239:8015'
    }, {
        name: '王林林',
        key: 'wanglinlin',
        ip: 'http://10.232.39.240:8082'
    }, {
        name: '王安奇',
        key: 'wanganqi',
        ip: 'http://10.232.31.34:8082'
    }, {
        name: '张阳',
        key: 'zhangyang',
        ip: 'http://10.232.33.60:8082'
    }, {
        name: '刘喜文',
        key: 'liuxiwen',
        ip: 'http://10.232.39.23:8082'
    }, {
        name: '王斌',
        key: 'wangbin',
        ip: 'http://10.232.39.23:8082'
    }
]
module.exports = ips;
// export default  ips;
