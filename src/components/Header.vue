<template>
  <header class="d-flex align-center pt-0 pb-8">
    <router-link
      :to="{
        name: 'home',
      }"
    >
      <h1 class="text-h6 font-mono">NYUMS</h1>
    </router-link>

    <div class="d-flex align-center">
      <router-link :to="{ name: 'favorite' }">
        <p class="text-red text-3xl">&hearts;</p>
      </router-link>
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
