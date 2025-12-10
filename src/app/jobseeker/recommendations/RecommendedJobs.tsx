import { useEffect, useState } from "react";
import { useML } from "@/hooks/useML";
import { useJobSeekerStore } from "@/stores/jobseeker.store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Briefcase, TrendingUp, MapPin, DollarSign, Zap, ChevronDown, ChevronUp } from "lucide-react";

export function RecommendedJobs() {
  const { jobSeeker } = useJobSeekerStore();
  const { geminiRecommendations, loading, error, fetchGeminiRecommendations } = useML();
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  useEffect(() => {
    if (jobSeeker?.id) {
      fetchGeminiRecommendations(jobSeeker.id, 10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobSeeker?.id]);

  if (!jobSeeker?.id) {
    return (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-900">Información incompleta</p>
              <p className="text-sm text-yellow-700">Por favor, completa tu perfil para obtener recomendaciones</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (loading && !geminiRecommendations) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-1/4 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <div>
              <p className="font-medium text-red-900">Error al obtener recomendaciones</p>
              <p className="text-sm text-red-700">
                {error.includes("404")
                  ? "Tu perfil no tiene datos de entrenamiento en el modelo de ML. Por favor, completa tu información y espera a que el modelo sea reentrenado."
                  : error}
              </p>
            </div>
          </div>
          <Button
            onClick={() => jobSeeker?.id && fetchGeminiRecommendations(jobSeeker.id)}
            className="mt-4"
            variant="outline"
          >
            Reintentar
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!geminiRecommendations || geminiRecommendations.count === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">No hay recomendaciones disponibles en este momento</p>
        </CardContent>
      </Card>
    );
  }

  const getScoreColor = (score: string) => {
    const scoreNum = parseInt(score.replace("%", ""));
    if (scoreNum >= 70) return "from-green-400 to-green-600";
    if (scoreNum >= 50) return "from-yellow-400 to-yellow-600";
    return "from-orange-400 to-orange-600";
  };

  const getScoreBgColor = (score: string) => {
    const scoreNum = parseInt(score.replace("%", ""));
    if (scoreNum >= 70) return "bg-green-100 text-green-800";
    if (scoreNum >= 50) return "bg-yellow-100 text-yellow-800";
    return "bg-orange-100 text-orange-800";
  };

  const getSalaryDisplay = (min: number, max: number) => {
    if (min === 0 && max === 0) return "Salario no especificado";
    if (min > 100000) return `$${(min / 1000000).toFixed(1)}M - $${(max / 1000000).toFixed(1)}M`;
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Header con resumen */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2 text-white">
              <TrendingUp className="h-8 w-8 text-blue-400" />
              Trabajos Recomendados para {geminiRecommendations.jobseeker_name}
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              {geminiRecommendations.count} oportunidades seleccionadas por IA
            </p>
          </div>
          <Button
            onClick={() => jobSeeker?.id && fetchGeminiRecommendations(jobSeeker.id)}
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-200 hover:bg-gray-800"
          >
            Actualizar
          </Button>
        </div>

        {/* Summary Card */}
        {geminiRecommendations.summary && (
          <Card className="bg-gradient-to-r from-blue-900 to-indigo-900 border-blue-700">
            <CardContent className="pt-4">
              <p className="text-sm text-gray-100 leading-relaxed">{geminiRecommendations.summary}</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Jobs Grid */}
      <div className="space-y-3">
        {geminiRecommendations.recommendations.map((job, index) => (
          <Card
            key={job.job_id}
            className="hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer"
            onClick={() => setExpandedJobId(expandedJobId === job.job_id ? null : job.job_id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                {/* Left side - Job Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-blue-900 flex items-center justify-center mt-1">
                      <Briefcase className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="truncate text-lg text-white">
                          #{index + 1} - {job.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-sm text-gray-300">{job.company}</CardDescription>
                    </div>
                  </div>
                </div>

                {/* Right side - Score */}
                <div className="flex-shrink-0 text-right">
                  <div className={`text-3xl font-bold ${getScoreBgColor(job.score)} rounded-lg px-4 py-2 inline-block`}>
                    {job.score}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Compatibilidad</p>
                </div>

                {/* Expand button */}
                <div className="flex-shrink-0">
                  {expandedJobId === job.job_id ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3 w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className={`bg-gradient-to-r ${getScoreColor(job.score)} h-2 transition-all duration-500`}
                  style={{ width: job.score }}
                />
              </div>
            </CardHeader>

            {/* Collapsed view - Quick info */}
            {expandedJobId !== job.job_id && (
              <CardContent className="pb-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-200 font-medium">{job.details.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="text-gray-200 font-medium">
                      {getSalaryDisplay(job.details.salary_min, job.details.salary_max)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span className="text-gray-200 font-medium">{job.details.experience_level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-purple-500" />
                    <span className="text-gray-200 font-medium">{job.details.work_type}</span>
                  </div>
                </div>
              </CardContent>
            )}

            {/* Expanded view - Full details */}
            {expandedJobId === job.job_id && (
              <CardContent className="space-y-4 pb-4">
                {/* Match Reason */}
                <div className="space-y-2">
                  <h4 className="font-bold text-sm text-white">Razón del Match</h4>
                  <p className="text-sm text-gray-100 leading-relaxed">{job.match_reason}</p>
                </div>

                {/* Job Details Grid */}
                <div className="grid grid-cols-2 gap-3 text-sm pt-2 border-t border-gray-700">
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wide font-semibold">Ubicación</p>
                    <p className="font-bold text-gray-100 flex items-center gap-2 mt-2">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      {job.details.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wide font-semibold">Modalidad</p>
                    <p className="font-bold text-gray-100 flex items-center gap-2 mt-2">
                      <Briefcase className="h-4 w-4 text-blue-500" />
                      {job.details.is_remote ? "🌐 Remoto" : "🏢 Presencial"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wide font-semibold">Experiencia</p>
                    <p className="font-bold text-gray-100 flex items-center gap-2 mt-2">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      {job.details.experience_level}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wide font-semibold">Tipo de Trabajo</p>
                    <p className="font-bold text-gray-100 mt-2">{job.details.work_type}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-400 text-xs uppercase tracking-wide font-semibold">Rango Salarial</p>
                    <p className="font-bold text-gray-100 flex items-center gap-2 mt-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      {getSalaryDisplay(job.details.salary_min, job.details.salary_max)}
                    </p>
                  </div>
                </div>

                {/* Description */}
                {job.details.description && (
                  <div className="space-y-2 pt-2 border-t border-gray-700">
                    <h4 className="font-bold text-sm text-white">Descripción</h4>
                    <p className="text-sm text-gray-100 leading-relaxed">{job.details.description}</p>
                  </div>
                )}

                {/* Key Matches */}
                {job.key_matches.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-gray-700">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      Coincidencias Clave
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {job.key_matches.map((match, idx) => (
                        <Badge key={idx} className="bg-green-900 text-green-200 border-green-700 border">
                          {match}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Potential Gaps */}
                {job.potential_gaps.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-gray-700">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <span className="text-orange-400">⚠</span>
                      Brechas Potenciales
                    </h4>
                    <div className="space-y-1">
                      {job.potential_gaps.map((gap, idx) => (
                        <p key={idx} className="text-sm text-gray-100 flex items-start gap-2">
                          <span className="text-orange-400 flex-shrink-0 mt-0.5">•</span>
                          <span>{gap}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Required Skills */}
                {job.details.required_skills && (
                  <div className="space-y-2 pt-2 border-t border-gray-700">
                    <h4 className="font-bold text-sm text-white">Habilidades Requeridas</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.details.required_skills.split(",").map((skill, idx) => (
                        <Badge key={idx} className="bg-blue-900 text-blue-200 border-blue-700 border">
                          {skill.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2 border-t border-gray-700">
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 font-semibold text-white">
                    Ver Oferta Completa
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-200 hover:bg-gray-800"
                  >
                    Guardar
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
