const name = '손연주';
console.log(typeof name);

let age = 25;
console.log(typeof age);

let server = true;
console.log(typeof server);

// 안녕하세요 제 이름은 손연주입니다. 제 나이는 25살입니다.
console.log(`안녕하세요 제 이름은 ${name}입니다. 제 나이는 ${age}입니다.`);

console.log(typeof null); // object
console.log(typeof undefined); // undefined

let arr = [1, 2, 3, 'a', 'b', 'c'];

let num = [1, 2, 3, 4];
const newNumArr = num.map(x => x * 2);
console.log(newNumArr);

newNumArr.map(x => {
    console.log(x);
});

for (const x of newNumArr) {
    console.log(x);
}