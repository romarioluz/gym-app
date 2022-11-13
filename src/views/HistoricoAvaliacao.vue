<template>
<div class="chart-container" style="display:flex; position: absolute;width: 360px; height: 360px;">
    <canvas id="myChart"></canvas>
</div>
  
</template>

<script>
import Chart from 'chart.js/auto';
import store from '../store/index';
import { computed } from 'vue';
import {supabase} from '../supabase/init'
import moment from 'moment';



export default { 



//constroi o grafico
mounted(){
    const user = computed(() => store.state.user);
    const userId = user.value.id
    let plotIMC = []
    let plotBodyFat = []
    let plotPeso = []
    let varX = []
    let dados = ''
    //const plotIMC = []

    const dateTime =(valor)=> {
      return moment(valor).format('DD/MM/YYYY');
    }

    const getData = async () =>{
        let { data: Avaliacao, error } = await supabase.from('Avaliacao').select("*").eq('id_user', userId)
        dados = Avaliacao

    if(error) throw error

    // const tamanhoObjData = data.value.length
    //atualiza Y do grafico
    for (let i=0;i<=dados.length -1;i++){
       
       plotIMC[i] = dados[i].imc
       plotBodyFat[i] = dados[i].gorduraCorporal
       plotPeso[i] = dados[i].peso
       varX[i] = dateTime(dados[i].data)
    
        console.log(plotIMC)
        
    }

    //CONTROI GRÁFICO

        const ctx = document.getElementById('myChart');

        const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels:varX,
        datasets:[
            {
                data:plotIMC,
                label:'IMC',
                borderColor: "#3e95cd",
                fill: false
            },
            {
                data:plotBodyFat,
                label:'Gordura Corporal (%)',
                borderColor: "#9155ad",
                fill: false
            },
            {
                data:plotPeso,
                label:'Peso (Kg)',
                borderColor: "#915000",
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

<style scoped>



</style>