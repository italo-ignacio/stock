import { TokenGeneratorError, TokenValidatorError } from 'domain/errors';
import { env } from 'main/config';
import { incrementBearer, removeBearer } from 'main/utils';
import { sign, verify } from 'jsonwebtoken';

interface TokenProps {
  id: string;
  name: string;
  email: string;
}

interface ValidatePayloadProps {
  isValid: boolean;
  payload: TokenProps;
}

export class Jwt {
  private readonly secret = env.jwtSecret;
  private readonly expirationInMs = env.jwtExpiresInMs;

  public validate({ accessToken }: { accessToken: string }): ValidatePayloadProps {
    if (!accessToken) TokenValidatorError();
    const accessTokenWithoutBearer = removeBearer(accessToken);
    const decoded = verify(accessTokenWithoutBearer, this.secret) as TokenProps;

    return { isValid: true, payload: decoded };
  }

  public generate(user: TokenProps): string {
    if (user.id && user.email && user.name) {
      const expirationInSeconds = this.expirationInMs / 1000;
      const token = sign(user, this.secret, { expiresIn: expirationInSeconds });

      return incrementBearer(token);
    }
    throw TokenGeneratorError();
  }
}
