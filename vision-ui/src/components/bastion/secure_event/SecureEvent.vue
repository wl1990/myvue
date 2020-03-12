<template>
    <div>
        <el-row  :gutter="10">
            <el-col :span="24">
                <div class="trend-content bg-purple">
                    <SecureEventTrend></SecureEventTrend>
                </div>
            </el-col>
        </el-row>
      <!--  <el-row  :gutter="10">
            <el-col :span="24">
                <div class="trend-content bg-purple" style="margin-top: 10px;height:800px;">
                    <PolicyEventCount></PolicyEventCount>
                </div>
            </el-col>
        </el-row>-->
        <el-row  :gutter="10">
            <el-col :span="24">
                <div class="trend-content bg-purple" style="margin-top: 10px;height:800px;">
                    <PolicyEventCountPolicy></PolicyEventCountPolicy>
                </div>
            </el-col>
        </el-row>
        <el-row  :gutter="10">
            <el-col :span="24">
                <div class="trend-content bg-purple" style="margin-top: 10px;height:800px;">
                    <PolicyEventUserCountPolicy></PolicyEventUserCountPolicy>
                </div>
            </el-col>
        </el-row>
        <el-row  :gutter="10">
            <el-col :span="24">
                <div class="trend-content bg-purple" style="margin-top: 10px;height:800px;">
                    <PolicyEventState></PolicyEventState>
                </div>
            </el-col>
        </el-row>

        <el-row  :gutter="10">
            <el-col :span="24">
                <div class="trend-content bg-purple" style="margin-top: 10px;height:800px;">
                    <HandlePolicyRate></HandlePolicyRate>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import SecureEventTrend from './SecureEventTrend.vue'
    import PolicyEventCount from './PolicyEventCount.vue'
    import PolicyEventState from './PolicyStateCount.vue'
    import HandlePolicyRate from './HandPolicyRate.vue'
    import PolicyEventCountPolicy from './PolicyEventCountPolicy.vue'
    import PolicyEventUserCountPolicy from './PolicyEventCountUserPolicy.vue'

    export default {
        data(){
            return{

            }
        },
        methods:{
            loadData(){

            },
        },
        mounted(){
            this.loadData();
        },
        components: {
            SecureEventTrend:SecureEventTrend,
            PolicyEventCount:PolicyEventCount,
            PolicyEventState:PolicyEventState,
            HandlePolicyRate:HandlePolicyRate,
            PolicyEventCountPolicy:PolicyEventCountPolicy,
            PolicyEventUserCountPolicy:PolicyEventUserCountPolicy
        },
    }
</script>

<style scoped>

    .bg-purple {
        background: #F0F0F0;
    }

    .trend-content {
        border-radius: 4px;
        min-height: 36px;
        height:500px;
    }
</style>
