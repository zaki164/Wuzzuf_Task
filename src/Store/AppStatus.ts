import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Job } from '../Types'

export interface AppState {
  HistoryJobs?: Job[],
  SearchJobs?: Job[],
  SearchValue?: string,
}

const initialState: AppState = {
  HistoryJobs: localStorage?.getItem("History_jobs") ? JSON.parse(localStorage?.getItem("History_jobs") || '{}') : [],
  SearchJobs: [],
  SearchValue: '',
}

export const AppStatus = createSlice({
  name: 'Status',
  initialState,
  reducers: {
    setHistoryJobs: (state, action: PayloadAction<AppState>) => {
      state.HistoryJobs = action.payload.HistoryJobs
    },
    setSearchJobs: (state, action: PayloadAction<AppState>) => {
      state.SearchJobs = action.payload.SearchJobs
    },
    setSearchValue: (state, action: PayloadAction<AppState>) => {
      state.SearchValue = action.payload.SearchValue
    },
  },
})

export const { setHistoryJobs, setSearchJobs, setSearchValue } = AppStatus.actions

export default AppStatus.reducer