import axios from 'axios'

const state={
    option : {
        title: {
            text: '拦截对象的分布',
            subtext:'一天数据',
            textStyle:{
                color:'#FFFFFF',
            },
            left:'center',
        },
        legend: {
            show:false,
        },
        xAxis: {
            name:'拦截类型',
            type: 'value',
            minInterval: 1,
            maxInterval:1,
            scale: true,
            splitLine: {
                lineStyle: {
                    type: 'solid',
                    color:['#EEEE00'],
                    opacity:0.3,
                }
            },
            axisTick:{
                show:false,
            },
            axisLine:{
                lineStyle:{
                    color:'#FFFFFF',
                },
            },
            axisLabel : {
                padding:[0,0,0,55],
                formatter: function (value, index) {
                    var xlabel='';
                    switch (value) {
                        case 1:
                            xlabel= 'passport\n禁止访问';
                            break;
                        case 2:
                            xlabel= 'passport\n账号禁用';
                            break;
                        case 3:
                            xlabel= 'passport\n修改密码';
                            break;
                        case 4:
                            xlabel= 'passport\n手机验证';
                            break;
                        case 5:
                            xlabel= 'passport\n图形验证码';
                            break;
                        case 6:
                            xlabel= 'nginx\n禁止访问';
                            break;
                        case 7:
                            xlabel= 'nginx\n图形验证码';
                            break;
                        case 8:
                            xlabel= '手动处理';
                            break;
                    }
                    return xlabel;
                },
            },
        },
        yAxis: {
            name:'拦截对象',
            type: 'value',
            minInterval: 1,
            maxInterval:1,
            splitLine: {
                lineStyle: {
                    type: 'solid',
                    color:['#EEEE00'],
                    opacity:0.3,
                }
            },
            scale: true,
            axisTick:{
                show:false,
            },
            axisLine:{
                lineStyle:{
                    color:'#FFFFFF',
                },
            },
            axisLabel : {
                padding:[0,0,80,0],
                formatter: function (value, index) {
                    var ylabel='';
                    switch(value){
                        case 1:
                            ylabel='IP';
                            break;
                        case 2:
                            ylabel='IP_UA';
                            break;
                        case 3:
                            ylabel='userid_ip';
                            break;
                        case 4:
                            ylabel='compid_ip';
                            break;
                        case 5:
                            ylabel='userId';
                            break;
                        case 6:
                            ylabel='compyId';
                            break;
                    }
                    return ylabel;
                }
            },
        },
        dataset: {
            source: [
                // 每一列称为一个『维度』。
                // 这里分别是维度 0、1、2、3、4。
                [1.1, 1.5, 95, 'fff'],
                [1.2, 1.6, 95, 'ccc'],
                [2.4, 2.3, 130, 'eee'],
                [3.4, 3.5, 660, 'eee'],
                [4.5, 3.4, 660, 'eee'],
                [5.6, 3.9, 660, 'eee'],
                [6.7, 3.1, 660, 'eee'],
                [7.8, 1.6, 660, 'eee'],
                [8.9, 5.6, 660, 'eee'],
                [8.2, 5.7, 660, 'eee'],
                [8.2, 6.7, 660, 'eee'],
            ]
        },
        series: [{
            name: '1990',
            type: 'scatter',
            dimensions: ['ruleType', 'countDimension', 'radio','source'],
            encode: {
                x: ['ruleType'],
                y: ['countDimension'],
            },
            symbol:'circle',
            symbolSize: function (data) {
                return Math.sqrt(data[2]);
            },
            label: {
                emphasis: {
                    show: true,
                    formatter: function (param) {
                        return param.data[3];
                    },
                    position: 'top'
                }
            },
            itemStyle: {
                normal: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(120, 36, 50, 0.5)',
                    shadowOffsetY: 5,
                    color:{
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.6,
                        colorStops: [{
                            offset: 0, color: '#90EE90' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#90EE90' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    opacity:0.5,
                }
            }
        },
            /*    {
                name: '2015',
                data: [],
                type: 'scatter',
                symbolSize: function (data) {
                    return Math.sqrt(data[2]) / 5e2;
                },
                label: {
                    emphasis: {
                        show: true,
                        formatter: function (param) {
                            return param.data[3];
                        },
                        position: 'top'
                    }
                },
                itemStyle: {
                    normal: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(25, 100, 150, 0.5)',
                        shadowOffsetY: 5,
                    }
                }
            }*/
        ]
    },

}

const actions={


}

const mutations={

}

const getter={

}

const moduleInterceptDimensionScatter={
    state:state,
    mutations:mutations,
    actions:actions,
    getter:getter
}

export default moduleInterceptDimensionScatter;