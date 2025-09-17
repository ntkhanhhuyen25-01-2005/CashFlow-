<template>
  <div class="card">
    <div class="card-header d-flex align-items-center justify-content-between">
      <h5 class="mb-0">Giao dịch</h5>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary" @click="loadTransactions">
          Tải lại
        </button>
        <button class="btn btn-primary" @click="saveTransactions">Lưu</button>
      </div>
    </div>
    <div class="card-body">
      <!-- Add Transaction Form -->
      <div class="row g-2 align-items-end">
        <div class="col-md-2">
          <label class="form-label">Loại</label>
          <select class="form-select" v-model="form.type">
            <option value="expense">Chi tiêu</option>
            <option value="income">Thu nhập</option>
          </select>
        </div>
        <div class="col-md-2">
          <label class="form-label">Ngày</label>
          <input class="form-control" type="date" v-model="form.date" />
        </div>
        <div class="col-md-3">
          <label class="form-label">Danh mục</label>
          <select class="form-select" v-model="form.category">
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
        <div class="col-md-3">
          <label class="form-label">Ghi chú</label>
          <input class="form-control" v-model="form.note" placeholder="Mô tả" />
        </div>
        <div class="col-md-2">
          <label class="form-label">Số tiền (VND)</label>
          <input
            class="form-control"
            type="number"
            min="0"
            step="1000"
            v-model.number="form.amount"
          />
        </div>
        <div class="col-12">
          <button class="btn btn-success" @click="onSubmit">
            {{ editIndex === null ? "Thêm" : "Cập nhật" }}
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

      <!-- Filters -->
      <div class="row g-2">
        <div class="col-md-3">
          <label class="form-label">Tìm kiếm</label>
          <input
            class="form-control"
            v-model="filters.search"
            placeholder="Từ khóa ghi chú"
          />
        </div>
        <div class="col-md-2">
          <label class="form-label">Loại</label>
          <select class="form-select" v-model="filters.type">
            <option value="">Tất cả</option>
            <option value="expense">Chi tiêu</option>
            <option value="income">Thu nhập</option>
          </select>
        </div>
        <div class="col-md-3">
          <label class="form-label">Danh mục</label>
          <select class="form-select" v-model="filters.category">
            <option value="">Tất cả</option>
            <option v-for="c in categories" :key="'f-' + c" :value="c">
              {{ c }}
            </option>
          </select>
        </div>
        <div class="col-md-2">
          <label class="form-label">Từ ngày</label>
          <input class="form-control" type="date" v-model="filters.from" />
        </div>
        <div class="col-md-2">
          <label class="form-label">Đến ngày</label>
          <input class="form-control" type="date" v-model="filters.to" />
        </div>
      </div>

      <div class="d-flex justify-content-between align-items-center mt-3">
        <div>
          <span class="badge bg-danger me-2"
            >Chi: {{ formatCurrency(summary.expense) }}</span
          >
          <span class="badge bg-success"
            >Thu: {{ formatCurrency(summary.income) }}</span
          >
        </div>
        <div class="fw-bold">
          Cân đối: {{ formatCurrency(summary.income - summary.expense) }}
        </div>
      </div>

      <!-- Transactions Table -->
      <div class="table-responsive mt-3">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>Ngày</th>
              <th>Loại</th>
              <th>Danh mục</th>
              <th>Ghi chú</th>
              <th class="text-end">Số tiền</th>
              <th class="text-end">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(t, idx) in filtered" :key="t.id">
              <td>{{ t.date }}</td>
              <td>
                <span
                  :class="t.type === 'income' ? 'text-success' : 'text-danger'"
                  >{{ t.type === "income" ? "Thu" : "Chi" }}</span
                >
              </td>
              <td>{{ t.category }}</td>
              <td>{{ t.note }}</td>
              <td class="text-end">{{ formatCurrency(t.amount) }}</td>
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
            <tr v-if="filtered.length === 0">
              <td colspan="6" class="text-center text-muted">
                Không có giao dịch
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="savedToast" class="alert alert-success mt-2" role="alert">
        Đã lưu!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClientGiaoDich",
  data() {
    return {
      transactions: [],
      form: {
        type: "expense",
        date: this.today(),
        category: "",
        note: "",
        amount: 0,
      },
      editIndex: null,
      filters: {
        search: "",
        type: "",
        category: "",
        from: "",
        to: "",
      },
      categories: [
        "Ăn uống",
        "Di chuyển",
        "Hóa đơn",
        "Giáo dục",
        "Giải trí",
        "Thu nhập",
        "Khác",
      ],
      savedToast: false,
    };
  },
  computed: {
    filtered() {
      const s = (this.filters.search || "").toLowerCase();
      const type = this.filters.type;
      const cat = this.filters.category;
      const from = this.filters.from ? new Date(this.filters.from) : null;
      const to = this.filters.to ? new Date(this.filters.to) : null;
      return this.transactions.filter((t) => {
        const inSearch = !s || (t.note || "").toLowerCase().includes(s);
        const inType = !type || t.type === type;
        const inCat = !cat || t.category === cat;
        const d = new Date(t.date);
        const inFrom = !from || d >= from;
        const inTo = !to || d <= to;
        return inSearch && inType && inCat && inFrom && inTo;
      });
    },
    summary() {
      return this.filtered.reduce(
        (acc, t) => {
          if (t.type === "income") acc.income += Number(t.amount) || 0;
          else acc.expense += Number(t.amount) || 0;
          return acc;
        },
        { income: 0, expense: 0 }
      );
    },
  },
  mounted() {
    this.tryLoadCategoriesFromProfile();
    this.loadTransactions();
  },
  methods: {
    today() {
      const d = new Date();
      return d.toISOString().slice(0, 10);
    },
    resetForm() {
      this.editIndex = null;
      this.form = {
        type: "expense",
        date: this.today(),
        category: this.categories[0] || "Khác",
        note: "",
        amount: 0,
      };
    },
    onSubmit() {
      if (!this.form.category)
        this.form.category = this.categories[0] || "Khác";
      const payload = {
        ...this.form,
        id:
          this.editIndex !== null
            ? this.transactions[this.editIndex].id
            : Date.now(),
      };
      if (this.editIndex === null) {
        this.transactions.unshift(payload);
      } else {
        this.$set
          ? this.$set(this.transactions, this.editIndex, payload)
          : (this.transactions[this.editIndex] = payload);
      }
      this.resetForm();
      this.saveTransactions();
    },
    onEdit(idx) {
      const t = this.filtered[idx];
      const originalIndex = this.transactions.findIndex((x) => x.id === t.id);
      this.editIndex = originalIndex;
      this.form = {
        type: t.type,
        date: t.date,
        category: t.category,
        note: t.note,
        amount: t.amount,
      };
    },
    onDelete(idx) {
      const t = this.filtered[idx];
      const originalIndex = this.transactions.findIndex((x) => x.id === t.id);
      if (originalIndex !== -1) this.transactions.splice(originalIndex, 1);
      this.saveTransactions();
    },
    formatCurrency(v) {
      return (Number(v) || 0).toLocaleString("vi-VN");
    },
    saveTransactions() {
      localStorage.setItem(
        "cf_transactions",
        JSON.stringify(this.transactions)
      );
      this.savedToast = true;
      setTimeout(() => (this.savedToast = false), 1200);
    },
    loadTransactions() {
      const raw = localStorage.getItem("cf_transactions");
      this.transactions = raw ? JSON.parse(raw) : [];
    },
    tryLoadCategoriesFromProfile() {
      try {
        const raw = localStorage.getItem("cf_profile_state");
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.categories) && parsed.categories.length) {
          this.categories = parsed.categories.slice();
          if (!this.categories.includes("Thu nhập"))
            this.categories.push("Thu nhập");
        }
      } catch (e) {
        // ignore
      }
    },
  },
};
</script>

<style>
.table td,
.table th {
  vertical-align: middle;
}
</style>
