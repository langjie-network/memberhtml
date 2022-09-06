importStyle("router-page-tab", "./views/tab/tab.css");

const template=`<div class="weui-tab" id="tab">
    <div class="weui-navbar">
        <div class="weui-navbar__item">反馈</div>
        <div class="weui-navbar__item">表单</div>
        <div class="weui-navbar__item">上传</div>
        <div class="weui-navbar__item">其它</div>
    </div>
    <div class="weui-tab__panel">
        <div class="weui-tab__content">
            反馈页
            <div class="weui-slider-box">
                <div class="weui-slider" id="slider">
                    <div class="weui-slider__inner">
                        <div class="weui-slider__track"></div>
                        <div class="weui-slider__handler"></div>
                    </div>
                </div>
                <div class="weui-slider-box__value" id="sliderValue"></div>
            </div>

        </div>
        <div class="weui-tab__content">表单页
            <div id="form">
                <div class="weui-cells__title">性别</div>
                <div class="weui-cells weui-cells_radio"><label class="weui-cell weui-check__label" for="r1">
                    <div class="weui-cell__bd">男</div>
                    <div class="weui-cell__ft">
                        <input class="weui-check" id="r1" name="sex" required="" tips="请选择性别"
                                                      type="radio" value="male"> <span class="weui-icon-checked"></span></div>
                </label> <label class="weui-cell weui-check__label" for="r2">
                    <div class="weui-cell__bd">女</div>
                    <div class="weui-cell__ft"><input class="weui-check" id="r2" name="sex" type="radio"
                                                      value="female">
                        <span class="weui-icon-checked"></span>
                    </div>
                </label></div>
                <div class="weui-cells__title">编码助手(1-2个)</div>
                <div class="weui-cells weui-cells_checkbox"><label class="weui-cell weui-check__label" for="c1">
                    <div class="weui-cell__hd"><input class="weui-check" id="c1" name="assistance" pattern="{1,2}"
                                                      required="" tips="请勾选1-2个敲码助手" type="checkbox"> <i class="weui-icon-checked"></i></div>
                    <div class="weui-cell__bd">黄药师</div>
                </label> <label class="weui-cell weui-check__label" for="c2">
                    <div class="weui-cell__hd"><input class="weui-check" id="c2" name="assistance" type="checkbox">
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd">欧阳锋</div>
                </label> <label class="weui-cell weui-check__label" for="c3">
                    <div class="weui-cell__hd"><input class="weui-check" id="c3" name="assistance" type="checkbox">
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd">段智兴</div>
                </label> <label class="weui-cell weui-check__label" for="c4">
                    <div class="weui-cell__hd"><input class="weui-check" id="c4" name="assistance" type="checkbox">
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd">洪七公</div>
                </label></div>
                <div class="weui-cells weui-cells_form">
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
                        <div class="weui-cell__bd"><input class="weui-input" emptytips="请输入手机号" maxlength="11"
                                                          notmatchtips="请输入正确的手机号" pattern="^\\d{11}$" placeholder="输入你现在的手机号" required=""
                                                          type="tel"></div>
                        <div class="weui-cell__ft"><i class="weui-icon-warn"></i></div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">身份证号码</label></div>
                        <div class="weui-cell__bd"><input class="weui-input" emptytips="请输入身份证号码" maxlength="18"
                                                          notmatchtips="请输入正确的身份证号码" pattern="REG_IDNUM" placeholder="输入你的身份证号码" required=""
                                                          type="text"></div>
                        <div class="weui-cell__ft"><i class="weui-icon-warn"></i></div>
                    </div>
                    <div class="weui-cell weui-cell weui-cell_vcode">
                        <div class="weui-cell__hd"><label class="weui-label">验证码</label></div>
                        <div class="weui-cell__bd"><input class="weui-input" maxlength="4" pattern="REG_VCODE"
                                                          placeholder="点击验证码更换" required="" tips="请输入验证码" type="text"></div>
                        <div class="weui-cell__ft"><i class="weui-icon-warn"></i> <img class="weui-vcode-img"
                                                                                       src="http://tencent.github.io/weui/images/vcode.jpg">
                        </div>
                    </div>
                </div>
                <div class="weui-btn-area"><a class="weui-btn weui-btn_primary" href="javascript:"
                                              id="formSubmitBtn">提交</a></div>
            </div>

        </div>
        <div class="weui-tab__content">上传页</div>
        <div class="weui-tab__content">其它页</div>
    </div>
</div>`


export default {
        template,
        name: "tab",
        data() {
            return {

            }
        },
        methods: {},
        computed: {},
       async mounted() {
        weui.tab('#tab',{
            defaultIndex: 0,
            onChange: function(index){
                //console.log(index);
            }
        });


    },
}


