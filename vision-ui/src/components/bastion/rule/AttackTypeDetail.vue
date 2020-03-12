<template>
    <div >
        <el-row  :gutter="10">
            <el-col :span="24">
                <div class="sub_count">
                    <div id="attackTypeDetail" style="height: 100%"></div>
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
                myChart:{},
                colors:{},
                attackCountPercentMap:{},
                refreshId:0,
                attacktype:{},
                pathSymbols:{},
                labelSetting:{},

            }
        },
        mounted() {
            this.dataLoad();
            this.initCountData();
            setInterval(this.initCountData, 300000);

        },
        methods: {
            dataLoad() {
                var dom = document.getElementById("attackTypeDetail");
                this.myChart = echarts.init(dom);
                this.option = this.$store.state.attack_type_detail.option;
                this.colors=this.$store.state.attack_type_detail.colors;
                this.pathSymbols=this.$store.state.attack_type_detail.pathSymbols;
                this.labelSetting=this.$store.state.attack_type_detail.labelSetting;
                this.refreshData();
            },
            initCountData(){
                this.attacktype={};
                this.search();
                this.refreshId=setInterval(this.refresh, 1000);
            },
            ...mapActions({
                search:"searchAttackTypeDetail",
            }),
            refresh(){
                this.attacktype=this.$store.state.attack_type_detail.attacktypeDetail;
                if(this.attacktype==undefined || this.attacktype==null){
                    return;
                }
                var hasData=false;
                for(var key in this.attacktype){
                    hasData=true;
                    break;
                }
                if(!hasData){
                    return;
                }
                clearInterval(this.refreshId);
                this.attackDetail(this.attacktype);
                this.refreshData();
                this.$forceUpdate();
            },
            attackDetail(attackType){
                var subtext='';
                var sum=0;
                var alarmArray=[];
                var alarmSumMap=new  Map();
                for (var key in attackType) {
                    var alarmTypeMap=attackType[key];
                    var seriesData={};
                    seriesData.name=key;
                    seriesData.type='pictorialBar';
                    seriesData.label=this.labelSetting;
                    seriesData.symbolRepeat=true;
                    seriesData.symbolSize=['80%', '60%'];
                    seriesData.barCategoryGap='30%';
                    seriesData.barGap='10%';
                    var dataArray=[];
                    var subSum=0;
                    if(alarmArray.length<=0){
                        for(var atype in alarmTypeMap){
                            var value=alarmTypeMap[atype];
                            alarmArray.push(atype);
                            var dataMap={};
                            dataMap.value=value;
                            dataMap.symbol=this.pathSymbols.car;
                            dataArray.push(dataMap);
                             alarmSumMap.set(atype,value);
                            sum+=value;
                            subSum+=value;
                        }
                    }else{
                        for(var j=0;j<alarmArray.length;j++){
                            var namekey= alarmArray[j];
                            var avalue=alarmTypeMap[namekey];
                            var adataMap={};
                            adataMap.value=avalue;
                            adataMap.symbol=this.pathSymbols.car;
                            dataArray.push(adataMap);
                            sum+=avalue;
                            subSum+=avalue;
                            var newValue=alarmSumMap.get(namekey)+avalue;
                            alarmSumMap.set(namekey,newValue);
                        }
                    }
                    subtext=subtext+key+":"+subSum+" ";
                    seriesData.data=dataArray;
                    this.$store.state.attack_type_detail.option.series.push(seriesData);
                }
                subtext="总数:"+sum+" "+subtext;
                this.$store.state.attack_type_detail.option.title.subtext=subtext;
                var sumseriesData={};
                sumseriesData.name='总数';
                sumseriesData.type='pictorialBar';
                sumseriesData.label=this.labelSetting;
                sumseriesData.symbolRepeat=true;
                sumseriesData.symbolSize=['80%', '60%'];
                sumseriesData.barCategoryGap='30%';
                sumseriesData.barGap='10%';
                var sumdataArray=[];

                for(var j=0;j<alarmArray.length;j++){
                    var dataMap={};
                    var sumkey=alarmArray[j];
                    var value=alarmSumMap.get(sumkey);
                    dataMap.value=value;
                    dataMap.symbol=this.pathSymbols.car;
                    sumdataArray.push(dataMap);
                }
                sumseriesData.data=sumdataArray;
                this.$store.state.attack_type_detail.option.series.push(sumseriesData);
            },
            refreshData(){
                if (this.option && typeof this.option === "object") {
                    this.myChart.setOption(this.option, true);
                }
            },

        }
    }
</script>

<style scoped>
    .count_title{
        color: #FFFFFF;
        font-size: 18px;
        font-weight: lighter;
        margin-left:15%;
        margin-top:15%;
    }
    .sub_pie_count{
        height: 20%;
    }
    .sub_count{
        height: 1500px;
    }
    .percent{
        width: auto;
        height: auto;
        color: #4CD964;
        font-family:PingFangSC-Medium, sans-serif;
        font-size: 18px;
        font-weight: bold;
        margin-top: 2%;
    }
    .left_marg{
        margin-left:15%;
    }
    .right_marg{
        margin-left:1%;
    }
    .count_type{
        width: auto;
        height: auto;
        color: #FFFFFF;
        font-family:PingFangSC-Light, sans-serif;
        font-size: 12px;
        font-weight: lighter;
    }

</style>
