<template>
  <div class="container-fluid py-3">
    <div class="card shadow-sm">
      <div class="card-header bg-white d-flex flex-wrap gap-2 align-items-end">
        <div>
          <label class="form-label mb-1">Tìm kiếm</label>
          <input v-model="search" type="text" class="form-control" placeholder="Tên, email..." />
        </div>
        <div>
          <label class="form-label mb-1">Trạng thái</label>
          <select class="form-select" v-model="statusFilter">
            <option value="">Tất cả</option>
            <option value="pending">Chờ xác minh</option>
            <option value="active">Đang hoạt động</option>
            <option value="locked">Đã khóa</option>
          </select>
        </div>
        <div class="ms-auto d-flex gap-2">
          <button class="btn btn-primary" @click="verifySelected" :disabled="selectedIds.length===0">Xác minh</button>
          <button class="btn btn-warning" @click="lockSelected" :disabled="selectedIds.length===0">Khóa</button>
          <button class="btn btn-success" @click="unlockSelected" :disabled="selectedIds.length===0">Mở khóa</button>
        </div>
      </div>

      <div class="card-body">
        <div class="table-responsive">
          <table class="table align-middle">
            <thead>
              <tr>
                <th><input type="checkbox" :checked="allSelected" @change="toggleSelectAll($event)" /></th>
                <th>Tên</th>
                <th>Email</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th class="text-end">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredUsers.length===0">
                <td colspan="6" class="text-center text-muted py-4">Không có dữ liệu</td>
              </tr>
              <tr v-for="u in filteredUsers" :key="u.id">
                <td><input type="checkbox" :value="u.id" v-model="selectedIds" /></td>
                <td>{{ u.name }}</td>
                <td>{{ u.email }}</td>
                <td>
                  <span :class="['badge', statusBadge(u.status)]">{{ statusLabel(u.status) }}</span>
                </td>
                <td>{{ formatDate(u.createdAt) }}</td>
                <td class="text-end">
                  <button class="btn btn-sm btn-outline-primary me-1" @click="verify(u)" :disabled="u.status!=='pending'">Xác minh</button>
                  <button class="btn btn-sm btn-outline-warning me-1" @click="lock(u)" :disabled="u.status==='locked'">Khóa</button>
                  <button class="btn btn-sm btn-outline-success me-1" @click="unlock(u)" :disabled="u.status!=='locked'">Mở khóa</button>
                  <button class="btn btn-sm btn-outline-secondary" @click="openComplaints(u)">Khiếu nại</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-3">
          <h6 class="mb-2">Khiếu nại của user</h6>
          <div v-if="activeComplaintsUser" class="border rounded p-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <strong>{{ activeComplaintsUser.name }}</strong>
              <button class="btn btn-sm btn-outline-dark" @click="activeComplaintsUser=null">Đóng</button>
            </div>
            <div v-if="complaints.length===0" class="text-muted">Không có khiếu nại</div>
            <ul v-else class="list-group">
              <li v-for="c in complaints" :key="c.id" class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <div class="fw-semibold">#{{ c.id }} - {{ c.title }}</div>
                  <div class="small text-muted">{{ c.createdAt }}</div>
                </div>
                <div>
                  <select class="form-select form-select-sm" v-model="c.status">
                    <option value="open">Đang mở</option>
                    <option value="in_progress">Đang xử lý</option>
                    <option value="resolved">Đã xử lý</option>
                  </select>
                </div>
              </li>
            </ul>
          </div>
          <div v-else class="text-muted">Chọn user để xem khiếu nại.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminQuanLiKhachHang",
  data() {
    return {
      search: "",
      statusFilter: "",
      selectedIds: [],
      users: [
        { id: 1, name: "Nguyễn Văn A", email: "a@example.com", status: "pending", createdAt: "2025-09-01" },
        { id: 2, name: "Trần Thị B", email: "b@example.com", status: "active", createdAt: "2025-09-02" },
        { id: 3, name: "Lê Văn C", email: "c@example.com", status: "locked", createdAt: "2025-09-03" },
        { id: 4, name: "Phạm Thị D", email: "d@example.com", status: "active", createdAt: "2025-09-04" },
      ],
      activeComplaintsUser: null,
      complaints: [],
    }
  },
  computed: {
    filteredUsers() {
      const q = this.search.trim().toLowerCase();
      return this.users.filter(u => {
        if (q && !(u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))) return false;
        if (this.statusFilter && u.status !== this.statusFilter) return false;
        return true;
      });
    },
    allSelected() {
      const ids = this.filteredUsers.map(u => u.id);
      return ids.length > 0 && ids.every(id => this.selectedIds.includes(id));
    }
  },
  methods: {
    statusLabel(s) {
      return s === 'pending' ? 'Chờ xác minh' : s === 'active' ? 'Đang hoạt động' : 'Đã khóa';
    },
    statusBadge(s) {
      return s === 'pending' ? 'bg-soft-warning text-warning' : s === 'active' ? 'bg-soft-success text-success' : 'bg-soft-danger text-danger';
    },
    formatDate(str) {
      const [y, m, d] = str.split('-');
      return `${d}/${m}/${y}`;
    },
    toggleSelectAll(e) {
      if (e.target.checked) {
        this.selectedIds = this.filteredUsers.map(u => u.id);
      } else {
        this.selectedIds = [];
      }
    },
    verify(user) {
      if (user.status === 'pending') user.status = 'active';
    },
    lock(user) {
      user.status = 'locked';
    },
    unlock(user) {
      user.status = 'active';
    },
    verifySelected() {
      this.users.forEach(u => { if (this.selectedIds.includes(u.id) && u.status === 'pending') u.status = 'active'; });
      this.selectedIds = [];
    },
    lockSelected() {
      this.users.forEach(u => { if (this.selectedIds.includes(u.id)) u.status = 'locked'; });
      this.selectedIds = [];
    },
    unlockSelected() {
      this.users.forEach(u => { if (this.selectedIds.includes(u.id) && u.status === 'locked') u.status = 'active'; });
      this.selectedIds = [];
    },
    openComplaints(user) {
      this.activeComplaintsUser = user;
      // Mock khiếu nại; thay bằng API thực
      this.complaints = [
        { id: 101, title: 'Không đăng nhập được', status: 'open', createdAt: '2025-09-05 10:12' },
        { id: 102, title: 'Lỗi thanh toán', status: 'in_progress', createdAt: '2025-09-06 14:20' },
      ];
    }
  }
}
</script>

<style>
.badge.bg-soft-primary { background-color: rgba(13,110,253,.12); }
.badge.bg-soft-success { background-color: rgba(25,135,84,.12); }
.badge.bg-soft-danger  { background-color: rgba(220,53,69,.12); }
.badge.bg-soft-warning { background-color: rgba(255,193,7,.15); }
</style>

