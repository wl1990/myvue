import axios from 'axios'
import Vue from 'vue'
import { Message } from 'element-ui';

const state={
    totalNum:0,
    plotList:[
    ],
    plotForm:{
        attackType:"",
        interceptType:"",
        startTime:"",
        endTime:"",
        currentPage:0,
        pageSize:100
    },
}

const actions={
    getPlotList({commit},payload){
        axios.get('/intercept/plotlist.json',{
            params: {
                attackType:payload.attackType,
                interceptType:payload.interceptType,
                pagesize:payload.pageSize,
                pagenum:payload.currentPage,
                startTime:payload.startTime,
                endTime:payload.endTime
            },
            timeout: 25000,
            headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json'
        })
            .then(response=>{commit('doPlotList',response.data)})
            .catch(error=>{console.log("error=%o",error)})
            .finally(()=>{});
    },

}

const mutations={
    doPlotList(state,data){
        console.log("doPlotList data=[%o]",data.data);
        state.totalNum=data.data.totalCount;
        var datalist=data.data.list;
        state.plotList.splice(0,state.plotList.length);
        for(var i=0;i<datalist.length;i++){
            var obj=new Object();
            obj.eventTypeName=datalist[i].eventTypeName;
            obj.plotKindName=datalist[i].plotKindName;
            obj.eventSrc=datalist[i].eventSrc;
            obj.entityDesc=datalist[i].entityDesc;
            obj.actionName=datalist[i].actionName;
            obj.modifyTime=datalist[i].modifyTime;
            obj.operatorName=datalist[i].operatorName;
            obj.interceptStatusName=datalist[i].interceptStatusName;
            state.plotList.push(obj);
        }
    },


}

const getter={

}



const plotlist={
    state:state,
    mutations:mutations,
    actions:actions,
    getter:getter
}

export default plotlist;
