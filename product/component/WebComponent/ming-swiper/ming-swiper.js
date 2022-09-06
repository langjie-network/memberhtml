
const {WebComponent} =MingRouter;

class MingSwiper extends WebComponent {

    constructor(props) {
        super(props);
    }
    

    async componentDidMount() {
         let that=this;
        (function bannerToggle() {
            var banner = that.shadowRoot.querySelector('.jd-banner')
            var ul = banner.querySelector('.jd-banner ul'); //获取ul
            var olLis = that.shadowRoot.querySelectorAll('.jd-banner-foot ol li')//获取小圆点
            var previousBtn = that.shadowRoot.querySelector('.previousBtn')
            var nextBtn = that.shadowRoot.querySelector('.nextBtn')
            var length = ul.children.length
            // 前面有张假图片，因此index=1
            var index = 0
            var width = banner.offsetWidth
            nextBtn.onclick = function () {
                nextImg()
            }
            previousBtn.onclick = function () {
                previousImg()
            }
            /* 切换到下一张图 */
            function nextImg() {
                index++;
                if(index>length-1){
                    index=0;
                }
               // console.log("nextImg",index)
                addAnimation()
                moveImg(-index * width)
            }
            /* 切换到上一张图 */
            function previousImg() {
                index--;
                if(index<0){
                    index=length-1;
                }
                console.log("previousImg",index)
                addAnimation()
                moveImg(-index * width)
            }
            /*transitionend事件：过渡完成后触发 */
            ul.addEventListener('transitionend', function () {
                // 往左跑的判断, 当抵达最后一张假图时, 需要瞬间跳到第一张真图的位置
                if (index > length-1) {
                    index = 0
                    removeAnimation()
                    moveImg(-index * width)
                }
                // 往右跑的判断, 当抵达第一张假图的时候, 应该瞬间跳转到最后一张真图(图8的位置)
                if (index < 0) {
                    index = length - 1
                    removeAnimation()
                    moveImg(-index * width)
                }
                location()
            })

            /**封装的一些小方法 */
            /*排他思维,添加小圆点*/
            function location() {
               // console.log("AA",index)
                olLis.forEach(function (item, index) {
                    item.classList.remove('current')
                })
                olLis[index].classList.add('current')
            }
            /*图片移动 */
            function moveImg(x) {
                //console.log(x);
                ul.style.transform = 'translateX(' + x + 'px)'
            }
            /*移除动画 */
            function removeAnimation() {
                ul.style.transition = 'none'//移除过渡
            }
            /*添加动画 */
            function addAnimation() {
                ul.style.transition = 'all 0.9s'//添加过渡
            }
            /*自动播放 */
            var timerId = null
            function autoPlay() {
                clearInterval(timerId);
                timerId = setInterval(nextImg, 3000)
            }
            autoPlay()
            /*鼠标移入停止播放 */
            banner.onmouseenter = function () {
               // clearInterval(timerId)
            }
            /*鼠标移出开始播放 */
            banner.onmouseleave = function () {
                autoPlay()
            }


            // 如果屏幕大小变换了, width 需要动态更新
            // resize: 屏幕大小改变时触发
            window.addEventListener("resize", function () {
                // 重新获取 li 的宽度即可
                width = banner.offsetWidth;
            })
        })()

    }

    show(){

    }

    hide(){


    }

   async render() {
        let imgList=await MIO.mingSwiPerGetImgList();
        this.imgList=imgList;
        return `
    <style>
        .jd-banner {
            width: 90vw;
            position: relative;
            overflow: hidden;
        }
        .jd-banner .previousBtn:hover {
            border: 1px solid #fff;
            background-color: transparent;
        }
  
        .jd-banner .nextBtn:hover {
            border: 1px solid #fff;
            background-color: transparent;
        }
        .jd-banner ul {
            width: 1000%;   
        }
        .jd-banner ul li {
            width: 90vw;
            left: 0;
            float: left;
        }
        .jd-banner ul div {
            width: 90vw;
  
        }
        
        .jd-banner ul li div img {
             height: 35vw;
             object-fit: cover;
             display: block;
             margin:0 auto;
        }
        .jd-banner-foot{
            width: 60%;
            transform: translateY(-8vw);
            height: 7vw;
            margin: 0 auto;
        }
        .jd-banner-foot ol {
           display: block;
            bottom: 0px;
            height: 4px;
            margin-left: 11vw;
        }
        .jd-banner-foot ol li {
            float: left;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            border: 1px solid rgba(123,128,128,0.4);
            margin: 0 4px;
        }
        .jd-banner-foot ol .current {
            background-color:rgba(123,128,128,0.4);
        }
        li{
            list-style-type:none;
        }
       ul{
          margin:0;
          padding:0
        } 
    </style>


    
    <div style="height:35vw">
          <div class="jd-banner">
            <ul class="clearfix">
                     ${imgList.map(u=>{
                        return ` <li><a href="javascript:void(0)">
                                                <div>
                                                        <img src="${u}">
                                                </div>
                                  </a>
 
                                </li>`
                    }).join("")}
           
           </ul>
            <div class="previousBtn">
            </div>
            <div class="nextBtn">
            </div>
        </div>
              
            <div class="jd-banner-foot">
                <ol>
                    <li class="current"></li>
                    <li></li>
                    <li></li>
                </ol>
            </div>  
 
</div> 



`;
    }
}

export default MingSwiper;
