<template>
  <v-dialog :v-model="modal_visibility" persistent width="350">
    <template v-slot:default="{ modal_visibility }">
      <v-card>
        <v-toolbar color="cyan-darken-2" title="Método de pago"></v-toolbar>
        <v-card-text class="flex justify-center">
          <v-btn-toggle class="flex justify-center" v-model="toggle" color="primary" mandatory>
            <v-btn value="enzona" width="120">
              <img src="../../assets/enzona_logo.png" width="35">
              ENZONA
            </v-btn>
            <v-btn value="transfermovil" width="180">
              <img src="../../assets/transfermovil_logo.png" width="35">
              TRANSFERMOVIL
            </v-btn>
          </v-btn-toggle>
        </v-card-text>
        <v-card-actions class="flex justify-center">
          <v-btn variant="tonal" @click="cancelMethodPayment" class="text-none mb-8" size="small">
            Cancelar
          </v-btn>
          <v-btn :loading="loading_changin_passwd" :disabled="!toggle" color="green-accent-4" variant="tonal"
            prepend-icon="mdi-credit-card-check-outline" class="text-none mb-8" size="small" @click="aceptMethodPayment">
            Continuar
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
export default {
  name: 'PaymentMethod',
  props: {
    modal_visibility: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
  },
  data() {
    return {
      toggle: undefined,
      loading_changin_passwd: false,
    }
  },
  methods: {
    cancelMethodPayment() {
      this.toggle = undefined;
      this.$emit("cancelMethodPayment")
    },
    aceptMethodPayment() {
      this.loading_changin_passwd = true;
      setTimeout(() => {
        this.loading_changin_passwd = false;
        this.$emit("aceptMethodPayment", this.toggle)
      }, 1000)
    },
  }
}
</script>
