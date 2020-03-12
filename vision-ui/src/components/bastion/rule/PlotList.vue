<template>
    <div>
        <el-table
                :data="tableData"
                stripe
                height="650"
                style="width: 100%">
            <el-table-column
                    prop="eventTypeName"
                    label="事件类型"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="plotKindName"
                    label="策略类型"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="eventSrc"
                    label="事件来源"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="entityDesc"
                    label="拦截对象"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="actionName"
                    label="动作"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="modifyTime"
                    label="更新时间"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="operatorName"
                    label="操作人"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="interceptStatusName"
                    label="事件状态"
                    width="100">
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
                :total="this.$store.state.plot_list.totalNum">
        </el-pagination>

    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    export default {
        data() {
            return {
                tableData: [],
                plotForm:{},
                timerange:"",
                totalNum:0,
                currentPage:1,
                maxPage:100,
                pageSize:100,
                pageSizes:[100,200,400],
                rules: {

                },

            }
        },
        methods: {
            loadData(){
                this.tableData = this.$store.state.plot_list.plotList;
                this.plotForm=this.$store.state.plot_list.plotForm;
                this.totalNum=this.$store.state.plot_list.totalNum;
                this.search(this.plotForm);
            },
            pageNumWarn(){
                this.$message({
                    showClose: true,
                    message: '最大页码'+this.maxPage,
                    type: 'warning',
                    center: true
                });
            },
            blankWarn(val){
                this.$message({
                    showClose: true,
                    message: val,
                    type: 'warning',
                    center: true
                });
            },
            handleSizeChange(val) {
                this.pageSize=val;
                this.currentPage=0;
                this.plotForm.currentPage=0;
                this.plotForm.pageSize=this.pageSize;
                this.search(this.plotForm);
            },
            handleCurrentChange(val) {
                if(val>this.maxPage){
                    this.pageNumWarn();
                    return;
                }
                this.currentPage=val;
                this.plotForm.currentPage=this.currentPage-1;
                this.plotForm.pageSize=this.pageSize;
                this.search(this.plotForm);
            },
            ...mapActions({
                search:"getPlotList",
            }),
        },
        mounted() {
            this.loadData();
        }
    }
</script>

<style>
    .el-pagination{
        margin-top: 10px;
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
