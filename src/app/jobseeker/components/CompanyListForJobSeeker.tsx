import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { companyService, type CompanyResponse } from '@/services/company.service'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function CompanyListForJobSeeker() {
  const navigate = useNavigate()
  const [companies, setCompanies] = useState<CompanyResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)

  const limit = 10

  useEffect(() => {
    fetchCompanies()
  }, [page])

  const fetchCompanies = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await companyService.getAll(limit, page * limit)
      setCompanies(response.data.data)
      setTotal(response.data.total)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al cargar empresas')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Empresas</CardTitle>
            <CardDescription>Explora oportunidades en diferentes empresas</CardDescription>
          </CardHeader>
        </Card>

        {isLoading && <p>Cargando...</p>}
        {error && <div className="mb-4 p-4 border border-destructive rounded">{error}</div>}

        {companies.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {companies.map((company) => (
                <Card key={company.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{company.company_name}</CardTitle>
                    <CardDescription>{company.email}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {company.industry && <p className="text-sm">🏢 {company.industry}</p>}
                    {company.address && <p className="text-sm">📍 {company.address}</p>}
                    {company.description && <p className="text-sm line-clamp-2">{company.description}</p>}

                    <Button
                      onClick={() => navigate(`/companies/${company.id}`)}
                      className="w-full"
                      variant="outline"
                    >
                      Ver Empresa
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <Button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                variant="outline"
              >
                Anterior
              </Button>
              <span>
                Página {page + 1} de {Math.ceil(total / limit)}
              </span>
              <Button
                onClick={() => setPage(page + 1)}
                disabled={page >= Math.ceil(total / limit) - 1}
                variant="outline"
              >
                Siguiente
              </Button>
            </div>
          </>
        ) : (
          !isLoading && <p>No hay empresas disponibles</p>
        )}
      </div>
    </div>
  )
}
