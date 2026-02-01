import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ModuleState, EffectSlot } from '../types/module-state';
import { GameData } from '../types/game-data';
import { calculateResults, calculateLinkBonuses } from '../utils/calculator';

// Action types
type Action =
  | { type: 'SET_MODULE'; slotId: string; moduleId: number; moduleName: string; moduleType: number }
  | { type: 'SET_EFFECT'; slotId: string; effectIndex: number; effectName: string; statId: number; value: number }
  | { type: 'CLEAR_SLOT'; slotId: string }
  | { type: 'CALCULATE_RESULTS' };

// Helper function to initialize effects
function initEffects(): EffectSlot[] {
  return [
    { id: crypto.randomUUID(), effectName: '', statId: 0, value: 0 },
    { id: crypto.randomUUID(), effectName: '', statId: 0, value: 0 },
    { id: crypto.randomUUID(), effectName: '', statId: 0, value: 0 },
  ];
}

// Initial state
const initialState: ModuleState = {
  slots: [
    { id: 'slot-0', moduleId: null, moduleName: '', moduleType: null, effects: initEffects() },
    { id: 'slot-1', moduleId: null, moduleName: '', moduleType: null, effects: initEffects() },
    { id: 'slot-2', moduleId: null, moduleName: '', moduleType: null, effects: initEffects() },
    { id: 'slot-3', moduleId: null, moduleName: '', moduleType: null, effects: initEffects() },
  ],
  results: [],
  linkBonuses: [],
};

// Reducer factory that takes gameData
function createModuleReducer(gameData: GameData) {
  return function moduleReducer(state: ModuleState, action: Action): ModuleState {
    switch (action.type) {
      case 'SET_MODULE': {
        const newSlots = state.slots.map(slot =>
          slot.id === action.slotId
            ? { ...slot, moduleId: action.moduleId, moduleName: action.moduleName, moduleType: action.moduleType }
            : slot
        );
        const newState = { ...state, slots: newSlots };
        return {
          ...newState,
          results: calculateResults(newState.slots),
          linkBonuses: calculateLinkBonuses(newState.slots, gameData)
        };
      }
      case 'SET_EFFECT': {
        const newSlots = state.slots.map(slot => {
          if (slot.id === action.slotId) {
            const newEffects = [...slot.effects];
            newEffects[action.effectIndex] = {
              ...newEffects[action.effectIndex],
              effectName: action.effectName,
              statId: action.statId,
              value: action.value,
            };
            return { ...slot, effects: newEffects };
          }
          return slot;
        });
        const newState = { ...state, slots: newSlots };
        return {
          ...newState,
          results: calculateResults(newState.slots),
          linkBonuses: calculateLinkBonuses(newState.slots, gameData)
        };
      }
      case 'CLEAR_SLOT': {
        const newSlots = state.slots.map(slot =>
          slot.id === action.slotId
            ? { ...slot, moduleId: null, moduleName: '', moduleType: null, effects: initEffects() }
            : slot
        );
        const newState = { ...state, slots: newSlots };
        return {
          ...newState,
          results: calculateResults(newState.slots),
          linkBonuses: calculateLinkBonuses(newState.slots, gameData)
        };
      }
      case 'CALCULATE_RESULTS': {
        return {
          ...state,
          results: calculateResults(state.slots),
          linkBonuses: calculateLinkBonuses(state.slots, gameData)
        };
      }
      default:
        return state;
    }
  };
}

// Context
const ModuleContext = createContext<{
  state: ModuleState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function ModuleProvider({ children, gameData }: { children: ReactNode; gameData: GameData }) {
  const [state, dispatch] = useReducer(createModuleReducer(gameData), initialState);

  return (
    <ModuleContext.Provider value={{ state, dispatch }}>
      {children}
    </ModuleContext.Provider>
  );
}

export function useModuleContext() {
  const context = useContext(ModuleContext);
  if (!context) {
    throw new Error('useModuleContext must be used within ModuleProvider');
  }
  return context;
}
