<template>
  <v-card flat>
    <v-card-title class="d-flex align-center justify-end pe-2" density="compact">
      <v-btn v-if="mount_number !== 0" class="ml-5" prepend-icon="mdi-trash-can-outline" variant="tonal"
        color="red-accent-4" density="compact" @click="deleteAll">
        ({{ mount_number }}) Eliminar Todos
      </v-btn>
      <v-btn v-if="mount_number !== 0" class="ml-5" prepend-icon="mdi-credit-card-check-outline" variant="tonal"
        density="compact" color="green-accent-4" @click="payAllAction">
        ({{ mount_number }}) Pagar Todos
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-data-table v-model:search="search" :items="items" :headers="headers" :loading="loading" density="compact"
      v-model:items-per-page="itemsPerPage" v-model:page="currentPage">
      <template v-slot:loading>
      </template>
      <template v-slot:item.image="{ item }">
        <v-card class="my-2" elevation="2" rounded>
          <v-img :src="item.image" height="50" width="55" cover></v-img>
        </v-card>
      </template>
      <template v-slot:item.price="{ item }">
        <div class="text-center">
          ${{ item.price }}
        </div>
      </template>
      <template v-slot:item.stock="{ item }">
        <div class="text-end">
          <v-btn icon="mdi-trash-can-outline" variant="tonal" class="mr-1"
            color="red-accent-4" density="compact" @click="deleteProductAction(item)">
          </v-btn>
          <v-btn icon="mdi-credit-card-check-outline" variant="tonal"
            density="compact" color="green-accent-4" @click="payProductAction(item)">
          </v-btn>
        </div>
      </template>
      <template v-slot:bottom>
        <div class="text-center pt-2">
          <v-pagination v-model="currentPage" :length="pageCount" density="compact"></v-pagination>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  name: "TableForPay",
  props: {
    items: {
      type: Object
    },
    mount_number: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
  },
  data() {
    return {
      itemsPerPage: 5,
      currentPage: 1,
      headers: [
        {
          align: 'end',
          key: 'name',
          sortable: false,
          title: 'Artículo',
        },
        {
          align: 'center',
          key: 'image',
          sortable: false,
          title: ' ',
        },
        {
          align: 'center',
          key: 'price',
          sortable: false,
          title: 'Precio',
        },
        {
          align: 'end',
          key: 'stock',
          sortable: false,
          title: 'Acción',
        },
      ],
      search: '',
    }
  },
  methods: {
    deleteAll() {
      this.$emit('deleteAllAction');
    },
    deleteProductAction(item) {
      this.$emit('deleteProductAction', item);
    },
    payProductAction(item) {
      this.$emit('payProductAction', item);
    },
    payAllAction() {
      this.$emit('payAllAction');
    }
  }
}
</script>
