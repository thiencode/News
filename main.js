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
});

function start() {
  headNews(renderHead);
}

start();

//Function headlines
function headNews(callback) {
  var headline =
    "https://gnews.io/api/v4/top-headlines?&token=f9fc38733b26c277f89b911ffbb721ba";
  fetch(headline)
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
  var apiToken = "f9fc38733b26c277f89b911ffbb721ba";
  var keyWords = $(input).val();
  var url =
    "https://gnews.io/api/v4/search?q=" + keyWords + "&token=" + apiToken;
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
