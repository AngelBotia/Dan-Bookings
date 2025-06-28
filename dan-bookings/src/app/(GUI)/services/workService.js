export class WorkService {

    constructor(endPoint) {
        this.endPoint = endPoint || '/api/work';
    };

    async getWorks(params={}){
        try {
            const searchParams = params ? new URLSearchParams(params) : "";
            const worksData = await fetch(`${this.endPoint}?${searchParams}`, { method: "GET" });
            const worksJson = await worksData.json() || [];
            return worksJson;
          } catch (error) {
            return null;
          }
    };
    async createWork(work){
        const { WO_NAME, IMAGE_URL,languageAPP } = work;
        if (!WO_NAME || !IMAGE_URL?.length) return null;
  
        try {
          const imgsToSend = IMAGE_URL?.map(file => {
            const { img, type } = file;
            return { img, type }
          })
          const body = new FormData();
          body.append('work',JSON.stringify({...work,IMAGE_URL:imgsToSend}));
  
          const dataWork = await fetch(this.endPoint, { method: "POST", body });
          const newWork = await dataWork.json();
          return newWork;
        } catch (error) {
          return null;
        }
    };
    async updateWork(newWork = {}){
        try {
          if ( !newWork?.ID_WORK ) return null;
  
          const body = new FormData();      
          body.append("newWork",JSON.stringify(newWork));
  
          const workToUpdate = await fetch(this.endPoint, { method: "PUT", body });
          const updatedWork = await workToUpdate.json();
  
          return updatedWork;
        } catch (error) {
          console.error(error)
          return null;
        }
    };
    async deleteWork({ID_WORK,URL,IMAGE_URL}){
        try {
          if(!ID_WORK || !URL) return null;
          const body = new FormData();      
          body.append("ID",JSON.stringify(ID_WORK));
          body.append("URL",JSON.stringify(URL));
          body.append("IMAGE_URL",JSON.stringify(IMAGE_URL))
          const workToDelete = await fetch(this.endPoint, { method: "DELETE",body });
          const deletedWork = await workToDelete.json();
          return deletedWork || null;
        } catch (error) {
          return null;
        }
    };



    async getWorkDetail(params){
        try {
            const { URL } = params || {};
            if(!URL) return null; 
            const searchParams = params ? new URLSearchParams(params) : "";
            const detailData = await fetch(`/api/work/${URL}?${searchParams}`, { method: "GET" });
            const detail = await detailData.json();
            return detail;
        } catch (error) {
          return null;
        }
    };
    async updateWorkDetail(newWorkDetail = {}){
        try {
          const { WO_URL } = newWorkDetail || {};
          if ( !WO_URL ) return null;
          const body = new FormData();      
          body.append("newDetail",JSON.stringify(newWorkDetail));
  
          const detailToUpdate = await fetch(`/api/work/${WO_URL}`, { method: "PUT", body });
          const updatedDetail = await detailToUpdate.json();
          
          return updatedDetail;
        } catch (error) {
          return null;
        }
    };

}

export const workService = new WorkService();