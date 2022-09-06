//全局工具类
const common = {};


common.getAuthToken= () => {
    let payload;
    try {
        payload = JSON.parse(localStorage.getItem('lj_token'));
        const { lj_token, endDate } = payload;
        if (Date.now() > endDate) {
            return null;
        } else {
            return lj_token;
        }
    } catch (error) {
        return null;
    }
};
/**
 * 查文件的图片
 * @param file_suffix
 * @param file_source_type
 * @returns {*}
 */
common.getFileTypeImg=(file_suffix,file_source_type)=>{
    //console.log(item.file_source_type)
    let $BASE_IMG_URL= vueApp.config.globalProperties.$BASE_IMG_URL
    if(file_source_type=="burn_disk"){
        return $BASE_IMG_URL("/guangpan.png");
    }
    file_suffix=file_suffix.toLowerCase();
    switch (file_suffix){
        case "zip": return $BASE_IMG_URL("/file_type_zip.png");
        case "png": return $BASE_IMG_URL("/file_type_img.png");
        case "jpg": return $BASE_IMG_URL("/file_type_img.png");
        case "txt": return $BASE_IMG_URL("/file_type_txt.png");
        case "md": return $BASE_IMG_URL("/file_type_txt.png");
        case "doc": return $BASE_IMG_URL("/file_type_word.png");
        case "docx":return $BASE_IMG_URL("/file_type_word.png");
        case "pdf": return $BASE_IMG_URL("/file_type_pdf.png");
        case "mp4": return $BASE_IMG_URL("/file_type_mp4.png");
        case "json": return $BASE_IMG_URL("/file_type_json.png");
    }
    return $BASE_IMG_URL("/file_type_pdf.png");
}



function isToday(da){
    let d = new Date(da).setHours(0, 0, 0, 0);
    let today =M.pageContext.today;
    let obj = {
        '-86400000': '昨天',
        '0': '今天',
        '86400000': '明天',
    };
    return obj[d - today] || 0;
}


common.humanDate=(pureDate)=>{
    let post_time_data= new Date(pureDate)
    let disMonth= post_time_data.getMonth()+1;
    let disDay=post_time_data.getDate();
    let disHour=post_time_data.getHours();
    let disMins=post_time_data.getMinutes();
    //M.post_time_data=post_time_data;
    disMins= (Array(2).join(0) + disMins).slice(-2)
    let r= isToday(post_time_data);
    if(r=="今天"){
        return `${disHour}:${disMins}`;
    }else if(r=="昨天"){
        return `昨天${disHour}:${disMins}`;
    }else {
        return `${disMonth}月${disDay}日${disHour}:${disMins}`;
    }
}

common.humanFileCapacity=(capacity)=>{
    if(capacity>548576){
        return (capacity/1048576).toFixed(2)+"Mb";
    }else {
        return (capacity/1024).toFixed(2)+"Kb";
    }
}

common.formatData=(date,dataformat="yyyy-MM-dd hh:mm:ss")=>{
    if(/\s/.test(date)){
        return "";
    }
    let post_time_data= new Date(date);
    return post_time_data.format(dataformat);
}


common.myAlertToast=(msg)=>{
    var str = '<div id="toast">'+
        '<div class="weui-mask_transparent"></div>'+
        '<div class="weui-toast" style="width:11em;margin-left:-5.5em;">'+
        '<i class="weui-icon-warn weui-icon_msg" style="margin-top:10px;color:#fff;font-size:74px"></i>'+
        '<p class="weui-toast__content">'+msg+'</p>'+
        '</div>'+
        '</div>';
    $('body').append(str);
    setTimeout(function(){
        $('#toast').remove();
    },800);
}




common.secUserName=(user_name)=>{
    if(!user_name){
        return ""
    }
    if(user_name.length>2){
        user_name=user_name[0]+"*"+user_name[user_name.length-1]
    }else {
        user_name=user_name[0]+"*";
    }
    return  user_name;
}






export  default common;