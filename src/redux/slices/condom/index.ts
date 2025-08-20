import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


interface CondomState {
  edit:boolean,
  id:string | null
}




const initialState: CondomState = {
  edit:false,
  id:null
};

const condomSlice = createSlice({
  name: 'condom',
  initialState,
  reducers: {
    makeEdit: (state,action) => {
      state.edit = true
      state.id = action.payload
    },
    cancelEdit:(state)=>{
      state.edit = false
      state.id = null
    }
  },
  extraReducers: (builder) => {

  },
});

export const {makeEdit,cancelEdit} = condomSlice.actions;


export default condomSlice.reducer;