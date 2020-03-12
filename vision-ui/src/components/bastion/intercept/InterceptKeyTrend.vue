<template>
    <div id="intercept_key_trend" style="height: 100%"></div>
</template>

<script>
    import echarts from 'echarts'
    import { mapActions } from 'vuex'

    export default {
        data() {
            return {
                option: {},
            }
        },
        mounted() {
            this.dataLoad();
        },
        methods: {
            dataLoad() {
                var dom = document.getElementById("intercept_key_trend");
                var myChart = echarts.init(dom);
                this.option = this.$store.state.intercept_key_trend.option;
                myChart.on('updateAxisPointer', function (event) {
                    var xAxisInfo = event.axesInfo[0];
                    if (xAxisInfo) {
                        var dimension = xAxisInfo.value + 1;
                        myChart.setOption({
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
                if (this.option && typeof this.option === "object") {
                    myChart.setOption(this.option, true);
                }
            },
            ...mapActions({}),
            refresh() {

            }

        }
    }
</script>

<style scoped>

</style>