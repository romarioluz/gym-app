
import {reactive} from 'vue'
import axios from 'axios'

const state = reactive({
  user: null,
  idFinalizado:[],
  duracaoExercicio:new Map(),
  listaExerciciosDB: [],
  exercicioMarcado:null

});

const methods = {
  setUser(payload){
    state.user = payload ? payload.user : null;
   
  },

  getListaDeExercicios(){
    /* Requisição poara pegar os exercicios do arquivo JSON */
    { axios.get('https://kwppuvtnshwsbvwcegiu.supabase.co/storage/v1/object/sign/lista-de-exercicios/exercicios.json?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsaXN0YS1kZS1leGVyY2ljaW9zL2V4ZXJjaWNpb3MuanNvbiIsImlhdCI6MTY2NDc5NzY1MywiZXhwIjoxOTgwMTU3NjUzfQ.HPmJVN5zzEa3PZijtIl7o8vnC2xhheHnAwP0sGKHs78')
      .then(res =>{
         state.listaExerciciosDB = res.data
      })

      
  }
  },
  setExercicioMarcado(value){
    state.exercicioMarcado = value
  }

   
}
export default {
  state,
  methods
  
}