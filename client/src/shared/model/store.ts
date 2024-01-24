import { RootState } from "@/app/redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAsyncThunkDispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;