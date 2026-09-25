const fallbackSecret = 'development-secret-change-me';

export const jwtConstants = {
  secret: process.env.JWT_SECRET ?? fallbackSecret,
};
