import axios from 'axios'

const state={
 dataAxis : ['下载', '登录', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'],
  data : [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220],
 yMax : 500,
 dataShadow :[],
    option : {
        textStyle:{
            color:'#FFFFFF',
        },
        title: {
            text: '异常用户',
            subtext: '操作超过阈值',
            textStyle:{
                color:'#FFFFFF',
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            data: [],
            axisLabel: {
                inside: true,
                textStyle: {
                    color: '#fff'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            label:{
              position:'bottom',
                rotate:-90,
            },
            z: 10
        },
        yAxis: {
            name:'异常用户数',
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#999'
                }
            }
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        series: [
            { // For shadow
                type: 'bar',
                itemStyle: {
                    normal: {color: 'rgba(0,0,0,0.05)'}
                },
                barGap:'-100%',
                barCategoryGap:'40%',
                data:[],
                animation: false
            },
            {
                type: 'bar',
                itemStyle: {
                    normal: {

                    },
                    emphasis: {

                    }
                },
                data: this.data,
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

const moduleOverLimit={
    state:state,
    mutations:mutations,
    actions:actions,
    getter:getter
}

export default moduleOverLimit;