let source = 'google-news-in';
let country = 'in';
let apiKey = '21c7620a4201459b9182fc97e40ac974'
let newsAccordion = document.getElementById('newsAccordion');

const xhr = new XMLHttpRequest();
xhr.open('GET', 'news.json', true);
// xhr.open('GET', 'https://newsapi.org/v2/top-headlines?country=in&apiKey=21c7620a4201459b9182fc97e40ac974', true);
xhr.onload = function () {
    // Error management in Ajax
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        let newsH = "";
        articles.forEach(function(element, index) {
            let news = `<div class="card">
                            <div class="card-header" id="heading${index}">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse"
                                        data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                        <b>Breaking News ${index+1}: </b>${element["title"]}
                                    </button>
                                </h2>
                            </div>
                            <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
                                <div class="card-body">
                                    <strong>Description: </strong>${element["description"]}
                                </div>
                            </div>
                            <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
                                <div class="card-body">
                                <strong>Details: </strong>${element["content"]}
                                <br>
                                <a href="${element["url"]}" target="blank">Read more about this by clicking here.</a> 
                                </div>
                            </div>
                        </div>`;
            newsH += news;
        });
    newsAccordion.innerHTML = newsH;
    }
    else
        console.error('Some error occured.');
}
xhr.send();

let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value;
    // console.log('Input event fired!', inputVal);
    let cards = document.getElementsByClassName('card');
    Array.from(cards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("div")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    });
});