import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Router } from 'vue-router'
import { voterCandidates } from '@/services/voting'
import { useVoteFlowStore } from '@/stores/voteFlow'

export const dashboardTitle = 'Elecciones Universitarias 2026'
export const dashboardSubtitle = 'Selecciona un candidato para cada cargo y confirma tu voto. El voto es secreto e irrevocable.'
export const dashboardMeta = [
	'7 de junio de 2026',
	'Facultad de Ing. y Ciencias Aplicadas',
	'3 candidatos'
]
export const dashboardTabs = ['Presidente Estudiantil', 'Vicepresidente', 'Vocal Principal']

export function useVoterBoard(router: Router) {
	const voteFlow = useVoteFlowStore()
	const selectedTab = computed(() => voteFlow.selectedTab)
	const selectedCandidate = computed(() => voteFlow.selectedCandidate)
	const remainingSeconds = ref(28 * 60 + 43)
	const timerText = computed(() => {
		const minutes = String(Math.floor(remainingSeconds.value / 60)).padStart(2, '0')
		const seconds = String(remainingSeconds.value % 60).padStart(2, '0')
		return `${minutes}:${seconds}`
	})
	const selectedName = computed(() => {
		if (selectedCandidate.value === 'blank') return 'Voto en blanco'
		if (selectedCandidate.value == null) return 'Ninguno aún'
		return voterCandidates.find(candidate => candidate.id === selectedCandidate.value)?.name ?? 'Ninguno aún'
	})
	const voteEnabled = computed(() => selectedCandidate.value !== null)

	let intervalId: number | undefined

	function startTimer() {
		intervalId = window.setInterval(() => {
			remainingSeconds.value = Math.max(0, remainingSeconds.value - 1)
		}, 1000)
	}

	function stopTimer() {
		if (intervalId) {
			window.clearInterval(intervalId)
			intervalId = undefined
		}
	}

	function setTab(index: number) {
		voteFlow.setTab(index)
	}

	function selectCandidate(candidateId: number) {
		voteFlow.selectCandidate(candidateId)
	}

	function selectBlank() {
		voteFlow.selectBlank()
	}

	async function emitVote() {
		if (selectedCandidate.value === null) return
		await router.push('/vote')
	}

	onMounted(startTimer)
	onBeforeUnmount(stopTimer)

	return {
		selectedTab,
		selectedCandidate,
		timerText,
		selectedName,
		voteEnabled,
		setTab,
		selectCandidate,
		selectBlank,
		emitVote,
		voterCandidates
	}
}
