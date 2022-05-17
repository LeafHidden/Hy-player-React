import React, { useEffect ,useState} from 'react'
import style from './style/index.module.scss'
import ScrollAnimation from 'react-animate-on-scroll/node_modules/react-animate-on-scroll'



export const ListSongs = (props) => {

    const [url, urlFn] = useState('')
    const [currindex,currindexFn]=useState(null)
    useEffect(() => {
        if(props.data.list[0]){
          urlFn(props.data.list[0].al.picUrl)
        }
      },[props]);

    const songDetail=(val,index)=>{
        currindexFn(index)
        window.$http.getSongUrl({id:val.privilege.id}).then(res=>{

            window.PubSub.publish("songDetail",{song:res.data.data[0],avatar:val})
        })
    }

    return (
        <div className={[style['listSongs'],'style_listSongs__irXcU'].join(' ')}>
            <div>
                <div className='header'  style={{background:`url(${url}) center`}}>
     

              
                    <div className='filter-back'>
                    <img src={url} alt=''></img>
                    <div className='header-title'>
                        <h1>{props.data.title}</h1>
                        <span>创建者：网易云音乐</span>
                        <div className='btn'>
                            <button>播放全部</button>
                            <button>收藏</button>
                            <button>下载全部</button> 
                            <button>评论</button>
                            <button>分享</button>
                        </div>
                        <span>根据你的口味生成，每天6:00更新</span>
                    </div>

                    </div>
                </div>
                <div className='container'>
                    <div className='Songs-list'>
                        <div className='list'>

                            {
                                props.data.list.map((item,index) => {
                                    return <ScrollAnimation 
                                    animateOnce={true} 
                                    duration={0.6} 
                                    animateIn='fadeInUp'  
                                    offset={50}
                                    key={item.id} 
                                    scrollableParentSelector=".style_listSongs__irXcU"
                                    >
                                        <div className={['list-item flex',currindex===index?'list-item-foucs':''].join(' ')}  onClick={()=>{songDetail(item,index)}}>
                                            <div className='item-left '>
                                                <img src={item.al.picUrl} alt='' />

                                                <div>
                                                    <h1>{item.name}</h1>
                                                    <p>
                                                        <span>{item.ar[0].name}</span>
                                                        <span>{item.al.name}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='item-right'>
                                                <button>
                                                    <i className='iconfont icon-gengduo'></i>
                                                </button>

                                            </div>

                                        </div>
                                    </ScrollAnimation>



                                })
                            }


                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}