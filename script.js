const apiKey = 'GFEePRZDXsVf2OkUIC0Y7CL2EUEVu3kQ';
const basicUrl='https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=';
const search = document.getElementById('search');
const result = document.getElementById('searchResult');

search.addEventListener('keypress', callApi);

function callApi(e){
    if(e.key==='Enter'){
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load',reqListener);
        var reviewsUrl=basicUrl+search.value+'&api-key='+apiKey;
        xhr.open('GET', reviewsUrl);
        xhr.send();
        console.log(reviewsUrl);

        changeHeader();
    }
}

function reqListener(){
    jsonReviews=this.responseText;
    objectReviews=JSON.parse(jsonReviews);
    console.log(objectReviews);
    result.innerText='';
   

    for ( let i = 0; i < objectReviews.results.length; i++){
        var paragraph= document.createElement('div');
        paragraph.setAttribute('id','article');  

        var movieTitle=document.createElement('h3');
        movieTitle.style.marginBottom = '0.7em';
        movieTitle.innerHTML= `<small>Movie title</small>: ${objectReviews.results[i].display_title}`;

        var reviewHeadline=document.createElement('h3');
        reviewHeadline.style.marginTop = '0';
        reviewHeadline.style.marginBottom = '1.2em';
        reviewHeadline.innerHTML= `<small>Review Headline</small>: ${objectReviews.results[i].headline}`;


        var link=document.createElement('a');
        link.setAttribute('href', objectReviews.results[i].link.url);
        link.setAttribute('target','_blank');
       
        link.innerText = objectReviews.results[i].link.suggested_link_text;

        var articleFooter= document.createElement('div');
        articleFooter.setAttribute('class','artFooter');

        var author=document.createElement('i');
        author.setAttribute('class','author');
        author.innerHTML = objectReviews.results[i].byline + '<br>';

        var dateUpdated=document.createElement('time');
        dateUpdated.setAttribute('datetime', objectReviews.results[i].date_updated);
        dateUpdated.innerText = objectReviews.results[i].date_updated;

        articleFooter.appendChild(author);
        articleFooter.appendChild(dateUpdated);


        paragraph.appendChild(movieTitle);
        paragraph.appendChild(reviewHeadline);
        paragraph.appendChild(link);
        paragraph.appendChild(articleFooter);


        result.appendChild(paragraph);
        result.style.margin = '30px 0';

    }
}

function changeHeader(){
    var header=document.getElementById('header');
    header.style.flexDirection='row';
    header.style.justifyContent='space-between';
    header.style.padding='10px 20px';
    document.getElementById('search-header').style.fontSize='1.5em';
    document.getElementById('search').style.height='30px';
}