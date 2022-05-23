/* eslint-disable no-undef */
import React from 'react'
import style from './style/index.module.scss'


import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
// import { useNavigate } from 'react-router-dom'
import { Single } from '../Single/index'
import { keyframes } from 'styled-components';
import { fadeOutDown, fadeInUp } from 'react-animations';
import { Header } from './child'




function debounce (fn, ms) {
    let timeoutId
    return function () {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            fn.apply(this, arguments)
        }, ms)
    }
}
function throttle(fn, ms) {
	let timerId // 创建一个标记用来存放定时器的id
	return function () {
		// 没有定时器等待执行，则表示可以创建新的定时器来执行函数
		if (!timerId) {
			timerId = setTimeout(() => {
				// 定时器id清空，表示可以执行下一次调用了
				timerId = null
				fn.apply(this, arguments)
			}, ms)
		}
	}
}

let arrTime=[]
export default class Play extends React.Component {
    // let navigate = useNavigate()
    constructor() {
        super();
        this.state = {
            visible: false,
            animate: fadeInUp,
            playState: false,
            lyric: [],
            avatar: {},
            valueSlider: 10,
            startTime: '00:00',
            // 当前歌词
            currentLyc:'',
            // 
            // 当前audio播放时段
            currentTime: '',
            time: null,
            leftValue: 0,
            songData: {
                url: '',
                avatar: '',
                endTime: '00:00',
                layricId: '',

            },
        }
        this.Single=React.createRef()
        this.audio = null
        this.setAudio = element => {
            this.audio = element;
        }
        this.sliderOnchange = debounce(this.sliderOnchange, 3000)
    }

    
    // 格式化歌词的时间
     formatLyricTime = (time) => {
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

    // 格式化歌词
        async formatLyric(text){
        let arr = text.split('\n')
        const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/
        const lyricData=[]
        return new Promise((resolve, reject)=>{
            arr.forEach(item => {
                if (item === '') return
                const obj = {}
                const time = item.match(regTime)
                // 获取歌词
                obj.lyric = item.split(']')[1].trim() === '' ? '' : item.split(']')[1].trim()
                // 转换时间
                obj.time = time ? this.formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0
                obj.key = Math.random().toString().slice(-6)
                if (obj.lyric !== '') {
                    lyricData.push(obj)
                }
            })
            resolve(lyricData)
        })
    }


    // 打开播放页面
    open = () => {
        // 关闭
        if (this.state.visible) {
            this.setState({ animate: fadeOutDown })
            setTimeout(() => {
                this.setState(state => ({ visible: !state.visible }))
            }, 1000)
        } else {
            // 打开
            window.$http.getLyric({
                id: this.state.songData.layricId,
            }).then(async res => {
               let data=await this.formatLyric(res.data.lrc.lyric)
                this.setState(state => ({
                    visible: !state.visible,
                    animate: fadeInUp,
                    lyric: data
                }))
              
            })
          
        }
    }

    // 转换网易云歌词时间格式
    formatDt = (time) => {
        let dt = time / 1000;
        let m = parseInt(dt / 60)
        let s = parseInt(dt % 60)
        // eslint-disable-next-line no-unused-expressions
        m >= 10 ? m : (m = "0" + m)
        // eslint-disable-next-line no-unused-expressions
        s >= 10 ? s : (s = "0" + s)
        return m + ":" + s;
    }

    // 滑块开始
    playTime = () => {
        this.time = setInterval(() => {
            if (this.state.leftValue < this.state.valueSlider) {
                let songTime = moment.duration(this.audio.currentTime, 'seconds')
                let minutes = songTime.minutes()
                let seconds = songTime.seconds()
                this.setState({
                    startTime: moment({ m: minutes, s: seconds }).format('mm:ss'),
                    leftValue: this.state.leftValue + 1
                });
            } else {
                  // 关闭定时器
                this.setState({
                    playState: true,

                })
                this.play()
            }

        }, 1000)
    }
    // 关闭滑块
    endTime = () => {
        clearInterval(this.time)
        this.setState({
            startTime: '00:00',
            leftValue: 0
        })
    }

    // 播放
    play = (val) => {
        try {
            if (this.state.playState) {
                // 暂停
                this.audio.pause()
                clearInterval(this.time)
                this.time = null
                this.setState({
                    playState: false
                })
            } else {
                // 判断当前歌曲是否已经播放完毕
                if(this.state.leftValue>this.state.valueSlider){
                    this.setState({
                        startTime: '00:00',
                        leftValue: 0
                    })
                }
                this.audio.play()
                // 开启滑块
                this.playTime()
                this.setState({
                    playState: true
                })
      
            }

        } catch (e) {
            console.log(e);
        }
    }
     // 订阅点击歌曲事件
    componentDidMount () {

        window.PubSub.subscribe("songDetail", (msg, data) => {

            this.audio.addEventListener('canplay', () => {
                this.setState({
                    valueSlider: this.audio.duration
                })
            })
            this.endTime()
            let songData = Object.assign({}, this.state.songData, {
                url: data.song.url,
                avatar: data.avatar,
                layricId: data.song.id,
                endTime: this.formatDt(data.avatar.dt),
            })
            this.setState({
                songData: songData,
                playState: false,
                avatar: data.avatar,
                valueSlider: data.avatar.dt
            })
            this.play()
        })
    }
    // 滑块change事件
    sliderOnchange = (val) => {
        this.audio.currentTime = val
        this.setState({
            leftValue: val
        });
    }
    // 转换audio时间格式
    format=(time)=>{
        let songTime = moment.duration(time, 'seconds')
        let minutes = songTime.minutes()
        let seconds = songTime.seconds()
        return moment({ m: minutes, s: seconds }).format('mm:ss')
    }
  
    logFn=(val)=>{
        if(arrTime.indexOf(val)===-1){
            arrTime.push(val)
            if(val>6){
                this.Single.current.ref.scrollTo(0,(val-5)*-50, 300, undefined, {})
            }
            
            this.setState((state=>({currentLyc:val})))

        }
     
      
 
    }

    timeUpdate=()=>{  
    let currentTime = this.audio.currentTime // 事件转换
    let {  lyric } = this.state

    for (let i=0; i < lyric.length; i++) {
      if (lyric[i + 1] && currentTime < lyric[i + 1]['time'] && currentTime > lyric[i]['time']) {
        this.logFn(i)
    


      }
    }

    }
    // 歌词
    layric = () => {

    }


    render () {
        let avatar = this.state.songData.avatar
        return (
            <div className={style['play']} style={{ background: `url(${'http://p3.music.126.net/71YQw1K88LS06iMjLRY5CA==/18610333812708195.jpg'}) center` }}>
                <div className='filter'>
                    <div className={["SinglePlay ", this.state.visible ? 'Single-show' : ''].join('')}>

                        {
                            this.state.visible &&
                            <Header css={keyframes`${this.state.animate}`}>
                                <Single 
                                ref={this.Single} 
                                time={1000} 
                                lyric={this.state.lyric} 
                                avatar={this.state.avatar}
                                currindex={this.state.currentLyc}
                                ></Single>
                            </Header>
                        }
                    </div>
                    <div className='container flex'>
                        <div className='play-left'>
                            {
                                avatar ? <div>
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
                                    <i className={['iconfont', this.state.playState ? 'icon-24gl-pause' : 'icon-24gl-play'].join(' ')}></i>
                                </button>
                                <button>
                                    <i className='iconfont icon-xiayigexiayishou'></i>
                                </button>
                                <button>
                                    <i className='iconfont icon-xihuan'></i>
                                </button>
                            </div>
                            <div className='play-bottom flex'>
                                <span>{this.state.startTime}</span>

                                <Slider
                                    min={0} max={this.state.valueSlider}
                                    step={1}
                                    value={this.state.leftValue}
                                    onChange={this.sliderOnchange}>

                                </Slider>
                                <span>{this.state.songData.endTime}</span>
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
                    onTimeUpdate={(e) => { this.timeUpdate(e) }}
                >
                </audio>
            </div>
        )
    }

}