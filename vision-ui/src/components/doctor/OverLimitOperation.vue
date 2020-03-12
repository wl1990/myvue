<template>
    <div id="over_limit_operation" style="height: 100%"></div>
</template>

<script>
    import echarts from 'echarts'
    import { mapActions } from 'vuex'

    export default {
        data() {
            return {
                option: {},
                yMax:"",
                dataShadow:[],
                data:[],
            }
        },
        mounted() {
            this.dataLoad();
        },
        methods: {
            dataLoad() {
                var dom = document.getElementById("over_limit_operation");
                var myChart = echarts.init(dom);
                this.option = this.$store.state.over_limit_operation.option;
                var dataAxis= this.$store.state.over_limit_operation.dataAxis;
                this.option.xAxis.data=dataAxis;
                this.data=this.$store.state.over_limit_operation.data;
                 this.dataShadow=this.$store.state.over_limit_operation.dataShadow;
                 this.yMax=this.$store.state.over_limit_operation.yMax;
                this.pushDataShadow();
                this.option.series[0].data=this.dataShadow;
                this.option.series[1].data=this.data;
                this.option.series[1].itemStyle.normal.color=new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: '#83bff6'},
                        {offset: 0.5, color: '#188df0'},
                        {offset: 1, color: '#188df0'}
                    ]
                );
                this.option.series[1].itemStyle.emphasis.color=new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: '#2378f7'},
                        {offset: 0.7, color: '#2378f7'},
                        {offset: 1, color: '#83bff6'}
                    ]
                );

                var zoomSize = 6;
                var minvalue=0;
                myChart.on('click', function (params) {
                    console.log(params.dataIndex);
                    myChart.dispatchAction({
                        type: 'dataZoom',
                        startValue: this.dataAxis[Math.max((params.dataIndex - zoomSize / 2), minvalue)],
                        endValue: this.dataAxis[Math.max((params.dataIndex + zoomSize / 2), this.data.length - 1)]
                    });
                });
                if (this.option && typeof this.option === "object") {
                    myChart.setOption(this.option, true);
                }
            },
            ...mapActions({}),
            refresh() {
            },
            pushDataShadow(){
                for (var i = 0; i < this.data.length; i++) {
                    this.dataShadow.push(this.yMax);
                }
            },
            maxNum(data1,data2){
                if(data1>=data2){
                    return data1;
                }else{
                    return data2;
                }
            },
            minNum(data1,data2){
                if(data1>=data2){
                    return data2;
                }else{
                    return data1;
                }
            },
        }
    }
</script>

<style scoped>

</style>