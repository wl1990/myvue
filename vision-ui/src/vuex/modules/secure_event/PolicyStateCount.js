import axios from 'axios'

const state={
    plotStatusValueMap: {

         /*    "人工解封":[["pl","12222"],["op","23222"],["op1","1000"]],
             "用户解封":[["pl","222"],["op","332"],["op1","0"]],*/

    },
    pickerOptions: {
        shortcuts: [
            {
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
        title: {
            text: '策略状态分布',
            textStyle:{
                color:'#1b1b1b',
            },
            left:20,
        },
        tooltip : {
            trigger: 'axis',
            // backgroundColor:'#3A57C1',
            formatter:function(params){
                var label=params[0]['axisValueLabel']+'<br/>';
                for(var i=0;i<params.length;i++){
                    if(params[i]['value'][1]>0.01){
                        label+=params[i]['marker']+params[i]['seriesName']+":"+params[i]['value'][1]+'<br/>';
                    }
                }
                return label;
            },
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line','bar']},
                restore: {},
                saveAsImage: {}
            },
            right:20,
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 20,
            top: 30,
            bottom: 20,
            data:[],
            textStyle:{
                color:'#1b1b1b',
            },
        },
        grid:{
            left:'10%',
            right:'15%',
            bottom: 150,
        },
        xAxis:  {
            type: 'category',
            axisLabel:{
                rotate:40,
                fontSize:10,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#DDD']
                }
            },
        },
        yAxis: {
            type: 'value',
            splitLine: {show: false},
        },
        series: [
        ]
    },
}

const actions={
    policyStateAction({commit},payload){
        axios.get('/secure_event/autoManuPolicyStateCount.json',{
            params: payload,
            timeout: 200000,
            headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json'
        })
            .then(response=>{commit('doPolicyStateAction',response.data)})
            .catch(error=>{console.log(error)})
            .finally(()=> {});
    },

}

const mutations={
    doPolicyStateAction(state,data){
        if(data==undefined || data==null || data.data==null || data.data==undefined){
            return;
        }
        state.plotStatusValueMap=data.data.plotStatusValueMap;
    }
}

const getter={

}

const modulePolicyState={
    state:state,
    mutations:mutations,
    actions:actions,
    getter:getter
}

export default modulePolicyState;
