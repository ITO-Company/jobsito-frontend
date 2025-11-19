# 🚀 Integración de Inteligencia Artificial - Recomendaciones ML

## Descripción General

Se ha implementado una nueva sección de **"IA Recomendaciones"** en el frontend de Jobsito que integra los servicios de Machine Learning del backend. Esta sección permite a los candidatos de trabajo recibir recomendaciones personalizadas basadas en su perfil, habilidades y preferencias salariales.

## 📁 Estructura de Archivos Creados

```
src/
├── services/
│   └── ml.service.ts              # Servicio para integración con APIs de ML
├── hooks/
│   └── useML.ts                   # Hook personalizado para manejar lógica de ML
└── app/jobseeker/recommendations/
    ├── recommendations.route.tsx  # Página principal con tabs
    ├── RecommendedJobs.tsx        # Componente de trabajos recomendados
    ├── MatchDetails.tsx           # Análisis detallado de compatibilidad
    ├── RecommendedCompanies.tsx   # Empresas recomendadas
    └── ClusterAnalysis.tsx        # Análisis de clusters y candidatos similares
```

## 🔧 Componentes Principales

### 1. **RecommendedJobs** - Trabajos Recomendados

Muestra los trabajos más relevantes para el candidato basados en:

- Coincidencia de skills
- Rango salarial
- Experiencia requerida

**Features:**

- Lista de trabajos con porcentaje de compatibilidad
- Barra de progreso visual
- Botón de actualizar recomendaciones
- Estados de carga y error

### 2. **MatchDetails** - Detalles de Compatibilidad

Análisis detallado del porcentaje de match entre un candidato y un trabajo específico.

**Muestra:**

- Score general de compatibilidad (0-100%)
- Análisis de skills coincidentes
- Compatibilidad salarial
- Nivel de experiencia requerida
- Disponibilidad de ubicación/remoto

### 3. **RecommendedCompanies** - Empresas Recomendadas

Sugiere empresas que podrían ser perfectas para el candidato.

**Features:**

- Grid de empresas con score de compatibilidad
- Ranking visual
- Actualización dinámica

### 4. **ClusterAnalysis** - Análisis de Clusters

Agrupa candidatos similares y muestra candidatos con perfiles parecidos.

**Características:**

- Información del cluster actual
- Lista de miembros con skills similares
- Candidatos similares ordenados por distancia
- Stats de cluster

## 🎨 Navegación

Se ha añadido una nueva opción en el **Sidebar** del candidato:

```
📌 IA Recomendaciones (con icono de Sparkles)
```

Acceso: `/jobseeker/recommendations`

## 📡 Endpoints Integrados

Todos los endpoints se comunican con el servicio ML en `http://localhost:8000/api/ml/`:

### Job Recommendation

```
GET /api/ml/recommendation/recommend/{jobseeker_id}?top_n=10
GET /api/ml/recommendation/match-details/{jobseeker_id}/{job_id}
```

### Company Matching

```
GET /api/ml/matching/recommend-companies/{jobseeker_id}?top_n=5
GET /api/ml/matching/recommend-candidates/{company_id}?top_n=10
GET /api/ml/matching/match-details/{jobseeker_id}/{company_id}
```

### Clustering

```
GET /api/ml/clustering/get-cluster/{jobseeker_id}
GET /api/ml/clustering/all-clusters
GET /api/ml/clustering/similar-candidates/{jobseeker_id}?top_n=5
```

## 🔌 Hook `useML`

El hook `useML` proporciona un interfaz limpio para acceder a todas las funcionalidades de ML:

```typescript
const {
  // Estados
  loading,
  error,

  // Job Recommendations
  jobRecommendations,
  fetchJobRecommendations,

  // Match Details
  matchDetails,
  fetchMatchDetails,

  // Recommended Companies
  recommendedCompanies,
  fetchRecommendedCompanies,

  // Cluster
  cluster,
  fetchCluster,

  // All Clusters
  allClusters,
  fetchAllClusters,

  // Similar Candidates
  similarCandidates,
  fetchSimilarCandidates,

  // Utilities
  clearError,
  resetAll,
} = useML();
```

## 💡 Ejemplo de Uso

```typescript
import { useML } from "@/hooks/useML";
import { useJobSeekerStore } from "@/stores/jobseeker.store";

function MyComponent() {
  const { jobSeeker } = useJobSeekerStore();
  const { jobRecommendations, loading, fetchJobRecommendations } = useML();

  useEffect(() => {
    if (jobSeeker?.id) {
      fetchJobRecommendations(jobSeeker.id, 10);
    }
  }, []);

  return (
    <div>
      {loading && <p>Cargando...</p>}
      {jobRecommendations?.recommendations.map((job) => (
        <div key={job.job_id}>
          {job.title} - {(job.match_score * 100).toFixed(0)}%
        </div>
      ))}
    </div>
  );
}
```

