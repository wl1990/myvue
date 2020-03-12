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
                <el-form-item class="el_item" prop="offdays">
                    <el-input v-model.number="secureForm.offdays" placeholder="按天数分段统计" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="el_item">
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit('secureForm')">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
    <div id="secure_total_trend" class="count_graph"></div>
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
                    offdays:7,
                },
                rules:{
                    offdays:[ { required: true, message: '请输入分段统计的天数', trigger: 'blur' },
                        { type: 'number', message: '必须为数字值',trigger: 'blur'}],
                    timerange:[{ required: true, message: '请输入时间范围', trigger: 'blur' }]
                },
                timeValueMap:{},
                refreshId:0,
            }
        },

        mounted() {
            this.dataLoad();
        },
        methods: {
            dataLoad() {
                var dom = document.getElementById("secure_total_trend");
                this.myChart = echarts.init(dom);
                this.option = this.$store.state.secure_total_trend.option;
                this.pickerOptions=this.$store.state.secure_total_trend.pickerOptions;
                this.timeValueMap=this.$store.state.secure_total_trend.timeValueMap;
                this.refresh();
            },
            onSubmit(formName){
                this.$store.state.secure_total_trend.timeValueMap={};
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var search_form={
                            startTime:"",
                            endTime:"",
                            offdays:1,
                        };
                        search_form.startTime=this.secureForm.timerange[0];
                        search_form.endTime=this.secureForm.timerange[1];
                        search_form.offdays=this.secureForm.offdays;
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
                this.timeValueMap=this.$store.state.secure_total_trend.timeValueMap;
                this.option.xAxis.data.splice(0);
                var hasData=false;
                for(var key in this.timeValueMap){
                    hasData=true;
                    break;
                }
                if(hasData){
                    this.myChart.hideLoading();
                    clearInterval(this.refreshId);
                    for(var i=0;i<this.option.series.length;i++){
                        var name=this.option.series[i].name;
                        var timevalue=this.timeValueMap[name];
                        if(timevalue==undefined || timevalue==null){
                            continue;
                        }
                        var dataArray=[];
                        for(var j=0;j<timevalue.length;j++){
                            if(i==0){
                                console.log("trend time=%o",timevalue[j][0].toString());
                                this.option.xAxis.data.push(timevalue[j][0].toString());
                            }
                            dataArray.push(
                                parseInt(timevalue[j][1]),
                            );
                        }
                        this.option.series[i].data=dataArray;
                    }
                    // this.$store.state.secure_total_trend.option.xAxis.minInterval=this.secureForm.offdays*3600 * 24 * 1000;
                    // this.$store.state.secure_total_trend.option.xAxis.maxInterval=this.secureForm.offdays*3600 * 24 * 1000;
                    // this.$store.state.secure_total_trend.option.xAxis.interval=this.secureForm.offdays*3600 * 24 * 1000;
                    this.refresh();
                }
            },
            ...mapActions({
                search:"secureEventTrend",
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
        height:400px;
    }
</style>
