// animate the navbar

const navButton = document.getElementById('navActivation')
const navWrapper = document.getElementById('navWrapper')
const navUl = document.getElementById('navUl')
const navUlList = document.querySelectorAll('[data-nav-a]')

navButton.addEventListener('click', () => {
    navWrapper.classList.toggle('nav-wrapper-active')
    navUlList.forEach(a => {
        a.classList.toggle('nav-wrapper-ul-active')
    });
})

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

for(let i = 1; i < navUlList.length; i++)  navUlList[i].classList.add('color-class')

navUlList.forEach(button => {
    button.addEventListener('click', (e) => {
        navUlList.forEach(e => e.classList.add('color-class'))
        button.classList.remove('color-class')
        console.log(button.getAttribute('index'))
        addRemoveSections(parseInt(button.getAttribute('index')))
    })
})

function addRemoveSections(i) {
    dataSections.forEach(e => e.classList.add('hide'))
    dataSections[i].classList.remove('hide')
}