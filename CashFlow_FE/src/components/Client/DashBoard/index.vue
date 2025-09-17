<template>
  <div class="container-fluid py-3 fund-dashboard">
    <!-- breadcrumb -->
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb mb-0">
        <li class="breadcrumb-item"><a href="#">Trang chủ</a></li>
        <li class="breadcrumb-item"><a href="#">Tổng quan</a></li>
        <li class="breadcrumb-item active" aria-current="page">Quỹ chi tiêu</li>
      </ol>
    </nav>

    <div class="row g-3">
      <!-- Cột trái -->
      <div class="col-12 col-lg-4">
        <!-- Tóm tắt giao dịch gần đây -->
        <div class="card shadow-sm mb-3">
          <div class="card-header bg-white fw-semibold">Tóm tắt các giao dịch gần đây</div>
          <div class="card-body d-flex align-items-center justify-content-center min-h-200">
            <div class="empty">
              <div class="empty-icon">?</div>
              <div class="text-muted small">Không có giao dịch nào khả dụng tại thời điểm này</div>
            </div>
          </div>
        </div>

        <!-- Tóm tắt số dư (Donut) -->
        <div class="card shadow-sm">
          <div class="card-header bg-white fw-semibold">Tóm tắt số dư</div>
          <div class="card-body">
            <div class="d-flex align-items-center gap-3">
              <div class="donut" :style="donutStyle" role="img" aria-label="Tỷ trọng số dư"></div>
              <div>
                <div class="d-flex align-items-center gap-2">
                  <span class="legend" :style="{ background: primaryColor }"></span>
                  <div>
                    <div class="fw-semibold">Personal</div>
                    <div class="small text-muted">{{ percent }}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cột phải -->
      <div class="col-12 col-lg-8">
        <!-- 3 thẻ tóm tắt -->
        <div class="row g-3 mb-3">
          <div class="col-12 col-md-4">
            <div class="summary-card sc-blue">
              <div class="sc-icon">🐷</div>
              <div class="sc-title">Tóm tắt tổng số dư</div>
              <div class="sc-value">0 đ</div>
              <div class="sc-sub">2.5% so với tháng trước</div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="summary-card sc-green">
              <div class="sc-icon">⬇️</div>
              <div class="sc-title">Tóm tắt giao dịch đến</div>
              <div class="sc-value">0 đ</div>
              <div class="sc-sub">2.5% so với ngày hôm qua</div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="summary-card sc-pink">
              <div class="sc-icon">⬆️</div>
              <div class="sc-title">Tóm tắt giao dịch chi phí</div>
              <div class="sc-value">0 đ</div>
              <div class="sc-sub">2.5% so với tháng trước</div>
            </div>
          </div>
        </div>

        <!-- Bảng danh sách quỹ -->
        <div class="card shadow-sm">
          <div class="card-body pb-0">
            <div class="d-flex flex-wrap gap-2 align-items-center mb-3">
              <input v-model.trim="keyword" type="text" class="form-control w-auto flex-grow-1" placeholder="Lọc">
              <div class="ms-auto d-flex gap-2">
                <div class="dropdown">
                  <button class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">Xem</button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Tất cả</a></li>
                    <li><a class="dropdown-item" href="#">Đang hoạt động</a></li>
                    <li><a class="dropdown-item" href="#">Đã đóng</a></li>
                  </ul>
                </div>
                <button class="btn btn-primary">Tạo mới +</button>
              </div>
            </div>

            <div class="table-responsive">
              <table class="table align-middle">
                <thead class="table-light">
                  <tr>
                    <th style="width:36px"><input type="checkbox" disabled></th>
                    <th>Tên</th>
                    <th class="text-nowrap">Trạng thái</th>
                    <th class="text-nowrap">Số tiền hiện tại</th>
                    <th class="text-nowrap">Người sở hữu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="paged.length === 0">
                    <td colspan="5" class="text-center text-muted py-5">Không có dữ liệu</td>
                  </tr>
                  <tr v-for="row in paged" :key="row.id">
                    <td><input type="checkbox" disabled></td>
                    <td class="text-primary fw-semibold">{{ row.name }}</td>
                    <td>
                      <span class="badge bg-success-subtle text-success">tích cực</span>
                    </td>
                    <td>0 đ</td>
                    <td>{{ row.owner }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="card-footer bg-white d-flex flex-wrap gap-2 align-items-center justify-content-between">
            <div class="small text-muted">Đã chọn 0 trong số {{ filtered.length }} hàng.</div>
            <div class="d-flex align-items-center gap-2">
              <label class="small text-muted">Số hàng trên mỗi trang</label>
              <select v-model.number="pageSize" class="form-select form-select-sm w-auto">
                <option :value="15">15</option>
                <option :value="25">25</option>
                <option :value="50">50</option>
              </select>
              <div class="small ms-2 text-muted">Trang {{ page }}/{{ totalPages || 1 }}</div>
              <ul class="pagination pagination-sm mb-0 ms-2">
                <li class="page-item" :class="{ disabled: page===1 }">
                  <button class="page-link" @click="page=1">«</button>
                </li>
                <li class="page-item" :class="{ disabled: page===1 }">
                  <button class="page-link" @click="page--">‹</button>
                </li>
                <li class="page-item" :class="{ disabled: page===totalPages }">
                  <button class="page-link" @click="page++">›</button>
                </li>
                <li class="page-item" :class="{ disabled: page===totalPages }">
                  <button class="page-link" @click="page=totalPages">»</button>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SpendingFund",
  data() {
    return {
      // dữ liệu mẫu
      funds: [
        { id: 1, name: 'Riêng tư', owner: 'Khánh Huyền' }
      ],
      keyword: '',
      page: 1,
      pageSize: 15,
      // donut demo: 100% personal
      percent: 100,
      primaryColor: '#5b6ef5'
    }
  },
  computed: {
    filtered() {
      const q = this.keyword.toLowerCase();
      return this.funds.filter(f => !q || f.name.toLowerCase().includes(q) || f.owner.toLowerCase().includes(q));
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.filtered.length / this.pageSize));
    },
    paged() {
      const start = (this.page - 1) * this.pageSize;
      return this.filtered.slice(start, start + this.pageSize);
    },
    donutStyle() {
      // donut bằng conic-gradient
      const p = Math.max(0, Math.min(100, this.percent));
      return {
        background: `conic-gradient(${this.primaryColor} 0 ${p}%, #e9ecef ${p}% 100%)`
      };
    }
  },
  watch: {
    pageSize() { this.page = 1; },
    keyword() { this.page = 1; }
  }
}
</script>

