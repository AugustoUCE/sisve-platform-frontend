import { reactive, ref } from 'vue'
import type { Router } from 'vue-router'
import { login } from '@/services/auth'
import type { LoginCredentials } from '@/types/domain'

export const loginTitle = 'Sistema de Voto Electrónico'
export const loginSubtitle = 'Sistema de Voto Electrónico · Procesos Electorales'
export const loginHint = 'Ingresa tus credenciales para continuar al proceso electoral.'

export function useLoginForm(router: Router) {
	const form = reactive<LoginCredentials>({
		cedula: '',
		correoInstitucional: '',
		remember: false
	})
	const isSubmitting = ref(false)
	const errorMessage = ref('')

	async function submitLogin() {
		errorMessage.value = ''

		if (!form.cedula.trim() || !form.correoInstitucional.trim()) {
			errorMessage.value = 'Completa documento y correo antes de continuar.'
			return
		}

		isSubmitting.value = true

		try {
			await login(form)
			await router.push('/dashboard')
		} catch (error) {
			errorMessage.value = error instanceof Error ? error.message : 'No se pudo iniciar sesión.'
		} finally {
			isSubmitting.value = false
		}
	}

	return {
		form,
		isSubmitting,
		errorMessage,
		submitLogin
	}
}