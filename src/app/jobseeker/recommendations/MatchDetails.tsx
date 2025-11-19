import { useEffect, useState } from "react";
import { useML } from "@/hooks/useML";
import { useJobSeekerStore } from "@/stores/jobseeker.store";
import { useJobPostingList } from "@/hooks/useJobPosting";
import { useJobPostingStore } from "@/stores/jobposting.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, CheckCircle, XCircle, Building2, Zap } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { JobPostingResponse } from "@/services/types/responses";

interface JobPostingUI {
  id: string;
  title: string;
  company: string;
  description?: string;
}

export function MatchDetails() {
  const { jobSeeker } = useJobSeekerStore();
  const { matchDetails, loading, error, fetchMatchDetails } = useML();
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
        await fetchJobPostings(1000, 0); // Cargar un número grande de ofertas
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
          company: "Empresa", // JobPostingResponse no incluye company
          description: job.description,
        }))
      );
    }
  }, [jobPostings]);

  // Fetch match details cuando se selecciona un trabajo
  useEffect(() => {
    if (selectedJobId && jobSeeker?.id && isSheetOpen) {
      fetchMatchDetails(jobSeeker.id, selectedJobId);
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

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">Ofertas Laborales Disponibles</h2>
        <p className="text-sm text-gray-600 mb-4">
          Analiza tu compatibilidad con cualquier oferta laboral disponible
        </p>
      </div>

      {/* Buscador */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por título o empresa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Grid de Ofertas */}
      {isLoadingJobs ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      ) : filteredJobs.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">
              {allJobs.length === 0 ? "No hay ofertas disponibles" : "No se encontraron ofertas que coincidan con la búsqueda"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-2">{job.title}</CardTitle>
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-2">
                  <Building2 className="h-4 w-4" />
                  {job.company}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {job.description && (
                  <p className="text-sm text-gray-600 line-clamp-3">{job.description}</p>
                )}
                <Button
                  onClick={() => handleAnalyzeCompatibility(job.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
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
        <SheetContent className="max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              Análisis de Compatibilidad
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            {loading && !matchDetails ? (
              <>
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-red-700">{error}</p>
              </div>
            ) : matchDetails ? (
              <>
                <div>
                  <h3 className="font-semibold text-lg">{matchDetails.job_title}</h3>
                  <p className="text-sm text-gray-600">{matchDetails.company}</p>
                </div>

                {/* Score General */}
                <div className="bg-linear-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                  <p className="text-sm text-gray-600 mb-2">Compatibilidad General</p>
                  <div className="flex items-end gap-3">
                    <div className="text-4xl font-bold text-green-600">
                      {(matchDetails.match_score * 100).toFixed(0)}%
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-linear-to-r from-green-400 to-green-600 h-3 rounded-full transition-all"
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

                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                  Aplicar a este trabajo
                </Button>
              </>
            ) : (
              <p className="text-center text-gray-500 py-8">Cargando análisis de compatibilidad...</p>
            )}
          </div>
        </SheetContent>
      </Sheet>
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
