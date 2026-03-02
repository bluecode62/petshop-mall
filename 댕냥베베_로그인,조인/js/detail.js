document.addEventListener("DOMContentLoaded", () => {
  // const mainImg = document.querySelector('.mainPic');
  // const thumImg = document.querySelectorAll('.subPic');

  // thumImg.forEach(img => {
  //   img.addEventListener('mouseover', function() {
  //     mainImg.src = this.src;
  //   })
  // });

  // thumImg.forEach(img => {
  //   img.addEventListener('mouseleave', function() {
  //     mainImg.src = './images/detail_main.png';
  //   })
  // });
  // 마우스 후버 효과

  const mainInImg = document.querySelector(".product_main_pic > img");
  const thumliImg = document.querySelectorAll(".product_sub_pic > li");

  for (let i in thumliImg) {
    thumliImg[i].onclick = mainBox;
  }

  function mainBox() {
    let imgSrc = this.children[0].src;
    mainInImg.setAttribute("src", imgSrc);
  }
  //클릭시 서브 이미지가 메인 이미지로 변경 효과

  let color = document.getElementById("color");
  let size = document.getElementById("size");

  color.addEventListener("change", updateChoice);
  size.addEventListener("change", updateChoice);

  function updateChoice() {
    let colorValue = color.options[color.selectedIndex].text;
    let sizeValue = size.options[size.selectedIndex].text;

    if (colorValue == color.options[2].text) {
      alert("그린은 품절이라 선택할 수 없습니다.");
      color.selectedIndex = 0;
      colorValue = color.options[0].text;
    }

    document.querySelector(".colorSize").textContent =
      "색상:" + colorValue + "/" + "사이즈:" + sizeValue;
  }
  //색상,사이즈 옵션 표현기능

  let Countoption = document.querySelector(".add_sub .countNum");
  let add = document.querySelector(".add_sub .add");
  let sub = document.querySelector(".add_sub .sub");
  let sumCount = document.querySelector(".color_size_choice .sumPrice");
  let totalNum = document.querySelector(".totalNum");
  let bigsumCount = document.querySelector(".allcountPrice .totalSum");

  let cnt = 1;
  let price = 36000;

  add.addEventListener("click", () => {
    cnt++;
    if (cnt > 10) {
      cnt = 10;
      alert(
        "최대 10개까지만 구매가능합니다. 그 이상은 전화로 문의주시기 바랍니다."
      );
    }
    Countoption.textContent = cnt;
    totalNum.textContent = cnt + "개";
    sumCount.textContent = (cnt * price).toLocaleString() + "원";
    bigsumCount.textContent = (cnt * price).toLocaleString() + "원";
  });

  sub.addEventListener("click", () => {
    cnt--;
    if (cnt == 0) {
      cnt = 1;
      alert("최소 1개부터 구매가능합니다.");
    }
    Countoption.textContent = cnt;
    totalNum.textContent = cnt + "개";
    sumCount.textContent = (cnt * price).toLocaleString() + "원";
    bigsumCount.textContent = (cnt * price).toLocaleString() + "원";
  });
  // 수량, 가격 동시 적용 효과

  const detailPageImg = document.querySelector(".product_detail_imgs ul");
  const detailBtn = document.querySelector(".detail_btn");
  let state = false;

  detailBtn.addEventListener("click", () => {
    if (state == false) {
      detailPageImg.style.height = "45600px";
      detailBtn.style.top = "45450px";
      detailBtn.innerHTML = `상품설명 접기
      <div class="arrow_down_img">
      <img src="./images/arrow_up.png" alt="위화살표 이미지" />
      </div>`;
      state = true;
    } else {
      detailBtn.style.top = "2405px";
      detailPageImg.style.height = "2487px";
      detailBtn.innerHTML = `상품설명 펼쳐보기 <div class="arrow_down_img">
              <img src="./images/arrow_down.png" alt="아래화살표 이미지" />
            </div>`;
      state = false;
    }
  });
  // 상품 상세이미지 자세히 보기 버튼 기능구현

  let filterBox = document.querySelectorAll(".kinds .label");
  let filterTxt = document.querySelectorAll(".optionList");
  let isOpen = [false, false, false];

  filterBox.forEach((filter, index) => {
    filter.addEventListener("click", () => {
      if (!isOpen[index]) {
        filterTxt[index].style.display = "block";
        isOpen[index] = true;
      } else {
        filterTxt[index].style.display = "none";
        isOpen[index] = false;
      }
    });
  });
  // 필터버튼 클릭효과 기능구현

  const pages = document.querySelectorAll(".pages_box");
  const pageBtn = document.querySelectorAll(".page_list li");

  pages[0].style.display = "block";

  pageBtn.forEach((li, idx) => {
    li.addEventListener("click", () => {
      pages.forEach((p) => (p.style.display = "none"));
      pages[idx].style.display = "block";
      pageBtn.forEach((e) => {
        e.classList.remove("on");
      });
      li.classList.add("on");
    });
  });
  // 상품후기 리스트 페이지 기능구현
  
}); //DOMContentLoaded
