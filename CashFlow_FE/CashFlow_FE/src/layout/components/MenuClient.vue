<template>
  <div class="nav-container primary-menu d-flex justify-content-between">
    <div class="mobile-topbar-header">
      <div>
        <img
          src="https://dzfullstack.com/assets/images/logo-img.png"
          class="logo-icon"
          alt="logo icon"
        />
      </div>
      <div>
        <h4 class="logo-text">CashFlow</h4>
      </div>
      <div class="toggle-icon ms-auto"><i class="bx bx-arrow-to-left"></i></div>
    </div>
    <div>
      <nav class="navbar navbar-expand-xl w-100">
        <ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
          <li class="nav-item">
            <router-link to="/client/trangchu" class="nav-link">
              <div class="parent-icon"><i class="fa-solid fa-house"></i></div>
              <div class="menu-title">Home</div>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/client/profile" class="nav-link">
              <div class="parent-icon">
                <i class="fa-solid fa-user"></i>
              </div>
              <div class="menu-title">Profile</div>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/client/giaodich" class="nav-link">
              <div class="parent-icon">
                <i class="fa-solid fa-arrows-rotate"></i>
              </div>
              <div class="menu-title">Giao dịch</div>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/client/ngansach" class="nav-link">
              <div class="parent-icon">
                <i class="fa-solid fa-wallet"></i>
              </div>
              <div class="menu-title">Quản lí ngân sách</div>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/client/baocao" class="nav-link">
              <div class="parent-icon">
                <i class="fa-solid fa-chart-line"></i>
              </div>
              <div class="menu-title">Báo cáo và phân tích</div>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/client/quanli-giadinh" class="nav-link">
              <div class="parent-icon">
                <i class="fa-solid fa-users"></i>
              </div>
              <div class="menu-title">Quản lí nhóm/Gia đình</div>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/client/thanhtoan" class="nav-link">
              <div class="parent-icon">
                <i class="fa-solid fa-credit-card"></i>
              </div>
              <div class="menu-title">Thanh toán</div>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/client/feedback" class="nav-link">
              <div class="parent-icon">
                <i class="fa-solid fa-comments"></i>
              </div>
              <div class="menu-title">Feedback</div>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <div>
      <li class="nav-item">
        <a class="nav-link" href="/">
          <div class="parent-icon">
            <i class="fa-solid fa-right-to-bracket"></i>
          </div>
          <div class="menu-title">Đăng Xuất</div>
        </a>
      </li>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    logoutClient() {
      localStorage.removeItem("key_client");
      this.$router.push("/client-login");
    },
  },
};
</script>
<style></style>
