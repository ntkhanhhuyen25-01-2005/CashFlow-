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
          <div class="card-body d-flex justify-content-center align-items-center min-h-280">
            <div class="empty">
              <div class="empty-icon">?</div>
              <div class="text-muted">Không có dữ liệu sẵn</div>
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
          <div class="card-body d-flex justify-content-center align-items-center min-h-280">
            <div class="empty">
              <div class="empty-icon">?</div>
              <div class="text-muted">Không có dữ liệu có sẵn</div>
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
              <div class="fw-bold">0</div>
            </div>
            <div class="d-flex justify-content-between mt-1">
              <div class="text-muted">Đã chi</div>
              <div class="fw-bold">0</div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="card h-100 shadow-sm">
          <div class="card-header bg-white">Dòng tiền</div>
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div class="text-muted">0 giao dịch</div>
              <div class="fw-bold">0</div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="card h-100 shadow-sm">
          <div class="card-header bg-white d-flex justify-content-between align-items-center">
            <span>Mục tiêu ngân sách</span>
            <span class="badge bg-soft-success text-success">Tỷ lệ thành công hiện tại 0%</span>
          </div>
          <div class="card-body">
            <div class="small text-muted">Mục tiêu đang hoạt động</div>
            <div class="fw-bold">0 / 0</div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="card h-100 shadow-sm">
          <div class="card-header bg-white d-flex justify-content-between align-items-center">
            <span>Kế hoạch chi tiêu</span>
            <span class="badge bg-soft-warning text-warning">Tỷ lệ thành công hiện tại 0%</span>
          </div>
          <div class="card-body">
            <div class="small text-muted">Kế hoạch đang hoạt động</div>
            <div class="fw-bold">0 / 0</div>
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
      usersCount: 0,
      newUsersThisMonth: 0,
      transactionsCount: 0,
      transactionsToday: 0,
      errorAlerts: 0,
      criticalAlerts: 0,
      quickStatValue: '0%',
      quickStatLabel: 'Tỷ lệ hoàn tất',
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
</style>