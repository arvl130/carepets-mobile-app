import { createRouter, createWebHistory } from "@ionic/vue-router"
import { RouteRecordRaw } from "vue-router"
import HomePage from "../views/HomePage.vue"
import GettingStartedPage from "../views/GettingStartedPage.vue"
import SignInPage from "../views/SignInPage.vue"
import SignUpPage from "../views/SignUpPage.vue"
import DashboardPage from "../views/Dashboard/DashboardPage.vue"
import ServicesPage from "../views/Dashboard/Services/ServicesPage.vue"
import GroomingPage from "../views/Dashboard/Services/GroomingPage.vue"
import VaccinePage from "../views/Dashboard/Services/VaccinePage.vue"
import AboutUsPage from "../views/Dashboard/AboutUsPage.vue"
import MyPetsPage from "../views/Dashboard/MyPets/MyPetsPage.vue"
import CatsPage from "../views/Dashboard/MyPets/Cats/CatsPage.vue"
import AddCatPage from "../views/Dashboard/MyPets/Cats/AddCatPage.vue"
import EditCatPage from "../views/Dashboard/MyPets/Cats/EditCatPage.vue"
import DogsPage from "../views/Dashboard/MyPets/Dogs/DogsPage.vue"
import AddDogPage from "../views/Dashboard/MyPets/Dogs/AddDogPage.vue"
import EditDogPage from "../views/Dashboard/MyPets/Dogs/EditDogPage.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/getting-started",
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/getting-started",
    name: "Getting Started",
    component: GettingStartedPage,
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: SignUpPage,
  },
  {
    path: "/signin",
    name: "Sign In",
    component: SignInPage,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardPage,
  },
  {
    path: "/my-pets",
    name: "My Pets",
    component: MyPetsPage,
  },
  {
    path: "/my-pets/cats",
    name: "My Pets - Cats",
    component: CatsPage,
  },
  {
    path: "/my-pets/cats/add",
    name: "My Pets - Add Cat",
    component: AddCatPage,
  },
  {
    path: "/my-pets/cats/:petId/edit",
    name: "My Pets - Edit Cat",
    component: EditCatPage,
  },
  {
    path: "/my-pets/dogs",
    name: "My Pets - Dogs",
    component: DogsPage,
  },
  {
    path: "/my-pets/dogs/add",
    name: "My Pets - Add Dog",
    component: AddDogPage,
  },
  {
    path: "/my-pets/dogs/:petId/edit",
    name: "My Pets - Edit Dog",
    component: EditDogPage,
  },
  {
    path: "/services",
    name: "Services",
    component: ServicesPage,
  },
  {
    path: "/services/grooming",
    name: "Services - Grooming",
    component: GroomingPage,
  },
  {
    path: "/services/vaccine",
    name: "Services - Vaccine",
    component: VaccinePage,
  },
  {
    path: "/about",
    name: "About Us",
    component: AboutUsPage,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
