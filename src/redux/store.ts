import { combineReducers, configureStore } from '@reduxjs/toolkit';   
import { persistStore, persistReducer, PERSIST } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import quizConfigReducer from './slices/quizConfigSlice';
import questionsListReducer from './slices/questionsListSlice';
import statisticsLoader from './slices/statisticsSlice';
import resultSlice from './slices/resultSlice';
import resultReducer from './slices/resultSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'quizConfig',
    'results'
  ]
};

const rootReducer = combineReducers({
  quizConfig: quizConfigReducer,
  results: resultReducer,
  statistics: statisticsLoader
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    persistedReducer,
    quizConfig: quizConfigReducer,
    questionsList: questionsListReducer,
    result: resultSlice,
    statistics: statisticsLoader,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions:[PERSIST],
      }
    })
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;