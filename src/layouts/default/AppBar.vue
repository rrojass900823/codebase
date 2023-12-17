<template>
  <v-app-bar  :elevation="1">
    <v-app-bar-nav-icon
      v-if="this.someoneLogin"
      @click="clickOnMenuAction"
    ></v-app-bar-nav-icon>
    <v-app-bar-title>
      <v-icon icon="mdi-label-percent" />
        TITULO DEL SITIO
    </v-app-bar-title>
    <template v-slot:append>
      <span  v-if="this.someoneLogin">
        <v-btn
          v-if="has_notification" icon="mdi-bell-outline" >
          <v-badge dot color="success">
            <v-icon></v-icon>
          </v-badge>
        </v-btn>
        <v-btn v-else
          icon="mdi-bell-outline">
        </v-btn>
      </span>
      <v-menu
        transition="scale-transition"
      >
        <template v-slot:activator="{ props }">
          <v-img
          :width="25"
          style="border-radius: 3px;"
          aspect-ratio="16/9"
          cover
          :src="getFlag(flagToLoad)"
        ></v-img>
        <v-btn icon="mdi-translate" v-bind="props"></v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, i) in languageList"
            :key="i"
            @click="switchLang(item)"
            :disabled="item.code==='us'?true:false"
            >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        icon="mdi-login" :class="this.someoneLogin ? null:'login_icon_style_class'" @click="clickOnLoginAction">
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name:"AppBar",
  watch:{
    someoneLogin(){
      return this.someoneLogin;
    }
  },
  computed:{
    ...mapState("auth",["someoneLogin"]),
    ...mapActions("auth", ["logOut"])
  },
  data(){
    return{
      has_notification:true,
      languageList: [
        { title: 'Spainish', img:"es.svg", code:"es", lang:"es" },
        { title: 'English', img:"us.svg", code:"us", lang:"us" },
      ],
      flagToLoad:"es"
    }
  },
  methods:{
    switchLang(item){
      this.flagToLoad = item.code;
    },
    clickOnLoginAction() {
      if(this.someoneLogin)this.logOut;
      else this.$emit("clickOnLoginAction");
    },
    clickOnMenuAction() {
      this.$emit("showHiddeMenuAction");
    },
  }

}
  //
</script>
<style scoped>
.list_language_class_style{
  cursor: pointer;
  display: flex;
  width: 150px;
}
.login_icon_style_class{
  rotate: 180deg;
}
</style>
