const image = document.querySelectorAll('img')
const imageFullview = document.querySelectorAll('.fullview')
const closeFullview = document.querySelectorAll('.close')
const cardContainer = document.getElementById('card__container')
const searchBar = document.getElementById('input')
let result = document.createElement('p')
let state = false

fetch('image.json').then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    else return response.json()
}).then(data => {
    return content(data)
}).catch(err => console.log(`There is a problem with your fetch operation: ${err.message}`))

function content(json) {
    json.forEach(element => {
        let title = element.title
        let url = element.url
        let location = element.location

        let cardItem = document.createElement('div')
        let overlay = document.createElement('div')
        let cardInfo = document.createElement('div')
        let urlSrc = document.createElement('img')
        let name = document.createElement('h2')
        let locationInfo = document.createElement('p')

        overlay.classList.add('overlay')
        cardItem.classList.add('card__item')
        cardInfo.classList.add('card__info')

        name.textContent = title
        name.classList.add('info__name')

        locationInfo.textContent = location
        locationInfo.classList.add('location')

        urlSrc.src = url

        cardInfo.appendChild(name)
        cardInfo.appendChild(locationInfo)

        cardItem.appendChild(overlay)
        cardItem.appendChild(cardInfo)
        cardItem.appendChild(urlSrc)

        cardItem.tabIndex = 'true'

        cardContainer.appendChild(cardItem)

        cardItem.addEventListener('click', function () {
            document.getElementById('preview').src = url
            document.getElementById('image__name').innerHTML = title
            document.getElementById('image__location').innerHTML = location
            setTimeout(function () {
                imageFullview[0].style.display = 'block'
            }, 0)
            imageFullview[0].animate(
                [
                    { opacity: 0 },
                    { opacity: 1 }
                ], {
                fill: 'forwards',
                easing: 'ease-in',
                duration: 400
            });
        })
        function filter() {
            setTimeout(function () {
                let inputLowercase = searchBar.value.toLowerCase()
                let locationLowercase = location.toLowerCase()
                let nameLowercase = title.toLowerCase()

                cardItem.style.display = 'none'

                if (searchBar.value.length > 0) {
                    cardItem.style.display = 'block'
                    state = true

                    result.classList.add('result')
                    result.textContent = `Search result for "${searchBar.value}"`

                    document.querySelector('.input__field').insertBefore(result, document.querySelector('.input__field').childNodes[0])
                    document.querySelectorAll('.clear')[0].style.display = 'block'
                }
                if (searchBar.value.length < 1) {
                    console.log('yassssssssssss');
                    document.querySelectorAll('.clear')[0].style.display = 'none'
                    cardItem.style.display = 'block'
                    result.textContent = ``
                }
                if (state) {
                    if (locationLowercase.match(inputLowercase) || (nameLowercase.match(inputLowercase))) {
                        cardItem.style.display = 'block'
                        document.querySelectorAll('.clear')[0].style.display = 'block'
                    } else {
                        cardItem.style.display = 'none'
                        // result.textContent = `No result for "${searchBar.value}"`
                        document.querySelectorAll('.clear')[0].style.display = 'block'
                    }
                }
            }, 800)
        }
        searchBar.addEventListener('input', filter)
        document.querySelectorAll('.clear')[0].addEventListener('click', function () {
            if (searchBar.value !== '') {
                searchBar.value = ''
                result.textContent = ''
                document.querySelectorAll('.clear')[0].style.display = 'none'
                cardItem.style.display = 'block'
            }
            else {
                document.querySelectorAll('.clear')[0].style.display = 'none'
                cardItem.style.display = 'block'
            }
        })

    });
}
closeFullview[0].addEventListener('click', function () {
    imageFullview[0].animate(
        [
            { opacity: 1 },
            { opacity: 0 },
        ], {
        fill: 'forwards',
        easing: 'ease-in',
        duration: 400
    });
    setTimeout(function () {
        imageFullview[0].style.display = 'none'
    }, 800)
})

