import axios from "axios";
import type { AxiosInstance } from "axios";

const ML_API_URL = import.meta.env.VITE_API_URL_ML || "http://localhost:8000/api/ml/";

const mlAxios: AxiosInstance = axios.create({
  baseURL: ML_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==================== Job Recommendation ====================
export interface JobRecommendation {
  job_id: string;
  title: string;
  company: string;
  score: number;
  rank: number;
}

export interface JobRecommendationsResponse {
  jobseeker_id: string;
  recommendations: JobRecommendation[];
  count: number;
}

export async function getJobRecommendations(
  jobseekerId: string,
  topN: number = 10
): Promise<JobRecommendationsResponse> {
  try {
    const response = await mlAxios.get<JobRecommendationsResponse>(
      `recommendation/recommend/${jobseekerId}?top_n=${topN}`
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching job recommendations:", error);
    throw error;
  }
}

// ==================== Match Details ====================
export interface MatchDetailsResponse {
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

export async function getMatchDetails(jobseekerId: string, jobId: string): Promise<MatchDetailsResponse> {
  try {
    const response = await mlAxios.get<MatchDetailsResponse>(`recommendation/match-details/${jobseekerId}/${jobId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching match details:", error);
    throw error;
  }
}

// ==================== Company Matching ====================
export interface CompanyRecommendation {
  company_id: string;
  company_name: string;
  match_score: number;
  rank: number;
}

export interface CompanyRecommendationsResponse {
  jobseeker_id: string;
  recommendations: CompanyRecommendation[];
  count: number;
}

export async function getRecommendedCompanies(
  jobseekerId: string,
  topN: number = 5
): Promise<CompanyRecommendationsResponse> {
  try {
    const response = await mlAxios.get<CompanyRecommendationsResponse>(
      `matching/recommend-companies/${jobseekerId}?top_n=${topN}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching recommended companies:", error);
    throw error;
  }
}

// ==================== Clustering ====================
export interface ClusterMember {
  jobseeker_id: string;
  name: string;
  skills: string[];
  experience: string;
  salary_range: string;
  is_center: boolean;
}

export interface ClusterResponse {
  jobseeker_id: string;
  jobseeker_name: string;
  cluster_id: number;
  cluster_size: number;
  members: ClusterMember[];
}

export async function getCluster(jobseekerId: string): Promise<ClusterResponse> {
  try {
    const response = await mlAxios.get<ClusterResponse>(`clustering/get-cluster/${jobseekerId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cluster:", error);
    throw error;
  }
}

// ==================== All Clusters ====================
export interface ClusterInfo {
  cluster_id: number;
  size: number;
  center_skills: string[];
  avg_salary: number;
}

export interface AllClustersResponse {
  total_clusters: number;
  total_jobseekers: number;
  clusters: ClusterInfo[];
}

export async function getAllClusters(): Promise<AllClustersResponse> {
  try {
    const response = await mlAxios.get<AllClustersResponse>("clustering/all-clusters");
    return response.data;
  } catch (error) {
    console.error("Error fetching all clusters:", error);
    throw error;
  }
}

// ==================== Similar Candidates ====================
export interface SimilarCandidate {
  jobseeker_id: string;
  name: string;
  email?: string;
  location?: string;
  experience?: string;
  num_skills?: number;
  cluster?: number;
  is_self: boolean;
  distance: number;
}

export interface SimilarCandidatesResponse {
  jobseeker_id: string;
  similar_candidates: SimilarCandidate[];
  count: number;
}

// Backend response structure
interface BackendSimilarCandidate {
  jobseeker_id: string;
  name: string;
  email?: string;
  location?: string;
  experience?: string;
  num_skills?: number;
  cluster?: number;
}

interface BackendSimilarCandidatesResponse {
  jobseeker_id: string;
  similar_candidates: BackendSimilarCandidate[];
  count: number;
}

export async function getSimilarCandidates(jobseekerId: string, topN: number = 10): Promise<SimilarCandidatesResponse> {
  try {
    const response = await mlAxios.get<BackendSimilarCandidatesResponse>(
      `clustering/similar-candidates/${jobseekerId}?top_n=${topN}`
    );
    console.log("Response clustering:", response.data);

    // Validar que similar_candidates existe y es un array
    if (!response.data.similar_candidates || !Array.isArray(response.data.similar_candidates)) {
      console.warn("No similar candidates found for jobseeker:", jobseekerId);
      return {
        jobseeker_id: jobseekerId,
        similar_candidates: [],
        count: 0,
      };
    }

    // Transform backend response to match frontend interface
    const transformedCandidates: SimilarCandidate[] = response.data.similar_candidates.map((candidate) => ({
      jobseeker_id: candidate.jobseeker_id,
      name: candidate.name,
      email: candidate.email,
      location: candidate.location,
      experience: candidate.experience,
      num_skills: candidate.num_skills,
      cluster: candidate.cluster,
      is_self: candidate.jobseeker_id === jobseekerId,
      distance: 0, // Default distance for real candidates
    }));

    return {
      jobseeker_id: jobseekerId,
      similar_candidates: transformedCandidates,
      count: transformedCandidates.length,
    };
  } catch (error) {
    console.error("Error fetching similar candidates:", error);
    // Retornar array vacío en lugar de lanzar el error
    return {
      jobseeker_id: jobseekerId,
      similar_candidates: [],
      count: 0,
    };
  }
}

// ==================== Gemini Recommendation ====================
export interface JobDetails {
  description: string;
  location: string;
  experience_level: string;
  work_type: string;
  is_remote: boolean;
  salary_min: number;
  salary_max: number;
  required_skills: string;
}

export interface GeminiRecommendation {
  job_id: string;
  title: string;
  company: string;
  score: string;
  rank: number;
  match_reason: string;
  key_matches: string[];
  potential_gaps: string[];
  details: JobDetails;
}

export interface GeminiRecommendationsResponse {
  jobseeker_id: string;
  jobseeker_name: string;
  recommendations: GeminiRecommendation[];
  count: number;
  summary: string;
}

export async function getGeminiRecommendations(
  jobseekerId: string,
  topN: number = 10
): Promise<GeminiRecommendationsResponse> {
  try {
    const response = await mlAxios.get<GeminiRecommendationsResponse>(
      `recommendation/recommend-gemini/${jobseekerId}?top_n=${topN}`
    );
    console.log("Gemini Recommendations:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching gemini recommendations:", error);
    throw error;
  }
}
