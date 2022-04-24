import { SchoolInfo } from "../school/SchoolInfo";

export interface UserUpdateDto {
    //update 들어올 수도 있고 아닐 수도 있음 모든 필드가! create와 다름! -> optional
    name?: string;
    phone?: string;
    email?: string;
    age?: number;
    school?: SchoolInfo;
};