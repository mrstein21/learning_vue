<template>
<div class="d-flex align-center justify-center" style="height: 100vh">
        <v-sheet width="400" class="mx-auto">
            <v-form fast-fail @submit.prevent="login">
                <v-text-field v-model="email" label="User Name" :rules="emailRules" ></v-text-field>
                <v-text-field v-model="password" label="password" :rules="passwordRules"></v-text-field>
                <a href="#" class="text-body-2 font-weight-regular">Forgot Password?</a>
                <v-btn type="submit" color="primary" block class="mt-2">Sign in</v-btn>
            </v-form>
            <div class="mt-2">
                <p class="text-body-2">Don't have an account? <a href="#">Sign Up</a></p>
            </div>
        </v-sheet>
    </div>
</template>
<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
             ],
             passwordRules: [
                v => !!v || 'Password is required',
             ],
        };
    },
    methods: {
        login() {
            this.$store.dispatch("auth/loginAction",{
              email : this.email,
              password : this.password   
            }).then((res)=>{
                if(res.data  != null){
                    this.$router.push("/"); 
                }else{
                    this.$toast.error(res.message,{duration:1200});
                }
            }).catch((err)=>{
                if(err.response != null){
                    this.$toast.error(err.response.data.message,{duration:1200});
                }else{
                    this.$toast.error(err,{duration:1200});
                }
            })
        },
    },
}

</script>