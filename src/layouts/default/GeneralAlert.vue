<template>
  <v-alert
    :v-model="show_alert"
    closable
    :type="type"
    :title="title"
    :text="text"
    :variant="variant"
    class="general_alert_style_class"
  ></v-alert>
</template>
<script>
export default{
name:"GeneralAlert",
watch:{
  show_alert(){
    if(show_alert){
      setTimeout(() => {
        show_alert=false
      }, 2000)
    }
  }
},
props: {
    type: {
      type: String,
      default: "info",
    },
    title: {
      type: String,
      default: "Title Alert",
    },
    text: {
      type: String,
      default: "Title Text",
    },
    variant: {
      type: String,
      default: "tonal",
    },
    show_alert: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style scoped>
.general_alert_style_class{
  z-index: 999;
  position: absolute !important;
  width: 80%;
  margin-right: 1%;
  margin-top: 15%;
  transition: all 0.5s;
}
</style>
