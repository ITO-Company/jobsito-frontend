import { useEffect, useState } from "react";
import { useML } from "@/hooks/useML";
import { useJobSeekerStore } from "@/stores/jobseeker.store";
import { useJobPostingList } from "@/hooks/useJobPosting";
import { useJobPostingStore } from "@/stores/jobposting.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, XCircle, Building2, Zap, TrendingUp } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { JobPostingResponse } from "@/services/types/responses";

interface JobPostingUI {
  id: string;
  title: string;
  company: string;
  description?: string;
}

export function MatchDetails() {
  const { jobSeeker } = useJobSeekerStore();
  const { geminiMatchDetails, loading, error, fetchGeminiMatchDetails } = useML();
  const { fetchJobPostings } = useJobPostingList();
  const { jobPostings } = useJobPostingStore();

  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [allJobs, setAllJobs] = useState<JobPostingUI[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Cargar todas las ofertas laborales
  useEffect(() => {
    const loadAllJobs = async () => {
      setIsLoadingJobs(true);
      try {
        await fetchJobPostings(1000, 0);
      } catch (err) {
        console.error("Error loading job postings:", err);
      } finally {
        setIsLoadingJobs(false);
      }
    };

    loadAllJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Actualizar lista de trabajos cuando jobPostings cambia
  useEffect(() => {
    if (jobPostings && jobPostings.length > 0) {
      setAllJobs(
        jobPostings.map((job: JobPostingResponse) => ({
          id: job.id,
          title: job.title,
          company: "Empresa",
          description: job.description,
        }))
      );
    }
  }, [jobPostings]);

  // Fetch match details cuando se selecciona un trabajo
  useEffect(() => {
    if (selectedJobId && jobSeeker?.id && isSheetOpen) {
      fetchGeminiMatchDetails(jobSeeker.id, selectedJobId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedJobId, isSheetOpen]);

  const handleAnalyzeCompatibility = (jobId: string) => {
    setSelectedJobId(jobId);
    setIsSheetOpen(true);
  };

  const filteredJobs = allJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCompatibilityColor = (score: number) => {
    if (score >= 70) return "text-green-400";
    if (score >= 50) return "text-yellow-400";
    return "text-orange-400";
  };

  const getCompatibilityBg = (score: number) => {
    if (score >= 70) return "bg-green-900/30 border-green-700";
    if (score >= 50) return "bg-yellow-900/30 border-yellow-700";
    return "bg-orange-900/30 border-orange-700";
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 70) return "🟢";
    if (score >= 50) return "🟡";
    return "🔴";
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Ofertas Laborales Disponibles</h2>
        <p className="text-sm text-gray-300 mb-4">Analiza tu compatibilidad con cualquier oferta laboral disponible</p>
      </div>

      {/* Buscador */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por título o empresa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Grid de Ofertas */}
      {isLoadingJobs ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full bg-gray-800" />
          ))}
        </div>
      ) : filteredJobs.length === 0 ? (
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <p className="text-center text-gray-400">
              {allJobs.length === 0
                ? "No hay ofertas disponibles"
                : "No se encontraron ofertas que coincidan con la búsqueda"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <Card
              key={job.id}
              className="hover:shadow-lg transition-shadow bg-gray-900 border-gray-800 hover:border-blue-700"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-2 text-white">{job.title}</CardTitle>
                <p className="text-sm text-gray-400 flex items-center gap-1 mt-2">
                  <Building2 className="h-4 w-4" />
                  {job.company}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {job.description && <p className="text-sm text-gray-300 line-clamp-3">{job.description}</p>}
                <Button
                  onClick={() => handleAnalyzeCompatibility(job.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 font-semibold"
                  size="sm"
                >
                  <Zap className="h-4 w-4" />
                  Ver Compatibilidad
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Sheet de Detalles de Compatibilidad */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="max-w-3xl overflow-y-auto bg-gray-900 border-gray-800 text-white">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Análisis de Compatibilidad
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            {loading && !geminiMatchDetails ? (
              <>
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full bg-gray-800" />
                ))}
              </>
            ) : error ? (
              <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <p className="text-red-300">{error}</p>
              </div>
            ) : geminiMatchDetails ? (
              <>
                {/* Job Info */}
                <div className="space-y-2 pb-4 border-b border-gray-700">
                  <h3 className="font-bold text-xl text-white">{geminiMatchDetails.job.title}</h3>
                  <p className="text-sm text-gray-400">{geminiMatchDetails.job.company}</p>
                  <p className="text-sm text-gray-400">{geminiMatchDetails.job.description}</p>
                </div>

                {/* Overall Score */}
                <div
                  className={`p-4 rounded-lg border ${getCompatibilityBg(
                    geminiMatchDetails.compatibility_analysis.overall_score_numeric
                  )}`}
                >
                  <p className="text-sm text-gray-300 mb-3">Compatibilidad General</p>
                  <div className="flex items-end gap-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`text-5xl font-bold ${getCompatibilityColor(
                          geminiMatchDetails.compatibility_analysis.overall_score_numeric
                        )}`}
                      >
                        {geminiMatchDetails.compatibility_analysis.overall_score}
                      </div>
                      <div className="text-3xl">
                        {getScoreEmoji(geminiMatchDetails.compatibility_analysis.overall_score_numeric)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-300 mb-2">
                        {geminiMatchDetails.compatibility_analysis.nivel_compatibilidad}
                      </p>
                      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-3 rounded-full transition-all ${
                            geminiMatchDetails.compatibility_analysis.overall_score_numeric >= 70
                              ? "bg-gradient-to-r from-green-400 to-green-600"
                              : geminiMatchDetails.compatibility_analysis.overall_score_numeric >= 50
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "bg-gradient-to-r from-orange-400 to-orange-600"
                          }`}
                          style={{ width: `${geminiMatchDetails.compatibility_analysis.overall_score_numeric}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mt-3 flex items-start gap-2">
                    <span>{geminiMatchDetails.compatibility_analysis.recommendation}</span>
                  </p>
                </div>

                {/* Breakdown by Category */}
                <div className="space-y-3">
                  {/* Skills */}
                  <CompatibilityItem
                    label="Habilidades"
                    score={geminiMatchDetails.compatibility_analysis.breakdown.habilidades_compatibilidad.score_numeric}
                    weight={geminiMatchDetails.compatibility_analysis.breakdown.habilidades_compatibilidad.weight}
                    analysis={geminiMatchDetails.compatibility_analysis.breakdown.habilidades_compatibilidad.analysis}
                    matches={
                      geminiMatchDetails.compatibility_analysis.breakdown.habilidades_compatibilidad
                        .habilidades_coincidentes
                    }
                    gaps={
                      geminiMatchDetails.compatibility_analysis.breakdown.habilidades_compatibilidad
                        .habilidades_faltantes
                    }
                  />

                  {/* Salary */}
                  <CompatibilityItem
                    label="Rango Salarial"
                    score={geminiMatchDetails.compatibility_analysis.breakdown.salario_compatibilidad.score_numeric}
                    weight={geminiMatchDetails.compatibility_analysis.breakdown.salario_compatibilidad.weight}
                    analysis={geminiMatchDetails.compatibility_analysis.breakdown.salario_compatibilidad.analysis}
                    additionalInfo={`Esperado: ${geminiMatchDetails.compatibility_analysis.breakdown.salario_compatibilidad.jobseeker_range} | Oferta: ${geminiMatchDetails.compatibility_analysis.breakdown.salario_compatibilidad.job_range}`}
                  />

                  {/* Location */}
                  <CompatibilityItem
                    label="Ubicación"
                    score={geminiMatchDetails.compatibility_analysis.breakdown.ubicacion_compatibilidad.score_numeric}
                    weight={geminiMatchDetails.compatibility_analysis.breakdown.ubicacion_compatibilidad.weight}
                    analysis={geminiMatchDetails.compatibility_analysis.breakdown.ubicacion_compatibilidad.analysis}
                    additionalInfo={
                      geminiMatchDetails.compatibility_analysis.breakdown.ubicacion_compatibilidad.tipo_compatibilidad
                    }
                  />

                  {/* Experience */}
                  <CompatibilityItem
                    label="Experiencia"
                    score={geminiMatchDetails.compatibility_analysis.breakdown.experiencia_compatibilidad.score_numeric}
                    weight={geminiMatchDetails.compatibility_analysis.breakdown.experiencia_compatibilidad.weight}
                    analysis={geminiMatchDetails.compatibility_analysis.breakdown.experiencia_compatibilidad.analysis}
                    additionalInfo={`Tu: ${geminiMatchDetails.compatibility_analysis.breakdown.experiencia_compatibilidad.jobseeker_experience} | Requerido: ${geminiMatchDetails.compatibility_analysis.breakdown.experiencia_compatibilidad.required_level}`}
                  />

                  {/* Availability */}
                  <CompatibilityItem
                    label="Disponibilidad"
                    score={
                      geminiMatchDetails.compatibility_analysis.breakdown.disponibilidad_compatibilidad.score_numeric
                    }
                    weight={geminiMatchDetails.compatibility_analysis.breakdown.disponibilidad_compatibilidad.weight}
                    analysis={
                      geminiMatchDetails.compatibility_analysis.breakdown.disponibilidad_compatibilidad.analysis
                    }
                    additionalInfo={
                      geminiMatchDetails.compatibility_analysis.breakdown.disponibilidad_compatibilidad
                        .tipo_compatibilidad
                    }
                  />
                </div>

                {/* Summary */}
                <div className="space-y-4 pt-4 border-t border-gray-700">
                  {geminiMatchDetails.summary.strengths.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-bold text-green-400 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Fortalezas
                      </h4>
                      <ul className="space-y-1">
                        {geminiMatchDetails.summary.strengths.map((strength, idx) => (
                          <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-green-400 flex-shrink-0 mt-0.5">✓</span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {geminiMatchDetails.summary.gaps.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-bold text-orange-400 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Brechas
                      </h4>
                      <ul className="space-y-1">
                        {geminiMatchDetails.summary.gaps.map((gap, idx) => (
                          <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-orange-400 flex-shrink-0 mt-0.5">⚠</span>
                            {gap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3 mt-3">
                    <p className="text-sm text-blue-300">
                      <span className="font-semibold">Recomendación: </span>
                      {geminiMatchDetails.summary.recommendation_text}
                    </p>
                  </div>
                </div>

                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                  Aplicar a este trabajo
                </Button>
              </>
            ) : (
              <p className="text-center text-gray-400 py-8">Cargando análisis de compatibilidad...</p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

interface CompatibilityItemProps {
  label: string;
  score: number;
  weight: string;
  analysis: string;
  matches?: string[];
  gaps?: string[];
  additionalInfo?: string;
}

function CompatibilityItem({ label, score, weight, analysis, matches, gaps, additionalInfo }: CompatibilityItemProps) {
  const scoreColor = score >= 70 ? "text-green-400" : score >= 50 ? "text-yellow-400" : "text-orange-400";
  const bgColor =
    score >= 70
      ? "bg-green-900/20 border-green-700"
      : score >= 50
      ? "bg-yellow-900/20 border-yellow-700"
      : "bg-orange-900/20 border-orange-700";

  return (
    <div className={`p-3 rounded-lg border ${bgColor}`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-white">{label}</p>
          <p className="text-xs text-gray-400">{weight}</p>
        </div>
        <div className={`text-2xl font-bold ${scoreColor}`}>{score}%</div>
      </div>

      <p className="text-sm text-gray-300 mb-2">{analysis}</p>

      {additionalInfo && <p className="text-xs text-gray-400 mb-2">{additionalInfo}</p>}

      {matches && matches.length > 0 && (
        <div className="mb-2">
          <p className="text-xs text-green-400 font-semibold mb-1">Coincidencias:</p>
          <div className="flex flex-wrap gap-1">
            {matches.map((match, idx) => (
              <Badge key={idx} className="bg-green-900 text-green-300 border-green-700 border text-xs">
                {match}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {gaps && gaps.length > 0 && (
        <div>
          <p className="text-xs text-orange-400 font-semibold mb-1">Faltantes:</p>
          <div className="flex flex-wrap gap-1">
            {gaps.map((gap, idx) => (
              <Badge key={idx} className="bg-orange-900 text-orange-300 border-orange-700 border text-xs">
                {gap}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
