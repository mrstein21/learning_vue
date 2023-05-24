<template>
  <v-app id="inspire">
    <SideTop/>
    <v-main style="background: #f5f5f540">
        <v-container class="py-8 px-6" fluid>
          <v-card>
            <template v-slot:title>
                List Airsoft
            </template>
          
            <template v-slot:text>
              <v-btn
               to="/airsoft/add"
              color="primary"
              class="me-4">
                Add Airsoft
            </v-btn>
            <br>
            <br>
              <v-col col="12" sm="6">
                  <v-text-field
                label="Search"
                v-model="name"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
              ></v-text-field>
              </v-col>
              
                <v-table density="compact">
                    <thead>
                        <tr>
                            <th  class="text-left">Name</th>
                            <th  class="text-left">Description</th>
                            <th  class="text-left">Price</th>
                            <th  class="text-left">Image</th>
                            <th class="text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr  v-for="item in airsoft.airsoft" :key="item.id">
                           <td>{{ item.name }}</td>
                           <td>{{ item.description }}</td> 
                           <td>{{ item.price }}</td> 
                           <td>
                             <v-img :src="item.full_path" width="80" height="80"/>
                           </td>
                           <td>
                            <v-btn
                              v-on:click="deleteAirsoft(item.id)"
                              density="comfortable"
                              icon="mdi-delete"
                            ></v-btn>
                            &nbsp;
                            <v-btn
                              density="comfortable"
                              :to="'/airsoft/'+item.id"
                              icon="mdi-pencil"
                            ></v-btn>
                           </td>
                        </tr>
                        <tr v-if="isLoading== true">
                           <td colspan="4">Loading ...</td> 
                        </tr>
                        <tr v-if="airsoft.airsoft.length == 0">
                           <td colspan="4">Data Not Found</td> 
                        </tr>
                    </tbody>
                </v-table>
            </template>
            <v-pagination
                v-model="page"
                @update:model-value="getAirsoft"
                :length="Math.ceil(airsoft.total/10)"
                rounded="0"              ></v-pagination>
          </v-card>
        </v-container>
    </v-main>
  </v-app>  
</template>
<script>
import { mapState } from 'vuex';
import SideTop from "@/components/SideTop.vue"
import _ from "lodash"

export default{
    name : "ListAirsoft",
    computed:{
      ...mapState([
        "airsoft"
        ]
      )
    },
    components :{
       SideTop
    },
    created(){
      this.page = 1;  
      this.getAirsoft(1);
    },
    watch :{
      name: _.debounce(function(){
        console.log(this.name);
        this.page = 1;
        this.getAirsoft(this.page); 
      },500)
    },
    data(){
       return {
          isLoading : false,
          page : 1,
          name : "",

       } 
    },
    methods :{
        deleteAirsoft(id){
          this.$swal({
              title: 'Are you sure?',
              text: "Are you sure want to delete this Airsoft ?",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes'
            }).then((result) => {
              if (result.value) {
                this.isLoading = true;
                this.$store.dispatch("airsoft/deleteAirsoftByIdAction",id).then(()=>{
                   this.isLoading = false;
                   this.page=1;
                   this.name = "";
                   this.$toast.success("Airsoft has been deleted",{duration:1200});
                }).catch((err)=>{
                  if(err.response != null){
                      this.$toast.error(err.response.data.message,{
                        duration:1500
                      })
                  }else{
                      this.$toast.error(err,{
                      duration:1500
                    })
                  }
                });
              }
            });

        },
        getAirsoft(pageIndex){
             this.page = pageIndex;
             console.log("HELO");
             this.isLoading = true;
             this.$store.dispatch("airsoft/getAirsoftAction",{
              page:this.page,
              keyword:this.name
            }).then(()=>{
             this.isLoading = false;
            }).catch((err)=>{
               alert(err);
               this.isLoading = false; 
            })
        }
    }
}
</script>