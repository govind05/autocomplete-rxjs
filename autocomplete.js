// import Rx from 'rxjs';

const input = document.querySelector('#input');
const output = document.querySelector('#output');
// addEventListener()
const keyUp = Rx.Observable.fromEvent(input, 'keyup')
keyUp
  .throttleTime(150)
  .map(e => {
    while (output.hasChildNodes()) {
      output.removeChild(output.lastChild);
    }
    if (e.target.value === '') { return '123' }
    return e.target.value
  })
  .switchMap((val) => {
    return Rx.Observable.fromPromise(axios(`http://localhost:3000/names?name=${val}`))
    .catch(() => Rx.Observable.empty())
  })
  .map(val => val.data)
  .subscribe(names => {
    names.map(name => {
      const p = document.createElement('div');
      p.innerText = name;
      output.appendChild(p)
    })
    // console.log(names);
  })