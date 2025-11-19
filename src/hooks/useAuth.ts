import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { authService, type UserRole } from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth.store'
import { signupSchema, signinSchema, type SignupInput, type SigninInput } from '@/schemas/auth.schema'

export const useSignup = (role: UserRole) => {
  const { setUser, setToken, setError, setLoading } = useAuthStore()

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  })

  const onSubmit = useCallback(
    async (data: SignupInput) => {
      setLoading(true)
      setError(null)

      try {
        const response =
          role === 'job_seeker'
            ? await authService.jobSeekerSignup(data)
            : await authService.companySignup(data)

        const { token } = response.data
        localStorage.setItem('auth-token', token)
        setToken(token)

        // Decodificar JWT para obtener info del usuario
        const decoded = decodeToken(token)
        if (decoded) {
          setUser({
            id: decoded.user_id || '',
            email: decoded.email || data.email,
            name: data.name,
            role,
          })
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || 'Error en el registro'
        setError(errorMessage)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [role, setUser, setToken, setError, setLoading]
  )

  return { form, onSubmit }
}

export const useSignin = (role: UserRole) => {
  const { setUser, setToken, setError, setLoading } = useAuthStore()

  const form = useForm<SigninInput>({
    resolver: zodResolver(signinSchema),
    mode: 'onBlur',
  })

  const onSubmit = useCallback(
    async (data: SigninInput) => {
      setLoading(true)
      setError(null)

      try {
        const response =
          role === 'job_seeker'
            ? await authService.jobSeekerSignin(data)
            : await authService.companySignin(data)

        const { token } = response.data
        localStorage.setItem('auth-token', token)
        setToken(token)

        // Decodificar JWT
        const decoded = decodeToken(token)
        if (decoded) {
          setUser({
            id: decoded.user_id || '',
            email: decoded.email || data.email,
            name: decoded.name || '',
            role,
          })
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || 'Error en la sesión'
        setError(errorMessage)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [role, setUser, setToken, setError, setLoading]
  )

  return { form, onSubmit }
}

// Hook para usar el store directamente
export const useAuth = () => {
  const store = useAuthStore()
  return store
}

// Helper para decodificar JWT
function decodeToken(token: string): any {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}
