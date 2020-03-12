import axios from 'axios'

const state={
    waf_log_list:[{
        id:"225aa3c41a5f6469958d",
        timestamp:"2019-11-15 12:34:11",
        headers:"{\n" +
            "        \"host\":\"lpt.liepin.com\",\n" +
            "        \"content-type\":\"application/x-www-form-urlencoded\",\n" +
            "        \"x-real-ip\":\"120.197.24.59\",\n" +
            "        \"accept\":\"application/json, text/javascript, */*; q=0.01\",\n" +
            "        \"cookie\":\"_uuid=B9064101FFA848187736D9B9B178C21F; __uuid=1527817587488.46; gr_user_id=bb4bc32e-9c43-4318-b406-ac55c644c017; fe_h_guide_Layer=1527818168024; is_lp_user=true; new_user=false; need_bind_tel=false; fe_lpt_anniversary=true; fe_lpt_exclusiveMail=true; gr_cs1_5fc223f7-6931-419c-8f06-c6e2f8d1cfdd=user_id%3A2f2b5ec730da7709c80326c45bd843e5; gr_cs1_2233a7cd-eeaa-45da-bd7a-448ac42f3804=user_id%3A24ee6ced5f6716c06930a8b73a5b42c5; 9ddf2dc=917f998831dd61d8efd41b97b9b960d5; bad1b2d9162fab1f80dde1897f7a2972_gr_last_sent_cs1=0717a59d64500b931a667e00ad0d9493; grwng_uid=a09be3de-fac7-45c4-8ad4-bddb8a710e66; bad1b2d9162fab1f80dde1897f7a2972_gr_cs1=0717a59d64500b931a667e00ad0d9493; fe_lpt_yearReport=true; fe_all_activetab=contacts; user_photo=54d0c302712e894a54c78cbf02c.jpg; user_kind=1; imClientId=7af83bba0edbbac97ecc56c3b255caa9; imId=7af83bba0edbbac9d33e33097f8f9605; c_flag=b4959f85f877d3c5ab03a9420e38ce3d; verifycode=84e9d2c23a0942e8883d1da4c6e773b4; _fecdn_=1; __tlog=1546824288677.26%7C00000000%7C00000000%7C00000000%7C00000000; Hm_lvt_a2647413544f5a04f00da7eee0d5e200=1546054615,1546390024,1546479710,1546824289; Hm_lpvt_a2647413544f5a04f00da7eee0d5e200=1546824289; _mscid=00000000; user_name=%E6%A2%81%E6%96%87%E9%92%8A; lt_auth=6O0LayBRmgir5nmN3WAMsasf3NP7WGXApi4IhUgA0t65CfHi4PrjRQKDr7IFxBIhwxhyJsULNLT4%0D%0APer6y3pC6UURwGmkl4CxtPyk03seSu1cLqig0fn7lMrVQZ12l3EKznA3pn4TwEiishd0M4%2B%2Fzl7I%0D%0Ap6HH7ral8vvEsxS%2Fkw%3D%3D%0D%0A; UniqueKey=0717a59d64500b931a667e00ad0d9493; _l_o_L_=b77b66c2a30d3b880717a59d64500b931a667e00ad0d9493; login_temp=islogin; _e_ld_auth_=00cf8eec54a7ff29; b-beta2-config=%7B%22p%22%3A%220%22%2C%22level%22%3A%220%22%2C%22hasPhoneNum%22%3A%221%22%2C%22v%22%3A%222%22%2C%22audit%22%3A%221%22%2C%22photo%22%3A%22%2F%2Fimage0.lietou-static.com%2Fimg%2F5afa5b878e5032b59cda90d904a.png%22%2C%22ejm%22%3A%221%22%2C%22ecomp_id%22%3A2250604%2C%22n%22%3A%22%25E6%25A2%2581%25E6%2596%2587%25E9%2592%258A%22%2C%22canPublishJob%22%3A%221%22%7D; gr_session_id_2abfd0d7eaa44a729d761fb028300b6c=2181bc62-bd5e-4622-a326-a50e59f3b3ca; gr_cs1_2181bc62-bd5e-4622-a326-a50e59f3b3ca=user_id%3A2f2b5ec730da7709c80326c45bd843e5; fe_all_systemdot=false; fe_im_openchatwin=; __session_seq=45; __uv_seq=45; JSESSIONID=C2116C5BCAF30F6295423441CCC6BBAE; socketSequence=46_41\",\n" +
            "        \"accept-language\":\"zh-CN,zh;q=0.9\",\n" +
            "        \"content-length\":\"52\",\n" +
            "        \"x-forwarded-for\":\"120.197.24.59\",\n" +
            "        \"x-requested-with\":\"XMLHttpRequest\",\n" +
            "        \"accept-encoding\":\"gzip, deflate, br\",\n" +
            "        \"referer\":\"https://lpt.liepin.com/cvsearch/showcondition/\",\n" +
            "        \"user-agent\":\"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36\",\n" +
            "        \"origin\":\"https://lpt.liepin.com\"\n" +
            "    }",
        uri:"/cvsearchcondition/showconditionlist.json",
        client:"127.0.0.1",
        method:"POST",
        requestBody:"{\n" +
            "        \"traceId\":\"84809895428\",\n" +
            "        \"cs_type\":\"1\",\n" +
            "        \"search_resume_newcnt\":\"1\"\n" +
            "    }",
        alerts:"[\n" +
            "        {\n" +
            "            \"msg\":\"Repetitive non-word characters anomaly detected\",\n" +
            "            \"id\":40002,\n" +
            "            \"match\":66\n" +
            "        },\n" +
            "        {\n" +
            "            \"msg\":\"SQL Injection character anomaly - COOKIES\",\n" +
            "            \"id\":41014,\n" +
            "            \"match\":1\n" +
            "        },\n" +
            "        {\n" +
            "            \"msg\":\"SQL Injection character anomaly - ARGS\",\n" +
            "            \"id\":41015,\n" +
            "            \"match\":1\n" +
            "        },\n" +
            "        {\n" +
            "            \"msg\":\"MySQL comment-/space-obfuscated injections and backtick termination\",\n" +
            "            \"id\":41018,\n" +
            "            \"match\":9\n" +
            "        },\n" +
            "        {\n" +
            "            \"msg\":\"SQL probing attempt\",\n" +
            "            \"id\":41032,\n" +
            "            \"match\":6\n" +
            "        },\n" +
            "        {\n" +
            "            \"msg\":\" SQL injection (authentication bypass)\",\n" +
            "            \"id\":41033,\n" +
            "            \"match\":10\n" +
            "        },\n" +
            "        {\n" +
            "            \"msg\":\"SQL probing attempt\",\n" +
            "            \"id\":41036,\n" +
            "            \"match\":4\n" +
            "        },\n" +
            "        {\n" +
            "            \"logdata\":28,\n" +
            "            \"msg\":\"Request score greater than score threshold\",\n" +
            "            \"id\":99001,\n" +
            "            \"match\":28\n" +
            "        }\n" +
            "    ]"
    },{
        id:"c6725dfa2087a2480e7a",
        timestamp:"2019-01-10 17:36:30",
        headers:"{\n" +
            "        \"host\":\"secret.liepin.com\",\n" +
            "        \"cookie\":\"JSESSIONID=166FB98FB8239DB7BF888F85914A474B; abtest=0; c_flag=f1dd03fa1f5055722083cab03d5d76b9; is_lp_user=true; lt_auth=vO8DayAFzAirtyKLiDBW7fpLjdupAz3J9nhf0x8C0da6Xf3r4PbkSwqGp7E%2B%2FSocxhJzTv0PNbb4%0D%0APOn%2BwHZM60cr%2BGCliZ%2BytOW7138eTuxsHq2khv32wJ3ZFM4hlnACzCU28ikYlU%2F35UIhYNK7nwj0%0D%0Ajojux42n8vLEgyyHqAk%3D%0D%0A; need_bind_tel=false; new_user=false; user_kind=0; user_photo=59a414b37032c9d2a213499a06a.png; user_roles=0; verifycode=ac789bbc151a4c1a949c1b9c917dcd5f\",\n" +
            "        \"x-forwarded-for\":\"183.129.160.189, 211.151.18.23\",\n" +
            "        \"x-real-ip\":\"211.151.18.23\",\n" +
            "        \"user-agent\":\"Apache-HttpClient/4.5.2 (Java/1.7.0_79)\"\n" +
            "    }",
        uri:"/inspect/",
        client:"127.0.0.1",
        method:"GET",
        requestBody:"",
        alerts:"[\n" +
            "        {\n" +
            "            \"msg\":\"No valid Accept header\",\n" +
            "            \"id\":21003\n" +
            "        },\n" +
            "        {\n" +
            "            \"msg\":\"SQL Hex Encoding\",\n" +
            "            \"id\":41002,\n" +
            "            \"match\":36\n" +
            "        },\n" +
            "        {\n" +
            "            \"logdata\":6,\n" +
            "            \"msg\":\"Request score greater than score threshold\",\n" +
            "            \"id\":99001,\n" +
            "            \"match\":6\n" +
            "        }\n" +
            "    ]"
    }],
    waflogForm:{
        id:"",
        startTime:"",
        endTime:"",
        headers:"",
        uri:"",
        client:"",
        method:"",
        requestBody:"",
        alerts:"",
        offset:0,
        limit:100,
    },
    waflog_detail:{
        id:"",
        timestamp:"",
        headers:"",
        uri:"",
        client:"",
        method:"",
        requestBody:"",
        alerts:""
    },
    pickerOptions: {
        shortcuts: [{
            text: '最近一周',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近一个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近三个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
            }
        }]
    },


}

const actions={
    wafLogList({commit},payload){
/*        axios.get('')
            .then(response=>{console.log(response.data)})
            .catch(error=>{console.log(error)})
            .finally(()=> commit('dochartoption',payload));*/

    commit('dowafLogList',payload);
    },

}

const mutations={
    dowafLogList(state,payload){
        console.log("wafLogList payload");
        console.log(payload);
    }
}

const getter={

}

const moduleWaflogs={
    state:state,
    mutations:mutations,
    actions:actions,
    getter:getter
}

export default moduleWaflogs;