export type SiteLang = "fr" | "en" | "de" | "es";

export interface SiteMonetization {
  pdf: boolean;
  leadGen: boolean;
  drop: boolean;
  affiliation: boolean;
}

export interface SiteColors {
  primary: string;
  accent: string;
}

export interface SiteConfig {
  slug: string;
  name: string;
  domain: string;
  niche: string;
  subNiche: string;
  lang: SiteLang;
  colors: SiteColors;
  monetization: SiteMonetization;
  description: string;
  twitterHandle?: string;
}

export const site: SiteConfig = {
  slug: "parler-couple",
  name: "Parler en Couple",
  domain: "",
  niche: "Communication en couple",
  subNiche: "Conflits et non-dits — méthode CNV et scripts pratiques",
  lang: "fr",
  colors: {
    primary: "#5C3D7A",
    accent: "#E07B5A",
  },
  monetization: {
    pdf: true,
    leadGen: true,
    drop: true,
    affiliation: true,
  },
  description: "Les outils concrets pour arrêter de se disputer en boucle et enfin se comprendre — méthode CNV appliquée au couple.",
};
