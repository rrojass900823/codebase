<template>
    <v-card
    flat
  >
    <v-card-text>
      <div class="general_section_style">
          <v-file-input
            :rules="avatar_rules"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Selecciona un avatar"
            prepend-icon="mdi-camera"
            label="Avatar"
            class="each_component_inside_style"
            variant="outlined"
            density="compact"
          ></v-file-input>
          <v-text-field
            label="Nombre"
            variant="outlined"
            class="each_component_inside_style"
            placeholder="Nombre"
            counter="25"
            :rules="[name_rules.required, name_rules.max]"
            v-model="name"
            density="compact"
            ></v-text-field>
            <v-text-field
            label="Apellidos"
            class="each_component_inside_style"
            variant="outlined"
            placeholder="Apellidos"
            counter="50"
            :rules="[lastname_rules.required, lastname_rules.max]"
            v-model="lastname"
            density="compact"
          ></v-text-field>
            <v-text-field
            label="Email"
            class="each_component_inside_style"
            variant="outlined"
            placeholder="Email"
            density="compact"
            v-model="email"
            :rules="[email_rules.required, email_rules.email]"
            ></v-text-field>
            <v-text-field
            label="Telefono"
            class="each_component_inside_style"
            variant="outlined"
            placeholder="Telefono"
            v-model="phonenumber"
            counter="8"
            density="compact"
            :rules="[phone_rules.required, phone_rules.max, phone_rules.min]"
          ></v-text-field>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
  export default{
    name:"GeneralesTab",
    data(){
      return{
        name:"Roider",
        lastname:"Rojas Sanchez",
        email:"roiderrojassanchez@gmail.com",
        phonenumber:"54718233",
        avatar_rules: [
          value => {
            return !value || !value.length || value[0].size < 2000000 || 'El avatar debe pesar menos de 2 MB!'
          },
        ],
        name_rules:{
          required: value => !!value || 'Obligatorio.',
          max: v => v.length <= 25 || 'Max 25 caracteres',
        },
        lastname_rules:{
          required: value => !!value || 'Obligatorio.',
          max: v => v.length <= 50 || 'Max 50 caracteres',
        },
        phone_rules:{
          required: value => !!value || 'Obligatorio.',
          min: v => v.length >= 8 || 'Min 8 caracteres',
          max: v => v.length <= 8 || 'Max 8 caracteres',
          counter: value => value.length <= 8 || 'Max 8 caracteres',
        },
        email_rules: {
          required: value => !!value || 'Obligatorio.',
          counter: value => value.length <= 20 || 'Max 20 caracteres',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || ' E-mail invalido.'
          },
        },
      }
    }
  }
</script>
<style scoped>
  .general_section_style{
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
    padding: 10px 0 0 0;
    gap: 20px;
  }

  .each_component_inside_style{
    min-width:350px;
    max-width:350px;
  }
</style>
