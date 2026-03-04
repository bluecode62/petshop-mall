# 🐶 펫쇼핑몰 댕냥베베(PC)

## 🛠 사용 기술
- HTML5
- CSS3
- JavaScript
- Jquery
- Slick

## 📂 페이지 구성
- 메인 페이지
- 상품 리스트 서브 페이지
- 상품 상세 디테일 페이지

## ✨ 주요 기능
1. 페이지네이션 구현
2. 필터링 정렬 기능
3. 수량제한/개수가격
4. 리뷰&문의 작성
5. 로그인/회원가입





<h1>페이지네이션</h1><br />


<img width="500" height="880" alt="Image" src="https://github.com/user-attachments/assets/a85c61a6-0044-4676-836f-99fbe30c852c" /><br />
<img width="552" height="172" alt="Image" src="https://github.com/user-attachments/assets/9c94d4e7-3400-43f2-ab12-b4a26a94aa83" /><br />

상품 리스트는 data.js에서 관리하며,
추후 필터링·정렬 기능 확장을 고려한 구조로 설계했습니다.

페이지네이션 구현을 위해 다음 상태값을 정의했습니다.

<b>indicators</b> : 페이지 이동 버튼 요소

<b>productBox</b> : 상품 리스트 렌더링 영역

<b>itemsPerPage</b> : 한 페이지당 노출 상품 수 (15개)

<b>currentPage</b> : 현재 페이지 상태값 (초기값 1)

📌 데이터 관리
<b>originHanes</b>
→ 원본 데이터(리스트 상품) 보존

<b>filteredHanes</b>
→ 필터링/정렬 후 변경되는 데이터 관리

<b>currentPage</b>
→ 현재 페이지 상태

원본 데이터를 직접 수정하지 않고 복사본을 관리함으로써<br />
정렬, 필터 기능이 추가되더라도<br />
데이터 무결성을 유지할 수 있도록 설계했습니다.<br />


<img width="584" height="1076" alt="Image" src="https://github.com/user-attachments/assets/16341cab-c83a-4ab3-9bd9-69ec19f23ad6" /><br />
<h5>상품 리스트 렌더링 함수</h5>

renderList 함수는 페이지네이션을 통해 전달받은 상품 배열을 기반으로<br />
상품 리스트 DOM을 동적으로 생성하는 역할.<br />

기존 리스트 초기화 (innerHTML = "")<br />
ul위주로 각 페이지 마다 요소 동적 생성<br />
전달받은 배열을 순회하며 상품 카드이미지 생성<br />
최종적으로 부모태그인 productBox에 append로 추가<br />

데이터 처리 로직과 UI 렌더링 로직을 분리하여<br />
기능 확장 시 유지보수성을 고려한 구조로 설계했습니다.<br />

<img width="452" height="176" alt="Image" src="https://github.com/user-attachments/assets/aed2b94c-2bff-4767-98fb-ff61402ab49e" /><br />
<h5>페이지 변경 로직 함수</h5>

changePage 함수는 페이지 이동 시 현재 페이지 상태를 변경하고,<br />
해당 페이지에 맞는 데이터 구간만 추출하여 렌더링하는 역할<br />
currentPage 상태값을 받은 값인 page로 업데이트<br />
배열 인덱스가 0부터 시작하는 점을 고려해 (page - 1) * itemsPerPage로 시작 인덱스 계산<br />
다음 페이지로 변경할 때마다 15개씩 렌더링하는 식으로 설정<br />
15개씩 시작하는 start와 15개까지임을 끝내는 end를 slice()를 활용해 필요한 구간의 데이터만 추출<br />
추출된 데이터를 renderList()에 전달하여 렌더링하는 식으로 페이지 변경 시 항상 동일한 개수(15개)의 상품이 노출되도록 설계했습니다.<br />

<img width="344" height="200" alt="Image" src="https://github.com/user-attachments/assets/64c071be-7996-43a3-bd35-f0156ddd0a34" /><br />
<h5>초기 페이지 렌더링</h5>

