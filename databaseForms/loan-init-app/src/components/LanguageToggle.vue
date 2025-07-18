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
  justify-content: flex-end;
  margin-bottom: 16px;
}
.lang-btn {
  padding: 6px 14px;
  border: none;
  border-radius: 4px;
  background: #f0f0f0;
  color: #333;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}
.lang-btn.active {
  background: #1565c0;
  color: #fff;
}
</style> 