<template>
  <div class="card">
    <div class="card-header d-flex align-items-center justify-content-between">
      <h5 class="mb-0">Feedback</h5>
      <button class="btn btn-outline-secondary" @click="loadAll">
        Tải lại
      </button>
    </div>
    <div class="card-body">
      <div class="row g-3 align-items-end">
        <div class="col-md-3">
          <label class="form-label">Đánh giá</label>
          <select class="form-select" v-model.number="form.rating">
            <option :value="5">★★★★★ Rất tốt</option>
            <option :value="4">★★★★ Tốt</option>
            <option :value="3">★★★ Bình thường</option>
            <option :value="2">★★ Kém</option>
            <option :value="1">★ Rất kém</option>
          </select>
        </div>
        <div class="col-md-7">
          <label class="form-label">Nội dung</label>
          <input
            class="form-control"
            v-model="form.message"
            placeholder="Hãy chia sẻ trải nghiệm của bạn"
          />
        </div>
        <div class="col-md-2">
          <button class="btn btn-primary" @click="submit">Gửi</button>
        </div>
      </div>

      <div class="table-responsive mt-3">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>Thời gian</th>
              <th>Đánh giá</th>
              <th>Nội dung</th>
              <th class="text-end">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(f, idx) in feedbacks" :key="f.id">
              <td>{{ f.time }}</td>
              <td>
                <span class="text-warning">{{ "★".repeat(f.rating) }}</span>
                <span class="text-muted">{{ "★".repeat(5 - f.rating) }}</span>
              </td>
              <td>{{ f.message }}</td>
              <td class="text-end">
                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="remove(idx)"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
            <tr v-if="feedbacks.length === 0">
              <td colspan="4" class="text-center text-muted">
                Chưa có phản hồi
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="toast" class="alert alert-success mt-2" role="alert">
        {{ toast }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClientFeedBack",
  data() {
    return {
      form: { rating: 5, message: "" },
      feedbacks: [],
      toast: "",
    };
  },
  mounted() {
    this.loadAll();
  },
  methods: {
    loadAll() {
      this.feedbacks = JSON.parse(localStorage.getItem("cf_feedbacks") || "[]");
    },
    saveAll() {
      localStorage.setItem("cf_feedbacks", JSON.stringify(this.feedbacks));
    },
    submit() {
      const msg = (this.form.message || "").trim();
      if (!msg) return;
      this.feedbacks.unshift({
        id: Date.now(),
        rating: Number(this.form.rating) || 5,
        message: msg,
        time: new Date().toLocaleString("vi-VN"),
      });
      this.form = { rating: 5, message: "" };
      this.saveAll();
      this.toast = "Cảm ơn bạn đã gửi phản hồi!";
      setTimeout(() => (this.toast = ""), 1500);
    },
    remove(idx) {
      this.feedbacks.splice(idx, 1);
      this.saveAll();
    },
  },
};
</script>

<style></style>
