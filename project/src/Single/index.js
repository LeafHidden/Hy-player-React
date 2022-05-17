/* eslint-disable react-hooks/exhaustive-deps */

import style from "./style/index.module.scss"
import BScroll from 'better-scroll'
import { useState, useEffect } from "react"
export const Single = (props) => {
    const [lyricList, lyricListFn] = useState([])
    const lyricData = []
    useEffect(() => {
        const wrapper = document.querySelector(`.lyrics-wraper`)
        window.$http.getLyric({
            id: '33894312',
        }).then(res => {
            formatLyric(res.data.lrc.lyric)
            lyricListFn(lyricData)
        })
      
        setTimeout(()=>{
            new BScroll(wrapper, {
                scrollY: true,  //开启横向滚动
                click: true,  // better-scroll 默认会阻止浏览器的原生 click 事件
                mouseWheel: true,
            })
        },10)
   
    }, [])



    // 格式化歌词的时间
    const formatLyricTime = (time) => {
        const regMin = /.*:/
        const regSec = /:.*\./
        const regMs = /\./

        const min = parseInt(time.match(regMin)[0].slice(0, 2))
        let sec = parseInt(time.match(regSec)[0].slice(1, 3))
        const ms = time.slice(time.match(regMs).index + 1, time.match(regMs).index + 3)
        if (min !== 0) {
            sec += min * 60
        }
        return Number(sec + '.' + ms)
    }

    const formatLyric = (text) => {
        let arr = text.split('\n')
        const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/
        arr.forEach(item => {
            if (item === '') return
            const obj = {}
            const time = item.match(regTime)

            // 获取歌词
            obj.lyric = item.split(']')[1].trim() === '' ? '' : item.split(']')[1].trim()
            // 转换时间
            obj.time = time ? formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0
            obj.key = Math.random().toString().slice(-6)
            if (obj.lyric !== '') {
                lyricData.push(obj)
            }
        })
    }
    return (
        <div className={style["Single"]}>
            <div className="container">
                <div className="nav">
                    <div className="nav-left">
                        {/* 封面 */}
                        <div className="cover">
                            <img src="http://p3.music.126.net/71YQw1K88LS06iMjLRY5CA==/18610333812708195.jpg" alt="" />
                            <div className="title">
                                <h1>克林</h1>
                                <div>
                                    <span>歌手：</span>
                                    <span>零件</span>
                                </div>
                                <div>
                                    <span>专辑：</span>
                                    <span>偶然黄昏见</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nav-right">
                
                        <div className="lyrics lyrics-wraper">
                            <ul className="list">
                                {
                                    lyricList.map(item => {
                                        return <li key={item.key}>
                                            {item.lyric}
                                        </li>
                                    })
                                }
                                <li></li>
                            </ul>
                        </div>
                 

                    </div>
                </div>

            </div>
        </div>
    )
}
