const template=`
     <div v-if="pclass=='rootFileListImg'"
      :class="pclass"
       style="
        background-image: url(https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/ruyunsuixing/img/file_type_imgs-v3.png);
        background-size: 100% 100%;
     ">
        <img :class="pclass" style="width: 70%; height:70%;margin-top: 4vw" :src="src">
    </div>
     <div v-else
         :class="pclass"
       style="
        width: 50vw;
        height: 50vw;
        background-image: url(https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/ruyunsuixing/img/file_type_imgs-v3.png);
        background-size: 100% 100%;
     ">
           <img  style=" width:70%; height:70%;margin-left: 4vw;margin-top: 10vw" :src="src">
    </div>
`;


export default {
    template,
    props: {
        pclass: String,
        src:String
    },
    name: 'MingDirImg',
    mounted(){
           console.log(this.src,"AAAAAAAAAAAAAA")
    },
}