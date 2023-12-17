<template>
  <div class="div_for_card" :class="{ 'div_for_card_click': show_balance }">
    <v-card class="mx-auto my-8"
      :class="negative_balance?'credit_card_style_class_front_negative': 'credit_card_style_class_front'"
      max-width="350" min-width="350" height="200" elevation="4">
      <v-card-item>
        <v-card-title>
          <v-img src="../../assets/general/visa_logo.png" class="float-right mt-2 pa-2" width="85px"></v-img>
        </v-card-title>
        <v-card-subtitle>
          <v-img src="../../assets/general/circuit2.png" width="50px" class="ml-4"></v-img>
        </v-card-subtitle>
      </v-card-item>

      <v-card-text class="text-blue-grey-lighten-4 text-h5 ml-8 mt-1 pa-0">
        <span class="card_number_style">
          #### #### #### 7412
        </span>
      </v-card-text>
      <v-card-actions class="text-blue-grey-lighten-4 text-h6 mt-2 font-weight-light">
        <span class="card_number_style  ml-6 pa-0">
          Roider Rojas
        </span>
        <v-spacer></v-spacer>
        <v-btn variant="text" class="text-none mt-1" color="blue-grey-lighten-4" @click="show_balance = true">
          Ver Balance $
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mx-auto mb-10"
      :class="negative_balance?'credit_card_style_class_back_negative': 'credit_card_style_class_back'" max-width="350"
      min-width="350" height="200" elevation="4">
      <v-card-item>
        <v-card-title>
          <v-img src="../../assets/general/visa_logo.png" class="float-right mt-2 pa-2" width="85px"></v-img>
        </v-card-title>
        <v-card-subtitle>
          <span width="50px" class="ml-4">&nbsp;</span>
        </v-card-subtitle>
      </v-card-item>
      <v-card-text class="text-blue-grey-lighten-4 text-h5 ml-8 mt-1 pa-0">
        <span class="card_number_style">
          Balance:$•{{ balance }}
        </span>
      </v-card-text>
      <v-card-actions class="text-blue-grey-lighten-4 text-h6 mt-2 font-weight-light">
        <span class="card_number_style  ml-6 pa-0">
          &nbsp;
        </span>
        <v-spacer></v-spacer>
        <v-btn variant="text" class="text-none mt-6" color="blue-grey-lighten-4" @click="show_balance = false">
          Volver
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "CreditCard",
  props: {
    balance: {
      type: Number,
      default: 0.00,
    },
    negative_balance: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show_balance: false
    }
  }
}
</script>
<style scoped>
.div_for_card {
  transform-style: preserve-3d;
  transition: all 0.5s ease;
}

.div_for_card_click {
  transform: rotateY(180deg);
}

.credit_card_style_class_front {
  backface-visibility: hidden;
  background: rgb(72, 200, 216);
  background: linear-gradient(87deg, rgba(72, 200, 216, 1) 0%, rgba(0, 137, 154, 1) 100%);
}

.credit_card_style_class_front_negative {
  backface-visibility: hidden;
  background: rgb(239, 83, 80);
  background: linear-gradient(87deg, rgba(239, 83, 80, 0.7) 0%, rgba(229, 57, 53, 1) 100%);
}

.credit_card_style_class_back {
  backface-visibility: hidden;
  margin-top: -233px;
  transform: rotateY(180deg);
  background: rgb(72, 200, 216);
  background: linear-gradient(87deg, rgba(72, 200, 216, 1) 0%, rgba(0, 137, 154, 1) 100%);
}

.credit_card_style_class_back_negative {
  backface-visibility: hidden;
  margin-top: -233px;
  transform: rotateY(180deg);
  background: rgb(239, 83, 80);
  background: linear-gradient(87deg, rgba(239, 83, 80, 0.7) 0%, rgba(229, 57, 53, 1) 100%);
}

.card_number_style {
  letter-spacing: 3px !important;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.511);
}</style>
