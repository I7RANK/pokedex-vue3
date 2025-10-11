<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import PokeBallLoader from '@/components/PokeBallLoader.vue'
import BaseButton from '@/components/BaseButton.vue'
import FavoriteButton from './FavoriteButton.vue'
import { copyToClipboard } from '@/utils/copyToClipboard'
import IconCircleX from '@/assets/icons/circle-x.svg'
import { usePokemonStore } from '@/stores/pokemon'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  show: boolean
  close: (e?: MouseEvent) => void
  pokemonName: string
}>()

const pokemonStore = usePokemonStore()
const { selectedPokemonDetailed: pokemonData } = storeToRefs(pokemonStore)

const isFavorite = computed(() => {
  if (!pokemonData.value?.name) return false
  return pokemonStore.favorites.includes(pokemonData.value.name)
})

const emit = defineEmits<{
  'click-favorites': [pokemon: string]
}>()

const loading = ref(true)
const copyButtonText = ref<'Share to my friends' | 'Copied!'>('Share to my friends')

const handleClickFavorites = () => {
  emit('click-favorites', props.pokemonName)
}

const handleShareClick = async () => {
  const copySuccess = await copyToClipboard(pokemonData.value?.stringToShare || '')
  if (!copySuccess) return
  copyButtonText.value = 'Copied!'
  setTimeout(() => {
    copyButtonText.value = 'Share to my friends'
  }, 4000)
}

const imageLoaded = ref(false)

const handleImageLoad = async () => {
  imageLoaded.value = true
}

watch(
  () => props.show,
  async (newVal) => {
    if (newVal) {
      document.body.style.overflow = 'hidden'
      loading.value = true
      await pokemonStore.getPokemonByName(props.pokemonName)
      loading.value = false
    } else {
      document.body.style.overflow = ''
    }
  },
)

onUnmounted(() => {
  document.body.style.overflow = ''
  pokemonData.value = undefined
})
</script>

<template>
  <transition name="fade">
    <div
      v-show="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-7.5"
      @click.self="close"
    >
      <div
        data-testid="details-modal"
        v-if="pokemonData"
        class="max-w-layout relative w-full rounded-[5px] bg-white"
      >
        <button
          data-testid="close-modal-button"
          @click="close"
          class="absolute top-2 right-2 z-10 cursor-pointer text-xl"
        >
          <img
            :src="IconCircleX"
            class="h-[1.625rem] w-[1.625rem] text-white hover:text-gray-200"
          />
        </button>
        <div class="relative h-55 w-full">
          <img
            class="absolute h-full w-full rounded-t-[5px] object-cover"
            src="https://res.cloudinary.com/dnmjkesyn/image/upload/q_auto:best/v1749959763/pokedex-bg_ycitni.png"
            alt="pokemon background"
          />
          <div
            :class="loading || !imageLoaded ? 'opacity-100' : 'opacity-0'"
            class="absolute flex h-full w-full items-center justify-center transition-all"
          >
            <PokeBallLoader />
          </div>
          <img
            v-if="!loading"
            :class="imageLoaded ? 'opacity-100' : 'opacity-0'"
            class="floating absolute left-1/2 h-full w-auto -translate-x-1/2 object-contain object-bottom py-5 transition-all"
            :src="pokemonData.sprite"
            alt="pokemon"
            @load="handleImageLoad"
          />
          <div
            class="shadow-animation absolute -bottom-4 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full bg-black/30"
          ></div>
        </div>
        <div class="px-7.5 py-5">
          <div class="text-h2 text-neutral flex flex-col gap-y-2.5 capitalize">
            <p
              data-testid="pokemon-name"
              :class="{ 'skeleton-animation': loading }"
              class="border-b border-[#E8E8E8] pb-2.5"
            >
              <strong>Name:</strong> {{ pokemonData?.name }}
            </p>
            <p :class="{ 'skeleton-animation': loading }" class="border-b border-[#E8E8E8] pb-2.5">
              <strong>Weight:</strong> {{ pokemonData?.weight }}
            </p>
            <p :class="{ 'skeleton-animation': loading }" class="border-b border-[#E8E8E8] pb-2.5">
              <strong>Height:</strong> {{ pokemonData?.height }}
            </p>
            <p
              :class="{ 'skeleton-animation': loading }"
              class="line-clamp-2 max-h-14 border-b border-[#E8E8E8] pb-2.5"
              :title="pokemonData.types"
            >
              <strong>Types:</strong> {{ pokemonData.types }}
            </p>
          </div>
          <div class="mt-5 flex justify-between">
            <BaseButton
              :variant="copyButtonText === 'Copied!' ? 'secondary' : 'primary'"
              :disabled="copyButtonText === 'Copied!'"
              @click="handleShareClick"
            >
              {{ copyButtonText }}
            </BaseButton>
            <FavoriteButton :is-favorite="isFavorite" @click-favorites="handleClickFavorites" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
}

@keyframes shadow-float {
  0% {
    transform: scale(0.8) rotateX(80deg);
  }
  50% {
    transform: scale(1) rotateX(80deg);
  }
  100% {
    transform: scale(0.8) rotateX(80deg);
  }
}

.floating {
  animation: float 3s ease-in-out infinite;
}

.shadow-animation {
  animation: shadow-float 3s ease-in-out infinite;
}
</style>
