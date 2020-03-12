<template>
    <div id="intercept_dimension_scatter" style="height: 100%"></div>
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
                var dom = document.getElementById("intercept_dimension_scatter");
                var myChart = echarts.init(dom);
                this.option = this.$store.state.intercept_dimension_scatter.option;

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