const getEnv = (key: string, defautValue?: string): string => {
  const value = process.env[key] || defautValue;

  if (value === undefined) {
    throw new Error(`Missing env variable ${key}`);
  }

  return value;
};

export const JWT_SECRET = getEnv("JWT_SECRET");
export const FRONTEND_ORIGIN = getEnv("FRONTEND_ORIGIN");
