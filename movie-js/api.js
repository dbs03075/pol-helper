const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = "ec266fe6efa0efcd70c8e76684834522";
const PAGE = '&page=';

const API_GET_MOVIE_POPULAR = `${API_URL}movie/popular?api_key=${API_KEY}`;
const API_GET_MOVIE_LATEST = `${API_URL}movie/latest?api_key=${API_KEY}`

const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';
const API_IMAGES = `${IMAGE_BASE_URL}original`

const main = document.querySelector('main');
const poppularMovie = document.querySelector('main .popular-movie');
const randomImg = document.querySelector('.random-img-container');
const popupContainer = document.querySelector('.movieInfoPopupContainer')

let count = 1;

const API_GET_MOVIE_SEARCH = `${API_URL}search/multi?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=`;


makeMovieLsitPopular();
getRandomMovie();

// 최근 respData 불러오기
async function getMovieLatestInfo(page){
    const resp = await fetch(`${API_GET_MOVIE_LATEST}${PAGE}${page}`);
    const respData = await resp.json();
    // console.log(respData);
    return respData;
}

// popuplar respdata 불러오기
async function getMoviePopularInfo(page){
    const resp = await fetch(`${API_GET_MOVIE_POPULAR}${PAGE}${page}`);
    const respData = await resp.json();
    return respData;
}


// search respData 불러오기
async function getMovieSearchInfo(searchData){
    const resp = await fetch(`${API_GET_MOVIE_SEARCH}${searchData}`);
    const respData = await resp.json();
    console.log(respData.results);
    return respData;
}

// 사진 불러오기 // 검색
function uploadMovieInfoMain(respData, ranking){
    const image_link = `${API_IMAGES}${respData.results[ranking].backdrop_path}`;
    console.log(image_link);
    console.log(respData.results[ranking]);
    randomImg.innerHTML =`
    <div class="form-container hidden">
        
        <div class="form-container2">
            <i class="fas fa-arrow-left hidden" id="backArrow" ></i>
            <form action="" id="searchForm" class="hidden">     
                <i id="search" class="fas fa-search"></i>
                <input type="text" id="search-term" />
            </form>
        </div>
        <div class="searchResult">
        </div>
    </div>

    <div style="background-image: url(${image_link});" class="random-img">
        <header>
            <div class="random-img-column flex"><i class="fas fa-bars"></i>
                <div class="random-img-column-inside">
                    <h1>NETFLIX</h1>
                </div>
            </div>
            <div class="random-img-column flex">
                <i class="fas fa-search" id="search-icon"></i>
                <i class="fas fa-ellipsis-h"></i>
            </div>

        </header>
        <div class="random-img-info">
                <span class="random-img-title">${respData.results[ranking].title}</span>
                <span class="random-img-overview">${respData.results[ranking].overview}</span>
                <span class="random-img-popularity">인기도: ${respData.results[ranking].popularity}</span>
                <span class="random-img-vote_average">평점: ${respData.results[ranking].vote_average}</span>
                <span class="random-img-vote_count">평가자 수: ${respData.results[ranking].vote_count}</span>
        </div>
    </div>

    `;


    // search 함수를 누른 경우.
    const searchForm = document.getElementById('searchForm');
    const searchIcon = document.getElementById('search-icon');
    const randomImgColumn = document.querySelectorAll('.random-img-column');
    const formContainer = document.querySelector('.form-container');
    const backArrow = document.querySelector('#backArrow');
    const searchInput = document.querySelector('#search-term');

    searchIcon.addEventListener('click',()=>{

        randomImgColumn[0].classList.remove('flex');
        randomImgColumn[1].classList.remove('flex');
        randomImgColumn[0].classList.add('hidden');
        randomImgColumn[1].classList.add('hidden');
        formContainer.classList.remove('hidden');
        formContainer.classList.add('flex');
        searchForm.classList.add('flex');
        searchForm.classList.remove('hidden');
        backArrow.classList.remove('hidden');
        formContainer.classList.remove('color');

    })

    // 검색 창 닫기 버튼
    backArrow.addEventListener('click', ()=>{
        formContainer.classList.add('hidden');


        randomImgColumn[0].classList.add('flex');
        randomImgColumn[1].classList.add('flex');
        randomImgColumn[0].classList.remove('hidden');
        randomImgColumn[1].classList.remove('hidden');
        formContainer.classList.add('hidden');
        searchForm.classList.remove('flex');
        searchForm.classList.add('hidden');
        backArrow.classList.add('hidden');
    })



    searchForm.addEventListener('submit', (e)=>{
        e.preventDefault();
    })    


    // 검색창에 INPUT이 일어나게 된다면 
    searchInput.addEventListener('input',(e)=>{  
        formContainer.classList.add('color');
        getMovieSearchInfo(searchInput.value).then((value)=>{displaySearchResult(value.results)});
        console.log(searchInput.value);
        console.log("success");
      
    })

    function displaySearchResult(resultArray){
        console.log(resultArray);
        const searchResult = document.querySelector('.searchResult');
        searchResult.innerHTML= '';
        for (let i = 0; i<resultArray.length; i++){
            searchResult.innerHTML += `
            <div class="searchResultContainer">
                <span class="popupRecommendImageTitle">${resultArray[i].original_title ? resultArray[i].original_title: resultArray[i].original_name}</span>
                <img class="popupRecommendImage" src="${API_IMAGES}${resultArray[i].backdrop_path}" alt="">
            </div>
            `
        }

        const searchResultContainerArray = document.querySelectorAll('.searchResultContainer');
        for(let i =0; i<searchResultContainerArray.length; i++){
            searchResultContainerArray[i].addEventListener('click', ()=>{
                console.log("success");
                console.log(resultArray[i]);
                showMoviePopup(resultArray[i]);
            })
        }
        
    }
    
}





