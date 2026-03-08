import type { IUseCaseError } from '@/core/errors/use-case-error.js'

export class NotAllowedError extends Error implements IUseCaseError {
  constructor() {
    super('Not allowed.')
  }
}