페이지 로드 시 changePage(1)을 먼저 호출하여<br />
첫 번째 페이지가 즉시 렌더링되도록 구성했습니다.<br />
별도의 조건문 없이도 초기 화면과 페이지 이동 로직을 동일한 흐름으로 처리할 수 있도록 설계했습니다.<br />

<img width="452" height="176" alt="Image" src="https://github.com/user-attachments/assets/aed2b94c-2bff-4767-98fb-ff61402ab49e" /><br />
<h5>페이지 버튼 이벤트 처리</h5>

각 페이지 버튼에 클릭 이벤트를 등록하여 해당 인덱스를 기반으로 changePage(index + 1)을 호출하도록 구현했습니다.<br />
버튼의 index 값을 활용해 페이지 번호 계산<br />
페이지 이동 로직을 changePage 함수 하나로 통합<br />
이벤트 처리와 데이터 처리 로직을 분리하여 구조를 단순화<br />

페이지 이동 방식이 변경되더라도 changePage 함수만 재사용 가능하도록 설계했고,<br />
페이지 이동 로직을 하나의 함수로 모아 유지보수성과 확장성을 고려했습니다.<br />

<h1>필터링 정렬 기능</h1><br />

<img width="539" height="562" alt="Image" src="https://github.com/user-attachments/assets/c91a892e-ab01-4011-b4c6-ec34d656d269" />><br />
<h5>필터링 기능 구현(1)</h5>

상품 리스트를 가격순,리뷰순,별점순, 기간순, 사이즈 등 조건별로 필터링할 수 있도록 구현한 로직<br />
각 필터 버튼(.filter-toggle, .btnSize) 클릭 시 필터 목록을 열거나 닫음<br />
목록 내 항목 클릭 시 선택한 옵션(data-sort)에 따라 정렬 또는 필터 적용<br />
선택 후에는 필터 라벨을 업데이트하고 목록을 자동으로 닫아 UX를 개선<br />

두 개 이상의 필터 그룹을 동일한 구조로 구현하여 재사용성을 높였습니다.<br />


<img width="595" height="462" alt="Image" src="https://github.com/user-attachments/assets/b5600b15-4127-4941-9b17-c8e376a285cd" />><br />
<h5>필터링 기능 구현(2)</h5>

원본 데이터를 복사하여(filteredHanes = [...originHanes])<br />
정렬이나 필터링 시 데이터 무결성을 유지<br />
가격, 날짜, 평점, 리뷰 등 기준에 따라 배열을 정렬<br />
사이즈 필터(big, sm)는 조건에 맞는 항목만 남기도록 필터링<br />
필터/정렬 적용 후에는 항상 첫 페이지(changePage(1))를 렌더링<br />

데이터 처리 로직과 UI 렌더링을 분리하여 필터, 정렬, 페이지네이션 기능이 서로 영향을 최소화하도록 설계했습니다.<br />

<img width="565" height="155" alt="Image" src="https://github.com/user-attachments/assets/18f005a2-46b4-475b-b91a-2eaa157a724e" /><br />
<h5>필터명 변경</h5>

필터 선택 시 현재 선택된 옵션을 화면에 표시하도록 updateFilterLabel() 함수를 구현해 UX를 개선했습니다.<br />



<h1>수량제한/개수가격</h1><br />

<img width="523" height="387" alt="Image" src="https://github.com/user-attachments/assets/31e7ee1b-2035-4ee2-a08f-01ebcf65e346" /><br />
<h5>색상/사이즈 선택 제한</h5>

사용자가 색상과 사이즈를 선택하면 updateChoice() 함수에서 화면에 표시<br />
특정 색상(예: 그린)이 품절일 경우 선택 불가 처리 후 알림 표시<br />
선택한 옵션은 .colorSize 영역에 “색상:XX / 사이즈:XX” 형식으로 표시<br />

UX 관점에서 선택 불가 옵션 알림 + 화면 표시를 동시에 구현하여<br />
사용자가 현재 선택 상태를 바로 확인하도록 설계했습니다.

<img width="598" height="687" alt="Image" src="https://github.com/user-attachments/assets/33be0f64-f606-445e-8351-f9623bca5370" /><br />
<h5>수량 제한 및 가격 계산</h5>

