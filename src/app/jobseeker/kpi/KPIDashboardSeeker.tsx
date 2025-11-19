import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useInternshipDetail } from '@/hooks/useInternship'
import { ChevronLeft } from 'lucide-react'
import { MilestoneKPISeeker } from './components/MilestoneKPISeeker'
import { IssueKPISeeker } from './components/IssueKPISeeker'
import { RequestKPISeeker } from './components/RequestKPISeeker'

export function KPIDashboardSeeker() {
  const navigate = useNavigate()
  const { internshipId } = useParams()
  const { internship, isLoading } = useInternshipDetail()
  const [activeTab, setActiveTab] = useState('milestones')

  useEffect(() => {
    if (internshipId) {
      // Fetch internship details if needed
    }
  }, [internshipId])

  if (isLoading) {
    return <div className="text-muted-foreground">Cargando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            size="sm"
            className="mb-2"
          >
            <ChevronLeft size={16} className="mr-2" />
            Atrás
          </Button>
          <h1 className="text-3xl font-bold">KPIs de Aprendizaje</h1>
          <p className="text-muted-foreground mt-2">
            Monitorea tu progreso en hitos, problemas y solicitudes
          </p>
        </div>
      </div>

      {internship && (
        <Card className="bg-muted">
          <CardContent className="pt-6">
            <p className="text-sm">
              <span className="font-semibold">Aprendizaje:</span> {internship.job_seeker?.name || 'N/A'}
            </p>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-2 border-b">
        <Button
          variant={activeTab === 'milestones' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('milestones')}
          className="rounded-none border-b-2"
        >
          Hitos
        </Button>
        <Button
          variant={activeTab === 'issues' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('issues')}
          className="rounded-none border-b-2"
        >
          Problemas
        </Button>
        <Button
          variant={activeTab === 'requests' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('requests')}
          className="rounded-none border-b-2"
        >
          Solicitudes
        </Button>
      </div>

      <div className="space-y-4">
        {activeTab === 'milestones' && internshipId && <MilestoneKPISeeker intershipId={internshipId} />}
        {activeTab === 'issues' && internshipId && <IssueKPISeeker intershipId={internshipId} />}
        {activeTab === 'requests' && internshipId && <RequestKPISeeker intershipId={internshipId} />}
      </div>
    </div>
  )
}
