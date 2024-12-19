function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('website-content'); // Updated to match HTML ID
  
    // Fade out the loading screen
    loadingScreen.style.opacity = '0';
  
    // Wait for the fade-out transition, then hide the loading screen and show the main content
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      mainContent.style.opacity = '1';
    }, 500); // 500ms matches the transition duration in CSS
}
  
// Wait for 3 seconds before hiding the loading screen
setTimeout(hideLoadingScreen, 2500);


document.addEventListener('DOMContentLoaded', () => {
  const teamPictures = document.querySelectorAll('.team-pictures-grid .picture-item img');
  
  teamPictures.forEach(img => {
    img.addEventListener('click', () => {
      // Create overlay
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
      overlay.style.zIndex = '1000';
      overlay.style.display = 'flex';
      overlay.style.justifyContent = 'center';
      overlay.style.alignItems = 'center';
      
      // Create enlarged image
      const enlargedImg = img.cloneNode(true);
      enlargedImg.style.maxWidth = '90%';
      enlargedImg.style.maxHeight = '90%';
      enlargedImg.style.objectFit = 'contain';
      
      // Close on click
      overlay.addEventListener('click', () => {
        document.body.removeChild(overlay);
      });
      
      overlay.appendChild(enlargedImg);
      document.body.appendChild(overlay);
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const filmstripContainers = document.querySelectorAll('.filmstrip-container');

  // Function to calculate the total width of the filmstrip
  function getFilmstripWidth(filmstrip) {
    const images = filmstrip.querySelectorAll('img');
    let totalWidth = 0;
    images.forEach(img => {
      totalWidth += img.offsetWidth + parseInt(getComputedStyle(img).marginRight);
    });
    return totalWidth;
  }

  // Function to create and position the clone
  function createClone(filmstrip, container) {
    const clone = filmstrip.cloneNode(true);
    clone.classList.add('filmstrip-clone');
    container.appendChild(clone);
    return clone;
  }

  // Function to set up leftward scroll
  function setupLeftScroll(filmstrip, container) {
    const stripWidth = getFilmstripWidth(filmstrip);

    // Create a clone for the filmstrip
    const clone = createClone(filmstrip, container);

    // Position the strips: original at 0, clone starts right after the original
    filmstrip.style.left = '0';
    clone.style.left = `${stripWidth}px`;

    // Keyframes for leftward scrolling
    const keyframes = [
      { transform: 'translateX(0)' },
      { transform: `translateX(-${stripWidth}px)` }
    ];

    // Start animations for both filmstrip and clone
    filmstrip.animate(keyframes, {
      duration: 20000,
      iterations: Infinity,
      easing: 'linear'
    });

    clone.animate(keyframes, {
      duration: 20000,
      iterations: Infinity,
      easing: 'linear'
    });
  }

  // Function to set up rightward scroll
  function setupRightScroll(filmstrip, container) {
    const stripWidth = getFilmstripWidth(filmstrip);

    // Create a clone for the filmstrip
    const clone = createClone(filmstrip, container);

    // Position the strips: original at 0, clone starts at -stripWidth so it comes in from the left
    filmstrip.style.left = '0';
    clone.style.left = `-${stripWidth}px`;

    // Keyframes for rightward scrolling
    const keyframes = [
      { transform: 'translateX(0)' },
      { transform: `translateX(${stripWidth}px)` }
    ];

    // Start animations for both filmstrip and clone
    filmstrip.animate(keyframes, {
      duration: 20000,
      iterations: Infinity,
      easing: 'linear'
    });

    clone.animate(keyframes, {
      duration: 20000,
      iterations: Infinity,
      easing: 'linear'
    });
  }

  // Initialize infinite scroll for all filmstrip containers
  filmstripContainers.forEach(container => {
    const filmstrip = container.querySelector('.left-filmstrip, .right-filmstrip');
    if (!filmstrip) return;

    // Determine the direction based on class
    const direction = filmstrip.classList.contains('left-filmstrip') ? 'left' : 'right';

    // Wait for all images in this filmstrip to load
    const images = filmstrip.querySelectorAll('img');
    let loadedImages = 0;

    images.forEach(img => {
      if (img.complete) {
        loadedImages++;
        if (loadedImages === images.length) {
          if (direction === 'left') {
            setupLeftScroll(filmstrip, container);
          } else {
            setupRightScroll(filmstrip, container);
          }
        }
      } else {
        img.addEventListener('load', () => {
          loadedImages++;
          if (loadedImages === images.length) {
            if (direction === 'left') {
              setupLeftScroll(filmstrip, container);
            } else {
              setupRightScroll(filmstrip, container);
            }
          }
        });
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const mainImage = document.getElementById('mainImage');
  const overlay = document.getElementById('overlay');
  const closeOverlay = document.getElementById('closeOverlay');

  // Show overlay when main image is clicked
  mainImage.addEventListener('click', () => {
    overlay.style.display = 'flex';
  });

  // Hide overlay when close button is clicked
  closeOverlay.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

  // Optional: Hide overlay when clicking outside the content
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.style.display = 'none';
    }
  });
});
