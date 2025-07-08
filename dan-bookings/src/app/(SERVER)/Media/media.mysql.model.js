import { conn ,createDynamicQuery} from "../libs/mysql";
import { WDM_PROPS } from "./media.constant"

const { media_SELECT, MEDIA_TABLE,MEDIA_TABLE_ALIAS,MEDIAS } = WDM_PROPS;

export class MediaModelMYSQL{

    getMedias = async(ID,category,typeMedia) =>{
        try {

            let SELECT = [media_SELECT],
                FROM = [`${MEDIA_TABLE} ${MEDIA_TABLE_ALIAS}`],
                WHERE = [],
                ORDER = [],
                PARAMS_VALUES = {};

            if(ID){
                WHERE.push(`${MEDIA_TABLE_ALIAS}.${MEDIAS.ID_REF} like :ID OR ${MEDIA_TABLE_ALIAS}.${MEDIAS.URL_MEDIA} = :ID`)
                PARAMS_VALUES.ID = ID;
            }
            if(category){
                WHERE.push(`${MEDIA_TABLE_ALIAS}.${MEDIAS.CATEGORY} like :category`)
                PARAMS_VALUES.category = category;
            }

            if(typeMedia){
                WHERE.push(`${MEDIA_TABLE_ALIAS}.${MEDIAS.TYPE_MEDIA} like :typeMedia`)
                PARAMS_VALUES.typeMedia = typeMedia;
            }
            const query = createDynamicQuery(SELECT,FROM,WHERE);
            const [rows] = await conn.query(query, PARAMS_VALUES);
            if (rows?.affectedRows == 0) return [];
            return rows;
        } catch (error) {
            console.error(error.message)
            return []
        }
    };
    createMedias = async (ID,urls=[],category="GENERIC",typeMedia="IMG") =>{
        try {
            if(!ID || !urls?.length) return;
            
            await Promise.all(urls.map(async url => {
                const mediaToSave = {
                    [MEDIAS.ID_REF]: ID,
                    [MEDIAS.CATEGORY]: category,
                    [MEDIAS.URL_MEDIA]: url,
                    [MEDIAS.TYPE_MEDIA]: typeMedia,
                }
                await conn.query(`INSERT into ${MEDIA_TABLE} SET ?`, [mediaToSave]);
            }))


            const [rows] =  await conn.query(`SELECT ${media_SELECT} FROM ${MEDIA_TABLE} ${MEDIA_TABLE_ALIAS}  WHERE ${MEDIA_TABLE_ALIAS}.${MEDIAS.ID_REF} = ?`,[ID]);
            if (rows?.affectedRows == 0) return null;

            return rows;
        } catch (error) {
            console.error(error.message);
            return null;
        }
    };
    updateMedia = async (detail) => {
        try {
            //TODO: CHANGES TO NEW VERSION OF MEDIAS

            
            const { media , WO_URL} = detail || {};
            if(!media?.length) return [];
            const allPromiseMedia = media.map( workMedia => {
                const {ID, URL_MEDIA, TYPE_MEDIA } = workMedia || {};
                const mediaToSave = {
                    [MEDIAS.ID]: ID,
                    [MEDIAS.WO_URL]: WO_URL,
                    [MEDIAS.TYPE_MEDIA]: TYPE_MEDIA,
                }
               if(URL_MEDIA) mediaToSave[MEDIAS.URL_MEDIA] = URL_MEDIA;

               return conn.query(`UPDATE ${MEDIA_TABLE} ${MEDIA_TABLE_ALIAS} SET ? WHERE ${MEDIA_TABLE_ALIAS}.${MEDIAS.ID} = ?`,[mediaToSave,ID]);
            })
            const allResults = await Promise.all(allPromiseMedia);
            if(!allResults?.length) return [];

            const [rows] =  await conn.query(`SELECT ${media_SELECT} FROM ${MEDIA_TABLE} ${MEDIA_TABLE_ALIAS}  WHERE ${MEDIA_TABLE_ALIAS}.${MEDIAS.WO_URL} = ?`,[WO_URL]);
            if (rows?.affectedRows == 0) return [];

            return rows;
        } catch (error) {
            console.error(error.message);
            return [];
        }
    };
    deleteMedia = async (ID) => {
        try {
            if (!ID ) return null;
            const [deleteResult] = await conn.query(`DELETE FROM ${MEDIA_TABLE} ${MEDIA_TABLE_ALIAS} WHERE ${MEDIA_TABLE_ALIAS}.${MEDIAS.ID_REF} = :ID OR ${MEDIA_TABLE_ALIAS}.${MEDIAS.URL_MEDIA} = :ID`,  {ID});
            return !deleteResult.affectedRows == 0;
        } catch (error) {
            console.error(error.message);
            return null; 
        }
    }
}