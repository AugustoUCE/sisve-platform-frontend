<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">S</div>
        <div>
          <strong>SISVE</strong>
          <span>Plataforma de voto</span>
        </div>
      </div>

      <nav class="nav-links">
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <RouterLink to="/elections">Elecciones</RouterLink>
        <RouterLink to="/vote">Votar</RouterLink>
        <RouterLink to="/audit">Auditoría</RouterLink>
        <RouterLink to="/login">Salir</RouterLink>
      </nav>

      <section class="sidebar-card">
        <p class="eyebrow">Estado</p>
        <h3>Backend en fase base</h3>
        <p>Los servicios Quarkus todavía exponen un punto de prueba, así que esta interfaz deja listo el flujo por módulos.</p>
      </section>
    </aside>

    <div class="content-area">
      <header class="topbar">
        <div>
          <p class="eyebrow">Sisve platform</p>
          <h1>Centro operativo</h1>
        </div>
        <RouterLink class="cta-button" to="/vote">Ir a votar</RouterLink>
      </header>

      <main class="page-body">
        <RouterView />
      </main>
    </div>
  </div>
</template>
