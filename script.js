let img = document.querySelector('#img');
let preview = document.querySelector('#preview');

img.addEventListener('change', (event) => {
    preview.innerHTML = '';
    preview.classList.remove('hidden'); 
    

    for (let file of event.target.files) {
        let url = URL.createObjectURL(file);
        let imgElement = document.createElement('img');
        imgElement.src = url;
        imgElement.classList.add('preview-image');
        preview.appendChild(imgElement);
        const options = {
            maxSizeMB: 1,
        };
        imageCompression(file, options)
            .then(compressedImage => {
                console.log('Compressed Image:', compressedImage.size / (8 * 1024));
                let compressedUrl = URL.createObjectURL(compressedImage);
                imgElement.src = compressedUrl;
            })
    }
});
preview.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        let link = document.createElement('a');
        link.href = event.target.src;
        link.download = 'compressed-image.jpg';
        link.click();
    }
});
