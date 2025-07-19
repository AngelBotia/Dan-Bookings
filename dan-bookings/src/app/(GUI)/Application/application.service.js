class ApplicationService {

    constructor(endPoint) {
        this.endPoint = endPoint || '/api/settings';
    };

    async getLanguages(params={}){
        try {
            const searchParams = params ? new URLSearchParams(params) : "";
            
            const response = await fetch(`${this.endPoint}/languages?${searchParams}`, { method: "GET" });
            const language = await response.json();
           
            if(!response.ok) throw new Error(language?.message);
            return language;
          } catch (error) {
            return null;
          }
    }
}

export const applicationService = new ApplicationService()