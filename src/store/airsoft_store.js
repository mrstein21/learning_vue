import { Promise } from "core-js";
import AirsoftService from "../services/airsoft_service"
export const airsoft = {
    namespaced: true,
    state: {
        airsoft : [],
        total : 0,
        isLoadingAdd : false,
        isLoadingEdit : false,
    },
    mutations:{
      setAirsoft(state,airsoft){
        state.airsoft = airsoft;
      },
      setTotalAirsoft(state,total){
        state.total = total;
      },
      setIsLoadingAdd(state,value){
        state.isLoadingAdd = value;
      },
      setIsLoadingEdit(state,value){
        state.isLoadingEdit = value;
      },
    },
    actions: {
        getAirsoftAction({commit},request){
           return AirsoftService.getAirsoft(request.page,request.keyword).then((resp)=>{
             commit("setAirsoft",resp.data.data.results);
             commit("setTotalAirsoft",resp.data.data.total)
             return Promise.resolve(resp.data);
           }).catch((err)=>{
             return Promise.reject(err);
           })
        },
        addAirsoftAction({commit},request){
          commit("setIsLoadingAdd",true);
          return AirsoftService.addAirsoft(request).then((resp)=>{
            commit("setIsLoadingAdd",false);
            return Promise.resolve(resp.data);
          }).catch((err)=>{
            commit("setIsLoadingAdd",false);
            return Promise.reject(err);
          })
        },
        getAirsoftByIdAction({commit},id){
          commit("setIsLoadingEdit",true);
          return AirsoftService.getAirsoftById(id).then((resp)=>{
            commit("setIsLoadingEdit",false);
            return Promise.resolve(resp.data);
          }).catch((err)=>{
            commit("setIsLoadingEdit",false);
            return Promise.reject(err);
          });
        },
        editAirsoftAction({commit},request){
          commit("setIsLoadingEdit",true);
          return AirsoftService.editAirsoft(request).then((resp)=>{
            commit("setIsLoadingEdit",false);
            return Promise.resolve(resp.data);
          }).catch((err)=>{
            commit("setIsLoadingEdit",false);
            return Promise.reject(err);
          })
        },
        deleteAirsoftByIdAction({dispatch},id){
          return AirsoftService.deleteAirsoftById(id).then((resp)=>{
             dispatch("getAirsoftAction",{page:1,keyword:""});
             return Promise.resolve(resp.data);
          }).catch((err)=>{
             return Promise.reject(err);
          })
        }
    },
    getters :{

    },
  };