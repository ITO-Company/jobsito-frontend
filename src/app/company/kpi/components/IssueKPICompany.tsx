import { useEffect } from 'react'
import { useCompanyIssueKPI } from '@/hooks/useKPI'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, AlertCircle, Clock, Zap } from 'lucide-react'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export function IssueKPICompany() {
  const { data, isLoading, error, fetch } = useCompanyIssueKPI()

  useEffect(() => {
    fetch()
  }, [])

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
      <h2 className="text-2xl font-bold">KPIs de Problemas</h2>

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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Problemas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Resueltos', value: data.resolved_issues },
                    { name: 'Activos', value: data.active_issues },
                    { name: 'Pendientes', value: data.pending_issues },
                    { name: 'Atrasados', value: data.overdue_issues },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {[0, 1, 2, 3].map((index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={['#10b981', '#f59e0b', '#6b7280', '#ef4444'][index]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Estado de Problemas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: 'Resueltos', value: data.resolved_issues },
                  { name: 'Activos', value: data.active_issues },
                  { name: 'Pendientes', value: data.pending_issues },
                  { name: 'Atrasados', value: data.overdue_issues },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
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

        {/* Issues with Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Con Solicitudes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{data.issues_with_requests}</span>
                <span className="text-sm text-muted-foreground">/ {data.total_issues}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${data.total_issues > 0 ? (data.issues_with_requests / data.total_issues) * 100 : 0}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground">
                Problemas con solicitudes de ayuda
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Average Resolution Time */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tiempo Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">
                  {data.average_resolution_time_days.toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground">días</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Promedio de resolución
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
