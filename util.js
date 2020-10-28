'use strict';

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
}

function initInputsForm() {
    return Array.from(filter.querySelectorAll('input'))
}

function inputErrorMax() {
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
data.priceScale = data.lengthScale / data.scale