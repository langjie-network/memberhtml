var UIListView,directorArr = [];
var _newDataStore = [];
apiReady(function() {
    checkLogin(function() {
        getSignInfo();
        getMsg();
        getDirectrListByLevel();
        getMoreInfo();
    });
});

function getMsg() {
    apiAjax({
        url: '/home/notiPost/fromCenterList'
    }, function(result) {
        $('.weui-cell_swiped').remove();
        var dataStore = result.data;
        var str = '';
        for (var i = 0; i < dataStore.length; i++) {
            var item = dataStore[i];
            var title = item.NotiPost.title;
            var content = item.NotiPost.content;
            var len;
            try{
                len = item.NotiPost.votes.split(',').length;
            }catch(e){
                len = 0;
            }
            var in_str = '';
            if(len==1){
                if(!dataStore[i].vote){
                    // 宸查槄
                    in_str += '<a style="display: flex;align-items: center;" '+
                        'data-id="'+item.id+'" data-noti_client_mailId="'+item.NotiPost.mailId+'" '+
                        'class="weui-swiped-btn weui-swiped-btn_default close-swipeout" '+
                        'href="javascript:">宸查槄</a>';
                }
            }else if(len>1){
                if(!dataStore[i].vote){
                    // 閫夊崟
                    in_str += '<a data-votes="'+item.NotiPost.votes+'" data-id="'+item.id+'" data-noti_client_mailId="'+item.NotiPost.mailId+'" style="display: flex;align-items: center;" class="weui-swiped-btn weui-swiped-btn_default close-swipeout" href="javascript:">閫夊崟</a>';
                }
            }
            if(dataStore[i].atMe&&!dataStore[i].atReply){
                // 鍥炲
                in_str += '<a data-id="'+item.id+'" data-noti_client_mailId="'+item.NotiPost.mailId+'" style="display: flex;align-items: center;" class="weui-swiped-btn weui-swiped-btn_warn delete-swipeout" href="javascript:">鍥炲</a>';
            }
            str += '<div class="weui-cell weui-cell_swiped" data-locationId="'+item.NotiPost.locationId+'" data-title="'+title+'" data-affairId="'+item.NotiPost.noti_client_affair_group_uuid+'" onclick="msgClick(this);">'+
                '<div class="weui-cell__bd" style="transform: translate3d(0px, 0px, 0px);">'+
                '<div class="weui-cell">'+
                '<div class="weui-cell__bd">'+
                '<p>'+title+'</p>'+
                '<p>'+content+'</p>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '<div class="weui-cell__ft">'+in_str+'</div>'+
                '</div>';
        }
        $('.aui-media-list').append(str);
    });
}



function refresh(){
    UIListView.setRefreshHeader({
        bgColor: '#F5F5F5',
        textColor: '#8E8E8E',
        textDown: '下拉可以刷新...',
        textUp: '松开开始刷新...',
        showTime: true
    }, function(ret, err) {
        if (ret) {
            getMsg();
        }
    });
}

function reply(params){
    if(!params.vote&&!params.atReply){
        api.toast({
            msg: '回复不能为空'
        });
        return;
    }
    apiAjax({
        url: '/home/notiPost/fromCenterUpdate',
        type: 'put',
        data: params
    },function(result){
        api.toast({
            msg: result.msg
        });
        getMsg();
    });
}

// function msgClick(form_data) {
//     var affairId = form_data.affairId;
//     var title = form_data.title;
//     var locationId = form_data.locationId;
//     api.openWin({
//         name: 'responseAffairWin',
//         url: '../html/responseAffairWin.html',
//         pageParam: {
//             affairId: affairId,
//             title: title,
//             locationId: locationId
//         }
//     });
// }

function msgClick(obj) {
    var sty = $(obj).find('.weui-cell__bd').css('transform');
    if(sty=='matrix(1, 0, 0, 1, 0, 0)'){
        var affairId = $(obj).attr('data-affairId');
        var title = $(obj).attr('data-title');
        var locationId = $(obj).attr('data-locationId');
         window.location.href = '/m/home/affair?affairId='+affairId+'&title='+title+'&locationId='+locationId;
    }else{
        $('.weui-cell_swiped').swipeout('close');
    }
}



/**
 *  获取签到信息
 */
function getSignInfo(){
    apiAjax({
        url:'/home/attendance/workingNum',
    },function(res){
        renderSign(res.data);
    });
}

