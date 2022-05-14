import React from 'react'
import {ListSongs} from '../../component/listSongs'


export default class recommendedDaily extends React.Component{
    constructor(){
        super()
        this.state={
            data:{
                list:[],
                key:'',
                title:'每日歌曲推荐'
            }
        }
    }

    componentDidMount(){
        window.$http.getRecommend().then(res=>{
            let data=Object.assign({},this.state.data,{list:res.data.data.dailySongs})
            this.setState({
                data:data
            })
            
        })
    }
    render(){
        return(
          
             

                          <ListSongs 
            data={this.state.data}

            ></ListSongs>  
     

        )   
    }
}