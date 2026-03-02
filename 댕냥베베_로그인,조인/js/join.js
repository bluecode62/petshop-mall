document.addEventListener("DOMContentLoaded", () => {
  const id = "dnbbb2";
  //테스트용 중복아이디

  let popUp_btn = document.getElementById("popUp_btn");
  let popUp = document.querySelector(".popUp");
  let popUp_close = document.querySelector(".close");

  popUp_btn.addEventListener("click", () => {
    popUp.classList.add("active");
  });
  popUp_close.addEventListener("click", () => {
    popUp.classList.remove("active");
  });
  popUp.addEventListener("click", () => {
    popUp.classList.remove("active");
  }); 
  //팝업창 기능

  let userId = document.querySelector(".idBox");
  let userPw = document.querySelector(".pwBox");
  let idChk = document.querySelector(".idchk");
  let pwChk = document.querySelector(".pwchkBox");
  let userName = document.querySelector(".nameBox");
  let userEmail = document.querySelector(".emailBox");
  let userTel = document.querySelector(".phoneBox");
  let userHometel = document.querySelector(".homecallBox");
  let userAdress = document.querySelector(".adressBox");
  let basicAdress = document.querySelector(".basic_adress");
  let detailAdress = document.querySelector(".detail_adress");
  const petBtns = document.querySelectorAll(".dog_btn, .cat_btn");
  const genderBtn = document.querySelectorAll(".boy_btn, .girl_btn");
  let birthday = document.querySelector(".birthday");
  const cancelBtn = document.querySelector(".cancel");
  const joinAll = document.querySelector(".joinAll");

  userId.addEventListener("change", checkId);
  idChk.addEventListener("click", checkOk);
  userPw.addEventListener("change", checkPw);
  pwChk.addEventListener("change", checkDoublepw);
  userName.addEventListener("change", nameSpellchk);
  userEmail.addEventListener("change", mailChk);
  userTel.addEventListener("change", phoneChk);
  userHometel.addEventListener("change", telChk);
  birthday.addEventListener("change", birthdayDate);

  let chk01 = false;
  let chk02 = false;

  function checkId() {
    const regexId = /^[a-zA-Z][a-zA-Z0-9._-]{5,10}$/;

    if (!regexId.test(userId.value)) {
      document.querySelector(".idLog").style.color = "red";
      document.querySelector(".idLog").textContent =
        "사용할 수 없는 아이디입니다. 다시 입력해주세요.";
      userId.style.borderColor = "red";
      userId.focus();
      return;
    } else {
      document.querySelector(".idLog").style.color = "orange";
      document.querySelector(".idLog").textContent =
        "아이디 양식 확인됐습니다.";
      userId.style.borderColor = "orange";
      chk01 = true;
    }
  }
  //아이디 유효성 검사

  function checkOk() {
    if (chk01 && userId.value != id) {
      userId.style.borderColor = "orange";
      document.querySelector(".idLog").style.color = "orange";
      document.querySelector(".idLog").textContent = "사용가능한 아이디입니다.";
    } else if (userId.value === id) {
      document.querySelector(".idLog").style.color = "red";
      document.querySelector(".idLog").textContent = "중복된 아이디입니다!";
      userId.value = "";
      userId.style.borderColor = "red";
      userId.focus();
      return;
    }
  }
  //아이디 중복검색 기능

  function checkPw() {
    const regexPw =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{10,15}$/;

    if (!regexPw.test(userPw.value)) {
      document.querySelector(".pwLog").style.color = "red";
      document.querySelector(".pwLog").textContent =
        "영문, 숫자, 특수문자를 포함한 10~15자리 비밀번호를 입력해주세요.";
      userPw.style.borderColor = "red";
      userPw.focus();
      return;
    }

    document.querySelector(".pwLog").textContent = "비밀번호 확인됐습니다.";
    document.querySelector(".pwLog").style.color = "orange";
    userPw.style.borderColor = "orange";
    chk02 = true;
  }
  //비밀번호 유효성 검사

  function checkDoublepw() {
    if (chk02 && userPw.value === pwChk.value) {
      document.querySelector(".pwLog02").style.color = "orange";
      document.querySelector(".pwLog02").textContent =
        "사용가능한 비밀번호입니다.";
      userPw.style.borderWidth = "1px";
      pwChk.style.borderWidth = "3px";
      pwChk.style.borderColor = "orange";
    } else {
      document.querySelector(".pwLog02").style.color = "red";
      document.querySelector(".pwLog02").textContent =
        "비밀번호가 불일치합니다. 다시 입력해주세요.";
      pwChk.style.borderColor = "red";
      pwChk.focus();
      return;
    }
  }
  //비밀번호 확인 유효성 검사

  function nameSpellchk() {
    const regexName = /^[a-zA-Z가-힣]+( [a-zA-Z가-힣]+)*$/;

    if (!regexName.test(userName.value) || userName.value.length > 15) {
      document.querySelector(".nameLog").style.color = "red";
      document.querySelector(".nameLog").textContent =
        "한글이나 영문만 3~15자내에 입력해주세요.";
      userName.style.borderColor = "red";
      userName.focus();
      return;
    }

    userName.style.borderColor = "orange";
    document.querySelector(".nameLog").style.color = "orange";
    document.querySelector(".nameLog").textContent = "이름 확인됐습니다.";
  }
  //이름 유효성 검사

  function mailChk() {
    if (!isEmail(userEmail.value)) {
      document.querySelector(".emailLog").style.color = "red";
      document.querySelector(".emailLog").textContent =
        "이메일 형식에 따라 정확히 입력해주세요";
      userEmail.style.borderColor = "red";
      userEmail.focus();
      return;
    } else {
      userEmail.style.borderColor = "orange";
      document.querySelector(".emailLog").style.color = "orange";
      document.querySelector(".emailLog").textContent = "이메일 확인됐습니다.";
    }
  }

  function isEmail(email) {
    const regEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    return regEmail.test(email);
  }

  const emailDomainSelect = document.getElementById("email_domain");

  emailDomainSelect.addEventListener("change", function () {
    const selectedValue = this.value;

    if (selectedValue === "direct") {
      userEmail.style.borderColor = "orange";
      userEmail.focus();
      return;
    }

    if (selectedValue === "") {
      userEmail.value = "";
      return;
    }

    const id = userEmail.value.split("@")[0];
    userEmail.value = id + "@" + selectedValue;

    mailChk();
  });
  //이메일 유효성 검사

  function phoneChk() {
    const regexPhone = /^0\d{8,10}$/;

    if (!regexPhone.test(userTel.value)) {
      document.querySelector(".phoneLog").style.color = "red";
      document.querySelector(".phoneLog").textContent =
        "'-'없이 숫자만 입력해주세요";
      userTel.style.borderColor = "red";
      userTel.focus();
      return;
    } else {
      userTel.style.borderColor = "orange";
      document.querySelector(".phoneLog").style.color = "orange";
      document.querySelector(".phoneLog").textContent =
        "휴대폰번호 확인됐습니다.";
    }
  }
  //휴대폰 유효성 검사

  function telChk() {
    if (!isTelFormat(userHometel.value)) {
      document.querySelector(".telLog").style.color = "red";
      document.querySelector(".telLog").textContent = "숫자만 입력해주세요.";
      userHometel.style.borderColor = "red";
      userHometel.focus();
      return;
    } else {
      userHometel.style.borderColor = "orange";
      document.querySelector(".telLog").style.color = "orange";
      document.querySelector(".telLog").textContent = "전화번호 확인됐습니다.";
    }
  }

  function isTelFormat(tel) {
    const regexTel = /^(070|02|0[3-9]{1}[0-9]{1})[0-9]{3,4}[0-9]{4}$/;
    return regexTel.test(tel);
  }

  // 전화번호 유효성 검사

  petBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      petBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
    });
  });

  genderBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      genderBtn.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
    });
  });
  //반려동물 종류, 성별 버튼기능

  function birthdayDate() {
    const regexBirthday = /^\d{8}$/;
    const log = document.querySelector(".birthdayLog");
    const value = birthday.value.trim();

    if (!regexBirthday.test(value)) {
      log.style.color = "red";
      log.textContent = "숫자만 8자내로 입력해주세요.";
      birthday.style.borderColor = "red";
      birthday.focus();
      return;
    }
    birthday.style.borderColor = "orange";
    log.style.color = "orange";
    log.textContent = "생년월일 확인됐습니다.";
  }
  //반려동물 생년월일 유효성 검사

  cancelBtn.addEventListener("click", function () {
    let forCheck = confirm("회원가입 취소하시겠습니까?");
    if (forCheck) {
      alert("회원가입 취소됐습니다.");
      location.href = 'index.html';
    } else {
      return;
    }
  });
  //회원가입 취소기능

  joinAll.addEventListener("click", function () {
    const validateId = document.getElementById("idBox").value;
    const validatePw = document.getElementById("pwBox").value;
    const validatePw02 = document.getElementById("pwchkBox").value;
    const validateName = document.getElementById("nameBox").value;
    const validateEmail = document.getElementById("emailBox").value;
    const validatePhone = document.getElementById("phoneBox").value;
    const validateAdress = document.getElementById("postNumBox").value;

    const idInput = document.getElementById("idBox");
    const pwInput = document.getElementById("pwBox");
    const pwchkInput = document.getElementById("pwchkBox");
    const nameInput = document.getElementById("nameBox");
    const emailInput = document.getElementById("emailBox");
    const phoneInput = document.getElementById("phoneBox");
    const adressInput = document.getElementById("postNumBox");

    if (!validateId) {
      alert("아이디를 확인해주세요.");
      idInput.focus();
      idInput.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (!validatePw) {
      alert("비밀번호를 확인해주세요.");
      pwInput.focus();
      pwInput.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (!validatePw02) {
      alert("비밀번호 확인을 체크해주세요.");
      pwchkInput.focus();
      pwchkInput.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (!validateName) {
      alert("이름을 확인해주세요.");
      nameInput.focus();
      nameInput.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (!validateEmail) {
      alert("이메일을 확인해주세요.");
      emailInput.focus();
      emailInput.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (!validatePhone) {
      alert("휴대폰번호를 확인해주세요.");
      phoneInput.focus();
      phoneInput.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (!validateAdress) {
      alert("주소를 확인해주세요.");
      adressInput.focus();
      adressInput.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    chkJoin();
  });

  function chkJoin() {
    const joinChk = confirm("회원가입하시겠습니까?");
    if (joinChk) {
      alert("회원가입 완료됐습니다!");
      location.reload();
    } else {
      return;
    }
  }
  //회원가입 버튼기능
});