function renderSign(data){
    var status = data.status;
    $('.workTime').html(data.workTime);
    $('.overWorkTime').html(data.overWorkTime);
    $('.onDutyTime').html(data.onDutyTime);
    $('.total').html(data.total);
    showWorkTime(data,data.workTime);
    if(status==0){
        var str = '<div style="text-align: center;margin-top: 60px;"><a href="javascript:;" onclick="signIn();" class="sign-checkin weui-btn_mini weui-btn_plain-primary">上班</a></div>';

        $('.sign-wrap').html(str);
    }else if(status==1){
        var onCusDutyStaff = data.onCusDutyStaff?data.onCusDutyStaff:'';
        var onDutyStaff = data.onDutyStaff?data.onDutyStaff:'';
        var onDutyInsideStaff = data.onDutyInsideStaff?data.onDutyInsideStaff:'';
        var str = '<div style="text-align: center;">'+
                        '<div class="wrap-duty">'+
                            '<label onclick="safeDuty();" style="color: rgb(117,117,117);">'+
                                '<span>安卫：</span>'+
                                '<span>'+onDutyStaff+'</span>'+
                            '</label>'+
                            '<label onclick="cusDuty();" style="color: rgb(117,117,117);text-align: center;">'+
                                '<span>客服：</span>'+
                                '<span>'+onCusDutyStaff+'</span>'+
                            '</label>'+
                            '<label onclick="insideDuty();" style="color: rgb(117,117,117);text-align: right;">'+
                                '<span>内勤：</span>'+
                                '<span>'+onDutyInsideStaff+'</span>'+
                            '</label>'+
                        '</div>'+
                        '<a href="javascript:;" style="margin-top: 10px;" onclick="signOut();" class="sign-checkin weui-btn_mini weui-btn_plain-primary">下班</a>'+
                        '<div class="wrap-duty" >'+
                            '<p style="padding-top: 5px;">'+
                                '<span onclick="goOutDialog();">登记外出</span>'+
                            '</p>'+
                            '<p style="padding-top: 5px;">'+
                                '<span onclick="recallWork();">撤销上班</span>'+
                            '</p>'+
                        '</div>'+
                    '</div>';

        $('.sign-wrap').html(str);
    }else if(status==2){
        var str = '<div style="text-align: center;margin-top: 60px;">'+
                        '<a href="javascript:;" onclick="outLeave();" class="sign-checkin weui-btn_mini weui-btn_plain-primary">下班</a>'+
                        '<div class="wrap-duty" >'+
                            '<p style="padding-top: 5px;">'+
                                '<span onclick="backWork();">返岗</span>'+
                            '</p>'+
                        '</div>'+
                    '</div>';

        $('.sign-wrap').html(str);
    }else if(status==3){
        var str = '<div style="text-align: center;margin-top: 60px;"><a href="javascript:;" onclick="overWorkStart();" class="sign-checkin weui-btn_mini weui-btn_plain-primary">加班</a></div>';

        $('.sign-wrap').html(str);
    }else if(status==4){
        var str = '<div style="text-align: center;margin-top: 60px;">'+
                        '<a href="javascript:;" onclick="overWorkEnd();" class="sign-checkin weui-btn_mini weui-btn_plain-primary">结束加班</a>'+
                        '<div class="wrap-duty" >'+
                            '<p style="padding-top: 5px;">'+
                                '<span onclick="recallOverWork();">撤销加班</span>'+
                            '</p>'+
                        '</div>'+
                    '</div>';

        $('.sign-wrap').html(str);
    }
    apiAjax({
        url: '/home/staff/getListByLevel',
        data: {
            level: 4
        }
    },function(res){
        var userIdArr = [];
        res.data.forEach(function(items){
            if (items.branch == '客户关系部') {
                userIdArr.push(items.user_id.toString());
            }
        });
        if (userIdArr.indexOf(sessionStorage.getItem('user_id')) === -1) return;
        var newStr = $('.sign-wrap').html();
        newStr += '<p style="color:#666;font-size: 14px;margin-left: 18px;" onclick="newContractAdd();">新合同登记</p>';
        $('.sign-wrap').html(newStr);
    });
}

