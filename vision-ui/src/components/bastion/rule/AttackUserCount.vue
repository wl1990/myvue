<template>
    <div >
        <el-row  :gutter="10">
            <el-col :span="24">
                <div class="sub_count">
                    <div id="attack_user_count" style="height: 100%"></div>
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
                data:{},
                colors:{},
                userCountPercentMap:{},
                myChart:{},
                userAttackTimesMap:{},
                refreshid:0,
            }
        },

        mounted() {
            this.dataLoad();
            this.initCountData();
            setInterval(this.initCountData,300000);
        },
        methods: {
            dataLoad() {
                var dom = document.getElementById("attack_user_count");
                this.myChart = echarts.init(dom);
                this.colors=this.$store.state.attack_user_count.colors;
                this.option = this.$store.state.attack_user_count.option;
                this.refreshData();
            },
            ...mapActions({
                search:"searchUserPercent",
            }),
            initCountData(){
                this.userAttackTimesMap={};
                 this.search();
                this.refreshid=setInterval(this.refresh, 1000);
            },
            refresh(){
                this.userAttackTimesMap=this.$store.state.attack_user_count.userAttackTimesMap;
                if(this.userAttackTimesMap==undefined || this.userAttackTimesMap==null){
                    return;
                }
                var hasData=false;
                for(var key in this.userAttackTimesMap){
                    hasData=true;
                    break;
                }
                if(!hasData){
                    return;
                }
                clearInterval(this.refreshid);
                this.userCountPercentMap={};
                this.option.series[0].data=this.userAttackPie(this.userAttackTimesMap);
                this.refreshData();
                this.$forceUpdate();
            },
            userAttackPie(userAttackTimes){
                var piedata=[];
                var sum=0;
                var username="";
                for(var key in userAttackTimes){
                    username=key;
                    if("未知"==username || "系统"==username){
                        username="无用户";
                    }
                    if(userAttackTimes[key]>0){
                        var exists=false;
                        for(var i=0;i<piedata.length;i++) {
                            if (piedata[i].name == username) {
                                piedata[i].value = piedata[i].value + userAttackTimes[key];
                                exists = true;
                                break;
                            }
                        }
                        sum+=userAttackTimes[key];
                        if(this.userCountPercentMap[username]==undefined || this.userCountPercentMap[username]==null){
                            this.userCountPercentMap[username]=[0,0];
                            this.userCountPercentMap[username][1]=userAttackTimes[key];
                        }else{
                            this.userCountPercentMap[username][1]+=userAttackTimes[key];
                        }
                    }
                }
                for(var key in this.userCountPercentMap){
                    var times=this.userCountPercentMap[key][1];
                    var percent=(times*100/sum).toFixed(3);
                    var newname=key+'\n'+'('+percent+'%)';
                    piedata.push({
                        value: times,
                        name: newname,
                    });
                }
                return piedata;
            },
            refreshData(){
                if (this.option && typeof this.option === "object") {
                    this.myChart.setOption(this.option, true);
                }
            },
        },
    }
</script>

<style scoped>
    .sub_count{
        height: 167px;
    }



</style>
