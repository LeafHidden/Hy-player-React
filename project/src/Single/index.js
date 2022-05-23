/* eslint-disable react-hooks/exhaustive-deps */

import style from "./style/index.module.scss"
import BScroll from 'better-scroll'
import { useEffect, forwardRef, useImperativeHandle, useState } from "react"
export const Single = forwardRef((props, ref) => {
    let [lyricList, lyricListFn] = useState(null);

    useEffect(() => {
        const wrapper = document.querySelector(`.lyrics-wraper`)
        setTimeout(() => {
            lyricListFn(
              new  BScroll(wrapper, {
                    scrollY: true,  //开启横向滚动
                    click: true,  // better-scroll 默认会阻止浏览器的原生 click 事件
                    mouseWheel: true,
                })
            )

        }, 10)

    }, [])


 

    useImperativeHandle(ref, () => ({
        ref: lyricList,
      
    }));

    return (
        <div className={style["Single"]} ref={ref}>
            <div className="container">
                <div className="nav">
                    <div className="nav-left">
                        {/* 封面 */}
                        <div className="cover">
                            {/*  */}
                            <img src={props.avatar.al.picUrl || "http://p3.music.126.net/71YQw1K88LS06iMjLRY5CA==/18610333812708195.jpg"} alt="" />
                            {
                                props.avatar && <div className="title">
                                    <h1>{props.avatar.name}</h1>
                                    <div>
                                        <span>歌手：</span>
                                        <span>{props.avatar.ar[0].name}</span>
                                    </div>
                                    <div>
                                        <span>专辑：</span>
                                        <span>{props.avatar.al.name}</span>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                    <div className="nav-right">

                        <div className="lyrics lyrics-wraper">
                            <ul className="list">
                                {
                                    props.lyric.map((item,index) => {
                                        return <li 
                                        key={item.key}
                                        className={`${index===props.currindex ?'active' :'' }`}
                               
                                        >
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
})
