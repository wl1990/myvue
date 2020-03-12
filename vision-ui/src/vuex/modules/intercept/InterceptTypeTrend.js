import axios from 'axios'

const state={
    option : {
        color:['#A52A2A','#FF1493', '#00CD66', '#9400D3', '#FFFFFF','#0000FF',  '#ca8622', '#FFFF00','#228B22', '#f46570', '#00CD66'],
        textStyle:{
            color:'#FFFFFF',
        },
        title: {
            text: '拦截类型',
            subtext: '拦截类型统计',
            textStyle:{
                color:'#FFFFFF',
            },

        },
        tooltip: {
            trigger: 'axis',
            showContent: true,
        },
        legend: {
            textStyle:{
                color:'#FFFFFF',
            },
            data:[],
        },
        grid: {top: '45%'},
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        dataset:{
            source:[
                ['product','周一','周二','周三','周四','周五','周六','周日'],
                ['passport-禁止访问',120, 132, 101, 134, 90, 230, 210],
                ['passport-账号禁用',220, 182, 191, 234, 290, 330, 310],
                ['passport-修改密码',250, 232, 201, 254, 190, 330, 410],
                ['passport-手机验证',320, 332, 301, 334, 390, 330, 320],
                ['passport-图形验证码',310, 302, 351, 364, 390, 330, 420],
                ['nginx-禁止访问',110, 302, 301, 164, 90, 130, 220],
                ['nginx-图形验证码',370, 202, 311, 304, 200, 130, 160],
                ['手动处理',210, 212, 331, 374, 190, 140, 129],
            ]
        },
        xAxis: {
            type: 'category',
        },
        yAxis: {gridIndex: 0},
        series: [
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {
                type: 'pie',
                id: 'pie',
                radius : ['23%','30%'],
                center: ['50%', '20%'],
                label: {
                    formatter: '{b}: {@周一} ({d}%)'
                },
                encode: {
                    itemName: 'product',
                    value: '周一',
                    tooltip: '周一'
                }
            }
        ]
    },

}

const actions={


}

const mutations={

}

const getter={

}

const moduleTypeTrend={
    state:state,
    mutations:mutations,
    actions:actions,
    getter:getter
}

export default moduleTypeTrend;