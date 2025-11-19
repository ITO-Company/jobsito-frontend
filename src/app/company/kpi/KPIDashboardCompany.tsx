import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MilestoneKPICompany } from './components/MilestoneKPICompany'
import { IssueKPICompany } from './components/IssueKPICompany'
import { RequestKPICompany } from './components/RequestKPICompany'

export function KPIDashboardCompany() {
  const [activeTab, setActiveTab] = useState('milestones')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard de KPIs</h1>
        <p className="text-muted-foreground mt-2">
          Monitorea el progreso de aprendizajes, problemas y solicitudes
        </p>
      </div>

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
        {activeTab === 'milestones' && <MilestoneKPICompany />}
        {activeTab === 'issues' && <IssueKPICompany />}
        {activeTab === 'requests' && <RequestKPICompany />}
      </div>
    </div>
  )
}
