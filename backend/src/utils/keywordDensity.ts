export const calculateKeywordDensity = (text : string , keyword : string): number  => {
    const words = text.toLowerCase().split(/\s+/) ; 
    const keywordCount = words.filter(word => word === keyword.toLowerCase()).length ;
    return (keywordCount/ words.length) * 100 ; 
} ; 