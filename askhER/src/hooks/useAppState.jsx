import { createContext, useContext, useState } from 'react'

const defaultState = {
  selectedFlavour:   null,
  selectedFoods:     [],
  mwahCount:         -1,        // -1 = untouched; INFINITY_VALUE = any option selected
  selectedDate:      '',
  selectedTime:      '',
  noButtonMoves:     0,
  flowersBlooomed:   new Array(10).fill(false),  // 10 flowers now
}

const AppStateContext = createContext(null)

export function AppStateProvider({ children }) {
  const [state, setState] = useState(defaultState)

  const updateState = (patch) =>
    setState((prev) => ({ ...prev, ...patch }))

  const setFlavour = (flavour) => updateState({ selectedFlavour: flavour })

  const toggleFood = (id) =>
    setState((prev) => {
      const already = prev.selectedFoods.includes(id)
      return {
        ...prev,
        selectedFoods: already
          ? prev.selectedFoods.filter((f) => f !== id)
          : [...prev.selectedFoods, id],
      }
    })

  const setMwahCount = (count) => updateState({ mwahCount: count })

  const setDateTime = (date, time) =>
    updateState({ selectedDate: date, selectedTime: time })

  const incrementNoMoves = () =>
    setState((prev) => ({ ...prev, noButtonMoves: prev.noButtonMoves + 1 }))

  const bloomFlower = (index) =>
    setState((prev) => {
      const next = [...prev.flowersBlooomed]
      next[index] = true
      return { ...prev, flowersBlooomed: next }
    })

  const resetState = () => setState(defaultState)

  return (
    <AppStateContext.Provider
      value={{ state, setFlavour, toggleFood, setMwahCount, setDateTime, incrementNoMoves, bloomFlower, resetState }}
    >
      {children}
    </AppStateContext.Provider>
  )
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider')
  return ctx
}
