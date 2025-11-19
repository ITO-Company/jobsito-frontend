import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { jobPostingCreateSchema, type JobPostingCreateInput } from '@/schemas/jobposting.schema'
import { useJobPostingForm, useJobPostingDetail } from '@/hooks/useJobPosting'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function JobPostingCreateEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { createJobPosting, updateJobPosting, isSubmitting, error: submitError } = useJobPostingForm()
  const { jobPosting, isLoading, fetchJobPosting } = useJobPostingDetail()

  const form = useForm<JobPostingCreateInput>({
    resolver: zodResolver(jobPostingCreateSchema),
    defaultValues: {
      title: '',
      description: '',
      requirement: '',
      salary_min: '',
      salary_max: '',
      work_type: '',
      experience_level: '',
      location: '',
      is_remote: 'false',
      is_hibrid: 'false',
      contract_type: '',
      benefit: '',
      status: 'activa',
      expires_at: '',
    },
  })

  useEffect(() => {
    if (id) {
      fetchJobPosting(id)
    }
  }, [id])

  useEffect(() => {
    if (jobPosting && id) {
      // Convertir valores del backend para el formulario
      let isRemoteValue = 'false'
      let isHibridValue = 'false'
      let expiresAtValue = ''

      // Convertir is_remote a 'true'/'false' string
      if (jobPosting.is_remote === true || jobPosting.is_remote === 'true') {
        isRemoteValue = 'true'
      }

      // Convertir is_hibrid a 'true'/'false' string
      if (jobPosting.is_hibrid === true || jobPosting.is_hibrid === 'true') {
        isHibridValue = 'true'
      }

      // Extraer solo la fecha (YYYY-MM-DD) de expires_at
      if (jobPosting.expires_at) {
        expiresAtValue = jobPosting.expires_at.split('T')[0]
      }

      form.reset({
        title: jobPosting.title || '',
        description: jobPosting.description || '',
        requirement: jobPosting.requirement || '',
        salary_min: jobPosting.salary_min || '',
        salary_max: jobPosting.salary_max || '',
        work_type: jobPosting.work_type || '',
        experience_level: jobPosting.experience_level || '',
        location: jobPosting.location || '',
        is_remote: isRemoteValue,
        is_hibrid: isHibridValue,
        contract_type: jobPosting.contract_type || '',
        benefit: jobPosting.benefit || '',
        status: jobPosting.status || 'activa',
        expires_at: expiresAtValue,
      })
    }
  }, [jobPosting, id, form])

  const onSubmit = async (data: JobPostingCreateInput) => {
    try {
      if (id) {
        await updateJobPosting(id, data)
      } else {
        await createJobPosting(data)
      }
      navigate('/company/job-posting')
    } catch (error) {
      console.error('Error al guardar oferta:', error)
    }
  }

  if (isLoading) {
    return <div>Cargando...</div>
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">{id ? 'Editar Oferta' : 'Crear Nueva Oferta'}</h2>
        <p className="text-muted-foreground">Completa todos los campos para continuar</p>
      </div>

      {submitError && <div className="p-4 border border-destructive rounded text-destructive">{submitError}</div>}

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título de la Oferta</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Desarrollador Senior React" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe la posición..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requirement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requisitos</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Requisitos para la posición..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="salary_min"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salario Mínimo</FormLabel>
                      <FormControl>
                        <Input placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salary_max"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salario Máximo</FormLabel>
                      <FormControl>
                        <Input placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="work_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Trabajo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="full-time">Tiempo Completo</SelectItem>
                          <SelectItem value="part-time">Tiempo Parcial</SelectItem>
                          <SelectItem value="contract">Por Contrato</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experience_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nivel de Experiencia</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona nivel" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="junior">Junior</SelectItem>
                          <SelectItem value="semi-senior">Semi-Senior</SelectItem>
                          <SelectItem value="senior">Senior</SelectItem>
                          <SelectItem value="lead">Lead</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ubicación</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Buenos Aires, Argentina" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="is_remote"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>¿Remoto?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="true">Sí</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="is_hibrid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>¿Híbrido?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="true">Sí</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="contract_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Contrato</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="indefinido">Indefinido</SelectItem>
                        <SelectItem value="plazo-fijo">Plazo Fijo</SelectItem>
                        <SelectItem value="practicante">Practicante</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="benefit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beneficios</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe los beneficios..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expires_at"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de Vencimiento</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Guardando...' : id ? 'Actualizar' : 'Crear'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/company/job-posting')}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
