// Local array buat nyimpen data todo
let todos = [];

// --- Validasi form input ---
function validateForm(task, date) {
  return task.trim() !== "" && date !== "";
}

// --- Render semua todo ke layar ---
function renderTodos(filter = "all") {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";

  let filteredTodos = todos;

  // filter logic
  if (filter === "today") {
    let now = new Date();
  if (now.getHours() < 4) {
  now.setDate(now.getDate() - 1);
}
  let today = now.toISOString().split("T")[0];
  } else if (filter === "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  } else if (filter === "pending") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  }

  if (filteredTodos.length === 0) {
    list.innerHTML = "<li>No Todos Available</li>";
    return;
  }

  // buat setiap todo ke dalam li nya
filteredTodos.forEach((todo, index) => {
  const li = document.createElement("li");
  li.className =
    "flex justify-between items-center bg-white text-black p-3 mb-2 rounded shadow";

  const taskSpan = document.createElement("span");
  taskSpan.textContent = todo.task;

  const dateSpan = document.createElement("span");
  dateSpan.textContent = todo.dueDate;

  // Tombol Done
  const completeBtn = document.createElement("button");
  completeBtn.textContent = todo.completed ? "🔙 Undo" : "✅ Done";
  completeBtn.className =
    "bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700";
  completeBtn.addEventListener("click", () => toggleComplete(index));

  // Tombol Delete
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className =
    "bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700";
  deleteBtn.addEventListener("click", () => deleteTodo(index));

  // Bungkus tombol dalam span
  const btnGroup = document.createElement("span");
  btnGroup.appendChild(completeBtn);
  btnGroup.appendChild(deleteBtn);

  // Tambahkan semua ke li
  li.appendChild(taskSpan);
  li.appendChild(dateSpan);
  li.appendChild(btnGroup);

  // Kalau completed, kasih efek line-through
  if (todo.completed) {
    taskSpan.classList.add("line-through", "text-gray-400");
  }

  list.appendChild(li);
});
}

// --- Tambah todo ---
function addTodo() {
  const task = document.getElementById("task").value;
  const date = document.getElementById("date").value;

  if (!validateForm(task, date)) {
    alert("⚠ Ayo Kawan Isi Dulu");
    return;
  }

  todos.push({
    task: task,
    dueDate: date,
    completed: false,
  });

  document.getElementById("task").value = "";
  document.getElementById("date").value = "";

  renderTodos();
}

// --- Hapus satu todoooooo ---
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

// --- Tandai todo selesai cuy / belum ---
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

// --- Hapus semua todonye ---
function clearAll() {
  if (confirm("Yakin Mau Di hapus, Ini gak akan balik lagi, kayak mantan kamu😥")) {
    todos = [];
    renderTodos();
  }
}

// --- Event listener utama ---
document
  .getElementById("todo-list-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    addTodo();
  });

document.getElementById("clear-all-btn").addEventListener("click", clearAll);

document
  .getElementById("filter-options")
  .addEventListener("change", function () {
    renderTodos(this.value);
  });

// Render awal
renderTodos();