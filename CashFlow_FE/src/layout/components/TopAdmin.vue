<template>
  <header>
    <div class="topbar d-flex align-items-center">
      <nav class="navbar navbar-expand custom-topbar">
        <div class="topbar-logo-header">
          <div class="">
            <img
              src="https://play-lh.googleusercontent.com/oIYzM27-Lax7Zkg4grAxxLYRQkxHrs1osx0Qbf-jADQNpv9400yo0qYcLzDn-Qz2M8A"
              class="logo-icon"
              alt="logo icon"
            />
          </div>
          <div class="">
            <h4 class="logo-text">CashFlow</h4>
          </div>
        </div>
        <div class="mobile-toggle-menu"><i class="bx bx-menu"></i></div>
        <div class="search-bar flex-grow-1">
          <div class="position-relative search-bar-box">
            <input
              type="text"
              class="form-control search-control"
              placeholder="Type to search..."
            />
            <span class="position-absolute search-show"
              ><i class="bx bx-search"></i
            ></span>
            <span class="position-absolute search-close"
              ><i class="bx bx-x"></i
            ></span>
          </div>
        </div>
        <div class="top-menu ms-auto">
          <ul class="navbar-nav align-items-center">
            <!-- ... các phần menu khác ... -->
          </ul>
        </div>
        <div class="user-box dropdown">
          <a
            class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="../../assets/images/avatars/avatar-2.png"
              class="user-img"
              alt="user avatar"
            />
            <div class="user-info ps-3">
              <p class="user-name mb-0">Admin</p>
              <p class="designattion mb-0"></p>
            </div>
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            <!-- các menu bị comment -->
            <li>
              <a>
                <router-link to="/client/profile" class="nav-link">
                  <div class="menu-title ms-3">
                    <i class="fa-solid fa-user"></i> Profile
                  </div>
                </router-link>
              </a>
            </li>
            <!-- Nút Logout -->
            <li>
              <a
                class="dropdown-item"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#logoutModal"
              >
                <i class="bx bx-log-out-circle"></i><span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <!-- Modal xác nhận Logout -->
    <div class="modal fade" id="logoutModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Xác nhận đăng xuất</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <p>Bạn có chắc chắn muốn đăng xuất không?</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Hủy
            </button>
            <!-- Chuyển hướng thẳng về trang "/" -->
            <a href="/" class="btn btn-primary">Đăng xuất</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
.custom-topbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  border-radius: 0 0 15px 15px;
  padding: 15px 20px;
}

.custom-topbar .logo-text {
  color: white !important;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.custom-topbar .search-control {
  background-color: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  padding: 12px 50px 12px 50px;
  transition: all 0.3s ease;
  font-size: 14px;
  position: relative;
}

.custom-topbar .search-control:focus {
  background-color: white;
  border-color: #fff;
  box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.5);
  outline: none;
}

.custom-topbar .search-show {
  color: #667eea;
  left: 20px; /* Căn phải hơn một chút */
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  pointer-events: none;
  font-size: 16px;
}

.custom-topbar .search-close {
  color: #667eea;
  right: 20px; /* Căn phải hơn một chút */
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
  font-size: 16px;
}

.custom-topbar .user-name {
  color: white !important;
  font-weight: 600;
}

.custom-topbar .user-img {
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
}

.custom-topbar .dropdown-menu {
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: none;
  margin-top: 10px;
}

.custom-topbar .dropdown-item {
  padding: 12px 20px;
  transition: all 0.3s ease;
}

.custom-topbar .dropdown-item:hover {
  background-color: #f8f9fa;
  color: #667eea;
}

.mobile-toggle-menu i {
  color: white;
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.mobile-toggle-menu i:hover {
  transform: scale(1.1);
}
</style>
