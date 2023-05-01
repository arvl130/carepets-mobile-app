<template>
  <ion-list>
    <ion-item>
      <ion-input label="Name" v-model="formData.name" />
    </ion-item>
    <ion-item>
      <ion-select label="Select a breed" v-model="formData.breed">
        <ion-select-option value="ragdoll">Ragdoll</ion-select-option>
        <ion-select-option value="maine coon">Maine Coon</ion-select-option>
        <ion-select-option value="british shorthair">
          British Shorthair
        </ion-select-option>
        <ion-select-option value="american shorthair">
          American Shorthair
        </ion-select-option>
        <ion-select-option value="scottish fold">
          Scottish Fold
        </ion-select-option>
        <ion-select-option value="exotic">Exotic</ion-select-option>
        <ion-select-option value="devon rex">Devon Rex</ion-select-option>
        <ion-select-option value="persian">Persian</ion-select-option>
        <ion-select-option value="abysinnian">Abyssinian</ion-select-option>
        <ion-select-option value="sphynx">Sphynx</ion-select-option>
      </ion-select>
    </ion-item>
  </ion-list>
  <ion-button :expand="'block'" @click="onSubmit"> SUBMIT </ion-button>

  <ion-alert
    :is-open="alert.isOpen"
    :header="alert.header"
    :message="alert.message"
    :buttons="['OK']"
    @didDismiss="alert.isOpen = false"
  />
</template>

<script setup lang="ts">
import {
  IonButton,
  IonList,
  IonItem,
  IonInput,
  IonSelect,
  IonAlert,
  IonSelectOption,
} from "@ionic/vue"
import { reactive } from "vue"
import { useRouter } from "vue-router"
import { PartialPet, addPet } from "@/firebase"
import { useMutation, useQueryClient } from "@tanstack/vue-query"

const { userId } = defineProps({
  userId: {
    required: true,
    type: String,
  },
})

const formData = reactive({
  breed: "",
  name: "",
})

const router = useRouter()
const alert = reactive({
  isOpen: false,
  header: "",
  message: "",
})

const queryClient = useQueryClient()

const { mutate: doAddPet } = useMutation({
  mutationKey: ["addPet", userId],
  mutationFn: (petDetails: PartialPet) => addPet(userId, petDetails),
  onSuccess: async () => {
    formData.name = ""
    formData.breed = ""
    await queryClient.invalidateQueries({
      queryKey: ["getCats", userId],
    })
    router.back()
  },
})

async function onSubmit() {
  if (formData.breed === "") {
    alert.header = "Invalid input"
    alert.message = "Please enter a breed for your cat."
    alert.isOpen = true
    return
  }

  if (formData.name === "") {
    alert.header = "Invalid input"
    alert.message = "Please enter a name for your cat."
    alert.isOpen = true
    return
  }

  try {
    doAddPet({
      name: formData.name,
      breed: formData.breed,
      type: "CAT",
    })
  } catch (e) {
    alert.header = "Unknown error occured"
    alert.message =
      "An unknown error has occured. Please check the Console tab for more information"
    alert.isOpen = true
    console.log(e)
  }
}
</script>
