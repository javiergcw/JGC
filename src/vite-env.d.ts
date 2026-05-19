/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_SITE_NAME?: string
  readonly VITE_SITE_DESCRIPTION?: string
  readonly VITE_AUTHOR_NAME?: string
  readonly VITE_BUSINESS_NAME?: string
  readonly VITE_BUSINESS_LOCALITY?: string
  readonly VITE_BUSINESS_COUNTRY?: string
  readonly VITE_BUSINESS_AREA_SERVED?: string
  readonly VITE_BUSINESS_LAT?: string
  readonly VITE_BUSINESS_LNG?: string
  readonly VITE_CONTACT_HIRE?: string
  readonly VITE_CONTACT_CONTRACT?: string
  readonly VITE_SOCIAL_GITHUB?: string
  readonly VITE_SOCIAL_LINKEDIN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
