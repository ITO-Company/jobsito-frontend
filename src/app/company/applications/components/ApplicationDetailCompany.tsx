import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useApplicationDetail, useApplicationUpdate } from '@/hooks/useApplication'
import { getApplicationStatus, getStatusBadge } from '@/lib/applicationUtils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

export function ApplicationDetailCompany() {
  const { applicationId } = useParams()
  const navigate = useNavigate()
  const { application, isLoading, error, fetchApplication } = useApplicationDetail()
  const { updateApplication, isSubmitting } = useApplicationUpdate()
  const [showNotes, setShowNotes] = useState(false)

  useEffect(() => {
    if (applicationId) {
      fetchApplication(applicationId)
    }
  }, [applicationId])

  const handleAccept = async () => {
    if (!applicationId) return

    try {
      await updateApplication(applicationId, { is_accepted: true })
      await fetchApplication(applicationId)
    } catch (error) {
      console.error('Error al aceptar:', error)
    }
  }

  const handleReject = async () => {
    if (!applicationId) return

    try {
      await updateApplication(applicationId, { is_accepted: false })
      await fetchApplication(applicationId)
    } catch (error) {
      console.error('Error al rechazar:', error)
    }
  }

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (error || !application) {
    return <div className="text-destructive">{error || 'No se encontró la aplicación'}</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Aplicación de {application.job_seeker?.name}</h2>
          <p className="text-muted-foreground">{application.job_seeker?.email}</p>
        </div>
        <Button onClick={() => navigate('/company/applications')} variant="outline">
          Volver
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Estado de la Aplicación</h3>
            <div className="flex gap-2 items-center">
              {(() => {
                const status = getApplicationStatus(application)
                const badge = getStatusBadge(status)
                return (
                  <span className={`px-3 py-1 rounded font-semibold ${badge.className}`}>
                    {badge.label.toUpperCase()}
                  </span>
                )
              })()}
              {application.status_changed_at && (
                <span className="text-xs text-muted-foreground">
                  Actualizado: {new Date(application.status_changed_at).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold">Salario Propuesto</p>
              <p className="text-sm">${application.proposed_salary}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Aplicada</p>
              <p className="text-sm">{new Date(application.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Carta de Presentación</h3>
            <p className="text-sm bg-muted p-3 rounded">{application.cover_letter}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Información del Candidato</h3>
            <div className="space-y-2 bg-muted p-3 rounded text-sm">
              <p>
                <strong>Nombre:</strong> {application.job_seeker?.name}
              </p>
              <p>
                <strong>Email:</strong> {application.job_seeker?.email}
              </p>
              <p>
                <strong>Teléfono:</strong> {application.job_seeker?.phone || 'No especificado'}
              </p>
              <p>
                <strong>Ubicación:</strong> {application.job_seeker?.location || 'No especificada'}
              </p>
              {application.job_seeker?.bio && (
                <p>
                  <strong>Bio:</strong> {application.job_seeker.bio}
                </p>
              )}
            </div>
          </div>

          {showNotes && (
            <div>
              <h3 className="font-semibold mb-2">Notas de la Aplicación</h3>
              <Textarea
                value={application.application_notes || 'No hay notas'}
                readOnly
                rows={4}
                className="bg-muted"
              />
            </div>
          )}

          <div className="flex gap-2 pt-4 flex-wrap">
            <Button
              onClick={handleAccept}
              disabled={isSubmitting || getApplicationStatus(application) === 'accepted'}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? 'Procesando...' : 'Aceptar Candidato'}
            </Button>
            <Button
              onClick={handleReject}
              disabled={isSubmitting}
              variant="destructive"
            >
              {isSubmitting ? 'Procesando...' : 'Rechazar Candidato'}
            </Button>
            <Button onClick={() => setShowNotes(!showNotes)} variant="outline">
              {showNotes ? 'Ocultar Notas' : 'Ver Notas'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
