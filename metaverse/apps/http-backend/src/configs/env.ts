const getEnv = (key: string, defautValue?: string):string=>{
  const value = process.env[key] || defautValue;

  if(value === undefined){
    throw  new Error(`Missing env variable ${key}`);
  }

  console.log("env", key, value);
  return value;
}

export const JWT_SECRET = getEnv("JWT_SECRET");
