<template>
   <div class="chart-container" style="width: 360px; height: 360px;">
    <canvas id="myChart"></canvas>

    
   
</div>
  
</template>

<script>
import Chart from 'chart.js/auto';
import store from '../store/index';
import { computed, ref} from 'vue';
import {supabase} from '../supabase/init'
import moment from 'moment';
export default {

//constroi o grafico

beforeCreate(){
    const user = computed(() => store.state.user);
    const userId = user.value.id
    let plotVolume = []
    let dados = ref(null)
  
    let varX = []
    //const plotVolume = []

    const dateTime =(valor)=> {
      return moment(valor).format('DD/MM/YYYY');
    }

    const getData = async () =>{
        let { data: Avaliacao, error } = await supabase.from('ExercicioFeito').select("*").eq('id_usuario', userId)
        dados.value = Avaliacao

    if(error) throw error

    // const tamanhoObjData = data.value.length
    //atualiza Y do grafico
    for (let i=0;i<=dados.value.length -1;i++){
       
       plotVolume[i] = dados.value[i].serie * dados.value[i].carga * dados.value[i].repeticoes
     
       varX[i] = dateTime(dados.value[i].data)
    
        
    }

    //CONTROI GRÁFICO

        const ctx = document.getElementById('myChart');

        const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels:varX,
        datasets:[
            {
                data:plotVolume,
                label:'Volume (Kg): Carga x Repetições x Séries',
                borderColor: "#3e95cd",
                fill: false
            },
            
            
        ]
    }})

    myChart
}

 getData()



    }


 

}




</script>


<style>

</style>