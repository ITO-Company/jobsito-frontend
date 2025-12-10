import { useState, useCallback } from "react";
import {
  getJobRecommendations,
  getMatchDetails,
  getRecommendedCompanies,
  getCluster,
  getAllClusters,
  getSimilarCandidates,
  getGeminiRecommendations,
  getGeminiMatchDetails,
  type JobRecommendationsResponse,
  type MatchDetailsResponse,
  type CompanyRecommendationsResponse,
  type ClusterResponse,
  type AllClustersResponse,
  type SimilarCandidatesResponse,
  type GeminiRecommendationsResponse,
  type GeminiMatchDetailsResponse,
} from "@/services/ml.service";

export function useML() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Job Recommendations
  const [jobRecommendations, setJobRecommendations] = useState<JobRecommendationsResponse | null>(null);
  const fetchJobRecommendations = useCallback(async (jobseekerId: string, topN = 10) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getJobRecommendations(jobseekerId, topN);
      console.log("Job Recommendations😅:", data);
      setJobRecommendations(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error fetching recommendations";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Match Details
  const [matchDetails, setMatchDetails] = useState<MatchDetailsResponse | null>(null);
  const fetchMatchDetails = useCallback(async (jobseekerId: string, jobId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMatchDetails(jobseekerId, jobId);
      setMatchDetails(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error fetching match details";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Recommended Companies
  const [recommendedCompanies, setRecommendedCompanies] = useState<CompanyRecommendationsResponse | null>(null);
  const fetchRecommendedCompanies = useCallback(async (jobseekerId: string, topN = 5) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRecommendedCompanies(jobseekerId, topN);
      setRecommendedCompanies(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error fetching recommended companies";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cluster
  const [cluster, setCluster] = useState<ClusterResponse | null>(null);
  const fetchCluster = useCallback(async (jobseekerId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCluster(jobseekerId);
      setCluster(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error fetching cluster";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // All Clusters
  const [allClusters, setAllClusters] = useState<AllClustersResponse | null>(null);
  const fetchAllClusters = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllClusters();
      setAllClusters(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error fetching all clusters";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Similar Candidates
  const [similarCandidates, setSimilarCandidates] = useState<SimilarCandidatesResponse | null>(null);
  const fetchSimilarCandidates = useCallback(async (jobseekerId: string, topN = 5) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSimilarCandidates(jobseekerId, topN);
      setSimilarCandidates(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error fetching similar candidates";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Gemini Recommendations
  const [geminiRecommendations, setGeminiRecommendations] = useState<GeminiRecommendationsResponse | null>(null);
  const fetchGeminiRecommendations = useCallback(async (jobseekerId: string, topN = 10) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getGeminiRecommendations(jobseekerId, topN);
      setGeminiRecommendations(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error fetching gemini recommendations";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Gemini Match Details
  const [geminiMatchDetails, setGeminiMatchDetails] = useState<GeminiMatchDetailsResponse | null>(null);
  const fetchGeminiMatchDetails = useCallback(async (jobseekerId: string, jobId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getGeminiMatchDetails(jobseekerId, jobId);
      setGeminiMatchDetails(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error fetching gemini match details";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);
  const resetAll = useCallback(() => {
    setJobRecommendations(null);
    setMatchDetails(null);
    setRecommendedCompanies(null);
    setCluster(null);
    setAllClusters(null);
    setSimilarCandidates(null);
    setGeminiRecommendations(null);
    setGeminiMatchDetails(null);
    setError(null);
  }, []);

  return {
    loading,
    error,
    clearError,
    resetAll,
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
    // Gemini Recommendations
    geminiRecommendations,
    fetchGeminiRecommendations,
    // Gemini Match Details
    geminiMatchDetails,
    fetchGeminiMatchDetails,
  };
}
