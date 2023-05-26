import 'dotenv/config';

export const env = {
  apiPort: process.env.API_PORT ?? '',
  hashSalt: Number(process.env.HASH_SALT),
  imageUrl: process.env.IMAGE_URL ?? '',
  jwtExpiresIn: process.env.JWT_EXPIRATION ?? '',
  jwtSecret: process.env.JWT_SECRET ?? '',
  refreshTokenExpires: Number(process.env.REFRESH_EXPIRATION),
  staticPaths: {
    images: process.env.IMAGES_LINK ?? ''
  }
};
