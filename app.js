const submit = document.querySelector('#submit');
const query = document.querySelector('#query');
const url = 'https://www.googleapis.com/books/v1/volumes?q=';
const content = document.querySelector('#content');

submit.addEventListener('submit', e => {
  e.preventDefault();
  content.innerHTML = "";
  fetch(url+query.value)
  .then(response => {
    return response.json()
      .then(data => {
        if (response.ok) {
          return data;
        } else {
          return Promise.reject({status: response.status, data});
        }
    });
  })
  .then(result => displayResults(result))
  .catch(error => console.log('error:', error));
});

function displayResults(res) {

  for (let i = 0; i < res.items.length; i++) {
    let item = res.items[i];
    //console.log(item.volumeInfo.industryIdentifiers[1].identifier)
    let title = item.volumeInfo.title;
    let author = item.volumeInfo.authors;
    let publisher = item.volumeInfo.publisher;
    let bookLink = item.volumeInfo.previewLink;
    let bookIsbn = (item.volumeInfo.industryIdentifiers[1]) ? item.volumeInfo.industryIdentifiers[1].identifier : "";
    let bookImg = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';
    content.innerHTML += formatOutput(bookImg, title, author, publisher, bookLink, bookIsbn)
  }
}

function formatOutput(bookImg, title, author, publisher, bookLink, bookIsbn) {
  
  var viewUrl = 'book.html?isbn='+bookIsbn; //constructing link for bookviewer
  var htmlCard = `<div class="col-lg-6 mt-4">
    <div class="card" style="">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${bookImg}" class="card-img" alt="...">
        </div>
      <div class="col-md-6">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">Author: ${author}</p>
          <p class="card-text">Publisher: ${publisher}</p>
          <a target="_blank" href="${viewUrl}" class="btn btn-secondary">Read Book</a>
        </div>
      </div>
    </div>
  </div>
 </div>`
 return htmlCard;
}