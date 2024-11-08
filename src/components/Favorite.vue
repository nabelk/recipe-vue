<script setup lang="ts">
const favRecipe: Record<string, any>[] = JSON.parse(
  localStorage.getItem("favorite") || "[]"
);
</script>

<template>
  <h2 class="text-left mb-2">
    {{ favRecipe.length > 0 ? `Saved Recipes` : "No saved recipes found " }}
  </h2>
  <v-container class="container">
    <v-row>
      <v-col
        v-for="(recipe, index) in favRecipe"
        :key="index"
        :cols="12"
        :md="6"
        :lg="4"
      >
        <v-card class="bg-transparent">
          <router-link
            :to="{
              name: 'recipe-detail',
              params: { name: recipe.name },
            }"
          >
            <v-img
              :src="recipe.image?.[0]"
              cover
              :alt="`${recipe.name} image`"
              class="img"
            ></v-img>
            <v-card-title>{{ recipe.name }}</v-card-title></router-link
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
a {
  text-decoration: none;
  color: white;
}

.v-card-title {
  font-size: 1.1rem;
}
.img {
  max-width: 100%;
  height: 270px;
}

@media only screen and (min-width: 500px) {
  .container {
    padding: 40px;
  }
}
</style>
