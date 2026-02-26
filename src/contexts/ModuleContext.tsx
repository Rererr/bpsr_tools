import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ModuleState, EffectSlot, ModuleSlot, CalculationResult, IdealLinkLevel } from '../types/module-state';
import { GameData } from '../types/game-data';
import { calculateResults, calculateLinkBonuses } from '../utils/calculator';
import { SerializedModuleSlot } from '../types/presets';
import { deserializeToState } from '../utils/storage';

// Action types
type Action =
  | { type: 'SET_MODULE'; slotId: string; moduleId: number; moduleName: string; moduleType: number }
  | { type: 'SET_EFFECT'; slotId: string; effectIndex: number; effectName: string; statId: number; value: number }
  | { type: 'CLEAR_SLOT'; slotId: string }
  | { type: 'CALCULATE_RESULTS' }
  | { type: 'LOAD_PRESET'; presetId: string; presetName: string; slots: SerializedModuleSlot[] }
  | { type: 'SET_COMPARISON_BASE'; presetId: string; presetName: string; results: CalculationResult[] }
  | { type: 'CLEAR_COMPARISON_BASE' }
  | { type: 'SET_IDEAL_LEVEL'; effectName: string; effectNameJP: string; targetLv: number }
  | { type: 'SET_IDEAL_LEVELS'; levels: IdealLinkLevel[] }
  | { type: 'CLEAR_IDEAL_LEVELS' }
  | { type: 'CLEAR_ALL' };

// Helper function to initialize effects
function initEffects(): EffectSlot[] {
  return [
    { id: crypto.randomUUID(), effectName: '', statId: 0, value: 0 },
    { id: crypto.randomUUID(), effectName: '', statId: 0, value: 0 },
    { id: crypto.randomUUID(), effectName: '', statId: 0, value: 0 },
  ];
}

// Create initial slots
function createInitialSlots(): ModuleSlot[] {
  return [
    { id: 'slot-0', moduleId: null, moduleName: '', moduleType: null, effects: initEffects() },
    { id: 'slot-1', moduleId: null, moduleName: '', moduleType: null, effects: initEffects() },
    { id: 'slot-2', moduleId: null, moduleName: '', moduleType: null, effects: initEffects() },
    { id: 'slot-3', moduleId: null, moduleName: '', moduleType: null, effects: initEffects() },
  ];
}

// Initial state
const initialState: ModuleState = {
  slots: createInitialSlots(),
  results: [],
  linkBonuses: [],
  comparisonBase: null,
  idealLevels: [],
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
      case 'LOAD_PRESET': {
        const newSlots = deserializeToState(action.slots, state.slots);
        return {
          ...state,
          slots: newSlots,
          results: calculateResults(newSlots),
          linkBonuses: calculateLinkBonuses(newSlots, gameData),
          comparisonBase: {
            presetId: action.presetId,
            presetName: action.presetName,
            results: calculateResults(newSlots),
          },
        };
      }
      case 'SET_COMPARISON_BASE': {
        return {
          ...state,
          comparisonBase: {
            presetId: action.presetId,
            presetName: action.presetName,
            results: action.results,
          },
        };
      }
      case 'CLEAR_COMPARISON_BASE': {
        return {
          ...state,
          comparisonBase: null,
        };
      }
      case 'SET_IDEAL_LEVEL': {
        const existingIndex = state.idealLevels.findIndex(l => l.effectName === action.effectName);
        let newLevels: IdealLinkLevel[];

        if (action.targetLv === 0) {
          // Remove if target is 0
          newLevels = state.idealLevels.filter(l => l.effectName !== action.effectName);
        } else if (existingIndex >= 0) {
          newLevels = [...state.idealLevels];
          newLevels[existingIndex] = {
            effectName: action.effectName,
            effectNameJP: action.effectNameJP,
            targetLv: action.targetLv,
          };
        } else {
          newLevels = [...state.idealLevels, {
            effectName: action.effectName,
            effectNameJP: action.effectNameJP,
            targetLv: action.targetLv,
          }];
        }

        return {
          ...state,
          idealLevels: newLevels,
        };
      }
      case 'SET_IDEAL_LEVELS': {
        return {
          ...state,
          idealLevels: action.levels,
        };
      }
      case 'CLEAR_IDEAL_LEVELS': {
        return {
          ...state,
          idealLevels: [],
        };
      }
      case 'CLEAR_ALL': {
        const newSlots = createInitialSlots();
        return {
          ...state,
          slots: newSlots,
          results: [],
          linkBonuses: [],
          comparisonBase: null,
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
