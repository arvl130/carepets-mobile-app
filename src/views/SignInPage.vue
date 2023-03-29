<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Sign In</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item>
          <ion-label>Email</ion-label>
          <ion-input type="email" v-model="email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Password</ion-label>
          <ion-input type="password" v-model="password"></ion-input>
        </ion-item>
      </ion-list>
      <ion-button :expand="'block'" @click="onSignIn">Sign In</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { signInWithEmailAndPassword } from '@firebase/auth';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from "../firebase"

const email = ref("")
const password = ref("")
const router = useRouter()

async function onSignIn() {
  await signInWithEmailAndPassword(auth, email.value, password.value)

  email.value = ""
  password.value = ""
  router.push("/dashboard")
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
