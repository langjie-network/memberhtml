import {  getOssStsToken,
    uploadToTempOss,
    callRecognizeBankCard} from "./script.js"

class AliVisionPlugin {


    constructor() {

    }
    install(app,args){

    }
    async RecognizeBusinessCard(file){
       return   new Promise((resolve, reject)=>{
            getOssStsToken((ossStsToken) => {
                // 上传获取url
                uploadToTempOss(ossStsToken, file, function(imageUrl) {
                    // 拿到url调用算法
                    callRecognizeBankCard(imageUrl, (handleResult)=>{
                        resolve(handleResult)
                    });
                });
            });
        })
    }

}

export default AliVisionPlugin;