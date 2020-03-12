<template>
    <div>
        <el-row  :gutter="10">
            <el-col :span="24">
                <div class="trend-content bg-purple">
                    <OverLimitOperation></OverLimitOperation>
                </div>
            </el-col>

        </el-row>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import OverLimitOperation from './OverLimitOperation.vue'

    export default {
        data(){
            return {

            }
        },
        components: {
            OverLimitOperation:OverLimitOperation,

        },
        mounted(){
            this.dataLoad();
        },
        methods:{
            dataLoad(){


            },
            refresh(){

            }
        }
    }
</script>

<style scoped>
    .el-col {
        border-radius: 4px;
    }
    .bg-purple {
        background: #1b1b1b;
    }

    .trend-content {
        border-radius: 4px;
        min-height: 36px;
        height:600px;
    }
</style>
