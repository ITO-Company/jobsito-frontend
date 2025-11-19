# 📁 Estructura de Archivos - IA Recomendaciones

## 🎯 Archivos Creados

```
jobsito-frontend/
│
├── 📄 ML_INTEGRATION.md              ← Guía completa de integración
├── 📄 IMPLEMENTATION_SUMMARY.md       ← Resumen técnico
├── 📄 QUICK_START.md                 ← Inicio rápido
│
└── src/
    │
    ├── 🔧 services/
    │   └── ml.service.ts             ← Servicio para APIs de ML
    │                                    (getJobRecommendations,
    │                                     getMatchDetails,
    │                                     getRecommendedCompanies,
    │                                     getCluster,
    │                                     getAllClusters,
    │                                     getSimilarCandidates)
    │
    ├── 🪝 hooks/
    │   └── useML.ts                  ← Hook personalizado para ML
    │                                   (maneja estados y lógica)
    │
    ├── 📱 app/jobseeker/
    │   │
    │   ├── 🗂️ recommendations/        ← Carpeta nueva
    │   │   ├── RecommendedJobs.tsx           ← Trabajos recomendados
    │   │   ├── MatchDetails.tsx              ← Análisis de compatibilidad
    │   │   ├── RecommendedCompanies.tsx      ← Empresas recomendadas
    │   │   ├── ClusterAnalysis.tsx           ← Análisis de clusters
    │   │   └── recommendations.route.tsx     ← Página principal con tabs
    │   │
    │   ├── jobseeker.route.tsx       ← MODIFICADO: añadió ruta
    │   └── ... (otros componentes)
    │
    ├── 🎨 components/sidebar/
    │   └── app-sidebar.tsx            ← MODIFICADO: añadió ítem al menú
    │
    └── ... (otros)
```

## 📊 Diagrama de Componentes

```
RecommendationsPage (recommendations.route.tsx)
│
├── Tabs (4 pestañas)
│   │
│   ├─ Tab 1: Recomendaciones
│   │  └── RecommendedJobs
│   │      ├── useML (jobRecommendations)
│   │      ├── useJobSeekerStore
│   │      └── Cards con trabajos
│   │
│   ├─ Tab 2: Compatibilidad
│   │  └── MatchDetails
│   │      ├── useML (matchDetails)
│   │      ├── useJobSeekerStore
│   │      ├── Lista de trabajos (seleccionable)
│   │      └── Análisis detallado
│   │
│   ├─ Tab 3: Empresas
│   │  └── RecommendedCompanies
│   │      ├── useML (recommendedCompanies)
│   │      ├── useJobSeekerStore
│   │      └── Grid de empresas
│   │
│   └─ Tab 4: Clusters
│      └── ClusterAnalysis
│          ├── useML (cluster, similarCandidates)
│          ├── useJobSeekerStore
│          ├── Cluster actual
│          └── Candidatos similares
│
└── Info Card (consejo útil)
```

## 🔄 Flujo de Datos

```
┌─────────────────────────────────┐
│   Componente React              │
│   (RecommendedJobs, etc)        │
└────────────┬────────────────────┘
             │ useML Hook
             ▼
┌─────────────────────────────────┐
│   useML (Hook)                  │
│   - jobRecommendations          │
│   - loading, error              │
│   - fetchJobRecommendations()   │
└────────────┬────────────────────┘
             │ Llamadas a funciones
             ▼
┌─────────────────────────────────┐
│   ml.service.ts                 │
│   - getJobRecommendations()     │
│   - getMatchDetails()           │
│   - etc...                      │
└────────────┬────────────────────┘
             │ Axios HTTP requests
             ▼
┌─────────────────────────────────┐
│   Backend ML                    │
│   http://localhost:8000/api/ml/ │
└─────────────────────────────────┘
```

## 📦 Dependencias Usadas

```typescript
// Ya existentes en el proyecto
import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlertCircle, Briefcase, Building2, Users, ... } from 'lucide-react'

// Zustand (state management)
import { useJobSeekerStore } from '@/stores/jobseeker.store'

// Nuevas creaciones
import { useML } from '@/hooks/useML'
import * as mlService from '@/services/ml.service'
```

## 🎯 Tipos TypeScript Definidos

```typescript
// En ml.service.ts

interface JobRecommendation {
  job_id: string;
  title: string;
  company: string;
  match_score: number;
  rank: number;
}

interface MatchDetailsResponse {
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

interface CompanyRecommendation {
  company_id: string;
  company_name: string;
  match_score: number;
  rank: number;
}

interface ClusterMember {
  jobseeker_id: string;
  name: string;
  skills: string[];
  experience: string;
  salary_range: string;
  is_center: boolean;
}

interface ClusterResponse {
  jobseeker_id: string;
  jobseeker_name: string;
  cluster_id: number;
  cluster_size: number;
  members: ClusterMember[];
}

interface SimilarCandidate {
  jobseeker_id: string;
  name: string;
  is_self: boolean;
  distance: number;
}

interface SimilarCandidatesResponse {
  jobseeker_id: string;
  similar_candidates: SimilarCandidate[];
  count: number;
}
```

