import { defineStore } from "pinia"
import { computed, ref } from "vue"

export type PetService = {
  code: string
  prettyName: string
  cost: number
}

export function getDogServiceByCode(code: string) {
  return [...vaccineServicesForDogs, ...groomingServicesForDogs].find(
    (service) => service.code === code
  )
}

export function getCatServiceByCode(code: string) {
  return [...vaccineServicesForCats, ...groomingServicesForCats].find(
    (service) => service.code === code
  )
}

export const vaccineServicesForDogs: PetService[] = [
  {
    code: "DOG_VACCINE_5_IN_1",
    prettyName: "5 in 1 Vaccine",
    cost: 450,
  },
  {
    code: "DOG_VACCINE_ANTI_RABIES",
    prettyName: "Anti Rabies",
    cost: 300,
  },
  {
    code: "DOG_VACCINE_COUGH",
    prettyName: "Cough Vaccine",
    cost: 500,
  },
  {
    code: "DOG_VACCINE_HEARTWORM",
    prettyName: "Heartworm Prevention Shot",
    cost: 350,
  },
  {
    code: "DOG_VACCINE_DEWORMING",
    prettyName: "Deworming",
    cost: 300,
  },
]

export const vaccineServicesForCats: PetService[] = [
  {
    code: "CAT_VACCINE_4_IN_1",
    prettyName: "4 in 1 Vaccine",
    cost: 950,
  },
  {
    code: "CAT_VACCINE_ANTI_RABIES",
    prettyName: "Anti Rabies",
    cost: 300,
  },
  {
    code: "CAT_VACCINE_DEWORMING",
    prettyName: "Deworming",
    cost: 250,
  },
]

export const groomingServicesForDogs: PetService[] = [
  {
    code: "DOG_GROOMING_NAIL_TRIM_AND_FILING",
    prettyName: "Nail Trim and Filing",
    cost: 75,
  },
  {
    code: "DOG_GROOMING_TOOTHBRUSHING",
    prettyName: "Teeth brushing (toothbrush not provided)",
    cost: 75,
  },
  {
    code: "DOG_GROOMING_EYE_WASH",
    prettyName: "Eye Wash",
    cost: 75,
  },
  {
    code: "DOG_GROOMING_EAR_CLEANING",
    prettyName: "Ear Cleaning",
    cost: 75,
  },
  {
    code: "DOG_GROOMING_ANAL_DRAIN",
    prettyName: "Anal Drain",
    cost: 150,
  },
  {
    code: "DOG_GROOMING_FULL_BODY_TRIMMING",
    prettyName: "Full Body Trimming",
    cost: 250,
  },
  {
    code: "DOG_GROOMING_DEMATTING",
    prettyName: "Dematting",
    cost: 450,
  },
]

export const groomingServicesForCats: PetService[] = [
  {
    code: "CAT_GROOMING_NAIL_CLIPPING",
    prettyName: "Nail Clipping",
    cost: 450,
  },
  {
    code: "CAT_GROOMING_DESHEDDING",
    prettyName: "Deshedding (brushing only)",
    cost: 450,
  },
  {
    code: "CAT_GROOMING_BATH_WITH_BRUSH",
    prettyName: "Bath + Brush",
    cost: 700,
  },
  {
    code: "CAT_GROOMING_NAILS_WITH_BRUSH",
    prettyName: "Nails + Brush",
    cost: 800,
  },
]

export const useNewAppointmentStore = defineStore("newAppointment", () => {
  const selectedPetsWithServices = ref<
    {
      petId: string
      serviceCodes: string[]
    }[]
  >([])

  function addPet(petId: string) {
    selectedPetsWithServices.value.push({
      petId,
      serviceCodes: [],
    })
  }

  function removePet(petId: string) {
    selectedPetsWithServices.value = selectedPetsWithServices.value.filter(
      (petWithService) => petWithService.petId !== petId
    )
  }

  function addServiceToPet(petId: string, serviceCode: string) {
    selectedPetsWithServices.value = selectedPetsWithServices.value.map(
      (selectedPetWithService) => {
        if (selectedPetWithService.petId === petId) {
          return {
            petId,
            serviceCodes: [...selectedPetWithService.serviceCodes, serviceCode],
          }
        } else {
          return selectedPetWithService
        }
      }
    )
  }

  function removeServiceFromPet(petId: string, serviceCode: string) {
    selectedPetsWithServices.value = selectedPetsWithServices.value.map(
      (selectedPetWithService) => {
        if (selectedPetWithService.petId === petId) {
          return {
            petId,
            serviceCodes: selectedPetWithService.serviceCodes.filter(
              (selectedServiceCode) => selectedServiceCode !== serviceCode
            ),
          }
        } else {
          return selectedPetWithService
        }
      }
    )
  }

  const hasPetId = computed(() => {
    return (petId: string) => {
      const isPetIdInHere = selectedPetsWithServices.value.some(
        (selectedPetWithServices) => selectedPetWithServices.petId === petId
      )

      if (isPetIdInHere) {
        return true
      } else {
        return false
      }
    }
  })

  const petIdHasServiceCode = computed(() => {
    return (petId: string, serviceCode: string) => {
      const selectedPet = selectedPetsWithServices.value.find(
        (selectedPetWithServices) => selectedPetWithServices.petId === petId
      )

      // Selected pet is not in here.
      if (!selectedPet) return false

      // Pet exists but does not have this service.
      if (!selectedPet.serviceCodes.includes(serviceCode)) return false

      return true
    }
  })

  const allPetsHasService = computed(() => {
    return !selectedPetsWithServices.value.some(
      (selectedPetWithServices) =>
        selectedPetWithServices.serviceCodes.length === 0
    )
  })

  const selectedDate = ref<string>("")
  const selectedSlot = ref<"" | "MORNING" | "AFTERNOON">("")

  return {
    selectedPetsWithServices,
    addPet,
    removePet,
    addServiceToPet,
    removeServiceFromPet,
    petIdHasServiceCode,
    hasPetId,
    allPetsHasService,
    selectedDate,
    selectedSlot,
  }
})
