import axios from 'axios'

const state={
    timeValueMap:{
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
        textStyle:{
            color:'#1b1b1b',
        },
        title: {
            text: '安全事件趋势',// bastion的规则 这里叫策略
            textStyle:{
                color:'#1b1b1b',
            },
            left:20,
        },
        label:{
            show:true,
        },
        tooltip: {
            trigger: 'axis',
            // backgroundColor:'#3A57C1',
         /*   formatter:function(params){
                var label=params[0]['name']+'<br/>';
                for(var i=0;i<params.length;i++){
                    if(params[i]['value'][(i+1)]>0){
                        label+=params[i]['marker']+params[i]['seriesName']+":"+params[i]['value'][(i+1)]+'<br/>';
                    }
                }
                return label;
            },*/
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
        legend: {
            orient: 'vertical',
            right: 20,
            top: 30,
            selected:{},
            data:[
                    {
                        name:'自动处理',
                        icon:'roundRect'
                    },
                    {
                        name:'手动处理',
                        icon:'roundRect',
                    }
                ],
            textStyle:{
                color:'#1b1b1b',
            },
        },
        grid:{
            left:'10%',
            right:'15%',
            bottom: 40,
        },
        xAxis: {
            type: 'category',
            data:[]

        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                type: 'line',
                smooth: false,
                seriesLayoutBy: 'row',
                symbol:'emptyCircle',
                symbolSize:8,
                name:'自动处理',
                data:[],
                label:{
                    show:true,
                    position:'top',
                    fontSize:10,
                },
            },
            {
                type: 'line',
                smooth: false,
                seriesLayoutBy: 'row',
                symbol:'emptyCircle',
                symbolSize:8,
                name:'手动处理',
                data:[],
                label:{
                    show:true,
                    position:'top',
                    fontSize:10,
                },
            },
        ]
    },

}

const actions={
    secureEventTrend({commit},payload){
        axios.get('/secure_event/secureTotalTrend.json',{
            params: payload,
            timeout: 200000,
            headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json'
        })
            .then(response=>{commit('doSecureEventTrend',response.data)})
            .catch(error=>{console.log(error)})
            .finally(()=> {});
    },

}

const mutations={
    doSecureEventTrend(state,data){
        if(data==undefined || data==null){
            return;
        }
        console.log("trend data.timeValueMap=%o",data.data.timeValueMap);
        state.timeValueMap=data.data.timeValueMap;
    }

}

const getter={

}

const moduleSecureTotalTrend={
    state:state,
    mutations:mutations,
    actions:actions,
    getter:getter
}

export default moduleSecureTotalTrend;
