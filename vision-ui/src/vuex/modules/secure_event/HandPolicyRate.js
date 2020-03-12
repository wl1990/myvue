import axios from 'axios'

const state={
    pieColor:{
        "未处理":"#D70A64",
        "已处理":"#FACD19",
        "忽略":"#96CDCD",
    },
    plotHandleValueMap: {
           /* "人工解封":[23,56,3],
            "用户解封":[213,506,3],
        "用户解封23":[213,506,3],
        "用户解封45":[213,506,3],
        "用户解封67":[213,506,3],
        "用户解封89":[213,506,3],
        "用户解封10":[213,506,3],
        "用户解封11":[213,506,3],*/

    },
    pickerOptions: {
        shortcuts: [{
            text: '最近一周',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近一个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近三个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
            }
        }]
    },
    option : {
        color:['#D70A64','#FF6B00', '#FACD19', '#96CDCD', '#518AFF','#5236F3',  '#8336F3', '#D636F3','#228B22', '#f46570', '#51FF66','#8DB6CD','#8B8B00','#7A7A7A','#1C86EE','#104E8B','#191970','#B3EE3A'],
        textStyle:{
            color:'#1b1b1b',
        },
        title: [{
            text: '事件人工处理率',
            textStyle:{
                color:'#1b1b1b',
            },
            left:20,
        },],
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['bar']},
                restore: {},
                saveAsImage: {}
            },
            right:20,
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 5,
            top: 25,
            bottom: 20,
            data:[],
            textStyle:{
                color:'#1b1b1b',
            },
        },
        grid:{
            left:'5%',
            right:'20%',
            bottom: 20,
        },
        series: [
        ]
    },
}

const actions={
    policyHandleRateAction({commit},payload){
        axios.get('/secure_event/policyHandleRateCount.json',{
            params: payload,
            headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json'
        })
            .then(response=>{commit('doPolicyHandleRateAction',response.data)})
            .catch(error=>{console.log(error)})
            .finally(()=> {});

    },

}

const mutations={
    doPolicyHandleRateAction(state,data){
        if(data==undefined || data==null){
            return;
        }
        state.plotHandleValueMap=data.data.plotHandleValueMap;
    }

}

const getter={

}

const moduleHandPolicyRate={
    state:state,
    mutations:mutations,
    actions:actions,
    getter:getter
}

export default moduleHandPolicyRate;