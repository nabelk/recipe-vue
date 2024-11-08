<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const recipe = ref<Record<string, any>>([]);
const getFav: Record<string, any>[] = JSON.parse(
  localStorage.getItem("favorite") || "[]"
);

async function fetchData() {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL, {
      method: "GET",
    });
    const datas = await response.json();
    recipe.value = datas.find(
      (data: Record<string, any>) => data.name === route.params.name
    );
  } catch (error) {
    console.error(error);
  }
}

const checkIsRecipeFav = (favArr = getFav) =>
  favArr.some((fav: Record<string, any>) => fav.name === recipe.value.name);

const handleAddAndRemoveFavorite = () => {
  if (!checkIsRecipeFav()) {
    getFav.push(recipe.value);
    localStorage.setItem("favorite", JSON.stringify(getFav));
  } else {
    const newFav = getFav.filter(
      (fav: Record<string, any>) => fav.name !== recipe.value.name
    );
    localStorage.setItem("favorite", JSON.stringify(newFav));
  }
  window.location.reload();
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div v-if="recipe" class="recipe-container">
    <v-img :src="recipe.image?.[0]" class="img"></v-img>

    <div>
      <button
        @click="handleAddAndRemoveFavorite"
        class="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded flex items-center"
      >
        <span>{{ `${!checkIsRecipeFav() ? "Add to" : "Remove from"}` }}</span>
        <span class="text-red text-3xl ml-1">&hearts;</span>
      </button>
    </div>

    <h1>{{ recipe.name }}</h1>
    <p class="recipe-description">
      {{ recipe.description }}
    </p>
    <p class="recipe-author">By {{ recipe.author?.name }}</p>

    <v-card class="bg-transparent d-flex flex-column align-start" width="100%">
      <v-card-title>Ingredients</v-card-title>
      <v-card-text>
        <ul class="d-flex flex-column align-start ga-2">
          <li v-for="ingredient in recipe.recipeIngredient">
            {{ ingredient }}
          </li>
        </ul>
      </v-card-text>
    </v-card>

    <v-card class="bg-transparent d-flex flex-column align-start" width="100%">
      <v-card-title>Directions</v-card-title>
      <v-card-text>
        <ol class="d-flex flex-column align-start ga-2">
          <li v-for="instruction in recipe.recipeInstructions">
            {{ instruction?.text }}
          </li>
        </ol>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.img {
  width: 50%;
  height: auto;
  margin-bottom: 8px;
}
.recipe-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  width: 70%;
}

.recipe-container h1 {
  font-size: 24px;
}

.recipe-description {
  font-size: 1rem;
  text-align: left;
}

.recipe-author {
  font-size: 0.8rem;
  color: #888;
}

.v-card-text {
  text-align: left;
}

.v-card {
  padding: 2%;
}

@media only screen and (max-width: 1300px) {
  .recipe-container {
    width: 100%;
  }
}

@media only screen and (max-width: 700px) {
  .img {
    width: 100%;
  }
}
</style>
