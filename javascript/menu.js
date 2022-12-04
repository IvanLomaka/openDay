// write experiences data

const data = [
    {
        buttonText: "Present",
        title: "Mobile app - Website - A.I.",
        timespan: "DEC 2021 - PRESENT",
        description: [
            "At the moment I am working on several projects that I still have no intention of revealing because they are still in the design phase.",
            "In this discipline, the important thing is to constantly improve by always looking for new projects while keeping alive the interest in programming.",
        ],
        skills: [
            "React Native",
            "Expo",
            "Firebase",
            "Node.js",
        ],
    },
    {
        buttonText: "Murple",
        title: "Discord bot",
        timespan: "JUNE - JULY 2021",
        description: [
            "Murple is a discord bot that can play music, search for the lyrics of a song, save a recording, and has a system of levels that allows you to make a ranking of the users of a server.",
            "From this project, I learned to use the basics of MongoDB, a NoSQL database.",
            "The libraries on which this bot rests are not stable and must be overhauled to keep the bot active. At the moment, it is not constantly reviewed.",
        ],
        skills: [
            "Discord.js",
            "Distube",
            "MongoDB",
        ],
    },
    {
        buttonText: "Chess",
        title: "Chess A.I. - Multiplayer online",
        timespan: "FEB - APR 2021",
        description: [
            "Chess was the first project that I programmed entirely by myself without following any tutorials. All the challenges that came with designing the game pushed me even more into the making of the software.",
            "The artificial intelligence against which you can clash playing on the site can respond to moves thanks to minimax. In short, it is an algorithm that allows you to maximize the minimum gain (the victory).",
            "For the multiplayer, I used Socket.io. The game creates a custom room for every user who enters the multiplayer then it's on the player to share the code with his opponent."
        ],
        skills: [
            "Node.js",
            "Socket.io",
            "Minimax",
        ],
    }
]

// write experiences

const experiencesButtonsWrapper = document.getElementById('experiences-buttons-wrapper')
const experiencesTitle = document.getElementById('experiences-title')
const experiencesTimespan = document.getElementById('experiences-timespan')
const experiencesDescription = document.getElementById('experiences-description')
const experiencesSkills = document.getElementById('experiences-skills')

const changeExperienceDescription = (i) => {
    experiencesTitle.textContent = data[i].title
    experiencesTimespan.textContent = data[i].timespan

    experiencesDescription.replaceChildren()

    for(let j = 0; j < data[i].description.length; j++) {
        let li = document.createElement('li')
        li.appendChild(document.createTextNode(`${data[i].description[j]}`))

        experiencesDescription.appendChild(li)
    }

    experiencesSkills.replaceChildren()

    for(let j = 0; j < data[i].skills.length; j++) {
        let li = document.createElement('li')
        li.appendChild(document.createTextNode(`${data[i].skills[j]}`))

        experiencesSkills.appendChild(li)
    }
}

const writeExperiences = () => {
    changeExperienceDescription(0)

    for(let i = 0; i < data.length; i++) {
        // side menu
        let div = document.createElement('div')
        div.classList.add('js-scroll', 'fade-in-bottom')
        div.appendChild(document.createTextNode(`${data[i].buttonText}`))
        
        div.dataset.experiences = true

        experiencesButtonsWrapper.appendChild(div)
    }
}

writeExperiences()

// experiences animations

const experiencesList = document.querySelectorAll('[data-experiences]')
const experiencesSpan = document.getElementById('experiencesSpan')

const experiencesEffectWrapper = document.getElementById('experiences-effect-wrapper')

experiencesEffectWrapper.style.width = `${experiencesList[0].offsetWidth * data.length}px`

experiencesList[0].classList.add('active')
experiencesSpan.style.left = `0px`
experiencesSpan.style.top = `${experiencesList[0].offsetHeight}px`

experiencesList.forEach((element, i) => {
    element.addEventListener('click', () => {
        changeActiveExperiencesBtn(i)
    })
})

const changeActiveExperiencesBtn = (i) => {
    experiencesSpan.style.left = `${experiencesList[0].offsetWidth * i}px`

    experiencesList.forEach((element) => element.classList.remove('active'))
    changeExperienceDescription(i)

    experiencesList[i].classList.add('active')
}

window.addEventListener('resize', () => {
    experiencesSpan.style.left = `${experiencesList[0].offsetWidth}px`
})