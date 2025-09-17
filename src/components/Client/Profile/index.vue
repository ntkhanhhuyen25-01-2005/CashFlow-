<template>
  <div class="card">
    <div class="card-header d-flex align-items-center justify-content-between">
      <h5 class="mb-0">Hồ sơ cá nhân</h5>
      <button class="btn btn-primary" @click="saveAll">Lưu thay đổi</button>
    </div>
    <div class="card-body">
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            :class="{ active: tab === 'profile' }"
            @click="tab = 'profile'"
          >
            Hồ sơ
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            :class="{ active: tab === 'security' }"
            @click="tab = 'security'"
          >
            Bảo mật
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            :class="{ active: tab === 'appearance' }"
            @click="tab = 'appearance'"
          >
            Giao diện
          </button>
        </li>
      </ul>

      <div class="tab-content pt-3">
        <!-- PROFILE TAB -->
        <div v-show="tab === 'profile'">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Tên hiển thị</label>
              <input
                class="form-control"
                v-model="state.profile.displayName"
                placeholder="Tên của bạn"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">Email</label>
              <input
                class="form-control"
                v-model="state.profile.email"
                placeholder="email@domain.com"
              />
            </div>
            <div class="col-md-12">
              <label class="form-label">Mục tiêu tài chính</label>
              <div
                class="input-group mb-2"
                v-for="(goal, idx) in state.goals"
                :key="'goal-' + idx"
              >
                <input
                  class="form-control"
                  v-model.number="state.goals[idx].target"
                  type="number"
                  min="0"
                  placeholder="Mục tiêu (VND)"
                />
                <input
                  class="form-control"
                  v-model="state.goals[idx].note"
                  placeholder="Ghi chú"
                />
                <button class="btn btn-outline-danger" @click="removeGoal(idx)">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
              <button class="btn btn-outline-primary" @click="addGoal">
                <i class="fa-solid fa-plus"></i> Thêm mục tiêu
              </button>
            </div>

            <div class="col-md-12">
              <div class="d-flex align-items-center justify-content-between">
                <label class="form-label mb-0">Ví / Tài khoản ngân hàng</label>
                <button
                  class="btn btn-outline-primary btn-sm"
                  @click="addWallet"
                >
                  <i class="fa-solid fa-plus"></i> Thêm
                </button>
              </div>

              <div class="list-group mt-2">
                <div
                  v-for="(w, idx) in state.wallets"
                  :key="'wallet-' + idx"
                  class="list-group-item d-flex align-items-center gap-2"
                  draggable="true"
                  @dragstart="onDragStart($event, idx)"
                  @dragover.prevent
                  @drop="onDrop($event, idx)"
                >
                  <span class="badge bg-secondary me-2" style="cursor: grab"
                    >↕</span
                  >
                  <input
                    class="form-control"
                    v-model="state.wallets[idx].name"
                    placeholder="Tên ví / ngân hàng"
                  />
                  <input
                    class="form-control"
                    v-model="state.wallets[idx].account"
                    placeholder="Số TK / Mô tả"
                  />
                  <input
                    class="form-control"
                    v-model.number="state.wallets[idx].balance"
                    type="number"
                    min="0"
                    placeholder="Số dư"
                  />
                  <button
                    class="btn btn-outline-danger"
                    @click="removeWallet(idx)"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SECURITY TAB -->
        <div v-show="tab === 'security'">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">PIN</label>
              <div class="input-group">
                <input
                  class="form-control"
                  v-model="state.security.pin"
                  type="password"
                  maxlength="6"
                  placeholder="Nhập PIN (tối đa 6 số)"
                />
                <button
                  class="btn btn-outline-secondary"
                  @click="togglePinVisible"
                >
                  {{ pinVisible ? "Ẩn" : "Hiện" }}
                </button>
              </div>
              <small class="text-muted">Lưu cục bộ trên máy của bạn.</small>
            </div>
            <div class="col-md-6 d-flex align-items-center">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="otpToggle"
                  v-model="state.security.otpEnabled"
                />
                <label class="form-check-label" for="otpToggle">Bật OTP</label>
              </div>
            </div>
            <div class="col-md-6 d-flex align-items-center">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="faceToggle"
                  v-model="state.security.faceIdEnabled"
                  @change="onFaceIdToggle"
                />
                <label class="form-check-label" for="faceToggle"
                  >Bật Face ID (trình duyệt)</label
                >
              </div>
              <small class="text-muted ms-2"
                >Mô phỏng; dùng WebAuthn ở bản sau.</small
              >
            </div>
          </div>
        </div>

        <!-- APPEARANCE TAB -->
        <div v-show="tab === 'appearance'">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Chế độ giao diện</label>
              <select
                class="form-select"
                v-model="state.appearance.theme"
                @change="applyTheme"
              >
                <option value="light-theme">Sáng</option>
                <option value="dark-theme">Tối</option>
                <option value="semi-dark">Bán tối</option>
                <option value="minimal-theme">Tối giản</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">Màu header</label>
              <select
                class="form-select"
                v-model="state.appearance.headerColor"
                @change="applyHeader"
              >
                <option value="">Mặc định</option>
                <option
                  v-for="n in 8"
                  :key="'hc-' + n"
                  :value="'headercolor' + n"
                >
                  Header {{ n }}
                </option>
              </select>
            </div>
            <div class="col-md-12">
              <label class="form-label">Sắp xếp danh mục</label>
              <div class="list-group">
                <div
                  v-for="(c, idx) in state.categories"
                  :key="'cat-' + idx"
                  class="list-group-item d-flex align-items-center justify-content-between"
                  draggable="true"
                  @dragstart="onCatDragStart($event, idx)"
                  @dragover.prevent
                  @drop="onCatDrop($event, idx)"
                >
                  <span
                    ><i class="fa-solid fa-grip-vertical me-2"></i>{{ c }}</span
                  >
                  <button
                    class="btn btn-sm btn-outline-danger"
                    @click="removeCategory(idx)"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
              <div class="input-group mt-2">
                <input
                  class="form-control"
                  v-model="newCategory"
                  placeholder="Thêm danh mục"
                  @keyup.enter="addCategory"
                />
                <button class="btn btn-outline-primary" @click="addCategory">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="savedToast" class="alert alert-success mt-3" role="alert">
        Đã lưu cài đặt!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClientProfile",
  data() {
    return {
      tab: "profile",
      pinVisible: false,
      dragIndex: null,
      catDragIndex: null,
      newCategory: "",
      savedToast: false,
      state: {
        profile: {
          displayName: "",
          email: "",
        },
        goals: [],
        wallets: [],
        security: {
          pin: "",
          otpEnabled: false,
          faceIdEnabled: false,
        },
        appearance: {
          theme: "light-theme",
          headerColor: "",
        },
        categories: [
          "Thu nhập",
          "Ăn uống",
          "Di chuyển",
          "Hóa đơn",
          "Giáo dục",
          "Giải trí",
        ],
      },
    };
  },
  mounted() {
    this.loadAll();
    this.applyTheme();
    this.applyHeader();
  },
  methods: {
    // Persist
    saveAll() {
      localStorage.setItem("cf_profile_state", JSON.stringify(this.state));
      this.savedToast = true;
      setTimeout(() => (this.savedToast = false), 1500);
    },
    loadAll() {
      const raw = localStorage.getItem("cf_profile_state");
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          // shallow merge with defaults
          this.state = Object.assign({}, this.state, parsed);
        } catch (e) {
          console.warn("Failed to parse profile state", e);
        }
      }
    },

    // Goals
    addGoal() {
      this.state.goals.push({ target: 0, note: "" });
    },
    removeGoal(idx) {
      this.state.goals.splice(idx, 1);
    },

    // Wallets
    addWallet() {
      this.state.wallets.push({ name: "", account: "", balance: 0 });
    },
    removeWallet(idx) {
      this.state.wallets.splice(idx, 1);
    },
    onDragStart(e, idx) {
      this.dragIndex = idx;
      e.dataTransfer.effectAllowed = "move";
    },
    onDrop(e, idx) {
      if (this.dragIndex === null) return;
      const list = this.state.wallets;
      const moved = list.splice(this.dragIndex, 1)[0];
      list.splice(idx, 0, moved);
      this.dragIndex = null;
    },

    // Security
    togglePinVisible() {
      this.pinVisible = !this.pinVisible;
      const input = (e) => e;
    },
    onFaceIdToggle() {
      if (this.state.security.faceIdEnabled) {
        // placeholder: simulate enrollment success
        // Real impl: WebAuthn navigator.credentials.create(...)
      }
    },

    // Appearance
    applyTheme() {
      const root = document.documentElement;
      const theme = this.state.appearance.theme || "light-theme";
      root.className = theme;
    },
    applyHeader() {
      const root = document.documentElement;
      // remove existing headercolor classes
      for (let i = 1; i <= 8; i++) root.classList.remove("headercolor" + i);
      root.classList.remove("color-header");
      if (this.state.appearance.headerColor) {
        root.classList.add("color-header");
        root.classList.add(this.state.appearance.headerColor);
      }
    },

    // Categories
    addCategory() {
      const v = (this.newCategory || "").trim();
      if (!v) return;
      this.state.categories.push(v);
      this.newCategory = "";
    },
    removeCategory(idx) {
      this.state.categories.splice(idx, 1);
    },
    onCatDragStart(e, idx) {
      this.catDragIndex = idx;
      e.dataTransfer.effectAllowed = "move";
    },
    onCatDrop(e, idx) {
      if (this.catDragIndex === null) return;
      const list = this.state.categories;
      const moved = list.splice(this.catDragIndex, 1)[0];
      list.splice(idx, 0, moved);
      this.catDragIndex = null;
    },
  },
  watch: {
    "state.appearance.theme"() {
      this.applyTheme();
    },
    "state.appearance.headerColor"() {
      this.applyHeader();
    },
  },
};
</script>

<style>
/* minimal spacing alignment with theme */
.nav-tabs .nav-link {
  cursor: pointer;
}
.list-group-item input.form-control {
  max-width: 220px;
}
</style>