function qweqw(){
    console.log(searchIcon);
}


function uploadMovieInfoPopular(respData, ranking){
    // console.log(respData.results[ranking]);
    // console.log(respData.results[ranking].id);
    // console.log(respData.results[ranking].original_title);
    // console.log(respData.results[ranking].vote_average);
    


    const image_link = `${API_IMAGES}${respData.results[ranking].backdrop_path}`;
    // console.log(image_link);
    const moviePopular = document.createElement("div");
    moviePopular.classList.add('moviePopular');
    moviePopular.innerHTML = `
        <span>${count++}</span>
        <span class="popular-title">${respData.results[ranking].title}</span>
        <img src="${image_link}" >
    `

    poppularMovie.appendChild(moviePopular);

    moviePopular.addEventListener('click',() =>{
        showMovieInfo(respData.results[ranking]);
    })

}



// Movie 정보 추가
async function showMovieInfo(movieInfo){
    const MOVIE_ID = movieInfo.id;
    const API_GET_MOVIE_DETAIL = `${API_URL}movie/${MOVIE_ID}?api_key=${API_KEY}&language=pt-KOR`
    
    
    const resp = await fetch(API_GET_MOVIE_DETAIL);
    const respData = await resp.json();


    showMoviePopup(respData);

}


// Movie 정보를 팝업으로 띄웁니다.
async function showMoviePopup(respData)
{
    popupContainer.classList.remove('hidden');
    
    const image_link = `${API_IMAGES}${respData.backdrop_path}`;
    const original_title = `${respData.original_title}`;
    const release_date = `${respData.release_date}`;
    const vote_average = `${respData.vote_average}`;
    const vote_count = `${respData.vote_count}`;
    const runtime = `${respData.runtime}`;
    const overview = `${respData.overview}`;

    document.getElementById("popupImage").src = image_link;
    document.getElementById("popupTitle").innerText = original_title;
    document.getElementById("popupDate").innerText = "제작연도: "+release_date;
    document.getElementById("popupRuntime").innerText = "runtime: "+runtime;
    document.getElementById("popupRate").innerText = "평점: "+vote_average;
    document.getElementById("popupPeople").innerText = "평가자 수: "+vote_count;
    document.getElementById("popupSpot").innerText = overview;

    console.log(respData);


    
    const MOVIE_ID = respData.id;
    const similarMoviesData = await getSimilarMovies(MOVIE_ID);
    
    console.log(similarMoviesData);
    const recommedMovie = document.querySelectorAll('.recommend-movie');


    for (let i = 0; i<8; i++){
       recommedMovie[i].innerHTML = `
       <span class="popupRecommendImageTitle">${similarMoviesData.results[i].original_title}</span>
       <img class="popupRecommendImage" src="${API_IMAGES}${similarMoviesData.results[i].backdrop_path}" alt="">
       `
    }
    
    for(let i =0; i<8; i++){
        recommedMovie[i].addEventListener('click', ()=>{
            console.log("success");
            console.log(similarMoviesData.results[i]);
            showMoviePopup(similarMoviesData.results[i]);
        })
    }
}


// 비슷한 영화 종목을 추첨합니다.
async function getSimilarMovies(MOVIE_ID){
    const API_GET_SIMILAR_MOVIES = `${API_URL}movie/${MOVIE_ID}/similar?api_key=${API_KEY}&language=en-US&page=1`;
    
    const resp = await fetch(API_GET_SIMILAR_MOVIES);
    const respData = await resp.json();

    console.log(respData);

    return respData;

}


// movie LIST표현 
async function makeMovieLsitPopular(){
    
    for (let j = 1; j<5; j++){
        const respData = await getMoviePopularInfo(j);
        
        for(let i = 0; i<20; i++ ){
            uploadMovieInfoPopular(respData, i);
        }
    }
}



async function makeMovieListLatest(){
    for (let j = 1; j<200; j++){
        const respData = await getMovieLatestInfo(j);
        console.log(respData);
        
    }

}


async function getRandomMovie(){
    const random = Math.floor(Math.random()*1000);
    const index = random/20;
    const index2 = random%20;
    const respData = await getMoviePopularInfo(index);
    uploadMovieInfoMain(respData,index2);

}



let last_known_scroll_position = 0;
let ticking = false;

// 스크롤을 내릴 경우
window.addEventListener('scroll', function(e) {
    last_known_scroll_position = window.scrollY;
    console.log(last_known_scroll_position);
    const header = document.querySelector('header');

    if(last_known_scroll_position === 0){
        console.log("succes");
        header.classList.remove('color');

    }
    else{
        header.classList.add('color');

    }
  
  });




// 팝업 닫기 버튼
const popupClose = document.querySelector('.close');
popupClose.addEventListener('click', ()=>{
    popupContainer.classList.add('hidden');

})

