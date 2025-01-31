export interface SEOAnalysisResult {
    // Basic SEO
    title: string;
    titleLength: number;
    titleHasKeyword: boolean;
    metaDescription: string;
    metaDescriptionLength: number;
    metaDescriptionHasKeyword: boolean;
    h1: {
      count: number;
      texts: string[];
      rating: "good" | "multiple" | "missing";
    };
    h2: {
      count: number;
      texts: string[];
    };
    imageAlts: {
      total: number;
      missing: number;
      missingList: string[];
    };
    keyword: string;
    keywordInTitle: boolean;
    keywordInDescription: boolean;
    keywordDensity: number;
    internalLinks: number;
    externalLinks: number;
    linksRatio: number;
  
    // Performance
    pageSizeKB: number;
    responseTimeMS: number;
    compressedImages: boolean;
    minifiedCSS: boolean;
    minifiedJS: boolean;
    secureConnection: boolean;
    cacheHeaders: boolean;
    directoryListing: boolean;
  
    // Scoring
    seoScore: number;
    performanceScore: number;
    overallScore: number;
  }

  export interface AnalysisHistory {
    id : string ; 
    userId : string ; 
    url : string ; 
    timeStamp : Date ; 
    result : SEOAnalysisResult ;
  }