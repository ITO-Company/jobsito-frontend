import { useEffect } from 'react'
import { useCompanyMilestoneKPI } from '@/hooks/useKPI'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Clock, AlertCircle, Target } from 'lucide-react'
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
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'

export function MilestoneKPICompany() {
  const { data, isLoading, error, fetch } = useCompanyMilestoneKPI()

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
      title: 'Total de Hitos',
      value: data.total_milestones,
      icon: Target,
      color: 'bg-blue-100 dark:bg-blue-900',
      textColor: 'text-blue-900 dark:text-blue-100',
    },
    {
      title: 'Completados',
      value: data.completed_milestones,
      icon: CheckCircle2,
      color: 'bg-green-100 dark:bg-green-900',
      textColor: 'text-green-900 dark:text-green-100',
    },
    {
      title: 'Activos',
      value: data.active_milestones,
      icon: Clock,
      color: 'bg-yellow-100 dark:bg-yellow-900',
      textColor: 'text-yellow-900 dark:text-yellow-100',
    },
    {
      title: 'Atrasados',
      value: data.overdue_milestones,
      icon: AlertCircle,
      color: 'bg-red-100 dark:bg-red-900',
      textColor: 'text-red-900 dark:text-red-100',
    },
  ]

  // Data for pie chart
  const pieData = [
    { name: 'Completados', value: data.completed_milestones },
    { name: 'Activos', value: data.active_milestones },
    { name: 'Pendientes', value: data.pending_milestones },
    { name: 'Atrasados', value: data.overdue_milestones },
  ]

  // Data for bar chart
  const barData = [
    {
      name: 'Completados',
      value: data.completed_milestones,
    },
    {
      name: 'Activos',
      value: data.active_milestones,
    },
    {
      name: 'Pendientes',
      value: data.pending_milestones,
    },
    {
      name: 'Atrasados',
      value: data.overdue_milestones,
    },
  ]

  const COLORS = ['#10b981', '#f59e0b', '#6b7280', '#ef4444']

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">KPIs de Hitos</h2>

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
            <CardTitle>Distribución de Hitos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
            <CardTitle>Estado de Hitos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Progress Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Completion Rate */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tasa de Finalización</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{data.completion_rate.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(data.completion_rate, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground">
                {data.completed_milestones} de {data.total_milestones} completados
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
                {data.overdue_milestones} atrasados
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Average Completion Time */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tiempo Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">
                  {data.average_completion_time_days.toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground">días</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Promedio de finalización de hitos
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
