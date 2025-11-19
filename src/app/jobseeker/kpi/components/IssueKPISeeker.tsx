import { useEffect } from 'react'
import { useIntershipIssueKPI } from '@/hooks/useKPI'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, AlertCircle, Clock, Zap } from 'lucide-react'

interface IssueKPISeekerProps {
  intershipId: string
}

export function IssueKPISeeker({ intershipId }: IssueKPISeekerProps) {
  const { data, isLoading, error, fetch } = useIntershipIssueKPI()

  useEffect(() => {
    fetch(intershipId)
  }, [intershipId])

  if (isLoading) {
    return <div className="text-muted-foreground">Cargando KPIs...</div>
  }

  if (error) {
    return <div className="p-4 border border-destructive rounded text-destructive">{error}</div>
  }

  if (!data) {
    return <div className="text-muted-foreground">No hay datos disponibles</div>
  }

  const metrics = [
    {
      title: 'Total de Problemas',
      value: data.total_issues,
      icon: Zap,
      color: 'bg-blue-100 dark:bg-blue-900',
      textColor: 'text-blue-900 dark:text-blue-100',
    },
    {
      title: 'Resueltos',
      value: data.resolved_issues,
      icon: CheckCircle2,
      color: 'bg-green-100 dark:bg-green-900',
      textColor: 'text-green-900 dark:text-green-100',
    },
    {
      title: 'En Progreso',
      value: data.active_issues,
      icon: Clock,
      color: 'bg-yellow-100 dark:bg-yellow-900',
      textColor: 'text-yellow-900 dark:text-yellow-100',
    },
    {
      title: 'Atrasados',
      value: data.overdue_issues,
      icon: AlertCircle,
      color: 'bg-red-100 dark:bg-red-900',
      textColor: 'text-red-900 dark:text-red-100',
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Progreso de Problemas</h2>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.title}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold mt-1">{metric.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${metric.color}`}>
                    <Icon size={20} className={metric.textColor} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Progress Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Resolution Rate */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tasa de Resolución</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{data.resolution_rate.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(data.resolution_rate, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground">
                {data.resolved_issues} de {data.total_issues} resueltos
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Overdue Percentage */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">% de Atrasados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{data.overdue_percentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(data.overdue_percentage, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground">
                {data.overdue_issues} atrasados
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Issues with Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Con Solicitudes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{data.issues_with_requests}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${data.total_issues > 0 ? (data.issues_with_requests / data.total_issues) * 100 : 0}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground">
                Problemas con solicitudes asociadas
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Average Resolution Time */}
      <Card>
        <CardHeader>
          <CardTitle>Tiempo Promedio de Resolución</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold">{data.average_resolution_time_days.toFixed(1)}</span>
            <span className="text-lg text-muted-foreground">días</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Promedio de tiempo para resolver problemas
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
