<template>
  <v-container id="container" class="store_general_container_class" v-scroll="onScroll">
    <v-row class="header_store_class_style">
      <span v-if="itemsForShop.length !== 0" style="margin-right: 50px;">
        <TableForPay v-bind:items="itemsForShop" v-bind:mount_number="mount_number" v-bind:loading="loadingProductsTable"
          v-on:deleteAllAction="deleteAllAction" v-on:payAllAction="payAllAction"
          v-on:deleteProductAction="deleteProductAction" v-on:payProductAction="payProductAction"></TableForPay>
      </span>
      <span>
        <credit-card v-bind:balance="profile_balance" v-bind:negative_balance="negative_balance"></credit-card>
      </span>
    </v-row>
    <v-row>
      <v-tabs v-model="mode_of_view" color="cyan-darken-4" grow>
        <v-tab :value="1">
          <v-icon>mdi-shape-outline</v-icon>
          Ver por Categoría
        </v-tab>
        <v-tab :value="2">
          <v-icon>mdi-list-box-outline</v-icon>
          Ver Todos
        </v-tab>
      </v-tabs>
    </v-row>
    <v-row class="go_top_container_class_style" :style="{top: pageHeight + 'px'}">
      <v-btn icon="mdi-apple-keyboard-control" class="go_top_btn_class mr-2" color="cyan-darken-1" v-if="fab" @click="goTop">
      </v-btn>
    </v-row>
    <v-row>
      <v-col cols="12" v-for="category in all_products" :key="category.idcategory">
        <v-sheet v-if="mode_of_view === 1" class="mx-auto" elevation="8">
          <div class="d-flex bg-white align-center ml-5 pa-3" style="height: 100%;">
            <v-icon color="cyan-darken-4" :icon="category.icon" size="35"></v-icon>
            <span class="text-cyan-darken-4 text-h5 font-weight-light ml-2 pt-1">{{ category.name }}</span>
          </div>
          <v-expand-transition>
            <v-sheet v-if="category.showCartEmpty" height="100" class="ml-8">
              <div class="d-flex fill-height align-center justify-left">
                <v-badge :content="category.card_model.length" color="success">
                  <v-btn class="ml-5" prepend-icon="mdi-cart-variant" variant="tonal" color="green-accent-4"
                    @click="showMethodPaymentModal">
                    Pagar
                  </v-btn>
                </v-badge>
              </div>
            </v-sheet>
          </v-expand-transition>
          <v-slide-group v-model="category.card_model" class="pa-0" multiple show-arrows center-active>
            <v-slide-group-item v-for="item in category.products" :key="item.id">
              <ProductCard v-bind:loading="item.loading" v-bind:product_img="item.img" v-bind:product_name="item.name"
                v-bind:product_rank="item.rank" v-bind:product_price="item.price" v-bind:product_reserved="item.reserved"
                v-bind:product_description="item.description" v-on:clickOnReserveAction="reserve(item, category)">
              </ProductCard>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
        <div v-else class="view_like_all_style_class">
          <ProductCard v-for="item in category.products" :key="item.id" v-bind:loading="item.loading"
            v-bind:product_img="item.img" v-bind:product_name="item.name" v-bind:product_rank="item.rank"
            v-bind:product_price="item.price" v-bind:product_reserved="item.reserved"
            v-bind:product_description="item.description" v-on:clickOnReserveAction="reserve(item, category)">
          </ProductCard>
        </div>
      </v-col>
    </v-row>
    <PaymentMethod v-model="modal_visibility" v-on:cancelMethodPayment="cancelMethodPayment"
      v-on:aceptMethodPayment="aceptMethodPayment"></PaymentMethod>
  </v-container>
