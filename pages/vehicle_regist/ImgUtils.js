
/**
 * 图片工具类
 */
class ImgUtils {

    
    /**
     * base64转Blob
     * @param  {String} urlData
     * @return {Promise<Blob>}
     */
    static async base64ToBlob(urlData) {
        let arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
    }

    /**
     * @param {String} imgSrc
     * @param {{ width:Number,height:Number,quality:Number }} compress
     * @return {Promise<void>}
     */
    static async canvasToBase64(imgSrc, compress) {
        let img = new Image();
        img.src = imgSrc;
        return new Promise((resolve, reject) => {
            img.onload = function () {
                let that = this;
                //默认压缩后图片规格
                let quality = 1;
                let w = that.width;
                let h = that.height;
                let scale = w / h;
                //实际要求
                w = compress.width || w;
                h = compress.height || (w / scale);
                if (compress.quality && compress.quality > 0 && compress.quality <= 1) {
                    quality = compress.quality;
                }
                //生成canvas
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                // 创建属性节点
                let anw = document.createAttribute("width");
                anw.nodeValue = w;
                let anh = document.createAttribute("height");
                anh.nodeValue = h;
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh);
                ctx.drawImage(that, 0, 0, w, h);
                let base64 = canvas.toDataURL('image/jpeg', quality);
                resolve(base64);
            };
        })
    }

    /**
     * 文件压缩
     * @param {File} imgFile
     * @param {{ width:Number,height:Number,quality:Number}} compress
     * @return {Promise<void>}
     */
    static async zip(imgFile,compress){
        let ready=new FileReader();
        ready.readAsDataURL(imgFile);
        return new Promise((resolve, reject) => {
            ready.onload=async function(){
                let imgSrc=this.result;
                let base64= await ImgUtils.canvasToBase64(imgSrc,compress);
                let blob=await ImgUtils.base64ToBlob(base64);
                const outputFile = new File([blob], imgFile.name, {
                    type: blob.type,
                });
                resolve(outputFile);
            }
        })
    }


    static async imgInfo(imgFile){
        let ready=new FileReader();
        ready.readAsDataURL(imgFile);
        return new Promise((resolve, reject) => {
            ready.onload=async function(){
                var image  = new Image();
                image.src=this.result;
                image.addEventListener("load", function () {
                    resolve({
                        name:imgFile.name,
                        width:image.width,
                        height:image.height,
                        size:imgFile.size
                    })
                })
            }
        })
    }
}