<style>
.fund-dashboard .breadcrumb .breadcrumb-item + .breadcrumb-item::before { content: ">"; }
.min-h-200{ min-height:200px; }
.empty{ text-align:center; }
.empty-icon{
  width:64px;height:64px;border-radius:16px;
  background:#f1f3f5;display:flex;align-items:center;justify-content:center;
  font-weight:700;font-size:24px;color:#6c757d;margin:0 auto 6px;
}

/* badge subtle */
.bg-success-subtle { background: rgba(25,135,84,.12) !important; }

/* Summary cards */
.summary-card{
  position:relative;border-radius:14px;color:#fff;padding:16px;overflow:hidden;min-height:120px;
  display:flex;flex-direction:column;gap:6px;box-shadow:0 8px 20px rgba(0,0,0,.06);
}
.summary-card .sc-icon{ font-size:22px; opacity:.95; }
.summary-card .sc-title{ opacity:.95; }
.summary-card .sc-value{ font-size:28px; font-weight:800; line-height:1; }
.summary-card .sc-sub{ font-size:.85rem; opacity:.9; }

/* màu gradient gần giống ảnh */
.sc-blue { background: linear-gradient(135deg, #5b6ef5, #6bbcff); }
.sc-green{ background: linear-gradient(135deg, #22c55e, #6ee7b7); }
.sc-pink { background: linear-gradient(135deg, #ff5aa5, #ff8fb2); }

/* donut đơn giản */
.donut{
  width:140px;height:140px;border-radius:50%;
  position:relative;flex:0 0 140px;
}
.donut::after{
  content:"";position:absolute;inset:16px;border-radius:50%;background:#fff;
}

/* legend */
.legend{ width:12px;height:12px;border-radius:3px;display:inline-block; }

/* bảng */
.table td, .table th{ vertical-align: middle; }
@media (max-width: 576px){
  .donut{ width:110px; height:110px; flex-basis:110px; }
}
</style>
