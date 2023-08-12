const apiURLs = [
    "http://run.mocky.io/v3/6f7a76ed-d6f5-4b54-be23-bf9a141c982a",
    "http://run.mocky.io/v3/07316365-b8d2-4574-9bc1-22b17b054e3b",
    "http://run.mocky.io/v3/1c56213e-1191-4b47-a54f-066736165ff3",
];
const container = {
    id: "contentContainer",
    currentView: "grid",
    apiURL: "http://run.mocky.io/v3/6f7a76ed-d6f5-4b54-be23-bf9a141c982a",
};

let combinedData = [];

function switchView(view) {
    container.currentView = view;
    applyView();
}

async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
}

async function applyView() {
    const contentDiv = document.querySelector(".content-div");
    contentDiv.innerHTML = "";

    try {
        const dataArray = await Promise.all(apiURLs.map(fetchData));
        combinedData = dataArray.flatMap((data) => data);
        if (container.currentView === "grid") {
            populateGrid(combinedData);
        } else if (container.currentView === "table") {
            populateTable(combinedData);
        }
        contentDiv.style.display = "block";
    } catch (error) {
        console.error("Error fetching or populating data:", error);
    }
}

function populateGrid(data) {
    const contentDiv = document.querySelector(".content-div");
    data.forEach((item) => {
        const cardDiv = createCard(item);
        contentDiv.appendChild(cardDiv);
    });
}

function populateTable(data) {
    const contentDiv = document.querySelector(".content-div");
    const table = document.createElement("table");
    table.className = "table-view";
    const thead = createTableHeader();
    const tbody = createTableBody(data);
    table.appendChild(thead);
    table.appendChild(tbody);
    contentDiv.appendChild(table);
}

function createCard(item) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "column";
    cardDiv.innerHTML = `
        <div class="card">
            <img src="${item.image}" alt="Image Description" style="height:100px;width:100px;">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        </div>`;
    return cardDiv;
}

function createTableHeader() {
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headerCells = ["Image", "Name", "Description"].map(
        createTableHeaderCell
    );
    headerRow.append(...headerCells);
    thead.appendChild(headerRow);
    return thead;
}

function createTableHeaderCell(text) {
    const th = document.createElement("th");
    th.textContent = text;
    return th;
}

function createTableBody(data) {
    const tbody = document.createElement("tbody");
    data.forEach((item) => {
        const row = createTableRow(item);
        tbody.appendChild(row);
    });
    return tbody;
}

function createTableRow(item) {
    const row = document.createElement("tr");
    const cells = [
        createTableCell(
            `<img src="${item.image}" alt="Image Description" style="height:50px;width:50px;">`
        ),
        createTableCell(item.name),
        createTableCell(item.description),
    ];
    row.append(...cells);
    return row;
}

function createTableCell(content) {
    const td = document.createElement("td");
    td.innerHTML = content;
    return td;
}

function myFunction() {

    const searchInput = document.getElementById("mySearch");
    const query = searchInput.value.toLowerCase();

    const filteredData = combinedData.filter((item) =>
        item.name.toLowerCase().includes(query)
    );

    const contentDiv = document.querySelector(".content-div");
    contentDiv.innerHTML = "";

    if (container.currentView === "grid") {
        populateGrid(filteredData);
    } else if (container.currentView === "table") {
        populateTable(filteredData);
    }
    contentDiv.style.display = "block";
}
switchView("grid");