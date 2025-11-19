import { useEffect } from "react";
import { useML } from "@/hooks/useML";
import { useJobSeekerStore } from "@/stores/jobseeker.store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Briefcase, TrendingUp } from "lucide-react";

export function RecommendedJobs() {
  const { jobSeeker } = useJobSeekerStore();
  const { jobRecommendations, loading, error, fetchJobRecommendations } = useML();

  useEffect(() => {
    if (jobSeeker?.id) {
      fetchJobRecommendations(jobSeeker.id, 10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && !jobRecommendations) {
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
              <p className="font-medium text-red-900">Error</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
          <Button
            onClick={() => jobSeeker?.id && fetchJobRecommendations(jobSeeker.id)}
            className="mt-4"
            variant="outline"
          >
            Reintentar
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!jobRecommendations || jobRecommendations.count === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">No hay recomendaciones disponibles</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            Trabajos Recomendados
          </h2>
          <p className="text-sm text-gray-600 mt-1">{jobRecommendations.count} trabajos que coinciden con tu perfil</p>
        </div>
        <Button onClick={() => jobSeeker?.id && fetchJobRecommendations(jobSeeker.id)} variant="outline" size="sm">
          Actualizar
        </Button>
      </div>

      <div className="grid gap-4">
        {jobRecommendations.recommendations.map((job) => (
          <Card key={job.job_id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                    {job.title}
                  </CardTitle>
                  <CardDescription>{job.company}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{(job.score * 100).toFixed(0)}%</div>
                  <p className="text-xs text-gray-500">Compatibilidad</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                  <div
                    className="bg-linear-to-r from-green-400 to-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${job.score * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">#{job.rank}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
