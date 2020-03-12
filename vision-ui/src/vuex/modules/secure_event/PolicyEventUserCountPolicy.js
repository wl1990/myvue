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
            text: '策略事件用户分布',
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
            formatter:function(params){
                var label=params[0]['axisValueLabel']+'<br/>';
                for(var i=0;i<params.length;i++){
                    label+=params[i]['marker']+params[i]['seriesName']+":"+params[i]['value']+'<br/>';

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
            type : 'category',
            axisLabel:{
                rotate:40,
                fontSize:10
            },
            axisTick: {
                length:10,

            },
            data : []
        },
        yAxis: {
            type:'value',
            axisLabel:{
                fontSize:10,
                fontWeight:100,
                color:'#1b1b1b',
            },
        },
        grid:{
          left:'10%',
          right:'22%',
          bottom: 150,
        },
        series: [
        ],
    },
}

const actions={
    searchUserPolicyTrend({commit},payload){
        axios.get('/secure_event/autoManuUserPolicyCountTrend.json',{
            params: payload,
            timeout: 200000,
            headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json'
        })
            .then(response=>{commit('doAutoManuUserPolicyCountTrend',response.data)})
            .catch(error=>{console.log(error)})
            .finally(()=> {});
    },

}

const mutations={
    doAutoManuUserPolicyCountTrend(state,data){
        if(data==undefined || data==null){
            return;
        }
        console.log("nameValueMaplist=%o",data.data.nameValueMaplist);
        state.nameValueMaplist=data.data.nameValueMaplist;
    }
}

const getter={

}

const moduleUserPolicyEventCount={
    state:state,
    mutations:mutations,
    actions:actions,
    getter:getter
}

export default moduleUserPolicyEventCount;
