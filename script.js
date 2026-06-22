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