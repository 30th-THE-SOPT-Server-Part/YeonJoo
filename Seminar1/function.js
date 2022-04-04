function menu(dinner) { 
    return `오늘 메뉴는 ${dinner}~!!`;
}

console.log(menu('삼겹살'));

const menu2 = (dinner) => {
    return `오늘 메뉴는 ${dinner}~!!`;
}

console.log(menu2('삼겹살'));

let sum = (a, b) => {
    return a + b;
}

console.log(sum(1,2));

const func = (num) => {
    return num * num;
}

const multiple = (func, num) => {
    console.log(func(num));
}

multiple(func,2);


let a = 2;
let b = a++;
a = 2;
let c = ++a;
console.log(b);
console.log(c);

let x = 5;
let y = 5;
let z = '5';

if (x === y) { // === 값과 타입 동시 비교
    console.log(`x === y`);
}

if (x === z) { // === 값과 타입 동시 비교 (동시비교를 추천~!)
    console.log(`x === z`);
}

if (x == z) { // == 값만 비교
    console.log(`x == z`);
}

let p = 1;
let q = 2;
let r = '1';

if (p != q) { // 1, 2 값만 비교
    console.log(`p != q`);
}

if (p != r) { // 1, '1' 값만 비교
    console.log(`p != r`);
}

if (p !== r) { // 1, '1' 값과 타입 동시 비교
    console.log(`p !== r`);
}

if(typeof p == 'number'){
    console.log(`p's type is number type`);
}