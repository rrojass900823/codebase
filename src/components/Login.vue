<template>
  <v-navigation-drawer :v-model="drawer" temporary location="right">
    <div>
      <v-responsive class="mx-auto" max-width="90%" style="margin-top: 10%; padding: 10px;">
        <br />
        <v-icon color="cyan" icon="mdi-badge-account" style="margin-left: 40%;font-size: 350%;"></v-icon>
        <br /><br />

        <v-window v-model="step">
          <v-window-item :value="1">
            <v-form v-model="login_form" @submit.prevent="onSubmit">
              <v-text-field label="Usuario" type="input" v-model="userName" @update:focused="errorInLogin = false"
                prepend-inner-icon="mdi-account-outline" :rules="[required_user]" variant="underlined">
              </v-text-field>
              <v-text-field label="Contraseña" :type="visible_password ? 'text' : 'password'" v-model="passWord"
                :rules="[required_password]" variant="underlined" prepend-inner-icon="mdi-lock-outline"
                :append-inner-icon="visible_password ? 'mdi-eye-off' : 'mdi-eye'" @update:focused="errorInLogin = false"
                @click:append-inner="visible_password = !visible_password"></v-text-field>
              <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">
                  Olvidó su contraseña?</a>
              </div>
              <span>
                <br />
                <v-alert v-if="errorInLogin" icon="mdi mdi-key-chain-variant" :text="loginErrorMessage" type="error"
                  variant="tonal"></v-alert>
                <br />
              </span>
              <v-btn :disabled="!login_form" block class="text-none mb-8" color="cyan-darken-2" size="large" type="submit"
                :loading="loading">Acceder</v-btn>
              <v-card-text class="text-center">
                <label class="text-blue text-decoration-none" @click="step++" style="cursor: pointer;">
                  Registrarme ahora <v-icon icon="mdi-chevron-right"></v-icon>
                </label>
              </v-card-text>
            </v-form>
          </v-window-item>
          <v-window-item :value="2">
            <v-form v-model="register_form_stp1" @submit.prevent="onSubmitRegisterStp1">
              <v-sheet class="d-flex mt-auto" style="padding: 5px;" color="grey-lighten-2" rounded>
                <p class="info_create_account_text">Vamos por ahora a tomar solo algunos datos iniciales necesarios para
                  crear su usuario en el sistema,
                  más adelante en la sección del Perfil, terminaremos de completar todo lo necesario.</p>
              </v-sheet>
              <br />
              <v-text-field label="Usuario" type="input" v-model="NewUserName" :color="colorOfUserInput"
                :loading="user_check_loading" prepend-inner-icon="mdi-account-outline" :rules="[required_newuser]"
                variant="underlined">
              </v-text-field>
              <v-text-field label="Contraseña" :type="visible_newpassword1 ? 'text' : 'password'" v-model="newPassWord1"
                :rules="[required_newpassword]" variant="underlined" prepend-inner-icon="mdi-lock-outline"
                :append-inner-icon="visible_newpassword1 ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="visible_newpassword1 = !visible_newpassword1"></v-text-field>
              <v-text-field label="Repita la contraseña" :type="visible_newpassword2 ? 'text' : 'password'"
                v-model="newPassWord2" :rules="[required_newpassword]" variant="underlined"
                prepend-inner-icon="mdi-lock-outline"
                :append-inner-icon="visible_newpassword2 ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="visible_newpassword2 = !visible_newpassword2"></v-text-field>

              <v-alert v-if="errorInLoginstp1" icon="mdi mdi-key-chain-variant" :text="loginErrorMessageStp1" type="error"
                variant="tonal"></v-alert>
              <br />
              <span style="display: flex; justify-content: space-between;">
                <label class="text-blue text-decoration-none" @click="step--" style="cursor: pointer;">
                  <v-icon icon="mdi-chevron-left"></v-icon>Atras
                </label>
                <v-btn :disabled="!register_form_stp1" class="text-none mb-8" color="cyan-darken-2" size="small"
                  type="submit">Siguiente</v-btn>
              </span>
            </v-form>
          </v-window-item>
          <v-window-item :value="3">
            <v-form v-model="register_form_stp2" @submit.prevent="onSubmitRegisterStp2">
              <v-sheet class="d-flex mt-auto" style="padding: 5px;" color="grey-lighten-2" rounded>
                <p class="info_create_account_text">Ahora dinos de dónde eres por favor, queremos
                  saber donde ir a tomarnos un cafecito.</p>
              </v-sheet>
              <br />
              <div class="general_section_style">
                <v-autocomplete clearable label="Provincia" density="compact" class="each_component_inside_style" :items=provincias
                  variant="outlined" :rules="[select_rules.required]"></v-autocomplete>
                <v-autocomplete clearable label="Municipio" density="compact" class="each_component_inside_style" :items=municipios
                  variant="outlined" :rules="[select_rules.required]"></v-autocomplete>
                <v-text-field label="Direccion" placeholder="Direccion" density="compact" class="each_component_inside_style"
                  variant="outlined" v-model="address" counter="150"
                  :rules="[address_rules.required, address_rules.max]"></v-text-field>
              </div>
              <br />
              <span style="display: flex; justify-content: space-between;">
                <label class="text-blue text-decoration-none" @click="step--" style="cursor: pointer;">
                  <v-icon icon="mdi-chevron-left"></v-icon>Atras
                </label>
                <v-btn :disabled="!register_form_stp2" :loading="loading_register_form_stp2" class="text-none mb-8" color="cyan-darken-2" size="small"
                  type="submit">Finalizar</v-btn>
              </span>
            </v-form>
          </v-window-item>
        </v-window>
      </v-responsive>
    </div>
  </v-navigation-drawer>
