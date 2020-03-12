<template>
    <div >
        <el-row  :gutter="10">
            <el-col :span="24">
                <div class="sub_count">
                    <div id="userAttackType" style="height: 100%"></div>
                </div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import echarts from 'echarts'
    import { mapActions } from 'vuex'

    export default {
        data() {
            return {
                option: {},
                myChart:{},
                colors:{},
                userAttackCountPercentMap:{},
                refreshId:0,
                attacktype:{},

            }
        },
        mounted() {
            this.dataLoad();
            this.initCountData();
            setInterval(this.initCountData, 300000);

        },
        methods: {
            dataLoad() {
                var dom = document.getElementById("userAttackType");
                this.myChart = echarts.init(dom);
                this.option = this.$store.state.user_attack_type.option;
                this.colors=this.$store.state.user_attack_type.colors;
                this.refreshData();
            },
            initCountData(){
                this.attacktype={};
                  this.search();
                // this.myChart.showLoading();
                this.refreshId=setInterval(this.refresh, 1000);
            },
            ...mapActions({
                search:"searchUserAttackCount",
            }),
            refresh(){
                this.attacktype=this.$store.state.user_attack_type.userAttacktype;
                if(this.attacktype==undefined || this.attacktype==null){
                    return;
                }
                var hasData=false;
                for(var key in this.attacktype){
                    hasData=true;
                    break;
                }
                if(!hasData){
                    return;
                }
                clearInterval(this.refreshId);
                // this.myChart.hideLoading();
                this.$store.state.user_attack_type.option.series[0].data=this.attackPie(this.attacktype);
                this.refreshData();
                this.$forceUpdate();
            },
            attackPie(attackType){
                var piedata=[];
                var sum=0;
                for (var key in attackType) {
                    if(attackType[key]<=0){
                        continue;
                    }
                    sum+=attackType[key];
                    if(this.userAttackCountPercentMap[key]==undefined || this.userAttackCountPercentMap[key]==null){
                        this.userAttackCountPercentMap[key]=[0,0];
                    }
                    this.userAttackCountPercentMap[key][1]=attackType[key];
                }
                for(var key in this.userAttackCountPercentMap){
                    var times=this.userAttackCountPercentMap[key][1];
                    var percent=(times*100/sum).toFixed(3);
                    var newname=key+'\n'+'('+percent+'%)';
                    piedata.push({
                        value:times,
                        name:newname,
                    });
                }
                return piedata;
            },
            refreshData(){
                if (this.option && typeof this.option === "object") {
                    this.myChart.setOption(this.option, true);
                }
            },

        }
    }
</script>

<style scoped>

    .sub_count{
        height: 167px;
    }


</style>
