import React, { useState, useRef } from 'react'
import style from './style/index.module.scss'
import { Slider } from '@douyinfe/semi-ui';
// import { useNavigate } from 'react-router-dom'
import { Single } from '../Single/index'
import { keyframes } from 'styled-components';
import { fadeOutDown, fadeInUp } from 'react-animations';
import { Header } from './child'






export default class Play extends React.Component {

    // let navigate = useNavigate()
    constructor() {
        super();
        this.state = {
            visible: false,
            animate: fadeInUp,
            playState: false,
            songData: {
                url: '',
                avatar: ''
            },

        }
        this.audio = null
        this.setAudio = element => {
            this.audio = element;

        }
    }

    open = () => {
        this.state.visible ? setTimeout(() => {
            this.setState(state => ({ visible: !state.visible }))
        }, 1000) : this.setState(state => ({ visible: !state.visible }))
        this.state.visible ? this.setState({ animate: fadeOutDown }) : this.setState({ animate: fadeInUp })
    }
    componentDidMount () {
        // 订阅点击歌曲事件
        window.PubSub.subscribe("songDetail", (msg, data) => {
            let songData = Object.assign({}, this.state.songData, { url: data.song.url, avatar: data.avatar })
            console.log(data);
            this.setState({
                songData: songData,

            })

        })
    }




    // 歌词
    layric = () => {

    }

    // 播放
    play = () => {
        if (this.state.playState) {
            this.audio.pause()
            this.setState({
                playState: false
            })
        } else {
            this.audio.play()
            this.setState({
                playState: true
            })
        }

    }
    render () {
        let avatar = this.state.songData.avatar

        return (
            <div className={style['play']} style={{ background: `url('http://p3.music.126.net/71YQw1K88LS06iMjLRY5CA==/18610333812708195.jpg') center` }}>
                <div className='filter'>
                    <div className={["SinglePlay ", this.state.visible ? 'Single-show' : ''].join('')}>

                        {
                            this.state.visible &&
                            <Header css={keyframes`${this.state.animate}`}>
                                <Single time={1000}></Single>
                            </Header>
                        }
                    </div>
                    <div className='container flex'>
                        <div className='play-left'>
                            {
                                avatar ?<div>
                                    <img src={avatar.al.picUrl} alt=''></img>
                                <div className='play-title'>
                                    <h1>{avatar.name}</h1>
                                    <div>
                                        <span>{avatar.ar[0].name}</span>
                                        <span>{avatar.al.name}</span>
                                       
                                    </div>
                                </div>
                                </div> : <div></div>
                            }

                        </div>
                        <div className='play-center'>
                            <div className='play-top flex'>
                                <button>
                                    <i className='iconfont icon-liebiao1'></i>
                                </button>
                                <button>
                                    <i className='iconfont icon-shangyishoushangyige'></i>
                                </button>
                                <button className='play-btn' onClick={this.play}>
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

                                <button >
                                    <i className='iconfont icon-24gf-playlist4'></i>
                                </button>
                                <button onClick={this.open}>
                                    <i className='iconfont icon-shangjiantou'></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <audio
                    ref={this.setAudio}
                    src={this.state.songData.url}
                >
                </audio>
            </div>
        )
    }

}