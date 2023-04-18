


const IS_DEBUG=false;

//AccessKeyID
const accessKeyId = "xxx";
//AccessKeySecret
const accessKeySecret = "xxx";

/**
 * ========================================================================================================================
 * 以RecognizeBankCard为例。
 * 这里只是为了Web前端演示流程，所以将代码写在了Web前端
 * 真正上线不建议将ACCESS_KEY_ID和ACCESS_KEY_SECRET写在Web前端，会有泄漏风险，建议将请求API接口代码写到您的服务端
 * 请求银行卡识别：https://help.aliyun.com/document_detail/151893.html
 * ========================================================================================================================
 */
function callRecognizeBankCard(imageUrl, callback) {
  // 这里endpoint为API访问域名，与类目相关，具体类目的API访问域名请参考：https://help.aliyun.com/document_detail/143103.html
  const endpoint = "ocr.cn-shanghai.aliyuncs.com";
  // API Action，能力名称，请参考具体算法文档详情页中的Action参数，这里以银行卡识别为例：https://help.aliyun.com/document_detail/151893.html
  const Action = "RecognizeBusinessCard";
  // API_VERSION为API版本，与类目相关，具体类目的API版本请参考：https://help.aliyun.com/document_detail/464194.html
  const API_VERSION = "2019-12-30";

  const params = {};
  // 业务参数，请参考具体的AI能力的API文档进行修改
  params["ImageURL"] = imageUrl;

  callApi(endpoint, Action, API_VERSION, params, callback);
}

/**
 * ========================================================================================================================
 * 获取oss sts token，使用阿里云视觉智能开放平台官方OSS-Bucket作为临时存储，仅为方便用户方便调试接口使用，文件存储有效期为1天。
 * 这里只是为了Web前端演示流程，所以将代码写在了Web前端
 * 真正上线不建议将ACCESS_KEY_ID和ACCESS_KEY_SECRET写在Web前端，会有泄漏风险，建议将请求API接口代码写到您的服务端
 * ossStsToken获取原理：xxx
 * ========================================================================================================================
 */
function getOssStsToken(callback) {
  
  // 这里endpoint为API访问域名，与类目相关，具体类目的API访问域名请参考：https://help.aliyun.com/document_detail/143103.html
  const endpoint = "viapiutils.cn-shanghai.aliyuncs.com";
  // API Action，能力名称，请参考具体算法文档详情页中的Action参数，这里以银行卡识别为例：https://help.aliyun.com/document_detail/151893.html
  const Action = "GetOssStsToken";
  // API_VERSION为API版本，与类目相关，具体类目的API版本请参考：https://help.aliyun.com/document_detail/464194.html
  const API_VERSION = "2020-04-01";

  callApi(endpoint, Action, API_VERSION, null, callback);
}

/**
 * ========================================================================================================================
 * 通过签名方式调用API，支持平台的任意API。
 * 这里只是为了Web前端演示流程，所以将代码写在了Web前端
 * 真正上线不建议将ACCESS_KEY_ID和ACCESS_KEY_SECRET写在Web前端，会有泄漏风险，建议将请求API接口代码写到您的服务端
 * 签名文档：https://help.aliyun.com/document_detail/144904.html
 * ========================================================================================================================
 */
function callApi(endpoint, action, version, params, callback) {

  const API_HTTP_METHOD = "POST";

  const request_ = {};
  //系统参数
  request_["SignatureMethod"] = "HMAC-SHA1";
  request_["SignatureNonce"] = signNRandom();
  request_["AccessKeyId"] = accessKeyId;
  request_["SignatureVersion"] = "1.0";
  request_["Timestamp"] = getTimestamp();
  request_["Format"] = "JSON";
  request_["RegionId"] = "cn-shanghai";
  request_["Version"] = version;
  request_["Action"] = action;
  // 业务参数，请参考具体的AI能力的API文档进行修改
  if(params) {
    for(let key in params) {
      request_[key] = params[key];
    }
  }

  callApiRequest(request_, API_HTTP_METHOD, endpoint, accessKeySecret, callback);
}

/**
 * ========================================================================================================================
 * 处理文件和URL，将其上传到阿里云视觉智能开放平台官方OSS-Bucket作为临时存储，该方式仅为方便用户方便调试接口使用，文件存储有效期为1天。
 * ========================================================================================================================
 */
// 使用oss-client-sdk进行文件上传
function uploadToTempOss(ossStsToken, filePath, callback) {
  let ossClient = new OSS({
    accessKeyId: ossStsToken.Data.AccessKeyId,
    accessKeySecret: ossStsToken.Data.AccessKeySecret,
    stsToken: ossStsToken.Data.SecurityToken,
    // region固定为oss-cn-shanghai
    refreshSTSToken:true,
    region: "oss-cn-shanghai",
    // bucket固定为viapi-customer-temp
    bucket: 'viapi-customer-temp',
  });
  let ins = filePath;
  let fileName = filePath.name;
  // 上传之后的文件路径，必须是${accessKeyId}/xxx
  let objectName = `${accessKeyId}/${getNonce(6)}/${fileName}`;
  putObject(ins);
  async function putObject(data) {
    try {
      // 填写Object完整路径。Object完整路径中不能包含Bucket名称。
      // 您可以通过自定义文件名（例如exampleobject.txt）或文件完整路径（例如exampledir/exampleobject.txt）的形式实现将数据上传到当前Bucket或Bucket中的指定目录。
      // data对象可以自定义为file对象、Blob数据或者OSS Buffer。
      const result = await ossClient.put(
        objectName,
        data
      );
      if(IS_DEBUG) console.log('result', result);
      callback && callback(result.url);
    } catch (e) {
      console.log(e);
    }
  }
}
//随机uuid，ossClient上传后的文件命名拼接
function getNonce(length) {
  var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = length; i > 0; --i)
    result += str[Math.floor(Math.random() * str.length)];
  return result;
}
// 任意链接转化为File，链接必须支持跨域，为了将链接内容传到阿里云视觉智能开放平台官方OSS-Bucket
function getImageFileFromUrl(url, imageName) {
  return new Promise((resolve, reject) => {
    var blob = null;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = () => {
      blob = xhr.response;
      let imgFile = new File([blob], imageName);
      resolve(imgFile);
    };
    xhr.onerror = (e) => {
      reject(e)
    };
    xhr.send();
  });
}

