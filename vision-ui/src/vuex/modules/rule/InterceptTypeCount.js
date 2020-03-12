import axios from 'axios'

const state={
    interceptType:[],
   /* colors:{
        '经理人':'#4CD964', '猎头':'#3E89FF', '企业自由用户':'#D70A64', '未知':'#FACD19', '企业HR':'#FF6B00',
        '爬虫':'#D70A64','异常行为':'#FF6B00','ATS':'#4CD964','高频访问':'#518AFF','访问上限':'#5236F3',
        '黑名单':'#8336F3','黑客攻击':'#FACD19','账号攻击':'#D636F3','业务漏洞':'#F33678',
        'passport-禁止访问':'#4CD964','passport-账号禁用':'#D70A64','passport-修改密码':'#518AFF','passport-手机验证':'#FF6B00','passport-图形验证码':'#20B2AA',
        'nginx-禁止访问':'#FACD19','nginx-图形验证码':'#D636F3',
        'clean':'#1b1b1b'},*/
   colors:{},
    option : {
        title : {
            text: '拦截方式',
            textStyle: {
                fontSize: 14,
                fontWeight: 100,
                fontFamily: 'PingFangSC-Semibold',
                color: '#FFFFFF',
                lineHeight: 16,
            },
            padding: [20,0,0,20],
            subtext: '2小时数据',
            subtextStyle:{
                align: 'left',
                fontSize: 12,
                fontWeight: 100,
                fontFamily: 'PingFangSC-Semibold',
                color: '#FFFFFF',
            },
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
                name: '拦截方式',
                type: 'pie',
                label: {
                    show: true,
                    color:'#FACD19',
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
                    lineStyle:{
                        color:'#FACD19',
                    }
                },
                radius : ['45%','70%'],
                center: ['50%', '50%'],
                minAngle:20,
                startAngle:270,
                data:[
                ],
            }
        ]
    },

}

const actions={
    getInterceptPercent({commit}){
        axios.get('/intercept/getInterceptPercent.json',{
            params: null,
            timeout: 25000,
            headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json'
        })
            .then(response=>{commit('doGetInterceptPercent',response.data)})
            .catch(error=>{console.log("error=%o",error)})
            .finally(()=>{});
    },

}

const mutations={
    doGetInterceptPercent(state,data){
        if(data.data==null){
            return;
        }
        state.interceptType=data.data.interceptType;
    }
}

const getter={

}

const moduleInterceptTypeCount={
    state:state,
    mutations:mutations,
    actions:actions,
    getter:getter
}

export default moduleInterceptTypeCount;
