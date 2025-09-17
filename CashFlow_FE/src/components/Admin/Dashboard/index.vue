<template>
  <div class="container-fluid py-3 dashboard">
    <!-- Hàng 1: 4 thẻ số liệu nhanh -->
    <div class="row g-3">
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex flex-column gap-2">
            <div class="text-muted fw-semibold">Số người dùng</div>
            <div class="d-flex align-items-end justify-content-between">
              <div class="fs-3 fw-bold">{{ usersCount }}</div>
              <span class="badge bg-soft-primary text-primary">{{ newUsersThisMonth }} mới tháng này</span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex flex-column gap-2">
            <div class="text-muted fw-semibold">Số giao dịch</div>
            <div class="d-flex align-items-end justify-content-between">
              <div class="fs-3 fw-bold">{{ transactionsCount }}</div>
              <span class="badge bg-soft-success text-success">{{ transactionsToday }} hôm nay</span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex flex-column gap-2">
            <div class="text-muted fw-semibold">Cảnh báo lỗi</div>
            <div class="d-flex align-items-end justify-content-between">
              <div class="fs-3 fw-bold">{{ errorAlerts }}</div>
              <span class="badge bg-soft-danger text-danger">{{ criticalAlerts }} nghiêm trọng</span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex flex-column gap-2">
            <div class="text-muted fw-semibold">Thống kê nhanh</div>
            <div class="d-flex align-items-end justify-content-between">
              <div class="fs-3 fw-bold">{{ quickStatValue }}</div>
              <span class="badge bg-soft-warning text-warning">{{ quickStatLabel }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hàng 2: 2 bảng to -->
    <div class="row g-3 mt-1">
      <div class="col-12 col-xl-8">
        <div class="card h-100 shadow-sm">
          <div class="card-header bg-white">
            <div class="d-flex align-items-center gap-2">
              <span class="dot dot-income"></span> Thu nhập
              <span class="dot dot-expense ms-3"></span> Chi phí
              <span class="ms-auto small text-muted">30 ngày qua</span>
            </div>
          </div>
          <div class="card-body min-h-280">
            <div class="row g-3">
              <div class="col-12 col-md-5">
                <div class="small text-muted mb-1">Tổng 30 ngày</div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="text-success">Thu</span>
                  <span class="fw-bold">{{ formatCurrency(incomeTotal) }}</span>
                </div>
                <div class="progress mt-1" style="height:8px">
                  <div class="progress-bar bg-success" role="progressbar" :style="{ width: incomeVsExpenseRate + '%' }"></div>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-2">
                  <span class="text-danger">Chi</span>
                  <span class="fw-bold">{{ formatCurrency(expenseTotal) }}</span>
                </div>
                <div class="progress mt-1" style="height:8px">
                  <div class="progress-bar bg-danger" role="progressbar" :style="{ width: (100 - incomeVsExpenseRate) + '%' }"></div>
                </div>
              </div>
              <div class="col-12 col-md-7">
                <div class="small text-muted mb-1">Chuỗi 30 ngày</div>
                <div class="sparkline">
                  <div v-for="(v, i) in incomeSeries" :key="'inc-'+i" class="bar bar-inc" :style="{ height: Math.max(4, Math.round(v / (maxIncome || 1) * 100)) + '%' }" title="Thu"></div>
                </div>
                <div class="sparkline mt-1">
                  <div v-for="(v, i) in expenseSeries" :key="'exp-'+i" class="bar bar-exp" :style="{ height: Math.max(4, Math.round(v / (maxExpense || 1) * 100)) + '%' }" title="Chi"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer bg-white small text-muted">
            Phân tích dòng tiền
          </div>
        </div>
      </div>

      <div class="col-12 col-xl-4">
        <div class="card h-100 shadow-sm">
          <div class="card-header bg-white">
            Phân phối tài khoản
          </div>
          <div class="card-body min-h-280">
            <div class="small text-muted mb-2">Phân phối theo tài khoản</div>
            <div v-for="(acc, idx) in accountDistribution" :key="idx" class="mb-2">
              <div class="d-flex justify-content-between">
                <div class="text-muted">{{ acc.label }}</div>
                <div class="fw-semibold">{{ formatCurrency(acc.amount) }} ({{ acc.percent }}%)</div>
              </div>
              <div class="progress mt-1" style="height:8px">
                <div class="progress-bar" role="progressbar" :style="{ width: acc.percent + '%', backgroundColor: acc.color }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hàng 3: các widget nhỏ -->
    <div class="row g-3 mt-1">
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card h-100 shadow-sm">
          <div class="card-header bg-white">Giao dịch gần đây</div>
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div class="text-muted">Đang đến</div>
              <div class="fw-bold">{{ recentIncomingCount }}</div>
            </div>
            <div class="d-flex justify-content-between mt-1">
              <div class="text-muted">Đã chi</div>
              <div class="fw-bold">{{ recentSpentCount }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="card h-100 shadow-sm">
          <div class="card-header bg-white">Dòng tiền</div>
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div class="text-muted">{{ cashflowCount }} giao dịch</div>
              <div class="fw-bold">{{ cashflowAmount }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="card h-100 shadow-sm">
          <div class="card-header bg-white d-flex justify-content-between align-items-center">
            <span>Mục tiêu ngân sách</span>
            <span class="badge bg-soft-success text-success">Tỷ lệ thành công hiện tại {{ budgetSuccessRate }}%</span>
          </div>
          <div class="card-body">
            <div class="small text-muted">Mục tiêu đang hoạt động</div>
            <div class="fw-bold">{{ budgetActive }} / {{ budgetTotal }}</div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="card h-100 shadow-sm">
          <div class="card-header bg-white d-flex justify-content-between align-items-center">
            <span>Kế hoạch chi tiêu</span>
            <span class="badge bg-soft-warning text-warning">Tỷ lệ thành công hiện tại {{ planSuccessRate }}%</span>
          </div>
          <div class="card-body">
            <div class="small text-muted">Kế hoạch đang hoạt động</div>
            <div class="fw-bold">{{ planActive }} / {{ planTotal }}</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "DashboardOverview",
  data() {
    return {
      usersCount: 12840,
      newUsersThisMonth: 312,
      transactionsCount: 78542,
      transactionsToday: 129,
      errorAlerts: 14,
      criticalAlerts: 2,
      quickStatValue: '87%',
      quickStatLabel: 'Tỷ lệ hoàn tất',

      // Widget: Giao dịch gần đây
      recentIncomingCount: 26,
      recentSpentCount: 19,

      // Widget: Dòng tiền
      cashflowCount: 45,
      cashflowAmount: '₫ 128,450,000',

      // Widget: Mục tiêu ngân sách
      budgetSuccessRate: 72,
      budgetActive: 5,
      budgetTotal: 7,

      // Widget: Kế hoạch chi tiêu
      planSuccessRate: 64,
      planActive: 7,
      planTotal: 11,

      // Thu/Chi 30 ngày
      incomeSeries: [12_000_000, 8_500_000, 14_200_000, 10_800_000, 9_700_000, 16_400_000, 13_900_000, 11_300_000, 12_800_000, 15_200_000, 9_300_000, 10_100_000, 14_800_000, 12_600_000, 13_200_000, 9_900_000, 15_900_000, 16_200_000, 11_700_000, 10_400_000, 12_400_000, 13_600_000, 9_800_000, 14_100_000, 15_500_000, 12_900_000, 10_700_000, 11_900_000, 16_800_000, 14_300_000],
      expenseSeries: [7_500_000, 6_200_000, 9_100_000, 8_400_000, 7_900_000, 10_700_000, 8_600_000, 7_300_000, 8_900_000, 9_800_000, 6_700_000, 7_800_000, 9_300_000, 8_100_000, 8_900_000, 6_400_000, 10_200_000, 9_600_000, 7_900_000, 6_800_000, 8_200_000, 9_100_000, 6_300_000, 8_700_000, 9_400_000, 7_600_000, 6_900_000, 7_400_000, 10_900_000, 8_800_000],

      // Phân phối tài khoản (giả lập)
      accountDistribution: [
        { label: 'Ví tiền mặt', amount: 18_450_000, percent: 22, color: '#0d6efd' },
        { label: 'Tài khoản ngân hàng', amount: 48_900_000, percent: 58, color: '#20c997' },
        { label: 'Thẻ tín dụng', amount: 9_750_000, percent: 12, color: '#ffc107' },
        { label: 'Ví điện tử', amount: 6_050_000, percent: 8, color: '#6f42c1' },
      ],
    }
  },
  computed: {
    maxIncome() {
      return Math.max(1, ...this.incomeSeries)
    },
    maxExpense() {
      return Math.max(1, ...this.expenseSeries)
    },
    incomeTotal() {
      return this.incomeSeries.reduce((a, b) => a + b, 0)
    },
    expenseTotal() {
      return this.expenseSeries.reduce((a, b) => a + b, 0)
    },
    incomeVsExpenseRate() {
      const total = this.incomeTotal + this.expenseTotal
      if (!total) return 50
      return Math.round((this.incomeTotal / total) * 100)
    }
  },
  methods: {
    formatCurrency(value) {
      try {
        return '₫ ' + Number(value).toLocaleString('vi-VN')
      } catch (e) {
        return '₫ ' + value
      }
    }
  }
}
</script>
<style>
/* Màu badge mềm (nhạt) */
.badge.bg-soft-primary { background-color: rgba(13,110,253,.12); }
.badge.bg-soft-success { background-color: rgba(25,135,84,.12); }
.badge.bg-soft-danger  { background-color: rgba(220,53,69,.12); }
.badge.bg-soft-warning { background-color: rgba(255,193,7,.15); }

/* Chấm chú thích */
.dot{width:.75rem;height:.75rem;border-radius:50%;display:inline-block;}
.dot-income{background:#198754;}
.dot-expense{background:#dc3545;}

/* Ô rỗng */
.min-h-280{min-height:280px;}
.empty{ text-align:center; }
.empty-icon{
  width:64px;height:64px;border-radius:16px;
  background: #f1f3f5; display:flex;align-items:center;justify-content:center;
  font-weight:700; font-size:24px; color:#6c757d; margin:0 auto 8px;
}

/* Nhẹ nhàng hơn một chút cho toàn trang */
.dashboard .card{ border: 1px solid #edf0f3; }
.dashboard .card-header{ border-bottom: 1px solid #f1f2f4; }

/* Sparkline bars */
.sparkline{ display:flex; align-items:flex-end; gap:4px; height:100px; }
.sparkline .bar{ width:8px; border-radius:2px; background:#e9ecef; }
.sparkline .bar-inc{ background:#198754; opacity:.9; }
.sparkline .bar-exp{ background:#dc3545; opacity:.9; }
</style>