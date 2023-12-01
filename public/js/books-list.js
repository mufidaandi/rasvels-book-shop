var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};

function setCategories() {
  const categorizedGenres = {
    Fiction: [
      "Historical",
      "Drama",
      "Mystery",
      "Thriller",
      "Romance",
      "Women's Fiction",
      "Literary Fiction",
      "Romantic Comedy",
    ],
    "Non-fiction": [
      "Travel",
      "Adventure",
      "Business",
      "Economics",
      "Psychology",
      "Memoir",
      "Social Justice",
      "Sociology",
      "Literature",
      "Science Fiction",
    ],
    Others: [
      "Entertainment",
      "Self-help",
      "Contemporary",
      "Feminism",
      "Short Stories",
    ],
  };
  const categoriesSection = document.getElementById("categoriesSection");

  Object.keys(categorizedGenres).forEach((categoryGroup) => {
    const groupDiv = document.createElement("div");
    groupDiv.classList.add("categ-title");

    const groupLink = document.createElement("a");
    groupLink.href = `books-list.html?category=${categoryGroup.toLowerCase()}`;
    groupLink.textContent = categoryGroup;
    groupDiv.appendChild(groupLink);

    const groupList = document.createElement("ul");
    groupList.classList.add(
      "subcat-dropdown",
      `${categoryGroup.toLowerCase()}-dropdown`
    );

    categorizedGenres[categoryGroup].forEach((genre) => {
      const listItem = document.createElement("li");
      const genreLink = document.createElement("a");
      genreLink.href = `books-list.html?category=${genre
        .toLowerCase()
        .replace(/ /g, "_")}`;
      genreLink.textContent = genre;
      listItem.appendChild(genreLink);
      groupList.appendChild(listItem);
    });

    categoriesSection.appendChild(groupDiv);
    categoriesSection.appendChild(groupList);
  });
}

$(document).ready(function () {
  setCategories();
  const productList = $("#product-list");

  // Fetch books from the server
  fetch("/getBooks")
    .then((response) => response.json())
    .then((books) => {
      books.forEach((book) => {
        // Create a div for the book card
        const bookCard = $('<div class="product-card"></div>');

        // Create a div for the book details
        const bookLinkStart = $("<a>");
        bookLinkStart.attr("href", "product-detail.html?bookId=" + book.BookID);

        // Create an image element for the book cover
        const bookCover = $("<img>");
        bookCover.attr("src", book.Image);
        bookCover.attr("alt", book.Title);
        bookCover.attr("height", "200");
        bookCover.attr("width", "200");
        bookCover.addClass("product-image");

        // Create a div for the book details
        const bookDetails = $('<div class="product-details"></div>');

        // Create a p element for the book price
        const bookPrice = $('<p class="product-price"></p>');
        bookPrice.text(`$${book.Price}`);

        // Create an h2 element for the book title
        const bookTitle = $('<p class="product-name"></p>');
        const title = book.Title;
        const truncatedTitle =
          title.length > 50 ? title.substring(0, 50) + "..." : title;
        bookTitle.append(truncatedTitle);

        // Create a Span for quantity of available book
        const bookQuantity = $('<span id="product-quantity"></span>');
        const quantity = $('<span id="product-quantity-number"></span>');
        quantity.text("In Stock");
        bookQuantity.append(quantity);

        // Create a div for the book rating
        const bookRating = $('<div class="product-rating"></div>');

        // const bookRatingTextContainer = $('<div class="product-rating-text"></div>');
        // Create a span element for the book rating value
        const bookRatingValue = $('<span class="product-rating-value"></span>');
        const filledStars = book.Rating;
        bookRatingValue.text(filledStars);

        // Create filled stars
        for (let j = 0; j < filledStars; j++) {
          const star = $("<i>").addClass("ecicon eci-star fill");
          bookRating.append(star);
        }

        // Calculate number of empty stars
        const emptyStars = 5 - filledStars;

        // Create empty stars
        for (let j = 0; j < emptyStars; j++) {
          const star = $("<i>").addClass("ecicon eci-star-o");
          bookRating.append(star);
        }

        // Create a span element for the maximum book rating
        const bookRatingMax = $('<span class="product-rating-max"></span>');
        bookRatingMax.text("/5");

        // bookRatingTextContainer.append(bookRatingValue);
        // bookRatingTextContainer.append(bookRatingMax);

        // Add the rating value and maximum to the rating div
        bookRating.append(bookRatingValue);
        bookRating.append(bookRatingMax);

        // Add the book title, price, and rating to the book details
        bookDetails.append(bookTitle);
        bookDetails.append(bookQuantity);
        bookDetails.append(bookPrice);
        bookDetails.append(bookRating);

        // Add the book cover and details to the book card
        bookCard.append(bookCover);
        bookCard.append(bookDetails);

        bookLinkStart.append(bookCard);
        productList.append(bookLinkStart);
      });
    })
    .catch((error) => console.error("Error fetching books:", error));
});
