<template>
    <div>
        <el-row  :gutter="10">
            <el-col :span="12">
                <div class="trend-content bg-purple">
                    <InterceptTypeTrend></InterceptTypeTrend>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="trend-content bg-purple">
                    <InterceptKeyTrend></InterceptKeyTrend>
                </div>
            </el-col>
        </el-row>
       <!-- <el-row :gutter="10">
            <el-col :span="18">
                <div class="count-content bg-purple">
                    <InterceptDimensionScatter></InterceptDimensionScatter>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="count-content bg-purple">

                    <div style="height: 33%;">

                    </div>
                    <div style="height: 33%;">

                    </div>
                    <div style="height: 33%;">

                    </div>
                </div>
            </el-col>
        </el-row >-->
        <el-row  :gutter="10">
            <el-col :span="24">
                <div class="map-content bg-purple">
                    <InterceptIpHot></InterceptIpHot>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import InterceptIpTop from './InterceptIpTop.vue'
    import InterceptTypeTrend from './InterceptTypeTrend.vue'
    import InterceptKeyTrend from './InterceptKeyTrend.vue'
    import InterceptIpHot from './InterceptIpHot.vue'
    import InterceptDimensionScatter from './InterceptDimensionScatter.vue'

    export default {
        name: "InterceptCount",
        data(){
            return {
                msg: 'rule count'
            }
        },
        components: {
            InterceptIpTop:InterceptIpTop,
            InterceptTypeTrend:InterceptTypeTrend,
            InterceptKeyTrend:InterceptKeyTrend,
            InterceptIpHot:InterceptIpHot,
            InterceptDimensionScatter:InterceptDimensionScatter,
        },
        mounted(){
            this.dataLoad();
        },
        methods:{
            dataLoad(){

            },
            refresh(){

            }
        }
    }
</script>

<style scoped>
    .el-col {
        border-radius: 4px;
    }
    .bg-purple {
        background: #1b1b1b;
    }

    .count-content {
        border-radius: 4px;
        min-height: 36px;
        height:700px;
    }
    .trend-content {
        border-radius: 4px;
        min-height: 36px;
        height:800px;
    }
    .map-content {
        border-radius: 4px;
        min-height: 36px;
        height:700px;
    }
</style>
