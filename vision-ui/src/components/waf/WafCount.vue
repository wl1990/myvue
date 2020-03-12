<template>
    <div>
    <el-row  :gutter="10">
        <el-col :span="16">
            <div class="trend-content bg-purple">
                <WafAttackCount></WafAttackCount>
            </div>
        </el-col>

        <el-col :span="8">
            <div class="trend-content bg-purple">
                <div style="height: 50%;">
                    <WafIpTop></WafIpTop>
                </div>
                <div style="height: 49%;">
                    <WafDomainTop></WafDomainTop>
                </div>
            </div>
        </el-col>
    </el-row>
    <el-row :gutter="10">
        <el-col :span="24">
            <div class="rule-count-content bg-purple">
                <IpMap></IpMap>
            </div>
        </el-col>
    </el-row>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import WafAttackCount from './WafAttackCount.vue'
    import WafIpTop from './WafIpTop.vue'
    import WafDomainTop from './WafDomainTop.vue'
    import IpMap from './IpMap.vue'

    export default {
        data(){
            return {

            }
        },
        components: {
            WafAttackCount:WafAttackCount,
            WafIpTop:WafIpTop,
            WafDomainTop:WafDomainTop,
            IpMap:IpMap,
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
    .rule-count-content {
        border-radius: 4px;
        height:800px;
    }
    .bg-purple {
        background: #1b1b1b;
    }

    .trend-content {
        border-radius: 4px;
        min-height: 36px;
        height:600px;
    }
</style>
