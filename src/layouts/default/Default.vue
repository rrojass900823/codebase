<template>
  <v-app>
    <default-bar v-on:clickOnLoginAction="showLogin" v-on:showHiddeMenuAction="showHiddeMenu" />
    <Login v-model="visible"/>
    <MenuBarNav v-model="show_hidde_menu_nav"/>
    <default-view/>
    <default-footer/>
  </v-app>
</template>

<script>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
  import DefaultFooter from './Footer.vue'
  import HelloWorld from '@/components/HelloWorld.vue'
  import Login from '@/components/Login.vue'
  import MenuBarNav from '@/components/MenuBarNav.vue'
  import { mapState } from "vuex";
 export default{
  name:"Default",
  components:{DefaultBar, DefaultView, DefaultFooter, Login, HelloWorld, MenuBarNav},
  mounted(){},
  watch:{},
  computed:{
    ...mapState("auth", ["someoneLogin"]),
  },
  data(){
    return{
      show_alert:true,
      visible:false,
      show_hidde_menu_nav:false,
      home_page_initial:false
    }
  },
  methods:{
    showLogin(){
      this.visible = !this.visible;
    },
    showHiddeMenu(){
      this.show_hidde_menu_nav = !this.show_hidde_menu_nav;
    }
  }
 }
</script>
