<template>
    <div class="login-wrapper">
        <div class="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
            <div class="container-fluid">
                <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
                    <div class="col mx-auto">
                        <div class="mb-4 text-center">
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <div class="border p-4 rounded">
                                    <div class="text-center">
                                        <h3 class="">Đăng nhập Admin</h3>
                                    </div>
                                    <div class="form-body">
                                        <form class="row g-3">
                                            <div class="col-12">
                                                <label class="form-label">Email</label>
                                                <input v-model="user.email" type="email" class="form-control"
                                                    required />
                                            </div>
                                            <div class="col-12">
                                                <label class="form-label">Mật khẩu</label>
                                                <div class="input-group">
                                                    <input v-model="user.password"
                                                        :type="showPassword ? 'text' : 'password'"
                                                        class="form-control border-end-0" required />
                                                    <span class="input-group-text bg-transparent"
                                                        @click="showPassword = !showPassword">
                                                        <i class="bx" :class="showPassword ? 'bx-hide' : 'bx-show'"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="d-grid">
                                                    <button v-on:click="DangNhap()" type="button"
                                                        class="btn btn-primary">
                                                        Đăng nhập
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                        localStorage.setItem('token_admin',res.data.token);
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
