const postBtn = document.querySelector(".createPost button");
const postInput = document.querySelector(".createPost textarea");
const centerSection = document.querySelector(".center");

// Load Posts
window.onload = function () {

    let savedPosts =
    JSON.parse(localStorage.getItem("posts")) || [];

    savedPosts.forEach(post => {
        createPostCard(post.text, post.likes);
    });

};

// Create Post
postBtn.addEventListener("click", function () {

    let text = postInput.value.trim();

    if (text === "") {
        alert("Write something first!");
        return;
    }

    createPostCard(text, 0);

    let savedPosts =
    JSON.parse(localStorage.getItem("posts")) || [];

    savedPosts.unshift({
        text: text,
        likes: 0
    });

    localStorage.setItem(
        "posts",
        JSON.stringify(savedPosts)
    );

    postInput.value = "";

});

// Function
function createPostCard(text, likes) {

    const post = document.createElement("div");

    post.classList.add("post");

    post.innerHTML = `

    <div class="postTop">

        <img src="https://i.pravatar.cc/50?img=12">

        <div>

            <h4>Sanskriti</h4>

            <p>Just Now</p>

        </div>

    </div>

    <p class="postText">
        ${text}
    </p>

    <div class="postActions">

        <span class="likeBtn">
            ❤️ <span class="count">${likes}</span>
        </span>

        <span>
            💬 Comment
        </span>

        <span>
            🔄 Share
        </span>

    </div>

    `;

    centerSection.insertBefore(
        post,
        centerSection.children[1]
    );

    let likeBtn =
    post.querySelector(".likeBtn");

    let count =
    post.querySelector(".count");

    likeBtn.addEventListener("click", function () {

        let current =
        parseInt(count.innerText);

        current++;

        count.innerText = current;

    });

}
document.querySelectorAll(".likeBtn").forEach(btn => {

    btn.addEventListener("click", () => {

        let count = btn.querySelector(".count");

        let current = parseInt(count.innerText);

        count.innerText = current + 1;

    });

});
document.querySelectorAll(".commentBtn").forEach(btn => {

    btn.addEventListener("click", () => {

        let comment = prompt("Enter your comment:");

        if(comment){

            const post =
            btn.closest(".post");

            const commentBox =
            document.createElement("p");

            commentBox.innerHTML =
            "💬 " + comment;

            commentBox.style.marginTop = "10px";

            commentBox.style.color = "#ff4f9a";

            post.appendChild(commentBox);

        }

    });

});
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {

    let confirmLogout = confirm("Do you want to logout?");

    if(confirmLogout){
        alert("Logged Out Successfully");
        location.reload();
    }

});
const profileImg = document.querySelector(".navIcons img");
const profilePopup = document.getElementById("profilePopup");
const closePopup = document.getElementById("closePopup");

profileImg.addEventListener("click", () => {
    profilePopup.style.display = "flex";
});

closePopup.addEventListener("click", () => {
    profilePopup.style.display = "none";
});
const searchInput =
document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {

    let value =
    searchInput.value.toLowerCase();

    let posts =
    document.querySelectorAll(".post");

    posts.forEach(post => {

        let text =
        post.innerText.toLowerCase();

        if(text.includes(value)){

            post.style.display = "block";

        }else{

            post.style.display = "none";

        }

    });

});
const editProfileBtn =
document.getElementById("editProfileBtn");

const usernameText =
document.getElementById("usernameText");

editProfileBtn.addEventListener("click", () => {

    let newName =
    prompt("Enter new username:");

    if(newName){

        usernameText.innerText =
        newName;

        localStorage.setItem(
            "username",
            newName
        );

    }

});

window.addEventListener("load", () => {

    let savedName =
    localStorage.getItem("username");

    if(savedName){

        usernameText.innerText =
        savedName;

    }

});
let saveBtn = post.querySelector(".saveBtn");

saveBtn.addEventListener("click", function () {

    if(saveBtn.classList.contains("saved")){

        saveBtn.classList.remove("saved");
        saveBtn.innerHTML = "🔖 Save";

    }else{

        saveBtn.classList.add("saved");
        saveBtn.innerHTML = "✅ Saved";

    }

});