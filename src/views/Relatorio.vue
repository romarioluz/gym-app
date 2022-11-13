<template>
    <div>
               
        
    <div class="mt-20 py-1 px-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
        
            <router-link class="mt-6 py-3 rounded px-3 text-center text-xs text-white bg-indigo shadow-md " :to="{name:'Volume'}">Volume de Treino</router-link>
            <br/>
            <router-link class="mt-6 py-3 rounded px-3 text-center text-xs text-white bg-indigo shadow-md " :to="{name:'HistoricoAvaliacao'}">Histórico Avaliação</router-link>
            <router-link class="mt-6 py-3 rounded px-3 text-center text-xs text-white bg-indigo shadow-md " :to="{name:'TabelaDeExercicios'}">Histórico de Exercícios</router-link>

        </div>
    </div>

    
</template>