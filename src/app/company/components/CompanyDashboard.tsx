import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useCompanyStore } from '@/stores/company.store'
import { useCompanyProfile, useCompanyUpdateForm } from '@/hooks/useCompanyProfile'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

export function CompanyDashboard() {
  const navigate = useNavigate()
  const [showSuccess, setShowSuccess] = useState(false)
  const { company, isLoading, error } = useCompanyStore()
  const { fetchProfile } = useCompanyProfile()
  
  const handleSuccess = () => {
    setShowSuccess(true)
    setTimeout(() => {
      navigate('/dashboard/company')
    }, 2000)
  }
  
  const { form, onSubmit } = useCompanyUpdateForm(handleSuccess)
  const { handleSubmit, formState: { isSubmitting } } = form

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  useEffect(() => {
    if (company) {
      form.reset(company as any)
    }
  }, [company, form])

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Mi Perfil Empresarial</CardTitle>
            <CardDescription>Edita la información de tu empresa</CardDescription>
          </CardHeader>
          <CardContent>
            {showSuccess && (
              <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                ¡Registrado exitosamente! Redirigiendo...
              </div>
            )}
            {isLoading && <p>Cargando...</p>}
            {error && <div className="mb-4 p-4 border border-destructive rounded">{error}</div>}

            {company && (
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="company_name"
                    render={({ field }: any) => (
                      <FormItem>
                        <FormLabel>Nombre de Empresa</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }: any) => (
                      <FormItem>
                        <FormLabel>Descripción</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }: any) => (
                      <FormItem>
                        <FormLabel>Sitio Web</FormLabel>
                        <FormControl>
                          <Input type="url" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }: any) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }: any) => (
                      <FormItem>
                        <FormLabel>Dirección</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }: any) => (
                      <FormItem>
                        <FormLabel>Industria</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company_size"
                    render={({ field }: any) => (
                      <FormItem>
                        <FormLabel>Tamaño de Empresa</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="logo_url"
                    render={({ field }: any) => (
                      <FormItem>
                        <FormLabel>URL del Logo</FormLabel>
                        <FormControl>
                          <Input type="url" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
