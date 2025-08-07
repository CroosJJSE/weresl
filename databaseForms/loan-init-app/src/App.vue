<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import '../src/styles/lang-fonts.css';
export default {
  name: 'App',
  mounted() {
    console.log('[App.vue] App mounted');
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #ffffff;
}

#app {
  min-height: 100vh;
}

/* Global utility classes */
.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.mt-20 {
  margin-top: 20px;
}

.mb-20 {
  margin-bottom: 20px;
}

.p-20 {
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Enhanced button styles with loader support */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  min-height: 44px;
  position: relative;
  overflow: hidden;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.btn-primary {
  background-color: #1565c0;
  color: white;
  box-shadow: 0 2px 4px rgba(21, 101, 192, 0.2);
}

.btn-primary:hover:not(:disabled) {
  background-color: #0d47a1;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(21, 101, 192, 0.3);
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  box-shadow: 0 2px 4px rgba(108, 117, 125, 0.2);
}

.btn-secondary:hover:not(:disabled) {
  background-color: #545b62;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(108, 117, 125, 0.3);
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  box-shadow: 0 2px 4px rgba(220, 53, 69, 0.2);
}

.btn-danger:hover:not(:disabled) {
  background-color: #c82333;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
}

.btn-outline {
  background-color: transparent;
  border: 2px solid #1565c0;
  color: #1565c0;
  box-shadow: 0 2px 4px rgba(21, 101, 192, 0.1);
}

.btn-outline:hover:not(:disabled) {
  background-color: #e3f2fd;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(21, 101, 192, 0.2);
}

/* Enhanced form controls */
.form-control {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  transition: all 0.3s ease;
  background-color: #fff;
}

.form-control:focus {
  outline: none;
  border-color: #1565c0;
  box-shadow: 0 0 0 3px rgba(21, 101, 192, 0.1);
  transform: translateY(-1px);
}

.form-control.error {
  border-color: #dc3545;
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

/* Enhanced card styles */
.card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 24px;
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 8px 12px rgba(0,0,0,0.15);
  transform: translateY(-2px);
}

/* Enhanced alert styles */
.alert {
  padding: 16px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left: 4px solid;
  font-weight: 500;
}

.alert-success {
  background-color: #e8f5e9;
  color: #2e7d32;
  border-left-color: #4caf50;
}

.alert-error {
  background-color: #ffebee;
  color: #c62828;
  border-left-color: #f44336;
}

.alert-warning {
  background-color: #fff3e0;
  color: #f57c00;
  border-left-color: #ff9800;
}

.alert-info {
  background-color: #e3f2fd;
  color: #1565c0;
  border-left-color: #2196f3;
}

/* Enhanced loading spinner */
.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Enhanced mobile responsiveness */
@media screen and (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
  
  .btn {
    width: 100%;
    margin-bottom: 12px;
    padding: 16px 24px;
    font-size: 16px;
    min-height: 48px;
  }
  
  .form-control {
    padding: 16px;
    font-size: 16px;
  }
  
  .card {
    padding: 20px;
    margin: 0 8px;
  }
  
  .alert {
    padding: 16px;
    margin: 0 8px 16px 8px;
  }
}

/* Extra small devices */
@media screen and (max-width: 480px) {
  .container {
    padding: 0 12px;
  }
  
  .btn {
    padding: 18px 24px;
    font-size: 16px;
    min-height: 52px;
  }
  
  .form-control {
    padding: 18px;
    font-size: 16px;
  }
  
  .card {
    padding: 16px;
    margin: 0 4px;
  }
}

/* Tablet styles */
@media screen and (min-width: 769px) and (max-width: 1024px) {
  .container {
    padding: 0 24px;
  }
  
  .btn {
    padding: 14px 28px;
    font-size: 15px;
  }
  
  .form-control {
    padding: 14px 18px;
    font-size: 15px;
  }
}

/* Large screen enhancements */
@media screen and (min-width: 1025px) {
  .btn:hover:not(:disabled) {
    transform: translateY(-2px);
  }
  
  .form-control:focus {
    transform: translateY(-2px);
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .btn,
  .form-control,
  .card,
  .loading-spinner {
    transition: none;
    animation: none;
  }
  
  .btn:hover:not(:disabled) {
    transform: none;
  }
  
  .form-control:focus {
    transform: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .btn {
    border: 2px solid currentColor;
  }
  
  .form-control {
    border: 2px solid currentColor;
  }
  
  .card {
    border: 2px solid currentColor;
  }
}
</style> 