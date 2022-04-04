export{} // name 선언 안될 때 
let name: string = "aaa";
let isDone: boolean = true;
const str: string = 'hello';
console.log(str);
console.log(isDone);

let grade: number = 4;
console.log(grade);

//const ages: number[] = [1, 2, 3, 4, 5];
const ages: Array<number> = [1, 2, 3, 4, 5];

//const strArray: string[] = ["hi", "hello"];
const strArry: Array<string> = ["hi", "hello"];

// object는 원시타입을 제외한 나머지를 모두 받을 수 있음
const objArr1: Array<object> = [
    { item: 'a' },
    { item: 'b' }
]

// Object는 자바스크립트의 모든 생성자를 extend 
// 즉, 자바스크립트의 모든 타입이 할당될 수 있다.
const objArr2: Array<Object> = [
    { item: 'a' },
    { item: 'b' }
]
console.log(objArr1);

const f1 = (obj: object): void => {
    console.log(obj);
}

const f2 = (obj: Object): void => {
    console.log(obj);
}

f2('hihi');
f2([1, 2, 3, 4]);

// f1('hihi'); // object는 원시타입을 제외한 나머지를 모두 받을 수 있음
f1([1, 2, 3, 4]);

const div = (x: number, y: number): number => {
    return x / y;
}
console.log(div(6, 2));

let myName: any = '손연주';
// angle-bracket
let myNameLength1: number = (<string>myName).length
// as 
let myNameLength2: number = (myName as string).length
console.log(myNameLength1);
console.log(myNameLength2);

// interface는 대문자
interface Sopt {
    name: string;
    age: number;
    mbti: Array<string>;
    organization: string;
    completion: Array<number>; // or number[]
}

// 모든 프로퍼티 명시 필요함.
const yjooSopt: Sopt = {
    name: '손연주',
    age: 25,
    mbti: ['ESFJ', 'ESTJ'],
    organization: 'SOPT',
    completion: [27, 28, 30]
};

console.log(yjooSopt);

const sevSevEeDeul: Array<Sopt> = [
    {
        name: '손연주',
        age: 25,
        mbti: ['ESFJ', 'ESTJ'],
        organization: 'SOPT',
        completion: [27, 28, 30]
    },
    {
        name: '손연주',
        age: 25,
        mbti: ['ESFJ', 'ESTJ'],
        organization: 'SOPT',
        completion: [27, 28, 30]
    },
    {
        name: '손연주',
        age: 25,
        mbti: ['ESFJ', 'ESTJ'],
        organization: 'SOPT',
        completion: [27, 28, 30]
    }
]
console.log(sevSevEeDeul);

interface Closet {
    name: string;
    shirt: number;
    pants: number;
    sunglass?: number; // ? 선택적 프로퍼티
    hat?: number; // ? 선택적 프로퍼티
}

const myCloset: Array<Closet> = [
    {
        name: 'ㄱㄱ',
        shirt: 5,
        pants: 6
    },
    {
        name: 'ㄴㄴ',
        shirt: 5,
        pants: 6,
        hat: 5
    },
    {
        name: 'ㄷㄷ',
        shirt: 5,
        pants: 6,
        sunglass: 3
    }
]

console.log(myCloset);