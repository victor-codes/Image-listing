const image = document.querySelectorAll('img')
const overlay = document.querySelectorAll('.overlay')
const imageFullview = document.querySelectorAll('.fullview')
const closeFullview = document.querySelectorAll('.close')
const cardContainer = document.getElementById('card__container')
let tracState = false
// image.forEach(element => {
//     overlay.forEach(elementOver => {
//         elementOver.style.height = element.height + 'px'
//     });
//     console.log(element.height);
//     // console.log(elementOver.height);
// });
// function fullView() {
//      document.querySelectorAll('.card__item')[0].addEventListener('click', function () {
//         setTimeout(function () {
//             imageFullview[0].style.display = 'block'
//         }, 0)
//         imageFullview[0].animate(
//             [
//                 { opacity: 0 },
//                 { opacity: 1 }
//             ], {
//             fill: 'forwards',
//             easing: 'ease-in',
//             duration: 400
//         });
//     })
// }
// // fullView()
// closeFullview[0].addEventListener('click', function () {
//     imageFullview[0].animate(
//         [
//             { opacity: 1 },
//             { opacity: 0 },
//         ], {
//         fill: 'forwards',
//         easing: 'ease-in',
//         duration: 400
//     });
//     setTimeout(function () {
//         imageFullview[0].style.display = 'none'
//     }, 800)
// })
// overlay.forEach(element => {

//     element.addEventListener('click', function () {
//         setTimeout(function () {
//             imageFullview[0].style.display = 'block'
//         }, 0)
//         imageFullview[0].animate(
//             [
//                 { opacity: 0 },
//                 { opacity: 1 }
//             ], {
//             fill: 'forwards',
//             easing: 'ease-in',
//             duration: 400
//         });
//     })
// });

fetch('image.json').then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    else return response.json()
}).then(myJson => {
    return content(myJson)
}).catch(err => console.log(`There is a problem with your fetch operation: ${err.message}`))
function content(json) {
    tracState = true
    json.forEach(element => {
        let title = element.title
        let url = element.url
        let location = element.location
        // console.log(title,url,location)
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

        cardContainer.appendChild(cardItem)
    });
}

// function fullView() {
//     document.querySelectorAll('.card__item')[0].addEventListener('click', function () {
//        setTimeout(function () {
//            imageFullview[0].style.display = 'block'
//        }, 0)
//        imageFullview[0].animate(
//            [
//                { opacity: 0 },
//                { opacity: 1 }
//            ], {
//            fill: 'forwards',
//            easing: 'ease-in',
//            duration: 400
//        });
//    })
// }
// fullView()

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
function test() {
    if (tracState) {
        overlay.forEach(element => {
            console.log('nice')
            element.addEventListener('click', function () {
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
        });
    } else {
        console.log('abominatio')
    }
}
setInterval(test, 1000)
setInterval(() => {
    console.log(cardContainer.length)
}, 1000);