## 🚀 Instalación y Uso

### Requisitos

1. El backend ML debe estar corriendo en `http://localhost:8000`
2. Los modelos deben estar entrenados (ver `ML_TESTING_GUIDE.md`)

### Entrenamiento de Modelos

```bash
# En la carpeta service_ml
python -m app.ml.training.train_job_recommendation
python -m app.ml.training.train_company_matching
python -m app.ml.training.train_clustering
```

### Iniciar el Servidor ML

```bash
cd service_ml
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Usar en Frontend

```bash
npm run dev
```

Luego navega a: `http://localhost:5173/jobseeker/recommendations`

## 🎯 Flujos de Usuario

### Flujo 1: Descubrir Trabajos

1. El usuario va a "IA Recomendaciones"
2. Ve la pestaña de "Recomendaciones" con 10 trabajos sugeridos
3. Cada trabajo muestra el % de compatibilidad
4. Puede ver detalles de cada trabajo

### Flujo 2: Analizar Compatibilidad

1. El usuario va a "Compatibilidad"
2. Selecciona un trabajo de la lista
3. Ve el análisis detallado:
   - Score general
   - Análisis de skills
   - Compatibilidad salarial
   - Experiencia requerida
   - Disponibilidad de ubicación

### Flujo 3: Empresas Recomendadas

1. El usuario va a "Empresas"
2. Ve las 8 empresas mejor recomendadas
3. Cada empresa muestra su score de compatibilidad
4. Puede hacer clic para ver más detalles

### Flujo 4: Análisis de Clusters

1. El usuario va a "Clusters"
2. Pestaña "Tu Cluster": Ve su grupo de candidatos similares
3. Pestaña "Candidatos Similares": Ve los 5 candidatos más similares

## 🎨 Diseño y UI

- **Colores Destacados:**

  - Verde para scores altos de compatibilidad
  - Azul para información general
  - Naranja para distancia de candidatos
  - Púrpura para clusters

- **Componentes UI:**
  - Cards con hover effects
  - Barras de progreso animadas
  - Tabs para navegación
  - Skeleton loaders para estados de carga
  - Error states con mensajes claros

## 🔄 Variables de Entorno

```env
# En .env del frontend
VITE_API_URL_ML=http://localhost:8000/api/ml/
```

## 📝 Tipos de Datos

### JobRecommendation

```typescript
{
  job_id: string;
  title: string;
  company: string;
  match_score: number(0 - 1);
  rank: number;
}
```

### MatchDetails

```typescript
{
  jobseeker_id: string;
  jobseeker_name: string;
  job_id: string;
  job_title: string;
  company: string;
  match_score: number;
  skill_match: string;
  salary_compatibility: string;
  experience_match: string;
  location_match: string;
}
```

### CompanyRecommendation

```typescript
{
  company_id: string;
  company_name: string;
  match_score: number;
  rank: number;
}
```

### ClusterResponse

```typescript
{
  jobseeker_id: string
  jobseeker_name: string
  cluster_id: number
  cluster_size: number
  members: ClusterMember[]
}
```

### SimilarCandidate

```typescript
{
  jobseeker_id: string;
  name: string;
  is_self: boolean;
  distance: number(0 - 1);
}
```

## 🐛 Troubleshooting

### "Error: Modelo no encontrado"

**Solución:** Ejecuta los scripts de entrenamiento primero

### "Error: Candidato no encontrado"

**Solución:** Verifica que el jobseeker_id sea válido y exista en la BD

### "Error de conexión a localhost:8000"

**Solución:** Asegúrate de que el servidor ML esté corriendo

### Las recomendaciones no se actualizan

**Solución:** Click en el botón "Actualizar" o recarga la página

## 🔐 Autenticación

Las requests al API de ML NO incluyen autenticación JWT. Si en el futuro el API de ML requiere autenticación, actualiza `ml.service.ts`:

```typescript
mlAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 📚 Recursos

- Documentación de ML: `service_ml/ML_TESTING_GUIDE.md`
- Frontend: `jobsito-frontend/`
- Backend ML: `service_ml/`

## ✨ Mejoras Futuras

- [ ] Integración con página de candidatos (enterprise/company)
- [ ] Historial de recomendaciones
- [ ] Filtros avanzados
- [ ] Exportar análisis de compatibilidad
- [ ] Notificaciones de nuevas oportunidades
- [ ] Reentrenamiento automático de modelos
- [ ] Dashboard de métricas de ML

---

**Creado:** Noviembre 2025  
**Versión:** 1.0
