import { SurveyOperationLock } from './SurveyOperationLock'

describe('SurveyOperationLock', () => {
    it('rejects concurrent operations and releases after completion', async () => {
        const lock = new SurveyOperationLock()
        let resolveFirst
        const firstOperation = lock.execute(() => new Promise(resolve => {
            resolveFirst = resolve
        }))

        await Promise.resolve()
        await expect(lock.execute(() => Promise.resolve('second'))).rejects.toMatchObject({ code: 101 })

        resolveFirst('first')
        await expect(firstOperation).resolves.toBe('first')
        await expect(lock.execute(() => Promise.resolve('third'))).resolves.toBe('third')
    })

    it('releases after an operation fails', async () => {
        const lock = new SurveyOperationLock()

        await expect(lock.execute(async () => {
            throw new Error('failure')
        })).rejects.toThrow('failure')
        await expect(lock.execute(() => Promise.resolve('recovered'))).resolves.toBe('recovered')
    })
})
