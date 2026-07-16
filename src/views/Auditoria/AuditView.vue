<template>
    <div class="layout">
  <div class="bg-layer"></div>
  <div class="bg-dots"></div>

  <aside>
    <div class="sidebar-logo">
      <div class="logo-ph">Logo<br>UCE</div>
      <h2>Voto Electrónico UCE</h2>
      <p>Panel Administrativo</p>
    </div>

    <template v-for="section in sidebarSections" :key="section.title">
      <div class="nav-section">{{ section.title }}</div>
      <nav>
        <a v-for="item in section.items" :key="item.label" :class="{ active: activeRoute === item.label }" @click="setActiveRoute(item.label)">
          {{ item.label }}
          <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
        </a>
      </nav>
    </template>

    <div class="sidebar-footer">
      <div class="admin-chip">
        <div class="admin-av">AD</div>
        <div class="admin-info">Admin. Electoral <span>Tribunal Electoral UCE</span></div>
      </div>
    </div>
  </aside>

  <div class="content">
    <div class="topbar">
      <h1>Dashboard Electoral</h1>
      <div class="topbar-actions">
        <button class="btn-sm ghost" type="button">Exportar reporte</button>
        <button class="btn-sm primary" type="button" @click="setActiveRoute('Elecciones')">+ Nueva Elección</button>
      </div>
    </div>

    <div class="page">
      <div class="alert-bar">
        <svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <p><strong>Proceso electoral activo:</strong> Elecciones UCE 2026 · Cierre en 1h 13min · Supervisión requerida en mesa 8.</p>
      </div>

      <div class="stats-row">
        <article v-for="metric in metrics" :key="metric.label" class="sc" :class="{ hl: metric.highlight }">
          <div class="lbl">{{ metric.label }}</div>
          <div class="val">{{ metric.value }}</div>
          <div class="delta" :class="metric.tone">{{ metric.delta }}</div>
        </article>
      </div>

      <div class="section-hd"><h3>Acciones Rápidas</h3></div>
      <div class="qa-grid">
        <button v-for="action in actions" :key="action.id" class="qa-card" type="button" @click="handleQuickAction(action)">
          <div class="qa-icon" :class="action.tone"></div>
          <div class="qa-text">
            <h4>{{ action.title }}</h4>
            <p>{{ action.description }}</p>
          </div>
        </button>
      </div>

      <div class="section-hd">
        <h3>Procesos Electorales</h3>
        <input v-model="query" class="search-inp" placeholder="Buscar proceso…" type="text" />
      </div>

      <div class="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th>Nombre del proceso</th>
              <th>Facultad</th>
              <th>Fecha</th>
              <th>Participación</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in filteredElections" :key="row.id">
              <td><strong style="color:#fff">{{ row.name }}</strong></td>
              <td>{{ row.faculty }}</td>
              <td>{{ row.date }}</td>
              <td>{{ row.participation }}</td>
              <td><span class="status-pill" :class="row.status"><span class="status-dot"></span>{{ row.status === 'active' ? 'En curso' : row.status === 'pending' ? 'Próximo' : 'Cerrado' }}</span></td>
              <td>
                <div class="tbl-actions">
                  <button class="icon-btn" type="button" title="Ver">👁</button>
                  <button class="icon-btn" type="button" title="Editar">✎</button>
                  <button class="icon-btn danger" type="button" title="Eliminar">🗑</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="section-hd"><h3>Actividad reciente</h3></div>
      <div class="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Servicio</th>
              <th>Evento</th>
              <th>Detalle</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in recentEvents" :key="event.id">
              <td>{{ event.timestamp }}</td>
              <td>{{ event.actor }}</td>
              <td><strong style="color:#fff">{{ event.action }}</strong></td>
              <td>{{ event.detail }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { useAdminPanel } from '../Auditoria/AuditView'

const { query, activeRoute, filteredElections, metrics, actions, recentEvents, sidebarSections, setActiveRoute, handleQuickAction } = useAdminPanel()
</script>

