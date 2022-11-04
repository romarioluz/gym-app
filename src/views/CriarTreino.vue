<template>
  <div>
    <!-- Status msg -->
     <div v-if="statusMsg || errorMsg"></div>

     <!-- Create -->
    <div>
        <!-- Form -->
        <form  @submit.prevent="createWorkout">
           

            <!-- workout name -->
            <div>
                <label for="workout-name">Nome</label>
                <input class="p-2 text-gray-500 focus:outline-none" type="text" required
                id="workout-name"
                v-model="workoutName">
            </div>

            <!-- Workout type -->
            <div class="flex flex-col">
                <label for="workout-name">Tipo</label>
                <select required
                id="workout-type"
                @change="workoutChange"
                v-model="workoutType">
                <option value="select-workout">Select Workout</option>
                <option value="strength">Strength trainning</option>
                <option value="cardio">Cardio</option>
                </select>
            </div>

            <!-- Strength Trrainning Inputs -->
            <div v-if="workoutType === 'strength'">
                <div class=""
                v-for="(item, index) in exercises" :key="index">
                    <div>
                        <label for="exercise-name">Exercise</label>
                        <input required type="text" class=""
                        v-model="item.exercise">
                    </div>
                    <!-- Séries -->
                    <div>
                        <label for="sets">Sets</label>
                        <input required type="text" class=""
                        v-model="item.sets">
                    </div>
                    <!-- Repetições -->
                    <div>
                        <label for="reps">Reps</label>
                        <input required type="text" class=""
                        v-model="item.reps">
                    </div>
                    <!-- Peso -->
                    <div>
                        <label for="weight">Weight (Kg)</label>
                        <input required type="text" class=""
                        v-model="item.weight">
                    </div>
                    <img @click="deleteExercise(item.id)" src="../assets/images/trash-light-green.png" alt="">

                    
                </div>
                <button @click="addExercise" variant="success" type="button">Add Exercise</button>

            </div>

            <!-- Cardio Inputs -->
            <div v-if="workoutType === 'cardio'">
                <div class=""
                v-for="(item, index) in exercises" :key="index">
                    <div>
                        <label for="cardio-type">Type</label>
                        <select id="cardio-type"
                        v-model="item.cardioType">
                            <option value="#">Select Type</option>
                            <option value="run">Runs</option>
                            <option value="walk">Walk</option>
                        </select>
                    </div>
                    <!-- Séries -->
                    <div>
                        <label for="distance">Distance</label>
                        <input required type="text" class=""
                        v-model="item.distance">
                    </div>
                    <!-- Repetições -->
                    <div>
                        <label for="duration">Duration</label>
                        <input required type="text" class=""
                        v-model="item.duration">
                    </div>
                    <!-- Peso -->
                    <div>
                        <label for="pace">Pace</label>
                        <input required type="text" class=""
                        v-model="item.pace">
                        <img @click="deleteExercise(item.id)" src="../assets/images/trash-light-green.png" alt="">
                    </div>
                    
                </div>
                <button variant="success" type="button">Add Exercise</button>

            </div>
        <br>
            <button class="mt-10 py-2 px-6 rounded-sm self-start text-sm text-white
            bg-at-light-green duration-200 border-solid border-2 border-transparent
            hover:border-at-light-green hover:bg-white hover:text-at-light-green" type="submit">Salvar treino</button>

        </form>
    </div>
  </div>  
</template>

<script>
    import {ref, computed} from 'vue'
    import { v4 as uuidv4 } from 'uuid';
    import {supabase} from "../supabase/init"
    import store from '../store/index';


export default {
    name:"criartreino",

    setup(){
        //criar variaveis
        const workoutName = ref("");
        const workoutType = ref("select-workout");
        const exercises = ref([]);
        const statusMsg = ref(null);
        const errorMsg = ref(null);
        const userId = computed(() => store.state.user.id)

        //add exercicio
        const addExercise = () =>{
            if(workoutType.value ==="strength"){
                exercises.value.push({
                    id:uuidv4(),
                    exercise:"",
                    sets:"",
                    reps:"",
                    weight:""
                })
                return
            }

            exercises.value.push({
                id:uuidv4(),
                cardioType:"",
                distance:"",
                duration:"",
                pace:""
                })
        }
        //Deletar exxercicio

        const deleteExercise = (id) =>{
            if(exercises.value.length > 1){
                exercises.value = exercises.value.filter((exercise) => exercise.id !== id)
                
                return
            }
            errorMsg.value = "Erro: Não pode remover, precisa de ao menos 1 exercício"
            setTimeout(() =>{
                errorMsg.value = false
            }, 3000)
        }
        


        //create workout(treino)
        const createWorkout = async() =>{
            
        try {
            const {error} = await supabase.from('workouts').insert([
                {
                    workoutName: workoutName.value,
                    workoutType: workoutType.value,
                    exercises: exercises.value,
                    fk_userid:userId.value
                },
            ]);
            if(error) throw error;
            statusMsg.value = "Sucesso: Treino criado!"
            workoutName.value = null,
            workoutType.value = 'select-workout',
            exercises.value = [],

            setTimeout(() =>{
                statusMsg.value = false;
            }, 3000)
        }
        catch(error){
            errorMsg.value = `Error: ${error.message}`
            setTimeout(() =>{
                errorMsg.value = false
            }, 3000)
        }
    }


        return{workoutName, workoutType, exercises, statusMsg, errorMsg, addExercise, createWorkout, deleteExercise}
    }
}

</script>

<style>
img{
    height: 30px;
    width: 30px;
}
</style>