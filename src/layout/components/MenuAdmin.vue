<template>
  <div class="nav-container primary-menu">
    <div class="mobile-topbar-header">
      <div>
        <img
          src="assets/images/logo-icon.png"
          class="logo-icon"
          alt="logo icon"
        />
      </div>
      <div>
        <h4 class="logo-text">Rukada</h4>
      </div>
      <div class="toggle-icon ms-auto"><i class="bx bx-arrow-to-left"></i></div>
    </div>
    <nav class="navbar navbar-expand-xl w-100">
      <ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
        <!-- <li class="nav-item dropdown">
          <a
            href="javascript:;"
            class="nav-link dropdown-toggle dropdown-toggle-nocaret"
            data-bs-toggle="dropdown"
          >
            <div class="parent-icon"><i class="bx bx-home-circle"></i></div>
            <div class="menu-title">Dashboard</div>

            <li class="nav-item">
              <router-link to="/trangchu">
                <a class="nav-link" href="/Admin/trangchu">
                  <div class="parent-icon"></div>
                </a>
              </router-link>
            </li>
          </a>
          <ul class="dropdown-menu">
                        <li> <a class="dropdown-item" href="index.html"><i class="bx bx-right-arrow-alt"></i>Default</a>
                        </li>
                        <li> <a class="dropdown-item" href="index2.html"><i
                                    class="bx bx-right-arrow-alt"></i>Alternate</a>
                        </li>
                        <li> <a class="dropdown-item" href="index3.html"><i
                                    class="bx bx-right-arrow-alt"></i>Graphical</a>
                        </li>
                    </ul>
        </li> -->
        <li class="nav-item">
          <router-link to="/admin/Dashboard">
            <a class="nav-link" href="/admin/Dashboard">
              <div class="parent-icon"></div>
              <div class="menu-title">Dashboard</div>
            </a>
          </router-link>
        </li> 

        <li class="nav-item">
          <router-link to="/admin/lichsugiaodich">
            <a class="nav-link" href="/admin/lichsugiaodich">
              <div class="parent-icon"></div>
              <div class="menu-title">Lịch sử giao dịch</div>
            </a>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/admin/tongquan">
            <a class="nav-link" href="/admin/tongquan">
              <div class="parent-icon"></div>
              <div class="menu-title">Tổng Quan</div>
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/baocao">
            <a class="nav-link" href="/admin/baocao">
              <div class="parent-icon"></div>
              <div class="menu-title">Báo cáo</div>
            </a>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/admin/quanlikhachhang">
            <a class="nav-link" href="/admin/quanlikhachhang">
              <div class="parent-icon"></div>
              <div class="menu-title">Quản Lí Khách Hàng</div>
            </a>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {};
</script>
<style></style>