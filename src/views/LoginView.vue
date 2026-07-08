<template>
  <div class="login-shell">
    <div class="bg-layer"></div>
    <div class="bg-dots"></div>
    <div class="bg-accent"></div>
    <div class="bg-accent2"></div>

    <header>
      <div class="logo-placeholder">Logo<br>UCE</div>
      <div class="header-text">
        <h1>{{ loginTitle }}</h1>
        <p>{{ loginSubtitle }}</p>
      </div>
      <div class="header-badge">Sistema Activo</div>
    </header>

    <main>
      <div class="card">
        <div class="card-stripe">
          <div class="stripe-line"></div>
          <div class="stripe-icon">
            <svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2"/><polyline points="9 11 11 13 15 9"/><line x1="9" y1="16" x2="15" y2="16"/></svg>
          </div>
          <div class="stripe-line"></div>
        </div>

        <h2>Iniciar Sesión</h2>
        <p class="subtitle">{{ loginHint }}</p>

        <form @submit.prevent="submitLogin">
          <div class="field">
            <label>Cédula</label>
            <div class="input-wrap">
              <span class="icon">
                <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8" cy="10" r="1.5"/><circle cx="12" cy="10" r="1.5"/><circle cx="16" cy="10" r="1.5"/><path d="M7 15h10"/></svg>
              </span>
              <input v-model="form.cedula" type="text" placeholder="1712345678" autocomplete="username" />
            </div>
          </div>

          <div class="field">
            <label>Correo institucional</label>
            <div class="input-wrap">
              <span class="icon">
                <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </span>
              <input v-model="form.correoInstitucional" type="email" placeholder="usuario@uce.edu.ec" autocomplete="email" />
            </div>
          </div>

          <div class="options-row">
            <label class="remember">
              <input v-model="form.remember" type="checkbox" />
              <span class="custom-check"></span>
              <span>Recordar sesión</span>
            </label>
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>

          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

          <button class="btn-primary" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Ingresando…' : 'Ingresar al Sistema' }}
          </button>
        </form>
      </div>
    </main>

    <footer>
      © 2026 Universidad Central del Ecuador · <a href="#">Política de privacidad</a> · <a href="#">Soporte técnico</a>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { loginHint, loginSubtitle, loginTitle, useLoginForm } from './LoginView'

const router = useRouter()
const { form, isSubmitting, errorMessage, submitLogin } = useLoginForm(router)
</script>

<style src="./LoginView.css"></style>
