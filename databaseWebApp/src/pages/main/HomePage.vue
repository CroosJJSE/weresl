<template>
  <div class="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-neutral-800 dark:text-neutral-200">
    <!-- Header -->
    <header class="flex items-center bg-transparent p-4 pb-2 justify-between sticky top-0 z-20 backdrop-blur-lg border-b border-neutral-200/50 dark:border-neutral-800/50">
      <h1 class="text-primary dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] flex-1">WERESL</h1>
      <div class="flex items-center gap-2">
        <button 
            @click="openPdfExportModal"
          class="flex items-center gap-2 px-3 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-neutral-800 transition-colors"
          >
          <span class="material-symbols-outlined text-lg">picture_as_pdf</span>
          PDF Export
          </button>
        <div class="bg-center bg-no-repeat aspect-square bg-cover h-8 w-8 rounded-full" style="background-image: url('/placeholder-profile.jpg')"></div>
        </div>
    </header>

    <!-- Search Section -->
    <div class="bg-transparent p-4 sticky top-[68px] z-10 backdrop-blur-lg -mt-1">
      <div class="flex gap-2 items-center">
        <div class="relative flex-1">
        <input 
          v-model="profilesSearchQuery" 
          @input="handleProfilesSearch"
            class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-full text-neutral-800 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800/70 h-12 placeholder:text-neutral-500/70 dark:placeholder:text-neutral-400/70 pl-12 pr-4 text-base font-normal leading-normal shadow-soft transition-all duration-300" 
            placeholder="Search by Name, Reg_ID..." 
        />
          <div class="text-neutral-500 dark:text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2">
            <span class="material-symbols-outlined">search</span>
      </div>
        </div>
        <select v-model="profilesFilters.District" @change="loadProfiles" class="flex h-12 shrink-0 items-center justify-center gap-x-1.5 rounded-full bg-white/70 dark:bg-neutral-800/70 px-4 border border-neutral-300 dark:border-neutral-700 shadow-soft transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-sm font-medium leading-normal">
          <option value="">District</option>
          <option v-for="district in districts" :key="district" :value="district">{{ district }}</option>
        </select>
      </div>
      </div>

    <!-- Main Content -->
    <main class="flex-1 bg-background-light dark:bg-background-dark px-4 pb-4">
      <!-- Results Count -->
      <div class="pt-4">
        <p class="text-neutral-500 dark:text-neutral-400 text-sm font-medium mb-4">Results: {{ filteredProfiles.length }}</p>
      </div>

      <!-- Loading State -->
      <div v-if="profilesLoading" class="flex flex-col items-center justify-center py-12">
        <div class="loading-spinner"></div>
        <p class="mt-4 text-neutral-600 dark:text-neutral-400">Loading profiles...</p>
    </div>

      <!-- Error State -->
      <div v-else-if="profilesError" class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm flex flex-col items-center justify-center p-8 text-center">
        <span class="material-symbols-outlined text-5xl text-warning-500">error</span>
        <p class="mt-4 font-semibold text-neutral-800 dark:text-neutral-200">Failed to load profiles</p>
        <p class="text-sm text-neutral-600 dark:text-neutral-400">{{ profilesError }}</p>
        <button @click="loadProfiles" class="mt-4 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-neutral-800">
          Retry
        </button>
      </div>

      <!-- Profile Cards -->
      <div v-else class="flex flex-col gap-4">
        <div 
          v-for="profile in filteredProfiles" 
          :key="profile.id"
          @click="openProfile(profile)"
          class="card-glow flex gap-4 bg-white dark:bg-neutral-800/50 p-4 rounded-xl shadow-soft-lg border border-neutral-200/80 dark:border-neutral-700/50 backdrop-blur-xl transition-transform duration-300 ease-in-out hover:scale-[1.02] cursor-pointer"
        >
          <div 
            class="bg-center bg-no-repeat aspect-square bg-cover h-20 w-20 rounded-lg shadow-md" 
            :style="{ backgroundImage: `url(${getProfileImageUrl(profile)})` }"
          ></div>
          <div class="flex flex-1 flex-col justify-center">
            <p class="text-neutral-800 dark:text-white text-lg font-bold leading-tight">
              {{ profile.basicInfo?.name || 'Unknown' }}
            </p>
            <p class="text-neutral-500 dark:text-neutral-400 text-sm font-normal leading-normal mt-1">
              Reg_ID: {{ profile.id || profile.Reg_ID || 'N/A' }}
            </p>
            <p class="text-neutral-500 dark:text-neutral-400 text-xs font-normal leading-normal">
              District: {{ profile.basicInfo?.District || 'N/A' }}, Age: {{ profile.basicInfo?.age || 'N/A' }}
            </p>
            <div class="mt-2 flex items-center gap-2">
              <span 
                v-for="type in getProfileTypes(profile)" 
                :key="type"
                :class="getProfileTypeClass(type)"
                class="text-xs font-semibold inline-block py-1 px-2.5 uppercase rounded-full w-fit"
              >
                {{ type }}
              </span>
          </div>
        </div>
          <span class="material-symbols-outlined self-center text-neutral-400 dark:text-neutral-500">
            chevron_right
          </span>
      </div>
    </div>
    </main>

    <!-- PDF Export Modal -->
    <PdfExportModal 
      :isVisible="showPdfExportModal" 
      @close="closePdfExportModal" 
    />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { profileService } from '@/services/profile.js'
