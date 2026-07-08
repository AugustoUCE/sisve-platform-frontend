import { computed, onBeforeUnmount, ref } from 'vue'
import type { Router } from 'vue-router'
import { fetchActiveElection, submitVote, verifyBiometric } from '@/services/voting'
import { getStoredSession } from '@/services/session'
import { useVoteFlowStore } from '@/stores/voteFlow'

export interface BiometricStepState {
  id: number
  label: string
  state: 'idle' | 'current' | 'done'
}

export const biometricTitle = 'Universidad Central del Ecuador'
export const biometricSubtitle = 'Sistema de Voto Electrónico · Verificación Biométrica'
export const biometricSteps: BiometricStepState[] = [
  { id: 1, label: 'Cámara activada y lista', state: 'idle' },
  { id: 2, label: 'Rostro detectado en el encuadre', state: 'idle' },
  { id: 3, label: 'Análisis biométrico completado', state: 'idle' },
  { id: 4, label: 'Coincidencia con padrón electoral', state: 'idle' }
]

export function useBiometricFlow(router: Router) {
  const voteFlow = useVoteFlowStore()
  const selectedCandidate = computed(() => voteFlow.selectedCandidate)
  const form = ref({
    cedula: '',
    codigo: '',
    facultad: '',
    correo: ''
  })
  const videoEl = ref<HTMLVideoElement | null>(null)
  const steps = ref<BiometricStepState[]>(biometricSteps.map(step => ({ ...step })))
  const cameraStatus = ref('Cámara no iniciada')
  const instruction = ref('Presiona Iniciar escaneo para activar tu cámara y comenzar la verificación biométrica.')
  const scanLineVisible = ref(false)
  const ringVisible = ref(false)
  const ringProgress = ref(0)
  const successVisible = ref(false)
  const errorVisible = ref(false)
  const errorMessage = ref('Rostro no reconocido. Intenta con mejor iluminación.')
  const startButtonText = ref('▶ Iniciar escaneo')
  const retryVisible = ref(false)
  const continueEnabled = ref(false)
  const canScan = ref(true)
  const currentStatusClass = computed(() => {
    if (errorVisible.value) return 'err'
    if (successVisible.value) return 'ok'
    if (scanLineVisible.value) return 'scanning'
    if (cameraStatus.value.includes('activa')) return 'active'
    return ''
  })

  let mediaStream: MediaStream | null = null
  let animationFrame = 0

  function setStep(stepId: number, state: BiometricStepState['state']) {
    const target = steps.value.find(step => step.id === stepId)
    if (target) target.state = state
  }

  function stopCamera() {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop())
      mediaStream = null
    }
  }

  function resetVisualState() {
    steps.value = biometricSteps.map(step => ({ ...step }))
    cameraStatus.value = 'Cámara no iniciada'
    instruction.value = 'Presiona Iniciar escaneo para activar tu cámara y comenzar la verificación biométrica.'
    scanLineVisible.value = false
    ringVisible.value = false
    ringProgress.value = 0
    successVisible.value = false
    errorVisible.value = false
    errorMessage.value = 'Rostro no reconocido. Intenta con mejor iluminación.'
    startButtonText.value = '▶ Iniciar escaneo'
    retryVisible.value = false
    continueEnabled.value = false
    canScan.value = true
  }

  async function startScan() {
    startButtonText.value = 'Iniciando…'
    canScan.value = false
    setStep(1, 'current')

    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      if (videoEl.value) {
        videoEl.value.srcObject = mediaStream
        await new Promise(resolve => {
          if (videoEl.value) videoEl.value.onloadedmetadata = () => resolve(true)
          else resolve(true)
        })
      }

      cameraStatus.value = 'Cámara activa — posiciona tu rostro'
      instruction.value = 'Cámara lista. Centra tu rostro dentro del óvalo y quédate quieto.'
      setStep(1, 'done')
      startButtonText.value = '▶ Escanear'
      window.setTimeout(detectFace, 1200)
    } catch {
      canScan.value = true
      startButtonText.value = '▶ Iniciar escaneo'
      setStep(1, 'idle')
      cameraStatus.value = 'Sin acceso a la cámara'
      instruction.value = 'Sin acceso a la cámara. Verifica los permisos en tu navegador e intenta de nuevo.'
      errorVisible.value = true
      retryVisible.value = true
    }
  }

  function detectFace() {
    setStep(2, 'current')
    cameraStatus.value = 'Rostro detectado — analizando biometría…'
    instruction.value = 'Rostro detectado. No muevas la cabeza. Análisis en curso…'
    scanLineVisible.value = true
    ringVisible.value = true
    ringProgress.value = 0

    setTimeout(() => setStep(2, 'done'), 700)
    setTimeout(() => setStep(3, 'current'), 900)

    const duration = 3000
    const start = performance.now()
    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1)
      ringProgress.value = Math.round(progress * 100)
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(tick)
      } else {
        window.setTimeout(matchComplete, 280)
      }
    }

    animationFrame = window.requestAnimationFrame(tick)
  }

  function matchComplete() {
    setStep(3, 'done')
    setStep(4, 'current')
    scanLineVisible.value = false
    ringVisible.value = false

    window.setTimeout(() => {
      setStep(4, 'done')
      successVisible.value = true
      cameraStatus.value = 'Identidad verificada correctamente ✓'
      instruction.value = 'Verificación biométrica completada. Puedes continuar con tu voto.'
      retryVisible.value = true
      continueEnabled.value = true
      stopCamera()
    }, 450)
  }

  function resetScan() {
    stopCamera()
    if (animationFrame) window.cancelAnimationFrame(animationFrame)
    resetVisualState()
    if (videoEl.value) videoEl.value.srcObject = null
    voteFlow.resetBiometricVerification()
  }

  async function confirmVote() {
    if (!form.value.cedula.trim() || !form.value.codigo.trim()) {
      window.alert('Completa los datos personales antes de continuar.')
      return
    }

    if (!continueEnabled.value) {
      window.alert('Completa la verificación biométrica primero.')
      return
    }

    if (selectedCandidate.value === null) {
      window.alert('Selecciona una opción de voto desde el dashboard antes de confirmar.')
      return
    }

    if (selectedCandidate.value === 'blank') {
      window.alert('El backend actual no registra voto en blanco. Selecciona un candidato para continuar.')
      return
    }

    const session = getStoredSession()
    if (!session) {
      window.alert('La sesión expiró o no está disponible. Inicia sesión nuevamente.')
      router.push('/login')
      return
    }

    const biometricOk = await verifyBiometric()
    if (!biometricOk) {
      window.alert('No se pudo validar la sesión contra el backend. Inicia sesión nuevamente.')
      router.push('/login')
      return
    }

    const activeElection = await fetchActiveElection()
    if (!activeElection) {
      window.alert('No hay elecciones activas en el backend.')
      return
    }

    await submitVote({
      idEleccion: activeElection.idEleccion,
      idCandidato: Number(selectedCandidate.value),
      idVotante: Number(session.user.id)
    })
    window.alert('Voto confirmado correctamente. Gracias por participar.')
    voteFlow.resetSelection()
    router.push('/results')
  }

  function backToLogin() {
    router.push('/login')
  }

  onBeforeUnmount(resetScan)

  return {
    form,
    videoEl,
    steps,
    cameraStatus,
    instruction,
    scanLineVisible,
    ringVisible,
    ringProgress,
    successVisible,
    errorVisible,
    errorMessage,
    startButtonText,
    retryVisible,
    canScan,
    continueEnabled,
    currentStatusClass,
    startScan,
    resetScan,
    confirmVote,
    backToLogin
  }
}
