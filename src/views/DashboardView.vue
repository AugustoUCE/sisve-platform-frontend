<template>
  <div class="dashboard-shell">
    <section class="hero-panel">
      <div>
        <p class="eyebrow">Dashboard Votante</p>
        <h2>{{ dashboardTitle }}</h2>
        <p>{{ dashboardSubtitle }}</p>
      </div>
      <div class="hero-metric">
        <span>Tiempo restante de sesión:</span>
        <strong>{{ timerText }}</strong>
      </div>
    </section>

    <div class="election-meta">
      <div class="meta-pill" v-for="meta in dashboardMeta" :key="meta">{{ meta }}</div>
    </div>

    <div class="tabs">
      <button v-for="(tab, index) in dashboardTabs" :key="tab" class="tab" :class="{ active: selectedTab === index }" type="button" @click="setTab(index)">{{ tab }}</button>
    </div>

    <section class="candidates">
      <article
        v-for="candidate in voterCandidates"
        :key="candidate.id"
        class="c-card"
        :class="{ selected: selectedCandidate === candidate.id }"
        @click="selectCandidate(candidate.id as number)"
      >
        <div class="c-number">{{ candidate.id }}</div>
        <div class="c-avatar">{{ candidate.avatar }}</div>
        <div class="c-name">{{ candidate.name }}</div>
        <div class="c-party">{{ candidate.party }}</div>
        <div class="c-desc">{{ candidate.description }}</div>
        <div class="c-tags"><span v-for="tag in candidate.tags" :key="tag" class="c-tag">{{ tag }}</span></div>
        <div class="selected-badge">✓ Candidato seleccionado</div>
      </article>
    </section>

    <div class="blank-row" @click="selectBlank">
      <input type="radio" name="vote" :checked="selectedCandidate === 'blank'" readonly />
      <p><strong>Voto en blanco</strong> — Puedes ejercer tu derecho sin elegir ningún candidato.</p>
    </div>

    <section class="confirm-panel">
      <div class="confirm-text">
        <h3>Continúa a verificación</h3>
        <p>Seleccionado: <strong>{{ selectedName }}</strong></p>
      </div>
      <button class="btn-vote" type="button" :disabled="!voteEnabled" @click="emitVote">Ir a verificación →</button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { dashboardMeta, dashboardSubtitle, dashboardTabs, dashboardTitle, useVoterBoard } from './DashboardView'

const router = useRouter()
const { selectedTab, selectedCandidate, timerText, selectedName, voteEnabled, setTab, selectCandidate, selectBlank, emitVote, voterCandidates } = useVoterBoard(router)
</script>

<style src="./DashboardView.css"></style>
