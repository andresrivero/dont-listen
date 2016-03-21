document.addEventListener('DOMContentLoaded', function(){

    var input = document.getElementById('listen-option');

    // set the initial state of the checkbox
    chrome.storage.sync.get("dont_listen", function(data){
        if (data["dont_listen"]){
            input.checked = true;
        } else {
            input.checked = false;
        }
      });


    input.addEventListener("change", function(){
        chrome.storage.sync.set({dont_listen: input.checked});
    });


});
