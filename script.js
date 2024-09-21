const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const frames = {
    currentIndex: 0,
    maxIndex: 1345,
}
let imageLoaded = 0;
let images = [];
function preloadCanvasImage() {
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
            ease: "linear",
            onUpdate: function () {
                loadImage(Math.floor(frames.currentIndex))
            }
        }
    }
    tl
        .to(frames, updateFrames(200), 'first')
        .to('#text1', { opacity: 0, ease: 'linear' }, 'first')

        .to(frames, updateFrames(400), "second")
        .to('#text2', { opacity: 1, ease: "linear" }, "second")

        .to(frames, updateFrames(500), "third")
        .to("#text2", { opacity: 0, ease: "linear" }, "third")

        .to(frames, updateFrames(600), "fourth")
        .to("#text3", { opacity: 1, ease: "linear" }, "fourth")

        .to(frames, updateFrames(700), "fifth")
        .to("#text3", { opacity: 0, ease: "linear" }, "fifth")

        .to(frames, updateFrames(900), "sixth")
        .to("#text4", { transform: "translateX(0%)", opacity: 1, ease: "expo" }, "sixth")

        .to(frames, updateFrames(1000), "seventh")
        .to("#text4", { opacity: 0, }, "seventh")

        .to(frames, updateFrames(1100), "eighth")
        .to("canvas", { scale: 0.5, ease: "linear" }, "eighth")

        .to(frames, updateFrames(1150), "ninth")
        .to("#panelism", { opacity: 1 }, "ninth")

        .to(frames, updateFrames(1200), "ninth")
        .to("#line", { width: "20%", ease: "linear" }, "ninth")

        .to(frames, updateFrames(1300), "tenth")
        .to("canvas", { scale: 1 }, "tenth")

        .to(frames, updateFrames(1325), "eleventh")
        .to("#panelism", { scale: 1.5 }, "eleventh")

        .to(frames, updateFrames(1345), "twelve")
        .to("#panelism", { top: "90%" }, "twelve")

}

window.addEventListener("resize", function () {
    loadImage(Math.floor(frames.currentIndex))
})
preloadCanvasImage()


function showDayTime() {
    const dayElement = document.querySelector("#day");
    const timeElement = document.querySelector("#time");

    let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    function updateDay() {
        const date = new Date();
        const currentDay = `${weekday[date.getDay()].slice(0, 3).toUpperCase()}:`;
        if (dayElement.innerHTML !== currentDay) {
            dayElement.innerHTML = currentDay;
        }
    }

    function updateTime() {
        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const currentTime = `${hour}:${minute < 10 ? '0' : ''}${minute}`;
        timeElement.innerHTML = currentTime;

        // For updating time requesAnimationFrame is used here!(it runs the fucntion when we are on the page or in the tab or either the function will be paused)
        requestAnimationFrame(updateTime);
    }

    // Start updating time smoothly
    requestAnimationFrame(updateTime);

    // Update day every minute
    setInterval(updateDay, 60000);

    // Initial updates
    updateDay();
}
showDayTime()
function navBarAnimation() {
    gsap.to("nav .navItems", {
        transform: "translateY(-10%)",
        opacity: 0,
        scrollTrigger: {
            trigger: "nav", // Adjust the trigger to the parent element
            start: "top-=10% top",
            end: "bottom 30px",
            // markers: true,
            scrub: 1, // Makes the animation smooth as you scroll
        }
    });
    gsap.from("nav .navItems", {
        scrollTrigger: {
            trigger: "#ourProjects",
            // markers:true,
            start: "top top",
            end: "100px 60px",
            scrub: true,
        },
        transform: "translateY(-20%)",
        opacity: 0,
    })
    gsap.to("nav  .navSubheading", {
        scrollTrigger: {
            trigger: "#ourProjects",
            // markers:true,
            start: "top-=10% top",
            end: "100px 60px",
            scrub: 1,
        },
        transform: "translateY(-20%)",
        opacity: 0,
    })
}
navBarAnimation()
if (window.matchMedia("(max-width: 768px)").matches) {
    function navBarAnimation() {
        gsap.to("nav ", {
            transform: "translateY(-10%)",
            opacity: 0,
            scrollTrigger: {
                trigger: "nav", // Adjust the trigger to the parent element
                start: "top top",
                end: "bottom 30px",
                // markers: true,
                scrub: 1, // Makes the animation smooth as you scroll
            }
        });
        gsap.from("nav", {
            scrollTrigger: {
                trigger: "#ourProjects",
                // markers:true,
                start: "top top",
                end: "100px 60px",
                scrub: true,
            },
            transform: "translateY(-20%)",
            opacity: 0,
        })
        gsap.to("nav  .navSubheading", {
            scrollTrigger: {
                trigger: "#ourProjects",
                // markers:true,
                start: "top-=10% top",
                end: "100px 60px",
                scrub: 1,
            },
            transform: "translateY(-20%)",
            opacity: 0,
        })
    }
    navBarAnimation()
}

function ourProjectAnimation() {
    document.querySelectorAll("#headings h1")
        .forEach(function (element) {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    // markers: true,
                    start: "top 90%",
                    end: "bottom 20%",
                    scrub: 1,
                },
                opacity: 0.3,
            });
        })
}
ourProjectAnimation()

document.documentElement.style.cursor = 'none';

if (window.matchMedia("(min-width: 768px)").matches) {
    function cursorAnimation() {
        let cursor = document.querySelector("#cursor")
        let cursorScale = document.querySelectorAll(".cursorScale")
        document.addEventListener("mousemove", function (dets) {
            gsap.to(cursor, {
                x: dets.x,
                y: dets.y,
                ease: "expo.out",
            })
        })
        cursorScale.forEach(function (element) {
            element.addEventListener("mousemove", function () {
                // Check if the element is visible (opacity > 0)
                if (element.style.opacity > 0) {
                    gsap.to(cursor, {
                        scale: 1.7,
                    });
                }
                else if (window.getComputedStyle(element).opacity === 0) {
                    gsap.to(cursor, {
                        scale: 1,
                    });
                }
            });
            element.addEventListener("mouseleave", function () {
                gsap.to(cursor, {
                    scale: 1,
                });
            });
        });

    }
    cursorAnimation()

}

function footerAnimation() {
    let Yvalue
    if (window.innerWidth > 768) {
        Yvalue = "-140%"
    }
    else if (window.innerWidth <= 450) {
        Yvalue = "-500%"
    }

    gsap.to("#ourProjects", {
        scrollTrigger: {
            trigger: "#footer",
            start: window.innerWidth <= 450 ? "top top" : "top-=90% top",
            end: window.innerWidth <= 450 ? "bottom bottom-=50%" : "bottom bottom-=70%",
            scrub: 1,
            pin: true,
            pinSpacing: false,
            // markers:true,
        },
        y: Yvalue,
        ease: "none"
    })
}
footerAnimation()
