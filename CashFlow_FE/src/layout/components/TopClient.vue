<template>
  <header>
    <div class="topbar d-flex align-items-center">
      <nav class="navbar navbar-expand-lg navbar-dark custom-topbar">
        <div class="container">
          <a class="navbar-brand" href="#"><b>CashFlow</b></a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent4"
            aria-controls="navbarSupportedContent4"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse d-flex"
            id="navbarSupportedContent4"
          >
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li style="width: 1000px">
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
              </li>
            </ul>
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="#"
                  ><i class="fa-regular fa-user font-22 text-white mt-1"></i
                ></a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link" href="#"
                  ><i class="fa-solid fa-bars font-22 text-white mt-1"></i
                ></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>
<script>
export default {};
</script>
<style scoped>
.custom-topbar {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
  border-radius: 0 0 15px 15px;
  padding: 15px 20px;
}

.custom-topbar .navbar-brand {
  color: white !important;
  font-weight: bold;
  font-size: 1.5rem;
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
  color: #ff6b6b;
  left: 20px; /* Căn phải hơn một chút */
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  pointer-events: none;
  font-size: 16px;
}

.custom-topbar .search-close {
  color: #ff6b6b;
  right: 20px; /* Căn phải hơn một chút */
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
  font-size: 16px;
}

.custom-topbar .nav-link i {
  transition: transform 0.3s ease;
}

.custom-topbar .nav-link:hover i {
  transform: scale(1.2);
}

.navbar-toggler {
  border-color: rgba(255, 255, 255, 0.3);
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
</style>
