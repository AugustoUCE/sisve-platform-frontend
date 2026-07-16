import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVoteFlowStore = defineStore('voteFlow', () => {
	const selectedTab = ref(0)
	const selectedCandidateIds = ref<number[]>([])
	const nullVoteSelected = ref(false)
	const lastSubmittedBallot = ref<{ candidateIds: number[]; nullVote: boolean } | null>(null)
	const lastVoterProfile = ref<{ fullName: string; code: string; role: string } | null>(null)
	const biometricVerified = ref(false)
	const selectedCandidate = ref<number | 'blank' | null>(null)

	function syncLegacySelection() {
		selectedCandidate.value = nullVoteSelected.value
			? 'blank'
			: selectedCandidateIds.value[0] ?? null
	}

	function setTab(index: number) {
		selectedTab.value = index
		biometricVerified.value = false
	}

	function selectCandidate(candidateId: number) {
		if (nullVoteSelected.value) {
			nullVoteSelected.value = false
		}

		if (selectedCandidateIds.value.includes(candidateId)) {
			selectedCandidateIds.value = selectedCandidateIds.value.filter(id => id !== candidateId)
		} else {
			selectedCandidateIds.value = [...selectedCandidateIds.value, candidateId]
		}

		syncLegacySelection()
		biometricVerified.value = false
	}

	function selectBlank() {
		selectedCandidateIds.value = []
		nullVoteSelected.value = true
		syncLegacySelection()
		biometricVerified.value = false
	}

	function clearBlankVote() {
		nullVoteSelected.value = false
		syncLegacySelection()
	}

	function isCandidateSelected(candidateId: number) {
		return selectedCandidateIds.value.includes(candidateId)
	}

	function hasSelections() {
		return nullVoteSelected.value || selectedCandidateIds.value.length > 0
	}

	function submitCurrentBallot() {
		lastSubmittedBallot.value = {
			candidateIds: [...selectedCandidateIds.value],
			nullVote: nullVoteSelected.value
		}
	}

	function captureVoterProfile(profile: { fullName: string; code: string; role: string }) {
		lastVoterProfile.value = profile
	}

	function markBiometricVerified() {
		biometricVerified.value = true
	}

	function resetBiometricVerification() {
		biometricVerified.value = false
	}

	function resetSelection() {
		selectedTab.value = 0
		selectedCandidateIds.value = []
		nullVoteSelected.value = false
		selectedCandidate.value = null
		biometricVerified.value = false
		lastSubmittedBallot.value = null
	}

	return {
		selectedTab,
		selectedCandidateIds,
		nullVoteSelected,
		lastSubmittedBallot,
		lastVoterProfile,
		selectedCandidate,
		biometricVerified,
		setTab,
		selectCandidate,
		selectBlank,
		clearBlankVote,
		isCandidateSelected,
		hasSelections,
		submitCurrentBallot,
		captureVoterProfile,
		markBiometricVerified,
		resetBiometricVerification,
		resetSelection
	}
})