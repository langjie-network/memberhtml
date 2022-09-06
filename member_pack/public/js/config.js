const env="prod";


const devConfig={
    baseUrl: api=> "https://actiondev.langjie.com"+api,
    crmHelpHost(api){
        return "https://crmhelpdev.langjie.com"+api
    },
}

const preConfig={
    baseUrl: api=> "https://actiondev.langjie.com"+api,
    crmHelpHost(api){
        return "https://crmhelpdev.langjie.com"+api
    },
}
const prodConfig={
    baseUrl: api=> "https://wx.langjie.com"+api,
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