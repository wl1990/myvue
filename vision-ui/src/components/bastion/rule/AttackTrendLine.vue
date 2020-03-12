<template>
    <div id="attackTrend" style="height: 100%"></div>
</template>

<script>
    import echarts from 'echarts'
    import { mapActions } from 'vuex'

    export default {
        data() {
            return {
                router:'',
                option: {},
                now:{},
                mychart:{},
                attackValueMap:{},
                legendData:[],
                daysTrendMap:{},
                weekTrendRefreshId:0,
                monthTrendRefreshId:0,
                minuteTrendInitId:0,
                minuteTrendRefreshMap:{},
                reminuteId:0,
                searchDays:1,
            }
        },
        mounted() {
            this.dataLoad();
            this.initCountData();
            setInterval(this.refresh,60000);
            setInterval(this.refreshDayaLine,24*60*60000);
        },
        methods: {
            dataLoad() {
                var dom = document.getElementById("attackTrend");
                this.myChart = echarts.init(dom);
                this.option = this.$store.state.attack_trend_line.option;
                this.$store.state.attack_trend_line.searchDays=1;
                this.router=this.$router;
                this.pushLegendData(this.$store.state.attack_trend_line.selectLegend);
                this.option.legend.data.concat(this.$store.state.attack_trend_line.selectLegend);
                this.myChart.on('legendselectchanged', this.changeLine);
                this.myChart.on('click',this.goBastionDetail);
                this.refreshData();
            },
            initCountData(){
                this.attackValueMap={};
                this.search();
                this.myChart.showLoading();
                this.minuteTrendInitId=setInterval(this.watchSignal,1000);
            },
            goBastionDetail(params){
                // var days=this.$store.state.attack_trend_line.searchDays;
                var days = this.searchDays;
                var startTime=params.value[0]+":00";
                var endTime=params.value[0]+":00";
                var startData = new Date(startTime);
                if(days==1){
                    var endDate=new Date(startData.valueOf()+60*1000);
                    endTime=this.dateParamFormat(endDate);
                }else{
                    var endDate=new Date(startData.valueOf()+24*3600*1000);
                    endTime=this.dateParamFormat(endDate);
                }
                this.$store.state.plot_list.plotForm.attackType=params.seriesName;
                this.$store.state.plot_list.plotForm.interceptType='';
                this.$store.state.plot_list.plotForm.startTime=startTime;
                this.$store.state.plot_list.plotForm.endTime=endTime;
           /*     var newurl=this.router.resolve({
                    path:"/plot_list",
                    params:{}
                });
                window.open(newurl.href,'_blank');*/
                this.router.push('/plot_list');
            },
            changeLine(params){
                var name=params.name;
                var days=0;
                if(name==='一天'){
                    days=1;
                }
                if(name==='一周'){
                    days=7;
                }
              /*  if(name==='一月'){
                    days=30;
                }*/
                if(days==this.$store.state.attack_trend_line.searchDays){
                    this.refreshData();
                    return;
                }
                if(days>1){
                    this.option.legend.data=[];
                    this.pushLegendData(this.$store.state.attack_trend_line.selectLegend);
                    if(days===7){
                        this.daysTrendMap=this.$store.state.attack_trend_line.weekAttackValueMap;
                    }
                   /* if(days===30){
                        this.daysTrendMap=this.$store.state.attack_trend_line.monthAttackValueMap;
                    }*/
                    var hasLoad=false;
                    for(var key in this.daysTrendMap){
                        hasLoad=true;
                        break;
                    }
                    this.$store.state.attack_trend_line.searchDays=days;
                    this.searchDays=days;
                    if(!hasLoad){
                        this.myChart.showLoading();
                        this.dorefreshDayaLine(days);
                    }else{
                        this.cleanSeries();
                        this.loadDaysTrendData();
                    }
                }else if(days==1){
                    this.option.legend.data=[];
                    this.pushLegendData(this.$store.state.attack_trend_line.selectLegend);
                    this.$store.state.attack_trend_line.searchDays=days;
                    this.searchDays=days;
                    this.cleanSeries();
                    for(var key in this.attackValueMap){
                        var valueArray=this.attackValueMap[key];
                        var data=this.convertData(key,valueArray);
                        this.addSeries(key,data);
                    }
                    this.refreshData();
                }
            },
            cleanSeries(){
                this.option.series.splice(2,this.option.series.length-2);
            },
            ...mapActions({
                search:"getAttackTrend",
                attacktrendRefreshData:"attacktrendRefreshData",
                daysAttacktrendData:"daysAttacktrendData",
                searchDetail:"searchDetail",
            }),
            switchTrendTime(){
                if(this.$store.state.attack_trend_line.searchDays==1){
                    this.option.legend.selected={"一天":true,"一周":false};
                }
                if(this.$store.state.attack_trend_line.searchDays==7){
                    this.option.legend.selected={"一天":false,"一周":true};
                }
             /*   if(this.$store.state.attack_trend_line.searchDays==30){
                    this.option.legend.selected={"一天":false,"一周":false,"一月":true};
                }*/
            },
            refreshDayaLine(){
                this.myChart.showLoading();
                this.dorefreshDayaLine(7);
                // this.dorefreshDayaLine(30);
            },
            dorefreshDayaLine(days){
                var param=this.$store.state.attack_trend_line.dataParam;
                this.now=new Date();
                param.endTime=this.dateFormat(this.now);
                param.startTime=this.dateFormat(new Date(+this.now - days*24*3600 * 1000));
                param.segment=1;
                if(days==7 && this.weekTrendRefreshId==0){
                    this.daysAttacktrendData(param);
                    this.weekTrendRefreshId=setInterval(this.refreshDaysTrend, 1000);
                }else if(days==30 && this.monthTrendRefreshId==0){
                    this.daysAttacktrendData(param);
                    this.monthTrendRefreshId=setInterval(this.refreshDaysTrend, 1000);
                }
            },
            loadDaysTrendData(){
                for(var key in this.daysTrendMap){
                    var valueArray=this.daysTrendMap[key];
                    var data=this.convertData(key,valueArray);
                    this.addSeries(key,data);
                }
                this.refreshData();
            },
            refreshDaysTrend(){
                if(this.$store.state.attack_trend_line.searchDays===7){
                    this.daysTrendMap=this.$store.state.attack_trend_line.weekAttackValueMap;
                }
                if(this.$store.state.attack_trend_line.searchDays===30){
                    this.daysTrendMap=this.$store.state.attack_trend_line.monthAttackValueMap;
                }
                var hasLoad=false;
                for(var key in this.daysTrendMap){
                    hasLoad=true;
                    break;
                }
                if(hasLoad){
                    this.myChart.hideLoading();
                    this.cleanSeries();
                    this.loadDaysTrendData();
                    if(this.$store.state.attack_trend_line.searchDays===7){
                        clearInterval(this.weekTrendRefreshId);
                        this.weekTrendRefreshId=0;
                    }
                   /* if(this.$store.state.attack_trend_line.searchDays===30){
                        clearInterval(this.monthTrendRefreshId);
                        this.monthTrendRefreshId=0;
                    }*/
                }
            },
            pushLegendData(selectLegend){
                if(selectLegend==undefined || selectLegend==null){
                    return;
                }
                for(var i=0;i<selectLegend.length;i++){
                    this.option.legend.data.push(selectLegend[i]);
                }
            },
            dateParamFormat(date){
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
                return date.getFullYear().toString()+"-"+month+"-"+today+" "+hour+":"+minutes+":"+seconds;
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
            // 第一次数据来源是InterceptGraph
            watchSignal() {
                this.attackValueMap = this.$store.state.attack_trend_line.attackValueMap;
                if(this.attackValueMap==undefined || this.attackValueMap==null){
                    return;
                }
                var hasData=false;
                for(var key in this.attackValueMap){
                    hasData=true;
                    break;
                }
                if(!hasData){
                    return;
                }
                clearInterval(this.minuteTrendInitId);
                this.myChart.hideLoading();
                for(var key in this.attackValueMap){
                    var valueArray=this.attackValueMap[key];
                    var data=this.convertData(key,valueArray);
                    this.addSeries(key,data);
                }
                this.refreshData();
            },
            addSeries(key,data){
                this.option.series.push(
                    {
                        name: key,
                        type: 'line',
                        smooth:false,
                        hoverAnimation: false,
                        symbol:'emptyCircle',
                        symbolSize:2,
                        data: data,
                    });
            },
            refresh() {
                this.$store.state.attack_trend_line.newAttackValueMap=null;
                this.now=new Date();
                var param=this.$store.state.attack_trend_line.dataParam;
                param.endTime=this.dateFormat(this.now);
                param.startTime=this.dateFormat(new Date(+this.now - 60 * 1000));
                param.segment=1;
                this.attacktrendRefreshData(param);
                this.reminuteId=setInterval(this.refreshMinuteLine,1000);
            },
            refreshMinuteLine(){
                 this.minuteTrendRefreshMap=this.$store.state.attack_trend_line.newAttackValueMap;
                 if(this.minuteTrendRefreshMap==undefined || this.minuteTrendRefreshMap==null){
                     return;
                 }
                 var hasData=false;
                 for(var key in this.minuteTrendRefreshMap){
                    hasData=true;
                    break;
                }
                if(!hasData){
                    return;
                }
                clearInterval(this.reminuteId);
                for(var j=0;j<this.option.series.length;j++){
                    if(this.option.series[j].data.length>0){
                        var newData=this.converNewData(this.option.series[j].name,this.minuteTrendRefreshMap);
                        if(newData!=undefined && newData!=null){
                            if(this.$store.state.attack_trend_line.searchDays!=1){
                                var valueArray=this.attackValueMap[this.option.series[j].name];
                                var newValueArray=this.minuteTrendRefreshMap[this.option.series[j].name];
                                if(valueArray!=undefined && valueArray!=null && valueArray.length>0){
                                    valueArray.shift();
                                    valueArray.push(newValueArray[0]);
                                    this.attackValueMap[this.option.series[j].name]=valueArray;
                                }
                            }else if(this.$store.state.attack_trend_line.searchDays==1){
                                this.option.series[j].data.shift();
                                this.option.series[j].data.push(newData);
                            }
                        }
                    }
                }
                if(this.$store.state.attack_trend_line.searchDays==1){
                    this.refreshData();
                }
            },
            refreshData(){
                if (this.option && typeof this.option === "object") {
                    this.switchTrendTime();
                    this.myChart.setOption(this.option, true);
                }
            },
            convertData(key,valueArray){
                var resultArray=[];
                if(valueArray==undefined || valueArray==null){
                    return resultArray;
                }
                var lvalue=0;
                for(var i=0;i<valueArray.length; i++){
                    var time=this.formatTime(valueArray[i].split("_")[0]);
                    var value=parseFloat(valueArray[i].split("_")[1]);
                    // 0,01 解决 echart bug 填的无效数据
                    if(value>0.01){
                        lvalue+=value;
                    }
                    resultArray.push({
                        value:[
                            time,value
                        ]
                    });
                }
                if(lvalue>0){
                    this.option.legend.data.push({
                        name:key,
                        icon:'circle',
                    });
                }
               return resultArray;
            },
            formatTime(time){
                var year=time.substring(0,4);
                var month=time.substring(4,6);
                var day=time.substring(6,8);
                var hour=time.substring(8,10);
                var minute=time.substring(10,12);
                return year+"-"+month+"-"+day+" "+hour+":"+minute;
            },
            converNewData(attackName,newvaluemap){
                if(newvaluemap==undefined || newvaluemap==null){
                    return null;
                }
                var newData=newvaluemap[attackName];
                if(newData==undefined || newData==null || newData.length<=0){
                    return null;
                }
                var timeValue=newData[0];
                var time= this.formatTime(timeValue.split("_")[0]);
                var value=timeValue.split("_")[1];
                if(value>0){
                    this.refreshLegendData(attackName);
                }
                return {
                    value:[
                        time,value
                    ]
                };
            },
            refreshLegendData(attackName){
                var exists=false;
                var legendData=this.option.legend.data;
                for(var i=0;i<legendData.length;i++){
                    if(legendData[i]===attackName){
                        exists=true;
                        break;
                    }
                }
                if(!exists){
                    this.option.legend.data.push({
                        name:attackName,
                        icon:'circle',
                    });
                }
            },

        }
    }
</script>

<style scoped>

</style>
