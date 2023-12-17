<template>
    <v-card
    flat
  >
    <v-card-text>
      <div class="general_section_style">
          <v-autocomplete
            clearable
            label="Provincia"
            class="each_component_inside_style"
            :items=provincias
            variant="outlined"
            density="compact"
            :rules="[select_rules.required]"
            ></v-autocomplete>
          <v-autocomplete
          clearable
          label="Municipio"
          class="each_component_inside_style"
          :items=municipios
          variant="outlined"
            density="compact"
          :rules="[select_rules.required]"
          ></v-autocomplete>
          <v-text-field
          label="Direccion"
          placeholder="Direccion"
          class="each_component_inside_style"
          variant="outlined"
          v-model="address"
          density="compact"
          counter="150"
          :rules="[address_rules.required, address_rules.max]"
        ></v-text-field>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import apiTest from '@/services/test';
import { mapActions } from 'vuex';
  export default{
    name:"LocationTab",
    data(){
      return{
        provincias:[],
        municipios:[],
        address:"Calle Nueva #9 entre Micro y Final, Las Delicias, Camaguey",
        select_rules:{
          required: value => !!value || 'Obligatorio.',
        },
        address_rules:{
          required: value => !!value || 'Obligatorio.',
          max: v => v.length <= 150 || 'Max 150 caracteres',
        }
      }
    },
    mounted(){
      this.loadPokemonTypes();
    },
    computed:{},
    methods:{
      ...mapActions("layout", ["showGeneralLoading"]),
      async loadPokemonTypes(){
        this.showGeneralLoading(true);
        await apiTest.getPokemontTypes().then((response)=>{
          this.provincias = response.results.map((x)=>x.name);
          this.municipios = this.provincias;
          this.showGeneralLoading(false);
        }).catch((error)=>{
          console.log("error>>>>>>>",error);
          this.showGeneralLoading(false);
        });
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
  .save_change_btn_style{
    float: right;
    margin-right: 10px;
    margin-bottom: 10px;
  }
</style>
