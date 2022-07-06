let nextID = 0;
let currID = 0;

fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then((data) => {
        nextID = data.length
    })

const displayRamen = (ind) => {
    currID = ind+1
    const viewing = document.getElementById('ramen-detail')
    fetch(`http://localhost:3000/ramens/${ind+1}`)
        .then(res => res.json())
        .then((data) => {
            viewing.getElementsByClassName('detail-image')[0].src = data.image
            viewing.getElementsByClassName('name')[0].textContent = data.name
            viewing.getElementsByClassName('restaurant')[0].textContent = data.restaurant
            document.getElementById('rating-display').textContent = data.rating
            document.getElementById('comment-display').textContent = data.comment
        })
}

const renderRamen = () => {
    fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then((data) => {
        const menu = document.getElementById('ramen-menu')
        menu.innerHTML = ''
        data.forEach((element, index) => {
            const im = document.createElement('img')
            im.src = element.image
            im.addEventListener('click', () => {
                displayRamen(index)
            })
            menu.append(im)
        });
    })
}

newForm = document.getElementById('new-ramen')
newForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/ramens', {
        method: 'POST', 
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify({
            "id": ++nextID,
            "name": document.getElementById('new-name').value,
            "restaurant": document.getElementById('new-restaurant').value,
            "image": document.getElementById('new-image').value,
            "rating": document.getElementById('new-rating').value,
            "comment": document.getElementById('new-comment').value
        })
    }).then(() => {
        renderRamen()
    }).catch((error) => console.log(error))
    
})

editForm = document.getElementById('edit-ramen')
editForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/ramens/${currID}`, {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify({
            "rating": document.getElementById('edit-rating').value,
            "comment": document.getElementById('edit-comment').value
        })
    }).then(() => {
        renderRamen()
        displayRamen(currID - 1)
    }).catch((error) => console.log(error))
})

renderRamen()
displayRamen(0)