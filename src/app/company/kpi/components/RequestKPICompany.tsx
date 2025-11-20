import { useEffect } from 'react'
import { useCompanyRequestKPI } from '@/hooks/useKPI'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, XCircle, Clock, Inbox } from 'lucide-react'
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

export function RequestKPICompany() {
  const { data, isLoading, error, fetch } = useCompanyRequestKPI()

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
      title: 'Total de Solicitudes',
      value: data.total_requests,
      icon: Inbox,
      color: 'bg-blue-100 dark:bg-blue-900',
      textColor: 'text-blue-900 dark:text-blue-100',
    },
    {
      title: 'Aprobadas',
      value: data.approved_requests,
      icon: CheckCircle2,
      color: 'bg-green-100 dark:bg-green-900',
      textColor: 'text-green-900 dark:text-green-100',
    },
    {
      title: 'Rechazadas',
      value: data.rejected_requests,
      icon: XCircle,
      color: 'bg-red-100 dark:bg-red-900',
      textColor: 'text-red-900 dark:text-red-100',
    },
    {
      title: 'Pendientes',
      value: data.pending_requests,
      icon: Clock,
      color: 'bg-yellow-100 dark:bg-yellow-900',
      textColor: 'text-yellow-900 dark:text-yellow-100',
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">KPIs de Solicitudes</h2>

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
        {/* Pie Chart for Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Solicitudes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Aprobadas', value: data.approved_requests },
                    { name: 'Rechazadas', value: data.rejected_requests },
                    { name: 'Pendientes', value: data.pending_requests },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {[0, 1, 2].map((index) => (
                    <Cell key={`cell-${index}`} fill={['#10b981', '#ef4444', '#f59e0b'][index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart for Status */}
        <Card>
          <CardHeader>
            <CardTitle>Estado de Solicitudes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: 'Aprobadas', value: data.approved_requests },
                  { name: 'Rechazadas', value: data.rejected_requests },
                  { name: 'Pendientes', value: data.pending_requests },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Rates and Percentages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Approval Rate */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tasa de Aprobación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{data.approval_rate.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(data.approval_rate, 100)}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rejection Rate */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tasa de Rechazo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{data.rejection_rate.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(data.rejection_rate, 100)}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Percentage */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">% Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{data.pending_percentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(data.pending_percentage, 100)}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Average Review Time */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tiempo Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{data.average_review_time_days.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">días</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Promedio de revisión
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
