<template>
  <div class="app-shell">
    <div class="content-area">
      <header class="topbar">
        <div class="account-chip" v-if="profileName">
          <img class="account-avatar" :src="profileAvatarSrc" :alt="`Foto de ${profileName}`" />
          <div class="account-copy">
            <strong>{{ profileName }}</strong>
          </div>
          <RouterLink class="account-logout" to="/login">Salir</RouterLink>
        </div>
        <div>
          <img src="@/assets/Logo.png" alt="Sisve logo" width="120" height="40" />
        
          <p class="eyebrow">Sisve platform</p>
          
        </div>
        <!-- <RouterLink class="cta-button" to="/results">Ir a resultados</RouterLink> -->
      </header>

      <main class="page-body">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getStoredSession } from '@/services/session'

const profileName = computed(() => getStoredSession()?.user.fullName ?? 'Invitado')

function createAvatarDataUri(name: string) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('') || 'U'

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1a4fa0" />
          <stop offset="100%" stop-color="#2f7ec7" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#g)" />
      <circle cx="60" cy="46" r="22" fill="rgba(255,255,255,0.92)" />
      <path d="M28 100c8-20 24-30 32-30s24 10 32 30" fill="rgba(255,255,255,0.92)" />
      <text x="60" y="69" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#ffffff">${initials}</text>
    </svg>
  `.trim()

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

const profileAvatarSrc = computed(() => createAvatarDataUri(profileName.value))
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: block;
}

.content-area {
  min-width: 0;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(7, 16, 34, 0.38);
  backdrop-filter: blur(18px);
}

.account-chip {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 240px;
  padding: 10px 12px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.account-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  flex-shrink: 0;
}

.account-copy {
  display: grid;
  gap: 2px;
}

.account-logout {
  margin-left: auto;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.8rem;
  font-weight: 700;
  white-space: nowrap;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.48);
}

.page-body {
  min-height: calc(100vh - 84px);
}

@media (max-width: 960px) {
  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
