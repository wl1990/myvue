<template>
    <div >
        <el-row  :gutter="10">
            <el-col :span="24">
                <div class="sub_count">
                    <template>
                        <el-table
                                :data="tableData"
                                style="width: 100%;font-size: 11px;font-weight: lighter;font-family: 'Microsoft YaHei';color: #FACD19;background: #292929"
                        :row-style="rowStyle" :header-cell-style="headerStyle" :cell-style="{padding:'3px 0'}" :header-row-style="{height:'30px'}"
                        >
                            <el-table-column
                                    prop="alarm_count_type"
                                    label=""
                                    width="90%"
                                    >
                            </el-table-column>
                            <el-table-column
                                    prop="sum"
                                    label="总量"
                                    width="90%"
                                    >
                            </el-table-column>
                            <el-table-column
                                    prop="ATS"
                                    label="ATS"
                                    width="90%"
                                    >
                            </el-table-column>
                            <el-table-column
                                    prop="高频访问"
                                    label="高频访问"
                                    width="90%"
                                    >
                            </el-table-column>
                            <el-table-column
                                    prop="黑客攻击"
                                    label="黑客攻击"
                                    width="90%"
                                    >
                            </el-table-column>
                            <el-table-column
                                    prop="爬虫"
                                    label="爬虫"
                                    width="90%"
                                    >
                            </el-table-column>
                            <el-table-column
                                    prop="异常行为"
                                    label="异常行为"
                                    width="80%"
                                   >
                            </el-table-column>
                            <el-table-column
                                    prop="访问上限"
                                    label="访问上限"
                                    width="72%"
                                    >
                            </el-table-column>
                            <el-table-column
                                    prop="黑名单"
                                    label="黑名单"
                                    width="70%"
                                    >
                            </el-table-column>

                            <el-table-column
                                    prop="账号攻击"
                                    label="账号攻击"
                                    width="70%"
                                   >
                            </el-table-column>
                            <el-table-column
                                    prop="业务漏洞攻击"
                                    label="业务漏洞"
                                    width="70%"
                                    >
                            </el-table-column>

                            <el-table-column
                                    prop="博彩"
                                    label="博彩"
                                    width="70%"
                                    >
                            </el-table-column>
                            <el-table-column
                                    prop="传销"
                                    label="传销"
                                    width="70%"
                                    >
                            </el-table-column>
                            <el-table-column
                                    prop="挂证"
                                    label="挂证"
                                    width="70%"
                                   >
                            </el-table-column>
                            <el-table-column
                                    prop="刷单"
                                    label="刷单"
                                    width="70%"
                                    >
                            </el-table-column>
                            <el-table-column
                                    prop="刷金币"
                                    label="刷金币"
                                    width="70%"
                                    >
                            </el-table-column>
                            <el-table-column
                                    prop="虚假账号"
                                    label="虚假账号"
                                    width="70%"
                                    >
                            </el-table-column>
                            <el-table-column
                                    prop="广告"
                                    label="广告"
                                    width="70%"
                                    >
                            </el-table-column>
                            <el-table-column
                                    prop="支付推广"
                                    label="支付推广"
                                    width="70%"
                                    >
                            </el-table-column>
                        </el-table>
                    </template>
                </div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import echarts from 'echarts'
    import { mapActions } from 'vuex'
    var hiddenProperty = 'hidden' in document ? 'hidden' :
        'webkitHidden' in document ? 'webkitHidden' :
            'mozHidden' in document ? 'mozHidden' :
                null;
    var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
    var onVisibilityChange = function(){
        if (!document[hiddenProperty]) {
            console.log('页面非激活');
        }else{
            console.log('页面激活')
        }
    }
    document.addEventListener(visibilityChangeEvent, onVisibilityChange);
    export default {
        data() {
            return {
                tableData: [],
                refreshId:0,
                attacktype:{},
                rowStyle:{
                    background:'#292929',
                    height:'10px',
                },
                headerStyle:{
                    background:'#292929',
                    padding: '0px',
                },

            }
        },
        mounted() {
            this.dataLoad();
            this.initCountData();
            setInterval(this.initCountData, 300000);

        },
        methods: {
            dataLoad() {
                this.refreshData();
            },
            initCountData(){
                this.attacktype={};
                 // this.search();
                this.refreshId=setInterval(this.refresh, 1000);
            },
            ...mapActions({
                search:"searchAttackTypeDetailList",
            }),
            refresh(){
                this.attacktype=this.$store.state.attack_type_detail_list.attacktypeDetailList;
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
                this.attackDetail(this.attacktype);
                this.$forceUpdate();
            },
            attackDetail(attackType){
                this.tableData=[];
                var sum=0;
                var alarmArray=[];
                var alarmSumMap=new  Map();
                for (var key in attackType) {
                    var alarmTypeMap=attackType[key];
                    var seriesData={};
                    seriesData['alarm_count_type']=key;
                    var subSum=0;
                    if(alarmArray.length<=0){
                        for(var atype in alarmTypeMap){
                            var value=alarmTypeMap[atype];
                            alarmArray.push(atype);
                            alarmSumMap.set(atype,value);
                            seriesData[atype]=value;
                            sum+=value;
                            subSum+=value;
                        }
                    }else{
                        for(var j=0;j<alarmArray.length;j++){
                            var namekey= alarmArray[j];
                            var avalue=alarmTypeMap[namekey];
                            seriesData[namekey]=avalue;
                            sum+=avalue;
                            subSum+=avalue;
                            var newValue=alarmSumMap.get(namekey)+avalue;
                            alarmSumMap.set(namekey,newValue);
                        }
                    }
                    seriesData['sum']=subSum;
                    this.tableData.push(seriesData);
                }
                var dataMap={};
                dataMap['alarm_count_type']='';
                dataMap['sum']=sum;
                for(var j=0;j<alarmArray.length;j++){
                    var sumkey=alarmArray[j];
                    var value=alarmSumMap.get(sumkey);
                    dataMap[sumkey]=value;
                }
                this.tableData.push(dataMap);
            },
            refreshData(){
            },

        }
    }
</script>

<style scoped>
    .sub_count{
        height: 200px;
    }


</style>
