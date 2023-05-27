export {};

declare global {
  namespace Express {
    interface Request {
      account: { id: string; email: string; role: 'account' | 'driver' };
    }
  }
}
