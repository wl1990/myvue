<template>
    <div id="waf_ip_top" style="height: 100%"></div>
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
                var dom = document.getElementById("waf_ip_top");
                var myChart = echarts.init(dom);
                this.option = this.$store.state.waf_ip_top.option;
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