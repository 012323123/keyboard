// main.js
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' // Import precompiled Bootstrap css
import '@fortawesome/fontawesome-free/css/all.css'
var $ = require( "jquery" );

// let items = [
//   '`','1','2','3','4','5','6','7','8','9','0','-','=',
//   'q', 'w', 'e','r', 't', 'y', 'u', 'i', 'o','p',
//   '[',']',
//   'a','s','d','f','g','h','j','k','l',
//   ';','\'',
//   'z','x','c','v','b','n','m',
//   ',','.','/'
// ]
let template = `\`1234567890-=
qwertyuiop
[]
asdfghjkl
;,'
zxcvbnm
,./
!@#$%^&*()_+
QWERTYUIOP{}
ASDFGHJKL:"
ZXCVBNM<>?
ęóąśłżźćń
ĘÓĄŚŁŻŹĆŃ
`
let items = template.replace(/[\r\n ]/g, '').split('')

let actual = items[Math.floor(Math.random() * items.length)]
$('#element').text(actual)
let pretend = actual


let index
let wrong = []

let string = '', letter
const reload = () => {
  string = ''
  do {
    letter = items[Math.floor(Math.random() * items.length)];
    if(letter != string.charAt(string.length - 1))
      string += letter
  } while(string.length < 10)
  $('#element').text(string)
  wrong = []
}
reload()

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
  $('#element').text($('#element').text().substring(1) + (actual = pretend))
}

$(document).keydown((event) => {
  if(event.keyCode == 27) {
    $('#settings').toggle()
  }
  if($('#settings').is(":hidden")) {
    // no: backspace 8, tab 9, enter 13, shift 16, ctrl 17, alt 18, f1-f16 112-123
    if(event.keyCode > 18 && event.keyCode < 112 || event.keyCode > 123) {
      event.preventDefault()

      if(event.key == $('#element').text().charAt(0)) {
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
      }console.log(JSON.stringify(wrong))
    }
  }
});

let input = document.getElementById('settingsTextArea')
input.value = template
input.addEventListener('input', () => settingsChange())

function settingsChange() {
  let content = input.value.replace(/[\r\n ]/g, '')
  for(let i=0; i<content.length; i++) {
    if(content[i] != content[0]) {
      items = content.split('')
      break
    }
  }
  reload()
}

document.getElementById('reset').addEventListener('click', function() {
  input.value = template
  settingsChange(input)
})

let alt = `\`1234567890-=
qwertyuiop
[]
asdfghjkl
;,'
zxcvbnm
,./
ęóąśłżźćń
ĘÓĄŚŁŻŹĆŃ
`
let shift = `\`1234567890-=
qwertyuiop
[]
asdfghjkl
;,'
zxcvbnm
,./
!@#$%^&*()_+
QWERTYUIOP{}
ASDFGHJKL:"
ZXCVBNM<>?
`
let no = `\`1234567890-=
qwertyuiop
[]
asdfghjkl
;,'
zxcvbnm
,./
`

document.getElementById('alt').addEventListener('click', function() {
  input.value = alt
  settingsChange(input)
})
document.getElementById('shift').addEventListener('click', function() {
  input.value = shift
  settingsChange(input)
})
document.getElementById('no').addEventListener('click', function() {
  input.value = no
  settingsChange(input)
})