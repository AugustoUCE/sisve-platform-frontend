import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { fetchActiveElection } from '@/services/voting'
import { fetchResults } from '@/services/results'
import { voterCandidates } from '@/services/voting'
import { useVoteFlowStore } from '@/stores/voteFlow'
import type { ResultEntry, ResultSummaryStat, TimelineItem } from '@/types/domain'

export const resultTabs = ['Presidente Estudiantil', 'Vicepresidente', 'Vocal Principal']

export function useResultsView() {
  const voteFlow = useVoteFlowStore()
  const activeTab = ref(0)
  const lastUpdate = ref('Sin actualizar')
  const timeRemaining = ref('00:00:00')
  const resultStats = ref<ResultSummaryStat[]>([])
  const resultEntries = ref<ResultEntry[]>([])
  const participationTimeline = ref<TimelineItem[]>([])
  const displayEntries = computed(() => resultEntries.value)
  const ballot = computed(() => voteFlow.lastSubmittedBallot)
  const voterProfile = computed(() => voteFlow.lastVoterProfile)
  const selectionSummary = computed(() => {
    if (voteFlow.nullVoteSelected) {
      return 'Tu selección actual es voto en blanco.'
    }

    if (voteFlow.selectedCandidateIds.length === 0) {
      return ''
    }

    const names = voteFlow.selectedCandidateIds
      .map(candidateId => voterCandidates.find(candidate => candidate.id === candidateId)?.name)
      .filter(Boolean)
      .join(', ')

    return names ? `Tu selección actual es ${names}.` : ''
  })
  const certificateCandidateNames = computed(() => {
    if (!ballot.value) return []

    return ballot.value.candidateIds
      .map(candidateId => voterCandidates.find(candidate => candidate.id === candidateId)?.name)
      .filter((name): name is string => Boolean(name))
  })

  let timerId: number | undefined

  function updateCountdown(endDateIso: string | null) {
    if (!endDateIso) {
      timeRemaining.value = '00:00:00'
      return
    }

    const distance = new Date(endDateIso).getTime() - Date.now()
    if (distance <= 0) {
      timeRemaining.value = '00:00:00'
      return
    }

    const totalSeconds = Math.floor(distance / 1000)
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0')
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
    const seconds = String(totalSeconds % 60).padStart(2, '0')
    timeRemaining.value = `${hours}:${minutes}:${seconds}`
  }

  async function loadCountdown() {
    const activeElection = await fetchActiveElection()
    updateCountdown(activeElection?.fechaFin ?? null)
    timerId = window.setInterval(() => updateCountdown(activeElection?.fechaFin ?? null), 1000)
  }

  function printCertificate() {
    window.print()
  }

  onMounted(async () => {
    const results = await fetchResults()
    //resultStats.value = results.stats
    resultEntries.value = results.entries
    participationTimeline.value = results.timeline
    lastUpdate.value = new Intl.DateTimeFormat('es-EC', {
      dateStyle: 'short',
      timeStyle: 'short'
    }).format(new Date())

    await loadCountdown()
  })

  onBeforeUnmount(() => {
    if (timerId) {
      window.clearInterval(timerId)
    }
  })

  function setTab(index: number) {
    activeTab.value = index
  }

  return {
    activeTab,
    lastUpdate,
    timeRemaining,
    displayEntries,
    resultStats,
    resultTabs,
    participationTimeline,
    selectionSummary,
    ballot,
    voterProfile,
    certificateCandidateNames,
    printCertificate,
    setTab
  }
}