// var name = 'yjooooo 1';
// var name = '손연주 1';

// console.log(name);

// let name2 = 'yjooooo 2';
// // let name2 = '손연주 2';

// console.log(name2);

// let name3 = 'yjooooo 3';
// name3 = '손연주 3';

// console.log(name3);

// const name4 = 'yjooooo 4';
// name4 = '손연주 4';

// console.log(name4);


// if (true) {
//     var x = 'var variable'; // function scope
// }

// console.log(x);

// if (true) {
//     const y = 'const variable'; // block scope
//     let z = 'let variable'; // black scope
// }

// console.log(y);
// console.log(z);

function foo() {
    if (true) {
        var name = 'yjooooo';
        console.log('if - block - ', name);
    }
    console.log('function - block - ',name);
}
console.log('global - ',name);