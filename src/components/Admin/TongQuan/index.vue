<template>
  <div class="container-fluid py-3">
    <div class="row g-3">
      <div class="col-12 col-xl-6">
        <div class="card h-100 shadow-sm">
          <div class="card-header bg-white d-flex align-items-center justify-content-between">
            <span>Theo dõi hoạt động tổng thể: Số giao dịch (realtime)</span>
            <span class="small text-muted">mỗi 2s cập nhật</span>
          </div>
          <div class="card-body">
            <canvas ref="txChartCanvas" height="120"></canvas>
          </div>
        </div>
      </div>

      <div class="col-12 col-xl-6">
        <div class="card h-100 shadow-sm">
          <div class="card-header bg-white d-flex align-items-center justify-content-between">
            <span>Người dùng online (realtime)</span>
            <span class="small text-muted">mỗi 2s cập nhật</span>
          </div>
          <div class="card-body">
            <canvas ref="userChartCanvas" height="120"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  name: "AdminTongQuan",
  data() {
    return {
      txChart: null,
      userChart: null,
      realtimeTimer: null,
      txPoints: [],
      userPoints: [],
      maxPoints: 20,
    }
  },
  mounted() {
    this.initializeCharts();
    this.startRealtime();
  },
  beforeUnmount() {
    if (this.realtimeTimer) clearInterval(this.realtimeTimer);
    if (this.txChart) this.txChart.destroy();
    if (this.userChart) this.userChart.destroy();
  },
  methods: {
    initializeCharts() {
      // eslint-disable-next-line no-undef
      const ChartJs = window.Chart || Chart;
      if (!ChartJs) {
        console.warn('Chart.js not found. Ensure assets/plugins/chartjs/js/Chart.min.js is loaded in layout.');
        return;
      }

      const now = Date.now();
      this.txPoints = Array.from({ length: 10 }).map((_, i) => ({ t: now - (9 - i) * 2000, v: 0 }));
      this.userPoints = Array.from({ length: 10 }).map((_, i) => ({ t: now - (9 - i) * 2000, v: 0 }));

      const timeLabels = this.txPoints.map(p => new Date(p.t).toLocaleTimeString());

      this.txChart = new ChartJs(this.$refs.txChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
          labels: timeLabels,
          datasets: [{
            label: 'Giao dịch/2s',
            data: this.txPoints.map(p => p.v),
            borderColor: '#0d6efd',
            backgroundColor: 'rgba(13,110,253,.15)',
            fill: true,
            tension: 0.3,
            pointRadius: 0,
          }]
        },
        options: { responsive: true, animation: false, plugins: { legend: { display: false } }, scales: { x: { display: true }, y: { beginAtZero: true } } }
      });

      this.userChart = new ChartJs(this.$refs.userChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
          labels: timeLabels,
          datasets: [{
            label: 'User online',
            data: this.userPoints.map(p => p.v),
            borderColor: '#198754',
            backgroundColor: 'rgba(25,135,84,.15)',
            fill: true,
            tension: 0.3,
            pointRadius: 0,
          }]
        },
        options: { responsive: true, animation: false, plugins: { legend: { display: false } }, scales: { x: { display: true }, y: { beginAtZero: true } } }
      });
    },
    startRealtime() {
      this.realtimeTimer = setInterval(() => {
        const now = Date.now();
        const newTx = Math.max(0, Math.round((Math.random() * 10) - 2));
        const newUsers = Math.max(0, Math.round(50 + Math.random() * 20 - 10));

        this.pushPoint(this.txPoints, { t: now, v: newTx });
        this.pushPoint(this.userPoints, { t: now, v: newUsers });

        this.refreshCharts();
      }, 2000);
    },
    pushPoint(arr, point) {
      arr.push(point);
      if (arr.length > this.maxPoints) arr.shift();
    },
    refreshCharts() {
      if (!this.txChart || !this.userChart) return;
      const labels = this.txPoints.map(p => new Date(p.t).toLocaleTimeString());
      this.txChart.data.labels = labels;
      this.txChart.data.datasets[0].data = this.txPoints.map(p => p.v);
      this.txChart.update('none');

      this.userChart.data.labels = labels;
      this.userChart.data.datasets[0].data = this.userPoints.map(p => p.v);
      this.userChart.update('none');
    }
  }
}
</script>

<style>
.badge.bg-soft-primary { background-color: rgba(13,110,253,.12); }
.badge.bg-soft-success { background-color: rgba(25,135,84,.12); }
.badge.bg-soft-danger  { background-color: rgba(220,53,69,.12); }
.badge.bg-soft-warning { background-color: rgba(255,193,7,.15); }
</style>

