import { useEffect, useState } from "react";
import { useML } from "@/hooks/useML";
import { useJobSeekerStore } from "@/stores/jobseeker.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, CheckCircle, XCircle, Building2 } from "lucide-react";
import type { JobRecommendation } from "@/services/ml.service";

export function MatchDetails() {
  const { jobSeeker } = useJobSeekerStore();
  const { jobRecommendations, matchDetails, loading, error, fetchMatchDetails } = useML();
  const [selectedJob, setSelectedJob] = useState<JobRecommendation | null>(null);

  useEffect(() => {
    if (selectedJob && jobSeeker?.id) {
      fetchMatchDetails(jobSeeker.id, selectedJob.job_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedJob]);

  if (!jobRecommendations || jobRecommendations.count === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">Carga primero las recomendaciones de trabajos</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-4">Detalles de Compatibilidad</h2>
        <p className="text-sm text-gray-600 mb-4">
          Selecciona un trabajo para ver el análisis detallado de compatibilidad
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Lista de trabajos */}
        <div className="lg:col-span-1 space-y-2 max-h-96 overflow-y-auto">
          {jobRecommendations.recommendations.map((job) => (
            <button
              key={job.job_id}
              onClick={() => setSelectedJob(job)}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                selectedJob?.job_id === job.job_id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-400 bg-white"
              }`}
            >
              <p className="font-medium text-sm">{job.title}</p>
              <p className="text-xs text-gray-600">{job.company}</p>
              <p className="text-xs font-semibold text-green-600 mt-1">{(job.match_score * 100).toFixed(0)}% match</p>
            </button>
          ))}
        </div>

        {/* Detalles */}
        <div className="lg:col-span-2">
          {loading && !matchDetails ? (
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <p className="text-red-700">{error}</p>
                </div>
              </CardContent>
            </Card>
          ) : matchDetails ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  {matchDetails.job_title}
                </CardTitle>
                <p className="text-sm text-gray-600 mt-2">{matchDetails.company}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Score General */}
                <div className="bg-linear-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Compatibilidad General</p>
                  <div className="flex items-end gap-3">
                    <div className="text-3xl font-bold text-green-600">
                      {(matchDetails.match_score * 100).toFixed(0)}%
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-linear-to-r from-green-400 to-green-600 h-3 rounded-full"
                        style={{ width: `${matchDetails.match_score * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Detalles */}
                <div className="space-y-3">
                  <DetailItem label="Skills" value={matchDetails.skill_match} icon="check" />
                  <DetailItem label="Rango Salarial" value={matchDetails.salary_compatibility} icon="check" />
                  <DetailItem label="Experiencia" value={matchDetails.experience_match} icon="check" />
                  <DetailItem label="Ubicación" value={matchDetails.location_match} icon="check" />
                </div>

                <Button className="w-full mt-4" variant="default">
                  Aplicar a este trabajo
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">Selecciona un trabajo para ver detalles</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

interface DetailItemProps {
  label: string;
  value: string;
  icon?: "check" | "warning" | "error";
}

function DetailItem({ label, value, icon = "check" }: DetailItemProps) {
  const IconComponent = icon === "check" ? CheckCircle : icon === "warning" ? AlertCircle : XCircle;
  const colorClass = icon === "check" ? "text-green-600" : icon === "warning" ? "text-yellow-600" : "text-red-600";

  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
      <IconComponent className={`h-5 w-5 mt-0.5 shrink-0 ${colorClass}`} />
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">{value}</p>
      </div>
    </div>
  );
}
