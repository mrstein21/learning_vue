import AuthService from "../services/auth_service"
export const auth = {
    namespaced: true,
    state: {
      user : JSON.parse(localStorage.getItem("user")),  
    },
    mutations:{
      setUser(state,user){
        state.user = user;
      }
    },
    actions: {
        loginAction({commit},user){
            return AuthService.login(user.email,user.password).then((resp)=>{
                if(resp.data.data!=null){
                    console.log(resp.data.data);
                   localStorage.setItem("user",JSON.stringify(resp.data.data)); 
                   commit("setUser",resp.data.data)
                   return Promise.resolve(resp.data);
                }else{
                   return Promise.resolve(resp.data); 
                }

            }).catch((err)=>{
                return Promise.reject(err);
            })
        },
    },
    getters :{

    },
  };