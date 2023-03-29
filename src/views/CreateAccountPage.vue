<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Create an Account</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">   
      <ion-list>
        <ion-item>
          <ion-label>Name</ion-label>
          <ion-input v-model="displayName"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Email</ion-label>
          <ion-input type="email" v-model="email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Password</ion-label>
          <ion-input type="password" v-model="password"></ion-input>
        </ion-item>
      </ion-list>
      <ion-button :expand="'block'" @click="onSignUp">Sign Up</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonContent, IonHeader,
  IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonList,
  IonLabel
} from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../firebase"
import { FirebaseError } from '@firebase/util';

const displayName = ref("")
const email = ref("")
const password = ref("")
const router = useRouter()

async function onSignUp(){
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email.value, password.value)
    await updateProfile(user, {
      displayName: displayName.value
    })
    router.push("/dashboard")
  } catch (e) {
    if (e instanceof FirebaseError) {
      if (e.code === "auth/email-already-in-use") {
        router.push("/sign-in")
      }
    } else {
      console.log("An error has occured", e)
    }
  }
}
</script>
