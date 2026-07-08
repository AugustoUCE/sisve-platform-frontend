import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVoteFlowStore = defineStore('voteFlow', () => {
	const selectedTab = ref(0)
	const selectedCandidate = ref<number | 'blank' | null>(null)
	const biometricVerified = ref(false)

	function setTab(index: number) {
		selectedTab.value = index
		selectedCandidate.value = null
		biometricVerified.value = false
	}

	function selectCandidate(candidateId: number) {
		selectedCandidate.value = candidateId
		biometricVerified.value = false
	}

	function selectBlank() {
		selectedCandidate.value = 'blank'
		biometricVerified.value = false
	}

	function markBiometricVerified() {
		biometricVerified.value = true
	}

	function resetBiometricVerification() {
		biometricVerified.value = false
	}

	function resetSelection() {
		selectedTab.value = 0
		selectedCandidate.value = null
		biometricVerified.value = false
	}

	return {
		selectedTab,
		selectedCandidate,
		biometricVerified,
		setTab,
		selectCandidate,
		selectBlank,
		markBiometricVerified,
		resetBiometricVerification,
		resetSelection
	}
})