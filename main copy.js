let users = [
  {
    email: "jahongir.developer18@gmail.com",
    password: "20041808joha",
  },
];

const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
  const user = users.find((user) => user.email === email.value);
  if (user) {
    if (user.password === password.value) {
      window.location.href = "table.html";
      alert("Muvaffaqiyatli o'tdingiz");
    }
  } else {
    alert("Wrong password");
  }
});
