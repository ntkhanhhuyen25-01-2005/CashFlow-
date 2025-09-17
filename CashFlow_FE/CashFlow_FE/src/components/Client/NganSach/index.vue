<template>
  <div class="card">
    <div class="card-header d-flex align-items-center justify-content-between">
      <h5 class="mb-0">Quản lí ngân sách</h5>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary" @click="loadState">
          Tải lại
        </button>
        <button class="btn btn-primary" @click="saveState">Lưu</button>
      </div>
    </div>
    <div class="card-body">
      <div class="row g-3 align-items-end">
        <div class="col-md-3">
          <label class="form-label">Tháng</label>
          <input
            class="form-control"
            type="month"
            v-model="monthKey"
            @change="recalc"
          />
        </div>
        <div class="col-md-3">
          <label class="form-label">Danh mục</label>
          <select class="form-select" v-model="form.category">
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
        <div class="col-md-3">
          <label class="form-label">Ngân sách (VND)</label>
          <input
            class="form-control"
            type="number"
            min="0"
            step="1000"
            v-model.number="form.amount"
          />
        </div>
        <div class="col-md-3">
          <button class="btn btn-success" @click="addOrUpdateBudget">
            {{ editIndex === null ? "Thêm ngân sách" : "Cập nhật" }}
          </button>
          <button
            v-if="editIndex !== null"
            class="btn btn-outline-secondary ms-2"
            @click="resetForm"
          >
            Hủy
          </button>
        </div>
      </div>

      <hr />

      <div class="table-responsive">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>Danh mục</th>
              <th class="text-end">Ngân sách</th>
              <th class="text-end">Đã chi (tháng)</th>
              <th class="text-end">Còn lại</th>
              <th class="text-end">Trạng thái</th>
              <th class="text-end">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in tableRows" :key="row.category">
              <td>{{ row.category }}</td>
              <td class="text-end">{{ formatCurrency(row.budget) }}</td>
              <td class="text-end">{{ formatCurrency(row.spent) }}</td>
              <td class="text-end">{{ formatCurrency(row.remaining) }}</td>
              <td class="text-end">
                <span :class="statusClass(row)">{{ statusText(row) }}</span>
              </td>
              <td class="text-end">
                <button
                  class="btn btn-sm btn-outline-primary me-1"
                  @click="onEdit(idx)"
                >
                  <i class="fa-solid fa-pen"></i>
                </button>
                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="onDelete(idx)"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
            <tr v-if="tableRows.length === 0">
              <td colspan="6" class="text-center text-muted">
                Chưa có ngân sách cho tháng này
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="alert mt-3"
        :class="overBudgetAlert.class"
        v-if="overBudgetAlert.text"
      >
        {{ overBudgetAlert.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClientNganSach",
  data() {
    return {
      budgetsByMonth: {},
      monthKey: this.getMonthKey(new Date()),
      form: { category: "", amount: 0 },
      editIndex: null,
      categories: [
        "Ăn uống",
        "Di chuyển",
        "Hóa đơn",
        "Giáo dục",
        "Giải trí",
        "Khác",
      ],
      transactions: [],
    };
  },
  computed: {
    tableRows() {
      const monthBudgets = this.budgetsByMonth[this.monthKey] || [];
      const spendMap = this.aggregateMonthlySpend(this.monthKey);
      return monthBudgets.map((b) => {
        const spent = spendMap[b.category] || 0;
        return {
          category: b.category,
          budget: Number(b.amount) || 0,
          spent,
          remaining: (Number(b.amount) || 0) - spent,
        };
      });
    },
    overBudgetAlert() {
      const over = this.tableRows.filter((r) => r.remaining < 0);
      if (!over.length) return { class: "", text: "" };
      const names = over
        .map((r) => `${r.category} (${this.formatCurrency(-r.remaining)})`)
        .join(", ");
      return { class: "alert-danger", text: `Vượt ngân sách ở: ${names}` };
    },
  },
  mounted() {
    this.tryLoadCategoriesFromProfile();
    this.loadState();
    this.loadTransactions();
  },
  methods: {
    getMonthKey(date) {
      const d = new Date(date);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      return `${y}-${m}`;
    },
    recalc() {
      // triggers computed to recompute
    },
    resetForm() {
      this.editIndex = null;
      this.form = { category: this.categories[0] || "Khác", amount: 0 };
    },
    addOrUpdateBudget() {
      if (!this.budgetsByMonth[this.monthKey])
        this.$set
          ? this.$set(this.budgetsByMonth, this.monthKey, [])
          : (this.budgetsByMonth[this.monthKey] = []);
      const list = this.budgetsByMonth[this.monthKey];
      const payload = {
        category: this.form.category || this.categories[0] || "Khác",
        amount: Number(this.form.amount) || 0,
      };
      if (this.editIndex === null) {
        const existingIndex = list.findIndex(
          (x) => x.category === payload.category
        );
        if (existingIndex !== -1) list[existingIndex].amount = payload.amount;
        else list.push(payload);
      } else {
        this.$set
          ? this.$set(list, this.editIndex, payload)
          : (list[this.editIndex] = payload);
      }
      this.resetForm();
      this.saveState();
    },
    onEdit(idx) {
      const list = this.budgetsByMonth[this.monthKey] || [];
      const row = list[idx];
      if (!row) return;
      this.editIndex = idx;
      this.form = { category: row.category, amount: row.amount };
    },
    onDelete(idx) {
      const list = this.budgetsByMonth[this.monthKey] || [];
      list.splice(idx, 1);
      this.saveState();
    },
    statusClass(row) {
      const ratio = row.budget <= 0 ? 1 : row.spent / row.budget;
      if (ratio >= 1) return "badge bg-danger";
      if (ratio >= 0.8) return "badge bg-warning text-dark";
      return "badge bg-success";
    },
    statusText(row) {
      const ratio = row.budget <= 0 ? 1 : row.spent / row.budget;
      if (ratio >= 1) return "Vượt";
      if (ratio >= 0.8) return ">= 80%";
      return "Ổn";
    },
    aggregateMonthlySpend(monthKey) {
      const [y, m] = monthKey.split("-").map((x) => Number(x));
      const spentByCat = {};
      this.transactions.forEach((t) => {
        if (t.type !== "expense") return;
        const d = new Date(t.date);
        if (d.getFullYear() === y && d.getMonth() + 1 === m) {
          const key = t.category || "Khác";
          spentByCat[key] = (spentByCat[key] || 0) + (Number(t.amount) || 0);
        }
      });
      return spentByCat;
    },
    loadTransactions() {
      const raw = localStorage.getItem("cf_transactions");
      this.transactions = raw ? JSON.parse(raw) : [];
    },
    saveState() {
      localStorage.setItem(
        "cf_budgets_by_month",
        JSON.stringify(this.budgetsByMonth)
      );
    },
    loadState() {
      const raw = localStorage.getItem("cf_budgets_by_month");
      this.budgetsByMonth = raw ? JSON.parse(raw) : {};
      if (!this.form.category)
        this.form.category = this.categories[0] || "Khác";
    },
    tryLoadCategoriesFromProfile() {
      try {
        const raw = localStorage.getItem("cf_profile_state");
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.categories) && parsed.categories.length) {
          this.categories = parsed.categories.slice();
        }
      } catch (e) {}
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
