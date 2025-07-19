const imgsSrc= [
    'https://picsum.photos/id/261/200/300',
    'https://picsum.photos/id/674/200/300',
    'https://picsum.photos/id/123/200/300',
]

let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50;

const singleImgSize = 200

const body = document.getElementsByTagName('body')[0]

function createMainContainer(){
    const main = document.createElement('div')
    main.classList.toggle('main-container')

    const wrapper = document.createElement('div');
    wrapper.classList.add('slider-wrapper');
    main.appendChild(wrapper);

    body.appendChild(main)
    return wrapper
}

function createImgElement(src){
    const imgElement = document.createElement('img')
    imgElement.src = src
    return imgElement
}

function getNextPositionCreator(numberOfSlides) {
    let currentSlide = 0
    return function (directionForward = true) {
        if(directionForward){
            ++currentSlide
            if(currentSlide===numberOfSlides){
                currentSlide = 0
            }
        }else {
            --currentSlide
            if(currentSlide<0) {
                currentSlide = numberOfSlides-1
            }
        }
        return currentSlide
    }
}

let currentSlide = 0;

function goToSlide(index) {
    currentSlide = index;
    handleSlideChange(index);
}


let indicators = []

function indicate(numberOfSlides){
    const container = document.createElement('div')
    container.classList.add('indicators-container')

    for(let i = 0; i<numberOfSlides; i++) {
        const indicator = document.createElement("span")
        indicator.classList.add('indicator-dot')
        if (i === 0) {
            indicator.classList.add('active')
        }

        indicator.addEventListener('click', () => {
            goToSlide(i);
        });

        container.appendChild(indicator)
        indicators.push(indicator)
    }
    body.appendChild(container)
}


function updateIndicators(currentSlide) {
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide)
    })
}


function handleSlideChange(nextSlidePosition) {
    const firstImage = document.querySelector("img[src='https://picsum.photos/id/261/200/300']");
    firstImage.style['margin-left'] =  `${nextSlidePosition * -singleImgSize}px`
    updateIndicators(nextSlidePosition)
}


function createAndRenderImages (
    imgsSrc, container
) {
    const listOfImageElements = imgsSrc.map(createImgElement)
    listOfImageElements.forEach((imgElement)=>container.appendChild(imgElement))
}


function handleSwipeGesture() {
    const deltaX = touchEndX - touchStartX;

    if (Math.abs(deltaX) > swipeThreshold) {
        if (deltaX < 0) {
            const slide = getNextSlide();
            handleSlideChange(slide);
        } else {
            const slide = getNextSlide(false);
            handleSlideChange(slide);
        }
    }
}

function createCarouselButtons(getNextSlide) {
    const leftButton = document.createElement('button')
    const rightButton = document.createElement('button')
    leftButton.innerText = 'Previous'
    rightButton.innerText = 'Next'

    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowLeft") {
            const slide = getNextSlide(false)
            handleSlideChange(slide)
            console.log("left slide(Arrow pressed)")
        }
    });

    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowRight") {
            const slide = getNextSlide()
            handleSlideChange(slide)
            console.log("right slide(Arrow pressed)")
        }
    });

    rightButton.addEventListener('click', () => {
        const slide = getNextSlide()
        handleSlideChange(slide)
    })

    leftButton.addEventListener('click', () => {
        const slide = getNextSlide(false)
        handleSlideChange(slide)
    })




    body.appendChild(leftButton)
    body.appendChild(rightButton)

}

function createPauseButton() {
    const pauseButton = document.createElement('button')
    pauseButton.innerText = 'Pause'
    body.appendChild(pauseButton)
    pauseButton.style.background = 'green'
    pauseButton.addEventListener('click', () => {
        pauseButton.innerText = pauseButton.innerText === 'Pause' ? 'Play' : 'Pause'
        if (pauseButton.innerText === 'Pause') {
            pauseButton.style.background = 'green'
        } else {
            pauseButton.style.background = 'red'
        }
    })
    return pauseButton
}



        /* const pauseButton = document.getElementById('pause-button');
       const isPaused = pauseButton.classList.contains('pause');

     if (!isPaused) {
           pauseButton.innerText = 'Pause'
           pauseButton.style.background = 'green'
           console.log('Iнтервал виконуэться');
           const slide = getNextSlide()
           handleSlideChange(slide)
       } else {
           console.log('Iнтервал не виконуэться');
           pauseButton.innerText = 'Paused'
           pauseButton.style.background = 'red'
       }  */






const main = createMainContainer();

createAndRenderImages(imgsSrc, main)

const getNextSlide = getNextPositionCreator(imgsSrc.length)

createCarouselButtons(getNextSlide)

indicate(imgsSrc.length)

const pauseButton = createPauseButton()

setInterval(() => {

    if(pauseButton.innerText === 'Pause') {
        const slide = getNextSlide();
        handleSlideChange(slide)
    }
}, 3000);






