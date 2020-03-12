<template>
<el-container >

  <el-header>

      <el-row class="bg-purple-dark">
          <el-col :span="2">
              <div class="grid-content bg-purple-dark" align="center"
                   style="color:#FFFFFF;font-size: larger;
              width: 150px;
              height: 60px;
              border-bottom: 1px solid #F0F0F0;">
                  <div style="height: 100%;padding-top: 15px;">Vision</div>
              </div>
          </el-col>
          <el-col :span="22">
            <el-menu  default-active="1" @select="handleSelect" class="el-menu-demo"
                      mode="horizontal"
                      background-color="#1b1b1b"
                     text-color="#fff"
                     active-text-color="#ffd04b">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-menu"></i>bastion</template>
                    <el-menu-item index="1-1" >实时统计</el-menu-item>
                   <!-- <el-menu-item index="1-2">拦截统计</el-menu-item>-->
                    <el-menu-item index="1-3" >周报</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>doctor</template>
                    <el-menu-item index="2-1">doctor统计</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-menu"></i>waf</template>
                    <el-menu-item index="3-1">waf列表</el-menu-item>
                    <el-menu-item index="3-2">waf可视化</el-menu-item>
                </el-submenu>
            </el-menu>
          </el-col>
      </el-row>

  </el-header>
    <el-main>
          <div >
              <router-view></router-view>
          </div>
    </el-main>
</el-container>

</template>

<style>
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #1b1b1b;
    }
    .grid-content {
        border-radius: 1px;
    }


</style>

<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                searchCriteria: '',
                plotlistForm:{},
            }
        },
        mounted(){
            this.plotlistForm=this.$store.state.plot_list.plotForm;
            if(this.plotlistForm.startTime!='' && this.plotlistForm.startTime!=null){
                this.$router.push('/plot_list')
            }else{
                this.handleSelect('1-1','');
            }
        },
        methods:{
            handleIconClick(ev) {
                console.log(ev);
            },
            handleSelect(key,keyPath){
                switch(key){
                    case'1-1':
                        this.$router.push('/rule_count')
                        break;
                   /* case'1-2':
                        this.$router.push('/intercept_count')
                        break;*/
                    case'1-3':
                        this.$router.push('/secure_event')
                        break;
                    case '2-1':
                        this.$router.push('/doctor_count')
                        break;
                     case '3-1':
                        this.$router.push('/waflog_list')
                        break;
                    case '3-2':
                        this.$router.push('/waf_count')
                        break;
                }
            }
        },
    }
</script>
