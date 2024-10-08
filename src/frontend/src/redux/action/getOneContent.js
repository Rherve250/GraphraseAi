import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOneContent } from "../../utils/endpoints";
import { ToastError } from "@/utils/toast";


export const OneContentThunk = createAsyncThunk("OneContent",
async(data,{rejectWithValue})=>{
    try{
        
       const repo = await getOneContent(data);
       if(repo.Ok){
        return repo.Ok
       }else if(repo.Err){
        {repo.Err.NotFound && ToastError(repo.Err.NotFound)}
        {repo.Err.Error && ToastError(repo.Err.Error)}
        {repo.Err.NotAllowed && ToastError(repo.Err.NotAllowed)}
        return rejectWithValue(repo.Err)
       }

    }catch(error){
        return rejectWithValue(error.Err)
    }
}
);