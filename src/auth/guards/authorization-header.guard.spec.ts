import { AuthorizationHeaderGuard } from './authorization-header.guard';
import { ExecutionContext, HttpException } from '@nestjs/common';
import { MessageException } from '../../provider/exception/message.exception';

describe('AuthorizationHeaderGuard', () => {
    let guard: AuthorizationHeaderGuard;

    beforeEach(() => {
        guard = new AuthorizationHeaderGuard();
    });

    it('deve estar definido', () => {
        expect(guard).toBeDefined();
    });

    it('deve retornar true se o token estiver presente', () => {
        const mockContext = {
            switchToHttp: () => ({
                getRequest: () => ({
                    headers: {
                        authorization: 'Bearer valid_token',
                    },
                }),
            }),
        } as ExecutionContext;

        expect(guard.canActivate(mockContext)).toBe(true);
    });

    it('deve lançar erro se o token não estiver presente', () => {
        const mockContext = {
            switchToHttp: () => ({
                getRequest: () => ({
                    headers: {},
                }),
            }),
        } as ExecutionContext;

        expect(() => guard.canActivate(mockContext)).toThrow(HttpException);
        try {
            guard.canActivate(mockContext);
        } catch (error) {
            expect(error.response).toBe(MessageException.UNAUTHORIZED);
            expect(error.status).toBe(403);
        }
    });
});
