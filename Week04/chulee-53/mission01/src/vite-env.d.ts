interface importMetaEnv {
    readonly VITE_TMDB_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}