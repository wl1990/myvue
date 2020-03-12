import axios from 'axios'

const state={
    option : {
        textStyle:{
            color:'#FFFFFF',
        },
        title: {
            text: 'IP TOP',
            subtext: 'waf ip top',
            textStyle:{
                color:'#ffffff'
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },

        legend: {
            data: ['IP TOP']
        },
        grid: {
            left: '1%',
            right: '6%',
            bottom: '3%',
            containLabel: true
        },
        itemStyle:{
            color:'#218868',
            opacity:1,
        },
        dataset:{
            source:[
                ['product','amount'],
                ['127.0.0.1',1820],
                ['127.0.0.2',2348],
                ['127.0.0.3',2903],
                ['127.0.0.4',3049],
                ['127.0.0.5',4317],
                ['127.0.0.6',6302],
            ]
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            splitNumber:3,
            axisTick:{
                show:false,
            },
            axisLine:{
                lineStyle:{

                },
            },
        },
        yAxis: {
            type: 'category',
            nameTextStyle:{
                fontWeight:'lighter',
            },
            axisTick:{
                show:false,
            },
            axisLabel:{
                show:true,
            },

        },
        series: [
            {
                type: 'bar',
                barWidth: '60%',
                encode: {
                    // 将 "amount" 列映射到 X 轴。
                    x: 'amount',
                    // 将 "product" 列映射到 Y 轴。
                    y: 'product'
                }
            },
        ]
    },

}

const actions={


}

const mutations={

}

const getter={

}

const moduleWafIpTop={
    state:state,
    mutations:mutations,
    actions:actions,
    getter:getter
}

export default moduleWafIpTop;