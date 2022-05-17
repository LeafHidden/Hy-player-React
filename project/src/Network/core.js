
import axios from "axios";
import { METHOD } from "./config";
import { request } from "./idnex";
import qs from 'qs'


const APIClient = {
    // 注册
    getverse () {
        return axios({url:'https://v1.jinrishici.com/all.json',method: 'get',withCredentials: false});
    },
    // 查看登录状态
    getstate(){
        return request(METHOD.GET,'/login/status')
    },
    // 获取二维码key
    getCodeKey(){
        return request(METHOD.GET,'/login/qr/key')
    },
    // 生成二维码
    getCode(param){
        return request(METHOD.GET,`/login/qr/create`,{ params: { ...param } })
    },
    // 手机号登录
    getPhone(param){
        return request(METHOD.POST,`/login/cellphone?${qs.stringify(param)}`,)
    },
    // 获取推荐歌单
    getPersonalized(params){
        return request(METHOD.POST,`/personalized?${qs.stringify(params)}`,)
    },
    // 获取排行榜
    getToplist(){
        return request(METHOD.POST,`/toplist`,)
    },
    // 获取推荐歌曲
    getRecommend(){
        return request(METHOD.POST,`/recommend/songs`,)
    },
    // 获取歌词
    getLyric(params){
        return request(METHOD.POST,`/lyric?${qs.stringify(params)}`,)
    },
    // 获取歌曲
    getSongUrl(params){
        return  request(METHOD.POST,`/song/url?${qs.stringify(params)}`,)
    }

};

export default APIClient;
