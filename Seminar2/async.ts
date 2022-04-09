console.log("Hello Server");

// 비동기 처리 방식 - Callback Function
setTimeout((): void => {
    console.log("Hello Server 2");
}, 3000);

console.log("Hello Server 3");


// 비동기 처리 방식 - Promise
const condition: boolean = true;
//const condition: boolean = false;

const promise = new Promise((resolve, reject) => {
    if (condition) {
        resolve("성공");
    } else {
        reject(new Error("에러 발생! condition false"));
    }
});

promise
    .then((resolveData): void => {
        console.log(resolveData + "이다~!!!")
    })
    .catch(err => console.log(err));


// Promise Chaining
const restaurant = (callback: () => void, time: number) => {
    setTimeout(callback, time);
}

const order = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        restaurant(() => {
            console.log("[레스토랑 진행 상황 - 음식 주문]");
            resolve("음식 주문 시작"); // resolve가 되면 string을 반환하기 때문에 order의 반환형도 Promise<string>
        }, 1000);
    });
}

const cook = (progress: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        restaurant(() => {
            console.log("[레스토랑 진행 상황 - 음식 조리]");
            resolve(`${progress} -> 음식 조리 중`);
        }, 2000);
    });
}

const serving = (progress: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        restaurant(() => {
            console.log("[레스토랑 진행 상황 - 음식 서빙]");
            resolve(`${progress} -> 음식 서빙 중`);
        }, 3000);
    });
}

const eat = (progress: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        restaurant(() => {
            console.log("[레스토랑 진행 상황 - 음식 먹기]");
            resolve(`${progress} -> 음식 먹는 중`);
        }, 4000);
    });
}

order()
    .then(progress => cook(progress))
    .then(progress => serving(progress))
    .then(progress => eat(progress))
    .then(progress => console.log(progress))

Promise.resolve(123)
    .then(res => {
        throw new Error("에러 발생!");
        return 456; // 절대 실행 되지 않음!! 위에 에러 발생했기 때문에 catch로 넘어감!
    })
    .then(res => {
        console.log(res); // 절대 실행 되지 않음!! 위에 에러 발생했기 때문에 catch로 넘어감!
        return Promise.resolve(789);
    })
    .catch(err => {
        console.log(err.message)
    });


// 비동기 처리 방식 - async/await
// Promise 와 async/await 비교
// 함수명 - 인자 string Promise<string> 반환
let asyncFunc1 = (msg: string): Promise<string> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`asyncFunc1 - ${msg}`);
        }, 1000);
    });
}

let asyncFunc2 = (msg: string): Promise<string> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`asyncFunc2 - ${msg}`);
        }, 1500);
    });
}

// Promise
let promiseMain1 = (): void => {
    asyncFunc1("server part").then((result: string) => {
        console.log(result);
        return asyncFunc2("손연주");
    }).then((result: string) => {
        console.log(result);
    })
}

promiseMain1();

// async/await
const asyncMain = async () => {
    let result = await asyncFunc1("server part");
    console.log(result);
    result = await asyncFunc2("손연주");
    console.log(result);
}

asyncMain();