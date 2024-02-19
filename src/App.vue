<script setup>
import { RouterLink, RouterView } from 'vue-router'
import dropShopp from './components/shareds/header.vue'
</script>

<template>
  <v-app>
    <dropShopp/>
    <RouterView /> 
  </v-app>
</template>


