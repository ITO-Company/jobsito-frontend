import { useEffect } from "react";
import { useML } from "@/hooks/useML";
import { useJobSeekerStore } from "@/stores/jobseeker.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Users, User, TrendingDown } from "lucide-react";

export function ClusterAnalysis() {
  const { jobSeeker } = useJobSeekerStore();
  const { cluster, similarCandidates, loading, error, fetchCluster, fetchSimilarCandidates } = useML();

  useEffect(() => {
    if (jobSeeker?.id) {
      fetchCluster(jobSeeker.id);
      fetchSimilarCandidates(jobSeeker.id, 6);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && !cluster) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-96 w-full" />
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
          <Button onClick={() => jobSeeker?.id && fetchCluster(jobSeeker.id)} className="mt-4" variant="outline">
            Reintentar
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Users className="h-6 w-6" />
        Análisis de Clusters
      </h2>

      <Tabs defaultValue="cluster" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cluster">Tu Cluster</TabsTrigger>
          <TabsTrigger value="similar">Candidatos Similares</TabsTrigger>
        </TabsList>

        {/* Tu Cluster */}
        <TabsContent value="cluster" className="space-y-4">
          {cluster ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Cluster #{cluster.cluster_id}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-linear-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Tamaño del Cluster</p>
                      <p className="text-3xl font-bold text-purple-600">{cluster.cluster_size}</p>
                      <p className="text-xs text-gray-500 mt-1">candidatos similares</p>
                    </div>
                    <div className="bg-linear-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Tu Posición</p>
                      <p className="text-3xl font-bold text-blue-600">Centro</p>
                      <p className="text-xs text-gray-500 mt-1">del cluster</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Miembros del Cluster</h3>
                    {cluster.members && cluster.members.length > 0 ? (
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {cluster.members.map((member) => (
                          <div
                            key={member.jobseeker_id}
                            className={`p-3 rounded-lg border-2 ${
                              member.is_center ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-semibold flex items-center gap-2">
                                  {member.is_center && (
                                    <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">Tú</span>
                                  )}
                                  {member.name}
                                </p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {member.skills && member.skills.length > 0 ? (
                                    member.skills.map((skill) => (
                                      <span key={skill} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                                        {skill}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="text-xs text-gray-500 italic">Sin skills registrados</span>
                                  )}
                                </div>
                                <div className="text-xs text-gray-600 mt-2 space-y-1">
                                  <p>
                                    <strong>Experiencia:</strong> {member.experience}
                                  </p>
                                  <p>
                                    <strong>Salario esperado:</strong> {member.salary_range}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">Sin miembros en este cluster</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">No hay datos de cluster disponibles</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Candidatos Similares */}
        <TabsContent value="similar" className="space-y-4">
          {similarCandidates && similarCandidates.count > 0 ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-orange-600" />
                    Candidatos Similares a Ti
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-2">Basado en skills, experiencia y preferencias salariales</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {similarCandidates.similar_candidates.map((candidate) => (
                      <div
                        key={candidate.jobseeker_id}
                        className={`p-5 rounded-xl border-2 transition-all ${
                          candidate.is_self
                            ? "border-blue-500 bg-linear-to-br from-blue-50 to-blue-100"
                            : "border-gray-200 hover:border-orange-400 bg-white hover:shadow-lg"
                        }`}
                      >
                        {/* Header con nombre, badge y email */}
                        <div className="mb-4">
                          <div className="flex items-start gap-3 mb-2">
                            <div className="h-14 w-14 rounded-full bg-linear-to-br from-purple-400 to-blue-600 flex items-center justify-center shrink-0">
                              <User className="h-7 w-7 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="font-bold text-lg truncate text-gray-900">{candidate.name}</p>
                                {candidate.is_self && (
                                  <span className="px-2.5 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full whitespace-nowrap">
                                    Tú
                                  </span>
                                )}
                              </div>
                              {candidate.email && (
                                <p className="text-xs text-gray-500 truncate mt-1">{candidate.email}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Barra de similitud (solo para otros candidatos) */}
                        {!candidate.is_self && (
                          <div className="mb-4 bg-white p-3 rounded-lg border border-orange-100">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                                Similitud
                              </span>
                              <span className="text-lg font-bold text-orange-600">
                                {((1 - candidate.distance) * 100).toFixed(0)}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                              <div
                                className="bg-linear-to-r from-orange-400 to-orange-600 h-3 rounded-full transition-all"
                                style={{ width: `${(1 - candidate.distance) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Grid de información - 2x2 */}
                        <div className="grid grid-cols-2 gap-3">
                          {candidate.location && (
                            <div className="bg-linear-to-br from-pink-50 to-pink-100 p-3 rounded-lg border border-pink-100">
                              <p className="text-xs font-semibold text-pink-700 mb-1">📍 UBICACIÓN</p>
                              <p className="font-bold text-gray-900 text-sm">{candidate.location}</p>
                            </div>
                          )}
                          {candidate.experience && (
                            <div className="bg-linear-to-br from-purple-50 to-purple-100 p-3 rounded-lg border border-purple-100">
                              <p className="text-xs font-semibold text-purple-700 mb-1">💼 EXPERIENCIA</p>
                              <p className="font-bold text-gray-900 text-sm">{candidate.experience}</p>
                            </div>
                          )}
                          {typeof candidate.num_skills === "number" && (
                            <div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-100">
                              <p className="text-xs font-semibold text-blue-700 mb-1">🎯 SKILLS</p>
                              <p className="font-bold text-gray-900 text-sm">{candidate.num_skills}</p>
                            </div>
                          )}
                          {typeof candidate.cluster === "number" && (
                            <div className="bg-linear-to-br from-indigo-50 to-indigo-100 p-3 rounded-lg border border-indigo-100">
                              <p className="text-xs font-semibold text-indigo-700 mb-1">👥 CLUSTER</p>
                              <p className="font-bold text-gray-900 text-sm">#{candidate.cluster}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">No hay candidatos similares disponibles</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
