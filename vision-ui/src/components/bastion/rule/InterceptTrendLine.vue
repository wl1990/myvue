<template>
    <div id="interceptTrend" style="height: 100%"></div>
</template>

<script>
    import echarts from 'echarts'
    import { mapActions } from 'vuex'

    export default {
        data() {
            return {
                router:"",
                option: {},
                now:{},
                interceptValueMap:{},
                mychart:{},
                ifWatch:true,
                legendData:[],
                daysTrendMap:{},
                weekTrendRefreshId:0,
                monthTrendRefreshId:0,
                minuteTrendInitId:0,
                minuteTrendRefreshMap:{},
                reminuteId:0,
                searchDays:1,
                interceptTypeEnumMap:{},
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
                var dom = document.getElementById("interceptTrend");
                this.myChart = echarts.init(dom);
                this.option = this.$store.state.intercept_trend_line.option;
                this.$store.state.intercept_trend_line.searchDays=1;
                this.router=this.$router;
                this.pushLegendData(this.$store.state.intercept_trend_line.selectLegend);
                this.option.legend.data.concat(this.$store.state.intercept_trend_line.selectLegend);
                this.myChart.on('legendselectchanged', this.changeLine);
                this.myChart.on('click',this.goBastionDetail);
                this.refreshData();
            },
            initCountData(){
                this.interceptValueMap={};
                this.search();
                this.myChart.showLoading();
                this.minuteTrendInitId=setInterval(this.watchSignal, 1000);
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
                // window.open("http://bastion.lietou.com/fepages/rule/message/listPageNew.jsp?startTime="+startTime+"&endTime="+endTime+"&interceptType="+interceptName, '_blank');
                this.$store.state.plot_list.plotForm.attackType="";
                this.$store.state.plot_list.plotForm.interceptType=params.seriesName;
                this.$store.state.plot_list.plotForm.startTime=startTime;
                this.$store.state.plot_list.plotForm.endTime=endTime;
                this.router.push('/plot_list');
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
            changeLine(params){
                var name=params.name;
                var days=0;
                if(name==='一天'){
                    days=1;
                }
                if(name==='一周'){
                    days=7;
                }
               /* if(name==='一月'){
                    days=30;
                }*/
                if(days==this.$store.state.intercept_trend_line.searchDays){
                    this.refreshData();
                    return;
                }
                if(days>1){
                    this.option.legend.data=[];
                    this.pushLegendData(this.$store.state.intercept_trend_line.selectLegend);
                    if(days===7){
                        this.daysTrendMap=this.$store.state.intercept_trend_line.weekInterceptValueMap;
                    }
                  /*  if(days===30){
                        this.daysTrendMap=this.$store.state.intercept_trend_line.monthInterceptValueMap;
                    }*/
                    var hasLoad=false;
                    for(var key in this.daysTrendMap){
                        hasLoad=true;
                        break;
                    }
                    this.$store.state.intercept_trend_line.searchDays=days;
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
                    this.pushLegendData(this.$store.state.intercept_trend_line.selectLegend);
                    this.$store.state.intercept_trend_line.searchDays=days;
                    this.searchDays=days;
                    this.cleanSeries();
                    for(var key in this.interceptValueMap){
                        var valueArray=this.interceptValueMap[key];
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
                search:"getInterceptTrend",
                intercepttrendRefreshData:"intercepttrendRefreshData",
                daysIntercepttrendData:"daysIntercepttrendData",
            }),
            switchTrendTime(){
                if(this.$store.state.intercept_trend_line.searchDays==1){
                    this.option.legend.selected={"一天":true,"一周":false};
                }
                if(this.$store.state.intercept_trend_line.searchDays==7){
                    this.option.legend.selected={"一天":false,"一周":true};
                }
              /*  if(this.$store.state.intercept_trend_line.searchDays==30){
                    this.option.legend.selected={"一天":false,"一周":false,"一月":true};
                }*/
            },
            refreshDayaLine(){
                this.myChart.showLoading();
                this.dorefreshDayaLine(7);
                // this.dorefreshDayaLine(30);
            },
            dorefreshDayaLine(days){
                var param=this.$store.state.intercept_trend_line.dataParam;
                this.now=new Date();
                param.endTime=this.dateFormat(this.now);
                param.startTime=this.dateFormat(new Date(+this.now - days*24*3600 * 1000));
                param.segment=1;
                if(days==7 && this.weekTrendRefreshId==0){
                    this.daysIntercepttrendData(param);
                    this.weekTrendRefreshId=setInterval(this.refreshDaysTrend, 1000);
                }else if(days==30 && this.monthTrendRefreshId==0){
                    this.daysIntercepttrendData(param);
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
                if(this.$store.state.intercept_trend_line.searchDays===7){
                    this.daysTrendMap=this.$store.state.intercept_trend_line.weekInterceptValueMap;
                }
              /*  if(this.$store.state.intercept_trend_line.searchDays===30){
                    this.daysTrendMap=this.$store.state.intercept_trend_line.monthInterceptValueMap;
                }*/
                var hasLoad=false;
                for(var key in this.daysTrendMap){
                    hasLoad=true;
                    break;
                }
                if(hasLoad){
                    this.myChart.hideLoading();
                    this.cleanSeries();
                    this.loadDaysTrendData();
                    if(this.$store.state.intercept_trend_line.searchDays===7){
                        clearInterval(this.weekTrendRefreshId);
                        this.weekTrendRefreshId=0;
                    }
                    if(this.$store.state.intercept_trend_line.searchDays===30){
                        clearInterval(this.monthTrendRefreshId);
                        this.monthTrendRefreshId=0;
                    }
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
            watchSignal() {
                this.interceptValueMap = this.$store.state.intercept_trend_line.interceptValueMap;
                if(this.interceptValueMap==undefined || this.interceptValueMap==null){
                    return;
                }
                var hasData=false;
                for(var key in this.interceptValueMap){
                    hasData=true;
                    break;
                }
                if(!hasData){
                    return;
                }
                clearInterval(this.minuteTrendInitId);
                this.myChart.hideLoading();
                this.interceptTypeEnumMap=this.$store.state.intercept_trend_line.interceptTypeEnumMap;
                for(var key in this.interceptValueMap){
                    var valueArray=this.interceptValueMap[key];
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
                this.$store.state.intercept_trend_line.newInterceptValueMap=null;
                this.now=new Date();
                var param=this.$store.state.intercept_trend_line.dataParam;
                param.endTime=this.dateFormat(this.now);
                param.startTime=this.dateFormat(new Date(+this.now - 60 * 1000));
                param.segment=1;
                this.intercepttrendRefreshData(param);
                this.reminuteId=setInterval(this.refreshMinuteLine,10000);
            },
            refreshMinuteLine(){
                this.minuteTrendRefreshMap=this.$store.state.intercept_trend_line.newInterceptValueMap;
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
                            if(this.$store.state.intercept_trend_line.searchDays!=1){
                                var valueArray=this.interceptValueMap[this.option.series[j].name];
                                var newValueArray=this.minuteTrendRefreshMap[this.option.series[j].name];
                                if(valueArray!=undefined && valueArray!=null && valueArray.length>0){
                                    valueArray.shift();
                                    valueArray.push(newValueArray[0]);
                                    this.interceptValueMap[this.option.series[j].name]=valueArray;
                                }
                            }else if(this.$store.state.intercept_trend_line.searchDays==1){
                                this.option.series[j].data.shift();
                                this.option.series[j].data.push(newData);
                            }
                        }
                    }
                }
                if(this.$store.state.intercept_trend_line.searchDays==1){
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
            converNewData(interceptName,newvaluemap){
                if(newvaluemap==undefined || newvaluemap==null){
                    return null;
                }
                var newData=newvaluemap[interceptName];
                if(newData==undefined || newData==null || newData.length<=0){
                    return null;
                }
                var timeValue=newData[0];
                var time= this.formatTime(timeValue.split("_")[0]);
                var value=timeValue.split("_")[1];
                if(value>0){
                    this.refreshLegendData(interceptName);
                }
                return {
                    value:[
                        time,value
                    ]
                };
            },
            refreshLegendData(interceptName){
                var exists=false;
                var legendData=this.option.legend.data;
                for(var i=0;i<legendData.length;i++){
                    if(legendData[i]===interceptName){
                        exists=true;
                        break;
                    }
                }
                if(!exists){
                    this.option.legend.data.push({
                        name:interceptName,
                        icon:'circle',
                    });
                }
            },

        }
    }
</script>

<style scoped>

</style>
