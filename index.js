// function getImage() {
//     fetch("https://api.unsplash.com/photos/random/?query=nature&orientation=landscape&client_id=fjr-GKhpwyrDcrVvBC8eRA-CwPH1dC8AzaI4X1-g_s4")
//     .then(res => res.json())
//     .then(data => {
//         document.body.style.backgroundImage = `url(${data.urls.full})`
//         console.log(data)
//     })
//    .catch(err => {
//      document.body.style.backgroundImage = `url(${data.urls.full})`
//})
// }
// getImage()
// setInterval(getImage, 10000);

function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

setInterval(getCurrentTime, 1000)

function getQuote() {
    fetch("http://api.quotable.io/random")
    .then(res => res.json())
    .then(data => {
        document.getElementById("quote").textContent = data.content
    })
    .catch(err => {
        document.getElementById("quote").textContent = `Just one small positive thought in the morning can change your whole day.`
    })
    setInterval(getQuote, 86400000)
}

getQuote()

document.getElementById("todo").addEventListener("click", () => {
    document.getElementById("todo").style.visibility = "hidden"
    document.getElementById("todo-list").style.visibility = "visible"
    // document.getElementById("bottom").style.justifyContent = "flex-start"
    // document.getElementById("bottom").style.width = "70%"
})

document.getElementById("today").addEventListener("click", () => {
    document.getElementById("todo").style.visibility = "visible"
    document.getElementById("todo-list").style.visibility = "hidden"
    // document.getElementById("bottom").style.justifyContent = "flex-start"
    // document.getElementById("bottom").style.width = "100%"
})

const randomId = Math.floor(Math.random() * 1000)

function addTodo() {
    let todoVal = document.getElementById("todo-val").value
    let list = document.getElementById("list")
    document.getElementById("add-todo").style.display = "none"
    list.innerHTML += `
            <div class="list-item" id="${randomId}"><div class="checkbox"></div><p class="text">${todoVal}</p><div class="remove">x</div></div>
            `
}

document.getElementById("todo-val").addEventListener("keypress", function(e) {
    if(e.key === "Enter") {
        e.preventDefault()
        addTodo()
        document.getElementById("todo-val").value = ""
    }
})

const list = document.querySelector(".list")
list.addEventListener("click", function(e) {
    console.log(e.target.parentNode)
    if(e.target.className === "checkbox") {
        const parent = e.target.parentNode
        console.log(parent)
        const div = parent.lastChild
        console.log(div)
        parent.firstChild.style.backgroundColor = "blue"
        parent.children[1].style.textDecoration = "line-through"
    }
    else if(e.target.className === "remove") {
        console.log(e.target.parentNode)
        e.target.parentNode.remove()
    }
})

function addMainFocus() {
    const mainFocus = document.getElementById("main-focus")
    document.getElementById("main-focus-parent").lastElementChild.remove() 
    document.getElementById("main-focus-parent").innerHTML +=  `<p>${mainFocus.value}</p>`
}

document.getElementById("main-focus").addEventListener("keypress", function(e) {
    if(e.key === "Enter") {
        e.preventDefault()
        addMainFocus()
    }
})

console.log(document.getElementById("main-focus-parent").lastElementChild)

function deleteTodo() {

}