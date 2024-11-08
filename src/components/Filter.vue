<script setup lang="ts">
import { ref, defineEmits, onMounted, onBeforeUnmount } from "vue";

interface Category {
  category: string | string[];
}

defineProps<{ category: Category[] }>();
const emit = defineEmits();
const openDropdown = ref<boolean>(false);
const dropdownContainer = ref<null | HTMLElement>(null);
const selectedCategoriesFromForm = ref<string[]>([]);

// Function to extract category that are not consistent data type
const getUniqueCategories = (data: Category[]) => {
  const categories = new Set();

  data.forEach((item) => {
    if (typeof item.category === "string" && item.category.includes(","))
      return;
    if (!item.category || item.category.length === 0) return;

    const categoryList = Array.isArray(item.category)
      ? item.category
      : [item.category];

    categoryList.forEach((category) => {
      if (category) categories.add(category);
    });
  });

  return Array.from(categories);
};

const applyFilter = () => {
  emit("update-selected-categories", selectedCategoriesFromForm.value);
};

const toggleDropdown = () => {
  openDropdown.value = !openDropdown.value;
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    dropdownContainer.value &&
    !dropdownContainer.value.contains(event.target as HTMLButtonElement)
  ) {
    openDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div
    class="flex items-center space-x-3 w-full md:w-auto relative mb-2"
    ref="dropdownContainer"
  >
    <button
      id="filterDropdownButton"
      @click="toggleDropdown"
      class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-transparent rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        class="h-4 w-4 mr-2 text-gray-400"
        viewbox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
          clip-rule="evenodd"
        />
      </svg>
      Filter
      <svg
        class="-mr-1 ml-1.5 w-5 h-5"
        fill="currentColor"
        viewbox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        />
      </svg>
    </button>
    <div
      id="filterDropdown"
      :class="[
        openDropdown ? '' : 'hidden',
        'z-10 absolute top-[40px] left-[-10px] h-[450px] w-48 p-3 bg-zinc-800 rounded-lg shadow bg-inherit overflow-y-auto',
      ]"
    >
      <form @submit.prevent="applyFilter">
        <div
          class="flex justify-between items-center mb-3 sticky top-0 bg-zinc-600 px-[7px] py-[9px]"
        >
          <h6 class="text-sm font-medium text-white">Choose category</h6>
          <button
            id="applyFilterBtn"
            type="submit"
            class="px-3 py-1 text-xs font-medium text-white bg-teal-900 rounded-lg hover:bg-teal-950 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-teal-700 dark:hover:bg-teal-800"
          >
            Apply
          </button>
        </div>
        <ul class="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
          <li
            v-for="category in getUniqueCategories(category)"
            :key="category"
            class="flex items-center"
          >
            <input
              type="checkbox"
              :id="category"
              :value="category"
              v-model="selectedCategoriesFromForm"
              class="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label :for="category" class="ml-2 text-sm font-medium text-white">
              {{ `${category.charAt(0).toUpperCase()}${category.slice(1)}` }}
            </label>
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>
