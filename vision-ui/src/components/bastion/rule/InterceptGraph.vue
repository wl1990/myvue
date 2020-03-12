<template>
    <div id="intercept_graph" style="height: 100%"></div>
</template>

<script>
    import echarts from 'echarts'
    import { mapActions } from 'vuex'
    export default {
        data() {
            return {
                option: {},
                links:[],
                attackInterceptMap:{},
                colors:{},
                count:0,
                attackType:[],
                ifWatch:true,
                myChart:{},
                initGraphId:0,
            }
        },
        mounted() {
            this.dataLoad();
            this.initGraph();
            setInterval(this.refreshGraph, 30000);
        },
        methods: {
            dataLoad() {
                var dom = document.getElementById("intercept_graph");
                this.myChart = echarts.init(dom);
                this.option = this.$store.state.intercept_graph.option;
                this.colors=this.$store.state.intercept_graph.colors;
                this.attackType=this.$store.state.intercept_graph.attacktype;
                this.regraph();
            },
            watchTrend(){
                this.$store.state.attack_trend_line.attackValueMap=this.$store.state.intercept_graph.attackTrendMap;
                this.$store.state.intercept_trend_line.interceptValueMap=this.$store.state.intercept_graph.interceptTrendMap;
                var hasData=false;
                for(var key in this.$store.state.intercept_graph.attackTrendMap){
                    hasData=true;
                    break;
                }
                if(hasData){
                    clearInterval(this.initGraphId);
                    this.myChart.hideLoading();
                    this.reMakeData();
                }
            },
            initGraph(){
                this.myChart.showLoading();
                this.cleanData();
                this.searchIntercept();
                this.initGraphId=setInterval(this.watchTrend, 1000);
            },
            refreshGraph(){
                this.cleanData();
                this.searchIntercept();
                this.initGraphId=setInterval(this.watchTrend, 1000);
            },

            regraph(){
                if (this.option && typeof this.option === "object") {
                    this.myChart.setOption(this.option, true);
                }
            },

            cleanData(){
                this.option.series[0].data=this.$store.state.intercept_graph.bastion;
                this.option.series[0].links=[];
                this.regraph();
            },
            reMakeData(){
                var tempData=[];
                tempData=tempData.concat(this.makeGraphInterceptNode(this.$store.state.intercept_graph.interceptType,this.$store.state.intercept_graph.interceptValueMap));
                tempData=tempData.concat(this.makeGraphAttackNode(this.$store.state.intercept_graph.attacktype,this.$store.state.intercept_graph.attackValueMap));
                tempData=tempData.concat(this.makeAttackUserNode(this.$store.state.intercept_graph.attackUsers,this.$store.state.intercept_graph.attacktype));
                tempData=tempData.concat(this.makeInterceptUserNode(this.$store.state.intercept_graph.interceptUsers,this.$store.state.intercept_graph.interceptType));
                this.option.series[0].data=this.option.series[0].data.concat(tempData);
                this.attackInterceptMap=this.$store.state.intercept_graph.attackInterceptMap;

                this.links=[];
                this.links=this.links.concat(this.makeUserAttackLinks(this.$store.state.intercept_graph.attackUsers,this.$store.state.intercept_graph.attacktype));
                this.links=this.links.concat(this.makeAttackInterceptLinks(this.$store.state.intercept_graph.attacktype,this.$store.state.intercept_graph.interceptType));
                this.links=this.links.concat(this.makeUserInterceptLinks(this.$store.state.intercept_graph.interceptUsers,this.$store.state.intercept_graph.interceptType));
                this.option.series[0].links=this.links;

                // 数据在makeAttackUserNode方法里设置
                this.$store.state.attack_user_count.option.series[0].data=this.userAttackPie(this.$store.state.intercept_graph.userAttackTimesMap);
                this.$store.state.attack_count.option.series[0].data=this.colorAttackPie(this.$store.state.intercept_graph.attacktype);
                this.$store.state.interceptType_count.option.series[0].data=this.colorInterceptPie(this.$store.state.intercept_graph.interceptType);
                this.$store.state.ip_hot.data=this.convertIpArray(this.$store.state.intercept_graph.ipValueMap);

                this.regraph();
            },

            ...mapActions({
                searchIntercept:'searchIntercept',
            }),
            makeAttackUserNode(userNodes,attackNode){
                var newUserNodes=[];
                if(userNodes==undefined){
                    return newUserNodes;
                }
                for(var i=0;i<attackNode.length;i++){
                    var attackName=attackNode[i].name;
                    var x=attackNode[i].x;
                    var y=attackNode[i].y;
                    x=x+Math.cos(i*2*Math.PI/5)*2.5;
                    y=y+Math.sin(i*2*Math.PI/5)*2.5;
                    for(var key in userNodes){
                        if(key==attackName){
                            var subUserNodes=userNodes[key];
                            for(var j=0;j<subUserNodes.length;j++){
                                subUserNodes[j].itemStyle={
                                    color: this.colors[key],
                                };
                                if(subUserNodes.length<10){
                                    subUserNodes[j].x=x+Math.cos(j*2*Math.PI/(subUserNodes.length))*0.06*subUserNodes.length;
                                    subUserNodes[j].y=y+Math.sin(j*2*Math.PI/(subUserNodes.length))*0.06*subUserNodes.length;
                                }else{
                                    subUserNodes[j].x=x+Math.cos(j*2*Math.PI/(subUserNodes.length))*0.06*subUserNodes.length/3;
                                    subUserNodes[j].y=y+Math.sin(j*2*Math.PI/(subUserNodes.length))*0.06*subUserNodes.length/3;
                                }

                                subUserNodes[j].symbol='circle';
                                if(subUserNodes.length<10){
                                    subUserNodes[j].symbolSize=(0.5+subUserNodes[j].value/10)>10 ? 10:(0.5+subUserNodes[j].value/10);
                                }else{
                                    subUserNodes[j].symbolSize=(0.5+subUserNodes[j].value/10)>1 ? 1:(0.5+subUserNodes[j].value/10);
                                }
                                subUserNodes[j].label={show:false};
                                newUserNodes.push( subUserNodes[j]);
                            }
                        }
                    }
                }
                return newUserNodes;
            },
            makeInterceptUserNode(userNodes,interceptNode){
                var newUserNodes=[];
                if(userNodes==undefined){
                    return newUserNodes;
                }
                for(var i=0;i<interceptNode.length;i++){
                    var interceptName=interceptNode[i].name;
                    var x=interceptNode[i].x;
                    var y=interceptNode[i].y;
                    x=x+Math.cos((i+1)*2*Math.PI/5)*2.5;
                    y=y+Math.sin((i+1)*2*Math.PI/5)*2.5;
                    for(var key in userNodes){
                        if(key==interceptName){
                            var subUserNodes=userNodes[key];
                            for(var j=0;j<subUserNodes.length;j++){
                                subUserNodes[j].itemStyle={
                                    color: this.colors[key],
                                };
                                if(subUserNodes.length<10){
                                    subUserNodes[j].x=x+Math.cos(j*2*Math.PI/(subUserNodes.length))*0.06*subUserNodes.length;
                                    subUserNodes[j].y=y+Math.sin(j*2*Math.PI/(subUserNodes.length))*0.06*subUserNodes.length;
                                }else{
                                    subUserNodes[j].x=x+Math.cos(j*2*Math.PI/(subUserNodes.length))*0.06*subUserNodes.length/3;
                                    subUserNodes[j].y=y+Math.sin(j*2*Math.PI/(subUserNodes.length))*0.06*subUserNodes.length/3;
                                }

                                subUserNodes[j].symbol='circle';
                                if(subUserNodes.length<10){
                                    subUserNodes[j].symbolSize=(0.5+subUserNodes[j].value/10)>10 ? 10:(0.5+subUserNodes[j].value/10);
                                }else{
                                    subUserNodes[j].symbolSize=(0.5+subUserNodes[j].value/10)>1 ? 1:(0.5+subUserNodes[j].value/10);
                                }
                                subUserNodes[j].label={show:false};
                                newUserNodes.push( subUserNodes[j]);
                            }
                        }
                    }
                }
                return newUserNodes;
            },
            makeGraphAttackNode(nodes,nodemap){
                var x=this.$store.state.intercept_graph.bastion[0].x;
                var y=this.$store.state.intercept_graph.bastion[0].y;
                for(var i=0;i<nodes.length;i++){
                    var nodevalue=0;
                    if(nodemap!=undefined && nodemap[nodes[i].name]!=undefined){
                        nodevalue=nodemap[nodes[i].name];
                    }
                    nodes[i].value=nodevalue;
                    nodes[i].symbol='circle';
                    nodes[i].label={fontWeight:'lighter',fontSize:9,color:'#1b1b1b'};
                    nodes[i].symbolSize=40+(nodevalue)/10;
                    if(nodes[i].symbolSize>70){
                        nodes[i].symbolSize=70;
                    }
                    if(this.colors[nodes[i].name]!=undefined){
                        nodes[i].itemStyle={color:this.colors[nodes[i].name]};
                    }
                   /* nodes[i].x=x+nodes.length*0.5+Math.cos(i*2*Math.PI/nodes.length)*nodes.length/4;
                    nodes[i].y=y+Math.sin(i*2*Math.PI/nodes.length)*nodes.length/4;*/
                    if(i<5){
                        // nodes[i].x=x+nodes.length*1+Math.cos(i*2*Math.PI/5)*1.5;
                        nodes[i].x=x+nodes.length*0.5+Math.cos(i*2*Math.PI/5)*1.5;
                        nodes[i].y=y-nodes.length*1.2+Math.sin(i*2*Math.PI/5)*1.5;
                    }else{
                        // nodes[i].x=x+nodes.length*1+Math.cos((i-5)*2*Math.PI/(nodes.length-5))*1.5;
                        nodes[i].x=x+nodes.length*0.5+Math.cos((i-5)*2*Math.PI/(nodes.length-5))*1.5;
                        nodes[i].y=y+nodes.length*0.2+Math.sin((i-5)*2*Math.PI/(nodes.length-5))*1.5;
                    }
                }
                return nodes;
            },
            makeGraphInterceptNode(nodes,nodemap){
                var x=this.$store.state.intercept_graph.bastion[0].x;
                var y=this.$store.state.intercept_graph.bastion[0].y;
                for(var i=0;i<nodes.length;i++){
                    var nodevalue=0;
                    if(nodemap!=undefined && nodemap[nodes[i].name]!=undefined){
                        nodevalue=nodemap[nodes[i].name];
                    }
                    nodes[i].value=nodevalue;
                    nodes[i].symbol='circle';
                    nodes[i].label={fontWeight:'lighter',fontSize:9,color:this.colors[nodes[i].name],position:'right',};
                    nodes[i].symbolSize=40+(nodevalue)/10;
                    if(nodes[i].symbolSize>70){
                        nodes[i].symbolSize=70;
                    }
                    if(this.colors[nodes[i].name]!=undefined){
                        nodes[i].itemStyle={color:this.colors[nodes[i].name]};
                    }
                    if(i<5){
                        // nodes[i].x=x+Math.cos(i*2*Math.PI/5)*1.5;
                        // nodes[i].y=y-nodes.length*0.6+Math.sin(i*2*Math.PI/5)*1.5;
                        nodes[i].x = x + nodes.length * 2 + Math.cos((i+1)*2*Math.PI/5)*1.5;
                        nodes[i].y=y-nodes.length+Math.sin((i+1)*2*Math.PI/5)*1.5;
                    }else {
                        // nodes[i].x = x + nodes.length * 2 + Math.cos((i - 5) * 2 * Math.PI / (nodes.length-5)) * 1.5;
                        // nodes[i].y = y - nodes.length * 0.6+ Math.sin((i - 5) * 2 * Math.PI / (nodes.length-5)) * 1.5;
                        nodes[i].x = x + nodes.length * 2 + Math.cos((i - 5) * 2 * Math.PI / (nodes.length-5)) * 1.5;
                        nodes[i].y = y + nodes.length * 0.6+ Math.sin((i - 5) * 2 * Math.PI / (nodes.length-5)) * 1.5;
                    }
                }
                return nodes;
            },

            getAttackSignalXY(key){
                var interceptSignal=[];
                for(var k=0;k<this.attackType.length;k++) {
                    if (key == this.attackType[k].name) {
                        var bastionX=this.$store.state.intercept_graph.bastion[0].x;
                        var bastionY=this.$store.state.intercept_graph.bastion[0].y;
                        var attackX=this.attackType[k].x;
                        var attackY=this.attackType[k].y;
                        var tempx=25;
                        var tempy=(55*8-((bastionY-attackY)/(bastionX-attackX))*(53-tempx)*15)/8;
                        interceptSignal.push([
                            {
                                name: this.attackType[k].name,
                                x: tempx+'%',
                                y: tempy + '%'
                            },
                            {
                                x: '53%',
                                y: '55%'
                            }
                        ]);

                    }
                }
                return interceptSignal;
            },
            makeSignalXY(attackName){
                var interceptType=this.attackInterceptMap[attackName];
                var interceptSignal=[];
                if(interceptType==undefined || interceptType.length<1){return;}
                for(var i=0;i<interceptType.length;i++){
                    for(var j=0;j<this.interceptSignal.length;j++){
                        if(this.interceptSignal[j][0].name==interceptType[i]){
                            interceptSignal.push(this.interceptSignal[j]);
                        }
                    }
                }
                return interceptSignal;
            },
            makeAttackLinks(sources,targgets) {
                var lines=[];
                for (var i = 0; i < sources.length; i++) {
                    var curveness=0;
                    if(i<=sources.length/2){
                        curveness=0.1
                    }else{
                        curveness=-0.1
                    }
                    var width=0;
                    var targetSymbal='none';
                    if(sources[i].value!=undefined && sources[i].value>0){
                        width=1+sources[i].value/200;
                        targetSymbal='arrow';
                    }
                    for(var j=0;j<targgets.length;j++){
                        lines.push({
                                source:sources[i].name,
                                target:targgets[j].name,
                                symbol:['none',targetSymbal],
                                lineStyle:{
                                  width:width,
                                  curveness:curveness,
                                  opacity:1,
                                  color:'#FFFFFF',
                                },

                            });
                    }
                }
                return lines;
            },
            makeInterceptLinks(sources,targgets) {
                var lines=[];
                for (var i = 0; i < sources.length; i++) {
                    for(var j=0;j<targgets.length;j++){
                        var curveness=0;
                        if(j<5){
                            curveness=0.1;
                        }else{
                            curveness=-0.1;
                        }
                        var width=0;
                        var targetSymbol='none';
                        if(targgets[j].value!=undefined && targgets[j].value>0){
                            width=1+targgets[j].value/200;
                            targetSymbol='arrow';
                        }
                        lines.push({
                            source:sources[i].name,
                            target:targgets[j].name,
                            symbol:['none',targetSymbol],
                            lineStyle:{
                                width:width,
                                curveness:curveness,
                                opacity:1,
                                color:'target',
                            },

                        });
                    }
                }
                return lines;
            },
            makeUserAttackLinks(userNodes,attackNodes){
                var lines=[];
                if(userNodes==undefined){
                    return lines;
                }
                for(var i=0;i<attackNodes.length;i++){
                    for(var key in userNodes){
                        if(attackNodes[i].name==key){
                            var userNode=userNodes[key];
                            for(var j=0;j<userNode.length;j++){
                                var curvene=0.3 ;
                                lines.push({
                                    source:userNode[j].name,
                                    target:key,
                                    lineStyle:{
                                        width:0.4,
                                        curveness:curvene,
                                        opacity:1,
                                        color:'source',
                                    },
                                });
                            }
                        }
                    }
                }
                return lines;
            },
            makeUserInterceptLinks(userNodes,interceptNodes){
                var lines=[];
                if(userNodes==undefined){
                    return lines;
                }
                for(var i=0;i<interceptNodes.length;i++){
                    for(var key in userNodes){
                        if(interceptNodes[i].name==key){
                            var userNode=userNodes[key];
                            for(var j=0;j<userNode.length;j++){
                                var curvene=0.3;
                                lines.push({
                                    source:userNode[j].name,
                                    target:key,
                                    lineStyle:{
                                        width:0.4,
                                        curveness:curvene,
                                        opacity:1,
                                        color:'source',
                                    },
                                });
                            }
                        }
                    }
                }
                return lines;
            },
            makeAttackInterceptLinks(attackNode,interceptNode){
                var lines=[];
                if(this.attackInterceptMap==undefined){
                    return lines;
                }
                for(var i=0;i<attackNode.length;i++){
                    var intercepts=this.attackInterceptMap[attackNode[i].name];
                    var curveness=0;
                    if(intercepts!=undefined){
                        for(var key in intercepts){
                            var t=0;
                            for(var m=0;m<interceptNode.length;m++){
                                if(key==interceptNode[m].name){
                                    t=m;
                                    break;
                                }
                            }
                            if(i<5 && t<5){
                                curveness=-0.2;
                            }else if(i<5 && t>=5){
                                curveness=0.2;
                            }else if(i>=5 && t>=5){
                                curveness=-0.2;
                            }else if(i>=5 && t<5){
                                curveness=0.2;
                            }
                            var width=0;
                            var targetSymbal='none';
                            if(intercepts[key]>0){
                                width=(1+intercepts[key]/50)>5 ? 5:(1+intercepts[key]/50);
                                targetSymbal='arrow';
                            }
                            var symsize=10;
                            if(width==5){
                                symsize=25;
                            }
                            lines.push({
                                source:attackNode[i].name,
                                target:key,
                                symbol:['none',targetSymbal],
                                symbolSize:symsize,
                                lineStyle:{
                                    width:width,
                                    curveness:curveness,
                                    opacity:0.7,
                                    color:'#F0E68C',
                                },
                            });
                        }
                    }
                }
                return lines;
            },
            makeAttackSignal(series){
                var deny=0;
                for(var i=0;i<this.attackType.length;i++){
                    var key=this.attackType[i].name;
                    var markline={
                        symbol:['none','path://' +
                        'M 195.183 317.791 C 195.183 142.275 337.02 0 512 0 C 686.98 0 828.817 142.275 828.817 317.791 C 828.817 493.259 512 1024 512 1024 C 512 1024 195.183 493.259 195.183 317.791 Z'
                        ],
                        symbolSize:6,
                        data: [],
                        label: {
                            show: false,
                        },
                        lineStyle: {
                            color: '',
                            width: 1,
                            opacity: 1,
                            curveness: 0,
                            type:'solid',

                        },
                        animationDelay:0,
                        animationDelayUpdate:0,
                        animationDurationUpdate: 0,
                        animationDuration: 0,
                        animationEasingUpdate: 'quarticInOut',
                        animationEasing:function (k) {
                            return 1 - Math.cos(k * Math.PI / 2);
                        },

                    };
                    deny=deny+1;
                    markline.data=this.getAttackSignalXY(key);
                    markline.lineStyle.color=this.colors[key];
                    markline.animationDurationUpdate=(deny)*400;
                    markline.animationDuration=(deny)*400;
                    if(!this.signalIfExists(series,markline,key+'attack')){
                        series.push({
                            type: 'lines',
                            name:key+'attack',
                            coordinateSystem: 'none',
                            zlevel:0,
                            markLine:markline,
                        });
                    }
                /*   this.cleanAttackSignal(series,deny,key,1);
                   this.cleanAttackSignal(series,deny,key,2);
                   this.cleanAttackSignal(series,deny,key,3);*/

                }
            },
            cleanAttackSignal(series,deny,key,zlevel){
                var markline={
                    symbol:['none','path://' +
                    'M 195.183 317.791 C 195.183 142.275 337.02 0 512 0 C 686.98 0 828.817 142.275 828.817 317.791 C 828.817 493.259 512 1024 512 1024 C 512 1024 195.183 493.259 195.183 317.791 Z'
                    ],
                    symbolSize:10,
                    data: [],
                    label: {
                        show: false,
                    },
                    lineStyle: {
                        color: '',
                        width: 1,
                        opacity: 1,
                        curveness: 0,
                        type:'solid',

                    },
                    animationDelay:0,
                    animationDelayUpdate:0,
                    animationDurationUpdate: 0,
                    animationDuration: 0,
                    animationEasingUpdate: 'quarticInOut',
                    animationEasing:function (k) {
                        return 1 - Math.cos(k * Math.PI / 2);
                    },

                };
                deny=deny+1;
                markline.data=this.getAttackSignalXY(key);
                markline.lineStyle.color=this.colors['clean'];
                markline.animationDurationUpdate=(deny)*400;
                markline.animationDuration=(deny)*400;
                markline.animationDelay=(deny)*400;
                markline.animationDelayUpdate=(deny)*400;
                var newkey=key+'attackclean'+zlevel;
                if(!this.signalIfExists(series,markline,newkey)){
                    series.push({
                        type: 'lines',
                        name:newkey,
                        coordinateSystem: 'none',
                        zlevel:zlevel,
                        markLine:markline,
                    });
                }
            },
            makeInterceptSignal(series){
                var deny=0;
                for(var key in this.attackInterceptMap){
                    var markline={
                        symbol:['none','path://' +
                        'M 195.183 317.791 C 195.183 142.275 337.02 0 512 0 C 686.98 0 828.817 142.275 828.817 317.791 C 828.817 493.259 512 1024 512 1024 C 512 1024 195.183 493.259 195.183 317.791 Z'
                        ],
                        symbolSize:6,
                        data: [],
                        label: {
                            show: false,
                        },
                        lineStyle: {
                            color: '',
                            width: 1,
                            opacity: 1,
                            curveness: 0,
                            type:'solid',

                        },
                        animationDelay:0,
                        animationDelayUpdate:0,
                        animationDurationUpdate: 0,
                        animationDuration: 0,
                        animationEasingUpdate: 'quarticInOut',
                        animationEasing:function (k) {
                            return 1 - Math.cos(k * Math.PI / 2);
                        },

                    };
                    deny=deny+1;
                    markline.data=this.makeSignalXY(key);
                    markline.lineStyle.color=this.colors[key];
                    if(deny==1){
                        markline.animationDurationUpdate=(deny+2)*800;
                        markline.animationDuration=(deny+2)*800;
                    }else{
                        markline.animationDurationUpdate=(deny)*800;
                        markline.animationDuration=(deny)*800;
                    }
                    if(!this.signalIfExists(series,markline,key)){
                        series.push({
                            type: 'lines',
                            name:key,
                            coordinateSystem: 'none',
                            zlevel:0,
                            markLine:markline,
                        });
                    }
                /*    this.cleanInterceptSignal(series,deny,key,1);
                    this.cleanInterceptSignal(series,deny,key,2);
                    this.cleanInterceptSignal(series,deny,key,3);*/
                }
            },
            cleanInterceptSignal(series,deny,key,zlevel){
                var markline={
                    symbol:['none','path://' +
                    'M 195.183 317.791 C 195.183 142.275 337.02 0 512 0 C 686.98 0 828.817 142.275 828.817 317.791 C 828.817 493.259 512 1024 512 1024 C 512 1024 195.183 493.259 195.183 317.791 Z'
                    ],
                    symbolSize:10,
                    data: [],
                    label: {
                        show: false,
                    },
                    lineStyle: {
                        color: '',
                        width: 1,
                        opacity: 1,
                        curveness: 0,
                        type:'solid',

                    },
                    animationDelay:0,
                    animationDelayUpdate:0,
                    animationDurationUpdate: 0,
                    animationDuration: 0,
                    animationEasingUpdate: 'quarticInOut',
                    animationEasing:function (k) {
                        return 1 - Math.cos(k * Math.PI / 2);
                    },

                };
                deny=deny+1;
                markline.data=this.makeSignalXY(key);
                markline.lineStyle.color=this.colors['clean'];
                if(deny==2){
                    markline.animationDurationUpdate=(deny+2)*800;
                    markline.animationDuration=(deny+2)*800;
                    markline.animationDelay=(deny+2)*200;
                    markline.animationDelayUpdate=(deny+2)*200;
                }else{
                    markline.animationDurationUpdate=deny*800;
                    markline.animationDuration=deny*800;
                    markline.animationDelay=(deny)*200;
                    markline.animationDelayUpdate=(deny)*200;
                }
                var newkey=key+'clean'+zlevel;
                if(!this.signalIfExists(series,markline,newkey)){
                    series.push({
                        type: 'lines',
                        name:newkey,
                        coordinateSystem: 'none',
                        zlevel:zlevel,
                        markLine:markline,
                    });
                }
            },

            signalIfExists(series,markline,name){
                for (var i = 0; i < series.length; i++) {
                    if(series[i].name==name){
                        series[i].markLine.data=markline.data;
                        return true;
                    }
                }
                return false;
            },
            cleanSignal(series){
                for(var key in this.attackInterceptMap){
                    for (var i = 0; i < series.length; i++) {
                        if(series[i].name==key
                            || series[i].name==(key+'clean1')
                            || series[i].name==(key+'clean2')
                            || series[i].name==(key+'clean3')
                            || series[i].name==(key+'attack')
                            || series[i].name==(key+'attackclean1')
                            || series[i].name==(key+'attackclean2')
                            || series[i].name==(key+'attackclean3')
                        ){
                            series[i].markLine.data=[];
                        }
                    }
                }
            },
            userAttackPie(userAttackTimes){
                var piedata=[];
                var sum=0;
                var userCountPercentMap=this.$store.state.attack_user_count.userCountPercentMap;
                var username="";
                for(var key in userAttackTimes){
                    username=key;
                    if("未知"==username){
                        username="黑客";
                    }
                    if(userAttackTimes[key]>0){
                        piedata.push({
                            value:userAttackTimes[key],
                            name:username,
                            itemStyle:{color:this.colors[key]},
                        });
                        sum+=userAttackTimes[key];
                        if(userCountPercentMap[key]==undefined || userCountPercentMap[key]==null){
                            userCountPercentMap[key]=[0,0];
                        }
                        userCountPercentMap[key][1]=userAttackTimes[key];
                    }
                }
                for(var key in userCountPercentMap){
                    var times=userCountPercentMap[key][1];
                    userCountPercentMap[key][0]=(times*100/sum).toFixed(2);
                }
                return piedata;
            },
            colorInterceptPie(interceptType){
                var piedata=[];
                var sum=0;
                var interceptCountPercentMap= this.$store.state.interceptType_count.interceptCountPercentMap;
                for (var i = 0; i < interceptType.length; i++) {
                    if(interceptType[i].value<=0){
                        continue;
                    }
                    piedata.push({
                        value:interceptType[i].value,
                        name:interceptType[i].name,
                        itemStyle:{color:interceptType[i].itemStyle.color,},
                    });
                    sum+=interceptType[i].value;
                    interceptCountPercentMap[interceptType[i].name][1]=interceptType[i].value;
                }
                for(var key in interceptCountPercentMap){
                    var times=interceptCountPercentMap[key][1];
                    interceptCountPercentMap[key][0]=(times*100/sum).toFixed(2);
                }
                return piedata;
            },
            colorAttackPie(attackType){
                var piedata=[];
                var sum=0;
                var attackCountPercentMap=this.$store.state.attack_count.attackCountPercentMap;
                for (var i = 0; i < attackType.length; i++) {
                    if(attackType[i].value<=0){
                        continue;
                    }
                    piedata.push({
                        value:attackType[i].value,
                        name:attackType[i].name,
                        itemStyle:{color:attackType[i].itemStyle.color,},
                    });
                    sum+=attackType[i].value;
                    attackCountPercentMap[attackType[i].name][1]=attackType[i].value;
                }
                for(var key in attackCountPercentMap){
                    var times=attackCountPercentMap[key][1];
                    attackCountPercentMap[key][0]=(times*100/sum).toFixed(2);
                }
                return piedata;
            },
            convertIpArray(ipValueMap){
                var ipdata=[];
                if(ipValueMap==undefined || ipValueMap==null){
                    return piedata;
                }
                for(var key in ipValueMap){
                    ipdata.push({
                        name:key,
                        value:ipValueMap[key]
                    });
                }
                return ipdata;
            },
            coloeResultPie(resultType){
                var piedata=[];
                for (var i = 0; i < resultType.length; i++) {
                    piedata.push({
                        value:30,
                        name:resultType[i].name,
                        itemStyle:{color:resultType[i].itemStyle.color,},
                    });
                }
                return piedata;
            },

        }
    }
</script>

<style scoped>

</style>