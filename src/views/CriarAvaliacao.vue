<template>
    
<div>
   
  <form @submit.prevent="criarAvaliacao">

    <!-- nome exercicio -->
    <div>
               <label for="altura">Altura</label>
               <input class="p-2 text-gray-500 focus:outline-none" type="float" required
               id="altura" placeholder="Altura em metro"
               v-model="avaliacao.altura">
   </div>
    <div>
               <label for="peso">Peso</label>
               <input class="p-2 text-gray-500 focus:outline-none" type="number" required
               id="peso" placeholder="peso em kg"
               v-model="avaliacao.peso">
   </div>
    <div>
               <label for="gordura-corporal">gordura corporal</label>
               <input class="p-2 text-gray-500 focus:outline-none" type="number" required
               id="gordura-corporal" placeholder="gordura em %"
               v-model="avaliacao.gorduraCorporal">
   </div>
    

   <button class="mt-10 py-2 px-6 rounded-sm self-start text-sm text-white
            bg-at-light-green duration-200 border-solid border-2 border-transparent
            hover:border-at-light-green hover:bg-white hover:text-at-light-green" 
            type="submit">Salvar Avaliação</button>
  </form>


  </div>
</template>

<script>
    import { reactive } from 'vue';
    import {ref, computed} from 'vue';
    import { v4 as uuidv4 } from 'uuid';
    import {supabase} from "../supabase/init";
    import store from '../store/index';
    import {useRouter} from 'vue-router'
    
    
export default {

    name:"CriarAvaliacao",
    setup(){
        const statusMsg = ref(null);
        const errorMsg = ref(null);
        const userId = computed(() => store.state.user.id)
        const router = useRouter()

        const avaliacao = reactive({
            altura:"",
            peso:"",
            imc:"",
            gorduraCorporal:"",

        })

        //criar treino
        const criarAvaliacao = async() =>{
            
            try {

                const {error} = await supabase.from('Avaliacao').insert([
                     {  idAvaliacao: uuidv4(),
                        altura: avaliacao.altura,
                        id_user:userId.value,
                        peso: avaliacao.peso,
                        imc: avaliacao.peso/(avaliacao.altura)**2,
                        gorduraCorporal:avaliacao.gorduraCorporal
                    }
                ])

                
                if(error) throw error;
                statusMsg.value = "Sucesso: Avaliação criado!"
                avaliacao.altura = null,
                avaliacao.gorduraCorporal = null,
                  
                setTimeout(() =>{
                    statusMsg.value = false;
                }, 3000)

                router.push({name:'Avaliacao'})
            }
            catch(error){
                errorMsg.value = `Error: ${error.message}`
                setTimeout(() =>{
                    errorMsg.value = false
                }, 3000)
            }
        }

return{avaliacao, criarAvaliacao}
    }

}
</script>

<style>

</style>