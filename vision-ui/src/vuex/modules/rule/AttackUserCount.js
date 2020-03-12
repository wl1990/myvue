import axios from "axios";

const state={
    userAttackTimesMap:{
        '经理人':222, '猎头':3333, '企业自由用户':22, '未知':12, '企业HR':233
    },
/*    colors:{
        '经理人':'#4CD964', '猎头':'#3E89FF', '企业自由用户':'#D70A64', '未知':'#FACD19', '企业HR':'#FF6B00', '系统':'#8336F3',
        '爬虫':'#D70A64','异常行为':'#FF6B00','ATS':'#4CD964','高频访问':'#518AFF','访问上限':'#5236F3',
        '黑名单':'#8336F3','黑客攻击':'#FACD19','账号攻击':'#D636F3','业务漏洞':'#F33678',
        'passport-禁止访问':'#4CD964','passport-账号禁用':'#D70A64','passport-修改密码':'#518AFF','passport-手机验证':'#FF6B00','passport-图形验证码':'#20B2AA',
        'nginx-禁止访问':'#FACD19','nginx-图形验证码':'#D636F3',
        'clean':'#1b1b1b'},*/
    colors:{

    },
    hours:24,
    option : {
        title: {
            text: '告警用户统计',
            textStyle:{
                fontSize:12,
                fontWeight:100,
                fontFamily:'PingFangSC-Semibold',
                color:'#FFFFFF',
                lineHeight:16,
            },
            // subtext: '24小时数据',
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
            data: []
        },
        series: [
            {
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
                startAngle:200,
                data:[
                ]
            },
        ]
    },

}

const actions={
    searchUserPercent({commit}){
        state.userAttackTimesMap=null;
        axios.get('/intercept/getAttackUserPercent.json',{
            params: {'hours':state.hours},
            timeout: 60000,
            headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json'
        })
            .then(response=>{commit('doSearchUserPercent',response.data)})
            .catch(error=>{console.log("error=%o",error)})
            .finally(()=>{});
    },


}

const mutations={
    doSearchUserPercent(state,data){
        if(data.data==null){
            return;
        }
        state.userAttackTimesMap=data.data.userAttackTimesMap;
    }
}

const getter={

}

const moduleAttackUserCount={
    state:state,
    mutations:mutations,
    actions:actions,
    getter:getter
}

export default moduleAttackUserCount;
