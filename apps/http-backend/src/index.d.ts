
declare global{
    namespace Express {
        interface Request {
            userId: string;
            sessionId: number;
        }
    }
}

export {};
