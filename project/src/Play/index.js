import React, { useState } from 'react'
import style from './style/index.module.scss'
import { Slider } from '@douyinfe/semi-ui';
// import { useNavigate } from 'react-router-dom'
import { Single } from '../Single/index'
import  { keyframes } from 'styled-components';
import { fadeOutDown, fadeInUp } from 'react-animations';
import {Header} from './child'





export const Play = () => {

    // let navigate = useNavigate()
    const [visible, setVisible] = useState(false);
    const [animate, animateFn] = useState(fadeInUp);
    const open = () => {
        visible?setTimeout(()=>{
            setVisible(!visible);
        },1000): setVisible(!visible);
        
        visible?animateFn(fadeOutDown):animateFn(fadeInUp)
       
    }

    return (
        <div className={style['play']}  style={{background:`url('http://p3.music.126.net/71YQw1K88LS06iMjLRY5CA==/18610333812708195.jpg') center`}}>
            <div className='filter'>
            <div className={["Single ", visible ? 'Single-show' : ''].join('')}>

{
    visible&&
    <Header  css={keyframes`${animate}`}>
        <Single></Single>
    </Header>
}
</div>


<div className='container flex'>
<div className='play-left'>
<img src='http://p3.music.126.net/71YQw1K88LS06iMjLRY5CA==/18610333812708195.jpg' alt=''></img>
<div className='play-title'>
    <h1>克林</h1>
    <div>
        <span>棱镜</span>
        <span>偶然黄昏见</span>
        <button>320K</button>
    </div>
</div>
</div>
<div className='play-center'>
<div className='play-top flex'>
    <button>
        <i className='iconfont icon-liebiao1'></i>
    </button>
    <button>
        <i className='iconfont icon-shangyishoushangyige'></i>
    </button>
    <button className='play-btn'>
        <i className='iconfont icon-24gl-play'></i>
    </button>
    <button>
        <i className='iconfont icon-xiayigexiayishou'></i>
    </button>
    <button>
        <i className='iconfont icon-xihuan'></i>
    </button>
</div>
<div className='play-bottom flex'>
    <span>00:00:00</span>
    <Slider showBoundary={true}></Slider>
    <span>00:05:02</span>
</div>
</div>
<div className='play-right'>
<div>
    <button>
        <span>词</span>
    </button>
    <button>
        <i className='iconfont icon-yinliang'></i>
    </button>
    <button>
        <i className='iconfont icon-24gf-playlist4'></i>
    </button>
    <button onClick={open}>
        <i className='iconfont icon-shangjiantou'></i>
    </button>
</div>
</div>
</div>
            </div>
     

        </div>
    )
}