// animate the navbar

const navButton = document.getElementById('navActivation')
const navWrapper = document.getElementById('navWrapper')
const navUl = document.getElementById('navUl')
const navUlList = document.querySelectorAll('[data-nav-a]')

navButton.addEventListener('click', clickFuncFornavButton)

function clickFuncFornavButton() {
    navWrapper.classList.toggle('nav-wrapper-active')
    navUlList.forEach(a => {
        a.classList.toggle('nav-wrapper-ul-active')
    });
}

// activate the nav

window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 40) {
        wrapperNav.classList.add('active')
    } else {
        wrapperNav.classList.remove('active')
    }
})

// activate the nav on load

window.addEventListener('onload', () => {
    if (document.documentElement.scrollTop > 40) {
        wrapperNav.classList.add('active')
    } else {
        wrapperNav.classList.remove('active')
    }
})

// navbar colors and change section

const dataSections = document.querySelectorAll('[data-section]')
const burgerMenu = [...document.getElementsByClassName('burger-menu')]

let color = 'white'

for(let i = 1; i < navUlList.length; i++)  navUlList[i].classList.add(`color-class-${color}`)

navUlList.forEach(button => {
    button.addEventListener('click', (e) => {
        navUlList.forEach(e => {
            e.classList.remove(`color-class-${color}`)
            e.classList.remove(`active-black`)
        })

        if(parseInt(button.getAttribute('index')) == 0) {
            burgerMenu.forEach(e => e.classList.add('background-white'))

            color = 'white'
        } else {
            burgerMenu.forEach(e => e.classList.remove('background-white'))

            color = 'black'
            button.classList.add(`active-black`)
        }

        navUlList.forEach(e => e.classList.add(`color-class-${color}`))

        button.classList.remove(`color-class-${color}`)

        addRemoveSections(parseInt(button.getAttribute('index')))

        clickFuncFornavButton()
        nav.checked = false
    })
})

function addRemoveSections(i) {
    dataSections.forEach(e => e.classList.add('hide'))
    dataSections[i].classList.remove('hide')
}