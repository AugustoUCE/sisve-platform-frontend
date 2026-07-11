import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Router } from 'vue-router'
import { fetchActiveElection, submitVote, voterCandidates } from '@/services/voting'
import { getStoredSession } from '@/services/session'
import { useVoteFlowStore } from '@/stores/voteFlow'

export const dashboardTitle = 'Elecciones Universitarias 2026'
export const dashboardSubtitle = 'Selecciona uno o varios candidatos, usa voto nulo si corresponde y emite tu voto desde cada tarjeta o desde el cierre del tablero.'
export const dashboardMeta = [
	'7 de junio de 2026',
	'Facultad de Ing. y Ciencias Aplicadas',
	'Votación general'
]
export const dashboardTabs = ['Todas las candidaturas', 'Presidencia', 'Vicepresidencia', 'Vocalía']

export function useVoterBoard(router: Router) {
	const voteFlow = useVoteFlowStore()
	const selectedTab = computed(() => voteFlow.selectedTab)
	const voterSession = computed(() => getStoredSession())
	const voterProfile = computed(() => voterSession.value?.user ?? null)
	const selectedCandidateIds = computed(() => voteFlow.selectedCandidateIds)
	const nullVoteSelected = computed(() => voteFlow.nullVoteSelected)
	const canSubmit = computed(() => voteFlow.hasSelections())
	const remainingSeconds = ref(28 * 60 + 43)
	const timerText = computed(() => {
		const minutes = String(Math.floor(remainingSeconds.value / 60)).padStart(2, '0')
		const seconds = String(remainingSeconds.value % 60).padStart(2, '0')
		return `${minutes}:${seconds}`
	})
	const selectedName = computed(() => {
		if (nullVoteSelected.value) return 'Voto nulo'
		if (selectedCandidateIds.value.length === 0) return 'Ninguno aún'
		return selectedCandidateIds.value
			.map(candidateId => voterCandidates.find(candidate => candidate.id === candidateId)?.name)
			.filter(Boolean)
			.join(', ')
	})
	const selectedCount = computed(() => selectedCandidateIds.value.length)
	const selectedLabel = computed(() => {
		if (nullVoteSelected.value) return 'Voto nulo seleccionado'
		if (selectedCount.value === 0) return 'Sin selección'
		if (selectedCount.value === 1) return '1 candidato seleccionado'
		return `${selectedCount.value} candidatos seleccionados`
	})
	const visibleCandidates = computed(() => {
		if (selectedTab.value === 0) {
			return voterCandidates
		}

		const selectedOffice = dashboardTabs[selectedTab.value]
		return voterCandidates.filter(candidate => candidate.office === selectedOffice)
	})

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

	function isCandidateSelected(candidateId: number) {
		return voteFlow.isCandidateSelected(candidateId)
	}

	function selectBlank() {
		voteFlow.selectBlank()
	}

	function clearBlankVote() {
		voteFlow.clearBlankVote()
	}

	async function submitCurrentBallot() {
		const session = getStoredSession()
		if (!session) {
			window.alert('La sesión expiró o no está disponible. Inicia sesión nuevamente.')
			router.push('/login')
			return
		}

		voteFlow.captureVoterProfile(session.user)

		const activeElection = await fetchActiveElection()
		if (!activeElection) {
			window.alert('No hay elecciones activas en este momento.')
			return
		}

		if (!voteFlow.hasSelections()) {
			window.alert('Selecciona al menos un candidato o voto nulo antes de votar.')
			return
		}

		const result = await submitVote({
			idEleccion: activeElection.idEleccion,
			candidateIds: [...voteFlow.selectedCandidateIds],
			nullVote: voteFlow.nullVoteSelected,
			idVotante: Number(session.user.id)
		})

		voteFlow.submitCurrentBallot()
		window.alert(result.mensaje)
		await router.push('/results')
	}

	async function emitVote() {
		await submitCurrentBallot()
	}

	onMounted(startTimer)
	onBeforeUnmount(stopTimer)

	return {
		selectedTab,
		voterProfile,
		selectedCandidateIds,
		nullVoteSelected,
		selectedCount,
		selectedLabel,
		visibleCandidates,
		timerText,
		selectedName,
		canSubmit,
		setTab,
		selectCandidate,
		isCandidateSelected,
		selectBlank,
		clearBlankVote,
		submitCurrentBallot,
		emitVote,
		voterCandidates
	}
}