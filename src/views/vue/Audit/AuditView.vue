<template src="../../html/Audit/AuditView.html"></template>

<script setup lang="ts">
import { useAdminPanel } from '../../typescript/Audit/AuditView'

const { query, activeRoute, filteredElections, metrics, actions, recentEvents, sidebarSections, setActiveRoute, handleQuickAction } = useAdminPanel()
</script>