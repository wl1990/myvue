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
                    <el-input v-model.number="secureForm.offdays" placeholder="统计单位" autocomplete="off" style="width: 100px"></el-input>
                </el-form-item>
                <el-form-item class="el_item" prop="auto">
                    <el-select v-model="secureForm.auto" placeholder="触发方式" size="medium">
                        <el-option label="自动触发" value=true></el-option>
                        <el-option label="手动处理" value=false></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="el_item" prop="minNum">
                    <el-input v-model.number="secureForm.minNum" placeholder="最小数" autocomplete="off" style="width: 100px"></el-input>
                </el-form-item>
                <el-form-item class="el_item" prop="maxNum">
                    <el-input v-model.number="secureForm.maxNum" placeholder="最大数" autocomplete="off" style="width: 100px"></el-input>
                </el-form-item>
                <el-form-item class="el_item" prop="topNum">
                    <el-input v-model.number="secureForm.topNum" placeholder="top数" autocomplete="off" style="width: 100px"></el-input>
                </el-form-item>
                <el-form-item class="el_item">
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit('secureForm')">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div id="policy_event_user_count_policy" class="count_graph"></div>
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
                    minNum:0,
                    maxNum:3000,
                    topNum:15,
                    auto:null,
                },
                rules:{
                    offdays:[ { required: true, message: '请输入分段统计的天数', trigger: 'blur' },
                        { type: 'number', message: '必须为数字值',trigger: 'blur'}],
                    timerange:[{ required: true, message: '请输入时间范围', trigger: 'blur' }],
                    auto:[{required: true, message:'请选择触发方式' , trigger: 'blur'}],
                    minNum:[{required: true, message: '请输入最小值', trigger: 'blur'},
                        { type: 'number', message: '必须为数字值',trigger: 'blur'}],
                    maxNum:[{required: true, message: '请输入最大值', trigger: 'blur'},
                        { type: 'number', message: '必须为数字值',trigger: 'blur'}],
                    topNum:[{required: true, message: '请输入top值', trigger: 'blur'},
                        { type: 'number', message: '必须为数字值',trigger: 'blur'}]
                },
                nameValueMaplist:[],
                refreshId:0,
            }
        },
        mounted() {
            this.dataLoad();
        },
        methods: {
            dataLoad() {
                var dom = document.getElementById("policy_event_user_count_policy");
                this.myChart = echarts.init(dom);
                this.option = this.$store.state.poilcy_event_user_count_policy.option;
                this.pickerOptions=this.$store.state.poilcy_event_user_count_policy.pickerOptions;
                this.refresh();
            },
            onSubmit(formName){
                this.option.series=[];
                this.option.legend.data=[];
                this.option.xAxis.data=[];
                this.$store.state.poilcy_event_user_count_policy.nameValueMaplist=[];
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var search_form={
                            startTime:"",
                            endTime:"",
                            offdays:7,
                            auto:true,
                        };
                        search_form.startTime=this.secureForm.timerange[0];
                        search_form.endTime=this.secureForm.timerange[1];
                        search_form.offdays=this.secureForm.offdays;
                        search_form.auto=this.secureForm.auto;
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
                this.nameValueMaplist=this.$store.state.poilcy_event_user_count_policy.nameValueMaplist;
                var hasData=false;
                if(this.nameValueMaplist!=undefined && this.nameValueMaplist!=null && this.nameValueMaplist.length>0){
                    hasData=true;
                }
                if(hasData){
                    this.myChart.hideLoading();
                    clearInterval(this.refreshId);
                    for(var i=0;i<this.nameValueMaplist.length;i++){
                        var timeValueMap=this.nameValueMaplist[i];
                        for(var key in timeValueMap){
                            var timevalue=timeValueMap[key];
                            if(timevalue==undefined || timevalue==null){
                                break;
                            }
                            var flag=0;
                            for(var j=0;j<timevalue.length;j++){
                                var tvalue=timevalue[j][1]=="0.01" ? "0":timevalue[j][1];
                                if(parseFloat(tvalue)<this.secureForm.minNum || parseFloat(tvalue)>=this.secureForm.maxNum){
                                    flag=1;
                                    break;
                                }
                            }
                            if(flag==1){
                                break;
                            }
                            if(this.option.xAxis.data.length>=this.secureForm.topNum){
                                break;
                            }
                            this.option.xAxis.data.push(
                              key.toString()
                            );
                            for(var j=0;j<timevalue.length;j++){
                                var yvalue=timevalue[j][1]=="0.01" ? "0":timevalue[j][1];
                                var dataArray=[];
                                if(this.option.legend.data.length<timevalue.length){
                                    this.option.legend.data.push({
                                        name:timevalue[j][0].toString(),
                                        icon:'roundRect',
                                    });
                                }
                                if((j+1)>this.option.series.length){
                                    dataArray.push(
                                        parseFloat(yvalue),
                                    );
                                    this.option.series.push({
                                        label: {
                                            show: true,
                                            position: 'top',
                                            fontSize: 10,
                                        },
                                        type: 'bar',
                                        name: timevalue[j][0].toString(),
                                        data: dataArray,
                                    });
                                }else {
                                    this.option.series[j].data.push(parseFloat(yvalue));
                                }
                            }
                        }
                    }
                    this.refresh();
                }
            },
            ...mapActions({
                search:"searchUserPolicyTrend",
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
