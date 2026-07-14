<template src="../../html/Vote/DashboardView.html"></template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { dashboardMeta, dashboardSubtitle, dashboardTabs, dashboardTitle, useVoterBoard } from '../../typescript/Vote/DashboardView'

const router = useRouter()
const { selectedTab, voterProfile, timerText, selectedName, selectedLabel, canSubmit, setTab, selectCandidate, isCandidateSelected, selectBlank, clearBlankVote, submitCurrentBallot, visibleCandidates, nullVoteSelected } = useVoterBoard(router)
</script>

<style scoped>
.dashboard-shell {
	display: grid;
	gap: 20px;
	padding: 28px;
}

.hero-panel,
.dashboard-subbar,
.vote-banner,
.c-card,
.null-vote-card {
	border: 1px solid rgba(255, 255, 255, 0.12);
	border-radius: 24px;
	background: rgba(255, 255, 255, 0.06);
	backdrop-filter: blur(18px);
}

.hero-panel {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 16px;
	padding: 28px;
}

.hero-copy h2 {
	margin: 8px 0;
	font-family: 'Playfair Display', serif;
	font-size: clamp(2rem, 3vw, 3rem);
}

.hero-copy p,
.profile-copy p,
.dashboard-subbar span,
.dashboard-subbar strong,
.vote-banner p,
.c-desc,
.c-party,
.null-vote-card p {
	color: rgba(255, 255, 255, 0.72);
}

.profile-card {
	display: flex;
	gap: 14px;
	align-items: center;
	min-width: 240px;
	padding: 14px 16px;
	border-radius: 18px;
	background: rgba(13, 43, 94, 0.55);
	border: 1px solid rgba(255, 255, 255, 0.12);
}

.profile-avatar {
	width: 48px;
	height: 48px;
	border-radius: 16px;
	display: grid;
	place-items: center;
	background: linear-gradient(135deg, var(--sky), var(--blue));
	font-weight: 700;
}

.eyebrow {
	text-transform: uppercase;
	letter-spacing: 0.12em;
	font-size: 0.72rem;
	color: rgba(255, 255, 255, 0.45);
}

.dashboard-subbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 16px;
	padding: 16px 20px;
}

.election-meta {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
}

.meta-pill {
	padding: 10px 14px;
	border-radius: 999px;
	background: rgba(255, 255, 255, 0.08);
	border: 1px solid rgba(255, 255, 255, 0.08);
}

.tabs {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
}

.tab,
.vote-banner-btn,
.btn-card {
	border: none;
	border-radius: 14px;
	cursor: pointer;
	transition: transform 0.15s ease, filter 0.15s ease, opacity 0.15s ease, background 0.15s ease, color 0.15s ease;
}

.tab {
	padding: 12px 16px;
	background: rgba(255, 255, 255, 0.08);
	color: white;
}

.tab.active {
	background: linear-gradient(135deg, var(--blue), var(--sky));
}

.vote-banner {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 16px;
	padding: 18px 20px;
}

.vote-banner.active {
	border-color: rgba(14, 159, 110, 0.55);
	box-shadow: 0 0 0 1px rgba(14, 159, 110, 0.18) inset;
}

.vote-banner-btn,
.btn-card.btn-primary {
	padding: 12px 18px;
	color: white;
	background: linear-gradient(135deg, #7ee0ad, var(--green));
	font-weight: 700;
}

.vote-banner.active .vote-banner-btn,
.btn-card.btn-primary:hover {
	background: linear-gradient(135deg, #8be7b7, #20a96f);
}

.vote-banner-btn:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

.candidates {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	gap: 18px;
}

.c-card {
	padding: 20px;
	display: grid;
	gap: 12px;
	min-height: 100%;
	cursor: pointer;
}

.c-card.selected,
.null-vote-card.selected {
	border-color: rgba(47, 126, 199, 0.6);
	box-shadow: 0 0 0 1px rgba(47, 126, 199, 0.18) inset, 0 24px 50px rgba(0, 0, 0, 0.25);
}

.c-number {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	display: grid;
	place-items: center;
	background: rgba(255, 255, 255, 0.1);
	font-weight: 700;
}

.c-avatar {
	font-size: 2rem;
}

.c-name {
	font-family: 'Playfair Display', serif;
	font-size: 1.25rem;
	transition: color 0.15s ease, filter 0.15s ease;
}

.c-card:hover .c-name {
	color: rgba(255, 255, 255, 0.98);
	filter: brightness(1.12);
}

.c-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}

.c-tag {
	padding: 6px 10px;
	border-radius: 999px;
	background: rgba(255, 255, 255, 0.08);
	font-size: 0.78rem;
}

.selected-badge {
	padding: 10px 12px;
	border-radius: 14px;
	background: rgba(255, 255, 255, 0.08);
	color: rgba(255, 255, 255, 0.7);
}

.card-actions,
.null-vote-actions {
	display: flex;
	gap: 10px;
	margin-top: 6px;
}

.btn-card {
	padding: 11px 14px;
	font-weight: 700;
}

.btn-card.btn-muted {
	background: rgba(255, 255, 255, 0.09);
	color: rgba(255, 255, 255, 0.88);
}

.btn-card:hover,
.tab:hover,
.vote-banner-btn:hover {
	transform: translateY(-1px);
}

.null-vote-card {
	padding: 22px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 16px;
	cursor: pointer;
}

.null-vote-title {
	margin: 0 0 8px;
	text-transform: uppercase;
	letter-spacing: 0.14em;
	font-size: 0.75rem;
	color: var(--gold);
}

@media (max-width: 900px) {
	.hero-panel,
	.dashboard-subbar,
	.vote-banner,
	.null-vote-card {
		flex-direction: column;
		align-items: stretch;
	}
}
</style>