import { imageService } from '@/services/imageService.js'
import { dbOperations } from '@/firebase/db.js'
import { ProfileField } from '@/enums/db.js'
import PdfExportModal from '@/components/PdfExportModal.vue'
import { formatAmount } from '@/utils/formatUtils.ts'

export default {
  name: 'HomePage',
  components: {
    PdfExportModal
  },
  setup() {
    const router = useRouter()
    
    const profiles = ref([])
    const profilesLoading = ref(true)
    const profilesError = ref(null)
    const profilesSearchQuery = ref('')
    const profilesFilters = ref({
      District: ''
    })
    const showPdfExportModal = ref(false)

    const filteredProfiles = computed(() => {
      let filtered = profiles.value

      // Apply search filter
      if (profilesSearchQuery.value) {
        const query = profilesSearchQuery.value.toLowerCase()
        filtered = filtered.filter(profile => {
          const name = profile.basicInfo?.name?.toLowerCase() || ''
          const regId = profile.id?.toLowerCase() || profile.Reg_ID?.toLowerCase() || ''
          const nic = profile.basicInfo?.NIC?.toLowerCase() || ''
          return name.includes(query) || regId.includes(query) || nic.includes(query)
        })
      }

      // Apply district filter
      if (profilesFilters.value.District) {
        filtered = filtered.filter(profile => 
          profile.basicInfo?.District === profilesFilters.value.District
        )
      }

      return filtered
    })

    const districts = computed(() => {
      const districtSet = new Set()
      profiles.value.forEach(profile => {
        if (profile.basicInfo?.District) {
          districtSet.add(profile.basicInfo.District)
        }
      })
      return Array.from(districtSet).sort()
    })

    const loadProfiles = async () => {
      try {
      profilesLoading.value = true
      profilesError.value = null
      
        const profilesData = await dbOperations.getAllProfiles()
        profiles.value = profilesData || []
      } catch (error) {
        console.error('Error loading profiles:', error)
        profilesError.value = 'Failed to load profiles'
      } finally {
        profilesLoading.value = false
      }
    }

    const handleProfilesSearch = () => {
      // Search is handled by computed property
    }

    const openProfile = (profile) => {
      const regId = profile.id || profile.Reg_ID
      if (regId) {
        router.push(`/${regId}`)
      }
    }

    const getProfileImageUrl = (profile) => {
      if (!profile) {
        return '/placeholder-profile.jpg'
      }
      
      const imageUrl = profile.Image || profile.imageUrl || profile.basicInfo?.imageUrl
      if (!imageUrl) {
        return '/placeholder-profile.jpg'
      }

      if (imageUrl && !imageUrl.includes('http') && !imageUrl.includes('drive.google.com')) {
        const fileId = imageUrl.trim()
        if (fileId && fileId.length > 10) {
          return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h400`
        }
      }

      return imageUrl
    }

    const getProfileTypes = (profile) => {
      if (!profile) return []
      return profileService.getProfileTypes(profile)
    }

    const getProfileTypeClass = (type) => {
      switch (type) {
        case 'RF':
          return 'text-primary bg-primary/10 dark:bg-primary/20'
        case 'GRANT':
          return 'text-success bg-success/10 dark:bg-success/20'
        case 'GIF':
          return 'text-warning bg-warning/10 dark:bg-warning/20'
        default:
          return 'text-neutral bg-neutral/10 dark:bg-neutral/20'
      }
    }

    const openPdfExportModal = () => {
      showPdfExportModal.value = true
    }

    const closePdfExportModal = () => {
      showPdfExportModal.value = false
    }

    onMounted(() => {
      loadProfiles()
      
      // Add card glow effect
      nextTick(() => {
        const cards = document.querySelectorAll('.card-glow')
        cards.forEach(card => {
          card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            card.style.setProperty('--glow-x', `${x}px`)
            card.style.setProperty('--glow-y', `${y}px`)
          })
        })
      })
    })

          return {
        profiles,
      profilesLoading,
      profilesError,
      profilesSearchQuery,
      profilesFilters,
      filteredProfiles,
      districts,
      showPdfExportModal,
      loadProfiles,
      handleProfilesSearch,
      openProfile,
      getProfileImageUrl,
      getProfileTypes,
      getProfileTypeClass,
      openPdfExportModal,
      closePdfExportModal,
      formatAmount,
      ProfileField
      }
  }
}
</script>

<style scoped>
/* Loading Spinner */
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1565c0;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .flex-col {
    flex-direction: column;
  }
}
</style> 