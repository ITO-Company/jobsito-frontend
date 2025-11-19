import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { companyService, type CompanyResponse } from '@/services/company.service'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function CompanyDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [company, setCompany] = useState<CompanyResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      fetchCompany()
    }
  }, [id])

  const fetchCompany = async () => {
    if (!id) return
    setIsLoading(true)
    setError(null)

    try {
      const response = await companyService.getById(id)
      setCompany(response.data)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al cargar empresa')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <p className="p-6">Cargando...</p>
  if (error) return <p className="p-6 text-destructive">{error}</p>

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="mb-6"
        >
          ← Volver
        </Button>

        {company && (
          <Card>
            <CardHeader>
              <CardTitle>{company.company_name}</CardTitle>
              <CardDescription>{company.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {company.description && (
                <div>
                  <p className="font-semibold">Descripción</p>
                  <p>{company.description}</p>
                </div>
              )}

              {company.industry && (
                <div>
                  <p className="font-semibold">Industria</p>
                  <p>{company.industry}</p>
                </div>
              )}

              {company.address && (
                <div>
                  <p className="font-semibold">Dirección</p>
                  <p>{company.address}</p>
                </div>
              )}

              {company.phone && (
                <div>
                  <p className="font-semibold">Teléfono</p>
                  <p>{company.phone}</p>
                </div>
              )}

              {company.website && (
                <div>
                  <Button
                    onClick={() => window.open(company.website)}
                    variant="outline"
                  >
                    Visitar Sitio Web
                  </Button>
                </div>
              )}

              {company.company_size && (
                <div>
                  <p className="font-semibold">Tamaño de Empresa</p>
                  <p>{company.company_size}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
