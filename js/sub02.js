import hanes from "./data.js";

const indicators = document.querySelectorAll(".page_list li");
const productBox = document.querySelector(".products_box");
const itemsPerpage = 15;
let currentPage = 1;

const originHanes = [...hanes];
let filteredHanes = [...originHanes];

changePage(1);

function renderList(list) {
  productBox.innerHTML = "";

  const ul = document.createElement("ul");
  ul.className = "product_list";

  list.forEach((item) => {
    ul.innerHTML += `
    <a href="./detail.html">
    <li>
      <div class="product_img">
      <img src="${item.src}" alt="하네스 상품01" />
      <img
        src="${item.src2}"
        alt="하네스상품01"
        class="img02"
      />
        <i class="fa-solid fa-heart"></i>
      </div>
      <div class="info_text">
        <p class="product_title">
        ${item.name}
        </p>
        <div class="price_box">
          <div class="sale_box">
            <p class="original">${item.original}</p>
            <p class="sale">${item.sale}</p>
          </div>
          <div class="total_post_box">
            <p class="salePrice">${item.priceText}</p>
            <p class="post">${item.post}</p>
            <div class="star_cart">
              <div class="star_score">
                <div class="star_img">
                  <img
                    src="./images/start_icon.png"
                    alt="별 평가이미지"
                  />
                </div>
                <p class="score">${item.rate}</p>
                <p class="reviews">(${item.review})</p>
              </div>
              <div class="cartadd_img">
                <img src="./images/add_icons.png" alt="카트 아이콘" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  </a>
    `;
  });

  productBox.appendChild(ul);
}

function changePage(page) {
  currentPage = page;

  const start = (currentPage - 1) * itemsPerpage;
  const end = start + itemsPerpage;

  const pageItems = filteredHanes.slice(start, end);
  renderList(pageItems);
}

indicators.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    changePage(index + 1);
  });
});

const filterToggle = document.querySelector(".filter-toggle");
const filterList = document.querySelector(".filter-list");
const filter02 = document.querySelector(".btnSize");
const filter02_list = document.querySelector(".filter-list02");

filterToggle.addEventListener("click", () => {
  filterList.classList.toggle("open");
});


filterList.addEventListener("click", (e) => {
  if (e.target.dataset.sort) {
    sortItems(e.target.dataset.sort);
    updateFilterLabel(e.target.textContent);
    filterList.classList.remove("open");
  }
});

filter02.addEventListener("click", () => {
  filter02_list.classList.toggle("open");
});

filter02_list.addEventListener("click", (e) => {
  if (e.target.dataset.sort) {
    sortItems(e.target.dataset.sort);
    updateFilterLabel02(e.target.textContent);
    filter02_list.classList.remove("open");
  }
});

function sortItems(type) {

  filteredHanes = [...originHanes];

  if (type === "low") {
    filteredHanes.sort((a, b) => a.price - b.price);
  } else if (type === "high") {
    filteredHanes.sort((a, b) => b.price - a.price);
  } else if (type === "latest") {
    filteredHanes.sort((a, b) => b.date - a.date);
  } else if (type === "oldest") {
    filteredHanes.sort((a, b) => a.date - b.date);
  } else if (type === "star") {
    filteredHanes.sort((a, b) => b.rate - a.rate);
  } else if (type === "review") {
    filteredHanes.sort((a, b) => b.review - a.review);
  } else if (type === "big") {
    filteredHanes = filteredHanes.filter((item) => item.big === true);
  } else if (type === "sm") {
    filteredHanes = filteredHanes.filter((item) => item.sm === true);
  }

  changePage(1);
}

function updateFilterLabel(text){
  const filterLabel = document.querySelector(".filter-label");
  filterLabel.textContent = text;
}
function updateFilterLabel02(text){
  const filterLabel02 = document.querySelector(".filter-label02");
  filterLabel02.textContent = text;
}
