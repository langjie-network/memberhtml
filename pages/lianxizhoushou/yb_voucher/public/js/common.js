//全局工具类
const common = {};
//全局变量
M.pageContext={
    curDay:new Date().getDate(),
    today: new Date().setHours(0, 0, 0, 0)
}





const stateMap= {
    "unclaimed": "待领取",
    "wait_config": "待配置",
    "wait_scan": "待扫码",
    "complete": "已完成"
}

//缓存全局变量
common._globle_cacheMap={
    "vipRegistYbVoucherTagList":[]
}

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

common.getYbVoucherState=(key)=>{
    return stateMap[key];
}

common.formatDate=(date,dataFormat="yyyy-MM-dd hh:mm:ss")=>{
    let post_time_data= new Date(date);
    return post_time_data.format(dataFormat);
}




export  default common;