function newContractAdd() {
    api.openWin({
        name: 'new_contract_add',
        url: '../html/new_contract_add.html',
    });
    // api.prompt({
    //     title: '合同号',
    //     buttons: ['确定', '取消']
    // }, function(ret, err) {
    //     var index = ret.buttonIndex;
    //     var text = ret.text;
    //     if (index === 1) {
    //         text = text.toUpperCase();
    //         if (!text) {
    //             return;
    //         }
    //         apiAjax({
    //             url: '/member_ajax/createContractNo',
    //             type: 'post',
    //             data: {
    //                 contract_no: text,
    //             },
    //         },function(res){
    //             api.hideProgress();
    //             api.toast({
    //                 msg: res.msg
    //             });
    //         });
    //     }
    // });
}

function outLeave(){
    confirmLeaveJob(function(){
        api.showProgress({
            title: '正在提交',
            modal: true
        });
        apiAjax({
            url: '/home/attendance/outLeave',
            type: 'put'
        },function(res){
            api.hideProgress();
            api.toast({
                msg: res.msg
            });
            getSignInfo();
        });
    });
}

function backWork(){
    api.showProgress({
        title: '正在提交',
        modal: true
    });
    apiAjax({
        url: '/home/attendance/outBack',
        type: 'put'
    },function(res){
        api.hideProgress();
        api.toast({
            msg: res.msg
        });
        getSignInfo();
    });
}

/**
 *  获取指派人列表
 */
function getDirectrListByLevel(){
    apiAjax({
        url: '/home/staff/getListByLevel',
        data: {
            level: getLevel()
        }
    },function(res){
        res.data.forEach(function(items,index){
            directorArr.push(items.user_name);
        });
    });
}

function goOutDialog(){
    api.actionSheet({
        title: '选择指派人',
        cancelTitle: '取消',
        buttons: directorArr
    }, function(ret, err) {
        var index = ret.buttonIndex;
        if(index<=directorArr.length){
            var director = directorArr[index-1];
            if (sessionStorage.getItem('username') == director) {
                api.toast({
                    msg: "指派人不能为自己"
                });
                return;
            }
            api.prompt({
                title: '外出理由',
                buttons: ['确定', '取消']
            }, function(ret, err) {
                var index = ret.buttonIndex;
                var text = ret.text;
                if(index==1){
                    if(text==''){
                        api.toast({
                            msg: "不能为空"
                        });
                        return;
                    }
                    api.showProgress({
                        title: '正在提交',
                        modal: true
                    });
                    apiAjax({
                        url: '/home/attendance/goOut',
                        type: 'put',
                        data: {
                            director: director,
                            reason: text
                        }
                    },function(res){
                        api.hideProgress();
                        api.toast({
                            msg: res.msg
                        });
                        getSignInfo();
                    });
                }
            });
        }
    });
}

function safeDuty(){
    api.showProgress({
        title: '正在提交',
        modal: true
    });
    apiAjax({
        url: '/home/attendance/memberSafeDuty',
        type: 'post'
    },function(res){
        api.hideProgress();
        api.toast({
            msg: res.msg
        });
        getSignInfo();
    });
}

function cusDuty(){
    api.showProgress({
        title: '正在提交',
        modal: true
    });
    apiAjax({
        url: '/home/attendance/memberCusDuty',
        type: 'post'
    },function(res){
        api.hideProgress();
        api.toast({
            msg: res.msg
        });
        getSignInfo();
    });
}

function insideDuty() {
    api.showProgress({
        title: '正在提交',
        modal: true
    });
    apiAjax({
        url: '/home/attendance/memberInsideDuty',
        type: 'post'
    },function(res){
        api.hideProgress();
        api.toast({
            msg: res.msg
        });
        getSignInfo();
    });
}

function recallWork(){
    api.confirm({
        title: '提醒',
        msg: '确定撤销上班？',
        buttons: ['确定', '取消']
    }, function(ret, err) {
        var index = ret.buttonIndex;
        if(index==1){
            api.showProgress({
                title: '正在提交',
                modal: true
            });
            apiAjax({
                url: '/home/attendance/recall',
                type: 'delete'
            },function(res){
                api.hideProgress();
                api.toast({
                    msg: res.msg
                });
                getSignInfo();
            });
        }
    });
}

function recallOverWork(){
    api.confirm({
        title: '提醒',
        msg: '确定撤销加班？',
        buttons: ['确定', '取消']
    }, function(ret, err) {
        var index = ret.buttonIndex;
        if(index==1){
            api.showProgress({
                title: '正在提交',
                modal: true
            });
            apiAjax({
                url: '/home/attendance/recallOverWork',
                type: 'delete'
            },function(res){
                api.hideProgress();
                api.toast({
                    msg: res.msg
                });
                getSignInfo();
            });
        }
    });
}

