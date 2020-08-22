// main.js
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' // Import precompiled Bootstrap css
import '@fortawesome/fontawesome-free/css/all.css'
var $ = require( "jquery" );

let items = [
  '`',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '-',
  '=',
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  '[',
  ']',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  ';',
  '\'',
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm',
  ',',
  '.',
  '/'
]

let actual = items[Math.floor(Math.random() * items.length)]
$('#element').html(actual)
let pretend = actual


let index
let wrong = []

const reset = () => {
  do {
    for(const val of wrong) {
      if(Math.random() > 1/(val.times+1))
        if((pretend = val.letter) != actual)
          break
    }
    if(actual == pretend)
      pretend = items[Math.floor(Math.random() * items.length)];
  } while(actual == pretend)
  
  $('#element').html(actual = pretend)
}

$(document).keydown((event) => {
  // no: backspace 8, tab 9, enter 13, shift 16, ctrl 17, alt 18, f1-f16 112-123
  if(event.keyCode > 18 && event.keyCode < 112 || event.keyCode > 123) {
    event.preventDefault()

    if(event.key == actual) {
      if((index = wrong.findIndex(element=>element.letter == event.key)) >= 0) {
        if(wrong[index].times == 1)
          wrong.splice(index, 1);
        else
          wrong[index].times--
      }
      reset()
    }
    else if(items.includes(event.key)) {
      if((index = wrong.findIndex(element=>element.letter == event.key)) >= 0) {
        wrong[index]['times']++
      } else {
        wrong.push({letter: event.key, times: 1})
      }
    }
  }
});
