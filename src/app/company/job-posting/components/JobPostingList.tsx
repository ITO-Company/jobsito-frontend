import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useJobPostingList } from '@/hooks/useJobPosting'
import { useJobPostingStore } from '@/stores/jobposting.store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useCompanyStore } from '@/stores/company.store'
import { jobPostingService } from '@/services/jobposting.service'
import { Download } from 'lucide-react'

export function JobPostingList() {
  const navigate = useNavigate()
  const { company } = useCompanyStore()
  const { jobPostings, isLoading, error } = useJobPostingStore()
  const { fetchJobPostings } = useJobPostingList()
  const [page, setPage] = useState(0)
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false)

  const limit = 10

  useEffect(() => {
    fetchJobPostings(limit, page * limit, [], company?.id || '' )
  }, [page, limit, company?.id])

  const handleDownloadListPDF = async () => {
    try {
      setIsDownloadingPDF(true)
      const response = await jobPostingService.downloadJobPostingListPDF()
      const url = window.URL.createObjectURL(response.data)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'ofertas-trabajo.pdf')
      document.body.appendChild(link)
      link.click()
      link.parentNode?.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading PDF:', error)
    } finally {
      setIsDownloadingPDF(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Mis Ofertas Laborales</h2>
          <p className="text-muted-foreground">Gestiona tus ofertas de trabajo</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleDownloadListPDF}
            disabled={isDownloadingPDF}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download size={18} />
            {isDownloadingPDF ? 'Descargando...' : 'Descargar PDF'}
          </Button>
          <Button
            onClick={() => navigate('/company/job-posting/create')}
            variant="default"
          >
            Crear Oferta
          </Button>
        </div>
      </div>

      {error && <div className="p-4 border border-destructive rounded text-destructive">{error}</div>}

      {isLoading ? (
        <p>Cargando ofertas...</p>
      ) : jobPostings.length > 0 ? (
        <>
          <div className="space-y-4">
            {jobPostings.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{job.location}</p>
                      <p className="text-sm mt-2 line-clamp-2">{job.description}</p>
                      <div className="mt-3 flex gap-2">
                        <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-2 py-1 rounded">
                          {job.work_type}
                        </span>
                        <span className="text-xs bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 px-2 py-1 rounded">
                          {job.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Button
                        onClick={() => navigate(`/company/job-posting/${job.id}`)}
                        variant="outline"
                        size="sm"
                      >
                        Ver
                      </Button>
                      <Button
                        onClick={() => navigate(`/company/job-posting/${job.id}/edit`)}
                        variant="outline"
                        size="sm"
                      >
                        Editar
                      </Button>
                      <Button
                        onClick={() => navigate(`/company/applications/job-posting/${job.id}`)}
                        variant="outline"
                        size="sm"
                      >
                        Aplicaciones
                      </Button>
                      <Button
                        onClick={() => navigate(`/company/job-posting/${job.id}/tags`)}
                        variant="outline"
                        size="sm"
                      >
                        Tags
                      </Button>
                      <Button
                        onClick={async () => {
                          try {
                            const response = await jobPostingService.downloadJobPostingDetailPDF(job.id)
                            const url = window.URL.createObjectURL(response.data)
                            const link = document.createElement('a')
                            link.href = url
                            link.setAttribute('download', `oferta-${job.id}.pdf`)
                            document.body.appendChild(link)
                            link.click()
                            link.parentNode?.removeChild(link)
                            window.URL.revokeObjectURL(url)
                          } catch (error) {
                            console.error('Error downloading PDF:', error)
                          }
                        }}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Download size={14} />
                        PDF
                      </Button>
                    </div>
                  </div>
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
            <span>Página {page + 1}</span>
            <Button
              onClick={() => setPage(page + 1)}
              disabled={jobPostings.length < limit}
              variant="outline"
            >
              Siguiente
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No hay ofertas creadas</p>
          <Button
            onClick={() => navigate('/company/job-posting/create')}
            variant="default"
            className="mt-4"
          >
            Crear Primera Oferta
          </Button>
        </div>
      )}
    </div>
  )
}
