<template>
  <ion-list>
    <ion-item>
      <ion-input label="Name" v-model="formData.name"></ion-input>
    </ion-item>
    <ion-item>
      <ion-select label="Select a breed" v-model="formData.breed">
        <ion-select-option value="shih tzu">Shih Tzu</ion-select-option>
        <ion-select-option value="pug">Pug</ion-select-option>
        <ion-select-option value="poodle">Poodle</ion-select-option>
        <ion-select-option value="retriever">Retriever</ion-select-option>
        <ion-select-option value="chow chow">Chow Chow</ion-select-option>
        <ion-select-option value="pomeranian"> Pomeranian </ion-select-option>
        <ion-select-option value="labrador">Labrador</ion-select-option>
        <ion-select-option value="husky">Husky</ion-select-option>
      </ion-select>
    </ion-item>
  </ion-list>
  <ion-button color="danger" :expand="'block'" @click="onDelete">
    DELETE
  </ion-button>
  <ion-button :expand="'block'" @click="onEdit">SAVE</ion-button>

  <ion-alert
    :is-open="alert.isOpen"
    :header="alert.header"
    :message="alert.message"
    :buttons="['OK']"
    @didDismiss="alert.isOpen = false"
  />
</template>

<script lang="ts" setup>
import {
  IonButton,
  IonList,
  IonItem,
  IonInput,
  IonSelect,
  IonAlert,
  IonSelectOption,
  onIonViewDidEnter,
} from "@ionic/vue"
import { reactive, watch } from "vue"
import { useRouter } from "vue-router"
import { editPet, deletePet, getPet, PartialPet } from "@/firebase"
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query"

const { userId, petId } = defineProps({
  userId: {
    required: true,
    type: String,
  },
  petId: {
    required: true,
    type: String,
  },
})

const queryClient = useQueryClient()

const { mutate: doEditPet } = useMutation({
  mutationKey: ["editPet", userId, petId],
  mutationFn: (petDetails: PartialPet) => editPet(userId, petId, petDetails),
  onSuccess: async () => {
    formData.name = ""
    formData.breed = ""
    await queryClient.invalidateQueries({
      queryKey: ["getDogs", userId],
    })
    router.back()
  },
})

const { mutate: doDeletePet } = useMutation({
  mutationKey: ["deletePet", userId, petId],
  mutationFn: () => deletePet(userId, petId),
  onSuccess: async () => {
    formData.name = ""
    formData.breed = ""
    await queryClient.invalidateQueries({
      queryKey: ["getDogs", userId],
    })
    router.back()
  },
})

const { data: pet, refetch } = useQuery({
  queryKey: ["getPet", userId, petId],
  queryFn: () => getPet(userId, petId),
})
onIonViewDidEnter(() => refetch())

watch([pet], () => {
  if (pet.value) {
    formData.breed = pet.value.breed
    formData.name = pet.value.name
  }
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

async function onEdit() {
  if (formData.breed === "") {
    alert.header = "Invalid input"
    alert.message = "Please enter a breed for your dog."
    alert.isOpen = true
    return
  }

  if (formData.name === "") {
    alert.header = "Invalid input"
    alert.message = "Please enter a name for your dog."
    alert.isOpen = true
    return
  }

  try {
    doEditPet({
      name: formData.name,
      breed: formData.breed,
      type: "DOG",
    })
  } catch (e) {
    alert.header = "Unknown error occured"
    alert.message =
      "An unknown error has occured. Please check the Console tab for more information"
    alert.isOpen = true
    console.log(e)
  }
}

function onDelete() {
  doDeletePet()
}
</script>
