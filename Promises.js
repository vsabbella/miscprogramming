//Promises

  let waitx = (xsecs)=> {
                              setTimeout(()=>{console.log(`after ${xsecs} seconds`)},xsecs);
                        }
  let waitxandreturny = (res)=>{
    waitx(2000);
    let y = {x:2000,y:"y"};
    res(y);
  }                           
  let p =   new Promise((resolve,reject)=>{
                         waitxandreturny(resolve);
                         resolve({x:"a"});
                        });

  p.then(value => console.log('value is ',value));


  
  //Promise.resolve
  let fifteen = Promise.resolve(15);
  fifteen.then(value => console.log(`Got ${value}`));

                   