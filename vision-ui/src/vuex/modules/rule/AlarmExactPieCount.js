import axios from "axios";

const state={
    alarmExactTimesMap:{
        "准确告警":222222,
        "验证告警":1111,
        "错误告警":333,
        "无效告警":55555
    },
    colors:{

    },
    hours:24,
    option : {
        title: {
            text: '告警准确度分布',
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
                        fontSize: '12',
                        fontWeight: 'lighter'
                    },
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
                        width:0.5
                    }
                },
                radius : ['30%','45%'],
                center: ['50%', '52%'],
                minAngle:5,
                startAngle:200,
                data:[
                ]
            },
        ]
    },

}

const actions={
    searchAlarmExactPercent({commit}){
        state.alarmExactTimesMap=null;
        axios.get('/intercept/alarmExactCount.json',{
            params: {'hours':state.hours},
            timeout: 60000,
            headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json'
        })
            .then(response=>{commit('doSearchAlarmExactPercent',response.data)})
            .catch(error=>{console.log("error=%o",error)})
            .finally(()=>{});
    },


}

const mutations={
    doSearchAlarmExactPercent(state,data){
        console.log("doSearchAlarmExactPercent data=%o",data.data);
        if(data.data==null){
            return;
        }
        state.alarmExactTimesMap=data.data.attacktype;
    }
}

const getter={

}

const moduleAlarmExactCount={
    state:state,
    mutations:mutations,
    actions:actions,
    getter:getter
}

export default moduleAlarmExactCount;
