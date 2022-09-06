const env="prod";

const devConfig={
    env:'dev',
    baseUrl: api=> "https://actiondev.langjie.com"+api,
    plcmcontrollerHost: api=> "https://plcmcontrollerdev.langjie.com"+api,
    wxLoginAppid: 'wxce9ef487ddc74aa5',
    crmHelpHost(api){
        return "https://crmhelpdev.langjie.com"+api
    },
}

const preConfig={
    env:'pre',
    baseUrl: api=> "https://actiondev.langjie.com"+api,
    plcmcontrollerHost: api=> "https://plcmcontrollerdev.langjie.com"+api,
    wxLoginAppid: 'wx1dbbbe221c943cd9',
    crmHelpHost(api){
        return "https://crmhelpdev.langjie.com"+api
    },
}
const prodConfig={
    baseUrl: api=> "https://wx.langjie.com"+api,
    env:'prod',
    plcmcontrollerHost: api=> "https://plcmcontroller.langjie.com"+api,
    wxLoginAppid: 'wx1dbbbe221c943cd9',
    crmHelpHost(api){
        return "https://crmhelp.langjie.com"+api
    },
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