/**
 * ========================================================================================================================
 * 封装http请求
 * ========================================================================================================================
 */
const http = {};
http.request = function (option, callback) {
  var url = option.url;
  var method = option.method;
  var data = option.data;
  var timeout = option.timeout || 0;
  //创建XMLhttpRequest对象
  var xhr = new XMLHttpRequest();
  (timeout > 0) && (xhr.timeout = timeout);
  //使用open方法设置和服务器的交互信息
  xhr.open(method, url, true);
  if (typeof data === 'object') {
    try {
      data = JSON.stringify(data);
    } catch (e) { }
  }
  //发送请求
  xhr.send(data);
  //如果请求完成，并响应完成，获取到响应数据
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var result = xhr.responseText;
      try { result = JSON.parse(xhr.responseText); } catch (e) { }
      callback && callback(null, result);
    }
  }.bind(this);
  //延时处理
  xhr.ontimeout = function () {
    callback && callback('timeout');
    console.log('error', '连接超时');
  };
};
// post请求
http.post = function (option, callback) {
  option.method = 'post';
  option.contentType = 'application/json;charset=UTF-8'
  this.request(option, callback);
};
//请求数据
const callApiRequest = (request_, API_HTTP_METHOD, endpoint, accessKeySecret, callback) => {
  const url = generateUrl(request_, API_HTTP_METHOD, endpoint, accessKeySecret);
  http.post({ url: url, timeout: 5000 }, function (err, result) {
    // 获取结果
    if(IS_DEBUG) console.log(result);
    callback && callback(result);
  });
}

/**
 * ========================================================================================================================
 * 以下代码仅仅为了调用服务端接口计算签名，其逻辑可参考文档：https://help.aliyun.com/document_detail/144904.html
 * 这里只是为了Web前端演示，所以将代码写在了Web前端
 * 真正上线不建议将ACCESS_KEY_ID和ACCESS_KEY_SECRET写在Web前端上，会有泄漏风险，建议将请求API接口代码写到您的服务端
 * ========================================================================================================================
 */

//SignatureNonce随机数字
function signNRandom() {
  const Rand = Math.random()
  const mineId = Math.round(Rand * 100000000000000)
  return mineId;
};
//Timestamp
function getTimestamp() {
  let date = new Date();
  let YYYY = pad2(date.getUTCFullYear());
  let MM = pad2(date.getUTCMonth() + 1);
  let DD = pad2(date.getUTCDate());
  let HH = pad2(date.getUTCHours());
  let mm = pad2(date.getUTCMinutes());
  let ss = pad2(date.getUTCSeconds());
  return `${YYYY}-${MM}-${DD}T${HH}:${mm}:${ss}Z`;
}
//补位占位
function pad2(num) {
  if (num < 10) {
    return '0' + num;
  }
  return '' + num;
};
// 排序
function ksort(params) {
  let keys = Object.keys(params).sort();
  let newParams = {};
  keys.forEach((key) => {
    newParams[key] = params[key];
  });
  return newParams;
};
// HmacSHA1加密+base64
function createHmac(stringToSign, key) {
  const CrypStringToSign = CryptoJS.HmacSHA1(stringToSign, key);
  const base64 = CryptoJS.enc.Base64.stringify(CrypStringToSign);
  return base64;
};
//编码
function encode(str) {
  var result = encodeURIComponent(str);
  return result.replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A');
};
function sha1(stringToSign, key) {
  return createHmac(stringToSign, key);
};
function getSignature(signedParams, method, secret) {
  var stringToSign = `${method}&${encode('/')}&${encode(signedParams)}`;
  const key = secret + "&";
  return sha1(stringToSign, key);
};
//参数拼接 &
function objToParam(param) {
  if (Object.prototype.toString.call(param) !== '[object Object]') {
    return '';
  }
  let queryParam = '';
  for (let key in param) {
    if (param.hasOwnProperty(key)) {
      let value = param[key];
      queryParam += toQueryPair(key, value);
    }
  }
  return queryParam;
};
function toQueryPair(key, value) {
  if (typeof value == 'undefined') {
    return `&${key}=`;
  }
  return `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
};
function generateUrl(request, httpMethod, endpoint, accessKeySecret) {
  //参数中key排序
  const sortParams = ksort(request);
  //拼成参数
  const sortQueryStringTmp = objToParam(sortParams);
  const sortedQueryString = sortQueryStringTmp.substring(1);// 去除第一个多余的&符号
  //构造待签名的字符串
  const Signture = getSignature(sortedQueryString, httpMethod, accessKeySecret)
  //签名最后也要做特殊URL编码
  request["Signature"] = encodeURIComponent(Signture);

  //最终生成出合法请求的URL
  const finalUrl = "https://" + endpoint + "/?Signature=" + encodeURIComponent(Signture) + sortQueryStringTmp;
  return finalUrl;
}

export {
  getOssStsToken,
  uploadToTempOss,
  callRecognizeBankCard
}