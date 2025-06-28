import { conn ,createDynamicQuery} from "../../libs/mysql/mysql";
import { DEFAULT_LNG_APP } from "../../../(GUI)/constants/languagues"
import { TR_DB_PROPS , LNG_DB_PROPS} from "../../constants/translationDB";

const {TR_SELECT,TRANSLATION_DB_TABLE,TR_DB_TABLE_ALIAS,TRANSLATION} = TR_DB_PROPS; 
const {LNG_SELECT,LNG_DB_TABLE_ALIAS,LANGUAGUE_DB_TABLE,LANGUAGUE}  = LNG_DB_PROPS; 

export class TranslationModelMYSQL{
    
    getTranslations = async(ID_REF,languague) =>{
        try {
            
            let SELECT = [TR_SELECT],
                FROM = [`${TRANSLATION_DB_TABLE} ${TR_DB_TABLE_ALIAS}`],
                WHERE = [],
                PARAMS_VALUES = {};

            if(ID_REF){
                WHERE.push(`${TR_DB_TABLE_ALIAS}.${TRANSLATION.id_ref} like :ID_REF`)
                PARAMS_VALUES.ID_REF = ID_REF;
            }
            if(languague){
                WHERE.push(`${TR_DB_TABLE_ALIAS}.${TRANSLATION.language} like :languague`)
                PARAMS_VALUES.languague = languague;
            }

            const query = createDynamicQuery(SELECT,FROM,WHERE);
            const [rows] = await conn.query(query, PARAMS_VALUES);

            const parseObject = rows?.reduce((acc, tr) => {
                                             acc[tr.obj_prop] = tr.text;
                                             return acc;
                                            }, {}) || {};
            
            if (rows?.affectedRows == 0) return {};
            return parseObject;
        } catch (error) {
            console.error(error.message)
            return {}
        }
    };
    createTranslation = async (propToSave,ID_REF,languageApp = DEFAULT_LNG_APP) =>{
        try {
            if(!ID_REF) return;
            const { id_ref, text, category, obj_prop, language } = TRANSLATION;

           const allLanguaguesConfig = await this.getLanguages();
           const allTranslateToSave =  await Promise.all(Object.entries(propToSave).map(([prop, value]) => {
                try {    
                    return allLanguaguesConfig.map( lng =>{
                            const translateText = lng.language == languageApp ? value : "TODO: implement translate service -.-";
                            const trToSave = {
                                [text]: translateText,
                                [id_ref]:ID_REF,
                                [obj_prop]: prop,
                                [language]: lng.language == languageApp ? languageApp : lng.language
                            }
                            return conn.query(`INSERT into ${TRANSLATION_DB_TABLE} SET ?`, [trToSave]);
                    })

                } catch (error) {
                    return null;        
                }
            }));
            
            return await this.getTranslations(ID_REF,languageApp); 
        } catch (error) {
            console.error(error.message);
            return null;
        }
    };
    updateTranslation = async (propToUpdate,ID_REF,languageApp = DEFAULT_LNG_APP) => {
        try {
            if(!ID_REF) return;
            const { text, obj_prop, language } = TRANSLATION;


           await Promise.all(Object.entries(propToUpdate).map(([prop, value]) => {
                const trToSave = {
                    [text]: value,
                    [obj_prop]: prop,
                    [language]: languageApp
                }

                return conn.query(`UPDATE ${TRANSLATION_DB_TABLE} ${TR_DB_TABLE_ALIAS} 
                                   SET :trToSave 
                                   WHERE ${TR_DB_TABLE_ALIAS}.${TRANSLATION.id_ref} = :ID_REF 
                                   AND ${TR_DB_TABLE_ALIAS}.${TRANSLATION.language} = :languageApp
                                   AND ${TR_DB_TABLE_ALIAS}.${TRANSLATION.obj_prop} = :prop`,
                                {
                                    trToSave,
                                    ID_REF,
                                    languageApp,
                                    prop
                                } )
            }));

            return await this.getTranslations(ID_REF,languageApp);

        } catch (error) {
            console.error(error.message);
            return [];
        }
    };
     deleteTranslation = async (ID) => {
        try {
            if (!ID ) return null;
            const [deleteResult] = await conn.query(`DELETE FROM ${TRANSLATION_DB_TABLE} ${TR_DB_TABLE_ALIAS} WHERE ${TR_DB_TABLE_ALIAS}.${TRANSLATION.id_ref} = :ID`,  {ID});
            return !deleteResult.affectedRows == 0;
        } catch (error) {
            console.error(error.message);
            return null; 
        }
    }

    getLanguages = async () =>{
        try {
            const [rows] = await conn.query(`SELECT ${LNG_SELECT} FROM ${LANGUAGUE_DB_TABLE} ${LNG_DB_TABLE_ALIAS}`);
            return rows;
        } catch (error) {
            console.error(error.message);
            return null; 
        }
    }
}