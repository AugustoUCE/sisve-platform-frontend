<template>
  <div class="verify-shell">
    <div class="bg-layer"></div>
    <div class="bg-dots"></div>

    <header class="verify-header">
      <div class="logo-ph">Logo<br>UCE</div>
      <div class="h-title">
        <h1>{{ biometricTitle }}</h1>
        <p>{{ biometricSubtitle }}</p>
      </div>
    </header>

    <main class="verify-main">
      <div class="steps-bar">
        <div v-for="step in steps" :key="step.id" class="step">
          <div class="step-circle" :class="step.state">{{ step.state === 'done' ? '✓' : step.id }}</div>
          <div class="step-label" :class="step.state === 'current' ? 'active' : ''">{{ step.label }}</div>
        </div>
      </div>

      <div class="panel">
        <div class="two-col">
          <section class="card">
            <div class="section-tag">
              <svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
              Datos del votante
            </div>
            <h2>Información Personal</h2>
            <p class="sub">Ingresa tus datos institucionales. Serán cruzados con el resultado del escaneo facial.</p>

            <div class="row2">
              <label class="field">
                <span>Número de cédula</span>
                <div class="inp-wrap">
                  <svg class="fi" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                  <input v-model="form.cedula" type="text" placeholder="1712345678" maxlength="10" />
                </div>
              </label>
              <label class="field">
                <span>Código de estudiante</span>
                <div class="inp-wrap">
                  <svg class="fi" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input v-model="form.codigo" type="text" placeholder="2021XXXXXX" />
                </div>
              </label>
            </div>

            <label class="field">
              <span>Facultad</span>
              <div class="inp-wrap">
                <svg class="fi" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                <select v-model="form.facultad">
                  <option value="">Seleccionar…</option>
                  <option>Ingeniería y Ciencias Aplicadas</option>
                  <option>Ciencias Administrativas</option>
                  <option>Jurisprudencia</option>
                  <option>Ciencias Médicas</option>
                  <option>Filosofía y Letras</option>
                  <option>Ciencias Económicas</option>
                </select>
              </div>
            </label>

            <label class="field">
              <span>Correo institucional</span>
              <div class="inp-wrap">
                <svg class="fi" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <input v-model="form.correo" type="email" placeholder="usuario@uce.edu.ec" />
              </div>
            </label>

            <div class="bio-steps-label">Estado del escaneo biométrico</div>
            <div class="bio-steps">
              <div v-for="step in steps" :key="step.id" class="bsi" :class="step.state">
                <div class="bsi-icon">{{ step.state === 'done' ? '✓' : step.id }}</div>
                <div class="bsi-text">{{ step.label }}</div>
              </div>
            </div>
          </section>

          <section class="face-card">
            <div class="section-tag">
              <svg viewBox="0 0 24 24"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
              Reconocimiento Facial
            </div>
            <h2>Escaneo Biométrico</h2>
            <p class="sub">Centra tu rostro dentro del óvalo y mantén una expresión neutra.</p>

            <div class="cam-vp">
              <video ref="videoEl" id="video" autoplay playsinline muted></video>

              <div class="oval-overlay">
                <svg viewBox="0 0 200 260" fill="none">
                  <ellipse cx="100" cy="130" rx="85" ry="115" stroke="rgba(47,126,199,.55)" stroke-width="2" stroke-dasharray="9 5" />
                  <ellipse cx="100" cy="130" rx="85" ry="115" stroke="rgba(47,126,199,.1)" stroke-width="14" />
                </svg>
              </div>

              <div class="scan-line" :class="{ on: scanLineVisible }"></div>

              <div class="bracket br-tl"></div>
              <div class="bracket br-tr"></div>
              <div class="bracket br-bl"></div>
              <div class="bracket br-br"></div>

              <div class="ring-wrap" :class="{ on: ringVisible }">
                <svg class="ring-svg" width="88" height="88" viewBox="0 0 88 88">
                  <circle class="ring-bg" cx="44" cy="44" r="40" />
                  <circle class="ring-fg" cx="44" cy="44" r="40" :style="{ strokeDashoffset: 251 - 2.51 * ringProgress }" />
                </svg>
                <div class="ring-pct"><span>{{ ringProgress }}</span>%<small>analizando</small></div>
              </div>

              <div class="success-ov" :class="{ on: successVisible }">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="8 12 11 15 16 9" />
                </svg>
                <strong>¡Identidad Verificada!</strong>
                <span>Juan Jarteaga · Ing. Sistemas 2021</span>
              </div>

              <div class="error-ov" :class="{ on: errorVisible }">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15"/></svg>
                <strong>No se pudo verificar</strong>
                <span>{{ errorMessage }}</span>
              </div>

              <div class="cam-status">
                <div class="sdot" :class="currentStatusClass"></div>
                <p class="stxt">{{ cameraStatus }}</p>
              </div>
            </div>

            <div class="instr-box"><p v-html="instruction"></p></div>

            <div class="cam-btns">
              <button class="btn-cam btn-start" type="button" :disabled="!canScan" @click="startScan">{{ startButtonText }}</button>
              <button v-if="retryVisible" class="btn-cam btn-retry" type="button" @click="resetScan">↺ Reintentar</button>
            </div>

            <div class="priv-note">
              <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <p>Las imágenes se procesan localmente. Solo el vector biométrico cifrado (AES-256) se envía al servidor para validación contra el padrón electoral.</p>
            </div>
          </section>
        </div>

        <div class="btn-row">
          <button class="btn-s" type="button" @click="backToLogin">← Atrás</button>
          <button class="btn-p" type="button" :disabled="!continueEnabled" @click="confirmVote">Confirmar voto →</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { biometricSubtitle, biometricTitle, useBiometricFlow } from './VoteView'

const router = useRouter()
const { form, videoEl, steps, cameraStatus, instruction, scanLineVisible, ringVisible, ringProgress, successVisible, errorVisible, errorMessage, startButtonText, retryVisible, canScan, continueEnabled, currentStatusClass, startScan, resetScan, confirmVote, backToLogin } = useBiometricFlow(router)
</script>

<style src="./VoteView.css"></style>
