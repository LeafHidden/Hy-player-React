// import React from 'react'
// import { TransitionGroup, CSSTransition } from 'react-transition-group'
// import { Route, Routes } from 'react-router-dom'
// import './AnimatedSwitch.scss'

// const AnimatedSwitch = props => {
//     const { children } = props
//     return (
//         <Routes
//             render={({ location }) => (
//                 <TransitionGroup>
//                     <CSSTransition
//                         key={location.key}
//                         classNames={props.type || 'fade'} 
//                         timeout={props.duration || 300}
//                     >
//                         {()=>{console.log(location);}}
//                         <Route element={location}>{children}</Route>
//                     </CSSTransition>
//                 </TransitionGroup>
//             )}
//         />
//     )
// }

// export default AnimatedSwitch
