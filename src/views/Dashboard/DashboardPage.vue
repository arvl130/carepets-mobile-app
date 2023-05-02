<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <main class="pt-12 grid grid-rows-[auto_1fr] min-h-full">
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-item
                button
                :expand="'block'"
                @click="onGoToMyPetsPage"
                class="rounded-2xl"
              >
                <ion-grid class="py-4">
                  <ion-row class="ion-justify-content-center mb-3">
                    <font-awesome-icon icon="fa-solid fa-paw" class="h-24" />
                  </ion-row>
                  <ion-row class="ion-justify-content-center">
                    <ion-label>My Pets</ion-label>
                  </ion-row>
                </ion-grid>
              </ion-item>
            </ion-col>
            <ion-col>
              <ion-item
                button
                :expand="'block'"
                @click="onGoToAppointmentsPage"
                class="rounded-2xl"
              >
                <ion-grid class="py-4">
                  <ion-row class="ion-justify-content-center mb-3">
                    <font-awesome-icon
                      icon="fa-solid fa-calendar-days"
                      class="h-24"
                    />
                  </ion-row>
                  <ion-row class="ion-justify-content-center">
                    <ion-label>Appointments</ion-label>
                  </ion-row>
                </ion-grid>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-item
                button
                :expand="'block'"
                @click="onGoToServicesPage"
                class="rounded-2xl"
              >
                <ion-grid class="py-4">
                  <ion-row class="ion-justify-content-center mb-3">
                    <font-awesome-icon
                      icon="fa-solid fa-scissors"
                      class="h-24"
                    />
                  </ion-row>
                  <ion-row class="ion-justify-content-center">
                    <ion-label>Services</ion-label>
                  </ion-row>
                </ion-grid>
              </ion-item>
            </ion-col>
            <ion-col>
              <ion-item
                button
                :expand="'block'"
                @click="onGoToboutUsPage"
                class="rounded-2xl"
              >
                <ion-grid class="py-4">
                  <ion-row class="ion-justify-content-center mb-3">
                    <font-awesome-icon
                      icon="fa-solid fa-circle-info"
                      class="h-24"
                    />
                  </ion-row>
                  <ion-row class="ion-justify-content-center">
                    <ion-label>About Us</ion-label>
                  </ion-row>
                </ion-grid>
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>
        <div class="h-full flex items-end">
          <ion-button expand="block" class="w-full" @click="onLogout">
            LOGOUT
          </ion-button>
        </div>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { getAuth, signOut } from "@firebase/auth"
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/vue"
import { useRouter } from "vue-router"
import { useRedirectIfUnauthenticated } from "../../hooks/redirects"

useRedirectIfUnauthenticated()

const router = useRouter()

function onGoToMyPetsPage() {
  router.push("/my-pets")
}

function onGoToServicesPage() {
  router.push("/services")
}
function onGoToboutUsPage() {
  router.push("/about")
}

function onGoToAppointmentsPage() {
  router.push("/appointments")
}

async function onLogout() {
  const auth = getAuth()
  await signOut(auth)
  router.replace("/signin")
}
</script>

<style scoped>
ion-content {
  --background: no-repeat center url("../../assets/bg-notext.png");
}

ion-toolbar {
  --background: #c0f1f7;
}

main {
  backdrop-filter: blur(5px);
}
</style>
