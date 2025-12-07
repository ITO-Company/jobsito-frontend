import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useInternshipOverview } from '@/hooks/useInternship'
import { internshipService } from '@/services/internship.service'
import { useInternshipStore } from '@/stores/internship.store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Briefcase, Building, Download } from 'lucide-react'

export function InternshipOverview() {
  const navigate = useNavigate()
  const storeInternshipId = useInternshipStore((state) => state.internshipId)
  const { overview, isLoading, error, fetchOverview } = useInternshipOverview()
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false)

  // Obtener internship ID del store o directamente de localStorage
  const internshipId = storeInternshipId || (() => {
    try {
      const stored = localStorage.getItem('internship-store')
      if (stored) {
        const parsed = JSON.parse(stored)
        return parsed.internshipId
      }
    } catch (e) {
      // Error parsing localStorage
    }
    return null
  })()

  useEffect(() => {
    if (!internshipId) {
      navigate('/intern/internships')
      return
    }

    fetchOverview(internshipId)
  }, [internshipId, fetchOverview, navigate])

  const handleDownloadPDF = async () => {
    try {
      setIsDownloadingPDF(true)
      const response = await internshipService.downloadOverviewPDF(internshipId)
      const url = window.URL.createObjectURL(response.data)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `intership-${internshipId}.pdf`)
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

  if (isLoading) {
    return <p>Cargando información general...</p>
  }

  if (error) {
    return <div className="p-4 border border-destructive rounded text-destructive">{error}</div>
  }

  if (!overview) {
    return <p>Información no encontrada</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Información General de Pasantía</h1>
        <div className="flex gap-2">
          <Button
            onClick={handleDownloadPDF}
            disabled={isDownloadingPDF}
            className="flex items-center gap-2"
          >
            <Download size={18} />
            {isDownloadingPDF ? 'Descargando...' : 'Descargar PDF'}
          </Button>
          <Button onClick={() => navigate('/intern/internships')} variant="outline">
            Volver
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{overview.job_posting?.title || 'Oferta sin título'}</CardTitle>
              <p className="text-muted-foreground mt-2">Estado: </p>
            </div>
            <Badge variant="default">
              {overview.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Información de la Empresa */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Información de la Empresa</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Building size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Empresa</p>
                  <p className="font-medium">{overview.company_profile?.name || 'Sin nombre'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fechas */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Período</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Fecha de Inicio</p>
                  <p className="font-medium">{new Date(overview.start_date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Fecha de Término</p>
                  <p className="font-medium">{new Date(overview.end_date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detalles de la Oferta */}
          {overview.job_posting && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Detalles de la Oferta</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Descripción</p>
                  <p className="font-medium whitespace-pre-wrap">{overview.job_posting.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase size={18} className="text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Rango salarial</p>
                    <p className="font-medium">${overview.job_posting.salary_min} - ${overview.job_posting.salary_max}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Overview Counts */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Resumen</h3>
            
            {/* Total Counts */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card className="bg-muted/50">
                <CardContent className="pt-6 text-center">
                  <p className="text-3xl font-bold">{overview.milestone_counts?.length || 0}</p>
                  <p className="text-sm text-muted-foreground mt-1">Hitos Total</p>
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardContent className="pt-6 text-center">
                  <p className="text-3xl font-bold">{overview.issue_counts?.length || 0}</p>
                  <p className="text-sm text-muted-foreground mt-1">Issues Total</p>
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardContent className="pt-6 text-center">
                  <p className="text-3xl font-bold">{overview.request_counts?.length || 0}</p>
                  <p className="text-sm text-muted-foreground mt-1">Requests Total</p>
                </CardContent>
              </Card>
            </div>

            {/* Hitos by status */}
            {overview.milestone_counts && overview.milestone_counts.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Hitos por Estado</h4>
                <div className="flex flex-wrap gap-2">
                  {overview.milestone_counts.map((count: any, idx: number) => (
                    <Badge key={idx} variant="outline">
                      {count.status}: {count.count}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Issues by status */}
            {overview.issue_counts && overview.issue_counts.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Issues por Estado</h4>
                <div className="flex flex-wrap gap-2">
                  {overview.issue_counts.map((count: any, idx: number) => (
                    <Badge key={idx} variant="outline">
                      {count.status}: {count.count}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Requests by status */}
            {overview.request_counts && overview.request_counts.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Requests por Estado</h4>
                <div className="flex flex-wrap gap-2">
                  {overview.request_counts.map((count: any, idx: number) => (
                    <Badge key={idx} variant="outline">
                      {count.status}: {count.count}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
