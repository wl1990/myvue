import axios from 'axios'

const state={
    colors:{
        '经理人':'#4CD964', '猎头':'#3E89FF', '企业自由用户':'#D70A64', '未知':'#FACD19', '企业HR':'#FF6B00',
        '爬虫':'#D70A64','异常行为':'#FF6B00','ATS':'#4CD964','高频访问':'#518AFF','访问上限':'#5236F3',
        '黑名单':'#8336F3','黑客攻击':'#FACD19','账号攻击':'#D636F3','业务漏洞':'#F33678',
        'passport-禁止访问':'#4CD964','passport-账号禁用':'#D70A64','passport-修改密码':'#518AFF','passport-手机验证':'#FF6B00','passport-图形验证码':'#20B2AA',
        'nginx-禁止访问':'#FACD19','nginx-图形验证码':'#D636F3',
        'clean':'#1b1b1b'},
    attackInterceptMap:{
        "爬虫":{'passport-禁止访问':3,'passport-账号禁用':45},
        "异常行为":{'passport-禁止访问':45},
        "ATS":{'passport-禁止访问':4,},
        "高频访问":{'passport-图形验证码':8,'nginx-禁止访问':7,},
        "访问上限":{'passport-禁止访问':8,'passport-账号禁用':6,'passport-修改密码':9},
        "黑客攻击":{'nginx-禁止访问':2334},
    },
    attackValueMap:{
        "爬虫":0,
        "异常行为":5,
        "ATS":65,
        "高频访问":22,
        "访问上限":55,
        "黑客攻击":5555,
    },
    userAttackTimesMap:{
      "经理人":12,
      "未知":2222,
        "企业自由用户":222,
    },
    interceptValueMap:{
        'passport-禁止访问':23,
        'passport-账号禁用':53,
        'passport-修改密码':13,
        'passport-手机验证':63,
        'passport-图形验证码':223,
        'nginx-禁止访问':2030,
    },
    attackUsers: {
        "爬虫": [
            {
                name:'爬虫公司',
                value:13,
            },
            {
                name:'某某公司',
                value:13,
            },
            {
                name:'某某',
                value:3,
            },
            {
                name:'你好123',
                value:33,
            },
            {
                name:'某某科技有限公司',
                value:53,
            },
        ],
        "异常行为": [
            {
                name:'exception某某公司',
                value:13,
            },
            {
                name:'exception某某',
                value:3333,
            },

        ],
        "ATS": [
            {
                name:'ats某某公司',
                value:3,
            },
            {
                name:'ats某某',
                value:3,
            },
            {
                name:'ats你好123',
                value:3,
            },
            {
                name:'ats某某科技有限公司',
                value:3,
            },
            {
                name:'ats某某科技有限公司1',
                value:3,
            },
            {
                name:'ats某某科技有限公司2',
                value:3,
            },
            {
                name:'ats某某科技有限公司3',
                value:5,
            },
            {
                name:'ats某某科技有限公司4',
                value:5,
            },
            {
                name:'ats某某科技有限公司5',
                value:5,
            },
            {
                name:'ats某某科技有限公司6',
                value:5,
            },
            {
                name:'ats某某科技有限公司7',
                value:3,
            },
            {
                name:'ats某某科技有限公司8',
                value:3,
            },
            {
                name:'ats某某科技有限公司81',
                value:3,
            },
            {
                name:'ats某某科技有限公司82',
                value:5,
            },
            {
                name:'ats某某科技有限公司83',
                value:3,
            },
            {
                name:'ats某某科技有限公司84',
                value:3,
            },
            {
                name:'ats某某科技有限公司811',
                value:3,
            },
            {
                name:'ats某某科技有限公司821',
                value:3,
            },
            {
                name:'ats某某科技有限公司831',
                value:3,
            },
            {
                name:'ats某某科技有限公司841',
                value:5,
            },
            {
                name:'ats某某科技有限公司812',
                value:3,
            },
            {
                name:'ats某某科技有限公司822',
                value:3,
            },
            {
                name:'ats某某科技有限公司832',
                value:3,
            },
            {
                name:'ats某某科技有限公司842',
                value:3,
            },
            {
                name:'ats某某科技有限公司813',
                value:3,
            },
            {
                name:'ats某某科技有限公司823',
                value:3,
            },
            {
                name:'ats某某科技有限公司833',
                value:3,
            },
            {
                name:'ats某某科技有限公司843',
                value:3,
            },
            {
                name:'ats某某科技有限公司814',
                value:3,
            },
            {
                name:'ats某某科技有限公司824',
                value:3,
            },
            {
                name:'ats某某科技有限公司834',
                value:3,
            },
            {
                name:'ats某某科技有限公司844',
                value:3,
            },
            {
                name:'ats某某科技有限公司815',
                value:3,
            },
            {
                name:'ats某某科技有限公司825',
                value:3,
            },
            {
                name:'ats某某科技有限公司835',
                value:3,
            },
            {
                name:'ats某某科技有限公司845',
                value:3,
            },
            {
                name:'ats某某科技有限公司816',
                value:3,
            },
            {
                name:'ats某某科技有限公司826',
                value:3,
            },
            {
                name:'ats某某科技有限公司836',
                value:3,
            },
            {
                name:'ats某某科技有限公司846',
                value:3,
            },
            {
                name:'ats某某科技有限公司817',
                value:3,
            },
            {
                name:'ats某某科技有限公司827',
                value:3,
            },
            {
                name:'ats某某科技有限公司837',
                value:5,
            },
            {
                name:'ats某某科技有限公司847',
                value:5,
            },
            {
                name:'ats某某科技有限公司818',
                value:5,
            },
            {
                name:'ats某某科技有限公司828',
                value:5,
            },
            {
                name:'ats某某科技有限公司838',
                value:5,
            },
            {
                name:'ats某某科技有限公司848',
                value:5,
            },
            {
                name:'ats某某科技有限公司819',
                value:5,
            },
            {
                name:'ats某某科技有限公司829',
                value:5,
            },
            {
                name:'ats某某科技有限公司839',
                value:5,
            },
            {
                name:'ats某某科技有限公司849',
                value:5,
            },
            {
                name:'ats某某科技有限公司8111',
                value:5,
            },
            {
                name:'ats某某科技有限公司8211',
                value:5,
            },
            {
                name:'ats某某科技有限公司8311',
                value:5,
            },
            {
                name:'ats某某科技有限公司8411',
                value:3,
            },
            {
                name:'ats某某科技有限公司8112',
                value:3,
            },
            {
                name:'ats某某科技有限公司8212',
                value:3,
            },
            {
                name:'ats某某科技有限公司8312',
                value:3,
            },
            {
                name:'ats某某科技有限公司8412',
                value:3,
            },
            {
                name:'ats某某科技有限公司8113',
                value:3,
            },
            {
                name:'ats某某科技有限公司8213',
                value:3,
            },
            {
                name:'ats某某科技有限公司8313',
                value:3,
            },
            {
                name:'ats某某科技有限公司8413',
                value:3,
            },
            {
                name:'ats某某科技有限公司8114',
                value:3,
            },
            {
                name:'ats某某科技有限公司8214',
                value:3,
            },
            {
                name:'ats某某科技有限公司8314',
                value:3,
            },
            {
                name:'ats某某科技有限公司8414',
                value:3,
            },
            {
                name:'ats某某科技有限公司8115',
                value:5,
            },
            {
                name:'ats某某科技有限公司8215',
                value:3,
            },
            {
                name:'ats某某科技有限公司8315',
                value:3,
            },
            {
                name:'ats某某科技有限公司8415',
                value:5,
            },
            {
                name:'ats某某科技有限公司181',
                value:3,
            },
            {
                name:'ats某某科技有限公司182',
                value:3,
            },
            {
                name:'ats某某科技有限公司183',
                value:3,
            },
            {
                name:'ats某某科技有限公司184',
                value:3,
            },
            {
                name:'ats某某科技有限公司q81',
                value:3,
            },
            {
                name:'ats某某科技有限公司282',
                value:3,
            },
            {
                name:'ats某某科技有限公司283',
                value:3,
            },
            {
                name:'ats某某科技有限公司284',
                value:3,
            },
            {
                name:'ats某某科技有限公司381',
                value:3,
            },
            {
                name:'ats某某科技有限公司382',
                value:3,
            },
            {
                name:'ats某某科技有限公司383',
                value:3,
            },
            {
                name:'ats某某科技有限公司384',
                value:3,
            },
            {
                name:'ats某某科技有限公司481',
                value:3,
            },
            {
                name:'ats某某科技有限公司482',
                value:3,
            },
            {
                name:'ats某某科技有限公司483',
                value:3,
            },
            {
                name:'ats某某科技有限公司484',
                value:3,
            },
            {
                name:'ats某某科技有限公司581',
                value:3,
            },
            {
                name:'ats某某科技有限公司582',
                value:3,
            },
            {
                name:'ats某某科技有限公司583',
                value:3,
            },
            {
                name:'ats某某科技有限公司584',
                value:3,
            },
            {
                name:'ats某某科技有限公司681',
                value:3,
            },
            {
                name:'ats某某科技有限公司682',
                value:3,
            },
            {
                name:'ats某某科技有限公司683',
                value:3,
            },
            {
                name:'ats某某科技有限公司684',
                value:3,
            },
            {
                name:'ats某某科技有限公司781',
                value:3,
            },
            {
                name:'ats某某科技有限公司782',
                value:3,
            },
            {
                name:'ats某某科技有限公司783',
                value:3,
            },
            {
                name:'ats某某科技有限公司784',
                value:3,
            },
            {
                name:'ats某某科技有限公司881',
                value:5,
            },
            {
                name:'ats某某科技有限公司882',
                value:3,
            },
            {
                name:'ats某某科技有限公司883',
                value:3,
            },
            {
                name:'ats某某科技有限公司884',
                value:3,
            },
            {
                name:'ats某某科技有限公司981',
                value:3,
            },
            {
                name:'ats某某科技有限公司982',
                value:3,
            },
            {
                name:'ats某某科技有限公司983',
                value:3,
            },
            {
                name:'ats某某科技有限公司984',
                value:3,
            },
        ],
        "高频访问":[
            {
                name:'访问某某公司',
                value:13,
            },
            {
                name:'访问某某',
                value:3,
            },
            {
                name:'访问你好123',
                value:33,
            },
            {
                name:'访问某某科技有限公司',
                value:53,
            },
        ],
        "访问上限": [
            {
                name:'访问上限某某公司',
                value:13,
            },
            {
                name:'访问上限某某',
                value:3,
            },
            {
                name:'访问上限你好123',
                value:33,
            },
            {
                name:'访问上限某某科技有限公司',
                value:53,
            },
        ],
        "黑名单": [
        ],
        "黑客攻击": [
            {
                name:'黑客攻击某某公司',
                value:13,
            },
            {
                name:'黑客攻击某某',
                value:3,
            },
            {
                name:'黑客攻击你好123',
                value:33,
            },
            {
                name:'黑客攻击某某科技有限公司',
                value:53,
            },
        ],
        "账号攻击":[

        ],
        "业务漏洞": [

        ],
    },
    interceptUsers:{
        "passport-禁止访问":[
            {
                name:'pt爬虫公司',
                value:13,
            },
            {
                name:'pt某某公司',
                value:13,
            },],
        "passport-账号禁用":[
            {
                name:'p爬虫公司',
                value:13,
            },
            {
                name:'p1爬虫公司',
                value:13,
            },
        ],
        "passport-修改密码":[
            {
                name:'pp爬虫公司',
                value:13,
            },
            {
                name:'pp1爬虫公司',
                value:13,
            },
        ],
        "passport-手机验证":[
            {
                name:'ppp爬虫公司',
                value:13,
            },
            {
                name:'ppp1爬虫公司',
                value:13,
            },
        ],
        "passport-图形验证码":[
            {
                name:'pppp爬虫公司',
                value:13,
            },
            {
                name:'ppppp1爬虫公司',
                value:13,
            },
        ],
        "nginx-禁止访问":[
            {
                name:'pn爬虫公司',
                value:13,
            },
            {
                name:'pn1爬虫公司',
                value:13,
            },
        ],
        "nginx-图形验证码":[
            {
                name:'pvn爬虫公司',
                value:13,
            },
            {
                name:'pvn1爬虫公司',
                value:13,
            },
        ],
    },
    attackTrendMap:{},
    interceptTrendMap:{},
    ipValueMap:{},
    attacktype:[
        {
        name: '爬虫',
        },
        {
            name: '异常行为',
        },
        {
            name: 'ATS',
        },
        {
            name: '高频访问',
        },
        {
            name: '访问上限',
        },
        {
            name: '黑名单',
        },
        {
            name: '黑客攻击',
        },
        {
            name: '账号攻击',
        },
        {
            name: '业务漏洞',
        },],
    bastion:[ {
        itemStyle:{
            color: '#20B2AA',
        },
        name: 'bastion系统',
        x: 500,
        y: 400,
        symbol: 'none',
        symbolSize: 140,
        symbolRotate:0,
    },],
    interceptType:[
       {
            name: 'passport-禁止访问',
        },
        {
            name: 'passport-账号禁用',
        },
        {
            name: 'passport-手机验证',
        },
        {
            name: 'passport-修改密码',
        },
        {
            name: 'passport-图形验证码',
        },
        {
            name: 'nginx-图形验证码',
        },
        {
            name: 'nginx-禁止访问',
        },
    ],
    option : {
        title: {
            text: '',
        },
        tooltip: {},
        series : [
            {
                type: 'graph',
                name:'',
                layout: 'none',
                left:'0%',
                right:'15%',
                top:'1%',
                bottom:'3%',
                roam: false,
                // zlevel:1,
                focusNodeAdjacency: false,
                itemStyle: {
                        color:'#00868B',
                        borderColor: '#fff',
                        borderWidth: 1,
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.3)'
                },
                label: {
                    show: true,
                },
                emphasis: {
                    lineStyle: {
                        width: 10
                    }
                },
                data: [],
                links: [],
                animationDuration: function (idx) {
                    return idx * 50;
                },
                animationDurationUpdate: function (idx) {
                    return idx * 50;
                },

            },
          /*  {
                type: 'pie',
                radius : ['10%','12%'],
                center: ['14%', '60%'],
                label: {
                    formatter: '{b}: {c} ({d}%)',
                    fontWeight:'lighter',
                    fontSize:9,
                    color:'#FFFFFF',
                },
                labelLine:{
                  length:5,
                },
                data:[
                ]
            },
            {
                type: 'pie',
                radius : ['10%','12%'],
                center: ['14%', '30%'],
                label: {
                    formatter: '{b}: {c} ({d}%)',
                    fontWeight:'lighter',
                    fontSize:9,
                    color:'#FFFFFF',
                },
                labelLine:{
                    length:5,
                },
                data:[
                ]
            },
            {
                type: 'pie',
                radius : ['10%','12%'],
                center: ['14%', '70%'],
                label: {
                    formatter: '{b}: {c} ({d}%)',
                    fontWeight:'lighter',
                    fontSize:9,
                    color:'#FFFFFF',
                },
                labelLine:{
                    length:5,
                },
                data:[
                ]
            },*/
        ]
    },
}

const actions={
    searchIntercept({commit}){
        axios.get('/intercept/search.json',{
            params: null,
            timeout: 60000,
            headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json'
        })
            .then(response=>{commit('doSearchIntercept',response.data)})
            .catch(error=>{console.log("error=%o",error)})
            .finally(()=>{});
    },

}

const mutations={
    doSearchIntercept(state,data){
        if(data.data==null){
            return;
        }
        state.attackInterceptMap=data.data.attackInterceptMap;
        state.attackValueMap=data.data.attackValueMap;
        state.interceptValueMap=data.data.interceptValueMap;
        state.attackUsers=data.data.attackUsers;
        state.userAttackTimesMap=data.data.userAttackTimesMap;
        state.interceptUsers=data.data.interceptUsers;
        state.ipValueMap=data.data.ipValueMap;
        var count=0;
        for(var key in state.attackTrendMap){
            count+=1;
        }
        if(count==0){
            state.attackTrendMap=data.data.attackTrendMap;
            state.interceptTrendMap=data.data.interceptTrendMap;
        }
    }
}

const getter={

}

const moduleRuleCount={
    state:state,
    mutations:mutations,
    actions:actions,
    getter:getter
}

export default moduleRuleCount;
