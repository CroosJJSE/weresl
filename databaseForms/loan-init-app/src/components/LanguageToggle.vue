<template>
  <div class="language-toggle">
    <button
      v-for="lang in langs"
      :key="lang.code"
      :class="['lang-btn', { active: currentLang === lang.code }]"
      @click="changeLang(lang.code)"
    >
      {{ lang.label }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue';
import { setLang, getLang } from '../i18n';

const langs = [
  { code: 'en', label: 'English' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'si', label: 'සිංහල' },
];

const currentLang = ref(getLang());

function changeLang(lang) {
  setLang(lang);
  currentLang.value = lang;
  console.log('[LanguageToggle] Language changed to:', lang);
}

// Keep in sync with global state
watchEffect(() => {
  currentLang.value = getLang();
});

onMounted(() => {
  console.log('[LanguageToggle] Component mounted. Current language:', currentLang.value);
});
</script>

<style scoped>
.language-toggle {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.lang-btn {
  padding: 8px 16px;
  border: 2px solid #1565c0;
  border-radius: 8px;
  background: #f5faff;
  color: #1565c0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lang-btn.active {
  background: #1565c0;
  color: #fff;
  box-shadow: 0 2px 4px rgba(21, 101, 192, 0.3);
}

.lang-btn:hover:not(.active) {
  background: #e3f2fd;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(21, 101, 192, 0.2);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .language-toggle {
    gap: 6px;
    margin-bottom: 12px;
  }
  
  .lang-btn {
    padding: 8px 12px;
    font-size: 12px;
    min-height: 40px;
    flex: 1;
    min-width: 70px;
  }
}

@media (max-width: 480px) {
  .language-toggle {
    gap: 4px;
    margin-bottom: 10px;
  }
  
  .lang-btn {
    padding: 6px 8px;
    font-size: 11px;
    min-height: 36px;
    flex: 1;
    min-width: 60px;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .lang-btn {
    transition: none;
  }
  
  .lang-btn:hover:not(.active) {
    transform: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .lang-btn {
    border: 2px solid currentColor;
  }
}
</style> 