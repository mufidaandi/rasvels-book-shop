let slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let slides = $(".mySlides");

  let dots = $(".dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  slides.hide();
  dots.removeClass("active");
  slides.eq(slideIndex - 1).show();
  dots.eq(slideIndex - 1).addClass("active");
}

function enlargeAnimation(imageId) {
  $(imageId).css("width", `105%`);
}

function reduceAnimation(imageId) {
  $(imageId).css("width", `100%`);
}

function addImageHoverHandlers(imageId) {
  $(imageId).on("mouseover", () => enlargeAnimation(imageId));
  $(imageId).on("mouseleave", () => reduceAnimation(imageId));
}

function topSellers(){
  fetch('/getBooks')
  .then(response => response.json())
  .then(books => {
      const sortedBooks = books.sort((a, b) => b.Rating - a.Rating);
      const topBooks = sortedBooks.slice(0, 3);
      const topBooksContainer = document.getElementById('top-sellers-container');

      topBooks.forEach(book => {
          const bookDiv = document.createElement('div');
          bookDiv.innerHTML = `
              <a href="product-detail.html?bookId=${book.BookID}"><img src="/${book.Image}" alt="Book Cover">
              <p class="book-title">${book.Title}</p></a>
              <p>by ${book.Author}</p>
              <button class="button addToCart">ADD TO CART</button>
          `;
          bookDiv.className = 'book-wrapper';
          topBooksContainer.appendChild(bookDiv);
      });
  })
  .catch(error => console.error('Error fetching books:', error));
}

function getRatingStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  const starHTML = (type) => `<i class="fas fa-star${type === 'half' ? '-half-alt' : ''}"></i>`;

  const starsArray = Array(fullStars).fill(starHTML('full'))
    .concat(halfStar ? [starHTML('half')] : [])
    .concat(Array(emptyStars).fill(starHTML('empty')));

  return starsArray.join('');
}

$(document).ready(function () {
  showSlides();
  setInterval(function () {
    plusSlides(1);
  }, 10000);

  addImageHoverHandlers("#topseller-image");
  addImageHoverHandlers("#newrelease-image");
  addImageHoverHandlers("#deals-image");
  addImageHoverHandlers("#mystery-image");
  addImageHoverHandlers("#horror-image");
  addImageHoverHandlers("#fantasy-image");
  addImageHoverHandlers("#romance-image");

  topSellers();
});
