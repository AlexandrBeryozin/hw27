const config = {
    imgsSrc: [


    'https://picsum.photos/id/260/200/300',
    'https://picsum.photos/id/675/200/300',
    'https://picsum.photos/id/122/200/300',
],
    imgSize : 200,
    autoSwiperTimeout : 2000
}


class Slider{
    constructor(imgsSrcList, targetContainer, imgSize, autoSwiperTimeout){
        this.imgsSrcList = imgsSrcList
        this.numberOfSlides = imgsSrcList.length
        this.targetContainer = targetContainer
        this.imgSize = imgSize
        this.currentSlide = 0
        this.autoSwiperTimeout = autoSwiperTimeout
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
        const listOfImageElements = this.imgsSrcList.map(this.createImgElement)
        listOfImageElements.forEach((imgElement)=>this.sliderContainer.appendChild(imgElement))
    }

        getNextSlide(directionForward = true) {
            if(directionForward){
                ++this.currentSlide
                if(this.currentSlide===this.numberOfSlides){
                    this.currentSlide = 0
                }
            }else {
                --this.currentSlide
                if(this.currentSlide<0) {
                    this.currentSlide = this.numberOfSlides-1
                }
            }
        }


    indicate(){
        const container = document.createElement('div')
        container.classList.toggle('indicators-container')
        for(let i = 0; i<this.numberOfSlides; i++) {
            let indicator = document.createElement("span")
            indicator.classList.toggle('indicator-dot')
            if (i === 0) {
                indicator.classList.toggle('active')
            }

            container.appendChild(indicator)
        }
        this.targetContainer.appendChild(container)
    }


 /*   updateIndicators() {
            indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide)
        })
    } */


    handleSlideChange() {
        const firstImage = document.querySelector(`img[src='${this.imgsSrcList[0]}']`);
        firstImage.style['margin-left'] =  `${this.currentSlide * -this.imgSize}px`
        const currentIndicator = document.getElementsByClassName('active')[0]
        currentIndicator.classList.toggle('active')


         const indicators = document.getElementsByClassName('indicator-dot')
        indicators[this.currentSlide].classList.toggle('active')
    }

    createCarouselButtons() {
        const leftButton = document.createElement('button')
        const rightButton = document.createElement('button')
        leftButton.innerText = 'Previous'
        rightButton.innerText = 'Next'



        rightButton.addEventListener('click', () => {
            this.getNextSlide()
            this.handleSlideChange()
        })

        leftButton.addEventListener('click', () => {
            this.getNextSlide(false)
            this.handleSlideChange()
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
        this.pauseButton = document.createElement('button')
        this.pauseButton.innerText = 'Pause'
        this.pauseButton.style.background = 'green'
        this.targetContainer.appendChild(this.pauseButton)
        this.pauseButton.addEventListener('click', () => {
            this.pauseButton.innerText = this.pauseButton.innerText === 'Pause' ? 'Play' : 'Pause'
            if (this.pauseButton.innerText === 'Pause') {
                this.pauseButton.style.background = 'green'
            } else {
                this.pauseButton.style.background = 'red'
            }
        })
    }


    nextSlide() {

        if (this.pauseButton.innerText === 'Pause') {
            this.currentSlide = (this.currentSlide + 1) % this.numberOfSlides;
            this.handleSlideChange()
        }
    }





    initSlider(){
        this.createMainContainer()
        this.createAndRenderImages()
        this.createCarouselButtons()
        this.indicate()
        this.createPauseButton()

        setInterval(() => {
            this.nextSlide();
        }, this.autoSwiperTimeout)
}





}

const body = document.getElementsByTagName('body')[0]
new Slider(config.imgsSrc, body,config.imgSize, config.autoSwiperTimeout).initSlider()