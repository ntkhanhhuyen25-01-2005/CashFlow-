<template>
  <div class="login-wrapper min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div class="card shadow-lg border-0 rounded-4 p-4" style="max-width: 420px; width: 100%;">
      <div class="text-center mb-4">
        <!-- <img src="/logo.png" alt="Logo" style="width: 70px;" class="mb-3" /> -->
        <h3 class="fw-bold text-primary">Đăng nhập Admin</h3>
        <p class="text-muted small">Vui lòng nhập thông tin để tiếp tục</p>
      </div>

      <form @submit.prevent="DangNhap()">
        <div class="mb-3">
          <label class="form-label fw-semibold">Email</label>
          <input 
            v-model="user.email" 
            type="email" 
            class="form-control rounded-3" 
            placeholder="Nhập email của bạn" 
            required 
          />
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">Mật khẩu</label>
          <div class="input-group">
            <input 
              v-model="user.password"
              :type="showPassword ? 'text' : 'password'" 
              class="form-control rounded-start-3 border-end-0"
              placeholder="Nhập mật khẩu" 
              required 
            />
            <span 
              class="input-group-text bg-white rounded-end-3" 
              style="cursor:pointer" 
              @click="showPassword = !showPassword"
            >
              <i class="bx" :class="showPassword ? 'bx-hide' : 'bx-show'"></i>
            </span>
          </div>
        </div>

        <div class="d-grid mt-4">
          <button type="submit" class="btn btn-primary rounded-3 fw-semibold">
            Đăng nhập
          </button>
        </div>

        <div class="text-center mt-3">
          <a href="#" class="small text-decoration-none text-primary">Quên mật khẩu?</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import baseRequestAdmin from '../../../core/baseRequestAdmin.js';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      showPassword: false,
    }
  },
  methods: {
    DangNhap() {
      baseRequestAdmin.post('admin/login', this.user)
        .then((res) => {
          if (res.data.status) {
            toaster.success(res.data.message)
            this.user = {};
            localStorage.setItem('token_admin', res.data.token);
            this.$router.push('/admin/Dashboard');
          } else {
            toaster.error(res.data.message);
          }
        })
        .catch((err) => {
          const listErr = err.response.data.errors;
          Object.values(listErr).forEach((error) => {
            toaster.error(error[0]);
          });
        });
    }
  }
}
</script>
