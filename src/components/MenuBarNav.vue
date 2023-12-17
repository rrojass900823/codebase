<template>
      <v-navigation-drawer
        :v-model="drawer"
        temporary
        location="left"
      >
          <v-layout>
            <v-navigation-drawer permanent absolute>
              <v-list>
                <v-list-item
                  prepend-avatar="../assets/roy_avatar.png"
                  title="Roy"
                  subtitle="rrojass900823@gmail.com"
                >
                  <template v-slot:append>
                    <v-btn
                      size="small"
                      variant="text"
                      icon="mdi mdi-cog-outline"
                      @click="goToProfileView"
                    ></v-btn>
                  </template>
                </v-list-item>
              </v-list>

              <v-divider></v-divider>

              <v-list
                :lines="false"
                density="compact"
                nav
              >
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  :value="item"
                  color="cyan"
                  @click="goToPageNav(item)"
                >
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                  </template>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
            <v-main style="height: 354px;"></v-main>
          </v-layout>
      </v-navigation-drawer>
</template>

<script>
import {appRoutes} from '@/constants';
export default{
  name:"MenuBarNav",
  watch: {},
  computed: {},
  data () {
    return {
      items: [
        { text: 'Tienda', goto:"STORE", icon: 'mdi-storefront-outline' },
        { text: 'Inicio', goto:"DASHBOARD", icon: 'mdi-home' },
        { text: 'Recientes', goto:"DASHBOARD", icon: 'mdi-history' },
        { text: 'Principales', goto:"DASHBOARD", icon: 'mdi-star' },
        { text: 'Descargas', goto:"DASHBOARD", icon: 'mdi-download' },
        { text: 'Salvados', goto:"DASHBOARD", icon: 'mdi-cloud-upload' },
      ],
    }
  },
  props: {
    drawer: {
      type: Boolean,
      default: false,
    },
  },
  methods:{
    goToProfileView(){
      this.navigateTo(appRoutes.PROFILE);
    },
    goToPageNav(item){
      this.navigateTo(item.goto);
    }
  },
}
</script>
<style scope lang="css">

</style>
