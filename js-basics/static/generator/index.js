const firstCall = () => {
  return new Promise((resolve, reject) => {
    resolve('first: ' + Date.now());
  });
};

const secondCall = (firstResult) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('second: ' + firstResult);
    }, 1000);
  });
};

const thirdCall = (secondResult) => {
  return 'third: ' + secondResult;
};

const wait = () => {
  return new Promise((resolve) => {
    console.log('waiting for 1 second.')
    setTimeout(() => {
      console.log('waiting done.');
      resolve();
    }, 1000);
  });
};

function* aGen() {
  console.log('hi, i\'m a generator');
  const firstResult = yield firstCall();
  const secondResult = yield secondCall(firstResult);
  const thirdResult = yield thirdCall(secondResult);
  yield wait();
  return Promise.resolve(thirdResult);
}

function run(generator) {
  const iterator = generator();

  function loop(res) {
    const result = iterator.next(res);

    if (result.done) {
      return result.value;
    }
    else {
      if (result.value && result.value.constructor.name === 'Promise') {
        return result.value.then(res => loop(res));
      }
      else {
        return loop(result.value);
      }
    }
  }

  return loop();
}

run(aGen).then(res => {
  console.log('final: ', res);
});
