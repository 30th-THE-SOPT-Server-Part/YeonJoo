import mongoose from "mongoose";

export interface PostBaseResponseDto {
    _id: mongoose.Schema.Types.ObjectId // SQL에서는 아이디가 1,2,3... 숫자로 되지만 mongoDB에서는 아님
}