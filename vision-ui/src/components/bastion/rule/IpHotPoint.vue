<template>
    <div id="iphot" style="height: 100%"></div>
</template>

<script>
    import echarts from 'echarts'
    import { mapActions } from 'vuex'
    import '../../../../node_modules/echarts/map/js/china.js'

    export default {
        data() {
            return {
                option: {},
                geoCoordMap:[],
                hotnum:0,
                myChart:{},
                refreshId:0,
                ipValueMap:{},
            }
        },
        mounted() {
            this.dataLoad();
            this.initCountData();
            setInterval(this.initCountData, 60000);

        },
        methods: {
            dataLoad() {
                var dom = document.getElementById("iphot");
                this.myChart = echarts.init(dom);
                this.option = this.$store.state.ip_hot.option;
                this.geoCoordMap=this.$store.state.ip_hot.geoCoordMap;
                this.refreshData();
            },
            initCountData(){
                this.ipValueMap={};
                this.search();
                // this.myChart.showLoading();
                this.refreshId=setInterval(this.refresh, 500);
            },
            ...mapActions({
                search:"searchIp",
            }),
            makeHotData(){
                var ipdata=this.convertIpArray();
                if(ipdata.length>0) {
                    this.hotnum=11;
                    if(ipdata.length<=10){
                        this.hotnum=ipdata.length;
                    }
                    var  tempdata=[];
                    for(var i=0;i<ipdata.length;i++){
                        tempdata.push(ipdata[i]);
                    }
                    this.option.series[0].data = this.convertData(tempdata);
                    this.option.series[1].data = this.convertData(tempdata.sort(function (a, b) {
                        return b.value - a.value;
                    }).slice(0, this.hotnum));
                    this.option.series[2].data = this.convertPieData(tempdata.sort(function (a, b) {
                        return b.value - a.value;
                    }).slice(0, this.hotnum));
                }
            },
            refresh(){
                this.ipValueMap=this.$store.state.ip_hot.ipValueMap;
                if(this.ipValueMap==undefined || this.ipValueMap==null){
                    return;
                }
                var hasData=false;
                for(var key in this.ipValueMap){
                    hasData=true;
                    break;
                }
                if(!hasData){
                    return;
                }

                clearInterval(this.refreshId);
                // this.myChart.hideLoading();
                this.makeHotData();
                this.refreshData();
            },
            convertIpArray(){
                var ipdata=[];
                if(this.ipValueMap==undefined || this.ipValueMap==null){
                    return piedata;
                }
                for(var key in this.ipValueMap){
                    ipdata.push({
                        name:key,
                        value:this.ipValueMap[key]
                    });
                }
                return ipdata;
            },
            refreshData(){
                if (this.option && typeof this.option === "object") {
                    this.myChart.setOption(this.option, true);
                }
            },
            convertData (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = this.geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            },

            convertPieData (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = this.geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: data[i].value
                        });
                    }
                }
                return res;
            },

        }
    }
</script>

<style scoped>

</style>