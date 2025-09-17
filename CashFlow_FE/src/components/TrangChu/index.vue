<template>
  <div class="container-fluid p-0">
    <!-- Top: Header riêng của trang chủ -->
    <header class="top-home">
      <div class="top-home__container">
        <div class="brand" @click="$router.push('/')">
          <img class="logo" src="https://play-lh.googleusercontent.com/oIYzM27-Lax7Zkg4grAxxLYRQkxHrs1osx0Qbf-jADQNpv9400yo0qYcLzDn-Qz2M8A" alt="Logo" />
          <span class="title">CashFlow</span>
        </div>
        <nav class="nav"></nav>
      </div>
    </header>

    <section class="hero position-relative">
      <!-- Decorative -->
      <span class="blob blob-1" aria-hidden="true"></span>
      <span class="blob blob-2" aria-hidden="true"></span>
      <span class="blob blob-3" aria-hidden="true"></span>
      <span class="hero__grid" aria-hidden="true"></span>
      <div class="hero__overlay" aria-hidden="true"></div>

      <!-- Content -->
      <div class="hero__content text-center">
        <div class="hero__glass shadow-lg">
          <span class="badge rounded-pill bg-primary-subtle text-primary-emphasis fw-semibold mb-3 px-3 py-2">
            <h5 class="text-white">CashFlow • Quản lý tài chính</h5>
          </span>

          <h1 class="hero__title">
            Chào mừng bạn đến <span class="text-primary">CashFlow</span>
          </h1>
          <p class="hero__subtitle">
           <h5 class="text-white">Nắm bắt dòng tiền của bạn một cách thông minh và thanh lịch.</h5>
          </p>

          <div class="hero__actions">
            <router-link
              to="/client-login"
              class="btn btn-primary btn-lg px-4 rounded-5 shadow-sm hero__btn"
              aria-label="Đăng nhập vào hệ thống"
            >
              Đăng Nhập
            </router-link>

            <router-link
              to="/client/DangKy"
              class="btn btn-outline-light btn-lg px-4 rounded-5 shadow-sm border-2 hero__btn hero__btn--ghost"
              aria-label="Xem nhanh Dashboard"
            >
              Đăng Ký
            </router-link>
          </div>

          <div class="hero__meta mt-3 text-secondary small">
            <h6 class="text-white">Bảo mật dữ liệu • Báo cáo theo thời gian thực • Trải nghiệm mượt mà</h6>
          </div>
        </div>
      </div>
    </section>
    <!-- Bottom: Footer riêng của trang chủ -->
    <footer class="bot-home mt-5"> 
      <div class="bot-home__container">
        <span>© 2025 CashFlow. All rights reserved.</span>
        <div>
          <a href="#" class="me-3">Chính sách bảo mật</a>
          <a href="#" class="me-3">Điều khoản dịch vụ</a>
          <a href="#">Liên hệ</a>
        </div>
        <router-link
              to="/admin"
              class="btn btn-primary btn-lg px-4 rounded-5 shadow-sm hero__btn"
              aria-label="Đăng nhập vào hệ thống"
            >
              Đăng Nhập Admin
            </router-link>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "AdminTrangChu",
};
</script>

<style>
/* =======================
   Font: Times New Roman
   ======================= */
:root{
  --app-font: "Times New Roman", Times, "Liberation Serif", "Nimbus Roman", "Noto Serif", serif;
  --hero-radius: 20px;
  --hero-pad-x: 24px;
  --hero-pad-y: 72px;
  --glass-bg: rgba(255,255,255,.35);
  --glass-border: rgba(255,255,255,.55);
  --overlay-top: rgba(255,255,255,.22);
  --overlay-bottom: rgba(255,255,255,.75);
}

/* Áp dụng font toàn cục (Bootstrap sẽ kế thừa) */
html, body, #app, .container-fluid {
  font-family: var(--app-font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.45;
}

/* Một số component Bootstrap cần nhấn mạnh kế thừa font */
.btn, .badge, .form-control, .nav, .dropdown-menu, .modal, .tooltip {
  font-family: inherit;
}

@media (prefers-color-scheme: dark){
  :root{
    --glass-bg: rgba(18,18,18,.45);
    --glass-border: rgba(255,255,255,.15);
    --overlay-top: rgba(0,0,0,.15);
    --overlay-bottom: rgba(0,0,0,.6);
  }
}

