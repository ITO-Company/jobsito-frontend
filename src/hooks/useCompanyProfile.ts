import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { companyService } from '@/services/company.service'
import { useCompanyStore } from '@/stores/company.store'
import { companyUpdateSchema, type CompanyUpdateInput } from '@/schemas/profile.schema'

export const useCompanyProfile = () => {
  const { setCompany, setLoading, setError } = useCompanyStore()

  const fetchProfile = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await companyService.getMe()
      setCompany(response.data)
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al cargar perfil'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [setCompany, setLoading, setError])

  const updateProfile = useCallback(
    async (data: Partial<CompanyUpdateInput>) => {
      setLoading(true)
      setError(null)

      try {
        const response = await companyService.updateMe(data)
        setCompany(response.data)
        return response.data
      } catch (error: any) {
        const errorMessage = error.response?.data?.error || 'Error al actualizar perfil'
        setError(errorMessage)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [setCompany, setLoading, setError]
  )

  return { fetchProfile, updateProfile }
}

export const useCompanyUpdateForm = (onSuccess?: () => void) => {
  const { updateProfile } = useCompanyProfile()

  const form = useForm<CompanyUpdateInput>({
    resolver: zodResolver(companyUpdateSchema),
    mode: 'onBlur',
  })

  const onSubmit = useCallback(
    async (data: CompanyUpdateInput) => {
      try {
        await updateProfile(data)
        if (onSuccess) {
          onSuccess()
        }
      } catch (error) {
        console.error('Update failed:', error)
      }
    },
    [updateProfile, onSuccess]
  )

  return { form, onSubmit }
}
