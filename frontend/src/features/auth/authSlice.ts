import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthState} from '@/types';


const initialState:AuthState={
    employee_id:null,
    employee_email:null,
    employee_first_name:null,
    employee_role:null,
    token:null,
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setAuthState:(state,action:PayloadAction<AuthState>)=>{
            state.employee_id=action.payload.employee_id;
            state.employee_email=action.payload.employee_email;
            state.employee_first_name=action.payload.employee_first_name;
            state.employee_role=action.payload.employee_role;
            state.token=action.payload.token;
        },
        
        removeAuthState:(state)=>{
            state.employee_id=null;
            state.employee_email=null;
            state.employee_first_name=null;
            state.employee_role=null;
            state.token=null;
        }
    }
    
})

export const {setAuthState,removeAuthState}=authSlice.actions;
export default authSlice.reducer;