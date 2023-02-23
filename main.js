const position = ["ReactJs ", "Developer", "NodeJs Developer", "Go Developer"];
const groups = ["Junior", "Middle", "Senior"];

let pupilsJson = localStorage.getItem("pupils");
let pupils = JSON.parse(pupilsJson) ?? [];

// let pupils = [
//   {
//     id: 0,
//     firstName: "Muhammadamin",
//     lastName: "Ahmadjonov",
//     group: "N102",
//     isWork: false,
//   },
//   {
//     id: 1,
//     firstName: "Jahongir",
//     lastName: "Ahtamov",
//     group: "N122",
//     isWork: true,
//   },
// ];

const pupilTable = document.getElementById("pupilTable");
const pupilForm = document.getElementById("pupilForm");
const sendBtn = document.getElementById("sendBtn");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const pupilAdress = document.getElementById("address");
const pupilBirthDate = document.getElementById("birthdate");
const pupilPosition = document.getElementById("pupilPosition");
const pupilSalary = document.getElementById("salary");
const pupilGroup = document.getElementById("pupilGroup");
const pupilCheckWork = document.getElementById("pupilCheckWork");
const formModal = document.querySelector(".modal");
const searchInput = document.getElementById("search");
const filterGroup = document.getElementById("filterGroup");

let selected = null;

const getRow = ({
  id,
  firstName,
  lastName,
  address,
  birthdate,
  position,
  group,
  salary,
  isWork,
}) => {
  return `
    <tr>
      <th scope="row">${id}</th>
      <td>${firstName}</td>
      <td>${lastName}</td>
      <td>${address}</td>
      <td>${birthdate}</td>
      <td>${position}</td>
      <td>${group}</td>
      <td>${salary}$</td>
      <td>${isWork ? "Ha" : "Yo'q"}</td>
      <td class="text-end">
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#pupilModal" onclick="editPupil(${id})">Edit</button>
        <button class="btn btn-danger" onclick="deletePupil(${id})">Delete</button>
      </td>
      </tr>
      `;
};

groups.forEach((group) => {
  pupilGroup.innerHTML += `<option value="${group}">${group}</option>`;
});

position.forEach((positions) => {
  pupilPosition.innerHTML += `<option value="${positions}">${positions}</option>`;
});

["Barchasi", ...groups].forEach((group) => {
  filterGroup.innerHTML += `<option value="${group}">${group}</option>`;
});

const getPupils = (newPupils) => {
  pupilTable.innerHTML = "";
  (newPupils || pupils).forEach((pupil) => {
    pupilTable.innerHTML += getRow(pupil);
  });
};

getPupils();

pupilForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let check = this.checkValidity();
  this.classList.add("was-validated");
  if (check) {
    bootstrap.Modal.getInstance(formModal).hide();
    let newPupil = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: pupilAdress.value,
      birthdate: pupilBirthDate.value,
      position: pupilPosition.value,
      group: pupilGroup.value,
      salary: pupilSalary.value,
      isWork: pupilCheckWork.checked,
    };
    if (selected) {
      pupils = pupils.map((pupil) => {
        if (pupil.id == selected.id) {
          return {
            id: selected.id,
            ...newPupil,
          };
        } else {
          return pupil;
        }
      });
    } else {
      newPupil.id = pupils.length;
      pupils.push(newPupil);
    }
    localStorage.setItem("pupils", JSON.stringify(pupils));
    window.location.reload(); // bo'shatish uchun
  }
  getPupils();
});

function editPupil(id) {
  let pupil = pupils.find((pupil) => pupil.id == id);
  selected = pupil;
  firstName.value = pupil.firstName;
  lastName.value = pupil.lastName;
  pupilAdress.value = pupil.address;
  pupilBirthDate.value = pupil.birthdate;
  pupilPosition.value = pupil.position;
  pupilGroup.value = pupil.group;
  pupilSalary.value = pupil.salary;
  pupilCheckWork.checked = pupil.isWork;
}

function deletePupil(id) {
  let isConfirm = confirm("O'chirishni xohlaysizmi ?");
  if (isConfirm) {
    pupils = pupils.filter((pupil) => pupil.id != id);
    localStorage.setItem("pupils", JSON.stringify(pupils));
    getPupils();
  }
}

searchInput.addEventListener("input", function () {
  let search = this.value.toLowerCase();
  searchPupils = pupils.filter(
    (pupil) =>
      pupil.firstName.toLowerCase().includes(search) ||
      pupil.lastName.toLowerCase().includes(search)
  );
  getPupils(searchPupils);
});

filterGroup.addEventListener("change", function () {
  if (this.value == "Barchasi") {
    getPupils();
  } else {
    filterPupils = pupils.filter((pupil) => pupil.group == this.value);
    getPupils(filterPupils);
  }
});
