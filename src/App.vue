<template>
  <div id="app" v-if="appReady">
    <div id="nav">
      <Navigation/>
    </div>
    <router-view />

  </div>
</template>
/* eslint-disable */


<script>

import Navigation from './components/Navigation.vue';
import { ref } from 'vue';
import { supabase } from './supabase/init';
import store from './store/index';
export default {

  components:{
  Navigation,
},

  setup() {
    //Create data
    const appReady = ref(null);
    //Checar pra ver se usuário já está logado
    const user = supabase.auth.user();

    //Se usuario não existe, precisa mudar para app ready
    if (!user){
      appReady.value = true;
    }
    //Runs when there is a auth state change
    //If user is logged in, this will fire
    supabase.auth.onAuthStateChange((_, session) => {
      store.methods.setUser(session);
      appReady.value = true;

    });

    return{appReady};
  },
}


</script>



<style>


</style>
