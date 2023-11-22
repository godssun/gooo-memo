const form = document.querySelector(`.memo-form`);
form.addEventListener("submit", handleSubmit);

async function editMemo(e) {
  const id = e.target.dataset.id;
  const editInput = prompt("수정할 값을 입력하시오");
  const res = await fetch(`/memos/$(id)`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      content: editInput,
    }),
  });
  readMemo();
}
async function deleteMemo(e) {
  const id = e.target.dataset.id;
  const res = await fetch(`/memos/$(id)`, {
    method: "DELETE",
  });
  readMemo();
}
function displayMemo(memo) {
  const ul = document.querySelector(".memo-ul");
  const li = document.createElement("li");

  const editBtn = document.createElement("button");
  li.innerText = `[id:${memo.id}] ${memo.content}`;
  editBtn.innerText = "revise";
  editBtn.addEventListener("click", editMemo);
  editBtn.dataset.id = memo.id;

  const delBtn = document.createElement("button");
  delBtn.innerText = "Del";
  delBtn.addEventListener("click", deleteMemo);
  delBtn.dataset.id = memo.id;

  ul.appendChild(li);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
}
async function readMemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  const ul = document.querySelector(".memo-ul");
  ul.innerText = "";
  jsonRes.forEach(displayMemo);
}
async function createMemo(value) {
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date(),
      content: value,
    }),
  });
  readMemo();
}

function handleSubmit(e) {
  e.preventDefault();
  const input = document.querySelector(`.memo-input`);
  createMemo(input.value);
  input.value = "";
}

readMemo();
