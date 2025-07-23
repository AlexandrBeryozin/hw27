const config = {
    imgsSrc2: [


    'https://picsum.photos/id/260/200/300',
    'https://picsum.photos/id/675/200/300',
    'https://picsum.photos/id/122/200/300',
],
    imgSize : 200,
    autoSwiperTimeout : 2000
}


class Slider{
    constructor(imgsSrc2List, targetContainer, imgSize){
        this.imgsSrc2List = imgsSrc2List
        this.numberOfSlides1 = imgsSrc2List.length
        this.targetContainer = targetContainer
        this.imgSize = imgSize
        this.currentSlide = 0
    }

    createMainContainer(){
    const main = document.createElement('div')
    main.classList.toggle('main-container')
        this.targetContainer.appendChild(main)
        this.sliderContainer = main
    }


    createImgElement(src){
        const imgElement = document.createElement('img')
        imgElement.src = src
        return imgElement
    }

    createAndRenderImages () {
        const listOfImageElements = this.imgsSrc2List.map(createImgElement)
        listOfImageElements.forEach((imgElement)=>this.sliderContainer.appendChild(imgElement))
    }

        SetNextSlide(directionForward = true) {
            if(directionForward){
                ++this.currentSlide
                if(currentSlide===this.numberOfSlides1){
                    this.currentSlide = 0
                }
            }else {
                --this.currentSlide
                if(this.currentSlide<0) {
                    this.currentSlide = this.numberOfSlides1-1
                }
            }
        }


    indicate(){
        const container = document.createElement('div')
        container.classList.add('indicators-container')
        for(let i = 0; i<this.numberOfSlides1; i++) {
            let indicator = document.createElement("span")
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
        this.targetContainer.appendChild(container)
    }


    updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide)
        })
    }


    handleSlideChange() {
        const firstImage = document.querySelector("img[src='${this.imgsSrc2List[0]}']");
        firstImage.style['margin-left'] =  `${this.currentSlide * -singleImgSize}px`
        updateIndicators(this.currentSlide)
    }

    createCarouselButtons() {
        const leftButton = document.createElement('button')
        const rightButton = document.createElement('button')
        leftButton.innerText = 'Previous'
        rightButton.innerText = 'Next'



        rightButton.addEventListener('click', () => {
            const slide = getNextSlide()
            handleSlideChange(slide)
        })

        leftButton.addEventListener('click', () => {
            const slide = getNextSlide(false)
            handleSlideChange(slide)
        })

      /*  addEventListener("keydown", function(event) {
            if (event.key === "ArrowLeft") {
                const slide = getNextSlide(false)
                handleSlideChange(slide)
                console.log("left slide(Arrow pressed)")
            }
        });

        addEventListener("keydown", function(event) {
            if (event.key === "ArrowRight") {
                const slide = getNextSlide()
                handleSlideChange(slide)
                console.log("right slide(Arrow pressed)")
            }
        }); */


        this.targetContainer.appendChild(leftButton)
        this.targetContainer.appendChild(rightButton)

    }

    createPauseButton() {
        const pauseButton = document.createElement('button')
        pauseButton.innerText = 'Pause'
        this.targetContainer.appendChild(pauseButton)
        pauseButton.addEventListener('click', () => {
            pauseButton.innerText = pauseButton.innerText === 'Pause' ? 'Play' : 'Pause'
            if (pauseButton.innerText === 'Pause') {
                pauseButton.style.background = 'green'
            } else {
                pauseButton.style.background = 'red'
            }
        })
    }


    initSlider(){
        this.createMainContainer()
        this.createAndRenderImages()
        this.createCarouselButtons()
        this.createImgElement()
        this.handleSlideChange()
        this.SetNextSlide()
        this.updateIndicators()
        this.indicate()
        this.createPauseButton()
}





}

const body1 = document.getElementsByTagName('body')[0]
new Slider(config.imgsSrc2, body1,config.imgSize).initSlider()