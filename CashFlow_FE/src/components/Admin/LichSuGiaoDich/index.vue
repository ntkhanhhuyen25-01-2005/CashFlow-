<template>
    <div class="container-fluid py-3">
      <div class="card shadow-sm">
        <div class="card-header bg-white">
          <div class="d-flex flex-wrap gap-2 align-items-end">
            <div>
              <label class="form-label mb-1">Từ ngày</label>
              <input type="date" class="form-control" v-model="filters.fromDate" />
            </div>
            <div>
              <label class="form-label mb-1">Đến ngày</label>
              <input type="date" class="form-control" v-model="filters.toDate" />
            </div>
            <div>
              <label class="form-label mb-1">Loại giao dịch</label>
              <select class="form-select" v-model="filters.type">
                <option value="">Tất cả</option>
                <option value="income">Thu nhập</option>
                <option value="expense">Chi phí</option>
                <option value="transfer">Chuyển khoản</option>
              </select>
            </div>
            <div>
              <label class="form-label mb-1">Trạng thái</label>
              <select class="form-select" v-model="filters.status">
                <option value="">Tất cả</option>
                <option value="success">Thành công</option>
                <option value="pending">Đang xử lý</option>
                <option value="failed">Thất bại</option>
              </select>
            </div>
            <div class="ms-auto d-flex gap-2">
              <button class="btn btn-primary" @click="applyFilters">
                <i class="bx bx-filter-alt me-1"></i>Lọc
              </button>
              <button class="btn btn-outline-secondary" @click="resetFilters">
                <i class="bx bx-reset me-1"></i>Đặt lại
              </button>
            </div>
          </div>
        </div>
  
        <div class="card-body">
          <div class="table-responsive">
            <table class="table align-middle">
              <thead>
                <tr>
                  <th>Ngày</th>
                  <th>Loại</th>
                  <th>Trạng thái</th>
                  <th class="text-end">Số giao dịch</th>
                  <th class="text-end">Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="filteredAggregates.length === 0">
                  <td colspan="5" class="text-center text-muted py-4">Không có dữ liệu</td>
                </tr>
                <tr v-for="row in pagedAggregates" :key="row.id">
                  <td>{{ formatDate(row.date) }}</td>
                  <td>
                    <span :class="['badge', typeBadge(row.type)]">{{ typeLabel(row.type) }}</span>
                  </td>
                  <td>
                    <span :class="['badge', statusBadge(row.status)]">{{ statusLabel(row.status) }}</span>
                  </td>
                  <td class="text-end fw-semibold">{{ row.count }}</td>
                  <td class="text-end fw-semibold">{{ formatCurrency(row.amount) }}</td>
                </tr>
              </tbody>
              <tfoot v-if="filteredAggregates.length">
                <tr>
                  <th colspan="3" class="text-end">Tổng</th>
                  <th class="text-end">{{ totalCount }}</th>
                  <th class="text-end">{{ formatCurrency(totalAmount) }}</th>
                </tr>
              </tfoot>
            </table>
          </div>
  
          <div class="d-flex justify-content-between align-items-center mt-2">
            <div class="text-muted small">
              Hiển thị {{ startItem }}–{{ endItem }} / {{ filteredAggregates.length }}
            </div>
            <div class="btn-group">
              <button class="btn btn-outline-secondary btn-sm" :disabled="page===1" @click="page--">Trước</button>
              <button class="btn btn-outline-secondary btn-sm" :disabled="page===totalPages || totalPages===0" @click="page++">Sau</button>
            </div>
          </div>
        </div>
      </div>
  
      <div class="alert alert-info mt-3 mb-0">
        Chỉ hiển thị dữ liệu tổng hợp (ngày, loại, trạng thái, số lượng, tổng tiền). Không chứa thông tin cá nhân nhạy cảm.
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AdminLichSuGiaoDich",
    data() {
      return {
        filters: { fromDate: "", toDate: "", type: "", status: "" },
        appliedFilters: { fromDate: "", toDate: "", type: "", status: "" },
        // Dữ liệu tổng hợp ví dụ (không có thông tin cá nhân)
        aggregates: [
          { id: 1, date: "2025-09-01", type: "income",   status: "success", count: 12, amount: 12500000 },
          { id: 2, date: "2025-09-01", type: "expense",  status: "success", count: 5,  amount: 3500000  },
          { id: 3, date: "2025-09-02", type: "income",   status: "pending", count: 2,  amount: 900000   },
          { id: 4, date: "2025-09-02", type: "transfer", status: "success", count: 7,  amount: 7000000  },
          { id: 5, date: "2025-09-03", type: "expense",  status: "failed",  count: 1,  amount: 150000   },
          { id: 6, date: "2025-09-03", type: "income",   status: "success", count: 9,  amount: 8200000  },
        ],
        page: 1,
        pageSize: 8,
      }
    },
    computed: {
      filteredAggregates() {
        const f = this.appliedFilters;
        return this.aggregates.filter((r) => {
          if (f.fromDate && r.date < f.fromDate) return false;
          if (f.toDate && r.date > f.toDate) return false;
          if (f.type && r.type !== f.type) return false;
          if (f.status && r.status !== f.status) return false;
          return true;
        });
      },
      totalPages() {
        return Math.ceil(this.filteredAggregates.length / this.pageSize);
      },
      pagedAggregates() {
        const start = (this.page - 1) * this.pageSize;
        return this.filteredAggregates.slice(start, start + this.pageSize);
      },
      totalCount() {
        return this.filteredAggregates.reduce((s, r) => s + r.count, 0);
      },
      totalAmount() {
        return this.filteredAggregates.reduce((s, r) => s + r.amount, 0);
      },
      startItem() {
        if (!this.filteredAggregates.length) return 0;
        return (this.page - 1) * this.pageSize + 1;
      },
      endItem() {
        return Math.min(this.page * this.pageSize, this.filteredAggregates.length);
      },
    },
    methods: {
      applyFilters() {
        this.appliedFilters = { ...this.filters };
        this.page = 1;
      },
      resetFilters() {
        this.filters = { fromDate: "", toDate: "", type: "", status: "" };
        this.applyFilters();
      },
      formatCurrency(v) {
        return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(v || 0);
      },
      formatDate(str) {
        const [y, m, d] = str.split("-");
        return `${d}/${m}/${y}`;
      },
      typeLabel(t) {
        return t === "income" ? "Thu nhập" : t === "expense" ? "Chi phí" : "Chuyển khoản";
      },
      statusLabel(s) {
        return s === "success" ? "Thành công" : s === "pending" ? "Đang xử lý" : "Thất bại";
      },
      typeBadge(t) {
        return t === "income" ? "bg-soft-success text-success" : t === "expense" ? "bg-soft-danger text-danger" : "bg-soft-primary text-primary";
      },
      statusBadge(s) {
        return s === "success" ? "bg-soft-success text-success" : s === "pending" ? "bg-soft-warning text-warning" : "bg-soft-danger text-danger";
      },
    },
    mounted() {
      this.applyFilters();
    },
  };
  </script>
  
  <style>
  .badge.bg-soft-primary { background-color: rgba(13,110,253,.12); }
  .badge.bg-soft-success { background-color: rgba(25,135,84,.12); }
  .badge.bg-soft-danger  { background-color: rgba(220,53,69,.12); }
  .badge.bg-soft-warning { background-color: rgba(255,193,7,.15); }
  </style>