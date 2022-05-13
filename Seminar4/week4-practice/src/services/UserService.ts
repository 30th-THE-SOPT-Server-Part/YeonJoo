import mongoose from "mongoose";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";
import { UserUpdateDto } from "../interfaces/user/UserUpdateDto";
import User from "../models/User";

const createUser = async (userCreateDto: UserCreateDto): Promise<PostBaseResponseDto> => {
    try {
        const user = new User({
            name: userCreateDto.name,
            phone: userCreateDto.phone,
            email: userCreateDto.email,
            age: userCreateDto.age,
            school: userCreateDto.school
        });
        // or const user = new User(userCreateDto);

        await user.save(); // mongoDB에 document 저장하는 mongoose 함수 save()

        const data = {
            _id: user.id
        };

        return data;
    } catch (error) {
        console.log(error); // 여기서는 response로 에러를 전달하면 안됨, 전달은 controller에서만!
        throw error;
    }
};

const updateUser = async (userId: string, userUpdateDto: UserUpdateDto) => {
    try {
        // findByIdAndUpdate 사용
        await User.findByIdAndUpdate(userId, userUpdateDto);
    } catch (error) {
        console.log(error); // 여기서는 response로 에러를 전달하면 안됨, 전달은 controller에서만!
        throw error;
    }
};

const findUserById = async (userId: string): Promise<UserResponseDto | null> => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        console.log(error); // 여기서는 response로 에러를 전달하면 안됨, 전달은 controller에서만!
        throw error;
    }
};

const deleteUser = async (userId: string) => {
    try {
        await User.findByIdAndDelete(userId);
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export default {
    createUser,
    updateUser,
    findUserById,
    deleteUser
};