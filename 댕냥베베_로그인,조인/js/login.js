document.addEventListener("DOMContentLoaded", () => {
  let id = "dnbb2";
  let pw = "dn88";
  let count = 5;
  let specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  let userId = document.querySelector(".idBox");
  let userPw = document.querySelector(".passBox");
  let btnLog = document.querySelector(".loginBtn");
  let logAlert = document.querySelector(".idAlert");
  let pwAlert = document.querySelector(".pwAlert");
  let chkBox = document.querySelector('.checkbox');
  let popUp_btn = document.getElementById("popUp_btn");
  let popUp = document.querySelector(".popUp");
  let popUp_close = document.querySelector(".close");
  let logOk = false;

  btnLog.addEventListener("click", () => {
    if (userId.value === id) {
      logAlert.style.display = "none";
      if (userPw.value === pw) {
        pwAlert.style.display = "none";
        alert("방문을 환영합니다!");
        logAlert.style.display = "none";
        pwAlert.style.display = "none";
        logOk = true;
      } else {
        alert("암호가 틀렸습니다.");
        pwAlert.style.display = "block";
        pwAlert.textContent = '비밀번호를 다시 작성해주세요';
        count--;
      }
    } else if (userId.value == "" && userPw.value == "") {
      alert("아이디 비밀번호를 다 작성해주시고 로그인 눌러주세요");
      userId.focus();
    } else if (specialChars.test(userId.value)) {
      alert("특수문자를 제외한 아이디를 작성해주세요.");
      userId.focus();
    } else {
      alert("존재하지 않는 아이디입니다.");
      logAlert.style.display = "block";
      count--;
    }

    if(logOk && chkBox.checked) {
      userId.textContent = id;
      userPw.value = '';
    } else if(!logOk && chkBox.checked) {
      pwAlert.textContent = '로그인해야 아이디 저장됩니다.';
    }

    if (count === 0) {
      alert("가입횟수 5회 초과했습니다. 30분 후에 다시 로그인해주세요");
      userId.disabled = true;
      userPw.disabled = true;
      setTimeout(function () {
        userId.disabled = false;
        userPw.disabled = false;
        userId.value = "";
        userPw.value = "";
        alert("30분 지나서 다시 로그인할 수 있습니다.");
        logAlert.style.display = "block";
        pwAlert.style.display = "none";
        count = 5;
      }, 3000);
    }


  });
  //로그인 기능

  popUp_btn.addEventListener("click", () => {
    popUp.classList.add("active");
  });
  popUp_close.addEventListener("click", () => {
    popUp.classList.remove("active");
  });
  popUp.addEventListener("click", () => {
    popUp.classList.remove("active");
  }); //외부배경 클릭시 닫기
  //팝업창 기능
});
