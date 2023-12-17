<template>
  <v-card style="height: 100%;">
    <v-card-title class="text-center justify-center py-6">
      <v-avatar image="../assets/roy_avatar.png" size="80"></v-avatar>
      <v-btn
        icon="mdi-camera-flip"
        class="icon_change_profile_photo"
        color="cyan-darken-4"
        size="small"
        variant="plain"
      >
      </v-btn>
      <span>
        <h3 class="text-basil">Roider Rojas Sanchez</h3>
        <h6 style="opacity: 50%;">Cmg, Cuba</h6>
      </span>
    </v-card-title>

    <v-tabs
      v-model="tab"
      bg-color="transparent"
      color="cyan-darken-4"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item.key"
        :value="item.key"
      >
        <v-icon>{{item.icon}}</v-icon>
        &nbsp;
        {{ item.name }}
      </v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="1">
        <GeneralesTab></GeneralesTab>
      </v-window-item>
      <v-window-item value="2">
        <LocationTab></LocationTab>
      </v-window-item>
      <v-window-item value="3">
        <SegurityTab></SegurityTab>
      </v-window-item>
    </v-window>
    <v-btn prepend-icon="mdi-content-save"  class="text-none mb-8 save_change_btn_style" color="cyan-darken-2">
      Guardar Cambios
    </v-btn>
  </v-card>
</template>
<script>
import GeneralesTab from "@/components/Profile/GeneralesTab.vue"
import LocationTab from "@/components/Profile/LocationTab.vue"
import SegurityTab from "@/components/Profile/SegurityTab.vue"
  export default {
    name:"Profile",
    components:{GeneralesTab, LocationTab, SegurityTab},
    data () {
      return {
        tab: 'Generales',
        items: [
          { key: "1", name:"Generales", icon:"mdi-card-account-details-outline" },
          { key: "2", name:"Ubicación", icon:"mdi-map-marker-outline" },
          { key: "3", name:"Seguridad", icon:"mdi-lock-open-outline" },
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do'+
        'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad'+
        'minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
  }
</script>
<style lang="scss">
@import '../assets/scss/general.scss';

.icon_change_profile_photo{
  position: absolute;
  z-index: 99;
  margin-left: -26px;
  margin-top: 50px;
}

.bg-basil {
  background-color: #FFFBE6 !important;
}
.text-basil {
  color: #004D40 !important;
}

.save_change_btn_style{
    float: right;
    margin-right: 10px;
    margin-bottom: 10px;
  }
</style>
