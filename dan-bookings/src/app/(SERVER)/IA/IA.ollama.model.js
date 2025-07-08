

export class OllamaModel{

    async getTranslate(textToTranslate,fromLng,toLng){
        try {
            const searchParams = new URLSearchParams({fromLng,toLng});
            const body ={
                textToTranslate
            }
            
            const translate = await fetch(`${process.env.NEXT_PUBLIC_IA_url}/translate?${searchParams}`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    }, 
                    body:JSON.stringify(body)
                }
            );
            if(!translate.ok) return null;
            const jsonTranslate = await translate.json()
            return jsonTranslate || "";
          } catch (error) {
            console.error(error)
            return null;
          }
    };
}