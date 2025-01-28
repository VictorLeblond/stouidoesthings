document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('.gallery img');
    const preview = document.getElementById('preview');
    const previewImage = document.getElementById('previewImage');
    const previewClose = document.getElementById('previewClose');

    // Show fullscreen image on click
    images.forEach(image => {
        image.addEventListener('click', () => {
            console.log("hi")
            preview.style.display = 'flex';
            previewImage.src = image.src;
        });
    });

    // Close preview on click
    previewClose.addEventListener('click', () => {
        preview.style.display = 'none';
    });

    // Close preview when clicking outside the image
    preview.addEventListener('click', (e) => {
        if (e.target === preview) {
            preview.style.display = 'none';
        }
    });

});

