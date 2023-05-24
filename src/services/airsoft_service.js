import http from './http-common';
import authHeader from "./http-header";

class AirsoftService{
   getAirsoft(page,keyword = ""){
     return http.get("/airsoft?page="+page+"&name="+keyword,{
        headers : authHeader(),
     });
   }

   getAirsoftById(id){
      return http.get("/airsoft/"+id,{
         headers : authHeader(),
      });
    }

    deleteAirsoftById(id){
      return http.delete("/airsoft/delete/"+id,{
         headers : authHeader(),
      });
    }

   addAirsoft(airsoft){
     var formData = new FormData();
     formData.append("name",airsoft.name);
     formData.append("description",airsoft.description);
     formData.append("price",airsoft.price);
     formData.append("file",airsoft.image);
     var headers = authHeader();
     headers["Content-Type"] = "multipart/form-data";
     return http.post("/airsoft/add",formData,{
       headers : headers
     })
   }

   editAirsoft(airsoft){
    var formData = new FormData();
    formData.append("id",airsoft.id);
    formData.append("name",airsoft.name);
    formData.append("description",airsoft.description);
    formData.append("price",airsoft.price);
    if(airsoft.uploadFile!=null){
      formData.append("file",airsoft.uploadFile);
    }
    var headers = authHeader();
    headers["Content-Type"] = "multipart/form-data";
    return http.post("/airsoft/update",formData,{
      headers : headers
    })
  }
}

export default new AirsoftService();
