$(function () {
  $(".loading").show();
  $(".header-container span").on("click", function () {
    $(".hideShow").slideToggle("slow");
  });
  $("#close").click(function () {
    $(".hideShow").slideToggle("slow");
  });
  $("#find").click(function () {
    retry();
    $(".hideShow").slideToggle("slow");
    search.value = "";
  });
  $('#search').keydown(function (event) {
    if (event.keyCode === 13) {
      retry();
      $(".hideShow").slideToggle("slow");
      search.value = "";
    }
  })
});

var CURRENT_TOP_HEADLINES = "https://newsapi.org/v2/top-headlines?country=us&apiKey=";
var SEARCH_KEYWORD_URL = "https://newsapi.org/v2/everything?q=";
var API_KEY = "1ac4ec42157d40328159d62152ab684d";

function start() {
  headNews(renderHead);
}

start();

//Function headlines
function headNews(callback) {
  let api = CURRENT_TOP_HEADLINES + API_KEY;
  fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function renderHead(posts) {
  var listNews = document.querySelector("#news");
  var htmls = posts.articles.map(function (articles) {
    var itemNews =
      '<li class="item-list"><img src=" ' +
      articles.image +
      '" alt=""><div class="content-item"><h2><a href="' +
      articles.url +
      '" target="_blank">' +
      articles.title +
      '</a></h2><p class="published">' +
      articles.publishedAt +
      '</p><p class="discription">' +
      articles.description +
      "</p></div></li>";
    return itemNews;
  });
  var html = htmls.join("");

  $(".loading").hide();

  listNews.innerHTML = html;
}

//Function search
function retry() {
  $(".loading").show();
  var input = document.querySelector("#search");
  var keyWords = $(input).val();
  var url =
    SEARCH_KEYWORD_URL + keyWords + "&apiKey=" + API_KEY;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (posts) {
      var listNews = document.querySelector("#news");
      var htmls = posts.articles.map(function (articles) {
        var itemNews =
          '<li class="item-list"><img src=" ' +
          articles.image +
          '" alt=""><div class="content-item"><h2><a href="' +
          articles.url +
          '" target="_blank">' +
          articles.title +
          '</a></h2><p class="published">' +
          articles.publishedAt +
          '</p><p class="discription">' +
          articles.description +
          "</p></div></li>";
        return itemNews;
      });
      var html = htmls.join("");

      $(".loading").hide();

      listNews.innerHTML = html;
    })
    .catch(function (err) {
      alert("input field is empty!");
    });
}
