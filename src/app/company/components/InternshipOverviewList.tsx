import { useEffect, useState } from 'react'
import { useInternshipOverviewList } from '@/hooks/useInternship'
import { internshipService } from '@/services/internship.service'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

export function InternshipOverviewList() {
  const { internships, isLoading, error, fetchOverviewList } = useInternshipOverviewList()
  const [downloadingPDFId, setDownloadingPDFId] = useState<string | null>(null)

  useEffect(() => {
    fetchOverviewList()
  }, [])

  const handleDownloadPDF = async (id: string) => {
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

  if (isLoading) {
    return <p>Cargando información de pasantías...</p>
  }

  if (error) {
    return <div className="p-4 border border-destructive rounded text-destructive">{error}</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Información de Pasantías</h1>
        <p className="text-muted-foreground mt-2">Vista general de todas tus pasantías</p>
      </div>

      {internships.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">No hay pasantías disponibles</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {internships.map((internship) => (
            <Card key={internship.id}>
              <CardHeader>
                <CardTitle className="text-lg">{internship.job_posting?.title || 'Sin título'}</CardTitle>
                <p className="text-sm text-muted-foreground">{internship.company_profile?.name || 'Empresa'}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Job Seeker Info */}
                <div>
                  <p className="text-sm text-muted-foreground">Pasante</p>
                  <p className="font-medium">{internship.job_seeker?.name || 'N/A'}</p>
                  <p className="text-sm text-muted-foreground">{internship.job_seeker?.email || 'N/A'}</p>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Inicio</p>
                    <p className="font-medium">{new Date(internship.start_date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Término</p>
                    <p className="font-medium">{new Date(internship.end_date).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Estado</p>
                  <Badge variant="default">{internship.status}</Badge>
                </div>

                {/* Counts */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{internship.milestone_counts?.length || 0}</p>
                    <p className="text-xs text-muted-foreground">Hitos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{internship.issue_counts?.length || 0}</p>
                    <p className="text-xs text-muted-foreground">Issues</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{internship.request_counts?.length || 0}</p>
                    <p className="text-xs text-muted-foreground">Requests</p>
                  </div>
                </div>

                {/* Detailed counts by status */}
                {internship.milestone_counts && internship.milestone_counts.length > 0 && (
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground mb-2">Hitos por estado:</p>
                    <div className="flex flex-wrap gap-1">
                      {internship.milestone_counts.map((count: any, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {count.status}: {count.count}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {internship.issue_counts && internship.issue_counts.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Issues por estado:</p>
                    <div className="flex flex-wrap gap-1">
                      {internship.issue_counts.map((count: any, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {count.status}: {count.count}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {internship.request_counts && internship.request_counts.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Requests por estado:</p>
                    <div className="flex flex-wrap gap-1">
                      {internship.request_counts.map((count: any, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {count.status}: {count.count}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Download PDF Button */}
                <div className="pt-4 border-t">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleDownloadPDF(internship.id)}
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
      )}
    </div>
  )
}
