//全局工具类
const common = {};
//全局变量
M.pageContext={
    curDay:new Date().getDate(),
    today: new Date().setHours(0, 0, 0, 0)
}



common.getAuthToken= () => {
    let payload;
    try {
        payload = JSON.parse(sessionStorage.getItem('lj_token'));
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
    }else if(file_source_type=="vtc_cfg_temp"){
        return $BASE_IMG_URL("/build_ico1.png");
    }else if(file_source_type=="ats_cfg_temp") {
        return $BASE_IMG_URL("/action_ico2.png");
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

common.formatData=(date)=>{
    let post_time_data= new Date(date);
    return post_time_data.format("yyyy-MM-dd hh:mm:ss");
}


export  default common;