// Preloader configuration
const PreloaderConfig = {
    totalVideos: 0,
    totalImages: 1345,

    imageBasePath: 'Assets/Frames/', 
    videoBasePath: 'Assets/Videos/',

    imagePrefix: "frame_", 
    videoPrefix: 'vid', 

    imageFileExtension: '.jpg',
    videoFileExtension: '.mp4',

    mainPreloaderSelector: '.preloader',

    progressBarSelector: '.progress',
    progressBarStyle: 'width',

    progressTextSelector: '.progress-text',

    videoList: [],
    imageList: [],

    videosLoaded: 0,
    imagesLoaded: 0,
};

function disableScroll() {
    // Get the current page scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // if any scroll is attempted, set this to the previous value
    window.onscroll = function() {
        window.scrollTo(scrollLeft, scrollTop);
    };
}

function enableScroll() {
    window.onscroll = function() {};
}

// Below are the output animations functions
// function updateProgressBar(element, style, progressValue) {
//     const progressBar = document.querySelector(element);
//     progressBar.style[style] = `${progressValue}%`;
// }

function updatePercentageText(element, progressValue) {
    const progressText = document.querySelector(element);
    progressText.textContent = `${Math.round(progressValue)}`;
}

// update the preloader UI
function updatePreloader() {
    const totalAssets = PreloaderConfig.totalVideos + PreloaderConfig.totalImages;
    const loadedAssets = PreloaderConfig.videosLoaded + PreloaderConfig.imagesLoaded;
    const progress = (loadedAssets / totalAssets) * 100;
    
    // updateProgressBar(PreloaderConfig.progressBarSelector, PreloaderConfig.progressBarStyle, progress);
    updatePercentageText(PreloaderConfig.progressTextSelector, progress);
    
    if (loadedAssets === totalAssets) {
        setTimeout(() => {
            const preloader = document.querySelector(PreloaderConfig.mainPreloaderSelector);
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                enableScroll();
            }, 500);
        }, 1000);
    }
}

function generateVideoUrl(index){
    if (!PreloaderConfig.videoBasePath.endsWith('/')) {
        console.warn(`Warning: videoBasePath should end with a '/'. Automatically adding it.`);
        PreloaderConfig.videoBasePath += '/';
    }

    if (!PreloaderConfig.videoFileExtension.startsWith('.')) {
        console.warn(`Warning: videoFileExtension should start with a '.'. Automatically adding it.`);
        PreloaderConfig.videoFileExtension = '.' + PreloaderConfig.videoFileExtension;
    }

    return `${PreloaderConfig.videoBasePath}${PreloaderConfig.videoPrefix}${index}${PreloaderConfig.videoFileExtension}`;
}

function generateImageUrl(index){
    if (!PreloaderConfig.imageBasePath.endsWith('/')) {
        console.warn(`Warning: imageBasePath should end with a '/'. Automatically adding it.`);
        PreloaderConfig.imageBasePath += '/';
    }
    
    if (!PreloaderConfig.imageFileExtension.startsWith('.')) {
        console.warn(`Warning: imageFileExtension should start with a '.'. Automatically adding it.`);
        PreloaderConfig.imageFileExtension = '.' + PreloaderConfig.imageFileExtension;
    }

    return `${PreloaderConfig.imageBasePath}${PreloaderConfig.imagePrefix}${index.toString().padStart(4, '0')}${PreloaderConfig.imageFileExtension}`;
}

function preloadVideos() {
    for (let i = 1; i <= PreloaderConfig.totalVideos; i++) {
        const videoUrl = generateVideoUrl(i);
        const video = document.createElement('video');
        video.src = videoUrl;
        video.preload = 'auto';
        PreloaderConfig.videoList.push(video);
        
        video.onloadeddata = () => {
            PreloaderConfig.videosLoaded++;
            updatePreloader();
            if (PreloaderConfig.videosLoaded === PreloaderConfig.totalVideos) {
                console.info("All videos loaded");
            }
        }
    }
}

function preloadImages() {
    for (let i = 1; i <= PreloaderConfig.totalImages; i++) {
        const imgUrl = generateImageUrl(i);
        console.log(imgUrl)
        const img = new Image();
        img.src = imgUrl;
        PreloaderConfig.imageList.push(img);

        img.onload = () => {
            PreloaderConfig.imagesLoaded++;
            updatePreloader();
            if (PreloaderConfig.imagesLoaded === PreloaderConfig.totalImages) {
                console.info("All images loaded");
            }
        }   
    }
}

// Start preloading and disable scroll
document.addEventListener('DOMContentLoaded', () => {
    disableScroll();
    preloadImages();
    preloadVideos();
});

