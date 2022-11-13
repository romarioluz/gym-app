
import { createRouter, createWebHistory } from "vue-router";
import {supabase} from '../supabase/init'
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Cadastro from "../views/Cadastro.vue";
import CriarTreino from "../views/CriarTreino.vue";
import Avaliacao from "../components/Avaliacao.vue"
import CriarAvaliacao from "../views/CriarAvaliacao.vue"
import Treinos from "../views/Treinos.vue"
import GerenciaTreino from "../views/GerenciaTreino.vue"
import PaginaTreino from "../views/PaginaTreino.vue"
import ExercicioEmExecucao from '../views/ExercicioEmExecucao.vue'
import Volume from '../views/Volume.vue'
import HistoricoAvaliacao from '../views/HistoricoAvaliacao.vue'
import TabelaDeExercicios from '../views/TabelaDeExercicios.vue'

/*
Configuração do titulo da view no navegador e acesso a rotas com 
ou sem necessidade de autenticaçao
meta:{
  title:"Home",
  auth:false
} */

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta:{
      title:"Home",
      auth:false
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta:{
      title:"Login",
      auth:false
    }
  },
  {
    path: "/cadastro",
    name: "Cadastro",
    component: Cadastro,
    meta:{
      title:"Cadastro",
      auth:false
    }
  },
  
  {
    path: "/treinos",
    name: "Treinos",
    component: Treinos,
    meta:{
      title:"Treinos",
      auth:true
    }
  },
  
  {
    path: "/gerenciatreino",
    name: "GerenciaTreino",
    component: GerenciaTreino,
    meta:{
      title:"Gerencia de treino",
      auth:true
    }
  },
  {
    path: "/criartreino",
    name: "CriarTreino",
    component: CriarTreino,
    meta:{
      title:"Criar treino",
      auth:true
    }
  },
  {
    path: "/avaliacao",
    name: "Avaliacao",
    component: Avaliacao,
    meta:{
      title:"Avaliação",
      auth:true
    }
  },
  {
    path: "/criaravaliacao",
    name: "CriarAvaliacao",
    component: CriarAvaliacao,
    meta:{
      title:"Criar Avaliação",
      auth:true
    }
  },
 
  {
    path:"/relatorios",
    name: "Relatorios",
    meta:{
      title:"Relatórios",
      auth:true
    },

    component:() =>
    import ("../views/Relatorio.vue")
  },
 
  {
    path:"/pagina-treino/:treinoId",
    name: "Pagina-Treino",
    component:PaginaTreino,  
   
  },
  {
    path:"/exercicio-em-execucao/:exercicioId",
    name: "ExercicioEmExecucao",
    component:ExercicioEmExecucao,  
   
  },
  {
    path:"/volume",
    name: "Volume",
    component:Volume,  
   
  },
  {
    path:"/historico-avaliacao",
    name: "HistoricoAvaliacao",
    component:HistoricoAvaliacao,  
   
  },
  {
    path:"/tabela-de-exercicios",
    name: "TabelaDeExercicios",
    component:TabelaDeExercicios,  
   
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

//Muda titulo nas abas a depender da rota
router.beforeEach((to, from, next) =>{
  document.title = `${to.meta.title} | GYM APP`
  next()
})


//vai olhar sempre que mudar de rota se há usuario autenticado
router.beforeEach((to, from, next) =>{
  const user = supabase.auth.user();
  if(to.matched.some((res) => res.meta.auth)){
    if(user){
      next()
      return
    }
    next({name:'Login'}) //redireciona para a view Login caso nao esteja autenticado
    return
  }
  next()  //se não precisa de autenticação, pode ir direto
})
export default router;
