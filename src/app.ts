let pageNumber = 1
interface TableRowData {
    id: string;
    row: number;
    age: number;
    gender: string;
  }

const table = document.querySelector('table')
const tableBody = table.querySelector('tbody')
const prevBtn: HTMLButtonElement = document.querySelector("[data-prevbtn]");
const nextBtn: HTMLButtonElement = document.querySelector("[data-nextbtn]");
const pageview: HTMLButtonElement = document.querySelector("[data-pageview]");

const clearTableBody = () => document.querySelector('tbody').innerHTML = '';

const loadIntoTable = (data: TableRowData[]) => {
    var temp = "";
    data.forEach((x) => {
        temp += `<tr data-entryid=${x.id}>`;
        temp += "<td>" + x.row + "</td>";
        temp += "<td>" + x.gender + "</td>";
        temp += "<td>" + x.age + "</td>";
        temp += "</tr>"
    });
    clearTableBody();
    document.querySelector('tbody').innerHTML += temp;
    pageview.innerHTML = `Showing Page ${pageNumber}`;
}

const getData = async (pageNumber: number = 1) => {
    let url = `https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84&page=${pageNumber}`;
    let tableData: Array<TableRowData> = [];
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      tableData = data.results[0];
      return tableData

    } catch (error) {
        alert('Failed to fetch results')
    }
  };

  prevBtn?.addEventListener("click", async() => {
    if(pageNumber === 1) {
        prevBtn?.setAttribute("disabled", "true");
        return
    }
    const prevPageNumber = pageNumber
    pageNumber  = pageNumber - 1
    const newPageData = await getData(pageNumber)

        //@ts-ignore
    loadIntoTable(newPageData[pageNumber])
  });

  nextBtn?.addEventListener("click", async() => {
    const prevPageNumber = pageNumber
    pageNumber  = pageNumber + 1
    const newPageData = await getData(pageNumber)
    
    if(prevPageNumber === 1){
        prevBtn?.removeAttribute("disabled");
    }
        //@ts-ignore
    loadIntoTable(newPageData[pageNumber])
  });

const startApp = async () => {
    prevBtn?.setAttribute("disabled", "true");
    const pageOneandTwoData = await getData(pageNumber)
    const pageOneData = pageOneandTwoData[1]
    //@ts-ignore
    loadIntoTable(pageOneData)
};


document.addEventListener('DOMContentLoaded', startApp);