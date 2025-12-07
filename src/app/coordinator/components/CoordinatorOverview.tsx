import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useInternshipOverviewListCoordinator } from '@/hooks/useInternship'
import { internshipService } from '@/services/internship.service'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LogOut, ChevronLeft, ChevronRight, Download } from 'lucide-react'

const ITEMS_PER_PAGE = 9

export function CoordinatorOverview() {
  const navigate = useNavigate()
  const { isLoading, error, fetchOverviewList } = useInternshipOverviewListCoordinator()
  const [currentPage, setCurrentPage] = useState(1)
  const [internships, setInternships] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [isDownloadingListPDF, setIsDownloadingListPDF] = useState(false)
  const [downloadingPDFId, setDownloadingPDFId] = useState<string | null>(null)

  useEffect(() => {
    // Verificar que sea coordinador
    const coordinatorRole = localStorage.getItem('coordinator-role')
    if (!coordinatorRole) {
      navigate('/coordinator/login')
      return
    }

    loadPage(currentPage)
  }, [currentPage])

  const loadPage = async (page: number) => {
    const offset = (page - 1) * ITEMS_PER_PAGE
    const response = await fetchOverviewList(ITEMS_PER_PAGE, offset)
    if (response) {
      setInternships(response.data)
      setTotal(response.total)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('coordinator-token')
    localStorage.removeItem('coordinator-role')
    navigate('/coordinator/login')
  }

  const handleDownloadListPDF = async () => {
    try {
      setIsDownloadingListPDF(true)
      // Descargar TODAS las pasantías (sin límite)
      const response = await internshipService.downloadOverviewListPDFCoordinator(
        100000,
        0
      )
      const url = window.URL.createObjectURL(response.data)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'interships-list.pdf')
      document.body.appendChild(link)
      link.click()
      link.parentNode?.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading PDF:', error)
    } finally {
      setIsDownloadingListPDF(false)
    }
  }

  const handleDownloadIndividualPDF = async (id: string) => {
    try {
      setDownloadingPDFId(id)
      const response = await internshipService.downloadOverviewPDF(id)
      const url = window.URL.createObjectURL(response.data)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `intership-${id}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.parentNode?.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading PDF:', error)
    } finally {
      setDownloadingPDFId(null)
    }
  }

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-slate-300">Cargando información de pasantías...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-slate-100">Panel de Coordinador</h1>
            <p className="text-slate-400 mt-2">Información General de Pasantías</p>
          </div>
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {error && (
          <Card className="mb-6 border-destructive bg-destructive/10">
            <CardContent className="pt-6 text-destructive">{error}</CardContent>
          </Card>
        )}

        {internships.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No hay pasantías disponibles</p>
            </CardContent>
          </Card>
        ) : (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <div className="text-slate-300">
                <p className="text-lg">Total de pasantías: <span className="font-bold text-2xl text-blue-400">{internships.length}</span></p>
                <p className="text-sm text-slate-400">Página {currentPage} de {totalPages}</p>
              </div>
              <Button
                onClick={handleDownloadListPDF}
                disabled={isDownloadingListPDF}
                className="flex items-center gap-2"
              >
                <Download size={18} />
                {isDownloadingListPDF ? 'Descargando...' : 'Descargar PDF'}
              </Button>
            </div>

            {/* Grid de tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {internships.map((internship) => (
                <Card key={internship.id} className="flex flex-col bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-100">{internship.job_posting?.title || 'Sin título'}</CardTitle>
                    <p className="text-sm text-slate-300">{internship.company_profile?.name || 'Empresa'}</p>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    {/* Job Seeker Info */}
                    <div>
                      <p className="text-sm text-slate-400">Pasante</p>
                      <p className="font-medium text-slate-100">{internship.job_seeker?.name || 'N/A'}</p>
                      <p className="text-sm text-slate-300">{internship.job_seeker?.email || 'N/A'}</p>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-slate-400">Inicio</p>
                        <p className="font-medium text-slate-100">{new Date(internship.start_date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Término</p>
                        <p className="font-medium text-slate-100">{new Date(internship.end_date).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <p className="text-sm text-slate-400 mb-2">Estado</p>
                      <Badge variant="default">{internship.status}</Badge>
                    </div>

                    {/* Counts */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-700 mt-auto">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-400">{internship.milestone_counts?.length || 0}</p>
                        <p className="text-xs text-slate-400">Hitos</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-400">{internship.issue_counts?.length || 0}</p>
                        <p className="text-xs text-slate-400">Issues</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-400">{internship.request_counts?.length || 0}</p>
                        <p className="text-xs text-slate-400">Requests</p>
                      </div>
                    </div>

                    {/* Detailed counts by status */}
                    {internship.milestone_counts && internship.milestone_counts.length > 0 && (
                      <div className="pt-2 border-t border-slate-700">
                        <p className="text-xs text-slate-400 mb-2">Hitos por estado:</p>
                        <div className="flex flex-wrap gap-1">
                          {internship.milestone_counts.map((count: any, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs text-slate-300">
                              {count.status}: {count.count}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {internship.issue_counts && internship.issue_counts.length > 0 && (
                      <div>
                        <p className="text-xs text-slate-400 mb-2">Issues por estado:</p>
                        <div className="flex flex-wrap gap-1">
                          {internship.issue_counts.map((count: any, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs text-slate-300">
                              {count.status}: {count.count}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {internship.request_counts && internship.request_counts.length > 0 && (
                      <div>
                        <p className="text-xs text-slate-400 mb-2">Requests por estado:</p>
                        <div className="flex flex-wrap gap-1">
                          {internship.request_counts.map((count: any, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs text-slate-300">
                              {count.status}: {count.count}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Download PDF Button */}
                    <div className="pt-2 border-t border-slate-700 mt-auto">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleDownloadIndividualPDF(internship.id)}
                        disabled={downloadingPDFId === internship.id}
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <Download size={16} />
                        {downloadingPDFId === internship.id ? 'Descargando...' : 'Descargar PDF'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={18} />
                </Button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight size={18} />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
