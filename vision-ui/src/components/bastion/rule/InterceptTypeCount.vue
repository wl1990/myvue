<template>
    <div>
        <el-row  :gutter="10">
            <el-col :span="24">
                <div class="sub_count">
                    <div id="interceptType" style="height: 100%"></div>
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
                option:{},
                myChart:{},
                colors:{},
                interceptCountPercentMap:{},
                refreshId:0,
                interceptType:[],
            }
        },
        mounted() {
            this.dataLoad();
            this.initCountData();
            setInterval(this.initCountData, 60000);

        },
        methods: {
            dataLoad() {
                var dom = document.getElementById("interceptType");
                this.myChart = echarts.init(dom);
                this.option = this.$store.state.interceptType_count.option;
                this.colors=this.$store.state.interceptType_count.colors;
                this.refreshData();
            },
            initCountData(){
                this.interceptType=[];
                this.search();
                // this.myChart.showLoading();
                this.refreshId=setInterval(this.refresh, 1000);
            },
            ...mapActions({
                search:"getInterceptPercent",
            }),
            refresh(){
                this.interceptType=this.$store.state.interceptType_count.interceptType;
                if(this.interceptType==undefined || this.interceptType==null){
                    return;
                }
                var hasData=false;
                for(var key in this.interceptType){
                    hasData=true;
                    break;
                }
                if(!hasData){
                    return;
                }
                clearInterval(this.refreshId);
                // this.myChart.hideLoading();
                this.$store.state.interceptType_count.option.series[0].data=this.interceptPie(this.interceptType);
                this.refreshData();
                this.$forceUpdate();
            },
            interceptPie(interceptType){
                var piedata=[];
                var sum=0;
                for (var key in interceptType) {
                    if(interceptType[key]<=0){
                        continue;
                    }

                    sum+=interceptType[key];
                    if(this.interceptCountPercentMap[key]==undefined || this.interceptCountPercentMap[key]==null){
                        this.interceptCountPercentMap[key]=[0,0];
                    }
                    this.interceptCountPercentMap[key][1]=interceptType[key];
                }
                for(var key in this.interceptCountPercentMap){
                    var times=this.interceptCountPercentMap[key][1];
                    var percent=(times*100/sum).toFixed(2);
                    var newname=key+'\n('+times+'-'+percent+'%)';
                    piedata.push({
                        value:times,
                        name:newname,
                    });
                }
                return piedata;
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
        height: 25%;
    }
    .sub_count{
        height: 240px;
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
