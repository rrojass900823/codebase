<template>
    <v-card
    flat
  >
    <v-card-text>
      <div class="general_section_style">
          <v-text-field
            label="Usuario"
            placeholder="Usuario"
            class="each_component_inside_style"
            variant="outlined"
            density="compact"
            v-model="username"
          ></v-text-field>
          <v-text-field
            v-model="password"
            class="each_component_inside_style"
            :append-inner-icon="visible_password ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible_password ? 'text' : 'password'"
            prepend-inner-icon="mdi-pencil"
            variant="outlined"
            density="compact"
            label="Contraseña"
            @click:append-inner="visible_password = !visible_password"
            @click:prepend-inner="changePasswordAction"
          ></v-text-field>
      </div>
    </v-card-text>
  </v-card>
  <ChangePasswordProfile v-model="modal_visibility" v-on:cancelAction="cancelAction" v-on:aceptAction="aceptAction"></ChangePasswordProfile>
</template>
<script>
import ChangePasswordProfile from './ChangePasswordProfile.vue';
  export default{
    name:"SegurityTab",
    components:{ChangePasswordProfile},
    data(){
      return{
        visible_password:false,
        password:"defaultPassword",
        username:"rroajss94",
        modal_visibility:false
      }
    },
    methods:{
      changePasswordAction(){
        this.modal_visibility = true;
      },
      cancelAction(){
        this.modal_visibility = false;
      },
      aceptAction(){
        this.modal_visibility = false;
      },
    }
  }
</script>
<style scoped>
  .general_section_style{
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
    padding: 10px 0 0 0;
    gap: 20px;
  }

  .each_component_inside_style{
    min-width:350px;
    max-width:350px;
  }
</style>
