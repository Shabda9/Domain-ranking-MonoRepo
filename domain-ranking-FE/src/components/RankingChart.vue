<script setup>
import { computed } from 'vue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'vue-chartjs';

// Registering the Chart.js parts we need
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps({
  rankingHistory: {
    type: Array,
    required: true
  },
  domainName: {
    type: String,
    required: true
  }
});

const chartData = computed(() => {
  return {
    // The labels are the dates on the bottom X-axis
    labels: props.rankingHistory.map(item => item.date),
    datasets: [
      {
        label: `Global Rank: ${props.domainName}`,
        backgroundColor: '#42b883',
        borderColor: '#42b883',
        data: props.rankingHistory.map(item => item.rank),
        tension: 0.3, // Makes the line slightly curved (smooth)
        pointRadius: 4, // Size of the dots
      }
    ]
  }
});

// Configure how the chart looks
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      reverse: true, // Makes Rank 1 appear at the TOP
      title: {
        display: true,
        text: 'Global Rank'
      },
      grid: {
        color: '#f0f0f0'
      }
    },
    x: {
      grid: {
        display: false // Hides vertical grid lines for a cleaner look
      }
    }
  },
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    }
  }
};
</script>

<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  height: 400px; /* Fixed height for the graph */
  width: 100%;
}
</style>
