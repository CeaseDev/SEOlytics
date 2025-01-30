import { SEOAnalysisResult } from "../models/analysis";

export const calculateSEOScore = (data: SEOAnalysisResult): number => {
    let score = 0;
  
    // Title (Max 20%)
    score += data.titleLength >= 30 && data.titleLength <= 60 ? 20 : 10;
    score += data.titleHasKeyword ? 5 : 0;
  
    // Meta Description (Max 15%)
    score += data.metaDescriptionLength >= 120 && data.metaDescriptionLength <= 160 ? 15 : 7;
    score += data.metaDescriptionHasKeyword ? 5 : 0;
  
    // Headers (Max 15%)
    score += data.h1.rating === "good" ? 15 : data.h1.rating === "multiple" ? 5 : 0;
    score += data.h2.count >= 2 ? 5 : 0;
  
    // Images (Max 10%)
    score += (data.imageAlts.missing === 0) ? 10 : 5;
  
    // Keyword Density (Max 10%)
    score += data.keywordDensity >= 1 && data.keywordDensity <= 3 ? 10 : 5;
  
    // Links (Max 10%)
    score += data.linksRatio >= 2 ? 10 : 5;
  
    return Math.min(score, 100);
  };
  
export const calculatePerformanceScore = (data: SEOAnalysisResult): number => {
    let score = 0;
  
    // Page Size (Max 15%)
    score += data.pageSizeKB <= 500 ? 15 : data.pageSizeKB <= 1000 ? 10 : 5;
  
    // Response Time (Max 15%)
    score += data.responseTimeMS <= 1000 ? 15 : data.responseTimeMS <= 3000 ? 10 : 5;
  
    // Optimization (Max 40%)
    score += data.compressedImages ? 10 : 0;
    score += data.minifiedCSS ? 10 : 0;
    score += data.minifiedJS ? 10 : 0;
    score += data.cacheHeaders ? 10 : 0;
  
    // Security (Max 30%)
    score += data.secureConnection ? 30 : 0;
  
    return Math.min(score, 100);
  };