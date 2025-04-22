export const createDynamicQuery = (SELECT,FROM,WHERE,ORDER) =>{
    if( !SELECT?.length || !FROM?.length) throw new Error("SELECT AND FROM ARE REQUIRED")
    const allQuery = [`SELECT`,SELECT.join(),
                      `FROM`,FROM.join()];         
    WHERE?.length && 
        allQuery.push('WHERE',WHERE.join(" AND "));
   
    ORDER?.length && 
        allQuery.push('ORDER',ORDER.join());
                 
    return allQuery.join(" ")
}