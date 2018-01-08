import wepy from 'wepy';
import util from './util';
import md5 from './md5';
import tip from './tip'

const API_SECRET_KEY = 'www.mall.cycle.com'  // API秘钥
const TIMESTAMP = util.getCurrentTime()     // 当前时间戳
const SIGN = md5.hex_md5((TIMESTAMP + API_SECRET_KEY).toLowerCase()) //签名

// 将wxRequest封装了一层
const wxRequest = async(params = {}, url) => {
    tip.loading();
    let data = params.query || {};
    data.sign = SIGN;
    data.time = TIMESTAMP;
    let res = await wepy.request({
        url: url,
        method: params.method || 'GET',
        data: data,
        header: { 'Content-Type': 'application/json' },
    });
    tip.loaded();
    return res;
};


module.exports = {
    wxRequest
}
