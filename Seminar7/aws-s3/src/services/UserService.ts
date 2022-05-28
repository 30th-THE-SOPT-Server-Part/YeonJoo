import mongoose from "mongoose";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";
import { UserUpdateDto } from "../interfaces/user/UserUpdateDto";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { UserSignInDto } from "../interfaces/user/UserSignInDto";

const createUser = async (
  userCreateDto: UserCreateDto
): Promise<PostBaseResponseDto | null> => {
  try {
    const existUser = await User.findOne({
      email: userCreateDto.email, // user email 이 이미 존재하는지 검사 -> 409 duplicated
    });
    if (existUser) return null;

    const user = new User({
      name: userCreateDto.name,
      phone: userCreateDto.phone,
      email: userCreateDto.email,
      password: userCreateDto.password,
      age: userCreateDto.age,
      school: userCreateDto.school,
    });

    // or const user = new User(userCreateDto);
    const salt = await bcrypt.genSalt(10); // salt: 아주 작은 임의의 랜덤한 텍스트
    user.password = await bcrypt.hash(userCreateDto.password, salt);

    await user.save(); // mongoDB에 document 저장하는 mongoose 함수 save()

    const data = {
      _id: user.id,
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

const findUserById = async (
  userId: string
): Promise<UserResponseDto | null> => {
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
};

const signInUser = async (
  userSignInDto: UserSignInDto
): Promise<PostBaseResponseDto | null | number> => {
  try {
    const user = await User.findOne({
      email: userSignInDto.email,
    });
    if (!user) return null; // user email 존재하지 않는 경우 처리

    // bcrypt 가 원래 password 와 현재 보낸 password 대조
    // match 되지 않는 다면 401 반환
    const isMatch = await bcrypt.compare(userSignInDto.password, user.password);
    if (!isMatch) return 401;

    const data = {
      _id: user._id,
    };
    
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createUser,
  updateUser,
  findUserById,
  deleteUser,
  signInUser,
};
