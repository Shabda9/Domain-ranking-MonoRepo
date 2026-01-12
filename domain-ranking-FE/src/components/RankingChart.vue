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
  comparisonData: {
    type: Array,
    required: true
  }
});

const chartData = computed(() => {
  // X-AXIS (Dates)
  // we take the dates from the FIRST domain in the list.
  const labels = props.comparisonData[0].history.map(item => item.date);

  // Y-AXIS (Lines)
  // we loop through the list of domains to create a line for each one.
  const datasets = props.comparisonData.map((domainData, index) => {
    // Generating random color for every line
    const hue = (index * 137.5) % 360;
    const color = `hsl(${hue}, 70%, 50%)`;

    return {
      label: domainData.domain, // the name in the Legend
      backgroundColor: color,
      borderColor: color,
      // Map the history array to just the Rank numbers
      data: domainData.history.map(h => h.rank),
      tension: 0.3, // Curve the line slightly
      pointRadius: 4,
      pointHoverRadius: 6
    };
  });

  return { labels, datasets };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      reverse: true, // rank 1 is at the top
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
        display: false
      },
      title: {
        display: true,
        text: 'Timeline'
      }
    }
  },
  plugins: {
    legend: {
      position: 'top',
      labels: {
        usePointStyle: true, // makes the legend use dots instead of boxes
      }
    },
    tooltip: {
      mode: 'index',
      intersect: false, // shows tooltips for all lines at that specific date
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
  height: 400px;
  width: 100%;
}
</style>