수량 버튼(+ / -) 클릭 시 cnt 변수 업데이트<br />
최소 수량 1개, 최대 수량 10개로 제한 후 알림 표시<br />
수량 변경 시, 개별 상품 금액과 총 금액을 동시에 계산하여 화면에 표시<br />

색상·사이즈 선택 시 품절 옵션을 제한하고, 수량 변경에 따라 가격이 실시간으로 업데이트되도록 구현했습니다.<br />
최소/최대 수량 제한, 선택한 옵션 표시 등 UX를 고려한 쇼핑몰 핵심 기능을 경험했습니다.



<h1>리뷰 작성 & 표시 기능</h1>
<img width="528" height="377" alt="Image" src="https://github.com/user-attachments/assets/c2234c70-4ee7-4283-adba-35519d006942" /><br />
<h5>리뷰 작성 폼 토글</h5>

작성하기 버튼 클릭 시 폼 열기/닫기 토글<br />
폼 닫을 때는 입력한 내용 초기화<br />
버튼 텍스트를 작성하기 ↔ 취소하기로 변경하여 직관적 UX 제공<br />

<img width="609" height="732" alt="review02" src="https://github.com/user-attachments/assets/ad3c25b7-ec50-4cd0-ada9-468579ae1ee6" /><br />
<h5>리뷰 제출</h5>

필수 항목(작성자, 내용, 평점) 확인 후 유효성 검사<br />
입력된 정보로 리뷰 객체를 생성 (name, title, text, rating, option, date)<br />
로컬 스토리지에 저장하고 즉시 화면에 렌더링<br />
폼 초기화로 다음 리뷰를 새로작성 준비<br />

<img width="632" height="1339" alt="review03" src="https://github.com/user-attachments/assets/844ef168-9939-45bb-96ab-b6d439614253" /><br />
<h5>리뷰 렌더링</h5>

로컬 스토리지에 저장된 리뷰 목록을 가져와 .dynamic_reviews 컨테이너에 표시<br />
별점, 구매 옵션, 작성자, 작성일 등 주요 정보 표시, 이미지는 임시 이미지로 대신 표시<br />
좋아요, 댓글, 신고 버튼 UI 포함<br />

UI 토글, 폼 처리, 데이터 저장, 렌더링 기능을 각각 함수로 분리<br />
로컬 스토리지 사용으로 새로고침 후에도 리뷰 유지<br />
사용자 입력과 화면 표시를 독립적으로 관리하여 유지보수성을 높였습니다.<br />

상품 상세 페이지에서 사용자가 리뷰를 작성하고 즉시 확인할 수 있도록 구현했습니다.<br />
작성 폼 토글, 유효성 검사, 로컬 스토리지 저장, 별점/구매 옵션 표시 등 UX를 고려한 리뷰 기능을 설계했습니다.<br />


<h1>문의글 작성 기능</h1>
<img width="600" height="360" alt="Q A01" src="https://github.com/user-attachments/assets/1f67ca6c-b231-42d4-befa-a51ea26f94b5" /><br />
<h5>문의 폼 토글</h5>

“상품문의” or "1:1문의" 버튼 클릭 시 폼 열기/닫기 토글<br />
폼 닫을 때는 입력한 내용 초기화<br />

<img width="628" height="639" alt="Q A02" src="https://github.com/user-attachments/assets/c9809590-97e4-4f4f-ab99-c61dc8fbb588" /><br />
<h5>문의 제출</h5>

필수 항목(작성자, 제목) 확인 후 유효성 검사<br />
비밀글 여부(secret) 선택 가능과 자물쇠 아이콘 표현<br />
입력된 정보로 문의 객체 생성 (name, title, secret, date)<br />
로컬 스토리지에 저장하고 즉시 화면에 렌더링<br />
폼 초기화로 다음 문의 새로작성 준비<br />

<img width="670" height="499" alt="Q A03" src="https://github.com/user-attachments/assets/eff0a315-a9fd-4f81-9063-5e19a64dcc0f" /><br />
<h5>문의 렌더링</h5>

