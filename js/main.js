// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e){
  // Get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)){
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  }
  /*
  //local storage test
  localStorage.setItem('test', 'helloworld');
  console.log(localStorage.getItem('test'));
  localStorage.removeItem('test');
  console.log(localStorage.getItem('test'));
  */

  //Test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null){
    //Init array
    var bookmarks = []; //JSON array
    //add to array
    bookmarks.push(bookmark);
    //set to LocalStorage
    localStorage.setItem('bookmarks', JSON.stingify(bookmarks));
    //JSON.stringify converts JSON to string
  } else{
    //get bookmarks from local storage
    var bookmarks = JASON.parse(localStorage.getItem('bookmarks'));
    //JSON.parse converts string to JSON
    //add bookmark to array
    bookmarks.push(bookmark);
    //re-set back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById('myForm').reset();

  //re-fetch bookmarks
    fetchBookmarks();

    //Prevent form from submitting
    e.preventDefault();
  }

  //Delete Bookmark
  function deleteBookmark(){
    //get bookmarks from storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //loop through bookmarks
    for(var i=0; i < bookmarks.length; i++){
      if(bookmarks[i].url == url){
        //remove from array
        bookmarks.splice(i, 1);
      }
    }
    //re-set back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    //re-fetch bookmarks
    fetchBookmarks();
  }

  function fetchBookmarks(){
    //get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    //build output
    bookmarksResults.innerHTML = '';
    for(var i = 0;i<bookmarks.length; i++){
      var name = bookmarks[i].name;
      var url = bookmarks[i].url;

      bookmarksResults.innerHTML+= '<div class="well">'+
                                    '<h3>'+name+
                                    ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                    ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                    '</h3>'+
                                    '</div>';
    }
  }

// Validate Form
function validateForm(siteName, siteUrl){
    //check if form is filled up
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}

