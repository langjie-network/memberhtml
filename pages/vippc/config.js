const env="prod";


const devConfig={
    baseUrl: api=> "https://actiondev.langjie.com"+api,
    wxLoginAppid: 'wxce9ef487ddc74aa5',
    wxCallBackUrl:'https://actiondev.langjie.com'
}

const preConfig={
    baseUrl: api=> "https://actiondev.langjie.com"+api,
    wxLoginAppid: 'wx1dbbbe221c943cd9',
    wxCallBackUrl:'https://actiondev.langjie.com'
}
const prodConfig={
    baseUrl: api=>
    {
        if(M.isWeiXin){
            return  "https://wx.langjie.com"+api;
        }else {
            return  "https://www.langjie.com"+api;
        }
    },
    wxLoginAppid: 'wx1dbbbe221c943cd9',
    wxCallBackUrl:'https://www.langjie.com'
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