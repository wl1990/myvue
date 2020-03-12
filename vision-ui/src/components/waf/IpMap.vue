<template>
    <div id="ip_map" style="height: 100%"></div>
</template>

<script>
    import echarts from 'echarts'
    import { mapActions } from 'vuex'
    import '../../../node_modules/echarts/map/js/china.js'

    export default {
        data() {
            return {
                option: {},
                geoCoordMap:{},
                data:[]
            }
        },
        mounted() {
            this.dataLoad();
        },
        methods: {
            dataLoad() {
                var dom = document.getElementById("ip_map");
                var myChart = echarts.init(dom);
                this.option = this.$store.state.ip_map.option;
                this.data=this.$store.state.ip_map.BJData;
                this.geoCoordMap=this.$store.state.ip_map.geoCoordMap;
                this.option.series[0].data=this.convertData(this.data);
                this.option.series[1].data=this.convertData(this.data);
                this.option.series[2].data=this.convertTargetData(this.data);

                if (this.option && typeof this.option === "object") {
                    window.onresize = myChart.resize;
                    myChart.setOption(this.option, true);
                }
            },
            ...mapActions({}),
            convertData (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var fromCoord = this.geoCoordMap[dataItem[0].name];
                    var toCoord = this.geoCoordMap[dataItem[1].name];
                    if (fromCoord && toCoord) {
                        res.push({
                            coords: [fromCoord, toCoord],
                            lineStyle:{curveness:0.2},
                        });
                    }
                }
                return res;
            },
            convertTargetData(data){
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    res.push({
                        name: data[i][0].name,
                        value: this.geoCoordMap[data[i][0].name].concat([data[i][0].value])
                    });

                }
                res.push({
                    name: data[0][1].name,
                    value: this.geoCoordMap[data[0][1].name].concat([data[0][0].value/4])
                });
                return res;
            },
        }
    }
</script>

<style scoped>

</style>