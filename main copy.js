let users = [
  {
    email: "ali@gmail.com",
    password: "12345678",
  },
  {
    email: "vali@gmail.com",
    password: "000000",
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
      // alert("Muvaffaqiyatli");
    }
  } else {
    alert("Wrong password");
  }
});
