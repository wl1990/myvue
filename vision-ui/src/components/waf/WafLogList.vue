<template>
    <div class="bg-purple-white" style="height: 600px">
    <el-form :inline="true" :model="waflogForm" size="small"  class="demo-form-inline">
        <el-form-item >
            <el-input v-model="waflogForm.id" placeholder="id"></el-input>
        </el-form-item>
        <el-form-item >
            <el-col :span="11">
                <el-date-picker
                        type="datetimerange"
                        v-model="timerange"
                        :picker-options="pickerOptions2"
                        align="right"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        value-format="yyyyMMddHHmmss"
                ></el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item >
            <el-input v-model="waflogForm.headers" placeholder="headers"></el-input>
        </el-form-item>
        <el-form-item >
            <el-input v-model="waflogForm.uri" placeholder="uri"></el-input>
        </el-form-item>
        <el-form-item >
            <el-input v-model="waflogForm.client" placeholder="client"></el-input>
        </el-form-item>
        <el-form-item >
            <el-input v-model="waflogForm.requestBody" placeholder="requestbody"></el-input>
        </el-form-item>
        <el-form-item >
            <el-input v-model="waflogForm.alerts" placeholder="alerts"></el-input>
        </el-form-item>
        <el-form-item style="width: 120px">
            <el-select v-model="waflogForm.method" placeholder="请求方式">
                <el-option label="get" value="GET"></el-option>
                <el-option label="post" value="POST"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
    </el-form>


            <el-dialog title="WAF日志详情" :visible.sync="dialogFormVisible" width="50%" top="5vh">
                <el-form :model="waflog_detail" label-width="100px" size="mini">
                    <el-form-item label="ID" >
                        <el-input v-model="waflog_detail.id" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="日志时间" >
                        <el-input v-model="waflog_detail.timestamp" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="URI">
                        <el-input v-model="waflog_detail.uri" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="请求client">
                        <el-input v-model="waflog_detail.client" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="请求类型">
                        <el-input v-model="waflog_detail.method" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="请求体body">
                        <el-input  type="textarea"
                                   :rows="5"
                                   v-model="waflog_detail.requestBody"
                                   autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="alerts">
                        <el-input  type="textarea"
                                   :rows="5"
                                   v-model="waflog_detail.alerts"
                                   autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="请求header" >
                        <el-input  type="textarea"
                                   :rows="10"
                                   v-model="waflog_detail.headers"
                                   autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false" size="mini">确 定</el-button>
                </div>

            </el-dialog>

        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
        <el-table-column
                type="index"
                width="50"
        label="序号">
        </el-table-column>
        <el-table-column
                prop="id"
                label="Id"
                width="200">
        </el-table-column>
        <el-table-column
                prop="timestamp"
                label="日期"
                width="200"
                >
        </el-table-column>
        <el-table-column
                prop="uri"
                label="Uri"
        width="230">
        </el-table-column>
        <el-table-column
                prop="client"
                label="Client"
        width="100">
        </el-table-column>
        <el-table-column
                prop="method"
                label="类型"
        width="100">
        </el-table-column>
        <el-table-column
                prop="requestBody"
                label="Http Body"
        width="300">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                        type="text"
                        size="mini"
                        @click="detail(scope.row)"
                        icon="el-icon-more">详情</el-button>
            </template>
        </el-table-column>
    </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="pageSizes"
                :page-size="pageSize"
                background=""
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalNum">
        </el-pagination>

    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        data() {
            return {
                pickerOptions2: {},
                tableData: [],
                dialogFormVisible: false,
                waflogForm:{},
                waflog_detail:{},
                timerange:"",
                totalNum:2300,
                currentPage:1,
                maxPage:100,
                pageSize:100,
                pageSizes:[100,200,400],

            }
        },
        methods: {
            loadData(){
                this.tableData = this.$store.state.wafloglist.waf_log_list;
                this.waflogForm=this.$store.state.wafloglist.waflogForm;
                this.waflog_detail=this.$store.state.wafloglist.waflog_detail;
                this.pickerOptions2=this.$store.state.wafloglist.pickerOptions;
            },
            pageNumWarn(){
                    this.$message({
                        showClose: true,
                        message: '最大页码'+this.maxPage,
                        type: 'warning',
                        center: true
                    });
            },
            handleSizeChange(val) {
                this.pageSize=val;
                this.currentPage=1;
                this.waflogForm.offset=0;
                this.waflogForm.limit=this.pageSize;
                this.search(this.waflogForm);
            },
            handleCurrentChange(val) {
                if(val>this.maxPage){
                    this.pageNumWarn();
                    return;
                }
                this.currentPage=val;
                this.waflogForm.offset=(this.currentPage-1)*this.pageSize;
                this.waflogForm.limit=this.pageSize;
                this.search(this.waflogForm);
            },
            onSubmit() {
                this.waflogForm.startTime=this.timerange[0];
                this.waflogForm.endTime=this.timerange[1];
                this.currentPage=1;
                this.waflogForm.offset=0;
                this.waflogForm.limit=this.pageSize;
                this.search(this.waflogForm);
            },
            detail(row){
                this.dialogFormVisible=true;
                this.waflog_detail=row;
            },
            ...mapActions({
                search:"wafLogList"
            }),
        },
        mounted() {
            this.dialogFormVisible=false;
            this.loadData();
        }
    }
</script>

<style>
    .el-pagination{
        margin-top: 10px;
    }
    .bg-purple-white {
        background: #fffbfb;
    }
    @keyframes dialog-fade-in {
        0% {
            transform: translate3d(0,-100%, 0);
            opacity: 0;
        }
        100% {
            transform: translate3d(0, 0, 0);
            opacity: 1;
        }
    }
</style>
