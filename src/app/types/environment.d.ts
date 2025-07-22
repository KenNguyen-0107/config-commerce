declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ALLOWED_ORIGINS?: string
      NODE_ENV: "development" | "production" | "test"
    }
  }
}

export {}
