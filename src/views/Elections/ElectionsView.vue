<template src="../../html/Elections/ElectionsView.html"></template>

<script setup lang="ts">
import { useResultsView } from '../../typescript/Elections/ElectionsView'

const { lastUpdate, timeRemaining, displayEntries, resultStats, participationTimeline, selectionSummary, ballot, voterProfile, certificateCandidateNames, printCertificate } = useResultsView()
</script>

<style scoped>
.results-shell {
	min-height: 100vh;
	padding: 28px;
	display: grid;
	gap: 20px;
}

.results-header,
.page-header,
.certificate-top,
.certificate-body,
.bottom-grid,
.stats-row,
.countdown-banner {
	display: flex;
	gap: 16px;
}

.results-header,
.page-header,
.certificate-top,
.countdown-banner {
	align-items: center;
	justify-content: space-between;
}

.results-main {
	display: grid;
	gap: 18px;
}

.stats-row {
	flex-wrap: wrap;
}

.stat-card,
.info-card,
.selection-banner,
.countdown-banner,
.certificate-card {
	border: 1px solid rgba(255, 255, 255, 0.12);
	border-radius: 24px;
	background: rgba(255, 255, 255, 0.06);
	backdrop-filter: blur(18px);
}

.stat-card {
	padding: 18px;
	min-width: 180px;
	flex: 1 1 180px;
}

.stat-card .label,
.eyebrow {
	text-transform: uppercase;
	letter-spacing: 0.14em;
	font-size: 0.72rem;
	color: rgba(255, 255, 255, 0.48);
}

.stat-card .value {
	margin-top: 8px;
	font-size: 2rem;
	font-weight: 700;
}

.selection-banner,
.countdown-banner,
.certificate-card,
.info-card {
	padding: 20px;
}

.countdown-banner strong {
	font-size: 1.8rem;
}

.certificate-top h3,
.section-title h3,
.info-card h4 {
	margin: 0;
	font-family: 'Playfair Display', serif;
}

.print-button {
	border: none;
	border-radius: 14px;
	padding: 12px 18px;
	background: linear-gradient(135deg, var(--blue), var(--sky));
	color: white;
	cursor: pointer;
	font-weight: 700;
}

.certificate-body {
	align-items: center;
	margin-top: 18px;
}

.certificate-seal {
	width: 76px;
	height: 76px;
	border-radius: 50%;
	display: grid;
	place-items: center;
	background: rgba(14, 159, 110, 0.16);
	color: #7df1c7;
	font-size: 2rem;
	flex-shrink: 0;
}

.certificate-copy p {
	margin: 8px 0;
}

.bottom-grid {
	flex-wrap: wrap;
}

.bottom-grid > .info-card {
	flex: 1 1 360px;
}

.timeline,
.results-list.compact {
	display: grid;
	gap: 12px;
}

.result-row {
	display: grid;
	grid-template-columns: 56px 1fr auto;
	align-items: center;
	gap: 14px;
	padding: 14px;
	border-radius: 18px;
	background: rgba(255, 255, 255, 0.05);
}

.r-pos {
	width: 44px;
	height: 44px;
	border-radius: 50%;
	display: grid;
	place-items: center;
	background: rgba(255, 255, 255, 0.08);
	font-weight: 700;
}

.r-name {
	font-weight: 700;
}

.r-party,
.certificate-footer,
.info-card p,
.countdown-banner p,
.selection-banner,
.last-update {
	color: rgba(255, 255, 255, 0.72);
}

.results-footer {
	padding: 8px 4px 18px;
	color: rgba(255, 255, 255, 0.45);
	text-align: center;
}

@media print {
	.results-shell {
		padding: 0;
		background: white;
		color: black;
	}

	.results-header,
	.page-header,
	.stats-row,
	.countdown-banner,
	.bottom-grid,
	.selection-banner,
	.results-footer {
		display: none !important;
	}

	.certificate-card {
		border: none;
		box-shadow: none;
		background: white;
		color: black;
	}

	.print-button {
		display: none;
	}
}

@media (max-width: 900px) {
	.results-shell {
		padding: 16px;
	}

	.results-header,
	.page-header,
	.certificate-top,
	.certificate-body,
	.countdown-banner {
		flex-direction: column;
		align-items: flex-start;
	}

	.result-row {
		grid-template-columns: 44px 1fr;
	}
}
</style>