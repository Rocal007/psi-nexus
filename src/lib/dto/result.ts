/**
 * Industrial Gold Standard - Railway-Oriented Result Monad
 * Provides deterministic, exception-free error handling for domain and DTO boundaries.
 */

export type Success<T> = {
  readonly ok: true;
  readonly value: T;
};

export type Failure<E> = {
  readonly ok: false;
  readonly error: E;
};

export type Result<T, E = Error> = Success<T> | Failure<E>;

export const Result = {
  ok<T>(value: T): Success<T> {
    return { ok: true, value };
  },

  err<E>(error: E): Failure<E> {
    return { ok: false, error };
  },

  isOk<T, E>(result: Result<T, E>): result is Success<T> {
    return result.ok === true;
  },

  isErr<T, E>(result: Result<T, E>): result is Failure<E> {
    return result.ok === false;
  },

  map<T, U, E>(result: Result<T, E>, fn: (val: T) => U): Result<U, E> {
    if (result.ok) {
      return Result.ok(fn(result.value));
    }
    return result;
  },

  flatMap<T, U, E>(result: Result<T, E>, fn: (val: T) => Result<U, E>): Result<U, E> {
    if (result.ok) {
      return fn(result.value);
    }
    return result;
  },

  unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
    return result.ok ? result.value : defaultValue;
  },

  tryCatch<T, E = Error>(fn: () => T, onError: (error: unknown) => E): Result<T, E> {
    try {
      return Result.ok(fn());
    } catch (err) {
      return Result.err(onError(err));
    }
  }
};