/* ===== Top header ===== */
.top-home{ position: sticky; top: 0; z-index: 10; background: rgba(10,16,32,.7); backdrop-filter: blur(8px); border-bottom: 1px solid #1b2540; }
.top-home__container{ display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; max-width: 1160px; margin: 0 auto; }
.brand{ display: inline-flex; align-items: center; gap: 10px; cursor: pointer; }
.logo{ width: 28px; height: 28px; }
.title{ color: #e6e8ee; font-weight: 700; letter-spacing: .2px; } /* giảm letter-spacing cho serif */

/* ===== Hero ===== */
.hero{
  position: relative;
  min-height: 64vh;
  border-radius: var(--hero-radius);
  margin: 12px;
  background:
    radial-gradient(1200px 600px at 10% 10%, rgba(13,110,253,.18), transparent 60%),
    radial-gradient(900px 500px at 90% 20%, rgba(25,135,84,.18), transparent 60%),
    radial-gradient(800px 600px at 20% 90%, rgba(255,193,7,.20), transparent 60%),
    url('../../assets/images/login-images/bg-login-img.jpg') center/cover no-repeat;
  overflow: hidden;
  isolation: isolate;
}
@media (min-width: 768px){
  .hero{ min-height: 72vh; }
}

/* Soft overlay for readability */
.hero__overlay{
  position: absolute; inset: 0;
  background: linear-gradient(180deg, var(--overlay-top), var(--overlay-bottom));
  z-index: 0;
}

/* Subtle grid to add depth */
.hero__grid{
  position: absolute; inset: -2px; z-index: 0; opacity: .18;
  background-image:
    linear-gradient(to right, rgba(255,255,255,.25) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,.25) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(70% 70% at 50% 50%, #000 40%, transparent 100%);
}

/* Content wrapper */
.hero__content{
  position: relative;
  z-index: 1;
  padding: var(--hero-pad-y) var(--hero-pad-x);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  height: 100%;
}

/* Glass card */
.hero__glass{
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 22px;
  padding: 32px 28px 36px;
  max-width: 920px;
  width: min(92%, 920px);
  margin-inline: auto;
}

/* Typography (tinh chỉnh cho serif) */
.hero__title{
  font-family: var(--app-font);
  font-weight: 700;
  /* to hơn + responsive */
  font-size: clamp(33px, 7vw, 70px);
  line-height: 1.1;
  letter-spacing: 0;
  margin: 0 0 10px;
  color: #111;
}

/* Tùy chọn: rất to trên màn hình lớn */
@media (min-width: 1200px){
  .hero__title{ font-size: 80px; }
}

.hero__subtitle{
  font-family: var(--app-font);
  font-size: clamp(15px, 2.2vw, 18.5px);
  color: #343a40;
  margin: 0;
  opacity: .95;
}

/* Buttons */
.hero__actions{
  margin-top: 22px;
  display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
}
.hero__btn{
  transition: transform .2s ease, box-shadow .2s ease, background-color .2s ease, border-color .2s ease;
  will-change: transform;
  font-family: inherit;
}
.hero__btn:hover{
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(0,0,0,.12);
}
.hero__btn:focus-visible{
  outline: 3px solid rgba(13,110,253,.45);
  outline-offset: 2px;
  box-shadow: 0 0 0 .25rem rgba(13,110,253,.25);
}
.hero__btn--ghost{
  backdrop-filter: blur(2px);
}

/* Meta line */
.hero__meta{
  opacity: .8;
}

/* Animated blobs */
.blob{ position: absolute; filter: blur(28px); opacity:.55; border-radius: 50%; }
.blob-1{ width: 220px; height: 220px; background:#0d6efd; left:6%; top:14%; animation: float 10s ease-in-out infinite; }
.blob-2{ width: 180px; height: 180px; background:#198754; right:8%; top:10%; animation: float 12s ease-in-out infinite reverse; }
.blob-3{ width: 160px; height: 160px; background:#ffc107; left:18%; bottom:6%; animation: float 14s ease-in-out infinite; }

@keyframes float{ 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-12px) } }

/* Respect user motion preferences */
@media (prefers-reduced-motion: reduce){
  .blob-1, .blob-2, .blob-3{ animation: none; }
  .hero__btn{ transition: none; }
}

/* Dark-mode polish */
@media (prefers-color-scheme: dark){
  .hero__title{ color: #f8f9fa; }
  .hero__subtitle{ color: #dee2e6; opacity: .9; }
  .hero__grid{ opacity: .14; }
}

/* ===== Bottom footer ===== */
.bot-home{ border-top: 1px solid #1b2540; background: #0f172a; color: #8f9fc7; }
.bot-home__container{ max-width: 1160px; margin: 0 auto; padding: 18px 20px; display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
.bot-home a{ color: #9ec1ff; text-decoration: none; cursor: pointer; }
.bot-home a:hover{ text-decoration: underline; }
</style>
