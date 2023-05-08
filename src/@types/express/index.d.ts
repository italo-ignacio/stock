export {};

declare global {
  namespace Express {
    interface Request {
      account: { id: string; name: string; email: string; role: 'account' | 'driver' };
    }
  }
}
