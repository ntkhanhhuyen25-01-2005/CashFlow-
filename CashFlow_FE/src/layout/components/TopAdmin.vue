<template>
  <header>
    <div class="topbar d-flex align-items-center">
      <nav class="navbar navbar-expand">
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
            <span
              class="position-absolute top-50 search-show translate-middle-y"
              ><i class="bx bx-search"></i
            ></span>
            <span
              class="position-absolute top-50 search-close translate-middle-y"
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

<style></style>
