import axios from 'axios'

const state={
    dataParam:{
        startTime:'',
        endTime:'',
        segment:1,
    },
    attackValueMap:{}, // {"黑名单":["201901010000_1","201901010001_1"]}
    newAttackValueMap:{},
    monthAttackValueMap:{},
    weekAttackValueMap:{},
    searchDays:1,
    selectLegend:[{
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
            text: '攻击类型趋势',
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
            selected:{},
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
                // saveAsImage: {}
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
            splitLine: {
                show: false
            },
            min:1,
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
            /*{
                name: '一月',
                type: 'line',
                data: [],
            },*/
        ],
    },
}

const actions={
    getAttackTrend({commit},param){
        axios.get('/intercept/initAttackTrendLine.json',{
            params: param,
            headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json'
        })
            .then(response=>{commit('doGetAttackTrend',response.data)})
            .catch(error=>{console.log("error=%o",error)})
            .finally(()=>{});
    },
    attacktrendRefreshData({commit},param){
        axios.get('/intercept/attackTrend.json',{
            params: param,
            headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json'
        })
            .then(response=>{commit('doAttacktrendRefreshData',response.data)})
            .catch(error=>{console.log("error=%o",error)})
            .finally(()=>{});
    },
    daysAttacktrendData({commit},param){
        axios.get('/intercept/daysAttackTrend.json',{
            params: param,
            headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json'
        })
            .then(response=>{commit('doDaysAttacktrendData',response.data)})
            .catch(error=>{console.log("error=%o",error)})
            .finally(()=>{});
    },
    searchDetail({commit},param){
        axios.get('/intercept/attackDetail.json',{
            params: param,
            headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json'
        })
            .then(response=>{commit('doAttackDetail',response.data)})
            .catch(error=>{console.log("error=%o",error)})
            .finally(()=>{});
    },

}

const mutations={
    doGetAttackTrend(state,data){
        if(data.data==null){
            return;
        }
        state.option.series.splice(2,state.option.series.length-2);
        state.attackValueMap=data.data.attackTrendMap;
    },
    doAttacktrendRefreshData(state,data){
        if(data.data==null){
            return;
        }
        state.newAttackValueMap=data.data.attackTrendMap;
    },
    doDaysAttacktrendData(state,data){
        if(data.data==null){
            return;
        }
        state.option.series.splice(2,state.option.series.length-2);
        if(state.searchDays==7){
            state.weekAttackValueMap=data.data.attackTrendMap;
        }
        if(state.searchDays==30){
            state.monthAttackValueMap=data.data.attackTrendMap;
        }
    },
    doAttackDetail(state,data){
        if(data.data==null){
            return;
        }
        console.log("doAttackDetail data=%o",data.data);
    },

}

const getter={

}

const moduleAttackTrendLine={
    state:state,
    mutations:mutations,
    actions:actions,
    getter:getter
}

export default moduleAttackTrendLine;
