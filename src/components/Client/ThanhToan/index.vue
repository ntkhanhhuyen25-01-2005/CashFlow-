<template>
  <div class="card">
    <div class="card-header d-flex align-items-center justify-content-between">
      <h5 class="mb-0">Thanh toán</h5>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary" @click="loadAll">
          Tải lại
        </button>
      </div>
    </div>
    <div class="card-body">
      <h6 class="mb-2">Hóa đơn định kỳ</h6>
      <div class="row g-2 align-items-end">
        <div class="col-md-3">
          <label class="form-label">Tên hóa đơn</label>
          <input
            class="form-control"
            v-model="billForm.name"
            placeholder="Điện/Nước/Internet"
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
          <label class="form-label">Số tiền (VND)</label>
          <input
            class="form-control"
            type="number"
            min="0"
            step="1000"
            v-model.number="billForm.amount"
          />
        </div>
        <div class="col-md-4">
          <button class="btn btn-success" @click="addBill">Thêm</button>
        </div>
      </div>

      <div class="table-responsive mt-3">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Đến hạn</th>
              <th class="text-end">Số tiền</th>
              <th>Thanh toán qua</th>
              <th class="text-end">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(b, idx) in bills" :key="b.id">
              <td>{{ b.name }}</td>
              <td>Ngày {{ b.dueDay }} hàng tháng</td>
              <td class="text-end">{{ formatCurrency(b.amount) }}</td>
              <td>
                <div class="btn-group">
                  <button
                    class="btn btn-sm btn-outline-dark"
                    @click="pay(b, 'momo')"
                  >
                    Momo
                  </button>
                  <button
                    class="btn btn-sm btn-outline-dark"
                    @click="pay(b, 'zalopay')"
                  >
                    ZaloPay
                  </button>
                  <button
                    class="btn btn-sm btn-outline-dark"
                    @click="pay(b, 'paypal')"
                  >
                    PayPal
                  </button>
                </div>
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

      <h6 class="mb-2">Lịch sử thanh toán</h6>
      <div class="table-responsive">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>Thời gian</th>
              <th>Hóa đơn</th>
              <th>Cổng</th>
              <th class="text-end">Số tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in payments" :key="p.id">
              <td>{{ p.time }}</td>
              <td>{{ p.billName }}</td>
              <td class="text-uppercase">{{ p.gateway }}</td>
              <td class="text-end">{{ formatCurrency(p.amount) }}</td>
            </tr>
            <tr v-if="payments.length === 0">
              <td colspan="4" class="text-center text-muted">
                Chưa có thanh toán
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="toast" class="alert alert-success mt-3" role="alert">
        {{ toast }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClientThanhToan",
  data() {
    return {
      bills: [],
      billForm: { name: "", dueDay: 1, amount: 0 },
      payments: [],
      toast: "",
    };
  },
  mounted() {
    this.loadAll();
  },
  methods: {
    formatCurrency(v) {
      return (Number(v) || 0).toLocaleString("vi-VN");
    },
    saveAll() {
      localStorage.setItem("cf_pay_bills", JSON.stringify(this.bills));
      localStorage.setItem("cf_pay_history", JSON.stringify(this.payments));
    },
    loadAll() {
      this.bills = JSON.parse(localStorage.getItem("cf_pay_bills") || "[]");
      this.payments = JSON.parse(
        localStorage.getItem("cf_pay_history") || "[]"
      );
    },
    addBill() {
      if (!this.billForm.name) return;
      this.bills.push({ id: Date.now(), ...this.billForm });
      this.billForm = { name: "", dueDay: 1, amount: 0 };
      this.saveAll();
    },
    removeBill(idx) {
      this.bills.splice(idx, 1);
      this.saveAll();
    },
    pay(bill, gateway) {
      // Simulate payment flow
      const record = {
        id: Date.now(),
        time: new Date().toLocaleString("vi-VN"),
        billName: bill.name,
        gateway,
        amount: bill.amount,
      };
      this.payments.unshift(record);
      this.toast = `Đã thanh toán ${bill.name} qua ${gateway.toUpperCase()}`;
      setTimeout(() => (this.toast = ""), 1500);
      this.saveAll();
    },
  },
};
</script>

<style></style>