## 🎨 Estructura de Carpetas Visual

```
jobsito-frontend/
│
├── 📚 Documentación
│   ├── ML_INTEGRATION.md
│   ├── IMPLEMENTATION_SUMMARY.md
│   ├── QUICK_START.md
│   └── README.md
│
├── 📦 node_modules/
│
├── 🎯 public/
│   └── (recursos estáticos)
│
├── 🎨 src/
│   │
│   ├── 🔧 services/
│   │   ├── ml.service.ts           ✨ NUEVO
│   │   ├── auth.service.ts
│   │   ├── jobposting.service.ts
│   │   └── ...
│   │
│   ├── 🪝 hooks/
│   │   ├── useML.ts                ✨ NUEVO
│   │   ├── useAuth.ts
│   │   ├── useJobPosting.ts
│   │   └── ...
│   │
│   ├── 📱 app/
│   │   ├── 🛣️ auth/
│   │   ├── 🏢 company/
│   │   ├── 👤 jobseeker/
│   │   │   ├── 📊 applications/
│   │   │   ├── 💼 job-posting/
│   │   │   ├── 📝 internship/
│   │   │   ├── 🎯 kpi/
│   │   │   ├── 🏷️ saved-jobs/
│   │   │   ├── 🤖 recommendations/        ✨ NUEVO
│   │   │   │   ├── RecommendedJobs.tsx
│   │   │   │   ├── MatchDetails.tsx
│   │   │   │   ├── RecommendedCompanies.tsx
│   │   │   │   ├── ClusterAnalysis.tsx
│   │   │   │   └── recommendations.route.tsx
│   │   │   ├── 🎨 components/
│   │   │   ├── jobseeker.route.tsx        🔄 MODIFICADO
│   │   │   └── ...
│   │   ├── 🛗 landing/
│   │   └── ...
│   │
│   ├── 🎨 components/
│   │   ├── 🎯 sidebar/
│   │   │   ├── app-sidebar.tsx            🔄 MODIFICADO
│   │   │   ├── nav-main.tsx
│   │   │   └── ...
│   │   ├── 🎨 ui/
│   │   │   ├── card.tsx
│   │   │   ├── button.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── ...
│   │   └── ...
│   │
│   ├── 💾 stores/
│   │   ├── auth.store.ts
│   │   ├── jobseeker.store.ts
│   │   └── ...
│   │
│   ├── 📚 lib/
│   │   ├── axios.ts
│   │   └── utils.ts
│   │
│   ├── 📋 schemas/
│   │   ├── auth.schema.ts
│   │   └── ...
│   │
│   ├── 🎨 assets/
│   │
│   ├── 📄 index.css
│   ├── 📄 main.tsx
│   └── app.route.tsx
│
├── 🎯 Configuración
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── eslint.config.js
│   ├── components.json
│   └── package.json
│
├── 📄 index.html
├── 📄 .env
├── 📄 .gitignore
└── 📄 README.md
```

## 🔗 Relaciones de Importación

```
RecommendedJobs.tsx
├── import useML from @/hooks/useML
├── import useJobSeekerStore from @/stores/jobseeker.store
├── import Card, etc from @/components/ui/card
└── import lucide-react icons

MatchDetails.tsx
├── import useML from @/hooks/useML
├── import useJobSeekerStore from @/stores/jobseeker.store
└── import {JobRecommendation} from @/services/ml.service

useML.ts
└── import * from @/services/ml.service

ml.service.ts
└── import axios from 'axios'
```

## 📊 Estadísticas

| Métrica                   | Valor      |
| ------------------------- | ---------- |
| **Archivos creados**      | 7          |
| **Archivos modificados**  | 2          |
| **Componentes React**     | 5          |
| **Hooks personalizados**  | 1          |
| **Servicios**             | 1          |
| **Documentación**         | 3 archivos |
| **Líneas de código**      | ~2000+     |
| **TypeScript interfaces** | 10+        |
| **Endpoints integrados**  | 7          |

---

## ✅ Checklista de Implementación

- [x] Crear servicio ml.service.ts
- [x] Crear hook useML.ts
- [x] Crear componente RecommendedJobs
- [x] Crear componente MatchDetails
- [x] Crear componente RecommendedCompanies
- [x] Crear componente ClusterAnalysis
- [x] Crear página principal recommendations.route
- [x] Actualizar sidebar con nueva opción
- [x] Actualizar rutas jobseeker
- [x] Documentación ML_INTEGRATION.md
- [x] Documentación IMPLEMENTATION_SUMMARY.md
- [x] Documentación QUICK_START.md
- [x] Validar TypeScript (sin errores)
- [x] Validar imports y exports
- [x] Testing de tipos

---

**Estructura completa y lista para uso** ✨
