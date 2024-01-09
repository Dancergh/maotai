/*
剧本名称：i茅台Token
更新时间：2023-02-07

=================================================== ===================================================
配置 (Quantumult X)
[重写本地]
^https:\/\/app\.moutai519\.com\.cn\/xhr\/front\/mall\/message\/unRead\/查询url script-request-headers https://raw.githubusercontent.com/gaoyukai/reservation-maotai-script/main/get_maotai_token.js

[中间人]
主机名 = app.moutai519.com.cn
=================================================== ===================================================
配置（浪涌）
[脚本]
i茅台Token = type=http-request,pattern=^https:\/\/app\.moutai519\.com\.cn\/xhr\/front\/mall\/message\/unRead\/query,需要-正文=0，最大大小=0，超时=1000，脚本路径=https://raw.githubusercontent.com/gaoyukai/reservation-maotai-script/main/get_maotai_token.js，script-update-interval=0

[中间人]
主机名 = %APPEND% app.moutai519.com.cn
=================================================== ===================================================
*/

const $ = new Env('i茅台');
$.MT_TOKENS_KEY = 'MT_TOKENS';
$.MT_TOKENS = $.getdata($.MT_TOKENS_KEY) || '';

!(异步() => {
  if (isGetCookie = typeof $request !== `undefined`) {
    获取Cookie();
  }

  函数 GetCookie() {
    if ($request && $request.headers) {
      日志($request.headers);
      if (($request.headers['MT-Token'] && $request.headers['MT-Device-ID']) || ($request.headers['mt-token'] && $request.headers[' mt-设备-id'])) {
        让 new_MT_Token = $request.headers['MT-Token'] || $request.headers['mt-token'];
        让 new_Device_ID = $request.headers['MT-Device-ID'] || $request.headers['mt-device-id'];
        让 old_MT_Token = $.MT_TOKENS.split(',') ？$.MT_TOKENS.split(',')[1] : '';
        if (old_MT_Token !== new_MT_Token) {
          $.setdata(new_Device_ID + ',' + new_MT_Token, $.MT_TOKENS_KEY);
          $.msg($.name, `🎉 Token获取成功`, `${new_Device_ID + ',' + new_MT_Token}`);
        } 别的 {
          $.log(`消耗更新 MT-Token:\n${new_Device_ID + ',' + new_MT_Token}\n`);
        }
      }
      if ($request.headers['MT-APP-Version'] || $request.headers['mt-app-version']) {
        $.MT_VERSION = $request.headers['MT-APP-版本'] || $request.headers['mt-app-version'];
        $.setdata($.MT_VERSION, `MT_VERSION`);
        $.log(`🎉 MT_VERSION 写入成功:\n${$.MT_VERSION}\n`);
      }
      if ($request.headers['用户代理'] || $request.headers['用户代理']) {
        $.MT_USERAGENT = $request.headers['用户代理'] || $request.headers['用户代理'];
        $.setdata($.MT_USERAGENT, `MT_USERAGENT`);
        $.log(`🎉 MT_USERAGENT 写入成功:\n${$.MT_USERAGENT}\n`);
      }
      if ($request.headers['MT-R'] || $request.headers['mt-r']) {
        $.MT_R = $request.headers['MT-R'] || $request.headers['mt-r'];
        $.setdata($.MT_R, `MT_R`);
        $.log(`🎉 MT_R 写入成功:\n${$.MT_R}\n`);
      }
    }
  }

  函数日志（文本）{
    if ($.getdata('is_debug') === 'true') {
      if（文本类型==“字符串”）{
        控制台.log(文本);
      } else if (typeof text == "object") {
        console.log($.toStr(文本));
      }
    }
  }

})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done());

// 更漂亮-忽略
函数 Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t ;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r) =>{t?i(t):e(s)})})}get(t){返回this.send.call(this.env,t)}post(t){返回this.send.call( this.env,t,"POST")}}返回新类{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile=" box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=( new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name},\u5f00\u59cb!`)}isNode(){return"未定义"!=typeof module&&!!module.exports}isQuanX(){return"未定义"!=typeof $task}isSurge(){return"未定义"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"未定义"!=typeof $loon}isShadowrocket(){return"未定义"! =typeof $rocket}isStash(){return"undefined"!=typeof $environment&&$environment["stash-version"]}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t); if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)} catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t ,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,a]=i.split( "@"),n={url:`http://${a}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X -Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t) )}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path :require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t ),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i) )}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile), s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this .fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g, ".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r} lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+ /g)||[]),e.slice(0,-1).reduce((t,s,i)=>对象(t[s])===t[s]?t[s]: t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s, t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.( .*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}返回 e}setdata(t,e){let s=!1;if(/^@/.test(e) ){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),a=i?"null"= ==o?null:o||"{}":"{}";try{const e=JSON.parse(a);this.lodash_set(e,r,t),s=this.setval(JSON. stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s= this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey( t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){返回这个。 isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this. loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie "),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0 ===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(删除 t.headers["Content-Type"]) ,删除 t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.分配(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s .statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.选择=t。opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r ,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t&&t.error||"UndefinedError")); else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("重定向",(t,e)=>{尝试{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync (s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o, rawBody:a}=t,n=s.decode(a,this.encoding);e(null,{status:i,statusCode:r,headers:o,rawBody:a,body:n},n)}, t=>{const{消息:i,响应:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()= >{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x- www-form-urlencoded"),t.headers&&删除 t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t. headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{! t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)});else if(this.isQuanX ())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).然后(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o )},t=>e(t&&t.error||"UndefinedError"));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r ,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:a}=t,n= i.decode(a,this.encoding);e(null,{status:s,statusCode:r,headers:o,rawBody:a,body:n},n)},t=>{const{消息:s ,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}时间(t,e=null){const s=e?new Date(e) :new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(), "s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t) &&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+ e+")")。测试(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e ]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string" ==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object" ==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url "];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t[" media-url"]||t.mediaUrl,i=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard" :i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute ||（这个。isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))), !this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3====== ======="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs =this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t. join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\ u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t) }wait(t){返回新的 Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime) /1e3;this.log("",`\ud83d\udd14${this.name},\u7ed3\u675f!\ud83d\udd5b ${s} \u79d2`),this.log(),this.isSurge()||this.isQuanX()||this.isLoon()?$done(t):this.isNode() &&process.exit(1)}}(t,e)}
