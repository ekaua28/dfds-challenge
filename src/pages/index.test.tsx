import { cn, fetchData, invalidateVoyages } from '../lib/utils';
import { QueryClient } from '@tanstack/react-query';

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: 'mocked data' }),
    })
) as jest.Mock;

describe('Utils', () => {
    describe('cn', () => {
        it('should merge class names correctly', () => {
            expect(cn('class1', 'class2')).toBe('class1 class2');
            expect(cn('class1', false && 'class2')).toBe('class1');
            expect(cn('class1', undefined)).toBe('class1');
        });
    });

    describe('fetchData', () => {
        it('should fetch data from the given path', async () => {
            const data = await fetchData('test-path');
            expect(data).toEqual({ data: 'mocked data' });
            expect(fetch).toHaveBeenCalledWith('/api/test-path', { method: 'GET' });
        });

        it('should throw an error if the network response is not ok', async () => {
            (fetch as jest.Mock).mockImplementationOnce(() =>
                Promise.resolve({ ok: false })
            );

            await expect(fetchData('test-path')).rejects.toThrow('Network response was not ok');
        });
    });

    describe('invalidateVoyages', () => {
        it('should invalidate voyage queries', async () => {
            const queryClient = new QueryClient();
            const invalidateQueriesMock = jest.fn();
            jest.spyOn(queryClient, 'invalidateQueries').mockImplementation(invalidateQueriesMock);

            await invalidateVoyages(queryClient);
            expect(invalidateQueriesMock).toHaveBeenCalledWith(['voyages']);
        });
    });
});
