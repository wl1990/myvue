<template>
    <div id="intercept_ip_hot" style="height: 100%"></div>
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
                data:{}
            }
        },
        mounted() {
            this.dataLoad();
        },
        methods: {
            dataLoad() {
                var dom = document.getElementById("intercept_ip_hot");
                var myChart = echarts.init(dom);
                this.option = this.$store.state.intercept_ip_hot.option;
                this.data=this.$store.state.intercept_ip_hot.data;
                this.geoCoordMap=this.$store.state.intercept_ip_hot.geoCoordMap;
                this.option.series[0].data=this.convertData(this.data);
                this.option.series[1].data=this.convertData(this.data.sort(function (a, b) {
                    return b.value - a.value;
                }).slice(0, 10));
                this.option.series[2].data=this.option.series[1].data;
                if (this.option && typeof this.option === "object") {
                    window.onresize = myChart.resize;
                    myChart.setOption(this.option, true);
                }
            },
            ...mapActions({}),
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

        }
    }
</script>

<style scoped>

</style>