import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PaymentView from '../views/PaymentView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import SuccessView from '../views/SuccessView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/payment',
      name: 'payment',
      component: PaymentView,
      beforeEnter: (to, from, next) => {
        if(from.name === 'home'){
          next();
        }else{
          next({name: 'home'})
        }
      },
      beforeRouteLeave(to, from, next) {
        // Verifica se a página atual foi recarregada
        if (from.name === to.name) {
          // Exibe um modal de confirmação
          const confirmed = this.$swal({
            title: 'Confirmação',
            text: 'Deseja realmente sair da página?',
            icon: 'warning',
            showCancelButton: true,
          });
    
          // Se o usuário confirmar, redireciona para outra página
          if (confirmed) {
            next('/');
          } else {
            // Cancela a navegação
            next(false);
          }
        } else {
          next();
        }
      },
      
    }, 
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path:'/success',
      name:'success',
      component: SuccessView,

      beforeEnter: (to, from, next) => {
        if(from.name === 'payment'){
          next();
        }else{
          next({name: 'home'})
        }
      },
    }
    

  ]
})

export default router
