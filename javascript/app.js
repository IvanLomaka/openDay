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