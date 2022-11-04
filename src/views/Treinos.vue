<template>
    <!-- Página que renderiza a lista de treinos salvos no DB -->
    <div class="mt-5">
       
        <div v-if="data.length === 0" class="w-full flex flex-col items-center">
      <h1 class="text-2xl">Ainda não há treinos ...</h1>
      <router-link
        class="mt-5 py-5 px-7 rounded-sm  text-sm
      text-white bg-at-light-green duration-200 border-solid rounded-md rounded-full
      border-2 border-transparent hover:border-at-light-green hover:bg-white
      hover:text-at-light-green"
        :to="{ name: 'GerenciaTreino' }"
        >+</router-link
      >
    </div>
    <!-- dados -->
    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <router-link
     
        class="flex flex-col items-center bg-light-grey p-8 shadow-md hover:shadow-lg cursor-pointer rounded h-auto w-auto"
        v-for="(treino, index) in data"
        :key="index"
        :to="{ name: 'Pagina-Treino', params: { treinoId: treino.id } }"
      >
        

        <!-- Treino -->
        <h1
          class="mt-6 py-1 px-3 text-md text-white bg-at-light-green shadow-md rounded-lg"
        >
          {{ treino.nome}}
        </h1>
        <img 
    
          src="../assets/images/img-treino.jpg"
          class="mt-5 h-24 w-auto"
          alt=""
        />

       
      </router-link>
      
      <router-link
        class="self-center text-center m-10 h-20 w-20 rounded-full text-center py-7 px-1 text-xl text-white bg-at-light-green shadow-md"
        :to="{ name: 'GerenciaTreino' }"
        >+</router-link>
    </div>
    </div>
</template>

<script>
    import {ref} from 'vue'
  import {supabase} from '../supabase/init'
export default {
    name: 'Treinos',

    setup(){
        const data = ref([])
        const dataLoaded = ref(null)

    //Pegar dados de treino do servidos

    const getData = async () =>{
      try {
       
        const {data: treinos, error} = await supabase.from("Treino").select("*")
        if(error) console.log(error);
        data.value = treinos;
        dataLoaded.value = true;
       
        
      } catch (error) {
        console.warn(error.message)
      }
    };

    //pegar dados do supabase ao entrar na rota
    getData()

    return { data, dataLoaded }

   }

     

}

</script>

<style lang="scss" scoped>

</style>