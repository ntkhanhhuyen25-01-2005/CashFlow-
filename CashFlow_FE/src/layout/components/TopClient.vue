<template>
  <header>
    <div class="topbar d-flex align-items-center">
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
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
                  <span
                    class="position-absolute top-50 search-show translate-middle-y"
                    ><i class="bx bx-search"></i
                  ></span>
                  <span
                    class="position-absolute top-50 search-close translate-middle-y"
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
<style></style>
