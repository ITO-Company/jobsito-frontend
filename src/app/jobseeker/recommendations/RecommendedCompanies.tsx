import { useEffect } from "react";
import { useML } from "@/hooks/useML";
import { useJobSeekerStore } from "@/stores/jobseeker.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Building2 } from "lucide-react";

export function RecommendedCompanies() {
  const { jobSeeker } = useJobSeekerStore();
  const { recommendedCompanies, loading, error, fetchRecommendedCompanies } = useML();

  useEffect(() => {
    if (jobSeeker?.id) {
      fetchRecommendedCompanies(jobSeeker.id, 8);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && !recommendedCompanies) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-1/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-1/4" />
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
            onClick={() => jobSeeker?.id && fetchRecommendedCompanies(jobSeeker.id)}
            className="mt-4"
            variant="outline"
          >
            Reintentar
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!recommendedCompanies || recommendedCompanies.count === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">No hay empresas recomendadas disponibles</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            Empresas Recomendadas
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {recommendedCompanies.count} empresas que podrían ser perfectas para ti
          </p>
        </div>
        <Button onClick={() => jobSeeker?.id && fetchRecommendedCompanies(jobSeeker.id)} variant="outline" size="sm">
          Actualizar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendedCompanies.recommendations.map((company) => (
          <Card key={company.company_id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    {company.company_name}
                  </CardTitle>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{(company.match_score * 100).toFixed(0)}%</div>
                  <p className="text-xs text-gray-500">Compatibilidad</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-linear-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${company.match_score * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Ranking</span>
                  <span className="font-bold text-lg text-gray-800">#{company.rank}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
