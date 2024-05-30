const ENV = {
  PORT: process.env.PORT as string,
  ACCESS_SECRET: process.env.ACCESS_SECRET as string,
  REFRESH_SECRET: process.env.REFRESH_SECRET as string,
} as const;
export default ENV;
