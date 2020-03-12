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
                <el-form-item class="el_item" prop="auto">
                    <el-select v-model="secureForm.auto" placeholder="触发方式" size="medium">
                        <el-option label="自动触发" value=true></el-option>
                        <el-option label="手动处理" value=false></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="el_item" prop="minNum">
                    <el-input v-model.number="secureForm.minNum" placeholder="最小数" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="el_item" prop="maxNum">
                    <el-input v-model.number="secureForm.maxNum" placeholder="最大数" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="el_item" prop="topNum">
                    <el-input v-model.number="secureForm.topNum" placeholder="top值" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="el_item">
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit('secureForm')">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div id="policy_state_count" class="count_graph"></div>
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
                        { type: 'number', message: '必须为数字值',trigger: 'blur'}],
                },
                plotStatusValueMap:[],
                refreshId:0,
            }
        },
        mounted() {
            this.dataLoad();
        },
        methods: {
            dataLoad() {
                var dom = document.getElementById("policy_state_count");
                this.myChart = echarts.init(dom);
                this.option = this.$store.state.policy_event_state.option;
                this.pickerOptions=this.$store.state.policy_event_state.pickerOptions;
                this.refresh();
            },
            onSubmit(formName){
                this.option.series=[];
                this.option.legend.data=[];
                this.$store.state.policy_event_state.plotStatusValueMap={};
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var search_form={
                            startTime:"",
                            endTime:"",
                            auto:true,
                        };
                        search_form.startTime=this.secureForm.timerange[0];
                        search_form.endTime=this.secureForm.timerange[1];
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
                this.plotStatusValueMap=this.$store.state.policy_event_state.plotStatusValueMap;
                var hasData=false;
                if(this.plotStatusValueMap==undefined || this.plotStatusValueMap==null){
                   return;
                }
                for(var key in this.plotStatusValueMap){
                    hasData=true;
                    break;
                }
                if(!hasData){
                    return;
                }
                var selected = {};
                this.myChart.hideLoading();
                clearInterval(this.refreshId);
                var count=0;
                for(var key in this.plotStatusValueMap){
                    var timevalue=this.plotStatusValueMap[key];
                    if(timevalue==undefined || timevalue==null){
                        break;
                    }
                    count++;
                    selected[key]=count<=15;
                    this.option.legend.data.push({
                        name:key,
                        icon:'roundRect',
                    });
                    var dataArray=[];
                    for(var j=0;j<timevalue.length;j++){
                        var show=true;
                        var yvalue=parseFloat(timevalue[j][1]);
                        if(yvalue<=0){
                            show=false;
                        }
                        dataArray.push({
                            value:[
                                timevalue[j][0],
                                yvalue,
                            ],
                            label: {
                                show:show,
                            },
                        });
                    }
                    this.option.series.push(
                        {
                            label: {
                                show: true,
                                position: 'top',
                                fontSize: 10,
                            },
                            type: 'bar',
                            name:key,
                            data:dataArray,
                        });
                }
                for(var j=this.option.series[0].data.length-1;j>=0;j--){
                   var rflag=0;
                    for(var i=this.option.series.length-1;i>=0;i--){
                        var tvalue=this.option.series[i].data[j].value[1]
                        if(tvalue<this.secureForm.minNum || tvalue>=this.secureForm.maxNum){
                            rflag=1;
                            break;
                        }
                    }
                    if(rflag==1){
                        for(var m=this.option.series.length-1;m>=0;m--){
                            this.option.series[m].data.splice(j,1);
                        }
                    }
                }
                if(this.option.series[0].data.length>this.secureForm.topNum){
                    var deletenum=this.option.series[0].data.length-this.secureForm.topNum;
                    for(var i=0;i<this.option.series.length;i++){
                        this.option.series[i].data.splice(this.secureForm.topNum,deletenum);
                    }
                }
                this.option.legend.selected=selected;
                this.refresh();
            },
            ...mapActions({
                search:'policyStateAction',
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
