import axios from 'axios'
import Vue from 'vue'
const state={
    option : {
        router:false,
        color:['#A52A2A','#FF1493', '#00CD66', '#9400D3', '#FFFFFF','#0000FF',  '#ca8622', '#FFFF00','#228B22', '#f46570', '#00CD66'],
        textStyle:{
            color:'#FFFFFF',
        },
        title: {
            text: '拦截对象',
            subtext: '拦截对象统计',
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
                ['userId',120, 132, 101, 134, 90, 230, 210],
                ['userid_ip',220, 182, 191, 234, 290, 330, 310],
                ['ip',250, 232, 201, 254, 190, 330, 410],
                ['ip_ua',320, 332, 301, 334, 390, 330, 320],
                ['compid',310, 302, 351, 364, 390, 330, 420],
                ['compid_ip',110, 302, 301, 164, 90, 130, 220],
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
    search({commit},param){
        console.log('search param=%o ',param);
    },

}

const mutations={

}

const getter={

}

const modulewafAttack={
    state:state,
    mutations:mutations,
    actions:actions,
    getter:getter
}

export default modulewafAttack;
