
const env="prod";
const commonConFig={
    baseUrl: api=> ""+api,
}

let devConfig={
    baseUrlCrmHelp : (url) => 'https://crmhelp.langjie.com'+url
};
let prodConfig={
    baseUrlCrmHelp : (url) => 'https://crmhelp.langjie.com'+url
};


let envConfig={};
if(env=="dev"){
    envConfig=devConfig;
}else if(env=="pre"){
    envConfig=preConfig;
}else if(env=="prod"){
    envConfig=prodConfig;
}

M.config=Object.assign(commonConFig,envConfig);

