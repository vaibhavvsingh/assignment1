const table = document.querySelector("table");
const token = localStorage.getItem("access_token");
const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
  input.value = "";
});

// getData
async function getData() {
  const response = await fetch(
    "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp" +
      new URLSearchParams({
        cmd: "get_customers_list",
      }),
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const data = await res.json();

  //   const data = [
  //     {
  //       uuid: "1",
  //       first_name: "John",
  //       last_name: "Doe",
  //       street: "Elvnu Street",
  //       address: "H no 2 ",
  //       city: "Delhi",
  //       state: "Delhi",
  //       email: "sam@gmail.com",
  //       phone: "12345678",
  //     },
  //     {
  //       uuid: "2",
  //       first_name: "Jane",
  //       last_name: "Doe",
  //       street: "Elvnu Street",
  //       address: "H no 2 ",
  //       city: "Delhi",
  //       state: "Delhi",
  //       email: "sam@gmail.com",
  //       phone: "12345678",
  //     },
  //   ];

  data.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${item.first_name}</td>
    <td>${item.last_name}</td>
    <td>${item.street}</td>
    <td>${item.address}</td>
    <td>${item.city}</td>
    <td>${item.state}</td>
    <td>${item.email}</td>
    <td>${item.phone}</td>
    <td>
        <button onclick="deleteCustomer('${item.uuid}')">Delete</button>
        <button id="${item.uuid}">Edit</button>
    </td>
    `;
    table.appendChild(tr);
    const updateBtn = document.getElementById(item.uuid);
    updateBtn.addEventListener("click", () => updateCustomer(item));
  });
}
getData();

// update call
function updateCustomer(item) {
  inputs[0].value = item.first_name;
  inputs[1].value = item.last_name;
  inputs[2].value = item.street;
  inputs[3].value = item.address;
  inputs[4].value = item.city;
  inputs[5].value = item.state;
  inputs[6].value = item.email;
  inputs[7].value = item.phone;

  document.getElementById("update-submit").onclick = async function () {
    const data = {
      first_name: inputs[0].value,
      last_name: inputs[1].value,
      street: inputs[2].value,
      address: inputs[3].value,
      city: inputs[4].value,
      state: inputs[5].value,
      email: inputs[6].value,
      phone: inputs[7].value,
    };
    const response = await fetch(
      "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp" +
        new URLSearchParams({
          cmd: "update",
          uuid: item.uuid,
        }),
      {
        method: "post",
        body: data,
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const result = await response.json();
    console.log(result);
  };
}

// delete call
async function deleteCustomer(uuid) {
  const response = await fetch(
    "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp" +
      new URLSearchParams({
        cmd: "delete",
        uuid: uuid,
      }),
    {
      method: "post",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  location.reload();
}
