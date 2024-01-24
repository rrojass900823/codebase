<template>
  <v-footer class="bg-grey-lighten-1 d-none d-sm-flex">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        variant="text"
        class="mx-2"
        rounded="xl"
      >
        {{ link }}
      </v-btn>
    </v-row>
  </v-footer>
</template>

<script>
  export default {
    name:"Footer",
    data: () => ({
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ],
    }),
  }
</script>
