<template>
    <div >
        <el-row  :gutter="10">
            <el-col :span="24">
                <div class="sub_count">
                    <div id="alarm_exact_count" style="height: 100%"></div>
                </div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import echarts from 'echarts'
    import { mapActions } from 'vuex'

    export default {
        data() {
            return {
                option: {},
                data:{},
                colors:{},
                alarmExactPercentMap:{},
                myChart:{},
                alarmExactTimesMap:{},
                refreshid:0,
            }
        },

        mounted() {
            this.dataLoad();
            this.initCountData();
            setInterval(this.initCountData,300000);
        },
        methods: {
            dataLoad() {
                var dom = document.getElementById("alarm_exact_count");
                this.myChart = echarts.init(dom);
                this.colors=this.$store.state.alarm_exact_count.colors;
                this.option = this.$store.state.alarm_exact_count.option;
                this.refreshData();
            },
            ...mapActions({
                search:"searchAlarmExactPercent",
            }),
            initCountData(){
                this.alarmExactTimesMap={};
                this.search();
                this.refreshid=setInterval(this.refresh, 1000);
            },
            refresh(){
                this.alarmExactTimesMap=this.$store.state.alarm_exact_count.alarmExactTimesMap;
                if(this.alarmExactTimesMap==undefined || this.alarmExactTimesMap==null){
                    return;
                }
                var hasData=false;
                for(var key in this.alarmExactTimesMap){
                    hasData=true;
                    break;
                }
                if(!hasData){
                    return;
                }
                clearInterval(this.refreshid);
                this.alarmExactPercentMap={};
                this.option.series[0].data=this.alarmExactPie(this.alarmExactTimesMap);
                this.refreshData();
                this.$forceUpdate();
            },
            alarmExactPie(alarmExactTimesMap){
                var piedata=[];
                var sum=0;
                var alarmType="";
                for(var key in alarmExactTimesMap){
                    alarmType=key;
                    if(alarmExactTimesMap[key]>0){
                        var exists=false;
                        for(var i=0;i<piedata.length;i++) {
                            if (piedata[i].name == alarmType) {
                                piedata[i].value = piedata[i].value + alarmExactTimesMap[key];
                                exists = true;
                                break;
                            }
                        }
                        sum+=alarmExactTimesMap[key];
                        if(this.alarmExactPercentMap[alarmType]==undefined || this.alarmExactPercentMap[alarmType]==null){
                            this.alarmExactPercentMap[alarmType]=[0,0];
                            this.alarmExactPercentMap[alarmType][1]=alarmExactTimesMap[key];
                        }else{
                            this.alarmExactPercentMap[alarmType][1]+=alarmExactTimesMap[key];
                        }
                    }
                }
                for(var key in this.alarmExactPercentMap){
                    var times=this.alarmExactPercentMap[key][1];
                    var percent=(times*100/sum).toFixed(3);
                    var newname=key+'\n'+'('+percent+'%)';
                    piedata.push({
                        value: times,
                        name: newname,
                    });
                }
                return piedata;
            },
            refreshData(){
                if (this.option && typeof this.option === "object") {
                    this.myChart.setOption(this.option, true);
                }
            },
        },
    }
</script>

<style scoped>

    .sub_count{
        height: 250px;
    }
</style>
