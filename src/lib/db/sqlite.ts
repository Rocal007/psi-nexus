import { DatabaseSync } from 'node:sqlite';
import * as fs from 'node:fs';
import * as path from 'node:path';

export interface UserProfileRecord {
  id: string;
  name: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:MM
  cityName: string;
  latitude: number;
  longitude: number;
  timezone: string;
  houseSystem: 'placidus' | 'equal';
  sunSign?: string;
  moonSign?: string;
  ascendantSign?: string;
  lifePathNumber?: number;
  isCurrent?: number; // 1 or 0
  createdAt: string;
  updatedAt: string;
}

let dbInstance: DatabaseSync | null = null;

export function getDatabase(): DatabaseSync {
  if (dbInstance) return dbInstance;

  const dataDir = path.resolve(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const dbPath = path.join(dataDir, 'astro_nexus.db');
  dbInstance = new DatabaseSync(dbPath);

  // Initialize SQLite Schema
  dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      birth_date TEXT NOT NULL,
      birth_time TEXT NOT NULL,
      city_name TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      timezone TEXT NOT NULL,
      house_system TEXT NOT NULL DEFAULT 'placidus',
      sun_sign TEXT,
      moon_sign TEXT,
      ascendant_sign TEXT,
      life_path_number INTEGER,
      is_current INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  return dbInstance;
}

export function saveUserProfile(profile: UserProfileRecord): UserProfileRecord {
  const db = getDatabase();
  const now = new Date().toISOString();

  // Reset other is_current if this one is current
  if (profile.isCurrent) {
    db.exec(`UPDATE users SET is_current = 0`);
  }

  const stmt = db.prepare(`
    INSERT INTO users (
      id, name, birth_date, birth_time, city_name, latitude, longitude,
      timezone, house_system, sun_sign, moon_sign, ascendant_sign,
      life_path_number, is_current, created_at, updated_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      birth_date = excluded.birth_date,
      birth_time = excluded.birth_time,
      city_name = excluded.city_name,
      latitude = excluded.latitude,
      longitude = excluded.longitude,
      timezone = excluded.timezone,
      house_system = excluded.house_system,
      sun_sign = excluded.sun_sign,
      moon_sign = excluded.moon_sign,
      ascendant_sign = excluded.ascendant_sign,
      life_path_number = excluded.life_path_number,
      is_current = excluded.is_current,
      updated_at = excluded.updated_at
  `);

  stmt.run(
    profile.id,
    profile.name,
    profile.birthDate,
    profile.birthTime,
    profile.cityName,
    profile.latitude,
    profile.longitude,
    profile.timezone,
    profile.houseSystem || 'placidus',
    profile.sunSign || '',
    profile.moonSign || '',
    profile.ascendantSign || '',
    profile.lifePathNumber || 0,
    profile.isCurrent ? 1 : 0,
    profile.createdAt || now,
    now
  );

  return profile;
}

export function getAllUserProfiles(): UserProfileRecord[] {
  const db = getDatabase();
  const stmt = db.prepare(`SELECT * FROM users ORDER BY updated_at DESC`);
  const rows = stmt.all() as any[];

  return rows.map(r => ({
    id: r.id,
    name: r.name,
    birthDate: r.birth_date,
    birthTime: r.birth_time,
    cityName: r.city_name,
    latitude: r.latitude,
    longitude: r.longitude,
    timezone: r.timezone,
    houseSystem: r.house_system,
    sunSign: r.sun_sign,
    moonSign: r.moon_sign,
    ascendantSign: r.ascendant_sign,
    lifePathNumber: r.life_path_number,
    isCurrent: r.is_current,
    createdAt: r.created_at,
    updatedAt: r.updated_at
  }));
}

export function getUserProfileById(id: string): UserProfileRecord | null {
  const db = getDatabase();
  const stmt = db.prepare(`SELECT * FROM users WHERE id = ?`);
  const row = stmt.get(id) as any;
  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    birthDate: row.birth_date,
    birthTime: row.birth_time,
    cityName: row.city_name,
    latitude: row.latitude,
    longitude: row.longitude,
    timezone: row.timezone,
    houseSystem: row.house_system,
    sunSign: row.sun_sign,
    moonSign: row.moon_sign,
    ascendantSign: row.ascendant_sign,
    lifePathNumber: row.life_path_number,
    isCurrent: row.is_current,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function deleteUserProfile(id: string): boolean {
  const db = getDatabase();
  const stmt = db.prepare(`DELETE FROM users WHERE id = ?`);
  stmt.run(id);
  return true;
}
