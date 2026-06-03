import { create } from 'zustand';
import type { Asset, AssetType, TrendState, CityZoneId } from './types';

interface MarketFilters {
  type: AssetType | 'all';
  trend: TrendState | 'all';
  search: string;
}

interface MarketStore {
  selectedAsset: Asset | null;
  activeZone: CityZoneId | null;
  filters: MarketFilters;

  selectAsset: (asset: Asset | null) => void;
  toggleAsset: (asset: Asset) => void;
  setActiveZone: (zone: CityZoneId | null) => void;
  setFilterType: (type: AssetType | 'all') => void;
  setFilterTrend: (trend: TrendState | 'all') => void;
  setFilterSearch: (search: string) => void;
  resetFilters: () => void;
}

const DEFAULT_FILTERS: MarketFilters = {
  type: 'all',
  trend: 'all',
  search: '',
};

export const useMarketStore = create<MarketStore>((set, get) => ({
  selectedAsset: null,
  activeZone: null,
  filters: DEFAULT_FILTERS,

  selectAsset: (asset) => set({ selectedAsset: asset }),

  toggleAsset: (asset) => {
    const current = get().selectedAsset;
    set({ selectedAsset: current?.id === asset.id ? null : asset });
  },

  setActiveZone: (zone) => set({ activeZone: zone }),

  setFilterType: (type) =>
    set((state) => ({ filters: { ...state.filters, type } })),

  setFilterTrend: (trend) =>
    set((state) => ({ filters: { ...state.filters, trend } })),

  setFilterSearch: (search) =>
    set((state) => ({ filters: { ...state.filters, search } })),

  resetFilters: () => set({ filters: DEFAULT_FILTERS }),
}));