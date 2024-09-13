import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectList : [
  //   {
  //       id: null,
  //       projectName: '',
  //       creatorName: '',
  //       creatorId: null,
  //       startDate: '',
  //       endDate: '',
  //       status: 'Not Started',
  //       totalTask: 0,
  //       completedTask: 0,
  // }
]
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    fetchProject: (state, action) => {
      state.projectList = [...action.payload]
    },

    addProject: (state, action) => {
      state.projectList = [action.payload, ...state.projectList]
    },

    getProject: (state) => state
  },
})

export const { fetchProject, addProject, getProject } = projectSlice.actions

export default projectSlice.reducer
