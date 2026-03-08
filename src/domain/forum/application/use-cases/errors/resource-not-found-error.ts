import type { IUseCaseError } from '@/core/errors/use-case-error.js'

export class ResourceNotFoundError extends Error implements IUseCaseError {
  constructor() {
    super('Resource not found.')
  }
}
