//book constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn
}

//ui constructor
function UI(){}


//Add book to list
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list')

    //Create tr element
    const row = document.createElement('tr')

    // insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `

    list.appendChild(row)
}

//Show Alert
UI.prototype.showAlert = function(message, className){
    //Create div
    const div = document.createElement('div');
    //Add class
    div.className = `alert ${className}`
    //Add text node
    div.appendChild(document.createTextNode(message))
    //Get a parent
    const container = document.querySelector('.container')
    //Get form for insert before
    const form = document.querySelector('#book-form');
    // insert alert
    container.insertBefore(div, form)
    // dissapear
    setTimeout(function(){
        document.querySelector('.alert').remove()
    }, 3000)
}

//Delete book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove()
    }
}
// Clear fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Event listeners for add book

document.getElementById('book-form').addEventListener('submit', function(e){
    e.preventDefault()
    //get form values
    const titleInput = document.getElementById('title').value,
    authorInput = document.getElementById('author').value,
    isbnInput = document.getElementById('isbn').value

    //Instantiate book
    const book = new Book(titleInput, authorInput, isbnInput)

    // Instantiate UI
    const ui = new UI();
    console.log(ui)

    if(titleInput === '' || authorInput === '' || isbnInput === ''){
        // Error Alert
        ui.showAlert('Please fill in all fields', 'error')
    } else {
        // Add book to list
        ui.addBookToList(book);

        //Show success
        ui.showAlert('Book added!', 'success')
        // Clear Fields
        ui.clearFields();
    }
})


//Event listener for delete

document.getElementById('book-list').addEventListener('click', function(e){
    e.preventDefault()
    const ui = new UI();
    // Delete book
    ui.deleteBook(e.target)

    //Show alert
    ui.showAlert('Book removed!', 'success')
})