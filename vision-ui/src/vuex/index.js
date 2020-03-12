import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import wafloglist from './modules/waflog/WafLogList.js'
import waf_attack_count from './modules/waflog/WafAttackCount.js'
import waf_ip_top from './modules/waflog/WafIpTop.js'
import waf_domain_top from './modules/waflog/WafDomainTop.js'
import ip_map from './modules/waflog/IpMap.js'

import rule_count from './modules/rule/RuleCount.js'
import attack_count from './modules/rule/AttackCount.js'
import ip_hot from './modules/rule/IpHot.js'
import intercept_graph from './modules/rule/InterceptGraph.js'
import main_graph from './modules/rule/MainGraph.js'

import attack_user_count from './modules/rule/AttackUserCount.js'
import interceptType_count from './modules/rule/InterceptTypeCount.js'
import attack_trend_line from './modules/rule/AttackTrendLine.js'
import intercept_trend_line from './modules/rule/InterceptTrendLine.js'
import plot_list from './modules/rule/PlotList.js'

import alarm_exact_count from './modules/rule/AlarmExactPieCount.js'
import user_attack_type from './modules/rule/UserAttackTypeCount.js'
import ip_attack_type from './modules/rule/IpAttackTypeCount.js'
import attack_type_detail from './modules/rule/AttackTypeDetail.js'
import attack_type_detail_list from './modules/rule/AttackTypeDetailList.js'


// intercept
import intercept_count from './modules/intercept/InterceptCount.js'
import intercept_ip_top from './modules/intercept/InterceptIpTop.js'
import intercept_type_trend from './modules/intercept/InterceptTypeTrend.js'
import intercept_key_trend from './modules/intercept/InterceptKeyTrend.js'
import intercept_ip_hot from './modules/intercept/InterceptIpHot.js'
import intercept_dimension_scatter from './modules/intercept/InterceptDimensionScatter.js'

// secure
import secure_event from './modules/secure_event/SecureEvent.js'
import secure_total_trend from './modules/secure_event/SecureTotalTrend.js'
import policy_event_count from './modules/secure_event/PolicyEventCount.js'
import policy_event_count_policy from './modules/secure_event/PolicyEventCountPolicy.js'
import poilcy_event_user_count_policy from './modules/secure_event/PolicyEventUserCountPolicy.js'
import policy_event_state from './modules/secure_event/PolicyStateCount.js'
import hand_policy_rate from './modules/secure_event/HandPolicyRate.js'

// doctor
import over_limit_operation from './modules/doctor/OverLimitOperation.js'



export default new Vuex.Store({
    modules:{
        wafloglist:wafloglist,
        waf_attack_count:waf_attack_count,
        waf_ip_top:waf_ip_top,
        waf_domain_top:waf_domain_top,
        ip_map:ip_map,

        rule_count:rule_count,
        attack_count:attack_count,
        ip_hot:ip_hot,
        intercept_graph:intercept_graph,
        attack_user_count:attack_user_count,
        interceptType_count:interceptType_count,
        attack_trend_line:attack_trend_line,
        intercept_trend_line:intercept_trend_line,
        main_graph:main_graph,
        plot_list:plot_list,
        alarm_exact_count:alarm_exact_count,
        user_attack_type:user_attack_type,
        ip_attack_type:ip_attack_type,
        attack_type_detail:attack_type_detail,
        attack_type_detail_list:attack_type_detail_list,


        intercept_count:intercept_count,
        intercept_ip_top:intercept_ip_top,
        intercept_type_trend:intercept_type_trend,
        intercept_key_trend:intercept_key_trend,
        intercept_ip_hot:intercept_ip_hot,
        intercept_dimension_scatter:intercept_dimension_scatter,

        secure_event:secure_event,
        secure_total_trend:secure_total_trend,
        policy_event_count:policy_event_count,
        policy_event_count_policy:policy_event_count_policy,
        poilcy_event_user_count_policy:poilcy_event_user_count_policy,
        policy_event_state:policy_event_state,
        hand_policy_rate:hand_policy_rate,

        over_limit_operation:over_limit_operation,
    }
})
