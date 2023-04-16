import { configureStore } from '@reduxjs/toolkit';
import taskSlice from '../reducers/TaskReducer';

export default configureStore({
  reducer: {
    taskManager: taskSlice,
  },
});
