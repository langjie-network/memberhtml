const env="dev";


const devConfig={
    debug:false,
    env:'dev',
    baseUrl: api=> "https://actiondev.langjie.com"+api,
    plcmcontrollerHost: api=> "https://plcmcontrollerdev.langjie.com"+api,
    wxLoginAppid: 'wxce9ef487ddc74aa5',
    wxCallBackUrl:'https://actiondev.langjie.com',
    trial_version_dickCode:"D00001C"
}

const preConfig={
    debug:false,
    env:'pre',
    baseUrl: api=> "https://actiondev.langjie.com"+api,
    plcmcontrollerHost: api=> "https://plcmcontrollerdev.langjie.com"+api,
    wxLoginAppid: 'wx1dbbbe221c943cd9',
    wxCallBackUrl:'https://actiondev.langjie.com'
}
const prodConfig={
    debug:false,
    baseUrl: api=>
    {
        if(M.isWeiXin){
            return  "https://wx.langjie.com"+api;
        }else {
            return  "https://www.langjie.com"+api;
        }
    },
    env:'prod',
    plcmcontrollerHost: api=> "https://plcmcontroller.langjie.com"+api,
    wxLoginAppid: 'wx1dbbbe221c943cd9',
    wxCallBackUrl:'https://www.langjie.com',
    trial_version_dickCode:"D00001C"
}

const commonConFig={

}
let envConfig;
if(env=="dev"){
    envConfig=devConfig;
}else if(env=="pre"){
    envConfig=preConfig;
}else if(env=="prod"){
    envConfig=prodConfig;
}


M.config=Object.assign(commonConFig,envConfig);