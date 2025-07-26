<template>
  <div class="language-toggle">
    <button 
      @click="setLanguage('en')" 
      :class="['lang-btn', { active: currentLang === 'en' }]"
      title="English"
    >
      EN
    </button>
    <button 
      @click="setLanguage('ta')" 
      :class="['lang-btn', { active: currentLang === 'ta' }]"
      title="Tamil"
    >
      த
    </button>
    <button 
      @click="setLanguage('si')" 
      :class="['lang-btn', { active: currentLang === 'si' }]"
      title="Sinhala"
    >
      සි
    </button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { getLang, setLang } from '../i18n.ts'

export default {
  name: 'LanguageToggle',
  setup() {
    const currentLang = computed(() => getLang())

    const setLanguage = (lang) => {
      setLang(lang)
    }

    return {
      currentLang,
      setLanguage
    }
  }
}
</script>

<style scoped>
.language-toggle {
  display: flex;
  gap: 5px;
  background: white;
  border-radius: 25px;
  padding: 5px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.lang-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: #f5f5f5;
  color: #666;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.lang-btn:hover {
  background: #e3f2fd;
  color: #1565c0;
  transform: scale(1.1);
}

.lang-btn.active {
  background: #1565c0;
  color: white;
  box-shadow: 0 2px 4px rgba(21, 101, 192, 0.3);
}

.lang-btn.active:hover {
  background: #0d47a1;
}

/* Language-specific font classes */
.lang-ta {
  font-family: 'Noto Sans Tamil', sans-serif;
}

.lang-si {
  font-family: 'Noto Sans Sinhala', sans-serif;
}

@media screen and (max-width: 768px) {
  .language-toggle {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 1000;
  }
  
  .lang-btn {
    width: 35px;
    height: 35px;
    font-size: 12px;
  }
}
</style> 