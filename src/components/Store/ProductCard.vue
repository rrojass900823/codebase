<template>
  <v-card :loading="loading" max-width="300" :class="['ma-2', selectedClass]" height="540px" width="250"
  >
  <!-- @click="reserve(item, category)" -->
    <template v-slot:loader="{ isActive }">
      <v-progress-linear :active="isActive" color="cyan" height="6" indeterminate></v-progress-linear>
    </template>
    <v-img :src="product_img" class="image_product_class"></v-img>
    <v-card-item>
      <v-card-title>{{ product_name }}</v-card-title>
    </v-card-item>
    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating :model-value="product_rank" color="amber" density="compact" half-increments readonly
          size="small"></v-rating>
        <div class="text-grey ms-3">
          {{ product_rank }} (413)
        </div>
      </v-row>
      <span style="display: flex; align-items: center;">
        <div class="my-4 text-subtitle-1">
          $ • {{ product_price }}
        </div>
        <v-btn
          class="ml-5"
          density="compact"
          :icon="product_reserved ? 'mdi-cart-minus':'mdi-cart-plus'"
          variant="tonal"
          :color="product_reserved ? 'red-accent-4':'green-accent-4'"
          @click="clickOnReserveAction">
        </v-btn>
        <v-scale-transition class="my-5 mx-2">
          <span v-if="product_reserved">
            <span class="text-error me-1">Reservado</span>
          </span>
        </v-scale-transition>
      </span>
      <div>{{ product_description }}</div>
      <v-divider class="mx-1 mb-1"></v-divider>
      <v-card-title class="text-subtitle-1">Colores disponibles</v-card-title>
      <div class="px-4">
        <v-chip-group v-model="selection">
          <v-chip density="compact" class="text-error">Rojo</v-chip>
          <v-chip density="compact" class="text-success">Verde</v-chip>
          <v-chip density="compact" class="text-default">Gris</v-chip>
        </v-chip-group>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'ProductCard',
  props: {
    modal_visibility: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    product_reserved: {
      type: Boolean,
      default: false,
    },
    product_img:{
      type:String,
      default:"http://127.0.0.1:3000/src/assets/products/default_product.png"
    },
    product_name:{
      type:String,
      default:"Nombre del Producto"
    },
    product_description:{
      type:String,
      default:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididuntut."
    },
    product_rank:{
      type:Number,
      default:0
    },
    product_price:{
      type:Number,
      default:0
    },
  },
  watch: {},
  data() {
    return {
      selection: 1,
    }
  },
  methods: {
    clickOnReserveAction(){
      this.$emit('clickOnReserveAction');
    }
  }
}
</script>
<style scoped>
.image_product_class {
  height: 250px;
  transition: all 0.5s;
}

.image_product_class:hover {
  height: 300px;
  transition: all 0.5s;
}
</style>