로컬 스토리지에 저장된 문의글을 .questionList 컨테이너에 표시<br />
제목, 작성자, 작성일, 비밀글 여부 표시<br />
비밀글은 “비밀글입니다” + 자물쇠 아이콘으로 표시<br />

상품 상세 페이지에서 사용자가 문의글을 작성하고 확인할 수 있도록 구현했습니다. <br />
작성 폼 토글, 필수 항목 유효성 검사, 비밀글 처리, 로컬 스토리지 저장, 목록 렌더링 등 UX를 고려한 문의 기능을 설계했습니다.<br />


<h1>로그인</h1>
<img width="553" height="290" alt="login01" src="https://github.com/user-attachments/assets/47c8f1e8-fce0-4f3b-a826-cb358f40f1af" /><br />

id, pw → 로그인 기능 테스트용 임시 계정<br />
count → 로그인 시도 횟수 제한을 위해 초기값 5회 설정<br />
specialChars → 아이디 입력 시 특수문자 체크용 정규식<br />
userId, userPw, btnLog → 로그인 폼 요소 DOM 참조<br />
logAlert, pwAlert → 아이디/비밀번호 오류 안내 메시지 DOM 참조<br />
chkBox → “아이디 저장” 체크박스 DOM 참조<br />
logOk → 로그인 성공 여부 상태 관리<br />

테스트용 계정, 입력 검증, UI 요소 참조, 상태 관리를 미리 선언하여<br />
로그인 로직에서 각각의 역할을 명확하게 구분하고 유지보수성을 높였습니다.

<img width="471" height="647" alt="login02" src="https://github.com/user-attachments/assets/a793a522-0755-404f-ba6a-b7cf11a43080" /><br />

입력한 아이디와 비밀번호를 확인하여 로그인 처리<br />
아이디/비밀번호 일치 시 → 환영 알림 표시, 로그인 상태(logOk) 업데이트<br />
비밀번호만 틀릴 경우 → 오류 안내 메시지 표시, 재입력 유도<br /><br />
아이디 또는 비밀번호 미작성 시 → 입력을 요청하는 안내 표시<br /><br />
존재하지 않는 아이디 입력 시 → 오류 메시지 표시 및 로그인 횟수 차감<br />
입력값 검증과 알림 표시를 통해 직관적이고 안전한 로그인 흐름을 제공<br />


<img width="508" height="351" alt="login02-01" src="https://github.com/user-attachments/assets/ad3c3752-e8d2-40a9-9ef4-aac3bbb732a0" /><br />
로그인 횟수 다 소진 시 disable로 아이디,비번작성이 비활성화됩니다.<br />
안내상 30분이지만 빠른 테스트 확인을 위해 3초로 설정했습니다.<br />

<img width="470" height="137" alt="login02-02" src="https://github.com/user-attachments/assets/4fc66edd-1b09-4281-92d1-bae6075a1eb0" /><br />
아이디 저장박스를 체크하고 로그인하면, 로그인 성공 시 아이디가 화면에 자동으로 표시되도록 구현했습니다.<br />
비밀번호는 저장하지 않고, 로그인하지 않은 상태에서는 안내 메시지를 통해 사용자에게 알려주도록 설계했습니다.<br />

로그인 페이지에서는 테스트용 임시 계정(id: dnbb2, pw: dn88)으로 기능 확인이 가능하며,<br />
입력된 아이디와 비밀번호를 검증하여 로그인 성공 시 환영 알림창을 표시하고,<br />
비밀번호 오류나 존재하지 않는 아이디 입력, 미작성 입력 등의 경우를 처리하여 직관적인 사용자 피드백을 제공합니다.<br />

또한 아이디 저장 체크박스를 선택한 상태에서 로그인 성공 시 아이디만 자동으로 표시되도록 구현했습니다.<br />
로그인하지 않은 상태에서는 안내창을 표시해 사용자가 상태를 쉽게 이해하도록 했으며, 비밀번호는 저장하지 않아 보안을 유지했습니다.<br /> 
로그인 시도 횟수를 제한하고, 초과 시 일정 시간 잠금 처리하는 기능까지 포함하여 실무 쇼핑몰과 유사한 로그인 흐름을 경험할 수 있도록 구성했습니다.<br />

