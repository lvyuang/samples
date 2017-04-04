import P from './promise';


const testPromise = () => {
  const p = new P((resolve, reject) => {
    setTimeout(() => {
      console.log('ok');
      resolve('ok');
    }, 300);
  });

  p.then((res) => {
    console.log('##', res);
    return 'abc';
  }).then((res) => {
    console.log('#2', res);
    // throw new Error('boom!');
  });
};

testPromise();




