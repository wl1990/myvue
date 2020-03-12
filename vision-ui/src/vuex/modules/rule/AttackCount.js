import axios from 'axios'

const state={
    attacktype:{'异常行为':15070,'ATS':1111,'高频访问':1020,'访问上限':2,'黑名单':34,'黑客攻击':533660,'账号攻击':0,'业务漏洞攻击':0,'爬虫':61055,'博彩':1,'传销':1,'挂证':0,
        '刷单':3,'刷金币':135,'虚假账号':1,'广告':261,'支付推广':1},
   /* colors:{
        '经理人':'#4CD964', '猎头':'#3E89FF', '企业自由用户':'#D70A64', '未知':'#FACD19', '企业HR':'#FF6B00',
        '爬虫':'#D70A64','异常行为':'#FF6B00','ATS':'#4CD964','高频访问':'#518AFF','访问上限':'#5236F3',
        '黑名单':'#8336F3','黑客攻击':'#FACD19','账号攻击':'#D636F3','业务漏洞':'#F33678',
        'passport-禁止访问':'#4CD964','passport-账号禁用':'#D70A64','passport-修改密码':'#518AFF','passport-手机验证':'#FF6B00','passport-图形验证码':'#20B2AA',
        'nginx-禁止访问':'#FACD19','nginx-图形验证码':'#D636F3',
        'clean':'#1b1b1b'},*/
   hours:24,
   colors:{},
    option : {
        title : {
            text: '告警类型',
            // subtext: '24小时',
            textStyle: {
                fontSize: 12,
                fontWeight: 100,
                fontFamily: 'PingFangSC-Semibold',
                color: '#FFFFFF',
                lineHeight: 16,
            },
            subtextStyle:{
                align: 'left',
                fontSize: 10,
                fontWeight: 100,
                fontFamily: 'PingFangSC-Semibold',
                color: '#FFFFFF',
            },
            padding: [10,0,0,20],
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: [],
        },
        series : [
            {
                name: '告警类型',
                type: 'pie',
                label: {
                    show: true,
                    color:'#FACD19',
                    textStyle: {
                        fontSize: '12',
                        fontWeight: 'lighter'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '12',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine:{
                    show:true,
                    // smooth: 0.2,
                    // length: 20,
                    // length2: 10,
                  lineStyle:{
                    color:'#FACD19',
                      width:0.5
                  }
                },
                radius : ['30%','45%'],
                center: ['50%', '52%'],
                minAngle:5,
                startAngle:270,
                data:[
                ],
            }
        ]
    },

}

const actions={
    searchAttackCount({commit}){
        state.attacktype=null;
        axios.get('/intercept/getAttackPercent.json',{
            params: {'hours':state.hours},
            timeout: 60000,
            headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json'
        })
            .then(response=>{commit('doSearchAttackCount',response.data)})
            .catch(error=>{console.log("error=%o",error)})
            .finally(()=>{});
    },

}

const mutations={
    doSearchAttackCount(state,data){
        console.log("doSearchAttackCount data=%o",data.data);
        if(data.data==null){
            return;
        }
        state.attacktype=data.data.attacktype;
    }

}

const getter={

}

const moduleAttackCount={
    state:state,
    mutations:mutations,
    actions:actions,
    getter:getter
}

export default moduleAttackCount;
