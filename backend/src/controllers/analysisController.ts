import {Request , Response} from "express" ; 
import axios from "axios" ; 
import cheerio from "cheerio" ; 
import {google} from "googleapis" ; 
import {db} from "../server" ; 
import { SEOAnalysisResult } from "../models/analysis";
import { calculateKeywordDensity } from "../utils/keywordDensity";
import internal from "stream";
import { timeStamp } from "console";
import { calculateSEOScore , calculatePerformanceScore } from "../utils/calculateScore";


const pagespeed = google.pagespeedonline("v5") ;

const PAGE_SPEED_API_KEY = process.env.PAGE_SPEED_API_KEY ; 

export const analyze = async (req : Request , res : Response) =>{
    try{ 
        const {url , keyword} = req.body ; 
        const userId = (req as any).userId ; 

        const startTime = Date.now() ;
        const response = await axios.get(url) ;
        const html = response.data ; 
        const $ = cheerio.load(html as any) ;
        const endTime = Date.now() ;

        // --- SEO Analysis --- 
        // Title & Meta 

        const title = $("title").text() ; 
        const metaDescription =  $('meta[name="description"]').attr("content") || "";
        
        // Headers
        const h1Tags = $("h1").map((i ,el) => $(el).text()).get() ; 
        const h2Tags = $("h2").map((i ,el) => $(el).text()).get() ; 

        //Images
        const images = $("img") ;
        const missingAltImages = images.filter((i, el) => !$(el).attr("alt")) ; 

        //Links
        const allLinks = $("a") ; 
        const internalLinks = allLinks.filter((i, el) => {
            const href = $(el).attr("href");
            return href !== undefined && (href.startsWith("/") || href.includes(url));
        }).length;

        const externalLinks = allLinks.length - internalLinks;
        
        
        // performance Analysis 

        const pagesspeedRes = await pagespeed.pagespeedapi.runpagespeed({
            url,
            key : PAGE_SPEED_API_KEY, 
            strategy:"desktop"
        }) ; 

        const audits = pagesspeedRes.data.lighthouseResult?.audits ; 
        const pageStats = pagesspeedRes.data.lighthouseResult?.environment ; 

        const result: SEOAnalysisResult = {
            // SEO Data
            title,
            titleLength: title.length,
            titleHasKeyword: title.toLowerCase().includes(keyword.toLowerCase()),
            metaDescription,
            metaDescriptionLength: metaDescription.length,
            metaDescriptionHasKeyword: metaDescription.toLowerCase().includes(keyword.toLowerCase()),
            h1: {
              count: h1Tags.length,
              texts: h1Tags,
              rating: h1Tags.length === 1 ? "good" : h1Tags.length > 1 ? "multiple" : "missing"
            },
            h2: {
              count: h2Tags.length,
              texts: h2Tags
            },
            imageAlts: {
              total: images.length,
              missing: missingAltImages.length,
              missingList: missingAltImages.map((i, el) => $(el).attr("src") || "").get()
            },
            keyword,
            keywordInTitle: title.toLowerCase().includes(keyword.toLowerCase()),
            keywordInDescription: metaDescription.toLowerCase().includes(keyword.toLowerCase()),
            keywordDensity: calculateKeywordDensity($("body").text(), keyword),
            internalLinks,
            externalLinks,
            linksRatio: externalLinks > 0 ? internalLinks / externalLinks : 0,
      
            // Performance Data
            pageSizeKB: (Buffer.byteLength(html as any, 'utf8') / 1024),                // page size in bytes
            responseTimeMS: endTime - startTime,                                        // response time
            compressedImages: audits?.["uses-optimized-images"]?.score === 1,           
            minifiedCSS: audits?.["unminified-css"]?.score === 1,                       //minified_css 
            minifiedJS: audits?.["unminified-javascript"]?.score === 1,                 //minified_JS
            secureConnection: url.startsWith("https://"),                               //HTTP OR HTTPS
            cacheHeaders: audits?.["uses-long-cache-ttl"]?.score === 1,                 //
            directoryListing: false, // Requires custom check
      
            // Scores (Implement scoring logic below)
            seoScore: 0,
            performanceScore: 0,
            overallScore: 0
          };

          result.seoScore = calculateSEOScore(result) 
          result.performanceScore = calculatePerformanceScore(result) 
          result.overallScore = (result.seoScore * .6) + (result.performanceScore *.4) ; 

          //Save to DB

          await db.collection("analyses").add({
            userId , 
            url,
            timeStamp: new Date() , 
            result
          }) ; 

          res.status(200).send(result) ; 
        } 
        catch (error) {
            res.status(500).json({ error: "Analysis failed" });
        }
}

