const sopt = {
    season: 30,
    group: ['YB', 'OB'],
    part: ['서버', '기획', '디자인', '안드로이드', '웹', 'iOS'],
    president: '김규민',
    introduce: function () {
        this.part.map(name => {
            console.log(`솝트 내 파트는 ${name} 파트가 있어요!`)
        })
    }
}

console.log(sopt.group);
sopt.introduce();
console.log(sopt.season);

let array = [1, true, "string"];
console.log(array);

let array2 = [
    {
        name: '손연주',
        age: 25
    },
    {
        name: '김영민',
        age: 28
    }
];

console.log(array2);
console.log(typeof array2);