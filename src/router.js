import { createRouter, createWebHashHistory } from 'vue-router';
import ShootVirus from './views/ShootVirus.vue';
import BounceBall from './views/BounceBall.vue';
import ViewHome from './views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'ViewHome',
    component: ViewHome,
  },
  {
    path: '/shoot-virus',
    name: 'ShootVirus',
    component: ShootVirus,
  },
  {
    path: '/bounce-ball',
    name: 'BounceBall',
    component: BounceBall,
  },
];

export default createRouter({
  history: createWebHashHistory('/p5-game/'),
  routes,
});
