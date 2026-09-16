const cl=console.log;

const postContainer = document.getElementById('postContainer')
const titleControl = document.getElementById('titleControl')
const bodyControl = document.getElementById('bodyControl')
const userId = document.getElementById('userId')
const postForm = document.getElementById('postForm')
const addCardbtn = document.getElementById('addCardbtn')
const updateCardbtn = document.getElementById('updateCardbtn')

const BASE_URL = `https://jsonplaceholder.typicode.com/`
const POST_URL = `${BASE_URL}/posts`

let xhr = new XMLHttpRequest();

xhr.open("GET", POST_URL, true)
xhr.send()

xhr.onload = function(){
    if(xhr.status === 200){
        let data = JSON.parse(xhr.response)
        let result = ``;
        data.forEach(post=>{
           result += `<div class="col-md-4 mb-4" id="${post.id}">
                <div class="card h-100">
                    <div class="card-header">
                        <h3 class="m-0">${post.title}</h3>
                    </div>
                        <div class="card-body">
                            <p class="m-0">${post.body}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                            <button onclick="editCard(this)" class="btn btn-sm btn-primary">Edit</button>
                            <button onclick="removeCard(this)" class="btn btn-sm btn-danger">Remove</button>
                        </div>
                    </div>
                </div>`
            

            const postContainer = document.getElementById('postContainer')
            postContainer.innerHTML = result;
        })
    }
}


//create

function onAddcard(eve){
    eve.preventDefault()
    let postObj={
        titleControl : titleControl.value,
        bodyControl : bodyControl.value,
        userId : userId.value,
    }
    let xhr = new XMLHttpRequest();
    xhr.open("POST", POST_URL)
    xhr.send(JSON.stringify(postObj));
    
    
    xhr.onload = function (){
        if(xhr.status === 201){
            let res = JSON.parse(xhr.response)
            let col = document.createElement('div');
            col.className = 'col-md-4 mb-4'
            col.id = res.id;
            col.innerHTML = `<div class="card h-100">
                    <div class="card-header">
                        <h3 class="m-0">${postObj.titleControl}</h3>
                    </div>
                        <div class="card-body">
                            <p class="m-0">${postObj.bodyControl}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                            <button onclick="editCard(this)" class="btn btn-sm btn-primary" role="button">Edit</button>
                            <button onclick="removeCard(this)" class="btn btn-sm btn-danger"role="button">Remove</button>
                        </div>
                </div>`
            
            const postContainer = document.getElementById('postContainer')
            postContainer.prepend(col)
            postForm.reset()
        }else{
            cl(`something went wrong !!!`)
        }
    }

    Swal .fire({
        title:"card created successfully !!!",
        icon:"success",
        timer:3000
    })
}

//edit 

function editCard(ele){
    let EDIT_ID = ele.closest('.col-md-4').id;
    localStorage.setItem("EDIT_ID", EDIT_ID);
    let SINGLE_POST_URL = `${BASE_URL}/posts/${EDIT_ID}`
    let xhr = new XMLHttpRequest();
    xhr.open("GET", SINGLE_POST_URL);
    xhr.send(null);

    xhr.onload = function (){
        if(xhr.status === 200){
            let res = JSON.parse(xhr.response);
            cl(res);
            //patch data in form-controls
            titleControl.value = res.title;
            bodyControl.value = res.body;
            userId.value = res.userId;
            addCardbtn.classList.add('d-none')
            updateCardbtn.classList.remove('d-none')

        }else{
            cl(`something went wrong !!!`)
        }
    }
}

//update 

function onUpdatecard(){
    let Update_Id = localStorage.getItem("EDIT_ID");
    let update_Obj ={
        title:titleControl.value,
        body:bodyControl.value,
        userId: userId.value,
    };
    let UPDATE_URL = `${BASE_URL}/posts/${Update_Id}`
    let xhr = new XMLHttpRequest();
    xhr.open("PATCH", UPDATE_URL)

    xhr.send(JSON.stringify(update_Obj));

    xhr.onload = function(){
        if(xhr.status === 200){
            let res = JSON.parse(xhr.response)
            let col = document.getElementById(Update_Id)
            let h3 = col.querySelector(".card-header h3");
            let p = col.querySelector(".card-body p");
            h3.innerText = update_Obj.title;
            p.innerText = update_Obj.body;
            postForm.reset()
            addCardbtn.classList.remove('d-none')
            updateCardbtn.classList.add('d-none')
        }else{
            cl(`something went wrong !!!`)
        }
    }
}

//Delete 

function removeCard(ele){
    let remove_Id = ele.closest('.col-md-4').id;
    //REMOVE_URL
    let REMOVE_URL = `${BASE_URL}/posts/${remove_Id}`;
    //XHR
    let xhr = new XMLHttpRequest()
    //XHR.open
    xhr.open("DELETE", REMOVE_URL)
    //XHE.onload
    xhr.onload =  function (){
        if(xhr.status === 200){
            let res = JSON.parse(xhr.response)
            cl(res)
            ele.closest('.col-md-4').remove()

            Swal .fire({
                title:"Card deleted successfully !!!",
                icon:"success",
                timer:3000
            })
        }
    }
    xhr.send(null)   

    //XHR send
}


postForm.addEventListener('submit', onAddcard)
updateCardbtn.addEventListener("click", onUpdatecard)