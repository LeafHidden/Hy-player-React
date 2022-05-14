import  React  from 'react';
import {  Modal,Form, } from '@douyinfe/semi-ui';
import   './button.scss'
import style from './index.module.scss'
// import  MD5  from"react-native-md5";
export default class Login extends  React.Component{
    constructor(props){
        super(props)
        this.state={
            currindex:0,
            codeKey:null,
            qrimg:'',
            visible:true,
        }
        this.getFormApi = this.getFormApi.bind(this);
    }
    // 账号
    user=(rule,value,message)=>{
        if(!value){
            return message('账号不能为空')
        }
        return true
    }
    // 密码验证
    password=(rule,value,message)=>{
        if(!value){
            return message('账号不能为空')
        }
        return true
    }

   async componentDidMount (){
      // 获取二维码
      let res =await window.$http.getCodeKey()
      this.setState({
          codeKey:res.data.data.unikey
      })

    }
    // 标签切换事件
   async  tagHandoff(index){
    if(index===1&&this.state.currindex!==1){
        let res=await window.$http.getCode({key:this.state.codeKey,qrimg:true})
        this.setState({
            qrimg:res.data.data.qrimg
        })
    }
        this.setState({
            currindex:index
        })
        
    }
    // 关闭登录弹框
    handleCancel=(val)=>{
        this.setState({
            visible:false
        })
        this.props.close(val)
    }
    getFormApi(formApi){this.formApi = formApi;  }
     submit = () => {

        window.store.set('avatar',{
          accountStatus: 0,
          authStatus: 0,
          authority: 0,
          avatarDetail: null,
          avatarImgId: 109951163989405340,
          avatarImgIdStr: "109951163989405338",
          avatarImgId_str: "109951163989405338",
          avatarUrl: "https://p4.music.126.net/M1gfQTHZSTfJR9pat77r6g==/109951163989405338.jpg",
          backgroundImgId: 109951164803704500,
          backgroundImgIdStr: "109951164803704490",
          backgroundUrl: "https://p3.music.126.net/v4H_LFqil4t7Iui65l4hEw==/109951164803704490.jpg",
          birthday: -2209017600000,
          city: 420100,
          defaultAvatar: false,
          description: "",
          detailDescription: "",
          djStatus: 0,
          eventCount: 1,
          expertTags: null,
          experts: {},
          followed: false,
          followeds: 5,
          follows: 9,
          gender: 1,
          mutual: false,
          nickname: "怪才空间",
          playlistBeSubscribedCount: 0,
          playlistCount: 9,
          province: 420000,
          remarkName: null,
          signature: "乾坤以有亲可久",
          userId: 321091919,
          userType: 0,
          vipType: 11
        }
        
        )
        this.handleCancel({
            accountStatus: 0,
            authStatus: 0,
            authority: 0,
            avatarDetail: null,
            avatarImgId: 109951163989405340,
            avatarImgIdStr: "109951163989405338",
            avatarImgId_str: "109951163989405338",
            avatarUrl: "https://p4.music.126.net/M1gfQTHZSTfJR9pat77r6g==/109951163989405338.jpg",
            backgroundImgId: 109951164803704500,
            backgroundImgIdStr: "109951164803704490",
            backgroundUrl: "https://p3.music.126.net/v4H_LFqil4t7Iui65l4hEw==/109951164803704490.jpg",
            birthday: -2209017600000,
            city: 420100,
            defaultAvatar: false,
            description: "",
            detailDescription: "",
            djStatus: 0,
            eventCount: 1,
            expertTags: null,
            experts: {},
            followed: false,
            followeds: 5,
            follows: 9,
            gender: 1,
            mutual: false,
            nickname: "怪才空间",
            playlistBeSubscribedCount: 0,
            playlistCount: 9,
            province: 420000,
            remarkName: null,
            signature: "乾坤以有亲可久",
            userId: 321091919,
            userType: 0,
            vipType: 11
        })
        window.PubSub.publish("publish_one","This is publish")
        // this.formApi
        // .validate()
        // .then(values=>{
        //     let data=values
        //     data.md5_password=MD5.hex_md5(data.md5_password)
        //     window.$http.getPhone(data).then(res=>{

        //      if(res.data.code===200){
  
        //       Toast.success({
        //         content: `登录成功`,
        //         duration: 2,
        //     })
   
        //      }else {
        //         Toast.error({
        //             content: `${res.data.message}`,
        //             duration: 2,
        //         })
        //      }
        //     })
        // })
        // .catch(errors=>{})
    };
    render(){

    

        // 账号
        const tab1=<div className='login' >
        <Form labelPosition='left'   getFormApi={this.getFormApi} >
        <Form.Input
                field="phone"
                label='账  号：'
                placeholder="手机/邮箱"
                trigger='blur'
                rules={this.user
                }
            />
         <Form.Input
                field="md5_password"
                label='密  码：'
                placeholder="密码"
                mode="password"
                trigger='blur'
                rules={this.password}
            />
        </Form>
     <div>
     <button className="blob-btn" onClick={this.submit}>
        登录
        <span className="blob-btn__inner">
        <span className="blob-btn__blobs">
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
        </span>
        </span>
    </button>
     </div>

      

        </div>  
        const tab2=<div className='code'>
            <div>
                <img src={this.state.qrimg} alt="图片加载失败"></img>
            </div>
        </div>
        return(
            <Modal 
            visible={this.state.visible}
            centered 
            footer={null}
            onCancel={this.handleCancel}
            >
             <div className={style['login-container']}>
                 <div className='login-header'>
                     {[{c:'user',n:'密码登录'},{c:'code',n:'二维码登录'}].map((item,index)=>{
                         return <div key={item.c} className={item.c} onClick={()=>{
                                this.tagHandoff(index)
                              }}>{item.n}</div>
                     })}
                     <i style={{left:this.state.currindex*215+25+'px'}}></i>
                 </div>
                 <div className='login-form'>
                     {
                         this.state.currindex?tab2:tab1
                     }  
                 </div>
        
            </div>
            </Modal>
       
        )
    }

}
