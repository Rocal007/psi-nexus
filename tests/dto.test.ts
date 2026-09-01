import { describe, it, expect } from 'vitest';
import { Result } from '../src/lib/dto/result';
import { validateBirthProfileInputDTO, BirthProfileDTOMapper } from '../src/lib/dto/birthProfile.dto';

describe('Result Monad (Industrial Gold Standard)', () => {
  it('should create and unwrap successful results', () => {
    const res = Result.ok(42);
    expect(Result.isOk(res)).toBe(true);
    expect(Result.isErr(res)).toBe(false);
    expect(Result.unwrapOr(res, 0)).toBe(42);
  });

  it('should create and handle failure results', () => {
    const err = new Error('Failure');
    const res = Result.err(err);
    expect(Result.isOk(res)).toBe(false);
    expect(Result.isErr(res)).toBe(true);
    expect(Result.unwrapOr(res, 99)).toBe(99);
  });

  it('should map values correctly', () => {
    const res = Result.ok(10);
    const mapped = Result.map(res, x => x * 2);
    expect(Result.unwrapOr(mapped, 0)).toBe(20);
  });

  it('should catch exceptions with tryCatch', () => {
    const res = Result.tryCatch(
      () => {
        throw new Error('Boom');
      },
      err => (err as Error).message
    );
    expect(Result.isErr(res)).toBe(true);
    if (Result.isErr(res)) {
      expect(res.error).toBe('Boom');
    }
  });
});

describe('DTO Validation & Mapping', () => {
  it('should validate a valid birth profile DTO', () => {
    const validRaw = {
      name: 'Maria Mustermann',
      birthDate: '1990-06-15',
      birthTime: '14:30',
      cityName: 'Wien',
      latitude: 48.2082,
      longitude: 16.3738,
      timezone: 'Europe/Vienna',
      houseSystem: 'placidus'
    };

    const res = validateBirthProfileInputDTO(validRaw);
    expect(Result.isOk(res)).toBe(true);
    if (Result.isOk(res)) {
      expect(res.value.name).toBe('Maria Mustermann');
      expect(res.value.birthDate).toBe('1990-06-15');
      expect(res.value.latitude).toBe(48.2082);

      const domain = BirthProfileDTOMapper.toDomainChartInput(res.value);
      expect(domain.cityName).toBe('Wien');
      expect(domain.houseSystem).toBe('placidus');
    }
  });

  it('should reject invalid dates and coordinates', () => {
    const invalidRaw = {
      name: 'Test',
      birthDate: 'invalid-date',
      birthTime: '99:99',
      cityName: '',
      latitude: 150, // Invalid latitude > 90
      longitude: -200, // Invalid longitude < -180
      timezone: ''
    };

    const res = validateBirthProfileInputDTO(invalidRaw);
    expect(Result.isErr(res)).toBe(true);
    if (Result.isErr(res)) {
      expect(res.error.errors.length).toBeGreaterThanOrEqual(4);
    }
  });
});
