const cl=console.log;

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
                            <button class="btn btn-sm btn-primary">Edit</button>
                            <button class="btn btn-sm btn-danger">Remove</button>
                        </div>
                    </div>
                </div>`
            

            const postContainer = document.getElementById('postContainer')
            postContainer.innerHTML = result;
        })
    }
}