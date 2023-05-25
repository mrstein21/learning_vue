<template>
    <v-app id="inspire">
        <SideTop/>
        <v-main style="background: #f5f5f540">
            <v-container class="py-8 px-6" fluid >
                <v-card>
                    <template v-slot:title>
                        Add Airsoft
                    </template>
                    <template v-slot:text>
                            <VeeForm @submit="onSubmit" :validation-schema="schema">
                                   <Field name="name" v-slot="{field,errors}">
                                    <v-text-field
                                      v-model="form.name"
                                      label="Name"
                                      v-bind="field"
                                      :error-messages="errors"
                                    ></v-text-field>                                   
                                  </Field>
                                   <br>
                                   <Field
                                     name="description"
                                     v-slot="{field,errors}"
                                   >
                                    <v-text-field
                                      v-model="form.description"
                                      v-bind="field"
                                      :error-messages="errors"
                                      label="Description"
                                    >
                                    </v-text-field>
                                   </Field>
                                   <br> 
                                    <Field
                                       name="price"
                                       v-slot="{field,errors}"
                                    >
                                      <v-text-field
                                      v-bind="field"
                                      type="number"
                                      :error-messages="errors"
                                      v-model="form.price"
                                      label="Price"
                                    >
                                    </v-text-field>
                                  </Field>
                                 <br>
                                 <v-col cols="2" v-if="previewImage">
                                    <v-img with="100" height="100" class="preview my-3" :src="previewImage" alt="" />
                                 </v-col>
                                <br>  
                                 <v-col cols="8">
                                  <Field name="image" v-slot="{handleChange,errors}">
                                    <v-file-input
                                    show-size
                                    @change="handleChange"
                                    :error-messages="errors"
                                    label="Select Image"
                                    accept="image/*"
                                    prepend-icon="mdi-camera"
                                    @update:model-value="selectImage"
                                  ></v-file-input>
                                  </Field>
                                </v-col> 
                                <br>                               
                                <v-btn
                                v-if="airsoft.isLoadingAdd == false"
                                color="primary"
                                 class="me-4"
                                 type="submit"
                                >
                                Submit
                                </v-btn>
                                <v-btn
                                v-if="airsoft.isLoadingAdd == true"
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
      image:yup.mixed().required(),
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
  methods : {
    selectImage(image) {
      this.form.image = image[0];
      this.previewImage = URL.createObjectURL(image[0]);
    },
    onSubmit(){
      this.$store.dispatch("airsoft/addAirsoftAction",this.form).then(()=>{
        this.form = {}
        this.previewImage = null;
        this.$toast.success("Airsoft has been added",{duration:1200});
        this.$router.push("/airsoft");
      }).catch((err)=>{
        if(err.response != null){
          this.$toast.error(err.response.data.message,{duration:1200});
        }else{
          this.$toast.error(err,{duration:1200});
        }
      }) 
    }
  }

}

</script>