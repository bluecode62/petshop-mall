$(function () {
  $(".allMenu_box").click(function () {
    $(".dropMenu_box").slideToggle();
  });
  /*전체보기 슬라이딩 버튼효과*/

  $(".upMenu").click(function () {
    $("html,body").animate({ scrollTop: 0 }, 1000);
  });
  $(".downMenu").click(function () {
    $("html,body").animate({ scrollTop: $(document).height() }, 1000);
    return false;
  });
  /*탑메뉴 스크롤 이동 효과  */

  $(".main_banner ul").bxSlider({
    auto: true,
    autoControls: true,
    stopAutoOnClick: false,
    pager: true,
    slideWidth: 2000,
  });
  /*메인배너 슬라이딩 효과*/

  let color = 0;
  $(".newBest label").eq(0).addClass("on");

  $(".newBest label").click(function () {
    color = $(this).index();

    $(".newBest label").removeClass("on");
    $(".newBest label").eq(color).addClass("on");
  });

  $("#newBtn").click(function () {
    $(".newItem_box").toggle();
    $(".hotdealItem_box").hide();
  });

  $("#hotBtn").click(function () {
    $(".hotdealItem_box").toggle();
    $(".newItem_box").hide();
  });
  /*신상품,핫딜세일 교차 버튼효과 */

  let labelBtn = $(".indicator02 label");
  let cornerItem01 = $(".newItem_box ul");
  let cornerItem02 = $(".hotdealItem_box ul");
  let index = 0;

  labelBtn.eq(0).css("background-color", "#828282");
  cornerItem01.eq(0).css("display", "flex");
  cornerItem02.eq(0).css("display", "flex");

  labelBtn.click(function () {
    index = $(this).index();

    cornerItem01.css("display", "none");
    cornerItem02.css("display", "none");

    cornerItem01.eq(index).css("display", "flex");
    cornerItem02.eq(index).css("display", "flex");

    labelBtn.css("background-color", "");
    labelBtn.eq(index).css("background-color", "#828282");
  });
  /*신상품,핫딜세일 페이지 변경과 버튼색 효과 */
  let perPage01 = 4;

  $(".popular_box .item_icons ul li").eq(0).addClass("on");
  $(".popular_box .item_icons ul li img").eq(0).addClass("on");

  $(".Popular_items .items_list").hide();
  $(".Popular_items").children().eq(0).css("display", "flex");

  $(".indicator03 label").removeClass("active");
  $(".indicator03 label").eq(0).addClass("active");

  let firstList = $(".Popular_items .items_list").eq(0).find("li");

  firstList.hide();
  firstList.slice(0, perPage01).show();

  let currentCategory = 0;
  let currentPage = 0;
  let perPage = 4;

  $(".item_icons ul a").click(function () {
    currentCategory = $(this).index();

    $(".popular_box .item_icons ul li").removeClass("on");
    $(".popular_box .item_icons ul li img").removeClass("on");
    $(".popular_box .item_icons ul li").eq(currentCategory).addClass("on");
    $(".popular_box .item_icons ul li img").eq(currentCategory).addClass("on");

    $(".Popular_items .items_list").hide();
    $(".Popular_items .items_list").eq(currentCategory).toggle();

    currentPage = 0;

    let items = $(".Popular_items .items_list").eq(currentCategory).find("li");

    items.hide();
    items.slice(0, perPage).show();

    $(".indicator03 label").removeClass("active");
    $(".indicator03 label").eq(0).addClass("active");
  });

  $(".indicator03 label").click(function () {
    $(".indicator03 label").removeClass("active");

    $(this).addClass("active");

    currentPage = $(this).index();

    let items = $(".Popular_items .items_list").eq(currentCategory).find("li");

    items.hide();

    let start = currentPage * perPage;
    let end = start + perPage;

    items.slice(start, end).show();
  });
  /*인기상품 리스트, 리스트 제품페이지 변경  */

  $(".MDbest01Move").bxSlider({
    mode: "fade",
    auto: true,
    autoControls: false,
    pause: 2000,
  });

  $(".MDbottomBanner").bxSlider({
    auto: true,
    autoControls: false,
    pause: 2500,
  });
  /*MD추천 배너 슬라이드 효과  */

  let currentCategory02 = 0;
  let currentPage02 = 0;

  const bigCategory = $(".bigCategory a");
  const bigItems = $(".bigItem");
  const indicator = $(".indicator04 label");

  bigItems.hide();
  bigItems.eq(0).show();

  bigItems.eq(0).find(".bigItem_list").hide();
  bigItems.eq(0).find(".bigItem_list").eq(0).css("display", "flex");

  $(".bigCategory li").eq(0).addClass("on");
  indicator.removeClass("active");
  indicator.eq(0).addClass("active");

  bigCategory.click(function (e) {
    e.preventDefault();

    currentCategory02 = $(this).index();
    currentPage02 = 0;

    $(".bigCategory li").removeClass("on");
    $(".bigCategory li").eq(currentCategory02).addClass("on");

    bigItems.hide();
    bigItems.eq(currentCategory02).show();

    let lists = bigItems.eq(currentCategory02).find(".bigItem_list");
    lists.hide();
    lists.eq(0).css("display", "flex");

    indicator.removeClass("active");
    indicator.eq(0).addClass("active");
  });

  indicator.click(function () {
    currentPage02 = $(this).index();

    indicator.removeClass("active");
    indicator.eq(currentPage02).addClass("active");

    let lists = bigItems.eq(currentCategory02).find(".bigItem_list");

    lists.hide();
    lists.eq(currentPage02).css("display", "flex");
  });
  /*대형견 리스트, 제품리스트 변경 리펙토링  */

  let reviewList = $(".reviews_box ul");
  let labelBtn04 = $(".indicator05 label");

  reviewList.eq(0).css("display", "flex");
  labelBtn04.eq(0).css("background-color", "#828282");

  labelBtn04.click(function () {
    index = $(this).index();

    reviewList.hide();
    reviewList.eq(index).css("display", "flex");

    labelBtn04.css("background-color", "");
    labelBtn04.eq(index).css("background-color", "#828282");
  });
  /*상품후기 후기 리스트 페이지 변경  */

  $(".autoplay").slick({
    dots: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  });
  /* 상품후기 슬릭 효과  */

});
