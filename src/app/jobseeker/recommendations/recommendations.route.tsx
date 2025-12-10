import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecommendedJobs } from "./RecommendedJobs";
import { MatchDetails } from "./MatchDetails";
import { RecommendedCompanies } from "./RecommendedCompanies";
import { ClusterAnalysis } from "./ClusterAnalysis";
import { Sparkles, CheckCircle, Building2, Users } from "lucide-react";

export function RecommendationsPage() {
  const [activeTab, setActiveTab] = useState("jobs");

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-8 w-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-shadow-gray-300">Recomendaciones</h1>
        </div>
        <p className="text-lg text-gray-400">
          Descubre oportunidades perfectas para ti basadas en tu perfil y habilidades
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-linear-to-br from-blue-50 to-blue-100">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-gray-700">Recomendaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-bold text-blue-600">Trabajos Recomendados</div>
            </div>
            <p className="text-xs text-gray-600 mt-2">Análisis de compatibilidad de skills y salario</p>
          </CardContent>
        </Card>

        <Card className="bg-linear-to-br from-green-50 to-green-100">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-gray-700">Compatibilidad</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">Compatibilidad con Ofertas</div>
            <p className="text-xs text-gray-600 mt-2">Porcentaje de concordancia con cada oportunidad</p>
          </CardContent>
        </Card>

        {/* <Card className="bg-linear-to-br from-purple-50 to-purple-100">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-gray-700">Candidatos Similares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">Clusters</div>
            <p className="text-xs text-gray-600 mt-2">Agrupa candidatos con perfiles parecidos</p>
          </CardContent>
        </Card> */}
      </div>

      {/* Tabs Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="jobs" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Recomendaciones</span>
          </TabsTrigger>
          <TabsTrigger value="match" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Compatibilidad</span>
          </TabsTrigger>
          {/* <TabsTrigger value="companies" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Empresas</span>
          </TabsTrigger> */}
          {/* <TabsTrigger value="clusters" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Clusters</span>
          </TabsTrigger> */}
        </TabsList>

        {/* Recommended Jobs */}
        <TabsContent value="jobs" className="space-y-4">
          <RecommendedJobs />
        </TabsContent>

        {/* Match Details */}
        <TabsContent value="match" className="space-y-4">
          <MatchDetails />
        </TabsContent>

        {/* Recommended Companies */}
        {/* <TabsContent value="companies" className="space-y-4">
          <RecommendedCompanies />
        </TabsContent> */}

        {/* Cluster Analysis
        <TabsContent value="clusters" className="space-y-4">
          <ClusterAnalysis />
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
