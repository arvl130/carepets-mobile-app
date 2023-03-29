<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-button :expand="'block'" @click="onOpenMyPetsPage">My Pets</ion-button>
          </ion-col>
          <ion-col>
            <ion-button :expand="'block'">Appointments</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button :expand="'block'">Services</ion-button>
          </ion-col>
          <ion-col>
            <ion-button :expand="'block'">About Us</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-button :expand="'block'" @click="onLogout">Logout</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { signOut } from '@firebase/auth';
import { IonContent,
IonHeader,
IonPage,
IonTitle,
IonToolbar,
IonButton,
IonGrid,
IonRow,
IonCol
} from '@ionic/vue';
import { useRouter } from 'vue-router';
import { auth } from "../firebase"

const router = useRouter()

async function onLogout() {
  await signOut(auth)
  router.push("/sign-in")
}

function onOpenMyPetsPage() {
  router.push("/my-pets")
}
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