<h1>회원가입</h1>
<img width="582" height="555" alt="join01" src="https://github.com/user-attachments/assets/54bd1f97-c42e-4d0f-9fe1-035ee4101041" /><br />
<h5>회원가입 변수 및 이벤트 선언</h5>

테스트용 아이디: const id = "dnbbb2" → 중복 체크용 임시 데이터<br />
폼 입력 요소 DOM 참조:<br />
userId(아이디), userPw(비밀번호), userName(성명), userEmail(이메일), userTel(휴대번호), userHometel(자택번호), birthday(생년월일) 등<br />
검증/확인 버튼 요소: idChk(아이디 확인), pwChk(비밀번호 확인), cancelBtn(취소버튼), joinAll(회원정보 확인)<br />
옵션 버튼 그룹: petBtns(강아지/고양이), genderBtn(남/여)<br />
각 입력 요소에 change 이벤트 등록 → 값 변경 시 검증 함수 호출<br />
상태 변수: chk01(아이디 중복확인), chk02(비밀번호 확인) → 아이디 중복, 비밀번호 2차 확인용<br />

<h5>아이디 유효성 검사</h5>
<img width="501" height="292" alt="join02" src="https://github.com/user-attachments/assets/5665f68f-5c78-483b-ba34-a455ce6537a5" /><br />

regxId 정규식 활용: 영문 대소문자 시작, 5~10자 영문·숫자·특수문자(. _ -) 조합만 허용<br />
사용자가 입력한 값이 정규식과 일치하는지 확인<br />
불일치 시 → 아이디 입력 박스 테두리를 빨간색으로 표시<br />
안내 메시지("사용할 수 없는 아이디입니다. 다시 입력해주세요.") 표시<br />
입력에 포커스 유지하여 재입력 유도<br />
일치 시 → chk01 = true로 상태 업데이트<br />

아이디 입력 시 정규식을 통해 유효성을 검사하고, 조건에 맞지 않으면 빨간 테두리와 안내 문구로 사용자에게 즉각적인 피드백을 제공하도록 구현했습니다.<br /> 
조건을 만족하면 상태 변수를 통해 가입 진행 가능 여부를 관리하도록 설계했습니다.<br />

<h5>아이디 중복 확인 기능</h5>
<img width="594" height="284" alt="join03" src="https://github.com/user-attachments/assets/5480b00c-9ddf-4751-bc70-f324be4799d2" /><br /> 

상태와 값 확인: 아이디 유효성 검사에서 업데이트된 chk01 상태와 입력값을 함께 확인<br /> 
유효성 검사를 통과하고, 기존 테스트용 아이디(id)와 다른 경우 → 사용 가능 표시<br /> 
테두리 색상: 오렌지<br /> 
안내 메시지: "사용가능한 아이디입니다."<br /> 

기존 아이디와 동일한 경우 → 중복 표시<br /> 
테두리 색상: 빨간색<br /> 
안내 메시지: "중복된 아이디입니다!"<br /> 
-> 입력값 초기화 및 포커스 유지<br /> 

아이디 입력 후 중복 확인 버튼 클릭 시, 기존 테스트 계정과 비교하여 중복 여부를 판단하도록 구현했습니다.<br /> 
사용 가능 시 오렌지색 테두리와 안내 메시지를 표시하고, 중복일 경우 입력값을 초기화하며 빨간색 테두리와 메시지로 즉각적인 피드백을 제공하여 사용자 경험을 개선했습니다.<br /> 

<h5>비밀번호 유효성 검사</h5>
<img width="653" height="363" alt="join04" src="https://github.com/user-attachments/assets/d92a9452-325d-480f-9d5b-a62e8a873379" /><br /> 

