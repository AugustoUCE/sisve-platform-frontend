<template src="../html/AuditView.html"></template>

<script setup lang="ts">
import { useAdminPanel } from '../typescript/AuditView'

const { query, activeRoute, filteredElections, metrics, actions, recentEvents, sidebarSections, setActiveRoute, handleQuickAction } = useAdminPanel()
</script>