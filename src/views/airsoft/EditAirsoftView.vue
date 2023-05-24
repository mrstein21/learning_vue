<template>
    <v-app id="inspire">
        <SideTop/>
        <v-main style="background: #f5f5f540">
            <v-container class="py-8 px-6" fluid >
                <v-card>
                    <template v-slot:title>
                        Edit Airsoft
                    </template>
                    <template v-slot:text>
                            <VeeForm @submit="onSubmit" :validation-schema="schema">
                                   <Field name="name" v-slot="{field,errors}" v-bind:model-value="form.name" >
                                    <v-text-field
                                      v-model="form.name"
                                      label="Name"
                                      v-bind="field"
                                      :value="form.name"
                                      :error-messages="errors"
                                    ></v-text-field>                                   
                                  </Field>
                                   <br>
                                   <Field
                                     name="description"
                                     v-slot="{field,errors}"
                                     v-bind:model-value="form.description"
                                   >
                                    <v-text-field
                                      v-model="form.description"
                                      v-bind="field"
                                      :value="form.description"
                                      :error-messages="errors"
                                      label="Description"
                                    >
                                    </v-text-field>
                                   </Field>
                                   <br> 
                                    <Field
                                       name="price"
                                       v-slot="{field,errors}"
                                       v-bind:model-value="form.price"
                                    >
                                      <v-text-field
                                      v-bind="field"
                                      type="number"
                                      :value="form.price"
                                      :error-messages="errors"
                                      v-model="form.price"
                                      label="Price"
                                    >
                                    </v-text-field>
                                  </Field>
                                 <br>
                                 <v-col cols="2" v-if="form.uploadFile!=null">
                                    <v-img with="100" height="100" class="preview my-3" :src="previewImage" alt="" />
                                 </v-col>
                                 <v-col cols="2" v-if="form.uploadFile==null">
                                    <v-img with="100" height="100" class="preview my-3" :src="form.full_path" alt="" />
                                 </v-col>
                                <br>  
                                 <v-col cols="8">
                                    <v-file-input
                                    show-size
                                    :error-messages="errors"
                                    label="Select Image"
                                    accept="image/*"
                                    prepend-icon="mdi-camera"
                                    @update:model-value="selectImage"
                                  ></v-file-input>
                                </v-col> 
                                <br>                               
                                <v-btn
                                v-if="airsoft.isLoadingEdit== false"
                                color="primary"
                                 class="me-4"
                                 type="submit"
                                >
                                Submit
                                </v-btn>
                                <v-btn
                                v-if="airsoft.isLoadingEdit == true"
                                color="primary"
                                 class="me-4"
                                >
                                 Loading...
                                </v-btn>
                            </VeeForm>
                    </template>
                </v-card>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
import SideTop from "@/components/SideTop.vue"
import {Form as VeeForm,Field} from 'vee-validate'
import { mapState } from "vuex";
import * as yup from "yup";

export default{
  name:"EditAirsoftView",  
  components:{
    SideTop,
    Field,
    VeeForm,
  },
  setup() {
    // Non-reactive because it was not explicitly defined with `reactive` or `ref`
    const schema = yup.object({
      name: yup.string().required(),
      description: yup.string().required(),
      price: yup.string().required(),
    });
    return {
      schema,
      
    };
  },
  computed:{
    ...mapState(["airsoft"])
  },
  data(){
    return {
        form :{},
        previewImage : null,
    }
  },
  created(){
    this.getAirsoftById(this.$route.params.id);
  },
  methods : {
    getAirsoftById(id){
      this.$store.dispatch("airsoft/getAirsoftByIdAction",id).then((resp)=>{
        this.form = resp.data;
        console.log(this.form);
      }).catch((err)=>{
         alert(err);
      })  
    },
    selectImage(image) {
      this.form.uploadFile = image[0];
      this.previewImage = URL.createObjectURL(image[0]);
    },
    onSubmit(){
      this.$store.dispatch("airsoft/editAirsoftAction",this.form).then(()=>{
          this.$toast.success("Edit Airsoft Success",{duration:2000});
          this.$router.push({path:"/airsoft",replace:true});          
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
      }) 
    }
  }

}

</script>
