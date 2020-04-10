//Receieved Assistance from the following websites:
//www.w3schools.com/howto/howto_js_todolist.asp
//http://cse204.work/todo-api#list-info
//https://www.sitepoint.com/community/t/dom-remove-all-li-from-ul/3145


//API information
var api_link = "https://cse204.work/todos";
var api_key = "4a54ca-49ccbe-fc10a6-ca0efb-102185";



//fetch all Todo's from server
function fetch_todos(){
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let todos = JSON.parse(this.responseText);
        console.log(todos);

        load_page(todos);
    }
  };

  xhttp.open("GET", api_link, true);
  xhttp.setRequestHeader("x-api-key",api_key);
  xhttp.send();
}

//the above works

//Load the Page by using the Fetch_Todos function
function load_page(json){
  //var json = fetch_todos();


  console.log(json);

  //Clears the list before repopulating it
  var ul = document.getElementById("actual_list");
  var lis = ul.getElementsByTagName("li")
  while((lis).length > 0) {
    ul.removeChild(lis[0]);
  }

  var j;
  for(j=0; j < json.length; j++){
    var object = json[j];
    // console.log(object);
    var list_element = document.createElement("li");
    var text_input = object.text;
    var text = document.createTextNode(text_input);
    console.log("Below is the text value of the Object i text");
    // console.log(text_input);

    list_element.appendChild(text);
    list_element.setAttribute("id", object.id);
    list_element.setAttribute("completed", object.completed);
    document.getElementById("actual_list").appendChild(list_element);

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    list_element.appendChild(span);

    // console.log("Completed Status");
    // console.log(list_element.getAttribute("completed"));
    //change class to marked if completed = true
    if (list_element.getAttribute("completed") == "true"){
        list_element.classList.toggle('marked');
    }

    //add delete functionality
    var k;
    for (k = 0; k < close.length; k++) {
      close[k].onclick = function() {
        var deleted_element = this.parentElement;
        deleted_element.style.display = "none";
        delete_task(deleted_element.getAttribute("id"));

      }
    }


  }

}


//Function that Handles Adding Tasks to the jsonbase
function add_task(words){
    // Setting variable for form input (get from HTML form)
  var json = {
      text: words
  }
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var todo = JSON.parse(this.responseText);
          console.log("The Below has been sent to the server");
          console.log(todo);

      } else if (this.readyState == 4) {
          console.log(this.responseText);

      }
  };

  xhttp.open("POST", api_link, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("x-api-key", api_key);
  xhttp.send(JSON.stringify(json));
}
// the above works


//Function that allows you to delete tasks
function delete_task(id){
  // Initalize AJAX Request
  var xhttp = new XMLHttpRequest();

  // Response handler
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          console.log(id);
          console.log("Above ID has been Deleted")

      } else if (this.readyState == 4) {
          console.log("No Task had this ID");
      }
  };

  xhttp.open("DELETE", "https://cse204.work/todos/" + id, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("x-api-key", api_key);
  xhttp.send();
}
//The above function works
//make sure to put in ID as a string


//Function that grabs a list item via its id
function grab_task(id){
  // Initalize AJAX Request
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var todo = JSON.parse(this.responseText);
          console.log(todo);
          return todo;

      } else if (this.readyState == 4) {
          console.log(this.responseText);
      }
  };

  xhttp.open("GET", "https://cse204.work/todos/"+id, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("x-api-key", api_key);
  xhttp.send();
}



//Function to Update a Task (Completed v. Not Compeleted)
function update_task(id, finished){
  var json = {completed: finished};
  console.log("in here")
  console.log(json)


  // Initalize AJAX Request
  var xhttp = new XMLHttpRequest();

  // Response handler
  xhttp.onreadystatechange = function() {
      // Wait for readyState = 4 & 200 response
      if (this.readyState == 4 && this.status == 200) {
          // parse JSON response
          var todo = JSON.parse(this.responseText);
          console.log("Below is the todo response from the update function");
          console.log(todo);
          // fetch_todos();
          //return todo;

      } else if (this.readyState == 4) {
          // this.status !== 200, error from server
          console.log(this.responseText);
      }
  };

  xhttp.open("PUT", "https://cse204.work/todos/"+id, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("x-api-key", api_key);
  xhttp.send(JSON.stringify(json));
}



// Ensures that each list item has a close button
var closing_buttons = document.getElementsByTagName("LI");
var b;
for (b = 0; b < closing_buttons.length; b++) {
  //Vars for creating a close
  var closing_button_span = document.createElement("SPAN");
  var cross = document.createTextNode("\u00D7");


  closing_button_span.className = "close";
  closing_button_span.appendChild(cross);
  myNodelist[i].appendChild(closing_button_span);
}

// Function that makes list items disappear visually and get deleted
var close = document.getElementsByClassName("close");

var c;
for (c = 0; c < close.length; c++) {
  close[i].onclick = function() {
    var hidden_element = this.parentElement;
    hidden_element.style.display = "none";

    delete_task(div.getAttribute("id"));
    console.log("Below Item has been deleted");
    console.log(hidden_element);

  }
}

// Function which allows Clicking on a list item "marks" it
var ul_list = document.querySelector('ul');
ul_list.addEventListener('click', function(click_event) {

  if (click_event.target.tagName === 'LI') {
    //Toggles a clicked list Item to marked
    click_event.target.classList.toggle('marked');

    console.log("Below is the ID of the item getting updated");
    console.log(click_event.target.getAttribute("id"));
    console.log(click_event.target.getAttribute("completed"));
    console.log(click_event.target);

    update_task(click_event.target.getAttribute("id"), click_event.target.classList.contains("marked"));


  }
}, false);




// Function that creates a new task
function new_task() {
  //Creating Variables
  var list_element = document.createElement("li");
  var input = document.getElementById("input").value;
  var text_node = document.createTextNode(input);
  add_task(input);

  //Appending Element
  list_element.appendChild(text_node);
  if (input === '') {
    alert("There Must be an entry in the field");
  } else {
    document.getElementById("actual_list").appendChild(list_element);
  }
  //Clears Field
  document.getElementById("input").value = "";

  var close_button = document.createElement("SPAN");
  var text_Node = document.createTextNode("\u00D7");
  close_button.className = "close";

  //Appending Close Button
  close_button.appendChild(text_Node);
  list_element.appendChild(close_button);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {

      var list_container = this.parentElement;
      list_container.style.display = "none";
    }
  }
}

fetch_todos();
