<template>
  <div class="card">
    <div class="card-header d-flex align-items-center justify-content-between">
      <h5 class="mb-0">Quản lí nhóm / Gia đình</h5>
    </div>
    <div class="card-body">
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            :class="{ active: tab === 'members' }"
            @click="tab = 'members'"
          >
            Thành viên
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            :class="{ active: tab === 'shared' }"
            @click="tab = 'shared'"
          >
            Giao dịch chung
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            :class="{ active: tab === 'goals' }"
            @click="tab = 'goals'"
          >
            Mục tiêu dài hạn
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            :class="{ active: tab === 'notes' }"
            @click="tab = 'notes'"
          >
            Ghi chú & Bình luận
          </button>
        </li>
      </ul>

      <div class="tab-content pt-3">
        <!-- Members -->
        <div v-show="tab === 'members'">
          <div class="row g-2 align-items-end">
            <div class="col-md-4">
              <label class="form-label">Tên</label>
              <input
                class="form-control"
                v-model="memberForm.name"
                placeholder="Tên thành viên"
              />
            </div>
            <div class="col-md-4">
              <label class="form-label">Email</label>
              <input
                class="form-control"
                v-model="memberForm.email"
                placeholder="email@domain.com"
              />
            </div>
            <div class="col-md-4">
              <button class="btn btn-success" @click="addMember">
                Thêm thành viên
              </button>
            </div>
          </div>
          <div class="table-responsive mt-3">
            <table class="table align-middle">
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Email</th>
                  <th class="text-end">Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(m, idx) in members" :key="m.id">
                  <td>{{ m.name }}</td>
                  <td>{{ m.email }}</td>
                  <td class="text-end">
                    <button
                      class="btn btn-sm btn-outline-danger"
                      @click="removeMember(idx)"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr v-if="members.length === 0">
                  <td colspan="3" class="text-center text-muted">
                    Chưa có thành viên
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Shared Transactions (simulated sync) -->
        <div v-show="tab === 'shared'">
          <div class="alert alert-info">
            Mô phỏng đồng bộ nhiều tài khoản: các thành viên có thể thêm giao
            dịch, dữ liệu lưu chung trong trình duyệt.
          </div>
          <div class="row g-2 align-items-end">
            <div class="col-md-2">
              <label class="form-label">Người tạo</label>
              <select class="form-select" v-model="sharedForm.memberId">
                <option v-for="m in members" :key="m.id" :value="m.id">
                  {{ m.name }}
                </option>
              </select>
            </div>
            <div class="col-md-2">
              <label class="form-label">Loại</label>
              <select class="form-select" v-model="sharedForm.type">
                <option value="expense">Chi</option>
                <option value="income">Thu</option>
              </select>
            </div>
            <div class="col-md-2">
              <label class="form-label">Ngày</label>
              <input
                class="form-control"
                type="date"
                v-model="sharedForm.date"
              />
            </div>
            <div class="col-md-3">
              <label class="form-label">Danh mục</label>
              <input
                class="form-control"
                v-model="sharedForm.category"
                placeholder="VD: Ăn uống"
              />
            </div>
            <div class="col-md-3">
              <label class="form-label">Số tiền</label>
              <input
                class="form-control"
                type="number"
                min="0"
                step="1000"
                v-model.number="sharedForm.amount"
              />
            </div>
            <div class="col-12">
              <label class="form-label">Ghi chú</label>
              <input
                class="form-control"
                v-model="sharedForm.note"
                placeholder="Mô tả"
              />
            </div>
            <div class="col-12">
              <button class="btn btn-success" @click="addSharedTx">
                Thêm giao dịch
              </button>
            </div>
          </div>

          <div class="table-responsive mt-3">
            <table class="table align-middle">
              <thead>
                <tr>
                  <th>Thành viên</th>
                  <th>Ngày</th>
                  <th>Loại</th>
                  <th>Danh mục</th>
                  <th>Ghi chú</th>
                  <th class="text-end">Số tiền</th>
                  <th class="text-end">Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(t, idx) in sharedTransactions" :key="t.id">
                  <td>{{ memberName(t.memberId) }}</td>
                  <td>{{ t.date }}</td>
                  <td>
                    <span
                      :class="
                        t.type === 'income' ? 'text-success' : 'text-danger'
                      "
                      >{{ t.type === "income" ? "Thu" : "Chi" }}</span
                    >
                  </td>
                  <td>{{ t.category }}</td>
                  <td>{{ t.note }}</td>
                  <td class="text-end">{{ formatCurrency(t.amount) }}</td>
                  <td class="text-end">
                    <button
                      class="btn btn-sm btn-outline-danger"
                      @click="removeSharedTx(idx)"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr v-if="sharedTransactions.length === 0">
                  <td colspan="7" class="text-center text-muted">
                    Chưa có giao dịch chung
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Long-term Goals -->
        <div v-show="tab === 'goals'">
          <div class="row g-2 align-items-end">
            <div class="col-md-3">
              <label class="form-label">Mục tiêu</label>
              <input
                class="form-control"
                v-model="goalForm.title"
                placeholder="VD: Mua nhà"
              />
            </div>
            <div class="col-md-3">
              <label class="form-label">Số tiền mục tiêu (VND)</label>
              <input
                class="form-control"
                type="number"
                min="0"
                step="1000000"
                v-model.number="goalForm.target"
              />
            </div>
            <div class="col-md-3">
              <label class="form-label">Thời hạn</label>
              <input
                class="form-control"
                type="month"
                v-model="goalForm.deadline"
              />
            </div>
            <div class="col-md-3">
              <button class="btn btn-success" @click="addGoal">
                Thêm mục tiêu
              </button>
            </div>
          </div>
          <div class="table-responsive mt-3">
            <table class="table align-middle">
              <thead>
                <tr>
                  <th>Mục tiêu</th>
                  <th>Thời hạn</th>
                  <th class="text-end">Mục tiêu</th>
                  <th class="text-end">Đã tích lũy</th>
                  <th class="text-end">Còn lại</th>
                  <th class="text-end">Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(g, idx) in goals" :key="g.id">
                  <td>{{ g.title }}</td>
                  <td>{{ g.deadline }}</td>
                  <td class="text-end">{{ formatCurrency(g.target) }}</td>
                  <td class="text-end">{{ formatCurrency(g.saved) }}</td>
                  <td class="text-end">
                    {{ formatCurrency(Math.max(0, g.target - g.saved)) }}
                  </td>
                  <td class="text-end">
                    <button
                      class="btn btn-sm btn-outline-primary me-1"
                      @click="addSaving(idx)"
                    >
                      <i class="fa-solid fa-plus"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-outline-danger"
                      @click="removeGoal(idx)"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr v-if="goals.length === 0">
                  <td colspan="6" class="text-center text-muted">
                    Chưa có mục tiêu
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Notes & Comments -->
        <div v-show="tab === 'notes'">
          <div class="input-group">
            <input
              class="form-control"
              v-model="noteInput"
              placeholder="Viết ghi chú hoặc bình luận..."
              @keyup.enter="addNote"
            />
            <button class="btn btn-primary" @click="addNote">Gửi</button>
          </div>
          <ul class="list-group mt-3">
            <li
              v-for="(n, idx) in notes"
              :key="n.id"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <div class="fw-bold">
                  {{ memberName(n.authorId) }}
                  <small class="text-muted">{{ n.createdAt }}</small>
                </div>
                <div>{{ n.text }}</div>
              </div>
              <button
                class="btn btn-sm btn-outline-danger"
                @click="removeNote(idx)"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </li>
            <li
              v-if="notes.length === 0"
              class="list-group-item text-muted text-center"
            >
              Chưa có ghi chú
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClientQuanLiGiaDinh",
  data() {
    return {
      tab: "members",
      members: [],
      memberForm: { name: "", email: "" },
      sharedTransactions: [],
      sharedForm: {
        memberId: null,
        type: "expense",
        date: this.today(),
        category: "",
        amount: 0,
        note: "",
      },
      goals: [],
      goalForm: { title: "", target: 0, deadline: "" },
      notes: [],
      noteInput: "",
    };
  },
  mounted() {
    this.loadAll();
    if (!this.members.length) {
      // seed current user
      this.members.push({
        id: Date.now(),
        name: "Tôi",
        email: "me@example.com",
      });
      this.saveAll();
    }
    if (this.members.length) this.sharedForm.memberId = this.members[0].id;
  },
  methods: {
    // Utils
    today() {
      const d = new Date();
      return d.toISOString().slice(0, 10);
    },
    formatCurrency(v) {
      return (Number(v) || 0).toLocaleString("vi-VN");
    },
    memberName(id) {
      const m = this.members.find((x) => x.id === id);
      return m ? m.name : "N/A";
    },

    // Persist
    saveAll() {
      localStorage.setItem("cf_family_members", JSON.stringify(this.members));
      localStorage.setItem(
        "cf_family_sharedTx",
        JSON.stringify(this.sharedTransactions)
      );
      localStorage.setItem("cf_family_goals", JSON.stringify(this.goals));
      localStorage.setItem("cf_family_notes", JSON.stringify(this.notes));
    },
    loadAll() {
      this.members = JSON.parse(
        localStorage.getItem("cf_family_members") || "[]"
      );
      this.sharedTransactions = JSON.parse(
        localStorage.getItem("cf_family_sharedTx") || "[]"
      );
      this.goals = JSON.parse(localStorage.getItem("cf_family_goals") || "[]");
      this.notes = JSON.parse(localStorage.getItem("cf_family_notes") || "[]");
    },

    // Members
    addMember() {
      const { name, email } = this.memberForm;
      if (!name || !email) return;
      this.members.push({ id: Date.now(), name, email });
      this.memberForm = { name: "", email: "" };
      this.saveAll();
      if (!this.sharedForm.memberId)
        this.sharedForm.memberId = this.members[0].id;
    },
    removeMember(idx) {
      this.members.splice(idx, 1);
      this.saveAll();
    },

    // Shared transactions
    addSharedTx() {
      const p = { id: Date.now(), ...this.sharedForm };
      this.sharedTransactions.unshift(p);
      this.sharedForm = {
        memberId: (this.members[0] || {}).id || null,
        type: "expense",
        date: this.today(),
        category: "",
        amount: 0,
        note: "",
      };
      this.saveAll();
    },
    removeSharedTx(idx) {
      this.sharedTransactions.splice(idx, 1);
      this.saveAll();
    },

    // Goals
    addGoal() {
      const { title, target, deadline } = this.goalForm;
      if (!title || !deadline) return;
      this.goals.push({
        id: Date.now(),
        title,
        target: Number(target) || 0,
        deadline,
        saved: 0,
      });
      this.goalForm = { title: "", target: 0, deadline: "" };
      this.saveAll();
    },
    removeGoal(idx) {
      this.goals.splice(idx, 1);
      this.saveAll();
    },
    addSaving(idx) {
      const amt = Number(prompt("Nhập số tiền tích lũy thêm (VND):", "0")) || 0;
      if (amt <= 0) return;
      this.goals[idx].saved = (Number(this.goals[idx].saved) || 0) + amt;
      this.saveAll();
    },

    // Notes
    addNote() {
      const text = (this.noteInput || "").trim();
      if (!text) return;
      const authorId = (this.members[0] || {}).id || Date.now();
      const createdAt = new Date().toLocaleString("vi-VN");
      this.notes.unshift({ id: Date.now(), authorId, text, createdAt });
      this.noteInput = "";
      this.saveAll();
    },
    removeNote(idx) {
      this.notes.splice(idx, 1);
      this.saveAll();
    },
  },
};
</script>

<style>
.nav-tabs .nav-link {
  cursor: pointer;
}
</style>