/**
 *  签到
 *  0 -> 1
 */
function signIn(){
    api.showProgress({
        title: '正在提交',
        modal: true
    });
    apiAjax({
        url: '/home/attendance/sign'
    },function(res){
        api.hideProgress();
        api.toast({
            msg: res.msg
        });
        getSignInfo();
        getLocation(function(point){
            var gps = JSON.stringify(point);
            apiAjax({
                url: '/home/attendance/signGps',
                type: 'put',
                data: {
                    gps: gps
                }
            },function(){});
        });
    });
}

/**
 *  下班
 *  1 -> 0
 */
function signOut(){
    confirmLeaveJob(function(){
        api.showProgress({
            title: '正在提交',
            modal: true
        });
        apiAjax({
            url: '/home/attendance/leave'
        },function(res){
            api.hideProgress();
            api.toast({
                msg: res.msg
            });
            getSignInfo();
        });
    });
}

function overWorkStart(){
    api.showProgress({
        title: '正在提交',
        modal: true
    });
    apiAjax({
        url: '/home/attendance/overWork',
        type: 'put'
    },function(res){
        api.hideProgress();
        api.toast({
            msg: res.msg
        });
        getSignInfo();
        getLocation(function(point){
            var gps = JSON.stringify(point);
            apiAjax({
                url: '/home/attendance/overWorkGps',
                type: 'put',
                data: {
                    on_gps: gps
                }
            },function(){});
        });
    });
}

function overWorkEnd(){
    api.showProgress({
        title: '正在提交',
        modal: true
    });
    apiAjax({
        url: '/home/attendance/endOverWork',
        type: 'put'
    },function(res){
        api.hideProgress();
        api.toast({
            msg: res.msg
        });
        getSignInfo();
    });
}

function confirmLeaveJob(cb){
    api.confirm({
        title: '提醒',
        msg: '确定下班？',
        buttons: ['确定', '取消']
    }, function(ret, err) {
        var index = ret.buttonIndex;
        if(index==1){
            cb();
        }
    });
}

//获取位置信息
function getLocation(cb){
    const geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        cb(r.point);
    });
}

function showWorkTime(data,workTime){
    if(data.status==1||data.status==2){
        show();
        // clearInterval(timer);
        timer = setInterval(function(){
            show();
        },60*1000);
    }

    function show(){
        var sign_on_time = Date.parse(data.checkTime);
        var _date = dateTime()+' 09:00:00';
        _date = _date.replace(/-/g,'/');
        var todayNineClock = Date.parse(_date);
        // var todayNineClock = Date.parse(moment().format('YYYY-MM-DD')+' 09:00:00');
        if(sign_on_time<todayNineClock){
            sign_on_time = todayNineClock;
        }
        var resStamp = Date.now() - sign_on_time;
        resStamp = resStamp<0?0:resStamp;
        var viewWorkTime = parseInt(Number(resStamp));
        viewWorkTime += Number(workTime)*1000*60*60;
        var hours,minute;
        hours = parseInt(viewWorkTime/1000/60/60);
        minute = parseInt(viewWorkTime/1000/60%60);
        viewWorkTime = hours+'时'+minute+'分';
        $('.workTime').html(viewWorkTime);
    }
}

function more() {
    if($('.more').css('display')=='none'){
        $('.more').slideDown();
        $('.moreBar').text('收起');
    }else{
        $('.more').slideUp();
        $('.moreBar').text('更多');
    }
}

/**
 * 获取更多信息
 */
function getMoreInfo(){
    apiAjax({
        url: '/home/attendance/onlineAssessment',
        data: {
            keywords: sessionStorage.getItem('username'),
            filter: JSON.stringify({
                date: '当月'
            })
        }
    },function(res){
        apiAjax({
            url: '/home/attendance/getHasMobileStaffArr'
        },function(hasMobileStaffArr){
            if(hasMobileStaffArr.indexOf(sessionStorage.getItem('user_id'))==-1){
                $('.appSign').html('<div>'+
                        '<p>进度警告</p>'+
                        '<p class="warnProgress"></p>'+
                    '</div><div></div><div></div><div></div>');
            }
            for(var key in res.data.data[0]){
                $('.'+key).text(res.data.data[0][key]);
            }
        });
    });
}

function showPopup() {
    var popup = new auiPopup();
    popup.init({
        frameBounces:false,
        location:'top-right',
        buttons:[{
            text:'注销',
            value:'注销'
        }],
    },function(ret){
        log(ret);
    });
}
