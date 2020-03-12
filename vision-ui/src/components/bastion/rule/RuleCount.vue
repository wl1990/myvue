<template>
    <div>
        <el-row  :gutter="10">
            <el-col :span="5">
                <div class="rule-count-content bg-purple">
                    <div class="rule_count_part">
                        <AttackTypeCount></AttackTypeCount>
                    </div>
                    <div class="rule_count_part" style="margin-top:10px">
                        <AlarmExactCount></AlarmExactCount>
                    </div>

                    <!--<div class="rule_count_part" style="margin-top:10px">
                        <InterceptTypeCount></InterceptTypeCount>
                    </div>-->
                </div>
            </el-col>
            <el-col :span="14">
                <div class="main-relation" >
                    <MainGraph></MainGraph>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="right_rule_count_part">
                    <AttackUserCount></AttackUserCount>
                </div>
                <div class="right_rule_count_part" style="margin-top: 5px">
                    <UserAttackTypeCount></UserAttackTypeCount>
                </div>
                <div class="right_rule_count_part" style="margin-top: 5px">
                    <IpAttackTypeCount></IpAttackTypeCount>
                </div>
            </el-col>
        </el-row>

        <el-row  :gutter="10">
            <el-col :span="24">
                <div class="attack_detail_part" style="margin-top: 10px;" >
                   <!-- <AttackTypeDetail></AttackTypeDetail>-->
                    <AttackTypeDetailList></AttackTypeDetailList>
                </div>
            </el-col>
        </el-row>

    <!--    <el-row :gutter="10">
            <el-col :span="24">
                <div class="rule-trend-content bg-purple">
                    <div style="height: 100%;">
                        <InterceptTrendLine></InterceptTrendLine>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="24">
                <div class="rule-map-content bg-purple">
                    <div style="height: 100%;">
                        <IpHot></IpHot>
                    </div>
                </div>
            </el-col>
        </el-row>-->

    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import AttackTypeCount from './AttackTypeCount.vue'
    import IpHot from './IpHotPoint.vue'
    import InterceptGraph from './InterceptGraph.vue'
    import AttackUserCount from './AttackUserCount.vue'
    import InterceptTypeCount from './InterceptTypeCount.vue'
    import AttackTrendLine from './AttackTrendLine.vue'
    import InterceptTrendLine from './InterceptTrendLine.vue'
    import MainGraph from './MainGraph.vue'
    import AlarmExactCount from './AlarmExactPieCount.vue'
    import UserAttackTypeCount from './UserAttackTypeCount.vue'
    import IpAttackTypeCount from './IpAttackTypeCount.vue'
    import AttackTypeDetail from './AttackTypeDetail.vue'
    import AttackTypeDetailList from  './AlarmTypeDetailList.vue'

    export default {
        name: "RuleCount",
        data(){
            return {
                msg: 'rule count',
                timeSelect:true,
            }
        },
        components: {
            AttackTypeCount:AttackTypeCount,
            IpHot:IpHot,
            InterceptGraph:InterceptGraph,
            AttackUserCount:AttackUserCount,
            InterceptTypeCount:InterceptTypeCount,
            AttackTrendLine:AttackTrendLine,
            InterceptTrendLine:InterceptTrendLine,
            MainGraph:MainGraph,
            AlarmExactCount:AlarmExactCount,
            UserAttackTypeCount:UserAttackTypeCount,
            IpAttackTypeCount:IpAttackTypeCount,
            AttackTypeDetail:AttackTypeDetail,
            AttackTypeDetailList:AttackTypeDetailList,
        },
        mounted(){
            this.dataLoad();
        },
        methods:{
            dataLoad(){

            },
            refresh(){

            },
            changeTime(){
                console.log("time="+this.timeSelect);
                this.timeSelect=true;
            }
        }
    }
</script>

<style >
    .bg-purple {
        background: #1b1b1b;
    }
    .main-relation{
        background:#1b1b1b;
        border-radius: 4px;
        height:500px;
    }
    .rule-count-content {
        border-radius: 4px;
        height:500px;
    }

    .rule_count_part{
        width:100%;
        height:50%;
        background:#292929;
        border-radius:6px;
    }
    .right_rule_count_part{
        width:100%;
        height: 33%;
        background:#292929;
        border-radius:1px;
    }
    .attack_detail_part{
        width:100%;
        height: 200px;
        background:#292929;
        border-radius:10px;
    }

</style>
