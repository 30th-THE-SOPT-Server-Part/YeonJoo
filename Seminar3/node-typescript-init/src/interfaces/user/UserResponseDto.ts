import mongoose from "mongoose";
import { UserCreateDto } from "./UserCreateDto";

export interface UserResponseDto extends UserCreateDto{
    _id: mongoose.Schema.Types.ObjectId,
    gender?: string; // 확장 후 이렇게 추가하고 싶은 것 따로 추가할 수도 있음
}