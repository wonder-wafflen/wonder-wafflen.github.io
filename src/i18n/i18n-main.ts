import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next} from "react-i18next";
import HttpBackend, { HttpBackendOptions } from 'i18next-http-backend'

i18n.use(HttpBackend).use(LanguageDetector).use(initReactI18next).init<HttpBackendOptions>({
    ns: ['translation'],
    defaultNS: ['translation'],
    fallbackLng: "ru",
    debug: true,
    load: 'languageOnly',
    detection: {
        order: ["querystring", "cookie"],
        caches: ["cookie"],
    },
    interpolation: {
        escapeValue: false,
    }
})

export default i18n;