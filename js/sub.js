$(function () {
  let listItem = $(".product_list");
  let labelBtn = $(".page_list label");
  let index = 0;

  listItem.hide();
  listItem.eq(0).css("display", "block");

  labelBtn.removeClass("on");
  labelBtn.eq(0).addClass("on");

  labelBtn.click(function () {
    index = $(this).index();

    // console.log(index);

    labelBtn.removeClass("on");
    labelBtn.eq(index).addClass("on");

    listItem.hide();
    listItem.eq(index).css("display", "block");
  });
  /*페이지 변경 시 리스트 변화 기능*/

  let mainPic = $(".product_img");
  let secondPic = $(".product_img .img02");

  mainPic.hover(
    function () {
      $(this).find(secondPic).css("display", "block");
    },
    function () {
      $(this).find(secondPic).css("display", "none");
    }
    /*마우스후버 시 제품사진 변화 기능*/
  );

  $(".products_box").on("mouseenter", ".product_img", function () {
    $(this).find('.img02').css("display", "block");
  });
  $('.products_box').on('mouseleave', '.product_img', function() {
    $(this).find('.img02').css('display','none');
  })
  /*페이지네이션 후버용 */
});
