<template>
  <v-dialog :v-model="modal_visibility" persistent width="300px">
    <v-card>
       <v-form v-model="change_password_form">
        <v-toolbar color="cyan-darken-2" title="Cambiar Contraseña"></v-toolbar>
        <v-card-text>
          <v-text-field v-model="password_one" width="100%" density="compact"
            :append-inner-icon="visible_password_one ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible_password_one ? 'text' : 'password'" variant="outlined" label="Nueva Contraseña"
            @click:append-inner="visible_password_one = !visible_password_one" :rules="password_rules"></v-text-field>
            <br/>
          <v-text-field v-model="password_two" width="100%" density="compact"
            :append-inner-icon="visible_password_two ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible_password_two ? 'text' : 'password'" variant="outlined" label="Repita la Contraseña"
            @click:append-inner="visible_password_two = !visible_password_two" :rules="password_rules"></v-text-field>
          <label v-if="password_not_match" style="color: red;font-size: 12px;">Las contraseñas no coinciden</label>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="tonal" v-on:click="cancelAction" class="text-none mb-8" size="small">
            Cancelar
          </v-btn>
          <v-btn :loading="loading_changin_passwd" :disabled="!change_password_form" color="cyan-darken-2" variant="tonal"
             class="text-none mb-8" size="small"
             @click="onSubmitChangePassword"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'ChangePasswordProfile',
  props: {
    modal_visibility: {
      type: Boolean,
      default: false,
    },
  },
  watch: {},
  data() {
    return {
      password_not_match: false,
      visible_password_one: false,
      visible_password_two: false,
      change_password_form: false,
      password_one: "password_one",
      password_two: "password_two",
      loading_changin_passwd: false,
      password_rulesx: {
        required: value => !!value || 'Obligatorio.',
        min: v => v.length >= 8 || 'Min 8 caracteres',
      },
      password_rules: [
        value => {
          if (value?.length > 8) return true
          return 'Debe tener al menos 8 caracteres'
        },
        value => {
          if (/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,50}$/.test(value)) return true
          return 'Debe contener mayúsculas y minúsculas con números y caracteres especiales'
        },
      ],
    }
  },
  methods: {
    cancelAction() {
      this.visible_password_one = false
      this.visible_password_two = false
      this.$emit("cancelAction");
    },
    aceptAction() {
      this.visible_password_one = false
      this.visible_password_two = false
      this.$emit("aceptAction");
    },
    async onSubmitChangePassword(event) {
      this.loading_changin_passwd = true;
      if (this.password_one !== this.password_two) {
        this.password_not_match = true;
        this.loading_changin_passwd = false;
        return 0;
      }else{
        setTimeout(() => {
          this.password_not_match = false;
          this.loading_changin_passwd = false;
          this.$emit("aceptAction");
        }, 1000)
      }
    }
  }
}
</script>
