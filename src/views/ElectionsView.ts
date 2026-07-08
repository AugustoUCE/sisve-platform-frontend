import { computed, onMounted, ref } from 'vue'
import { fetchResults } from '@/services/results'
import type { ResultEntry, ResultSummaryStat, TimelineItem } from '@/types/domain'

export const resultTabs = ['Presidente Estudiantil', 'Vicepresidente', 'Vocal Principal']

export function useResultsView() {
  const activeTab = ref(0)
  const lastUpdate = ref('Sin actualizar')
  const resultStats = ref<ResultSummaryStat[]>([])
  const resultEntries = ref<ResultEntry[]>([])
  const participationTimeline = ref<TimelineItem[]>([])
  const displayEntries = computed(() => resultEntries.value)

  onMounted(async () => {
    const results = await fetchResults()
    resultStats.value = results.stats
    resultEntries.value = results.entries
    participationTimeline.value = results.timeline
    lastUpdate.value = new Intl.DateTimeFormat('es-EC', {
      dateStyle: 'short',
      timeStyle: 'short'
    }).format(new Date())
  })

  function setTab(index: number) {
    activeTab.value = index
  }

  return {
    activeTab,
    lastUpdate,
    displayEntries,
    resultStats,
    resultTabs,
    participationTimeline,
    setTab
  }
}
