import Vue from 'vue';
import Router from 'vue-router';
import PingShow from '../components/PingShow.vue';
import HomeShow from '../components/HomeShow.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'HomeShow',
      component: HomeShow,
    },
    {
      path: '/ping',
      name: 'PingShow',
      component: PingShow,
    },
  ],
});