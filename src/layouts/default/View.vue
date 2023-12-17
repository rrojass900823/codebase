<template>
  <v-main style="padding: 20;">
    <router-view />
    <v-overlay :model-value="general_loading" persistent="true" scroll-strategy="block"
      class="align-center justify-center">
      <v-progress-circular color="primary" indeterminate size="100" :width="5">
        <template v-slot:default> Loading...
        </template>
      </v-progress-circular>
    </v-overlay>
    <HelloWorld v-if="!someoneLogin" />
  </v-main>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import { mapState } from "vuex";
export default {
  name: "View",
  components: { HelloWorld },
  computed: {
    ...mapState("auth", ['someoneLogin']),
    ...mapState("layout", ['general_loading']),
  },
  data() {
    return {}
  },
  methods: {

  }
}
//
</script>
