import type { FeatureSwitches } from './feature-switches';
import type { Maybe } from './shared';

export type ThemeModes = 'light' | 'dark';

export type LocalStorageData = {
  featureSwitches: Record<FeatureSwitches, boolean>;
  themeMode: ThemeModes;
};
export type LocalStorageKeys = keyof LocalStorageData;

const get = <Key extends LocalStorageKeys>(
  lsKey: Key
): Maybe<LocalStorageData[Key]> => {
  const value = window.localStorage.getItem(lsKey);
  if (value === null || value === undefined) {
    return value;
  }

  return JSON.parse(value) as Maybe<LocalStorageData[Key]>;
};

const set = <Key extends LocalStorageKeys>(
  lsKey: Key,
  lsData: LocalStorageData[Key]
): void => {
  window.localStorage.setItem(lsKey, JSON.stringify(lsData));
};

export const LS = { set, get };
