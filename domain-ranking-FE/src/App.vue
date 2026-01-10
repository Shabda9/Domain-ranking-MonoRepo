<script setup>
import { ref } from 'vue';
import axios from 'axios';
import RankingChart from './components/RankingChart.vue';

const domainInput = ref('');
const searchedDomain = ref(''); // Adding because domain Input was causing jitters
const isLoading = ref(false);
const errorMessage = ref('');
const showChart = ref(false);
const rankingData = ref([]);

const searchDomain = async () => {
  if (!domainInput.value) return;

  searchedDomain.value = domainInput.value;
  isLoading.value = true;
  errorMessage.value = '';
  showChart.value = false; // Hide chart while loading

  try {
    console.log(`Searching for: ${domainInput.value}`);

    const response = await axios.get(`http://localhost:3000/ranking/${domainInput.value}`);

    rankingData.value = response.data;

    if (rankingData.value.length === 0) {
      errorMessage.value = "No data found for this domain.";
    } else {
      showChart.value = true;
    }

  } catch (error) {
    console.log("Error",error);
    errorMessage.value = "Failed to fetch data.";
  } finally {
    isLoading.value = false;
  }
};

</script>
<template>
  <div class="app-container">
    <header>
      <h1>Domain Ranker</h1>
      <p>Check historical ranking of any website</p>
    </header>

    <div class="search-box">
      <input
        v-model="domainInput"
        type="text"
        placeholder="Enter domain (e.g. google.com)"
        @keyup.enter="searchDomain"
      />
      <button @click="searchDomain" :disabled="isLoading">
        {{ isLoading ? 'Loading...' : 'Search' }}
      </button>
    </div>

    <div v-if="errorMessage" class="error">
      {{ errorMessage }}
    </div>

    <main class="results-area">
      <div v-if="isLoading" class="spinner"></div>

      <RankingChart
        v-else-if="showChart"
        :rankingHistory="rankingData"
        :domainName="searchedDomain"
      />

      <div v-else class="placeholder-text">
        Enter a domain to see the graph.
      </div>
    </main>

    <footer>
      <p>Built with Vue.js & NestJS</p>
    </footer>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  background-color: #f4f7f6;
  color: #333;
}

.app-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: center;
}

header h1 {
  margin-bottom: 5px;
  color: #2c3e50;
}

header p {
  color: #7f8c8d;
  margin-top: 0;
}

.search-box {
  margin: 30px 0;
  display: flex;
  justify-content: center;
  gap: 10px;
}

input {
  padding: 12px;
  width: 60%;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
}

input:focus {
  border-color: #42b883;
}

button {
  padding: 12px 24px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: #3aa876;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.results-area {
  min-height: 300px;
  background: #f9f9f9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #eee;
}

.placeholder-text {
  color: #aaa;
}

.error {
  color: red;
  margin-bottom: 15px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b883;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

footer {
  margin-top: 40px;
  font-size: 12px;
  color: #aaa;
}
</style>
