<template>
    <div class="about">
      <SuccessPage />
    </div>
  </template>
  
  <script setup>

  import SuccessPage from '../components/payment/Success.vue'
  </script>
  
  <style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
    }
  }
  </style>