</template>
<script>
import ProductCard from "@/components/Store/ProductCard.vue"
import PaymentMethod from "@/components/Store/PaymentMethod.vue"
import CreditCard from "@/components/Store/CreditCard.vue";
import allProducts from "@/utils/storeProductsMock";
import TableForPay from "@/components/Store/TableForPay.vue"
import { mapActions } from 'vuex';
export default {
  name: "Store",
  components: { ProductCard, CreditCard, TableForPay, PaymentMethod },
  watch: {
    mode_of_view() {
      //console.log(">>>>mode_of_view>>>",this.mode_of_view);
    }
  },
  mounted() {
    this.loadProducts();
  },
  computed: {
    pageHeight() {
      return window.innerHeight-100;
    },
  },
  data() {
    return {
      mode_of_view: 1,
      modal_visibility: false,
      all_products: null,
      loadingProductsTable: false,
      mount_number: 0,
      profile_balance: 1586.50,
      negative_balance: false,
      itemsForShop: [],
      fab: false
    }
  },
  methods: {
    ...mapActions("layout", ["showGeneralLoading"]),
    async loadProducts() {
      this.showGeneralLoading(true);
      await allProducts('alcategories').then((res) => {
        setTimeout(() => {
          this.all_products = res;
          this.all_products.forEach(element => {
            element['card_model'] = [];
            element['showCartEmpty'] = false;
            element['cart_over_product'] = false;
          });
          this.showGeneralLoading(false);
        }, 1000)
      });
    },
    reserve(item, category) {
      item.loading = true;
      this.loadingProductsTable = true;
      setTimeout(() => {
        item.reserved = !item.reserved;
        if (item.reserved === true) {
          this.profile_balance = (this.profile_balance - item.price);
          category.card_model.push(item.id);
          let new_item_for_reserved_table = {
            id: item.id,
            idcategory: category.idcategory,
            name: item.name,
            image: item.img,
            price: item.price,
            stock: false,
          }
          this.mount_number += 1;
          this.itemsForShop.push(new_item_for_reserved_table);
        } else {
          let index = category.card_model.indexOf(item.id);
          if (index != -1) {
            this.profile_balance = (this.profile_balance + item.price);
            category.card_model.splice(index, 1);
          }
          let indextable = this.itemsForShop.findIndex((element) => element.id === item.id);
          if (indextable != -1) {
            this.itemsForShop.splice(indextable, 1);
            this.mount_number -= 1;
          }
        }
        this.profile_balance = Math.round(this.profile_balance * 100) / 100;
        if (this.profile_balance < 0) this.negative_balance = true;
        else this.negative_balance = false;
        if (category.card_model.length != 0) category.showCartEmpty = true;
        else category.showCartEmpty = false;
        category.cart_over_product = !category.cart_over_product;
        item.loading = false
        this.loadingProductsTable = false;
      }, 1000)
    },
    deleteAllAction() {
      this.loadingProductsTable = true;
      setTimeout(() => {
        this.mount_number = 0;
        this.negative_balance = false;
        this.profile_balance = 1586.50;
        this.itemsForShop = [];
        this.all_products.forEach(element => {
          element.products.map((x) => x.reserved = false);
          element.card_model = [];
          element.showCartEmpty = false;
          element.cart_over_product = false;
        });
        this.loadingProductsTable = false;
      }, 1000)
    },
    payAllAction() {
      this.modal_visibility = true;
    },
    deleteProductAction(item) {
      this.loadingProductsTable = true;
      setTimeout(() => {
        let indextable = this.itemsForShop.findIndex((element) => element.id === item.id);
        if (indextable != -1) {
          this.itemsForShop.splice(indextable, 1);
          this.mount_number -= 1;
        }
        this.all_products.forEach(element => {
          if (element.idcategory === item.idcategory) {
            let index = element.card_model.indexOf(item.id);
            if (index != -1) { element.card_model.splice(index, 1); }
            if (element.card_model.length === 0) { element.showCartEmpty = false; }
            element.products.map((x) => {
              if (x.id === item.id) { x.reserved = false; }
            }
            );
          }
        });
        this.profile_balance = (this.profile_balance + item.price);
        this.loadingProductsTable = false;
      }, 1000)
    },
    payProductAction(item) {
      console.log("tray buy:::", item);
      this.showMethodPaymentModal();
    },
    showMethodPaymentModal() {
      this.modal_visibility = true;
    },
    cancelMethodPayment() {
      this.modal_visibility = false;
    },
    aceptMethodPayment(method) {
      this.modal_visibility = false;
    },
    goTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },
    onScroll() {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset;
      this.fab = top > 350
    },
  }
}
</script>
<style scoped>
.store_general_container_class {
  max-width: 100% !important;
}

.header_store_class_style {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.credit_card_style {
  background-color: blueviolet;
  height: 180px;
  width: 300px;
  border-radius: 12px;
}

.view_like_all_style_class {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.go_top_container_class_style {
  width: 99%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: flex-end;
  position: fixed;
  z-index: 998;
}

.go_top_btn_class {
  z-index: 999;
}
</style>
