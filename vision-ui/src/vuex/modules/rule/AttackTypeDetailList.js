import axios from 'axios'


const state={
    attacktypeDetailList:{
        '准确告警':{'异常行为':15070,'ATS':1111,'高频访问':1020,'访问上限':2,'黑名单':34,'黑客攻击':533660,'账号攻击':0,'业务漏洞攻击':0,'爬虫':61055,'博彩':0,'传销':0,'挂证':0,
            '刷单':3,'刷金币':135,'虚假账号':0,'广告':261,'支付推广':0},
        '验证告警':{'异常行为':15060,'ATS':21011,'高频访问':1020,'访问上限':2,'黑名单':34,'黑客攻击':533660,'账号攻击':0,'业务漏洞攻击':0,'爬虫':61055,'博彩':0,'传销':0,'挂证':0,
            '刷单':3,'刷金币':135,'虚假账号':0,'广告':261,'支付推广':0},
        '错误告警':{'异常行为':10070,'ATS':13011,'高频访问':1020,'访问上限':2,'黑名单':34,'黑客攻击':533660,'账号攻击':0,'业务漏洞攻击':0,'爬虫':61055,'博彩':0,'传销':0,'挂证':0,
            '刷单':3,'刷金币':135,'虚假账号':0,'广告':261,'支付推广':0},
        '无效告警':{'异常行为':25070,'ATS':19011,'高频访问':1020,'访问上限':2,'黑名单':34,'黑客攻击':533660,'账号攻击':0,'业务漏洞攻击':0,'爬虫':61055,'博彩':0,'传销':0,'挂证':0,
            '刷单':3,'刷金币':135,'虚假账号':0,'广告':261,'支付推广':0}
    },
   /* colors:{
        '经理人':'#4CD964', '猎头':'#3E89FF', '企业自由用户':'#D70A64', '未知':'#FACD19', '企业HR':'#FF6B00',
        '爬虫':'#D70A64','异常行为':'#FF6B00','ATS':'#4CD964','高频访问':'#518AFF','访问上限':'#5236F3',
        '黑名单':'#8336F3','黑客攻击':'#FACD19','账号攻击':'#D636F3','业务漏洞':'#F33678',
        'passport-禁止访问':'#4CD964','passport-账号禁用':'#D70A64','passport-修改密码':'#518AFF','passport-手机验证':'#FF6B00','passport-图形验证码':'#20B2AA',
        'nginx-禁止访问':'#FACD19','nginx-图形验证码':'#D636F3',
        'clean':'#1b1b1b'},*/

    hours:24,
    colors:{},

}

const actions={
    searchAttackTypeDetailList({commit}){
        state.attacktypeDetailList=null;
        axios.get('/intercept/getAttackTypeDetail.json',{
            params: {'hours':state.hours},
            timeout: 70000,
            headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json'
        })
            .then(response=>{commit('doSearchAttackTypeDetailList',response.data)})
            .catch(error=>{console.log("error=%o",error)})
            .finally(()=>{});
    },

}

const mutations={
    doSearchAttackTypeDetailList(state,data){
        console.log("doSearchAttackTypeDetailList data=%o",data.data);
        if(data.data==null){
            return;
        }
        state.attacktypeDetailList=data.data.attacktypeDetail;
    }

}

const getter={

}

const moduleAttackTypeDetailList={
    state:state,
    mutations:mutations,
    actions:actions,
    getter:getter
}

export default moduleAttackTypeDetailList;
