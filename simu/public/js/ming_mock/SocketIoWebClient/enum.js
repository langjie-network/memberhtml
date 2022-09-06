

/**
 * SocketIo 的事件名
 */
const SocketIoEventEnum ={
     /**
      * 用于接收外部调用
      */
      CALL:"call",
     /**
      * 用于响应
      */
      REPLY:"reply",
      EVENT :"event",
      DATAGRAM:"datagram",
}


const JsonRpcEventMethodEnum={
    //vtc日志
    vtcLog:"event.vtcLog",
    //微信客户端上线
    wxClientConnect:"event.wxClientConnect",

}

/**
 * JSONRpc的方法名
 */
const JsonRpcCallMethodEnum={
    move_up:"move_up",
    move_down:"move_down",
    stop:"stop",
    plus:"plus",
    minus:"minus",
    position:"position",
    keep_pressure:"keep_pressure",
    query_skq_status:"query_skq_status",
}


export  {JsonRpcCallMethodEnum,SocketIoEventEnum,JsonRpcEventMethodEnum} ;