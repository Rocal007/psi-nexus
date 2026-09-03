/**
 * Industrial Gold Standard - Data Transfer Objects (DTO)
 * Strictly typed, serializable boundary objects with zero-trust runtime validation.
 */

import { Result } from './result';
import type { ChartInput } from '../astrology/engine';
import type { SavedProfile } from '../db/profileStore';

export type ProfileId = string & { readonly __brand: unique symbol };
export type IsoDateString = string & { readonly __brand: unique symbol };
export type TimeString = string & { readonly __brand: unique symbol };

export interface ValidationErrorDetail {
  readonly field: string;
  readonly message: string;
  readonly value?: unknown;
}

export class ValidationError extends Error {
  public readonly errors: readonly ValidationErrorDetail[];

  constructor(errors: ValidationErrorDetail[]) {
    super(`Validation failed with ${errors.length} error(s): ${errors.map(e => `${e.field}: ${e.message}`).join(', ')}`);
    this.name = 'ValidationError';
    this.errors = Object.freeze([...errors]);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Raw Data Transfer Object for creating or updating a Birth Profile
 */
export interface BirthProfileInputDTO {
  readonly name?: string;
  readonly birthDate: string; // Expected: YYYY-MM-DD
  readonly birthTime: string; // Expected: HH:MM
  readonly isUnknownTime?: boolean;
  readonly cityName: string;
  readonly countryName?: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly timezone: string;
  readonly houseSystem?: 'placidus' | 'equal';
}

/**
 * Serialized Data Transfer Object for persisted profiles across storage/API
 */
export interface BirthProfileOutputDTO {
  readonly id: string;
  readonly name: string;
  readonly birthDate: string;
  readonly birthTime: string;
  readonly isUnknownTime: boolean;
  readonly cityName: string;
  readonly countryName?: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly timezone: string;
  readonly houseSystem: 'placidus' | 'equal';
  readonly sunSign?: string;
  readonly moonSign?: string;
  readonly ascendantSign?: string;
  readonly lifePathNumber?: number;
  readonly updatedAt: string;
}

// ==========================================
// RUNTIME BOUNDARY VALIDATORS
// ==========================================

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

/**
 * Zero-trust boundary validation for BirthProfileInputDTO.
 * Returns a Railway-Oriented Result with typed errors.
 */
export function validateBirthProfileInputDTO(raw: unknown): Result<BirthProfileInputDTO, ValidationError> {
  const errors: ValidationErrorDetail[] = [];

  if (typeof raw !== 'object' || raw === null) {
    return Result.err(new ValidationError([{ field: 'root', message: 'Payload must be a non-null object' }]));
  }

  const candidate = raw as Record<string, unknown>;

  // Validate birthDate
  if (typeof candidate.birthDate !== 'string' || !DATE_REGEX.test(candidate.birthDate)) {
    errors.push({
      field: 'birthDate',
      message: 'birthDate must be a valid ISO date in YYYY-MM-DD format',
      value: candidate.birthDate
    });
  } else {
    const [yearStr, monthStr, dayStr] = candidate.birthDate.split('-');
    const y = parseInt(yearStr, 10);
    const m = parseInt(monthStr, 10);
    const d = parseInt(dayStr, 10);
    const parsed = new Date(Date.UTC(y, m - 1, d));
    if (
      isNaN(parsed.getTime()) ||
      parsed.getUTCFullYear() !== y ||
      parsed.getUTCMonth() !== m - 1 ||
      parsed.getUTCDate() !== d
    ) {
      errors.push({ field: 'birthDate', message: 'birthDate is not a real calendar date', value: candidate.birthDate });
    }
  }

  // Validate birthTime
  if (typeof candidate.birthTime !== 'string') {
    errors.push({ field: 'birthTime', message: 'birthTime must be a string', value: candidate.birthTime });
  } else if (!candidate.isUnknownTime && !TIME_REGEX.test(candidate.birthTime)) {
    errors.push({ field: 'birthTime', message: 'birthTime must be in HH:MM format (24h)', value: candidate.birthTime });
  }

  // Validate cityName
  if (typeof candidate.cityName !== 'string' || !candidate.cityName.trim()) {
    errors.push({ field: 'cityName', message: 'cityName is required and cannot be blank', value: candidate.cityName });
  }

  // Validate coordinates
  if (typeof candidate.latitude !== 'number' || isNaN(candidate.latitude) || candidate.latitude < -90 || candidate.latitude > 90) {
    errors.push({ field: 'latitude', message: 'latitude must be a number between -90 and 90', value: candidate.latitude });
  }

  if (typeof candidate.longitude !== 'number' || isNaN(candidate.longitude) || candidate.longitude < -180 || candidate.longitude > 180) {
    errors.push({ field: 'longitude', message: 'longitude must be a number between -180 and 180', value: candidate.longitude });
  }

  // Validate timezone
  if (typeof candidate.timezone !== 'string' || !candidate.timezone.trim()) {
    errors.push({ field: 'timezone', message: 'timezone is required (e.g. Europe/Vienna)', value: candidate.timezone });
  }

  // Validate houseSystem
  if (candidate.houseSystem !== undefined && candidate.houseSystem !== 'placidus' && candidate.houseSystem !== 'equal') {
    errors.push({ field: 'houseSystem', message: "houseSystem must be either 'placidus' or 'equal'", value: candidate.houseSystem });
  }

  if (errors.length > 0) {
    return Result.err(new ValidationError(errors));
  }

  const validatedDTO: BirthProfileInputDTO = {
    name: typeof candidate.name === 'string' ? candidate.name.trim() : undefined,
    birthDate: candidate.birthDate as string,
    birthTime: candidate.birthTime as string,
    isUnknownTime: Boolean(candidate.isUnknownTime),
    cityName: (candidate.cityName as string).trim(),
    countryName: typeof candidate.countryName === 'string' ? candidate.countryName.trim() : undefined,
    latitude: candidate.latitude as number,
    longitude: candidate.longitude as number,
    timezone: (candidate.timezone as string).trim(),
    houseSystem: (candidate.houseSystem as 'placidus' | 'equal' | undefined) || 'placidus'
  };

  return Result.ok(validatedDTO);
}

// ==========================================
// DOMAIN / DTO BIDIRECTIONAL MAPPERS
// ==========================================

export const BirthProfileDTOMapper = {
  /**
   * Transforms a validated DTO into the internal Domain ChartInput model.
   */
  toDomainChartInput(dto: BirthProfileInputDTO): ChartInput {
    return {
      name: dto.name,
      birthDate: dto.birthDate,
      birthTime: dto.birthTime,
      cityName: dto.cityName,
      countryName: dto.countryName,
      latitude: dto.latitude,
      longitude: dto.longitude,
      timezone: dto.timezone,
      houseSystem: dto.houseSystem || 'placidus'
    };
  },

  /**
   * Transforms a SavedProfile domain model into a serialized Output DTO.
   */
  fromSavedProfile(profile: SavedProfile): BirthProfileOutputDTO {
    return {
      id: profile.id,
      name: profile.name,
      birthDate: profile.birthDate,
      birthTime: profile.birthTime,
      isUnknownTime: Boolean(profile.isUnknownTime),
      cityName: profile.cityName,
      latitude: profile.latitude,
      longitude: profile.longitude,
      timezone: profile.timezone,
      houseSystem: profile.houseSystem,
      sunSign: profile.sunSign,
      moonSign: profile.moonSign,
      ascendantSign: profile.ascendantSign,
      lifePathNumber: profile.lifePathNumber,
      updatedAt: profile.updatedAt
    };
  },

  /**
   * Transforms URL search parameters into a DTO candidate.
   */
  fromURLSearchParams(params: URLSearchParams): Record<string, unknown> {
    return {
      name: params.get('name') || undefined,
      birthDate: params.get('date') || params.get('birthDate') || '',
      birthTime: params.get('time') || params.get('birthTime') || '12:00',
      isUnknownTime: params.get('unknownTime') === 'true',
      cityName: params.get('city') || params.get('cityName') || '',
      latitude: parseFloat(params.get('lat') || params.get('latitude') || '48.2082'),
      longitude: parseFloat(params.get('lng') || params.get('longitude') || '16.3738'),
      timezone: params.get('tz') || params.get('timezone') || 'Europe/Vienna',
      houseSystem: (params.get('system') || params.get('houseSystem') || 'placidus') as 'placidus' | 'equal'
    };
  }
};
