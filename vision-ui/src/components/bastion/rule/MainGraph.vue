<template>
    <div class="background">
        <el-row :gutter="10">
            <el-col :span="8">
                <div class="text_content">

                </div>
            </el-col>
            <el-col :span="8">
                <div class="text_content">
                    <span style="font-size: 20px;font-family: Aharoni">ULTRON系统运营数据大盘</span>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="text_content">
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="24">
                <div id="main_graph" style="height:470px;">
                </div>
            </el-col>
        </el-row>
    </div>

<!--    <div class="background">
        <div id="main_graph" style="height:700px;"></div>
    </div>-->

</template>

<script>
    import echarts from 'echarts'
    import { mapActions } from 'vuex'
    import '../../../../node_modules/echarts/map/js/china.js'

    export default {
        data() {
            return {
                option: {},
                localData:[],
                geoCoordMap:{},
                data:[],
                policyData:[],
                myChart:{},
                intervalParam:[],
                linePre:'intercept_line_',
                interid:0,
                attack_ip_div:null,
                attack_ip_ul:null,
                attack_ip_ul_copy:null,
                attackScrollId:0,
                linestart:'path://' +
                    "M848 48H176a128 128 0 0 0-128 128v672a128 128 0 0 0 128 128h672a128 128 0 0 0 128-128V176a128 128 0 0 0-128-128z m19.84 508.8a44.16 44.16 0 0 1-44.16 44.8H600.96v222.72a44.8 44.8 0 0 1-44.8 44.8H467.84a44.8 44.8 0 0 1-44.8-44.8V600.96H200.32a44.8 44.8 0 0 1-44.8-44.8V467.84a44.16 44.16 0 0 1 44.8-44.8h222.72V200.32a44.16 44.16 0 0 1 44.8-44.8h88.32a44.16 44.16 0 0 1 44.8 44.8v222.72h222.72a44.16 44.16 0 0 1 44.8 44.8z"
                ,
                lineend:'path://' +
                'M512 1024C229.12 1024 0 794.88 0 512S229.12 0 512 0s512 229.12 512 512-229.376 512-512 512z m0-937.216c-234.752 0-425.216 190.464-425.216 425.216 0 234.752 190.464 425.216 425.216 425.216 234.752 0 425.216-190.464 425.216-425.216S746.752 86.784 512 86.784z m0 578.816c-84.736 0-153.6-68.864-153.6-153.6s68.864-153.6 153.6-153.6 153.6 68.864 153.6 153.6c0 84.992-68.864 153.6-153.6 153.6z m0 95.232'
                ,
                effectSymbol:'image:///static/img/hydra.png',
                isReload:false,
                refreshCount:0,
                refreshId:0,
                timeoutids:[],
                refreshTimeids:{},
                curRefreeshTimeids:[],
                interceptIds:[],

            }
        },
        mounted() {
            this.dataLoad();
            this.makeAttackLine();
            setInterval(this.makeAttackLine,60000);
            setInterval(this.makeInterceptLine,60000);

        },
        methods: {
            dataLoad() {
                var dom = document.getElementById("main_graph");
                this.myChart = echarts.init(dom);
                this.localData=this.$store.state.main_graph.localData;
                this.policyData=this.$store.state.main_graph.policyData;
                this.option = this.$store.state.main_graph.option;
                this.geoCoordMap=this.$store.state.main_graph.geoCoordMap;
                this.refreshData();
            },
            ...mapActions({
                search:'getAttackAction',
                policySearch:'getPolicyAction',
            }),
            refreshData(){
                if (this.option && typeof this.option === "object") {
                    this.myChart.setOption(this.option,true);
                }
            },
            delayRefreshData(time,pretag){
                if (this.option && typeof this.option === "object") {
                    if(!this.isReload){
                        this.isReload=true;
                        this.refreshData();
                        var tag=this.maketag("_refresh_"+pretag+parseInt(Math.random()*100000));
                        var timeid=setTimeout(this.waitRefresh,time,tag);
                        this.refreshTimeids[tag]=timeid;
                        this.curRefreeshTimeids.push(tag);
                    }else{
                        var tag=this.maketag("_try_"+pretag+parseInt(Math.random()*100000));
                        var tryRefreshId=setInterval(this.tryRefresh,500,tag,time);
                        this.refreshTimeids[tag]=tryRefreshId;
                        this.curRefreeshTimeids.push(tag);
                    }
                }
            },
            /**
             * 等待元素渲染结束
             * @param tag
             */
            waitRefresh(tag){
                if(this.refreshTimeids[tag]!=undefined && this.refreshTimeids[tag]!=null){
                    clearTimeout(this.refreshTimeids[tag]);
                    delete this.refreshTimeids[tag];
                }
                this.isReload=false;
            },
            tryRefresh(tag,time){
                if(this.isReload){
                    return;
                }
                this.isReload=true;
                var exists=false;
                if(this.refreshTimeids[tag]!=undefined && this.refreshTimeids[tag]!=null){
                    clearInterval(this.refreshTimeids[tag]);
                    delete this.refreshTimeids[tag];
                    exists=true;
                }
                if(!exists){
                    this.isReload=false;
                    return;
                }
                 this.refreshData();
                var _tag=this.maketag("_try_refresh_"+parseInt(Math.random()*100000));
                var timeid=setTimeout(this.waitRefresh,1000,_tag);
                this.refreshTimeids[_tag]=timeid;
                this.curRefreeshTimeids.push(_tag);
            },
            makeAttackLine(){
                this.now=new Date();
                var param={};
                param.endTime=this.dateFormat(this.now);
                param.startTime=this.dateFormat(new Date(+this.now - 60 * 1000));
                this.search(param);
            },
            watchAttack(){
                var curDataLen=this.data.length;
                if(curDataLen>0){
                    console.log("curDataLen="+curDataLen+"]series length="+this.option.series.length+"]timeoutids length="+this.timeoutids.length+"]interceptIds length="+this.interceptIds.length+"]curRefreeshTimeids length="+this.curRefreeshTimeids.length);
                }
                console.log("localData=["+this.localData.length+"]policyData="+this.policyData.length+"]");
                var tcount=0;
                if(this.curRefreeshTimeids.length>1000){
                    var maxlen=this.curRefreeshTimeids.length-1000;
                    for(var i=maxlen;i>=0;i--){
                        var tag=this.curRefreeshTimeids[i];
                        if(this.refreshTimeids[tag]!=undefined && this.refreshTimeids[tag]!=null){
                            clearTimeout(this.refreshTimeids[tag]);
                            delete this.refreshTimeids[tag];
                        }
                        this.curRefreeshTimeids.splice(i,1);
                    }
                }
                tcount=0;
                for(var key in this.refreshTimeids){
                    tcount++;
                }
                console.log("after refreshTimeids size="+tcount);
                for(var i=0;i<this.localData.length;i++){
                    this.data.push(this.localData[i]);
                }
                if(this.data.length<=0){
                    return;
                }
                for(var i=curDataLen;i<this.data.length;i++) {
                    var lineid = this.maketag("_attack_0_" + i);
                    var scattid = this.maketag("_attack_1_" + i);
                    var line = {
                        id: lineid,
                        type: 'lines',
                        coordinateSystem: 'geo',
                        geoIndex: 0,
                        zlevel: 3,
                        symbol: ['none', 'none'],
                        symbolSize: 10,
                        lineStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#4CD964' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#FACD19' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            },
                            width: 4,
                            opacity: 1,
                            curveness: 0.2
                        },
                        animation: true,
                        animationDuration: 200,
                        animationEasing: 'linear',
                        animationDurationUpdate: 0,
                        animationEasingUpdate: 'linear',
                        data: [],
                        tooltip: {
                            show: false,
                        },
                    };
                    var scatter = {
                        id: scattid,
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        geoIndex: 0,
                        tooltip: {
                            trigger: 'item',
                            formatter: function (params) {
                                var value = (params.value + '').split(',');
                                return params.name + ' : ' + value[2];
                            }
                        },
                        zlevel: 3,
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                formatter: '{b}'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#EEEE00'
                            }
                        },
                        data: [],
                        animation: true,
                        animationDuration: 1000,
                        tooltip: {
                            show: false,
                        },
                    };
                    this.data[i][3] = lineid;
                    this.option.series.push(line);
                    this.option.series.push(scatter);
                    var sec = parseInt(this.data[i][2]);
                    var initid=setTimeout(this.initLine, sec * 1000, lineid);
                    var updateid=setTimeout(this.updateLine, sec * 1000 + 4000, lineid,3,0.5);
                    var deleteid=setTimeout(this.deleteLine, sec * 1000 + 6000, lineid);
                    this.timeoutids.push([lineid,initid]);
                    this.timeoutids.push([lineid,updateid]);
                    this.timeoutids.push([lineid,deleteid]);
                }
            },
            initLine(lineid){
                var dataindex=this.getDataIndex(lineid);
                if(dataindex==null){
                    return;
                }
                var tdata=this.data[dataindex];
                for (var i = 0; i < this.option.series.length; i++) {
                    if (this.option.series[i] == undefined) {
                        continue;
                    }
                    if (this.option.series[i].id != undefined && this.option.series[i].id == lineid) {
                        this.option.series[i].data = this.convertLineData(tdata);
                        this.option.series[i+1].data = this.convertScatterData(tdata);
                        if (tdata != undefined) {
                            tdata[4] = "insert";
                        }
                        this.delayRefreshData(1000,'initLine_');
                    }
                }
            },
            updateLine(lineid,width,opacity){
                for (var i = 0; i < this.option.series.length; i++) {
                    if (this.option.series[i] == undefined) {
                        continue;
                    }
                    if (this.option.series[i].id != undefined && this.option.series[i].id == lineid) {
                        this.option.series[i].lineStyle.width = width;
                        this.option.series[i].lineStyle.opacity = opacity;
                        this.delayRefreshData(1000,'updateLine_');
                        break;
                    }
                }
            },
            deleteLine(lineid){
                for (var i = this.option.series.length - 1; i >= 0; i--) {
                    if (this.option.series[i] == undefined) {
                        continue;
                    }
                    if (this.option.series[i].id == undefined) {
                        continue;
                    }
                    if (this.option.series[i].id == lineid) {
                        this.option.series.splice(i,2);
                        this.markDeleteData(lineid);
                        this.clearMyTimeout(lineid);
                        this.delayRefreshData(1000,'deleteLine_');
                        break;
                    }
                }
            },
            clearMyTimeout(id){
                for(var i=this.timeoutids.length-1;i>=0;i--){
                    if(this.timeoutids[i][0]==id ){
                        clearTimeout(this.timeoutids[i][1]);
                        this.timeoutids.splice(i,1);
                    }
                }
            },
            getDataIndex(lineid){
                for(var i=0;i<this.data.length;i++){
                    if(this.data[i].length>3 && this.data[i][3]==lineid){
                       return i;
                    }
                }
                return null;
            },
            ulScroll(){
                this.attack_ip_ul_copy.innerHTML = this.attack_ip_ul.innerHTML;
                if(this.attack_ip_div.scrollTop>=this.attack_ip_ul.offsetHeight){
                    this.attack_ip_div.scrollTop=0;
                }
                else{
                    this.attack_ip_div.scrollTop=this.attack_ip_div.scrollTop+1;
                }
            },
            maketag(random){
                var nowdate=new Date();
                var tag=""+nowdate.getFullYear()+nowdate.getMonth()+nowdate.getDay()+nowdate.getHours()+nowdate.getMinutes()+nowdate.getSeconds()+nowdate.getMilliseconds()+random;
                return tag;
            },
            markDeleteData(lineid){
                for(var i=this.data.length-1;i>=0;i--){
                    if(this.data[i].length>=4 && this.data[i][3]==lineid){
                        this.data.splice(i,1);
                        break;
                    }
                }
            },
            makeInterceptLine(){
                this.cleanAttackInterceptLine();
                var param={};
                param.endTime=this.dateFormat(this.now);
                param.startTime=this.dateFormat(new Date(+this.now - 60 * 1000));
                this.policySearch(param);
            },
            cleanAttackInterceptLine(){
                var len=0;
                if(this.option.series.length>60){
                    len=this.option.series.length-20;
                }
                for(var i=len;i>=1;i--){
                    if(this.option.series[i]==undefined){
                        this.option.series.splice(i,1);
                        continue;
                    }
                    if(this.option.series[i].name==undefined
                        || this.option.series[i].name==null
                        ){
                        continue;
                    }
                    if(this.option.series[i].name.substring(0,15)==this.linePre){
                        this.option.series.splice(i,1);
                        continue;
                    }
                }
                this.delayRefreshData(1000,'cleanInterceptLine_');
            },
            watchIntercept(){
                if(this.policyData.length<=0){
                    return;
                }
                for(var i=0;i<this.policyData.length;i++){
                    var curveness=(1-Math.random()*2)/3;
                    var name=this.linePre+i;
                    var fromCoord = this.geoCoordMap[this.policyData[i][0]];
                    var toCoord = this.geoCoordMap['bastion'];
                    var line={
                        type: 'lines',
                        name:name,
                        coordinateSystem:'geo',
                        geoIndex:0,
                        zlevel: 2,
                        symbol: [ 'none','none'],
                        symbolSize: 10,
                        effect: {
                            show: true,
                            constantSpeed:280,
                            trailLength: 0,
                            color: '#FACD19',
                            symbol:this.effectSymbol,
                            symbolSize: 18,
                            loop:false,
                        },
                        lineStyle: {
                            color: '#FACD19',
                            width: 0,
                            opacity: 1,
                            curveness: curveness,
                            type:'dotted',
                        },
                        data: [{
                            coords: [
                                fromCoord,
                                toCoord
                            ],
                        }],
                        animation:true,
                        animationDuration:10,
                        animationEasing:'linear',
                        animationDurationUpdate:10,
                        animationEasingUpdate:'linear',
                    };
                    var sec=parseInt(this.policyData[i][1]);

                    var tag=this.maketag(name+"_"+parseInt(Math.random()*100000));
                    var showid=setTimeout(this.showInterceptLine,sec*1000,line,tag);
                    this.interceptIds.push([tag,showid]);
                }
            },
            showInterceptLine(line,tag){
                this.option.series.push(line);
                this.delayRefreshData(1000,'showInterceptLine_');
                for(var i=this.interceptIds.length-1;i>=0;i--){
                    if(this.interceptIds[i][0]==tag){
                        clearTimeout(this.interceptIds[i][1]);
                        this.interceptIds.splice(i,1);
                        break;
                    }
                }
            },
            convertLineData (data) {
                var res = [];
                var fromCoord = this.geoCoordMap[data[0]];
                var toCoord = this.geoCoordMap[data[1]];
                if (fromCoord && toCoord) {
                    res.push({
                        coords: [fromCoord, toCoord],
                        lineStyle:{curveness:0.2},
                    });
                }
                return res;
            },
            convertScatterData(data){
                var res = [];
                res.push({
                    name: data[0],
                    value: this.geoCoordMap[data[0]],
                    symbol:this.linestart,
                    symbolSize:13,
                });
                res.push({
                    name: data[1],
                    value: this.geoCoordMap[data[1]],
                    symbol:this.lineend,
                    symbolSize:17,
                });
                return res;
            },
            dateFormat(date){
                var month=date.getMonth()+1;
                if(month<10){
                    month="0"+month;
                }
                var today=date.getDate();
                if(today<10){
                    today="0"+today.toString();
                }
                var hour=date.getHours();
                if(hour<10){
                    hour="0"+hour.toString();
                }
                var minutes=date.getMinutes();
                if(minutes<10){
                    minutes="0"+minutes.toString();
                }
                var seconds=date.getSeconds();
                if(seconds<10){
                    seconds="0"+seconds.toString();
                }
                return date.getFullYear().toString()+month+today+hour+minutes+seconds;
            },
        },
        watch:{
            localData:{
                handler(){
                    this.watchAttack();
                },
                immediate: true,
                deep:true
            },
            policyData:{
                handler(){
                    this.watchIntercept();
                },
                immediate: true,
                deep:true
            },

        },
    }
</script>

<style scoped>
    .background{
        height:510px;
        background:url("/static/img/bg.jpg") no-repeat center;
    }
    .text_content{
        height: 30px;
        color:#FFFFFF;
    }
    #attack_ip{overflow:hidden; height:80px; width:280px; position:relative;}
    #attack_ip_ul{height:auto; text-align:left;}
    #scroll_ip{height:auto; text-align:left;}
    #attack_ip_ul li, #scroll_ip li{list-style-type:none; height:22px; text-align:left; }
</style>
