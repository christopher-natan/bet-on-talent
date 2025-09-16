import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../src/auth/auth.service';
import { Strings } from '../../src/common/strings';

class FakeConfigService {
  private readonly map: Record<string, string> = {
    AUTH_EMAIL: 'dev@betontalent.com',
    AUTH_PASSWORD: 'admin',
    JWT_SECRET: 'dev-secret',
    JWT_EXPIRES_IN: '24h',
  };
  get<T = string>(key: string, _default?: T): T {
    return (this.map[key] as any) ?? _default;
  }
}

class FakeJwtService {
  signAsync = jest.fn(async (_payload: any) => 'signed.jwt.token');
}

describe('AuthService', () => {
  it('returns access token for valid credentials', async () => {
    const svc = new AuthService(new FakeJwtService() as any, new FakeConfigService() as any);
    const res = await svc.validateAndSign('dev@betontalent.com', 'admin');
    expect(res).toEqual({ access_token: 'signed.jwt.token' });
  });

  it('throws UnauthorizedException for invalid credentials', async () => {
    const svc = new AuthService(new FakeJwtService() as any, new FakeConfigService() as any);
    await expect(svc.validateAndSign('wrong@x.com', 'nope')).rejects.toThrow(UnauthorizedException);
    await expect(svc.validateAndSign('wrong@x.com', 'nope')).rejects.toThrow(
      Strings.AUTH_INVALID_CREDENTIALS,
    );
  });
});