</template>

<script>

import { mapActions, mapState } from "vuex";
import LocationTab from "./Profile/LocationTab.vue";
export default {
  name: "Login",
  watch: {},
  components: { LocationTab },
  computed: {
    ...mapActions("auth", ['logOut', 'logIn', 'someoneLogin']),
  },
  data() {
    return {
      errorInLoginstp1: false,
      register_form_stp1: false,
      register_form_stp2: false,
      visible_newpassword1: false,
      visible_newpassword2: false,
      loading_register_form_stp2: false,
      colorOfUserInput: "default",
      user_check_loading: false,
      newPassWord1: undefined,
      newPassWord2: undefined,
      NewUserName: undefined,
      step: 1,
      register_step: true,
      login_form: false,
      visible_password: false,
      loading: false,
      timeout: null,
      userName: undefined,
      passWord: undefined,
      errorInLogin: false,
      loginErrorMessage: "",
      provincias:['Camagüey', 'Matanzas'],
      municipios:['Nuevitas', 'Camagüey', 'Florida'],
      address:"Calle Nueva #9 entre Micro y Final, Las Delicias, Camaguey",
      select_rules:{
        required: value => !!value || 'Obligatorio.',
      },
      address_rules:{
        required: value => !!value || 'Obligatorio.',
        max: v => v.length <= 150 || 'Max 150 caracteres',
      }
    }
  },
  props: {
    drawer: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    required_newuser(v) {
      return !!v || 'El usuario es obligatorio'
    },
    required_user(v) {
      return !!v || 'El usuario es obligatorio'
    },
    required_password(v) {
      return !!v || 'La contraseña es obligatoria'
    },
    required_newpassword(v) {
      return !!v || 'La contraseña es obligatoria'
    },
    async onSubmitRegisterStp1() {
      this.colorOfUserInput = "success"
      this.user_check_loading = true;
      await this.checkApi(this.NewUserName).then((response) => {
        switch (response) {
          case 200:
            this.colorOfUserInput = "default"
            this.user_check_loading = false;
            this.step++;
            break;
          case 204:
            this.loginErrorMessageStp1 = "El usuario no se encontró";
            this.colorOfUserInput = "default"
            this.errorInLoginstp1 = true;
            this.user_check_loading = false;
            break;
          case 300:
            this.loginErrorMessageStp1 = "El usuario no esta displonible";
            this.colorOfUserInput = "default"
            this.errorInLoginstp1 = true;
            this.user_check_loading = false;
            break;
          default:
            break;
        }
      })
    },
    async checkApi(userName) {
      return new Promise(resolve => {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          if (!userName) return resolve(204)
          if (userName === 'rrojass') return resolve(300)
          return resolve(200)
        }, 1000)
      })
    },
    async onSubmit() {
      this.loading = true;
      this.errorInLogin = false;
      await this.checkApi(this.userName).then((response) => {
        switch (response) {
          case 200:
            this.loading = false;
            this.logIn;
            break;
          case 204:
            this.loginErrorMessage = "El usuario no se encontró";
            this.errorInLogin = true;
            this.loading = false;
            break;
          case 300:
            this.$swal({
              position: "top-end",
              icon: "error",
              title: "El usuario está bloqueado!",
              showConfirmButton: false,
              timer: 2000
            });
            this.loading = false;
            break;
          default:
            break;
        }
      })
    },
    async onSubmitRegisterStp2(){
      this.loading_register_form_stp2 = true;
      setTimeout(() => {
        this.$swal({
          position: "top-end",
          icon: "success",
          title: "El usuario se registró satisfactoriamente!",
          showConfirmButton: false,
          timer: 2000
        });
        this.step=1;
        this.loading_register_form_stp2 = false;
        }, 2000)
    },
  },
}
</script>
<style scope>
.info_create_account_text {
  opacity: 50%;
  font-size: 12px;
  text-align: justify;
}
.general_section_style{
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
    padding: 10px 0 0 0;
    gap: 20px;
  }

  .each_component_inside_style{
    min-width:210px;
    max-width:210px;
  }
</style>