/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{10,15}$/ 
=>정규식 해설
--------------------
^ → 문자열 시작<br /> 
(?=.*[a-zA-Z]) → 영문자 최소 1개 포함<br /> 
(?=.*\d) → 숫자 최소 1개 포함<br /> 
(?=.*[!@#$%^&*()]) → 특수문자 최소 1개 포함<br /> 
[a-zA-Z\d!@#$%^&*()]{10,15} → 영문/숫자/특수문자 조합 10~15자리<br /> 
$ → 문자열 끝<br /> 
-----------------------
👉 영문 + 숫자 + 특수문자를 모두 포함한 10~15자리 비밀번호만 허용하도록 설계했습니다.

입력값이 정규식 조건을 만족하지 않으면:<br /> 

 "영문, 숫자, 특수문자를 포함한 10~15자리 비밀번호를 입력해주세요." 안내 문구를 빨간색으로 표시<br /> 
입력창 테두리를 빨간색으로 변경<br /> 
포커스를 유지하여 재입력 유도<br /> 

조건을 만족하면:<br /> 

"비밀번호 확인됐습니다." 메시지 표시<br /> 
테두리 색상을 오렌지색으로 변경<br /> 
chk02 = true로 상태값 업데이트<br /> 

비밀번호는 정규식을 활용하여 영문, 숫자, 특수문자를 각각 최소 1개 이상 포함하고 10~15자리로 구성되도록 제한했습니다.<br />  
조건을 충족하지 않을 경우 시각적 피드백(테두리 색상 변경, 안내 문구 표시)을 통해 사용자에게 즉각적인 오류 안내를 제공하였으며,<br /> 
통과 시에는 상태값을 업데이트하여 회원가입 진행 여부를 관리하도록 구현했습니다.<br /> 


<h5>비밀번호 재확인(일치 여부) 검사</h5>
<img width="553" height="351" alt="join05" src="https://github.com/user-attachments/assets/beb3ecb6-44f4-4a0e-ae9b-6c6e005efb68" /><br /> 

1차 비밀번호 유효성 검사에서 통과한 상태값 chk02를 기반으로<br /> 
사용자가 입력한 비밀번호와 재입력 값이 일치하는지 한 번 더 확인<br /> 

*통과조건<br /> 
chk02 === true (1차 정규식 통과 상태)<br /> 
userPw.value === pwChk.value (비밀번호와 재입력 값 동일)<br /> 

위 두 조건을 모두 만족하면:<br /> 

"사용가능한 비밀번호입니다." 메시지 표시<br /> 
재입력 input 테두리를 오렌지색으로 변경<br /> 
시각적으로 정상 입력임을 안내<br /> 

반대로 값이 다르거나 1차 검증을 통과하지 못한 경우:<br /> 

"비밀번호가 불일치합니다. 다시 입력해주세요." 메시지 표시<br /> 
테두리를 빨간색으로 변경<br /> 
포커스를 재입력 칸으로 이동하여 수정 유도<br /> 

1차 정규식 검사를 통과한 상태(chk02)를 기반으로, 비밀번호 재입력 값과의 일치 여부를 한 번 더 확인하도록 구현했습니다.<br /> 
불일치 시 즉각적인 시각적 피드백과 포커스 이동을 통해 사용자 수정 흐름을 자연스럽게 유도했으며,<br /> 
일치 시에는 성공 메시지와 스타일 변화를 통해 명확한 피드백을 제공했습니다.<br /> 

<h5>이름 유효성 검사</h5>
<img width="611" height="326" alt="join06" src="https://github.com/user-attachments/assets/d71ecc7f-1443-4051-b976-735c6215a61f" /><br /> 

/^[a-zA-Z가-힣]+( [a-zA-Z가-힣]+)*$/
=>정규식 해설
---------------------------------------------------
[a-zA-Z가-힣]+ → 영문 대소문자 또는 한글을 1자 이상 허용
( [a-zA-Z가-힣]+)* → 공백 + 영문/한글 조합을 0번 이상 허용
즉, 이름 사이 공백 허용 (예: Bae Yun Ju)
$ → 문자열 끝
---------------------------------------------------
👉 한글 또는 영문만 입력 가능하며 이름 사이 공백, 띄어씌기 가능하고, 숫자나 특수문자는 허용하지 않도록 설계한 정규식입니다.

그리고 코드에서,

---------------------------
userName.value.length > 15
---------------------------
최대 <u>15자 제한</u>을 한 번 더 검증

## 🔧 트러블 슈팅
문제 상황 + 해결 방법

## 🚀 배포 링크
GitHub Pages 주소
