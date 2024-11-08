<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Filter from "./Filter.vue";

type Recipe = {
  name: string;
  image: string[];
  category: string | string[];
};

interface Category {
  category: string | string[];
}

const recipes = ref<Recipe[]>([]);
const category = ref<Category[]>([]);
const selectedCategories = ref<string[]>([]);
const isFetchData = ref<boolean>(true);

onMounted(() => {
  if (!localStorage.getItem("favorite")) {
    localStorage.setItem("favorite", JSON.stringify([]));
  }
  fetchData();
});

async function fetchData() {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL, {
      method: "GET",
    });
    const data = await response.json();

    const mappedData = data.map((d: Record<string, any>) => ({
      name: d.name,
      image: d.image,
      category: d.recipeCategory,
    }));

    category.value = mappedData.map((d: Recipe) => ({ category: d.category }));

    recipes.value =
      selectedCategories.value.length > 0
        ? filterRecipesBySelectedCategories(
            mappedData,
            selectedCategories.value
          )
        : mappedData;

    isFetchData.value = false;
  } catch (error) {
    isFetchData.value = false;
  }
}

const filterRecipesBySelectedCategories = (
  data: Recipe[],
  selectedCategories: string[]
) => {
  if (!selectedCategories || selectedCategories.length === 0) return data;

  return data.filter((item) => {
    if (typeof item.category === "string" && item.category.includes(","))
      return false;
    if (!item.category || item.category.length === 0) return false;

    const categoryList = Array.isArray(item.category)
      ? item.category
      : [item.category];

    return categoryList.some((category) =>
      selectedCategories.includes(category)
    );
  });
};

watch(selectedCategories, (_newSelectedCategories) => {
  fetchData();
});

const handleFilter = (newSelectedCategories: string[]) => {
  selectedCategories.value = [...newSelectedCategories];
};
</script>

<template>
  <div
    class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"
  >
    <h2 class="text-left mb-2">
      {{
        selectedCategories.length > 0
          ? `Filter result for ${selectedCategories.join(", ")}`
          : "Explore Recipes"
      }}
    </h2>
    <Filter
      v-if="!isFetchData"
      :category="category"
      @update-selected-categories="handleFilter"
    />
  </div>

  <v-container class="container">
    <v-row>
      <v-col
        v-for="(recipe, index) in recipes"
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
