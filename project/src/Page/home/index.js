import React, { useEffect } from 'react';
import style from './style/index.module.scss'
import PersonalizedStyle from './style/PersonalizedStyle.module.scss'
import NewIcon from '../../Icons/NewIcon.svg'
import BScroll from 'better-scroll'
const Personalized = (props) => {


    useEffect(() => {
        const wrapper = document.querySelector(`.${props.class}`)
        new BScroll(wrapper, {
            scrollX: true,  //开启横向滚动
            click: true,  // better-scroll 默认会阻止浏览器的原生 click 事件
            scrollY: false, //关闭竖向滚动
            mouseWheel: true,
            scrollbar: {
                fade: false,
                interactive: false // 1.8.0 新增
            },
        })
    }, [props])
    return (
        <div className={PersonalizedStyle['Personalized']}>
            <div className='Personalized-con'>
                <div className='title'>
                    {props.title}
                </div>
                <div className='Personalized-wraper'>
                    <div className={['Personalized-list', props.class].join(' ')}>
                        <div className='list'>
                            {props.data.map(item => {
                                return <div className='item' key={item.id}>
                                    <div className='item-img' style={{ background: `url(${item[props.Ikey]})` }}></div>
                                    <div className='item-txt'>
                                        <p>{item.name}</p>
                                    </div>
                                </div>
                            })}

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}



class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            verse: '',
            avatar: '',
            recommendList: [],
            toplist: []

        }
    }
    // 修改值
    setAvatar = () => {
        this.setState({
            avatar: window.store.get('avatar')
        })
    }

    componentDidMount () {
        // 获取推荐诗句
        window.$http.getverse().then(res => {
            this.setState({
                verse: res.data.content
            })
        })
        // 获取推荐歌单
        window.$http.getPersonalized({
            limit: 30
        }).then(res => {
            this.setState({
                recommendList: res.data.result
            })
        })
        // 获取榜单
        window.$http.getToplist().then(res => {
            this.setState({
                toplist: res.data.list
            })
        })

        // 判断是存在该值
        if (window.store.get('avatar')) {
            this.setAvatar()
        }
        // 订阅登录事件
        window.PubSub.subscribe("publish_one", (msg, data) => {
            this.setAvatar()
        })
    }
    componentWillUnmount () {
        window.PubSub.unsubscribe()
    }
    render () {
        return (
            <div>
                <div className={style['container']}>
                    <div className='header'>
                        <h1>主页</h1>
                        <div className='verseTitle'>
                            <div className='verseTitle-left'>
                                <h1>Hi~{((this.state.avatar && this.state.avatar.nickname) || false) || this.state.avatar}</h1>
                                <span> {this.state.verse}</span>
                            </div>
                            <div className='verseTitle-right'>
                                <button>
                                    <i className='iconfont icon-jinrituijian'></i>
                                    <span>每日推荐</span>
                                </button>
                                <button>
                                    <i className='iconfont icon-sirenfm-copy'></i>
                                    <span>私人FM</span>
                                </button>
                                <button>
                                    <i className='iconfont icon-xihuan'></i>
                                    <span>喜欢音乐</span>
                                </button>
                                {/* 展示logo */}
                                <img src={NewIcon} className="App-logo" alt="logo" />
                            </div>


                        </div>
                    </div>
                    {
                        !this.state.avatar.nickname ?
                            <div className='login-title'>
                                请先登录以获得个性化推荐功能哦
                            </div> : <div>
                                <Personalized data={this.state.recommendList} Ikey='picUrl' class="recommend" title='推荐歌单'></Personalized>
                                <Personalized data={this.state.toplist} Ikey='coverImgUrl' class="rankings" title='榜单' ></Personalized>
                            </div>

                    }
                </div>

            </div>
        )
    }


}



export default Home;