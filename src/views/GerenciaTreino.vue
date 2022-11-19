<template>
    <div>
        <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">

      <form @submit.prevent="adicionaTreino">

      
   <!-- nome exercicio-->
        <div>
                <label for="workout-name">Nome do Treino: </label>
                <input class="mb-1 text-sm text-at-light-green" type="text" required
                id="workout-name"
                v-model="nomeDoTreino">
            </div>
            
                <!-- Lista de exercicios -->
            <div class="flex flex-col">
                <label for="workout-name" class="mb-1 text-sm text-at-light-green">Exercícios</label>
                <select class="p-2 text-gray-500 focus:outline-none" required 
                v-model="exercicioEscolhido"              
                
                >
                <option v-for="(exercicio) in lista" :key="exercicio.id" :value="exercicio">
                    {{exercicio.nome}} - {{exercicio.grupoMuscular}}</option>                
                </select>

                <!-- Exercicios selecionado no select acima-->
                <br/>
                <div >
                    <h1 class="text-success rounded text-center text-xl">{{nomeDoTreino}}</h1>
                    <br/>
                    <!-- LISTA de EXERCICIOS NO TREINO -->
                    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <li class="items-center text-center rounded" v-for="(exercicio, index) in arrayDeExercicios" :key="index">
                           <p>{{index +1}}  - {{exercicio.nome}} <span></span></p> 
          
                            <img @click="deletaExercicio(index)" class="h-6 text-center mb-4 h-4 w-auto m-left-5 cursor-pointer"
                            src="../assets/images/trash-light-green.png"
                            alt=""
                            />

                            <img :src="exercicio.imgUrl" alt="">
                            <small>{{exercicio.descricao}}</small>

                        </li>                   
                        <button class="mt-10 py-2 px-6 rounded-sm self-start text-sm  duration-200 border-solid border-2 border-transparent
                                    border-at-light-green bg-white text-at-light-green
                                    hover:border-at-light-green hover:bg-success hover:text-white" type="button"
                                    @click="adicionarExercicio">Adicionar</button>
                    </ul>
                </div>
                
            </div>

                        <br>
            <button class="m-5  py-2 px-6 rounded-sm center text-sm text-white
            bg-success duration-200 border-solid border-2 border-transparent
            hover:border-at-light-green hover:bg-white hover:text-at-light-green" type="submit">Salvar treino</button>
            
            <button class="m-5 py-2 px-6 rounded-sm center text-sm text-white
            bg-alert duration-200 border-solid border-2 border-transparent
            hover:border-at-light-green hover:bg-white hover:text-at-light-green" type="button"
            @click="cancelarCriacaoTreino">Cancelar</button>
            </form>
    </div>
       
    </div>
  
</template>

<script>
    //import { reactive } from 'vue';
    import axios from 'axios'
    import { ref, computed } from 'vue'
    import { v4 as uuidv4 } from 'uuid';
    import { supabase } from '../supabase/init';
    import store from '../store/index';
    import router from '../router/index';



    
    export default {

    setup(){

        const userId = computed(() => store.state.user.id)
        let lista = ref([])
        let arrayDeExercicios = ref([])
        let exercicioEscolhido = ref({
            "id":'',
            "nome":'',
            "descricao":'',
            'imgUrl':'',
            'serie':'',
            'carga':'',
            'repeticoes':'',
            'fk_idTreino':''
        })
        let nomeDoTreino = ref('')
    

        /* Gerencia tabela  Treino */
        let treino = ref({
            'id':'',
            'nome':'',

        }) 

        /* Seta 2 colunas da tabela treino */
        const criaTreino = () =>{
            treino.value.id = uuidv4()
            treino.value.nome = nomeDoTreino

        }

        //Deleta exercicio do array

        const deletaExercicio = (index) =>{
            arrayDeExercicios.value.splice(index, 1)
        }

        /* função adicionar dados do input ao exercicio */        

        const adicionarExercicio = () =>{
            if(exercicioEscolhido.value.nome.trim() == '' ){

                alert("Selecione um exercício acima!")

            }else if(arrayDeExercicios.value.includes(exercicioEscolhido.value) ){
                alert("Selecione outro exercício!!!")
                
            }
            
            else{
                exercicioEscolhido.value.id = uuidv4(),
                arrayDeExercicios.value.push(exercicioEscolhido.value)
            }           
                    
                
            } 
        


        /* Requisição poara pegar os exercicios do arquivo JSON */
        const getData =()=>{ 
            axios.get('https://kwppuvtnshwsbvwcegiu.supabase.co/storage/v1/object/sign/lista-de-exercicios/exercicios.json?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsaXN0YS1kZS1leGVyY2ljaW9zL2V4ZXJjaWNpb3MuanNvbiIsImlhdCI6MTY2NDc5NzY1MywiZXhwIjoxOTgwMTU3NjUzfQ.HPmJVN5zzEa3PZijtIl7o8vnC2xhheHnAwP0sGKHs78')
            .then(res =>{
               lista.value = res.data
            })

            
        }

        /* Funcão que atualiza tabela exercicio, tabela treino e detalhe treino */

        const adicionaTreino = async()=>{           

           
            criaTreino()
            try {
                const { error } = await supabase
            .from('Treino')
            .insert([
                { id: treino.value.id, nome: treino.value.nome, fk_idUsuario:userId.value},
            ])
            if(error) throw error 
            console.log("Treino salvo")
            
            for(let i=0;i<=arrayDeExercicios.value.length -1;i++){

                const { error } = await supabase
                .from('Exercicio')
                .insert([
                    { id: arrayDeExercicios.value[i].id, nome: arrayDeExercicios.value[i].nome, foto: arrayDeExercicios.value[i].imgUrl
                        , descricao: arrayDeExercicios.value[i].descricao, fk_idTreino: treino.value.id }
                ])
                if(error) throw error 
            }

            } catch (error) {
                console.log(error)
            }
            router.push({ name: "Treinos" });
        }

        const cancelarCriacaoTreino = async()=>{
            nomeDoTreino.value = ''
            exercicioEscolhido.value.id = null,
            arrayDeExercicios.value.splice(0, arrayDeExercicios.value.length)
            
        }

      
        
        getData()

        
        return{ lista, exercicioEscolhido, adicionarExercicio,deletaExercicio, arrayDeExercicios, nomeDoTreino, adicionaTreino, cancelarCriacaoTreino}

    }

}

</script>

<style>

    img{
        width: 250px;
        height: 250;
    }

</style>