import { langTraductions } from "../local/lang";

const acceptablesLangues = ['fr', 'en'];
export const getLang = () => {
    let lang = 'fr';
    if (localStorage.lang !== undefined || acceptablesLangues.includes(localStorage.getItem('lang'))) {
        lang = localStorage.getItem('lang');
    }else{
        localStorage.setItem('lang', lang);
    }
    return lang;
}

export const setLang = (lang, setError) => {
    if (acceptablesLangues.includes(localStorage.getItem('lang'))) {
        localStorage.setItem('lang', lang);
        window.location.reload();
    }else{
        setError(langTraductions['fr'].error)
    }
}