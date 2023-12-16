var bookmarkNameInput = document.getElementById("bookmarkName")
var websiteNameInput = document.getElementById("websiteUrl")
var bookmarks = []

if(localStorage.getItem("bookmarks") != null){
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
    displayBookmarks()
}

function addBookmark() {
    if(validation(bookmarkNameInput.value, websiteNameInput.value) == true){
        var bookmark = {
            name: bookmarkNameInput.value,
            url: websiteNameInput.value
        }
        bookmarks.push(bookmark)
        saveLocalStorage()
        displayBookmarks()
        clearForm()
        document.getElementById("error").innerHTML = ""
    } else {
        document.getElementById("error").innerHTML = "Bookmark name or Website URL not valid"
    }
    
}


function displayBookmarks() {
    var bookmarksHTML = ""
    for (var i = 0 ; i < bookmarks.length ; i++){
        bookmarksHTML += `
        <div class="card">
                <div class="card-body">
                  <h5 class="card-title mt-1 mb-4">${bookmarks[i].name}</h5>
                  <a href="${bookmarks[i].url}" target="_blank"><button type="button" class="btn btn-success">View</button></a>               
                  <button onclick="deleteBookmark(${i})" type="button" class="btn btn-danger">Delete</button>
                </div>
        </div>
        `
    }
    document.getElementById("bookmarksView").innerHTML = bookmarksHTML
}

function clearForm(){
    bookmarkNameInput.value = ""
    websiteNameInput.value = ""
}

function deleteBookmark(index){
    bookmarks.splice(index, 1)
    saveLocalStorage()
    displayBookmarks()
}

function saveLocalStorage(){
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
}

function validation(name, url){
    var checkName, checkUrl
    var bookmarkNameRegex = /^[A-Z][a-z 0-9_]{2,40}$/g;
    var bookmarkUrlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g;
    checkName = bookmarkNameRegex.test(name)
    checkUrl = bookmarkUrlRegex.test(url)
    if(checkName && checkUrl == true){
        return true
    } else {
        return false
    }
}