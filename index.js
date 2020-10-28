/* 'use strict'
// import './css/style.css'

const filter = document.querySelector('.filter')
const bar = filter.querySelector('.filter__bar')

function inputMin() {
    return filter.querySelector('.filter__input--min')
}

function inputConstMin() {
    return inputMin().value = 0
}


function inputMax() {
    return filter.querySelector('.filter__input--max')
}

function inputConstMax() {
    return inputMax().value = 500
}

function scaleLength() {
    return filter.querySelector('.filter__scale').offsetWidth
}

function toggleMin() {
    return filter.querySelector('.filter__toggle--min')
}

function toggleMax() {
    return filter.querySelector('.filter__toggle--max')
} */

function changeLeft(element, left) {
    element.style.left = left + 'px'
}

function changeToggle(result, scale, intervalPrice, element) {
    var value = ((result - data.valueInputOne) * scale) / intervalPrice
    return changeLeft(element, value)
}

// function initInputsForm() {
//     return Array.from(filter.querySelectorAll('input'))
// }

function valueInputOne() {
    return Number(initInputsForm()[0].value)
}

function valueInputSecond() {
    return Number(initInputsForm()[1].value)
}

/* function inputErrorMax() {
    return filter.querySelector('.filter__error--max')
}

function inputErrorMin() {
    return filter.querySelector('.filter__error--min')
}

var data = {
    valueInputOne: inputConstMin(),
    valueInputSecond: inputConstMax(),
    scale: scaleLength(),
    lengthScale: inputConstMax() - inputConstMin()
}
data.priceScale = data.lengthScale / data.scale */
console.log('data: ', data)
function initConstToggle() {
    changeToggle(data.valueInputOne, data.scale, data.lengthScale, toggleMin())
    changeToggle(data.valueInputSecond, data.scale, data.lengthScale, toggleMax())
    scaleBar()
}

function initChangeToggle() {
    changeToggle(valueInputOne(), data.scale, data.lengthScale, toggleMin())
    changeToggle(valueInputSecond(), data.scale, data.lengthScale, toggleMax())
}

// initConstToggle()

function validatorInputs(value, input, inputError) {
    var num = String(value)
    var valid = false
    var dataInput = [
        { condition: value < 0, errorText: 'Значение не может быть отрицательным' },
        { condition: value < data.valueInputOne, errorText: 'Значение должно быть больше минимального значения ' + data.valueInputOne },
        { condition: value > data.valueInputSecond, errorText: 'Значение не может быть больше максимального значения' + data.valueInputSecond },
        { condition: !num.match(/[0-9]/g), errorText: 'Значение должно быть цифрами' }
    ]
    var dataInputErrText = []

    dataInput.forEach(function (i) {

        if (i.condition) {
            dataInputErrText.push(i.errorText)
        }
    })

    if (dataInputErrText.length !== 0) {
        input.style.border = '1px solid red'
        inputError.textContent = dataInputErrText.join(' и ')
        return valid = false
    } else {
        input.style.border = 'none'
        inputError.textContent = ''
        return valid = true
    }
}

function initVaidatorInputs() {
    var isValid = false
    var isvalidMin = false
    var isValidMax = false

    isvalidMin = validatorInputs(valueInputOne(), inputMin(), inputErrorMin())
    isValidMax = validatorInputs(valueInputSecond(), inputMax(), inputErrorMax())

    return isValid = isvalidMin && isValidMax
}

function scaleBar() {

    var left = ((valueInputOne() - data.valueInputOne) * data.scale) / data.lengthScale
    var right = data.scale - ((valueInputSecond() - data.valueInputOne) * data.scale) / data.lengthScale

    if (valueInputOne() > valueInputSecond()) {
        left = ((valueInputSecond() - data.valueInputOne) * data.scale) / data.lengthScale
        right = data.scale - ((valueInputOne() - data.valueInputOne) * data.scale) / data.lengthScale
    }

    bar.style.marginLeft = left + 'px'
    bar.style.marginRight = right + 'px'

}

// scaleBar()

// filter.addEventListener('input', inputChangeHandler)

function inputChangeHandler() {

    initVaidatorInputs()
    if (initVaidatorInputs()) {
        initChangeToggle()
        scaleBar()
    }
}

function inputSubmitHandler(event) {
    event.preventDefault()
    initVaidatorInputs()
    if (initVaidatorInputs()) {
        if (valueInputOne() > valueInputSecond()) {

            var inputTemp = valueInputOne()
            inputMin().value = valueInputSecond()
            inputMax().value = inputTemp
        }
        initChangeToggle()
        scaleBar()
        console.log('test OK')
    }
}



function initToggleDropDown(element) {
    element.addEventListener('mousedown', function (evt) {
        evt.preventDefault()

        var x = evt.clientX

        var toggleMousemoveHandler = function (moveEvt) {
            moveEvt.preventDefault()
            console.log('posizion: ', element.offsetLeft)
            var shift = x - moveEvt.clientX
            x = moveEvt.clientX

            var res = element.offsetLeft - shift
            console.log('res: ', res)

            if (res > 0 && res <= data.scale) {

                if (element == toggleMin()) {
                    inputMin().value = Math.round(data.priceScale * res) + data.valueInputOne
                } else {
                    inputMax().value = (data.valueInputSecond) - (data.lengthScale - Math.round(data.priceScale * res))
                    console.log('res: ', res)
                }
                scaleBar()
                element.style.left = (element.offsetLeft - shift) + 'px'
            }
        }

        function toggleMouseupHandler(upEvt) {
            upEvt.preventDefault()
            document.removeEventListener('mousemove', toggleMousemoveHandler)
            document.removeEventListener('mouseup', toggleMouseupHandler)
        }

        document.addEventListener('mousemove', toggleMousemoveHandler)
        document.addEventListener('mouseup', toggleMouseupHandler)

    })
}

function init() {
    initConstToggle()
    scaleBar()

    filter.addEventListener('input', inputChangeHandler)
    filter.addEventListener('submit', inputSubmitHandler)

    initToggleDropDown(toggleMin())
    initToggleDropDown(toggleMax())
}

init()