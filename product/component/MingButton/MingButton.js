
importStyle("MingButton","/memberhtml/product/component/MingButton/MingButton.css");


const template=`
    <button @click="a()" style="margin-left: 50vw;margin-top: 50vw;z-index: 5;position: absolute" class='btn-3d'>
        <img style="width: 10vw" src="https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/shoukongqi/上升.png">
    </button>
`;



export default {
    template,
    name: 'MingButton',
    props: {},
    data() {

    },
    methods:{
      a(){
          navigator.vibrate(100)
      }
    },
    mounted() {



    },

}