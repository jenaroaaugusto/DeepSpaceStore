<template>
  <div class="about">
    <ShopPage />
  </div>
</template>

<script setup>
import ShopPage from '../components/home/ShopPage.vue'
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
