'use client';

import { useState, useCallback, useEffect } from 'react';
import type { InteractHistoryItem, InteractTextResponse } from '@/types/interact';

const STORAGE_KEY = 'study-helper:interact-history';
const MAX_ITEMS = 20;

function loadHistory(): InteractHistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as InteractHistoryItem[];
  } catch {
    return [];
  }
}

function saveHistory(items: InteractHistoryItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage cheio ou indisponivel — ignora silenciosamente
  }
}

let idCounter = 0;

function nextId(): string {
  idCounter += 1;
  return `${Date.now()}-${idCounter}`;
}

export interface UseInteractHistoryResult {
  items: InteractHistoryItem[];
  addItem: (input: string, domain: string, response: InteractTextResponse) => void;
  clearHistory: () => void;
}

export function useInteractHistory(): UseInteractHistoryResult {
  const [items, setItems] = useState<InteractHistoryItem[]>([]);

  // Load on mount
  useEffect(() => {
    setItems(loadHistory());
  }, []);

  const addItem = useCallback((input: string, domain: string, response: InteractTextResponse) => {
    const newItem: InteractHistoryItem = {
      id: nextId(),
      input,
      domain,
      intent: response.intent,
      actionType: response.action.type,
      resourceUrl: response.action.target,
      createdAt: new Date().toISOString(),
    };

    setItems((prev) => {
      const updated = [newItem, ...prev].slice(0, MAX_ITEMS);
      saveHistory(updated);
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setItems([]);
    saveHistory([]);
  }, []);

  return { items, addItem, clearHistory };
}