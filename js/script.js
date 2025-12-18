console.log("Hello world!");

const myName = "Jonas Schmedtmann";
const h1 = document.querySelector(".heading-primary");
console.log(myName);
console.log(h1);

// h1.addEventListener("click", function () {
//   h1.textContent = myName;
//   h1.style.backgroundColor = "red";
//   h1.style.padding = "5rem";
// });

///////////////////////////////////////////////////////////
// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
if (yearEl) yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

if (btnNavEl && headerEl) {
  btnNavEl.addEventListener("click", function () {
    headerEl.classList.toggle("nav-open");
  });
}

///////////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");

    // If it's a hash link (internal anchor), intercept and smooth-scroll
    if (href === "#" || (href && href.startsWith("#"))) {
      e.preventDefault();

      // Scroll back to top
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      // Scroll to anchor
      if (href !== "#" && href.startsWith("#")) {
        const sectionEl = document.querySelector(href);
        if (sectionEl) sectionEl.scrollIntoView({ behavior: "smooth" });
      }

      // Close mobile navigation after clicking a hash link
      if (link.classList.contains("main-nav-link"))
        headerEl.classList.remove("nav-open");

      return;
    }

    // For regular links (e.g. blog.html or external), allow normal navigation.
    // But close mobile nav if it was open.
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.remove("nav-open");
    // do not call preventDefault() so the browser will follow the link
  });
});

///////////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

if (sectionHeroEl) {
  const obs = new IntersectionObserver(
    function (entries) {
      const ent = entries[0];

      if (ent.isIntersecting === false) {
        document.body.classList.add("sticky");
      }

      if (ent.isIntersecting === true) {
        document.body.classList.remove("sticky");
      }
    },
    {
      // In the viewport
      root: null,
      threshold: 0,
      rootMargin: "-80px",
    }
  );
  obs.observe(sectionHeroEl);
} else {
  // If no hero section exists (e.g., blog page), make header sticky immediately
  document.body.classList.add("sticky");
}

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

///////////////////////////////////////////////////////////
// Pricing card flip functionality

const pricingCards = document.querySelectorAll(".pricing-card");

pricingCards.forEach((card) => {
  const toggleButtons = card.querySelectorAll(".plan-toggle-clickable");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      card.classList.toggle("flipped");
    });
  });
});

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

///////////////////////////////////////////////////////////
// Carousel functionality

const carouselSlides = document.querySelectorAll(".carousel-slide");
const carouselDots = document.querySelectorAll(".carousel-dot");
const prevBtn = document.querySelector(".carousel-btn--prev");
const nextBtn = document.querySelector(".carousel-btn--next");
const carouselWrapper = document.querySelector(".carousel-wrapper");

console.log("Carousel elements found:", {
  slides: carouselSlides.length,
  dots: carouselDots.length,
  prevBtn: !!prevBtn,
  nextBtn: !!nextBtn,
  wrapper: !!carouselWrapper,
});

if (carouselSlides.length > 0 && prevBtn && nextBtn && carouselWrapper) {
  let currentSlide = 0;
  console.log("Carousel initialized!");

  function showSlide(n) {
    // Remove active class from all slides and dots
    carouselSlides.forEach((slide) => slide.classList.remove("active"));
    carouselDots.forEach((dot) => dot.classList.remove("active"));

    // Set active class to current slide and dot
    carouselSlides[n].classList.add("active");
    carouselDots[n].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % carouselSlides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide =
      (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
    showSlide(currentSlide);
  }

  // Event listeners for navigation buttons
  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  // Event listeners for dot indicators
  carouselDots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Optional: Auto-advance carousel every 6 seconds
  let carouselInterval = setInterval(nextSlide, 6000);

  // Pause auto-advance on hover
  carouselWrapper.addEventListener("mouseenter", function () {
    clearInterval(carouselInterval);
  });

  // Resume auto-advance when mouse leaves
  carouselWrapper.addEventListener("mouseleave", function () {
    carouselInterval = setInterval(nextSlide, 6000);
  });
}

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/
