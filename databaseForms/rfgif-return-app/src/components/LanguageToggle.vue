<template>
  <div class="language-toggle">
    <button 
      @click="setLanguage('en')" 
      :class="['lang-btn', { active: currentLang === 'en' }]"
      title="English"
    >
      English
    </button>
    <button 
      @click="setLanguage('ta')" 
      :class="['lang-btn', { active: currentLang === 'ta' }]"
      title="Tamil"
    >
      தமிழ்
    </button>
    <button 
      @click="setLanguage('si')" 
      :class="['lang-btn', { active: currentLang === 'si' }]"
      title="Sinhala"
    >
      සිංහල
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
  gap: 8px;
  background: white;
  border-radius: 25px;
  padding: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.lang-btn {
  min-width: 80px;
  height: 40px;
  border: none;
  border-radius: 20px;
  background: #f5f5f5;
  color: #666;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  padding: 0 15px;
  white-space: nowrap;
}

.lang-btn:hover {
  background: #e3f2fd;
  color: #1565c0;
  transform: scale(1.05);
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
    min-width: 60px;
    height: 35px;
    font-size: 12px;
    padding: 0 10px;
  }
}
</style> 