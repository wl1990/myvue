import axios from 'axios'

const state={
    nameValueMaplist:[],
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
        title: {
            text: '策略事件分布',
            subtext:'',
            textStyle:{
                color:'#1b1b1b',
            },
            left:20,
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
                fontSize:10,
            },
        },
        tooltip: {
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
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            },
            right:20,
        },

        xAxis: {
            type: 'time',
            // splitNumber:7,
        },
        yAxis: {
            type:'value',
            // type: 'log',
            // logBase:1.1,
            // min:1,
            axisLabel:{
                fontSize:10,
                fontWeight:100,
                color:'#1b1b1b',
             /*   formatter:function (value, index) {
                    return String(value).split(".")[0];
                },*/
            },
        },
        grid:{
          left:'10%',
          right:'22%',
          bottom: 40,
        },
        series: [],
    },
}

const actions={
    searchTrend({commit},payload){
        axios.get('/secure_event/autoManuPolicyTrend.json',{
            params: payload,
            timeout: 200000,
            headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json'
        })
            .then(response=>{commit('doAutoManuPolicyTrend',response.data)})
            .catch(error=>{console.log(error)})
            .finally(()=> {});
    },

}

const mutations={
    doAutoManuPolicyTrend(state,data){
        if(data==undefined || data==null){
            return;
        }
        state.nameValueMaplist=data.data.nameValueMaplist;
    }
}

const getter={

}

const modulePolicyEvent={
    state:state,
    mutations:mutations,
    actions:actions,
    getter:getter
}

export default modulePolicyEvent;
