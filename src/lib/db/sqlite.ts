import { DatabaseSync } from 'node:sqlite';
import * as fs from 'node:fs';
import * as path from 'node:path';

export interface UserProfileRecord {
  id: string;
  name: string;
  email?: string;
  role?: 'admin' | 'member' | 'client' | 'family' | 'guest';
  tags?: string;
  notes?: string;
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

export interface UserFilterOptions {
  query?: string;
  sunSign?: string;
  role?: string;
  tag?: string;
  limit?: number;
  offset?: number;
}

export interface DatabaseStats {
  totalUsers: number;
  currentUserId: string | null;
  sunSignCounts: Record<string, number>;
  roleCounts: Record<string, number>;
  elementCounts: {
    fire: number;
    earth: number;
    air: number;
    water: number;
  };
  lastUpdated: string | null;
}

let dbInstance: DatabaseSync | null = null;

const ELEMENT_MAP: Record<string, 'fire' | 'earth' | 'air' | 'water'> = {
  'Widder': 'fire', 'Löwe': 'fire', 'Schütze': 'fire',
  'Aries': 'fire', 'Leo': 'fire', 'Sagittarius': 'fire',
  'Stier': 'earth', 'Jungfrau': 'earth', 'Steinbock': 'earth',
  'Taurus': 'earth', 'Virgo': 'earth', 'Capricorn': 'earth',
  'Zwillinge': 'air', 'Waage': 'air', 'Wassermann': 'air',
  'Gemini': 'air', 'Libra': 'air', 'Aquarius': 'air',
  'Krebs': 'water', 'Skorpion': 'water', 'Fische': 'water',
  'Cancer': 'water', 'Scorpio': 'water', 'Pisces': 'water'
};

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
      email TEXT,
      role TEXT DEFAULT 'client',
      tags TEXT,
      notes TEXT,
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

    CREATE INDEX IF NOT EXISTS idx_users_name ON users(name);
    CREATE INDEX IF NOT EXISTS idx_users_sun_sign ON users(sun_sign);
    CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
    CREATE INDEX IF NOT EXISTS idx_users_updated_at ON users(updated_at);
  `);

  // Safe schema migrations for existing databases
  try {
    const tableInfo = dbInstance.prepare(`PRAGMA table_info(users)`).all() as any[];
    const columns = new Set(tableInfo.map(col => col.name));
    
    if (!columns.has('email')) {
      dbInstance.exec(`ALTER TABLE users ADD COLUMN email TEXT;`);
    }
    if (!columns.has('role')) {
      dbInstance.exec(`ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'client';`);
    }
    if (!columns.has('tags')) {
      dbInstance.exec(`ALTER TABLE users ADD COLUMN tags TEXT;`);
    }
    if (!columns.has('notes')) {
      dbInstance.exec(`ALTER TABLE users ADD COLUMN notes TEXT;`);
    }
  } catch (e) {
    console.error('Migration warning (non-fatal):', e);
  }

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
      id, name, email, role, tags, notes, birth_date, birth_time, city_name, latitude, longitude,
      timezone, house_system, sun_sign, moon_sign, ascendant_sign,
      life_path_number, is_current, created_at, updated_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      email = excluded.email,
      role = excluded.role,
      tags = excluded.tags,
      notes = excluded.notes,
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
    profile.email || '',
    profile.role || 'client',
    profile.tags || '',
    profile.notes || '',
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

  return {
    ...profile,
    updatedAt: now,
    createdAt: profile.createdAt || now
  };
}

export function getAllUserProfiles(options: UserFilterOptions = {}): UserProfileRecord[] {
  const db = getDatabase();
  const conditions: string[] = [];
  const params: any[] = [];

  if (options.query && options.query.trim()) {
    const q = `%${options.query.trim()}%`;
    conditions.push('(name LIKE ? OR city_name LIKE ? OR email LIKE ? OR notes LIKE ? OR tags LIKE ?)');
    params.push(q, q, q, q, q);
  }

  if (options.sunSign && options.sunSign.trim()) {
    conditions.push('sun_sign = ?');
    params.push(options.sunSign.trim());
  }

  if (options.role && options.role.trim()) {
    conditions.push('role = ?');
    params.push(options.role.trim());
  }

  if (options.tag && options.tag.trim()) {
    conditions.push('tags LIKE ?');
    params.push(`%${options.tag.trim()}%`);
  }

  let sql = 'SELECT * FROM users';
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  sql += ' ORDER BY is_current DESC, updated_at DESC';

  if (options.limit && options.limit > 0) {
    sql += ' LIMIT ?';
    params.push(options.limit);
    if (options.offset && options.offset > 0) {
      sql += ' OFFSET ?';
      params.push(options.offset);
    }
  }

  const stmt = db.prepare(sql);
  const rows = stmt.all(...params) as any[];

  return rows.map(r => ({
    id: r.id,
    name: r.name,
    email: r.email || undefined,
    role: r.role || 'client',
    tags: r.tags || undefined,
    notes: r.notes || undefined,
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
    email: row.email || undefined,
    role: row.role || 'client',
    tags: row.tags || undefined,
    notes: row.notes || undefined,
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

export function setCurrentUserProfile(id: string): boolean {
  const db = getDatabase();
  db.exec(`UPDATE users SET is_current = 0`);
  const stmt = db.prepare(`UPDATE users SET is_current = 1, updated_at = ? WHERE id = ?`);
  const result = stmt.run(new Date().toISOString(), id);
  return result.changes > 0;
}

export function deleteUserProfile(id: string): boolean {
  const db = getDatabase();
  const stmt = db.prepare(`DELETE FROM users WHERE id = ?`);
  const result = stmt.run(id);
  return result.changes > 0;
}

export function batchUpsertUserProfiles(profiles: UserProfileRecord[]): { count: number; ids: string[] } {
  let count = 0;
  const ids: string[] = [];

  for (const profile of profiles) {
    saveUserProfile(profile);
    ids.push(profile.id);
    count++;
  }

  return { count, ids };
}

export function getDatabaseStats(): DatabaseStats {
  const users = getAllUserProfiles();
  
  let currentUserId: string | null = null;
  let lastUpdated: string | null = null;
  const sunSignCounts: Record<string, number> = {};
  const roleCounts: Record<string, number> = {};
  const elementCounts = { fire: 0, earth: 0, air: 0, water: 0 };

  for (const user of users) {
    if (user.isCurrent) currentUserId = user.id;
    if (!lastUpdated || user.updatedAt > lastUpdated) lastUpdated = user.updatedAt;

    if (user.sunSign) {
      sunSignCounts[user.sunSign] = (sunSignCounts[user.sunSign] || 0) + 1;
      const element = ELEMENT_MAP[user.sunSign];
      if (element) {
        elementCounts[element]++;
      }
    }

    if (user.role) {
      roleCounts[user.role] = (roleCounts[user.role] || 0) + 1;
    }
  }

  return {
    totalUsers: users.length,
    currentUserId,
    sunSignCounts,
    roleCounts,
    elementCounts,
    lastUpdated
  };
}
