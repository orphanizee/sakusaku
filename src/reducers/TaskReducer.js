import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

let arr = [];
if (window.localStorage && localStorage.getItem("tasks")) {
  const json = localStorage.getItem("tasks");
  try {
    arr = JSON.parse(json);
  } catch (error) {
    localStorage.clear();
  }
}

const initialState = {
  tasks: arr,
};

const taskSlice = createSlice({
  name: "taskManager",
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.tasks.push(action.payload);
        if (window.localStorage) {
          localStorage.setItem("tasks", JSON.stringify(state.tasks));
        }
      },
      prepare: (taskName, estimatedMinute, estimatedSecond) => {
        return {
          payload: {
            id: uuidv4(),
            name: taskName,
            estimatedMinute: estimatedMinute,
            estimatedSecond: estimatedSecond,
            actualTime: "0:00:00",
            status: "停止中",
            progress: 0,
          },
        };
      },
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      if (window.localStorage) {
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    updateTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.actualTime = action.payload.actualTime;
        task.progress = action.payload.progress;
        task.status = action.payload.status;
      }
      if (window.localStorage) {
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    editTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.name = action.payload.name;
        task.estimatedMinute = action.payload.estimatedMinute;
        task.estimatedSecond = action.payload.estimatedSecond;
      }
      if (window.localStorage) {
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    exportTasks: (state, action) => {
      const headers = ["タスク名", "予定工数", "実績工数", "進捗率(%)"];
      let str = headers.join() + "\n";

      state.tasks.map((task) => {
        var row =
          task.name +
          "," +
          ("00" + task.estimatedMinute).slice(-2) +
          ":" +
          ("00" + task.estimatedSecond).slice(-2) +
          "," +
          task.actualTime +
          "," +
          task.progress +
          "\n";
        str += row;
      });

      const date = new Date();
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();
      const yyyy = y.toString();
      const mm = ("00" + m).slice(-2);
      const dd = ("00" + d).slice(-2);
      const yyyymmdd = yyyy + mm + dd;
      const h = date.getHours();
      const min = date.getMinutes();
      const s = date.getSeconds();
      const hh = ("00" + h).slice(-2);
      const mins = ("00" + min).slice(-2);
      const ss = ("00" + s).slice(-2);
      const hhmmss = hh + mins + ss;

      var blob = new Blob([str], { type: "text/csv" });
      var link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `tasks_${yyyymmdd}${hhmmss}.csv`;
      link.click();
    },
    importTasks: (state, action) => {
      const json = [];

      action.payload.map((elm) =>
        json.push({
          id: uuidv4(),
          name: elm["タスク名"],
          estimatedMinute: Number(elm["予定工数"].split(":")[0]),
          estimatedSecond: Number(elm["予定工数"].split(":")[1]),
          actualTime: elm["実績工数"],
          status: "停止中",
          progress: elm["進捗率(%)"],
        })
      );

      state.tasks = json;

      if (window.localStorage) {
        localStorage.setItem("tasks", JSON.stringify(json));
      }
    },
  },
});

export const {
  addTask,
  getTasks,
  deleteTask,
  updateTaskStatus,
  updateTaskActualTime,
  updateTask,
  editTask,
  exportTasks,
  importTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
