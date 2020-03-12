import axios from 'axios'

const state={
    dataParam:{
        startTime:'',
        endTime:'',
        segment:1,
    },
    interceptValueMap:{},
    interceptTypeEnumMap:{},
    newInterceptValueMap:{},
    monthInterceptValueMap:{},
    weekInterceptValueMap:{},
    searchDays:1,
    selectLegend:[
        {
        name:'一天',
        icon:'roundRect',
    },{
        name:'一周',
        icon:'roundRect',
    },{
        name:'一月',
        icon:'roundRect',
    }],
    option : {
        color:['#D70A64','#FF6B00', '#FACD19', '#4CD964', '#518AFF','#5236F3',  '#8336F3', '#D636F3','#228B22', '#f46570', '#51FF66'],
        title: {
            text: '拦截类型趋势',
            subtext: '',
            textStyle: {
                fontSize: 18,
                fontWeight: 100,
                fontFamily: 'PingFangSC-Semibold',
                color: '#FFFFFF',
                lineHeight: 16,
            },
            padding: [20,0,0,20],
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor:'#3A57C1',
            formatter:function(params){
                var label=params[0]['axisValueLabel']+'<br/>';
                for(var i=0;i<params.length;i++){
                    if(params[i]['value'][1]>0.01){
                        label+=params[i]['marker']+params[i]['seriesName']+":"+params[i]['value'][1]+'<br/>';
                    }
                }
                return label;
            },
            textStyle:{
                fontWeight:100,
                fontSize:10,
                // color:'#ffffff',
            }
        },
        legend: {
            data:[],
            textStyle:{
                fontWeight:100,
                fontSize:10,
                color:'#ffffff',
            },
            top:20,
            left:'15%',
        },
        grid: {top: '15%',right:'5%'},
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            },
            axisLabel:{
                fontSize:10,
                fontWeight:100,
                color:'#FFFFFF',
            },
        },
        yAxis: {
            type: 'log',
            min:1,
            splitLine: {
                show: false
            },
            axisLabel:{
                fontSize:10,
                fontWeight:100,
                color:'#FFFFFF',
            },
        },
        dataZoom: [
            {
                backgroundColor:'#262857',
                borderColor:'#262857',
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleStyle: {
                    color: '#FACD19',
                },
                fillerColor:'#2E3183',
                filterMode: 'filter',
                bottom:15,
                height:12,

            }
        ],
        series: [
            {
                name: '一天',
                type: 'line',
                data: [],
            },
            {
                name: '一周',
                type: 'line',
                data: [],
            },
           /* {
                name: '一月',
                type: 'line',
                data: [],
            },*/

        ]
    },

}

const actions={
    getInterceptTrend({commit},param){
        axios.get('/intercept/initInterceptTrend.json',{
            params: param,
            headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json'
        })
            .then(response=>{commit('doGetInterceptTrend',response.data)})
            .catch(error=>{console.log("error=%o",error)})
            .finally(()=>{});
    },
    intercepttrendRefreshData({commit},param){
        axios.get('/intercept/interceptTrend.json',{
            params: param,
            headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json'
        })
            .then(response=>{commit('doIntercepttrendRefreshData',response.data)})
            .catch(error=>{console.log("error=%o",error)})
            .finally(()=>{});
    },
    daysIntercepttrendData({commit},param){
        axios.get('/intercept/daysInterceptTrend.json',{
            params: param,
            headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json'
        })
            .then(response=>{commit('doDaysIntercepttrendData',response.data)})
            .catch(error=>{console.log("error=%o",error)})
            .finally(()=>{});
    },

}

const mutations={
    doGetInterceptTrend(state,data){
        if(data.data==null){
            return;
        }
        state.option.series.splice(2,state.option.series.length-2);
        state.interceptValueMap=data.data.interceptTrendMap;
        state.interceptTypeEnumMap=data.data.interceptTypeEnumMap;
    },
    doIntercepttrendRefreshData(state,data){
        if(data.data==null){
            return;
        }
        state.newInterceptValueMap=data.data.interceptTrendMap;
        state.interceptTypeEnumMap=data.data.interceptTypeEnumMap;
    },
    doDaysIntercepttrendData(state,data){
        if(data.data==null){
            return;
        }
        state.option.series.splice(2,state.option.series.length-2);
        if(state.searchDays==7){
            state.weekInterceptValueMap=data.data.interceptTrendMap;
            state.interceptTypeEnumMap=data.data.interceptTypeEnumMap;
        }
        if(state.searchDays==30){
            state.monthInterceptValueMap=data.data.interceptTrendMap;
            state.interceptTypeEnumMap=data.data.interceptTypeEnumMap;
        }
    },
}

const getter={

}

const moduleInterceptTrendLine={
    state:state,
    mutations:mutations,
    actions:actions,
    getter:getter
}

export default moduleInterceptTrendLine;
