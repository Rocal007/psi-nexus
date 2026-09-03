/**
 * Dashboard Page Controller (Industrial Gold Standard)
 * Encapsulates SSR parameter extraction, DTO boundary validation, and domain chart orchestration.
 */

import { validateBirthProfileInputDTO, BirthProfileDTOMapper, Result, type BirthProfileInputDTO } from '../dto';
import { generateNatalChart, type CompleteNatalChart, type ChartInput } from '../astrology/engine';
import { generatePersonalitySummary, type PersonalitySummary } from '../astrology/personalitySynthesis';
import { calculateHumanDesignChart } from '../humandesign/engine';
import type { HDChartData } from '../humandesign/types';

export interface DashboardViewModel {
  readonly hasExplicitQuery: boolean;
  readonly chartInput: ChartInput;
  readonly validatedDTO: BirthProfileInputDTO;
  readonly chart: CompleteNatalChart;
  readonly personalitySummary: PersonalitySummary;
  readonly hdChart: HDChartData;
}

export const DEFAULT_BIRTH_PROFILE: BirthProfileInputDTO = {
  name: '',
  birthDate: '1991-05-05',
  birthTime: '13:00',
  isUnknownTime: false,
  cityName: 'Wien',
  latitude: 48.2082,
  longitude: 16.3738,
  timezone: 'Europe/Vienna',
  houseSystem: 'placidus'
};

export class DashboardController {
  /**
   * Resolves the complete dashboard view model from URL search parameters.
   */
  public static handleRequest(searchParams: URLSearchParams): DashboardViewModel {
    const hasExplicitQuery = searchParams.has('birthDate') || searchParams.has('name');
    const rawCandidate = BirthProfileDTOMapper.fromURLSearchParams(searchParams);

    // If query params are empty or incomplete, fall back gracefully to defaults
    const candidateWithDefaults = {
      ...DEFAULT_BIRTH_PROFILE,
      ...rawCandidate,
      name: rawCandidate.name || DEFAULT_BIRTH_PROFILE.name,
      birthDate: rawCandidate.birthDate || DEFAULT_BIRTH_PROFILE.birthDate,
      birthTime: rawCandidate.birthTime || DEFAULT_BIRTH_PROFILE.birthTime,
      cityName: rawCandidate.cityName || DEFAULT_BIRTH_PROFILE.cityName,
      latitude: isNaN(rawCandidate.latitude as number) ? DEFAULT_BIRTH_PROFILE.latitude : rawCandidate.latitude,
      longitude: isNaN(rawCandidate.longitude as number) ? DEFAULT_BIRTH_PROFILE.longitude : rawCandidate.longitude,
      timezone: rawCandidate.timezone || DEFAULT_BIRTH_PROFILE.timezone,
      houseSystem: rawCandidate.houseSystem || DEFAULT_BIRTH_PROFILE.houseSystem
    };

    const validation = validateBirthProfileInputDTO(candidateWithDefaults);
    const validatedDTO = Result.isOk(validation) ? validation.value : DEFAULT_BIRTH_PROFILE;

    const chartInput = BirthProfileDTOMapper.toDomainChartInput(validatedDTO);
    const chart = generateNatalChart(chartInput);
    const personalitySummary = generatePersonalitySummary(chart);
    const hdChart = calculateHumanDesignChart({
      name: chartInput.name || 'Edle Seele',
      birthDate: chartInput.birthDate,
      birthTime: chartInput.birthTime,
      cityName: chartInput.cityName,
      latitude: chartInput.latitude,
      longitude: chartInput.longitude,
      timezone: chartInput.timezone
    });

    return {
      hasExplicitQuery,
      chartInput,
      validatedDTO,
      chart,
      personalitySummary,
      hdChart
    };
  }
}
