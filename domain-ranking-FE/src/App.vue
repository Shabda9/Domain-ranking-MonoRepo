<script setup>
import { ref } from 'vue';
import axios from 'axios';
import RankingChart from './components/RankingChart.vue';

const apiUrl = import.meta.env.VITE_API_URL;

const domainInput = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const comparisonResults = ref([]);
const invalidDomains = ref([]);

const searchDomain = async () => {
  if (!domainInput.value) return;

  isLoading.value = true;
  errorMessage.value = '';
  comparisonResults.value = [];
  invalidDomains.value = [];

  try {
    console.log(`Searching for: ${domainInput.value}`);

    const response = await axios.get(`${apiUrl}/ranking/${encodeURIComponent(domainInput.value)}`);

    response.data.forEach((item) => {
      if(item.history?.length) {
        comparisonResults.value.push(item)
      } else {
        invalidDomains.value.push(item.domain);
      }
    });

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

    <div class="latest-ranks-container">
      <div v-for="item in comparisonResults" :key="item.domain" class="latest-rank-card">
        <span class="rank-domain">{{ item.domain }}</span>
        <span class="rank-value">#{{ item.history[0].rank }}</span>
      </div>
    </div>

    <div v-if="invalidDomains.length > 0" class="warning-box">
      <p>
        <span class="skipped-list">{{ invalidDomains.join(', ') }} : </span>
        <strong v-if="invalidDomains.length === 1">This domain is currently outside Tranco’s Top 1M, but may appear occasionally in historical rankings.</strong>
        <strong v-else>These domains are currently outside Tranco’s Top 1M, but may appear occasionally in historical rankings.</strong>
      </p>
    </div>

    <main class="results-area">
      <div v-if="isLoading" class="spinner"></div>

        <RankingChart
          v-else-if="comparisonResults.length > 0"
          :comparisonData="comparisonResults"
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

.latest-ranks-container {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.latest-rank-card {
  background: white;
  border: 1px solid #e0e0e0;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  gap: 10px;
}

.rank-value {
  color: #42b883;
  font-weight: bold;
  font-size: 1.1em;
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

.warning-box {
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
  padding: 10px 15px;
  border-radius: 6px;
  margin-bottom: 20px;
  text-align: left;
  font-size: 0.9rem;
}

.skipped-list {
  font-weight: bold;
  font-family: monospace;
}

footer {
  margin-top: 40px;
  font-size: 12px;
  color: #aaa;
}
</style>
