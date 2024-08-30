const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const frames = {
    currentIndex: 0,
    maxIndex: 1345,
}
let imageLoaded = 0;
let images = [];
function preloadImage() {
    for (var i = 1; i <= frames.maxIndex; i++) {
        const imgUrl = `./Assets/Frames/frame_${i.toString().padStart(4, "0")}.jpg`
        let img = new Image()
        img.src = imgUrl
        img.onload = function () {
            imageLoaded++;
            if (imageLoaded === frames.maxIndex) {
                loadImage(frames.currentIndex)
                startAnimation()

            }
        }
        images.push(img)

    }

}
function loadImage(index) {
    if (index >= 0 && index <= frames.maxIndex) {
        const img = images[index]

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const scaleX = canvas.width / img.width
        const scaleY = canvas.height / img.height
        const scale = Math.max(scaleX, scaleY)

        const newWidth = img.width * scale
        const newHeight = img.height * scale

        const offsetX = (canvas.width - newWidth) / 2
        const offsetY = (canvas.height - newHeight) / 2

        context.clearRect(0, 0, canvas.width, canvas.height)
        context.imageSmoothingEnabled = "true"
        context.imageSmoothingQuality = "high"
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight)

        frames.currentIndex = index;
    }

}

function startAnimation() {
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#parent",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
            // markers:true,
        }
    })
    function updateFrames(index) {
        return {
            currentIndex: index - 1,
            ease:"linear",
            onUpdate: function () {
                loadImage(Math.floor(frames.currentIndex))
            }
        }
    }
    tl
    .to(frames, updateFrames(200),'first')
    .to('#text1', {opacity: 0,ease:'linear'},'first')

    .to(frames, updateFrames(400),"second")
    .to('#text2', {opacity: 1,ease:"linear"},"second")

    .to(frames,updateFrames(500),"third")
    .to("#text2",{opacity:0,ease:"linear"},"third")

    .to(frames,updateFrames(600),"fourth")
    .to("#text3",{opacity:1,ease:"linear"},"fourth")

    .to(frames,updateFrames(700),"fifth")
    .to("#text3",{opacity:0,ease:"linear"},"fifth")

    .to(frames,updateFrames(900),"sixth")
    .to("#text4",{transform:"translateX(0%)",opacity:1,ease:"expo"},"sixth")

    .to(frames,updateFrames(1000),"seventh")
    .to("#text4",{opacity:0,},"seventh")

    .to(frames,updateFrames(1100),"eighth")
    .to("canvas",{scale:0.5,ease:"linear"},"eighth")

    .to(frames,updateFrames(1150),"ninth")
    .to("#panelism",{opacity:1},"ninth")

    .to(frames,updateFrames(1200),"ninth")
    .to("#line",{width:"20%",ease:"linear"},"ninth")

    .to(frames,updateFrames(1300),"tenth")
    .to("canvas",{scale:1},"tenth")

    .to(frames,updateFrames(1325),"eleventh")
    .to("#panelism",{scale:1.5},"eleventh")

    .to(frames,updateFrames(1345),"twelve")
    .to("#panelism",{top:"90%"},"twelve")

}

window.addEventListener("resize", function () {
    loadImage(Math.floor(frames.currentIndex))
})
preloadImage()
