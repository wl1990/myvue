import Vue from 'vue'
import VueRouter from 'vue-router'
import WaflogList from '../components/waf/WafLogList.vue'
import WafCount from '../components/waf/WafCount.vue'
import SecureEvent from '../components/bastion/secure_event/SecureEvent.vue'
import RuleCount from '../components/bastion/rule/RuleCount.vue'
import InterceptCount from '../components/bastion/intercept/InterceptCount.vue'
import DoctorCount from '../components/doctor/DoctorCount.vue'
import PlotList from '../components/bastion/rule/PlotList.vue'



Vue.use(VueRouter)

const router=new VueRouter({
    routes:[{
        path:'/secure_event',component:SecureEvent
    },{
        path:'/rule_count',component:RuleCount
    },{
        path:'/intercept_count',component:InterceptCount
    },{
        path:'/waflog_list',component:WaflogList
    },{
        path:'/waf_count',component:WafCount
    },{
        path:'/doctor_count',component:DoctorCount
    },{
        path:'/plot_list',component:PlotList
    }]
})

export default router;
