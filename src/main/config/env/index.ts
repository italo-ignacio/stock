import 'dotenv/config';

export const env = {
  apiPort: process.env.API_PORT ?? '',
  hashSalt: Number(process.env.HASH_SALT),
  jwtExpiresIn: process.env.JWT_EXPIRATION ?? '',
  jwtSecret: process.env.JWT_SECRET ?? '',
  refreshTokenExpires: Number(process.env.REFRESH_EXPIRATION),
  staticPaths: {
    images: process.env.IMAGES_LINK ?? ''
  }
};
