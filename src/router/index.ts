import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import GettingStartedPage from '../views/GettingStartedPage.vue'
import CreateAccountPage from '../views/CreateAccountPage.vue'
import SignInPage from '../views/SignInPage.vue'
import DashboardPage from '../views/DashboardPage.vue'
import MyPetsPage from '../views/MyPets/MyPetsPage.vue'
import CatsPage from '../views/MyPets/CatsPage.vue'
import DogsPage from '../views/MyPets/DogsPage.vue'
import AddDogPage from '../views/MyPets/AddDogPage.vue'
import EditDogPage from '../views/MyPets/EditDogPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: "/getting-started",
    name: "Getting Started",
    component: GettingStartedPage
  },
  {
    path: "/create-account",
    name: "Create Account",
    component: CreateAccountPage
  },
  {
    path: "/sign-in",
    name: "Sign In",
    component: SignInPage
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardPage
  },
  {
    path: "/my-pets",
    name: "My Pets",
    component: MyPetsPage
  },
  {
    path: "/my-pets/cats",
    name: "My Pets - Cats",
    component: CatsPage
  },
  {
    path: "/my-pets/dogs",
    name: "My Pets - Dogs",
    component: DogsPage
  },
  {
    path: "/my-pets/dogs/add",
    name: "My Pets - Add Dog",
    component: AddDogPage
  },
  {
    path: "/my-pets/dogs/:petId/edit",
    name: "My Pets - Edit Dog",
    component: EditDogPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
