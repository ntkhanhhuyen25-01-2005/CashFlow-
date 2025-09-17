<template>
  <div class="card">
    <div class="card-header d-flex align-items-center justify-content-between">
      <h5 class="mb-0">Báo cáo & Phân tích</h5>
    </div>
    <div class="card-body">
      <h6 class="mb-3">Nhắc nhở hóa đơn</h6>
      <div class="row g-2 align-items-end">
        <div class="col-md-3">
          <label class="form-label">Tên hóa đơn</label>
          <input
            class="form-control"
            v-model="billForm.name"
            placeholder="VD: Điện, Nước"
          />
        </div>
        <div class="col-md-2">
          <label class="form-label">Ngày đến hạn</label>
          <input
            class="form-control"
            type="number"
            min="1"
            max="28"
            v-model.number="billForm.dueDay"
          />
        </div>
        <div class="col-md-3">
          <label class="form-label">Số tiền dự kiến (VND)</label>
          <input
            class="form-control"
            type="number"
            min="0"
            step="1000"
            v-model.number="billForm.expected"
          />
        </div>
        <div class="col-md-2">
          <label class="form-label">Nhắc trước (ngày)</label>
          <input
            class="form-control"
            type="number"
            min="0"
            max="10"
            v-model.number="billForm.remindBefore"
          />
        </div>
        <div class="col-md-2">
          <button class="btn btn-success" @click="addBill">Thêm</button>
        </div>
      </div>

      <div class="table-responsive mt-3">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Đến hạn</th>
              <th>Dự kiến</th>
              <th>Trạng thái</th>
              <th class="text-end">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(b, idx) in bills" :key="b.id">
              <td>{{ b.name }}</td>
              <td>Ngày {{ b.dueDay }} hàng tháng</td>
              <td>{{ formatCurrency(b.expected) }}</td>
              <td>
                <span :class="billStatus(b).class">{{
                  billStatus(b).text
                }}</span>
              </td>
              <td class="text-end">
                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="removeBill(idx)"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
            <tr v-if="bills.length === 0">
              <td colspan="5" class="text-center text-muted">
                Chưa có hóa đơn
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr />

      <h6 class="mb-3">Cảnh báo chi tiêu bất thường</h6>
      <div class="row g-2 align-items-end">
        <div class="col-md-3">
          <label class="form-label">Số tháng để tính trung bình</label>
          <input
            class="form-control"
            type="number"
            min="1"
            max="12"
            v-model.number="anomalyConfig.lookbackMonths"
          />
        </div>
        <div class="col-md-3">
          <label class="form-label">Ngưỡng bất thường (x lần trung bình)</label>
          <input
            class="form-control"
            type="number"
            min="1"
            step="0.1"
            v-model.number="anomalyConfig.multiplier"
          />
        </div>
        <div class="col-md-2">
          <button class="btn btn-primary" @click="recomputeAnomalies">
            Tính lại
          </button>
        </div>
      </div>

      <div class="table-responsive mt-3">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>Tháng</th>
              <th>Danh mục</th>
              <th class="text-end">Chi tiêu</th>
              <th class="text-end">Trung bình (nhìn lại)</th>
              <th class="text-end">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in anomalyRows" :key="row.key">
              <td>{{ row.month }}</td>
              <td>{{ row.category }}</td>
              <td class="text-end">{{ formatCurrency(row.spent) }}</td>
              <td class="text-end">{{ formatCurrency(row.avg) }}</td>
              <td class="text-end">
                <span
                  :class="
                    row.spent > row.avg * anomalyConfig.multiplier
                      ? 'badge bg-danger'
                      : 'badge bg-success'
                  "
                >
                  {{
                    row.spent > row.avg * anomalyConfig.multiplier
                      ? "Bất thường"
                      : "Bình thường"
                  }}
                </span>
              </td>
            </tr>
            <tr v-if="anomalyRows.length === 0">
              <td colspan="5" class="text-center text-muted">
                Không có dữ liệu
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClientBaoCaoPhanTich",
  data() {
    return {
      bills: [],
      billForm: { name: "", dueDay: 1, expected: 0, remindBefore: 3 },
      anomalyConfig: { lookbackMonths: 3, multiplier: 1.5 },
      transactions: [],
      anomalyRows: [],
    };
  },
  mounted() {
    this.loadBills();
    this.loadTransactions();
    this.recomputeAnomalies();
  },
  methods: {
    // Bills
    addBill() {
      if (!this.billForm.name || !this.billForm.dueDay) return;
      this.bills.push({ id: Date.now(), ...this.billForm });
      this.billForm = { name: "", dueDay: 1, expected: 0, remindBefore: 3 };
      this.saveBills();
    },
    removeBill(idx) {
      this.bills.splice(idx, 1);
      this.saveBills();
    },
    billStatus(b) {
      const now = new Date();
      const due = new Date(now.getFullYear(), now.getMonth(), b.dueDay);
      const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
      if (diffDays < 0)
        return { class: "badge bg-secondary", text: "Đã qua hạn tháng này" };
      if (diffDays <= b.remindBefore)
        return {
          class: "badge bg-warning text-dark",
          text: `Sắp đến hạn (${diffDays} ngày)`,
        };
      return { class: "badge bg-success", text: "Bình thường" };
    },
    saveBills() {
      localStorage.setItem("cf_bills", JSON.stringify(this.bills));
    },
    loadBills() {
      const raw = localStorage.getItem("cf_bills");
      this.bills = raw ? JSON.parse(raw) : [];
    },

    // Anomaly detection
    loadTransactions() {
      const raw = localStorage.getItem("cf_transactions");
      this.transactions = raw ? JSON.parse(raw) : [];
    },
    recomputeAnomalies() {
      // Build monthly category spend
      const map = new Map(); // key: yyyy-mm|category -> amount
      this.transactions.forEach((t) => {
        if (t.type !== "expense") return;
        const d = new Date(t.date);
        const keyMonth = `${d.getFullYear()}-${String(
          d.getMonth() + 1
        ).padStart(2, "0")}`;
        const key = `${keyMonth}|${t.category || "Khác"}`;
        map.set(key, (map.get(key) || 0) + (Number(t.amount) || 0));
      });

      // Get list of months sorted asc
      const months = Array.from(
        new Set(Array.from(map.keys()).map((k) => k.split("|")[0]))
      ).sort();
      const categories = Array.from(
        new Set(Array.from(map.keys()).map((k) => k.split("|")[1]))
      ).sort();

      const rows = [];
      months.forEach((m, idx) => {
        categories.forEach((cat) => {
          const spent = map.get(`${m}|${cat}`) || 0;
          // average of previous N months
          const lookback = this.anomalyConfig.lookbackMonths;
          const prevMonths = months.slice(Math.max(0, idx - lookback), idx);
          const avg = prevMonths.length
            ? prevMonths.reduce(
                (sum, pm) => sum + (map.get(`${pm}|${cat}`) || 0),
                0
              ) / prevMonths.length
            : 0;
          rows.push({
            key: `${m}|${cat}`,
            month: m,
            category: cat,
            spent,
            avg,
          });
        });
      });
      this.anomalyRows = rows;
    },

    formatCurrency(v) {
      return (Number(v) || 0).toLocaleString("vi-VN");
    },
  },
};
</script>

<style>
.badge {
  font-size: 0.85rem;
}
</style>
