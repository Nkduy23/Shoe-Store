document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");
    const images = document.querySelectorAll(".slider__image");
    const prevBtn = document.querySelector(".slider__prev");
    const nextBtn = document.querySelector(".slider__next");
  
    let currentIndex = 0;
    const totalSlides = images.length - 1;
  
    let startX = 0, endX = 0;
    const AUTO_PLAY_INTERVAL = 3000;
  
    function updateImageSource() {
      const isSmallScreen = window.innerWidth <= 700;
      images.forEach((image) => {
        const newSrc = isSmallScreen ? image.dataset.small : image.dataset.large;
        if (image.src !== newSrc) image.src = newSrc;
      });
    }

    function updateSlide(isInstant = false) {
      slider.style.transition = isInstant ? "none" : "transform 0.5s ease-in-out";
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  
    function goToNextSlide() {
      if (currentIndex >= totalSlides) {
        currentIndex++;
        updateSlide();
        setTimeout(() => {
          currentIndex = 0;
          updateSlide(true); // Tắt hiệu ứng chuyển về slide 0
        }, 50);
      } else {
        currentIndex++;
        updateSlide();
      }
    }
  

    function goToPrevSlide() {
      if (currentIndex <= 0) {
        currentIndex = totalSlides;
        updateSlide(true);
      } else {
        currentIndex--;
        updateSlide();
      }
    }
  
    // ==== Xử lý vuốt ====
    function handleSwipe() {
      const swipeDistance = startX - endX;
      if (swipeDistance > 50) goToNextSlide();
      else if (swipeDistance < -50) goToPrevSlide();
    }
  
    function startTouch(e) {
      startX = e.touches ? e.touches[0].clientX : e.clientX;
    }
  
    function endTouch(e) {
      endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      handleSwipe();
    }
  
    // ==== Thêm sự kiện vuốt ====
    function initSwipeEvents() {
      slider.addEventListener("touchstart", startTouch);
      slider.addEventListener("touchend", endTouch);
  
      slider.addEventListener("mousedown", (e) => {
        startTouch(e);
        slider.addEventListener("mousemove", mouseMoveHandler);
        slider.addEventListener("mouseup", mouseUpHandler);
      });
  
      function mouseMoveHandler(e) {
        endX = e.clientX;
      }
  
      function mouseUpHandler(e) {
        slider.removeEventListener("mousemove", mouseMoveHandler);
        slider.removeEventListener("mouseup", mouseUpHandler);
        endTouch(e);
      }
    }
  
    // ==== Tự động chạy slider ====
    function autoPlaySlider() {
      goToNextSlide();
    }
  
    // ==== Khởi tạo slider ====
    function initSlider() {
      updateImageSource();
      initSwipeEvents();
      window.addEventListener("resize", updateImageSource);
      prevBtn.addEventListener("click", goToPrevSlide);
      nextBtn.addEventListener("click", goToNextSlide);
    }
  
    // ==== Chạy slider ====
    let autoPlay = setInterval(autoPlaySlider, AUTO_PLAY_INTERVAL);
    initSlider();
  });
  