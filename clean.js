//removed
var removedStories = [];
//where feed stores
var storyContainerClasses = ["_5jmm", "_5pcr"];
//ban words
var bannedTerms = ["listen", "listen, "];
//debug settings
var DEBUG = true;

function cleanNewsFeed(){

    chrome.storage.sync.get("dont_listen", function(data){
        if (data["dont_listen"]){
            // find all potential posts
            $.each(storyContainerClasses, function(i, storyContainerClass){
                console.log(storyContainerClass)
                posts = document.getElementsByClassName(storyContainerClass);
                $.each(posts, function(i, post){
                    removeTerms(post);
                });
            });
        }
    });
}

function removeTerms(item){
    var paragraphs = item.getElementsByTagName("p");
    $.each(paragraphs, function(i, paragraph){
        var text = paragraph.textContent.toLowerCase();
        $.each(bannedTerms, function(i, term){

            if(text.startsWith(term)) {
                console.log(text);
                removeItem(item, "term at beginning", term)
            }
            if (text.indexOf("wake up") !== -1){
                removeItem(item, "awakened ", term);
            }
        });
    });

}

function removeItem(item, offenseType, offenseMaterial){

    // set the story to be invisible
    if (DEBUG){
        item.style.opacity = "0.5";
    } else {
        item.style.opacity = "0.0";
        item.style.display = "None";
    }

    // add this story to the list of killed stories
    if (removedStories.indexOf(item) == -1){
        if (DEBUG){
            console.log("killed an item because of bad " + offenseType + ": " + offenseMaterial);
        }
        removedStories.push(item);
    }

}

cleanNewsFeed(); // run once on page load

// debounce the function so it's not running constantly
var scrollBuzzkill = _.debounce(cleanNewsFeed, 300);
document.addEventListener("scroll", scrollBuzzkill);
