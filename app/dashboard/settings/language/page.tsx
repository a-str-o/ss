"use client";

import { Card } from "@/components/ui/card";
import { useLanguage, useTranslation } from "@/app/contexts/LanguageContext";

export default function LanguageSettings() {
  const { language, setLanguage, isRtl } = useLanguage();
  const t = useTranslation();

  const languages = [
    {
      code: "en",
      name: "English",
      nameAr: "الإنجليزية",
      nameFr: "Anglais",
      flag: "🇺🇸",
      description: "Use English for the interface",
      descriptionAr: "استخدم اللغة الإنجليزية للواجهة",
      descriptionFr: "Utiliser l'anglais pour l'interface",
    },
    {
      code: "fr",
      name: "Français",
      nameAr: "الفرنسية",
      nameFr: "Français",
      flag: "🇫🇷",
      description: "Use French for the interface",
      descriptionAr: "استخدم اللغة الفرنسية للواجهة",
      descriptionFr: "Utiliser le français pour l'interface",
    },
    {
      code: "ar",
      name: "العربية",
      nameAr: "العربية",
      nameFr: "Arabe",
      flag: "🇸🇦",
      description: "Use Arabic for the interface",
      descriptionAr: "استخدم اللغة العربية للواجهة",
      descriptionFr: "Utiliser l'arabe pour l'interface",
    },
  ];

  const getLocalizedName = (lang: typeof languages[0]) => {
    switch (language) {
      case "ar":
        return lang.nameAr;
      case "fr":
        return lang.nameFr;
      default:
        return lang.name;
    }
  };

  const getLocalizedDescription = (lang: typeof languages[0]) => {
    switch (language) {
      case "ar":
        return lang.descriptionAr;
      case "fr":
        return lang.descriptionFr;
      default:
        return lang.description;
    }
  };

  return (
    <Card className="p-6">
      <div className={`space-y-6 ${isRtl ? "rtl" : "ltr"}`}>
        <div>
          <h3 className={`text-lg font-medium ${isRtl ? "text-right" : "text-left"}`}>
            {t.language}
          </h3>
          <p className={`text-sm text-muted-foreground mt-2 ${isRtl ? "text-right" : "text-left"}`}>
            {t.selectLanguage}
          </p>
        </div>

        <div className="space-y-4">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                language === lang.code ? "bg-blue-50" : ""
              }`}
              onClick={() => setLanguage(lang.code as "en" | "fr" | "ar")}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{lang.flag}</span>
                <div>
                  <h4 className="font-medium">{getLocalizedName(lang)}</h4>
                  <p className="text-sm text-muted-foreground">
                    {getLocalizedDescription(lang)}
                  </p>
                </div>
              </div>
              <div className="w-4 h-4 rounded-full border-2 border-blue-600 flex items-center justify-center">
                {language === lang.code && (
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                )}
              </div>
            </div>
          ))}
        </div>

        <p className={`text-sm text-muted-foreground mt-4 ${isRtl ? "text-right" : "text-left"}`}>
          {isRtl 
            ? "سيتم تحديث اللغة فورًا عند التغيير"
            : "Language will update immediately upon change"}
        </p>
      </div>
    </Card>
  );
}
