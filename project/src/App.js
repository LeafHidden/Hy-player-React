import React from 'react';
import Slidebar from './Sidebar/index'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Page/home/index'
import Personal from './Personal/index';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './animations.css'
import RecommendedDaily from './Page/recommendedDaily/index'
import Play from './Play/index'
// .fade-appear    // 初次进入前的状态, 注意在初次进入时，appear和 enter 相关的类名会在第一次动画时同时生效
// .fade-appear-active    // 初次进入中的状态
// .fade-appear-done    // 初次进入后的状态

// .fade-enter            // 开始过渡时生效,元素被插入前
// .fade-enter-active     // 开始过渡时的状态
// .fade-enter-done       // 过渡结束后的状态

// .fade-exit             // 离开过渡的开始状态,元素被插入前
// .fade-exit-active      // 离开过渡生效时的状态
// .fade-exit-done        // 离开过渡的结束状态
 

function App (props) {
    let location = useLocation()
    return (
        <div className="Layout">
            <Slidebar></Slidebar>
            <div className='Background-board'>
                <TransitionGroup>
                    <CSSTransition
                        key={location.pathname}
                        classNames={{
                            enterActive:'pt-page-rotateRoomLeftIn',
                            exitActive:'pt-page-rotateRoomLeftOut'
                           }}
                        timeout={600}
                    >
                        <Routes location={location}>
                            <Route path='/home' element={<Home></Home>} ></Route>
                            <Route path='/personal' element={<Personal></Personal>}></Route>
                            <Route path="/recommendedDaily" element={<RecommendedDaily></RecommendedDaily>}></Route>
                        </Routes>
                    </CSSTransition>
                </TransitionGroup>
                
            </div>
           
                           <Play></Play>
      
        </div>
    )

}
export default App;

