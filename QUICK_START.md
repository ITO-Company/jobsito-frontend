# ⚡ Quick Start - IA Recomendaciones

## 🎯 Acceso Rápido

### Ruta Principal

```
/jobseeker/recommendations
```

### Opción en Sidebar

```
📌 IA Recomendaciones (icono Sparkles ✨)
```

## 🔥 Inicio Rápido

### 1. Inicia el Backend ML (en otra terminal)

```bash
cd service_ml

# Entrena los modelos (solo la primera vez)
python -m app.ml.training.train_job_recommendation
python -m app.ml.training.train_company_matching
python -m app.ml.training.train_clustering

# Inicia el servidor
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Inicia el Frontend

```bash
cd jobsito-frontend
npm run dev
```

### 3. Accede a la URL

```
http://localhost:5173/jobseeker/recommendations
```

## 📑 Archivos Principales

| Archivo                     | Propósito                  | Ubicación                            |
| --------------------------- | -------------------------- | ------------------------------------ |
| `ml.service.ts`             | API calls a backend ML     | `src/services/`                      |
| `useML.ts`                  | Hook para manejar ML       | `src/hooks/`                         |
| `RecommendedJobs.tsx`       | Trabajos sugeridos         | `src/app/jobseeker/recommendations/` |
| `MatchDetails.tsx`          | Análisis de compatibilidad | `src/app/jobseeker/recommendations/` |
| `RecommendedCompanies.tsx`  | Empresas sugeridas         | `src/app/jobseeker/recommendations/` |
| `ClusterAnalysis.tsx`       | Análisis de clusters       | `src/app/jobseeker/recommendations/` |
| `recommendations.route.tsx` | Página principal           | `src/app/jobseeker/recommendations/` |

## 🎨 4 Secciones Principales

### 1️⃣ Recomendaciones

```
📌 10 trabajos recomendados
📊 Score de compatibilidad (0-100%)
🔄 Actualizar dinámicamente
```

### 2️⃣ Compatibilidad

```
🎯 Selecciona un trabajo
📈 Ve análisis detallado
✓ Skills, salario, experiencia, ubicación
```

### 3️⃣ Empresas

```
🏢 8 empresas recomendadas
💯 Ordenadas por compatibilidad
📊 Grid responsive
```

### 4️⃣ Clusters

```
👥 Tu cluster de candidatos similares
🤝 Candidatos similares (top 5)
📍 Distancia de similitud
```

## 🔌 Hook useML - Uso Rápido

```typescript
import { useML } from "@/hooks/useML";
import { useJobSeekerStore } from "@/stores/jobseeker.store";

export function MyComponent() {
  const { jobSeeker } = useJobSeekerStore();
  const { jobRecommendations, loading, fetchJobRecommendations } = useML();

  useEffect(() => {
    if (jobSeeker?.id) {
      fetchJobRecommendations(jobSeeker.id, 10);
    }
  }, []);

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          {jobRecommendations?.recommendations.map((job) => (
            <div key={job.job_id}>
              {job.title} - {(job.match_score * 100).toFixed(0)}%
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## 🔄 Endpoints Disponibles

```typescript
// Job Recommendations
await fetchJobRecommendations(jobseeker_id, 10);
await fetchMatchDetails(jobseeker_id, job_id);

// Company Matching
await fetchRecommendedCompanies(jobseeker_id, 5);

// Clustering
await fetchCluster(jobseeker_id);
await fetchAllClusters();
await fetchSimilarCandidates(jobseeker_id, 5);
```

## 🎨 Colores y Estilos

```css
/* Compatibilidad Alta */
bg-green-600, text-green-600

/* Información General */
bg-blue-600, text-blue-600

/* Clusters */
bg-purple-600, text-purple-600

/* Distancia */
bg-orange-600, text-orange-600
```

## 🐛 Solución Rápida de Problemas

| Problema               | Solución                               |
| ---------------------- | -------------------------------------- |
| "Modelo no encontrado" | Entrena los modelos primero            |
| "Error 404"            | Verifica que jobseeker_id sea válido   |
| "Error de conexión"    | Asegúrate que ML server esté en 8000   |
| "No hay datos"         | Recarga la página o click "Actualizar" |

## 📊 Estados de la Interfaz

```
🔄 Loading    → Skeleton screens
✅ Success    → Muestra datos
❌ Error      → Card rojo con mensaje
📭 Empty      → Mensaje "No hay datos"
```

## 🚀 Deployment

Para producción, actualiza:

```env
VITE_API_URL_ML=https://api-ml.tudominio.com/api/ml/
```

## 📚 Documentación Completa

Para más detalles, consulta:

- `ML_INTEGRATION.md` - Guía completa
- `IMPLEMENTATION_SUMMARY.md` - Resumen técnico
- `ML_TESTING_GUIDE.md` - Guía de pruebas del backend

---

**¡Listo para usar!** 🎉
