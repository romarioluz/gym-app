<template>
  <div class="home">

    <div class="mt-20 py-1 px-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
      <router-link class="mt-6 py-3 rounded px-3 text-center text-xs text-white bg-indigo shadow-md "  :to="{ name: 'Avaliacao' }">Minha avaliações</router-link>
      <router-link class="mt-6 py-3 rounded  px-3 text-center text-xs text-white bg-indigo shadow-md "  :to="{ name: 'Treinos' }">Treinos</router-link>
    </div>

    <bar-chart>

    </bar-chart>
  
    

  </div>
</template>

<script>


export default {
  name: "Home",
  components: {
   
},
};
</script>

<style scoped>


</style>
