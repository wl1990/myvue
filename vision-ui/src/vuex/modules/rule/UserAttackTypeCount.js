import axios from 'axios'

const state={
    userAttacktype:{
        '异常行为':15070,'ATS':1111,'高频访问':1020,'访问上限':2,'黑名单':34,'黑客攻击':533660,'账号攻击':0,'业务漏洞攻击':0,'爬虫':61055,'博彩':1,'传销':1,'挂证':0,
        '刷单':3,'刷金币':135,'虚假账号':0,'广告':261,'支付推广':0
    },
   colors:{},
    hours:24,
    option : {
        title : {
            text: '用户告警类型',
            // subtext: '24小时数据',
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
                name: '用户告警类型',
                type: 'pie',
                label: {
                    show: true,
                    color:'#FACD19',
                    textStyle: {
                        fontSize: '10',
                        fontWeight: 'lighter'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '10',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine:{
                    show:true,
                  lineStyle:{
                    color:'#FACD19',
                      width:0.5
                  }
                },
                radius : ['35%','60%'],
                center: ['50%', '60%'],
                minAngle:5,
                startAngle:270,
                data:[
                ],
            }
        ]
    },

}

const actions={
    searchUserAttackCount({commit}){
        state.userAttacktype=null;
        axios.get('/intercept/getUserAttackPercent.json',{
            params: {'hours':state.hours},
            timeout: 60000,
            headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json'
        })
            .then(response=>{commit('doSearchUserAttackCount',response.data)})
            .catch(error=>{console.log("error=%o",error)})
            .finally(()=>{});
    },

}

const mutations={
    doSearchUserAttackCount(state,data){
        console.log("doSearchUserAttackCount data=%o",data.data);
        if(data.data==null){
            return;
        }
        state.userAttacktype=data.data.attacktype;
    }

}

const getter={

}

const moduleUserAttackCount={
    state:state,
    mutations:mutations,
    actions:actions,
    getter:getter
}

export default moduleUserAttackCount;
