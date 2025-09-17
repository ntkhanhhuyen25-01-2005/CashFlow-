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
            <label class="form-label mb-1">Loại báo cáo</label>
            <select class="form-select" v-model="filters.kind">
              <option value="overview">Tổng quan</option>
              <option value="usage">Tần suất sử dụng</option>
              <option value="errors">Lỗi phát sinh</option>
            </select>
          </div>
          <div class="ms-auto d-flex gap-2">
            <button class="btn btn-primary" :disabled="loading" @click="generateReport">
              <i class="bx bx-bar-chart me-1"></i>{{ loading ? 'Đang tạo...' : 'Tạo báo cáo' }}
            </button>
            <button class="btn btn-outline-secondary" :disabled="rows.length===0" @click="exportCSV">
              <i class="bx bx-export me-1"></i>Xuất Excel (CSV)
            </button>
            <button class="btn btn-outline-dark" :disabled="rows.length===0" @click="printPDF">
              <i class="bx bx-printer me-1"></i>In ra PDF
            </button>
          </div>
        </div>
      </div>

      <div class="card-body" id="reportArea">
        <div class="row g-3">
          <div class="col-12 col-md-4">
            <div class="p-3 border rounded h-100">
              <div class="text-muted">Người dùng</div>
              <div class="fs-4 fw-bold">{{ report.users }}</div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="p-3 border rounded h-100">
              <div class="text-muted">Tần suất sử dụng</div>
              <div class="fs-4 fw-bold">{{ report.usage }}</div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="p-3 border rounded h-100">
              <div class="text-muted">Lỗi phát sinh</div>
              <div class="fs-4 fw-bold">{{ report.errors }}</div>
            </div>
          </div>
        </div>

        <div class="table-responsive mt-3">
          <table class="table align-middle">
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Người dùng mới</th>
                <th>Hoạt động (lần)</th>
                <th>Lỗi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="rows.length === 0">
                <td colspan="4" class="text-center text-muted py-4">Chưa có dữ liệu</td>
              </tr>
              <tr v-for="r in rows" :key="r.date">
                <td>{{ formatDate(r.date) }}</td>
                <td>{{ r.newUsers }}</td>
                <td>{{ r.activities }}</td>
                <td>{{ r.errors }}</td>
              </tr>
            </tbody>
            <tfoot v-if="rows.length">
              <tr>
                <th class="text-end" colspan="1">Tổng</th>
                <th>{{ report.users }}</th>
                <th>{{ report.usage }}</th>
                <th>{{ report.errors }}</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminBaoCao",
  data() {
    return {
      filters: {
        fromDate: "",
        toDate: "",
        kind: "overview",
      },
      report: {
        users: 0,
        usage: 0,
        errors: 0,
      },
      rows: [],
      loading: false,
    }
  },
  methods: {
    generateReport() {
      this.loading = true;
      // Mock dữ liệu; thay bằng API thực tế
      // Thiết lập mặc định: 7 ngày gần nhất nếu người dùng chưa chọn
      const today = new Date();
      const defaultEnd = this.formatYmd(today);
      const defaultStart = this.formatYmd(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6));

      let start = this.filters.fromDate || defaultStart;
      let end = this.filters.toDate || defaultEnd;

      // Nếu phạm vi ngày không hợp lệ thì hoán đổi
      if (new Date(start) > new Date(end)) {
        const temp = start;
        start = end;
        end = temp;
      }

      const startDateObj = new Date(start);
      const endDateObj = new Date(end);
      if (isNaN(startDateObj) || isNaN(endDateObj)) {
        this.loading = false;
        alert('Ngày không hợp lệ. Vui lòng chọn lại.');
        return;
      }

      // Giới hạn tối đa 31 ngày để tránh bảng quá dài
      const days = this.enumerateDays(start, end).slice(0, 31);

      // Mô phỏng delay tạo báo cáo (UX)
      setTimeout(() => {
        this.rows = days.map(d => ({
          date: d,
          newUsers: Math.floor(Math.random() * 20),
          activities: Math.floor(Math.random() * 200),
          errors: Math.floor(Math.random() * 10),
        }));

        this.report.users = this.rows.reduce((s, r) => s + r.newUsers, 0);
        this.report.usage = this.rows.reduce((s, r) => s + r.activities, 0);
        this.report.errors = this.rows.reduce((s, r) => s + r.errors, 0);
        this.loading = false;
      }, 300);
    },
    exportCSV() {
      const headers = ["Ngày", "Người dùng mới", "Hoạt động (lần)", "Lỗi"];
      const lines = this.rows.map(r => [this.formatDate(r.date), r.newUsers, r.activities, r.errors].join(","));
      const csv = [headers.join(","), ...lines].join("\n");
      const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `baocao_${Date.now()}.csv`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    printPDF() {
      const reportEl = document.getElementById('reportArea');
      if (!reportEl) return;
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;

      const headHtml = document.head ? document.head.innerHTML : '';
      printWindow.document.open();
      printWindow.document.write(`<!doctype html><html><head>${headHtml}</head><body>${reportEl.outerHTML}</body></html>`);
      printWindow.document.close();

      // Đợi tài nguyên tải xong rồi mới in để tránh trang trắng trên 1 số trình duyệt
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      };

      // Fallback nếu onload không kích hoạt
      setTimeout(() => {
        try {
          printWindow.focus();
          printWindow.print();
          printWindow.close();
        } catch (_) {}
      }, 500);
    },
    enumerateDays(start, end) {
      const result = [];
      let cur = new Date(start);
      const endDate = new Date(end);
      while (cur <= endDate) {
        const y = cur.getFullYear();
        const m = String(cur.getMonth() + 1).padStart(2, '0');
        const d = String(cur.getDate()).padStart(2, '0');
        result.push(`${y}-${m}-${d}`);
        cur.setDate(cur.getDate() + 1);
      }
      if (result.length === 0) result.push(start);
      return result;
    },
    formatYmd(dateObj) {
      const y = dateObj.getFullYear();
      const m = String(dateObj.getMonth() + 1).padStart(2, '0');
      const d = String(dateObj.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    },
    formatDate(str) {
      const [y, m, d] = str.split("-");
      return `${d}/${m}/${y}`;
    },
  },
  mounted() {
    this.generateReport();
  }
}
</script>

<style>
.badge.bg-soft-primary { background-color: rgba(13,110,253,.12); }
.badge.bg-soft-success { background-color: rgba(25,135,84,.12); }
.badge.bg-soft-danger  { background-color: rgba(220,53,69,.12); }
.badge.bg-soft-warning { background-color: rgba(255,193,7,.15); }
</style>

