<template>
  <div class="results-shell">
    <div class="bg-layer"></div>
    <div class="bg-dots"></div>

    <header class="results-header">
      <div class="logo-ph">Logo<br>UCE</div>
      <div class="h-title">
        <h1>Universidad Central del Ecuador</h1>
        <p>Sistema de Voto Electrónico · Resultados</p>
      </div>
      <div class="live-badge"><div class="live-dot"></div> En vivo</div>
    </header>

    <main class="results-main">
      <div class="page-header">
        <div>
          <h2>Resultados Electorales 2026</h2>
          <p>Elecciones de Gobierno Estudiantil · Facultad de Ing. y Ciencias Aplicadas</p>
        </div>
        <div class="last-update">↻ {{ lastUpdate }}</div>
      </div>

      <div class="stats-row">
        <article v-for="stat in resultStats" :key="stat.label" class="stat-card" :class="{ accent: stat.accent }">
          <div class="label">{{ stat.label }}</div>
          <div class="value">{{ stat.value }}</div>
          <div class="sub">{{ stat.subtext }}</div>
        </article>
      </div>

      <div class="section-title">
        <h3>Resultados por Cargo</h3>
        <div class="line"></div>
      </div>

      <div class="tab-row">
        <button v-for="(tab, index) in resultTabs" :key="tab" class="tab" :class="{ active: activeTab === index }" type="button" @click="setTab(index)">{{ tab }}</button>
      </div>

      <div class="results-list">
        <article v-for="entry in displayEntries" :key="entry.id" class="result-row" :class="{ winner: entry.highlighted }">
          <div class="r-pos">{{ entry.position }}</div>
          <div class="r-main">
            <div class="r-name">{{ entry.name }} <span v-if="entry.highlighted" class="crown">👑</span></div>
            <div class="r-party">{{ entry.party }}</div>
            <div class="bar-wrap"><div class="bar-fill" :style="{ width: `${entry.percentage}%` }"></div></div>
          </div>
          <div class="r-votes">
            <div class="pct">{{ entry.percentage }}%</div>
            <div class="abs">{{ entry.votes.toLocaleString('es-EC') }} votos</div>
          </div>
        </article>
      </div>

      <div class="bottom-grid">
        <section class="info-card">
          <h4>Participación Electoral</h4>
          <div class="donut-wrap">
            <svg class="donut-svg" width="110" height="110" viewBox="0 0 110 110">
              <circle cx="55" cy="55" r="40" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="16"/>
              <circle cx="55" cy="55" r="40" fill="none" stroke="url(#dg)" stroke-width="16" stroke-dasharray="251.4 376" stroke-dashoffset="94" stroke-linecap="round" transform="rotate(-90 55 55)"/>
              <defs><linearGradient id="dg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#2f7ec7"/><stop offset="100%" stop-color="#5ba8e0"/></linearGradient></defs>
              <text x="55" y="51" text-anchor="middle" font-family="Playfair Display,serif" font-size="16" fill="white">67.4%</text>
              <text x="55" y="65" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8" fill="rgba(255,255,255,.4)">participación</text>
            </svg>
            <div class="donut-legend">
              <div class="legend-item"><span class="legend-dot sky"></span>Votaron: 3,241</div>
              <div class="legend-item"><span class="legend-dot muted"></span>No han votado: 1,571</div>
              <div class="legend-item"><span class="legend-dot green"></span>Votos válidos: 3,107</div>
              <div class="legend-item"><span class="legend-dot gold"></span>En blanco: 134</div>
            </div>
          </div>
        </section>

        <section class="info-card">
          <h4>Línea de Tiempo Electoral</h4>
          <div class="timeline">
            <div v-for="item in participationTimeline" :key="item.id" class="tl-item">
              <div class="tl-dot" :class="item.tone"></div>
              <div class="tl-text">
                <strong>{{ item.title }}</strong>
                {{ item.detail }}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <footer class="results-footer">© 2026 Universidad Central del Ecuador · Resultados parciales sujetos a verificación oficial</footer>
  </div>
</template>

<script setup lang="ts">
import { useResultsView } from './ElectionsView'

const { activeTab, lastUpdate, displayEntries, resultStats, resultTabs, participationTimeline, setTab } = useResultsView()
</script>

<style src="./ElectionsView.css"></style>
