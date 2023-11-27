 const products = [
  {
    "id": 1,
    "book_name": "The Catcher in the Rye",
    "image": "images/catcher_in_the_rye.jpg",
    "genre": "Fiction",
    "price": 12.99,
    "description": "A classic novel about the experiences of a young man in New York City.",
    "rating": 4.5
  },
  {
    "id": 2,
    "book_name": "To Kill a Mockingbird",
    "image": "to_kill_a_mockingbird.jpg",
    "genre": "Fiction",
    "price": 14.99,
    "description": "A powerful story of racial injustice and moral growth in the American South.",
    "rating": 4.8
  },
  {
    "id": 3,
    "book_name": "The Great Gatsby",
    "image": "the_great_gatsby.jpg",
    "genre": "Fiction",
    "price": 11.99,
    "description": "A tale of love, wealth, and the American Dream set in the Roaring Twenties.",
    "rating": 4.7
  },
  {
    "id": 4,
    "book_name": "1984",
    "image": "1984.jpg",
    "genre": "Dystopian Fiction",
    "price": 13.99,
    "description": "A dystopian novel depicting a totalitarian society and the struggle for freedom.",
    "rating": 4.6
  }
]

async function loadDetail(){
    // return await $.getJSON( "/data/products.json").then(function(data){
    //     return data 
    //   });
    return products;
    
    }
// Get all products
async function getAllProducts() {
    return await loadDetail();
}

// Get product by ID
async function getProductById(id) {
    var products = await loadDetail();
    return products.find(product => product.id === id);
}