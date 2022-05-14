
import style from './index.module.scss'
import { Nav } from '@douyinfe/semi-ui';
import React, { useState,useEffect } from 'react';
import Login from '../Login/index'
import { useNavigate } from 'react-router-dom'



const NavApp = () => {
    const [isCollapsed, isCollapsedFn] = useState(true)
    const [logingShow, logingShowFn] = useState(false)
    const [avatarVisible,avatarVisibleFn]=useState('')
    let navigate = useNavigate()

    // 侧边栏
    const close = () => {
        isCollapsedFn(!isCollapsed)
    }

    // 登录
    const openLogin = (val) => {
        logingShowFn(!logingShow)
        if(val){
            avatarVisibleFn(window.store.get('avatar'))
        }
    }
    useEffect(() => {
        if(window.store.get('avatar')){
            avatarVisibleFn(window.store.get('avatar'))
        }
      },[]);
    // 获取本地存储值

    



    // 个人中心
    const openPersonal = () => {
        navigate("/personal")
    }
    // 主页
    const home = () => {
        navigate("/home")
    }
    const recommendedDaily=()=>{
        navigate("/recommendedDaily")
    }
    // 根据key调用方法
    const switchClick = (val) => {
        try {
            switch (val.itemKey) {
                case 'close':
                    close();
                    break;
                case 'openLogin':
                    openLogin()
                    break;
                case 'openPersonal':
                    openPersonal();
                    break;
                case 'home':
                    home()
                    break;
                    case 'recommendedDaily':
                        recommendedDaily()
                     break;
                default: break;
            }
        } catch (e) {
            console.log(e);
        }
    }




    return (
        <div>
            <Nav
                isCollapsed={isCollapsed}
                onClick={data => switchClick(data)}
            >
                <Nav.Item itemKey={'close'} text={'关闭侧边栏'} icon={<i className='iconfont icon-liebiao2'></i>} />
                <Nav.Item itemKey={'search'} text={'寻觅音乐'} icon={<i className='iconfont icon-sousuo'></i>} />
                <Nav.Sub itemKey={'found'} text="发现音乐" icon={<i className='iconfont icon-wangluo'></i>}>
                    <Nav.Item itemKey={'home'} text={'主页'} icon={<i className='iconfont icon-zhuye'></i>} />
                    <Nav.Item itemKey={'recommendedDaily'} text={'每日推荐'} icon={<i className='iconfont icon-jinrituijian'></i>} />
                    <Nav.Item itemKey={'fm'} text={'私人FM'} icon={<i className='iconfont icon-xintiaoxindong'></i>} />
                </Nav.Sub>
                <Nav.Item itemKey={'offline'} text={'离线音乐'} icon={<i className='iconfont icon-yunduanxiazai'></i>} />
                <Nav.Item itemKey={'history'} text={'播放历史'} icon={<i className='iconfont icon-lishi'></i>} />
                <Nav.Item itemKey={'collection'} text={'我的收藏'} icon={<i className='iconfont icon-shoucang'></i>} />
                <div className='Individual'>
                    <Nav.Item itemKey={'Playlist'} text={'创建歌单'} icon={<i className='iconfont icon-tianjia-'></i>} />
                    <Nav.Item itemKey={'love'} text={'我喜欢的音乐'} icon={<i className='iconfont icon-xihuan'></i>} />
                    <Nav.Sub itemKey={'create'} text="我创建的歌单" icon={<i className='iconfont icon-liebiao'></i>}>
                        <Nav.Item itemKey={'createOne'} text={'第一个'} />
                    </Nav.Sub>
                    <Nav.Sub itemKey={'collection'} text="我收藏的歌单" icon={<i className='iconfont icon-liebiao'></i>}>
                        <Nav.Item itemKey={'collectionOne'} text={'收藏'} />
                    </Nav.Sub>
                </div>
                <div className='login'>
                    {
                        !avatarVisible?(<Nav.Item itemKey={'openLogin'} text={'登录'} icon={<i className='iconfont icon-denglu'></i>} />):
                        ( <Nav.Item itemKey={'openPersonal'}text={avatarVisible.nickname} icon={<img className='avatar' src={avatarVisible.avatarUrl} alt=''></img>} />)
                    }
                    
                   
                    <Nav.Item itemKey={'setup'} text={'设置'} icon={<i className='iconfont icon-shezhi-xianxing'></i>} />
                </div>
            </Nav>
            {/* 登录 */}
            {(logingShow && !localStorage.data) ? <Login close={openLogin}></Login> : null}
        </div>

    );

}






const App = () => {

    return (
        <div className={style['Sidebar']}>
            <NavApp></NavApp>
        </div>
    )
}

export default App;