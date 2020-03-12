<template>
    <div>
        <div>
            <el-form :inline="true" status-icon ref="secureForm" :model="secureForm" :rules="rules" size="small" class="secure_form">
                <el-form-item prop="timerange" class="el_item" style="margin-left: 20px;">
                    <el-date-picker
                            type="datetimerange"
                            v-model="secureForm.timerange"
                            :picker-options="pickerOptions"
                            align="right"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            value-format="yyyyMMddHHmmss"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item class="el_item">
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit('secureForm')">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div id="hand_policy_rate" class="count_graph"></div>
    </div>

</template>

<script>
    import echarts from 'echarts'
    import { mapActions } from 'vuex'

    export default {
        data() {
            return {
                option: {},
                pickerOptions:{},
                myChart:{},
                secureForm:{
                    timerange:"",
                },
                rules:{
                    timerange:[{ required: true, message: '请输入时间范围', trigger: 'blur' }],
                },
                plotHandleValueMap:[],
                refreshId:0,
                pieColor:{},
            }
        },
        mounted() {
            this.dataLoad();
        },
        methods: {
            dataLoad() {
                var dom = document.getElementById("hand_policy_rate");
                this.myChart = echarts.init(dom);
                this.option = this.$store.state.hand_policy_rate.option;
                this.pickerOptions=this.$store.state.hand_policy_rate.pickerOptions;
                this.pieColor=this.$store.state.hand_policy_rate.pieColor;
                this.refresh();
            },
            onSubmit(formName){
                this.option.series=[];
                this.option.legend.data=[];
                this.option.title=[];
                this.option.title.push(
                    {
                        text: '事件人工处理率',
                        textStyle:{
                            color:'#1b1b1b',
                        },
                        left:20,
                });
                this.$store.state.hand_policy_rate.plotHandleValueMap={};
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var search_form={
                            startTime:"",
                            endTime:"",
                        };
                        search_form.startTime=this.secureForm.timerange[0];
                        search_form.endTime=this.secureForm.timerange[1];
                        this.search(search_form);
                        this.myChart.showLoading();
                        this.refreshId=setInterval(this.watchResult,500);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            watchResult(){
                this.plotHandleValueMap=this.$store.state.hand_policy_rate.plotHandleValueMap;
                if(this.plotHandleValueMap==undefined || this.plotHandleValueMap==null){
                    return;
                }
                var sum=0;
                for(var key in this.plotHandleValueMap){
                    sum++;
                }
                if(sum>0){
                    this.myChart.hideLoading();
                    clearInterval(this.refreshId);
                    var count=0;
                    var cx=20;
                    var cy=30;
                    if(sum<=4){
                      if(sum==1){
                          cx=50;
                      }
                      if(sum==2){
                          cx=40;
                      }
                      if(sum==3){
                          cx=30;
                      }
                      cy=50;
                    }
                    for(var key in this.plotHandleValueMap){
                        var ratevalue=this.plotHandleValueMap[key];
                        if(ratevalue==undefined || ratevalue==null){
                            break;
                        }
                        count++;
                        var centx=cx;
                        var centy=cy;
                        var dataArray=[];
                        if(count>4){
                            centx=(count-4)*20;
                            centy=75;
                        }else{
                            centx=cx+(count-1)*20;
                        }
                        for(var j=0;j<ratevalue.length;j++){
                            if(ratevalue[j]<=0){
                                continue;
                            }
                            var name="";
                            if(j==0){
                                name="未处理";
                            }
                            if(j==1){
                                name="已处理";
                            }
                            if(j==2){
                                name="忽略";
                            }
                            dataArray.push({
                                value:ratevalue[j],
                                name:name,
                                itemStyle:{
                                    color: this.pieColor[name],
                                },
                            });
                        }
                        this.option.series.push(
                            {
                                type: 'pie',
                                avoidLabelOverlap: false,
                                radius: ['10%', '16%'],
                                center:[centx+'%',centy+'%'],
                                label: {
                                    fontSize:13,
                                    formatter: function (params) {
                                        return  params.name + ':\n' + params.value+'\n'+'('+params.percent+'%)';
                                    },

                                },
                                startAngle:160,
                                name:key,
                                data:dataArray,
                                minAngle:35,
                            });
                        this.option.title.push(
                            {
                                text: key,
                                textStyle:{
                                    color:'#1b1b1b',
                                },
                                textAlign: 'center',
                                x:centx+'%',
                                y:(centy-18)+'%',
                            }
                        );
                    }
                    this.refresh();
                }

            },
            ...mapActions({
                search:'policyHandleRateAction',
            }),
            refresh() {
                if (this.option && typeof this.option === "object") {
                    this.myChart.setOption(this.option, true);
                }
            }

        }
    }
</script>

<style scoped>
    .secure_form{
        background: #F0F0F0;
    }
    .el_item{
        margin-top: 15px;

    }
    .count_graph{
        height:700px;
    }
</style>