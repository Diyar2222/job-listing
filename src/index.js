import {data} from './data.js'
const jobs = document.querySelector('.jobs')
let filteredData = []
let searchField = document.querySelector('.search')
let searchList = document.querySelector('.search__left-column')
let clearSearchList = document.querySelector('.search__clear')
let searchListArray = []
function filterData(){
    filteredData = []
    data.map(item=>{
        let newArray = [
            item.role,
            item.level,
            ...(item.tools.length>0 ? item.tools : []),
            ...(item.languages.length>0 ? item.languages : [])
        ]
        if(searchListArray.every(filterTag=>newArray.includes(filterTag))){
            filteredData.push(item)
        }
    })
}
filterData()
//mapping through data and adding to innerHTML to display
function mapData(){
    jobs.innerHTML = ''
    let array = []
    filteredData.map(item=>{
        array = [
            item.role,
            item.level,
            ...(item.tools.length>0 ? item.tools : []),
            ...(item.languages.length>0 ? item.languages : [])
        ]
        function getTag(item){
            return `<div class='tag'>${item}</div>`
        }
        jobs.innerHTML += `<div class="jobs__item">
        <div class="jobs__item__left-column">
          <img class = 'logo-img' src="${item.logo}" alt="${item.company}">
          <div class="jobs-data">
            <div class="jobs-data-company">${item.company}</div>
            <div class="jobs-data-title">${item.position}</div>
            <ul class="jobs-data-details">
              <li class="period">${item.postedAt}</li>
              <li>${item.contract}</li>
              <li>${item.location}</li>
            </ul>
          </div>
        </div>
        <div class="jobs__item__right-column">
          ${array.reduce((acc,currentTag)=>{
            return acc + getTag(currentTag)
        },'')}
        </div>
        </div>
      </div>`
    })
    let tags = document.querySelectorAll('.tag')
    for(let i=0;i<tags.length;i++){
        tags[i].addEventListener('click',(e)=>addToSearchList(e))
    }
}
mapData()
//adding tags to search bar
function addToSearchList(e){
    let item = e.target.innerText
    if(searchListArray.includes(item))return //can't have two same tags
    searchListArray.push(item)
    let tagsList = searchListArray.map(elem=>{
        return `<span class="search__close-tag">${elem}</span>`
    }).join('')
    searchField.style.opacity = 1
    searchList.innerHTML = tagsList
    let removeBtns = document.querySelectorAll('.search__close-tag')
    for(let i=0;i<removeBtns.length;i++){
        removeBtns[i].addEventListener('click',(e)=>removeTag(e))
    }
    filterData()
    mapData()
}
//removing tag from search bar
function removeTag(e){
    let elem = e.target.innerText
    searchListArray = searchListArray.filter(item=>item!==elem)
    e.target.remove()
    if(searchListArray.length===0){
        searchField.style.opacity = 0
    }
    filterData()
    mapData()
}
//clear all button
clearSearchList.addEventListener('click',()=>{
    searchListArray = []
    searchField.style.opacity = 0
    filteredData = data
    mapData()
})
