<template>
    <div id="waf_attack_count" style="height: 100%"></div>
</template>

<script>
    import echarts from 'echarts'
    import { mapActions } from 'vuex'
    import WaflogList from '../waf/WafLogList.vue'
    import Vue from 'vue'


    export default {
        data() {
            return {
                option: {},
                myChart:{},
                router:'',
            }
        },
        mounted() {
            this.dataLoad();
        },
        methods: {
            dataLoad() {
                var dom = document.getElementById("waf_attack_count");
                this.myChart = echarts.init(dom);
                var updateChart=this.myChart;
                this.router=this.$router;
                console.log("router-%o",this.router);
                this.option = this.$store.state.waf_attack_count.option;
                this.myChart.on('updateAxisPointer', function (event) {
                    var xAxisInfo = event.axesInfo[0];
                    if (xAxisInfo) {
                        var dimension = xAxisInfo.value + 1;
                        updateChart.setOption({
                            series: {
                                id: 'pie',
                                label: {
                                    formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                                },
                                encode: {
                                    value: dimension,
                                    tooltip: dimension
                                }
                            }
                        });
                    }
                });
                this.myChart.on('click',this.newpage);
                if (this.option && typeof this.option === "object") {
                    this.myChart.setOption(this.option, true);
                }
            },
            newpage(params){
                console.log("params=%o",params);
                var index=params.componentIndex+1;
                this.router.push('/waflog_list');
                var lpage=this.router.resolve({path: '/#', params: {route:true}});
                // console.log("page href=%o",lpage.href);
                // window.open(lpage.href, '_blank');


            },
            ...mapActions({
                search:'search',
            }),
            refresh() {

            }

        }
    }
</script>

<style scoped>

</style>
