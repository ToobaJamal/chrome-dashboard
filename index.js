// Fetch background image from unsplash api
function getImage() {
    fetch("https://api.unsplash.com/photos/random/?query=nature&orientation=landscape&client_id=fjr-GKhpwyrDcrVvBC8eRA-CwPH1dC8AzaI4X1-g_s4")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.full})`
        document.getElementById("author").textContent = `By: ${data.user.name}`
    })
   .catch(err => {
     document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1552083375-1447ce886485?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzODE5MzJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjkxMDI2OTU&ixlib=rb-4.0.3&q=80)`
     document.getElementById("author").textContent = "By: Fabian Quintero"
    })
}

// Fetch weather data based on user's location from open weather map api 
function getWeather() {
    let apiKey = "a8e71c9932b20c4ceb0aed183e6a83bb"
    navigator.geolocation.getCurrentPosition(position => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&appid=${apiKey}&lon=${position.coords.longitude}&units=metric`)
            .then(res => {
                if (!res.ok) {
                    throw Error("Weather data not available")
                }
                return res.json()
            })
            .then(data => {
                const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                document.getElementById("weather-icon"). src = iconUrl
                document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}º`
                document.getElementById("city").textContent = data.name
            })
    })
}

// Get current time 
function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

// Fetch quote from quotable api
function getQuote() {
    fetch("http://api.quotable.io/random")
    .then(res => res.json())
    .then(data => {
        document.getElementById("quote").textContent = data.content
    })
    .catch(err => {
        document.getElementById("quote").textContent = `Just one small positive thought in the morning can change your whole day.`
    })
}

// Add todo to local storage and render on page
function addTodo() {
    const randomId = Math.floor(Math.random() * 1000)
    let todoVal = document.getElementById("todo-val").value
    const todoArr = JSON.parse(localStorage.getItem("todo array"))
    localStorage.setItem(randomId, JSON.stringify({key: randomId, value: todoVal, checked: 0}))
    if (JSON.parse(localStorage.getItem("todo array"))) {
        localStorage.setItem("todo array", JSON.stringify([...todoArr, randomId]))
    }
    else {
        localStorage.setItem("todo array", JSON.stringify([randomId]))
    }
    renderTodo()
}

// Render todo html on page
function renderTodo() {
    list.innerHTML = ""
    const localTodo = JSON.parse(localStorage.getItem("todo array"))
    if(localTodo) {
        for(let i of localTodo) {
            const item = JSON.parse(localStorage.getItem(i))
            if(item.checked == 1) {
                list.innerHTML += `
            <div class="list-item" id="${item.key}"><div class="checkbox grey"></div><p class="text line">${item.value}</p><div class="remove">x</div></div>
            `
            }
            else if(item.checked == 0) {
                list.innerHTML += `
            <div class="list-item" id="${item.key}"><div class="checkbox"></div><p class="text">${item.value}</p><div class="remove">x</div></div>
            `
            }
        }
    }
    else {
        return
    }
}

// add main focus to page and control main focus checked state
function addMainFocus() {
    document.getElementById("focus-form").style.display = "none" 
    document.getElementById("todays-focus").style.display = "block" 
    document.getElementById("todays-focus").textContent =  localStorage.getItem("focus")
    const checked = localStorage.getItem("checked")
    if(checked == 1) {
        document.getElementById("todays-focus").classList.add("line")   
    }
    else {
        return
    }
    document.getElementById("todays-focus").addEventListener("click", function(e){
        document.getElementById("todays-focus").classList.toggle('line')
        let isChecked = localStorage.getItem("checked")
        if(isChecked == 0) {
            localStorage.setItem("checked", 1)
        }
        else if(isChecked == 1) {
            localStorage.setItem("checked", 0)
        }
    })
}

// Remove main focus from page
function removeMainFocus() {
    document.getElementById("todays-focus").style.display = "none" 
    document.getElementById("focus-form").style.display = "block"
}

// Render main focus
function renderMainFocus() {
    if(localStorage.getItem("checked") === 1) {
        document.getElementById("todays-focus").style.textDecoration = "line-through"
    }
}

// todo click event
document.getElementById("todo").addEventListener("click", () => {
    document.getElementById("todo").style.visibility = "hidden"
    document.getElementById("todo-list").style.visibility = "visible"
    renderTodo()
})

// todo minimize click event
document.getElementById("minimize").addEventListener("click", () => {
    document.getElementById("todo").style.visibility = "visible"
    document.getElementById("todo-list").style.visibility = "hidden"
})

// todo item value event listener
document.getElementById("todo-val").addEventListener("keypress", function(e) {
    if(e.key === "Enter") {
        e.preventDefault()
        addTodo()
        document.getElementById("todo-val").value = ""
    }
})

// Add main focus value and checked state to local storage
document.getElementById("main-focus").addEventListener("keypress", function(e) {
    if(e.key === "Enter") {
        e.preventDefault()
        localStorage.setItem("focus", e.target.value)
        localStorage.setItem("checked", 0)
        addMainFocus()
    }
})

// Check or remove todo list item
const list = document.querySelector(".list")
list.addEventListener("click", function(e) {
    if(e.target.classList.contains("checkbox")) {
        const parent = e.target.parentNode
        const todoId = Number(parent.id)
        let todo = JSON.parse(localStorage.getItem(todoId))
        if(todo.checked === 0) {
            localStorage.setItem(todoId, JSON.stringify({...todo, checked:1}))
        }
        else if(todo.checked === 1) {
            localStorage.setItem(todoId, JSON.stringify({...todo, checked:0}))
        }
        parent.firstChild.classList.toggle('grey')
        parent.children[1].classList.toggle('line')
    }
    else if(e.target.className === "remove") {
        const removeId = Number(e.target.parentNode.id)
        localStorage.removeItem(removeId)
        const todoArray = JSON.parse(localStorage.getItem("todo array"))
        let newTodo = todoArray.filter(n => n!== removeId)
        localStorage.setItem("todo array", JSON.stringify(newTodo))
        e.target.parentNode.remove()
    }
})

// Render main focus
const main = localStorage.getItem("focus")
if(main) {
    addMainFocus()
   
}

// Update local storage after 24 hours
const hours = 24
const now = Date.now();
let setupTime = localStorage.getItem('setupTime');
if (setupTime == null) {
     localStorage.setItem('setupTime', now)
} else if (now - setupTime > hours*60*60*1000) {
    localStorage.clear()
    localStorage.setItem('setupTime', now);
}

getImage()
getWeather()
setInterval(getCurrentTime, 1000)
getQuote()
