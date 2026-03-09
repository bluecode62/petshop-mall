# 🐶 펫쇼핑몰 댕냥베베(PC)
: 반려동물 전문 쇼핑몰 PC 버전으로, 상품 리스트 필터링, 페이지네이션, 상세 페이지 수량·가격 계산, 리뷰·문의 작성, 로그인/회원가입 기능 등 주요 쇼핑몰 기능을 구현했습니다.
HTML, CSS, JavaScript와 jQuery, Slick/BxSlider를 활용하여 설계했습니다.

⭐<a href="https://github.com/bluecode62/mobilePetshop" target="_blank">[모바일 버전 펫쇼핑몰 코드 보기]</a>

## 🛠 사용 기술
- HTML5
- CSS3
- JavaScript
- Jquery
- Slick Slider / BxSlider

## 📂 페이지 구성
- 메인 페이지 (index.html)
- 상품 리스트 서브 페이지 (sub.html)
- 상품 상세 디테일 페이지 (detail.html)
- 로그인 페이지 (login.html)
- 회원가입 페이지 (join.html)

## ✨ 주요 기능
1. 페이지네이션 구현 – 서브 페이지 (sub.html)
2. 필터링 정렬 기능 – 서브 페이지 (sub.html)
3. 수량제한/개수가격 – 디테일 페이지 (detail.html)
4. 리뷰&문의 작성 – 디테일 페이지 (detail.html)
5. 로그인 - 로그인 페이지 (login.html)
6. 회원가입 - 회원가입 페이지 (join.html)



<h1>페이지네이션</h1><br />

<img width="973" height="954" alt="페이지네이션1" src="https://github.com/user-attachments/assets/98c8eedb-130e-45cb-8c2e-5bc84bdb67a4" /><br />
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

<img width="311" height="441" alt="페이지네이션2" src="https://github.com/user-attachments/assets/b36900d0-3dc9-488c-9a43-b41bf691f63e" />
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

<img width="1058" height="582" alt="페이지변경" src="https://github.com/user-attachments/assets/9ad6eb73-0989-4c63-8851-e245bb106523" />
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

<h5>페이지 버튼 이벤트 처리</h5>

각 페이지 버튼에 클릭 이벤트를 등록하여 해당 인덱스를 기반으로 changePage(index + 1)을 호출하도록 구현했습니다.<br />
버튼의 index 값을 활용해 페이지 번호 계산<br />
페이지 이동 로직을 changePage 함수 하나로 통합<br />
이벤트 처리와 데이터 처리 로직을 분리하여 구조를 단순화<br />

페이지 이동 방식이 변경되더라도 changePage 함수만 재사용 가능하도록 설계했고,<br />
페이지 이동 로직을 하나의 함수로 모아 유지보수성과 확장성을 고려했습니다.<br />

<h1>필터링 정렬 기능</h1><br />
<img width="375" height="554" alt="필터링01" src="https://github.com/user-attachments/assets/ba37b0c3-3daa-4754-9d9a-27cd405605db" />
<img width="539" height="562" alt="Image" src="https://github.com/user-attachments/assets/c91a892e-ab01-4011-b4c6-ec34d656d269" />><br />
<h5>필터링 기능 구현(1)</h5>

상품 리스트를 가격순,리뷰순,별점순, 기간순, 사이즈 등 조건별로 필터링할 수 있도록 구현한 로직<br />
각 필터 버튼(.filter-toggle, .btnSize) 클릭 시 필터 목록을 열거나 닫음<br />
목록 내 항목 클릭 시 선택한 옵션(data-sort)에 따라 정렬 또는 필터 적용<br />
선택 후에는 필터 라벨을 업데이트하고 목록을 자동으로 닫아 UX를 개선<br />

두 개 이상의 필터 그룹을 동일한 구조로 구현하여 재사용성을 높였습니다.<br />

<img width="1077" height="562" alt="필터링02" src="https://github.com/user-attachments/assets/acfa6149-5466-4a88-b9b4-9183da7246d0" />
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
<img width="1069" height="850" alt="수량제한" src="https://github.com/user-attachments/assets/96d2d86c-0dd4-4cae-8466-53b45e09cf87" />
<img width="541" height="311" alt="수량제한03" src="https://github.com/user-attachments/assets/780db39e-d657-4766-ab54-5227fbff548e" />
<img width="523" height="387" alt="Image" src="https://github.com/user-attachments/assets/31e7ee1b-2035-4ee2-a08f-01ebcf65e346" /><br />
<h5>색상/사이즈 선택 제한</h5>

사용자가 색상과 사이즈를 선택하면 updateChoice() 함수에서 화면에 표시<br />
특정 색상(예: 그린)이 품절일 경우 선택 불가 처리 후 알림 표시<br />
선택한 옵션은 .colorSize 영역에 “색상:XX / 사이즈:XX” 형식으로 표시<br />

UX 관점에서 선택 불가 옵션 알림 + 화면 표시를 동시에 구현하여<br />
사용자가 현재 선택 상태를 바로 확인하도록 설계했습니다.<br />

<img width="1073" height="854" alt="수량제한02" src="https://github.com/user-attachments/assets/1625b992-c388-4aad-bf2f-5caa7f31745a" />
<img width="460" height="196" alt="수량제한04" src="https://github.com/user-attachments/assets/b47316f3-d9dd-4705-b1f6-e6d1180748eb" />
<img width="598" height="687" alt="Image" src="https://github.com/user-attachments/assets/33be0f64-f606-445e-8351-f9623bca5370" /><br />
<h5>수량 제한 및 가격 계산</h5>

수량 버튼(+ / -) 클릭 시 cnt 변수 업데이트<br />
최소 수량 1개, 최대 수량 10개로 제한 후 알림 표시<br />
수량 변경 시, 개별 상품 금액과 총 금액을 동시에 계산하여 화면에 표시<br />

색상·사이즈 선택 시 품절 옵션을 제한하고, 수량 변경에 따라 가격이 실시간으로 업데이트되도록 구현했습니다.<br />
최소/최대 수량 제한, 선택한 옵션 표시 등 UX를 고려한 쇼핑몰 핵심 기능을 경험했습니다.



<h1>리뷰 작성 & 표시 기능</h1>
<img width="1112" height="584" alt="문의글" src="https://github.com/user-attachments/assets/e5bf9dd7-df0e-40b4-85aa-31e0d38a1382" />
<img width="1076" height="583" alt="문의글2" src="https://github.com/user-attachments/assets/15e80d43-6a03-4fe2-8fcf-2c71450f69ce" />
<img width="528" height="377" alt="Image" src="https://github.com/user-attachments/assets/c2234c70-4ee7-4283-adba-35519d006942" /><br />
<h5>리뷰 작성 폼 토글</h5>

작성하기 버튼 클릭 시 폼 열기/닫기 토글<br />
폼 닫을 때는 입력한 내용 초기화<br />
버튼 텍스트를 작성하기 ↔ 취소하기로 변경하여 직관적 UX 제공<br />


<img width="1076" height="580" alt="리뷰03" src="https://github.com/user-attachments/assets/2eb8391b-a360-4b99-a6c2-5c6d21ed70e7" />
<img width="1085" height="724" alt="리뷰4" src="https://github.com/user-attachments/assets/7dc3f483-525e-4958-aeb4-206b18394b29" />


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
<img width="988" height="625" alt="문의01" src="https://github.com/user-attachments/assets/4c50e1e4-6946-4035-8a6d-6c246128fc8d" />
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

<img width="982" height="630" alt="문의02" src="https://github.com/user-attachments/assets/2475abc5-4511-4ac2-88c5-59934ea28d73" />
<img width="980" height="662" alt="문의03" src="https://github.com/user-attachments/assets/dff0cae6-d1df-4e91-a94c-7584082bb733" /><br />


<img width="969" height="620" alt="문의04" src="https://github.com/user-attachments/assets/29951e00-1668-43cf-9651-cdcefceaed1a" />
<img width="973" height="478" alt="문의05" src="https://github.com/user-attachments/assets/75ab9f9f-2611-4ad8-a378-617df5deae35" />

<img width="670" height="499" alt="Q A03" src="https://github.com/user-attachments/assets/eff0a315-a9fd-4f81-9063-5e19a64dcc0f" /><br />
<h5>문의 렌더링</h5>

로컬 스토리지에 저장된 문의글을 .questionList 컨테이너에 표시<br />
제목, 작성자, 작성일, 비밀글 여부 표시<br />
비밀글은 “비밀글입니다” + 자물쇠 아이콘으로 표시<br />

상품 상세 페이지에서 사용자가 문의글을 작성하고 확인할 수 있도록 구현했습니다. <br />
작성 폼 토글, 필수 항목 유효성 검사, 비밀글 처리, 로컬 스토리지 저장, 목록 렌더링 등 UX를 고려한 문의 기능을 설계했습니다.<br />


<h1>로그인</h1>
<img width="553" height="290" alt="login01" src="https://github.com/user-attachments/assets/47c8f1e8-fce0-4f3b-a826-cb358f40f1af" /><br />

/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;<br /> 
정규식 해설
--------------------
/[ ... ]/<br /> 
대괄호 안은 문자 클래스라고 부르며, 안에 있는 문자들 중 하나라도 있으면 일치<br /> 
예: [abc] → a, b, c 중 하나와 일치.<br /> 

!@#$%^&*()_+<br /> 
느낌표, 골뱅이, 샵, %, ^, &, *, (, ), _, + 등 일반적인 특수문자<br /> 

\-<br /> 
대시(-)는 문자 범위 지정으로 쓰이기도 하는데, 앞에 \를 붙여서 그냥 문자 -로 인식하도록 함<br /> 

=\[\]{};':"\\|,.<>\/?<br /> 
등호, 대괄호, 중괄호, 세미콜론, 따옴표, 백슬래시, 파이프, 쉼표, 마침표, 부등호, 슬래시, 물음표<br /> 
대부분의 특수문자를 하나씩 포함<br /> 

-----------------------
👉 로그인 시 아이디 입력값에 특수문자가 있는지 검사

id, pw → 로그인 기능 테스트용 임시 계정<br />
count → 로그인 시도 횟수 제한을 위해 초기값 5회 설정<br />
specialChars → 아이디 입력 시 특수문자 체크용 정규식<br />
userId, userPw, btnLog → 로그인 폼 요소 DOM 참조<br />
logAlert, pwAlert → 아이디/비밀번호 오류 안내 메시지 DOM 참조<br />
chkBox → “아이디 저장” 체크박스 DOM 참조<br />
logOk → 로그인 성공 여부 상태 관리<br />

테스트용 계정, 입력 검증, UI 요소 참조, 상태 관리를 미리 선언하여<br />
로그인 로직에서 각각의 역할을 명확하게 구분하고 유지보수성을 높였습니다.<br />

<img width="552" height="441" alt="로그인성공01" src="https://github.com/user-attachments/assets/5a29e97b-b2d6-4a40-8196-c402e39cd8ba" />
<img width="567" height="646" alt="로그인성공02" src="https://github.com/user-attachments/assets/c61a1d21-c562-4dc1-856b-f16267039be1" /><br />

<img width="570" height="554" alt="로그인02" src="https://github.com/user-attachments/assets/401c63ca-b0ad-4875-b552-f445e6365e20" />
<img width="559" height="450" alt="로그인03" src="https://github.com/user-attachments/assets/60712d7d-110e-4b0e-8feb-87b2854d2c8c" /><br />



<img width="471" height="647" alt="login02" src="https://github.com/user-attachments/assets/a793a522-0755-404f-ba6a-b7cf11a43080" /><br />

입력한 아이디와 비밀번호를 확인하여 로그인 처리<br />
아이디/비밀번호 일치 시 → 환영 알림 표시, 로그인 상태(logOk) 업데이트<br />
비밀번호만 틀릴 경우 → 오류 안내 메시지 표시, 재입력 유도<br /><br />
아이디 또는 비밀번호 미작성 시 → 입력을 요청하는 안내 표시<br /><br />
존재하지 않는 아이디 입력 시 → 오류 메시지 표시 및 로그인 횟수 차감<br />
입력값 검증과 알림 표시를 통해 직관적이고 안전한 로그인 흐름을 제공<br />

<img width="560" height="563" alt="로그인07" src="https://github.com/user-attachments/assets/19c7b48c-c714-4be4-a784-75d308854de9" />
<img width="548" height="445" alt="로그인08" src="https://github.com/user-attachments/assets/6e53d3c2-8cfe-47e2-ab43-7494e109e179" />
<img width="563" height="661" alt="로그인09" src="https://github.com/user-attachments/assets/34bfbe13-6041-4aa4-ad9c-c82d18c1b11e" /><br />
<img width="508" height="351" alt="login02-01" src="https://github.com/user-attachments/assets/ad3c3752-e8d2-40a9-9ef4-aac3bbb732a0" /><br />
로그인 횟수 다 소진 시 disable로 아이디,비번작성이 비활성화됩니다.<br />
안내상 30분이지만 빠른 테스트 확인을 위해 3초로 설정했습니다.<br />


<img width="556" height="440" alt="로그인06" src="https://github.com/user-attachments/assets/aca51752-101f-4e41-8889-d05364b69d44" />
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

/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{10,15}$/ <br /> 
정규식 해설
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

비밀번호는 정규식을 활용하여 영문, 숫자, 특수문자를 각각 최소 1개 이상 포함하고 10~15자리로 구성되도록 제한했고,<br />  
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
<img width="612" height="400" alt="join06" src="https://github.com/user-attachments/assets/576546fc-9b06-4373-a25e-317bb43a5a7d" /><br /> 

`/^[a-zA-Z가-힣]+( [a-zA-Z가-힣]+)*$/ `
정규식 해설
---------------------------------------------------

[a-zA-Z가-힣]+ → 영문 대소문자 또는 한글을 1자 이상 허용<br /> 
( [a-zA-Z가-힣]+)* → 공백 + 영문/한글 조합을 0번 이상 허용<br /> 
즉, 이름 사이 공백 허용 (예: Bae Yun Ju)<br /> 
$ → 문자열 끝<br /> 

---------------------------------------------------
👉 한글 또는 영문만 입력 가능하며 이름 사이 공백, 띄어씌기 가능하고, 숫자나 특수문자는 허용하지 않도록 설계한 정규식입니다.<br /> 

그리고 코드에서,<br /> 

userName.value.length > 15
= 최대 15자 제한을 한 번 더 검증<br />

정규식에 맞지 않거나 15자를 초과하면:<br />

"한글이나 영문만 3~15자내에 입력해주세요." 메시지 표시<br />
입력창 테두리를 빨간색으로 변경<br />
포커스를 유지하여 재입력 유도<br />

조건을 만족하면:<br />

테두리를 오렌지색으로 변경<br />
"이름 확인됐습니다." 메시지 표시<br />

이름 입력 시 정규식을 활용하여 한글 및 영문만 입력 가능하도록 제한하고, 공백을 포함한 이름 형식도 허용하도록 구현했습니다.<br /> 
또한 15자 이내로 길이를 제한하여 과도한 입력을 방지했습니다.<br />
조건을 충족하지 않을 경우 시각적 피드백(테두리 색상 및 안내 문구)을 제공하여 사용자 경험을 개선했습니다.<br />

<h5>이메일 유효성 검사</h5>
<img width="756" height="827" alt="join07" src="https://github.com/user-attachments/assets/d3e7916a-c1cd-473e-9c43-d8a3d8324b7a" /><br />

mailChk() → 입력값 검증 및 UI 피드백<br />

isEmail() → 정규식을 활용한 형식 검사<br />

`/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;`<br />
정규식 해설
---------------------------------------------------

^ → 문자열 시작<br />
[0-9a-zA-Z] → 영문 또는 숫자로 시작<br />
([-_.]?[0-9a-zA-Z])*<br />
- _ . 특수문자를 0~1회 허용<br />
그 뒤에 영문/숫자 조합 반복 가능<br />
👉 아이디 부분 검사<br />

@ → 반드시 포함<br />
[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*<br />
👉 도메인 이름 부분 검사<br />

\. → 점(.) 필수<br />
[a-zA-Z]{2,3}<br />
👉 com, net, org 등 2~3자리 도메인 허용<br />

$ → 문자열 끝<br />
/i → 대소문자 구분 없음<br />

---------------------------------------------------
👉 이메일 형식 아이디@도메인.com 구조를 검증<br />
👉 특수문자는 - _ .만 허용<br />
👉 도메인 확장자는 2~3글자 제한<br />

형식이 맞지 않으면:<br />

빨간 테두리<br />
"이메일 형식에 따라 정확히 입력해주세요" 메시지 표시<br />
포커스 유지<br />

형식이 맞으면:<br />

오렌지색 테두리<br />
"이메일 확인됐습니다." 안내 메시지 표시<br />

👉 즉각적인 시각적 피드백 제공<br />

const emailDomainSelect = document.getElementById("email_domain");<br />

= 사용자가 도메인을 직접 선택 가능<br />
= "direct" 선택 시 → 직접 입력 허용<br />
= 도메인 선택 시 → 아이디부분 + @선택도메인 자동 완성<br />
ex)  const id = userEmail.value.split("@")[0];<br />
     userEmail.value = id + "@" + selectedValue;<br />
= 자동 완성 후 mailChk() 재실행 → 형식 검증<br />
👉 사용자 입력 편의성을 고려한 UX 설계<br />

이메일 입력은 정규식을 활용하여 기본적인 이메일 형식을 검증하도록 구현했습니다. 검증 로직과 정규식 검사를 함수로 분리하여 가독성과 재사용성을 고려했으며,<br /> 
형식이 맞지 않을 경우 시각적 피드백을 통해 사용자에게 즉각적으로 안내하도록 설계했습니다.<br /> 
또한 도메인 선택 기능을 추가하여 사용자가 직접 입력하거나 선택할 수 있도록 하여 입력 편의성을 개선했습니다.<br />


<h5>휴대폰 유효성 검사</h5>
<img width="569" height="346" alt="join08" src="https://github.com/user-attachments/assets/51108f40-bab7-447e-a1a0-833ae5b9dfa5" /><br />

/^0\d{8,10}$/<br />
정규식 해설
---------------------------------------------------
^ → 문자열 시작<br />
0 → 반드시 0으로 시작<br />
\d{8,10} → 숫자 8~10자리<br />
$ → 문자열 끝<br />
---------------------------------------------------
👉 0으로 시작하는 숫자 9~11자리만 허용하는 정규식.<br />
01012345678 ✅<br />
010-1234-5678 ❌ (하이픈 포함 불가)<br />
1234567890 ❌ (0으로 시작하지 않음)<br />

형식이 맞지 않으면:<br />

"'-'없이 숫자만 입력해주세요" 안내 문구 표시<br />
입력창 테두리를 빨간색으로 변경<br />
포커스 유지<br />

형식이 맞으면:<br />

오렌지색 테두리로 변경<br />
"휴대폰번호 확인됐습니다." 메시지 표시<br />

👉 입력 즉시 시각적 피드백을 제공하도록 구현<br />

휴대폰 번호는 정규식을 활용하여 0으로 시작하는 9~11자리 숫자만 입력 가능하도록 제한했습니다.<br /> 
하이픈(-)을 제외한 숫자만 허용하도록 설계했으며, 형식이 맞지 않을 경우 즉각적인 시각적 피드백과 안내 문구를 제공하여 입력 오류를 최소화하도록 구현했습니다.<br />

<h5>전화번호 유효성 검사</h5>
<img width="643" height="386" alt="join09" src="https://github.com/user-attachments/assets/092ce825-7656-48c9-b019-70471632dfed" /><br />

/^(070|02|0[3-9]{1}[0-9]{1})[0-9]{3,4}[0-9]{4}$/<br />
정규식 해설
---------------------------------------------------
^ → 문자열 시작<br />
(070|02|0[3-9]{1}[0-9]{1})<br />
→ 지역번호 또는 인터넷 전화번호 검사<br />

070 → 인터넷 전화<br />
02 → 서울 지역번호<br />
0[3-9]{1}[0-9]{1}<br />
→ 031, 051, 062 등 전국 지역번호 형식 허용<br />

[0-9]{3,4}<br />
→ 가운데 번호 3~4자리<br />

[0-9]{4}<br />
→ 마지막 번호 4자리<br />

$ → 문자열 끝<br />
---------------------------------------------------
0212345678 ✅<br />
0311234567 ✅<br />
07012341234 ✅<br />
👉 하이픈(-) 없이 숫자만 입력하도록 설계<br />

형식이 맞지 않으면:<br />

빨간색 테두리<br />
"숫자만 입력해주세요." 안내 문구 표시<br />
포커스 유지<br />

형식이 맞으면:<br />

오렌지색 테두리<br />
"전화번호 확인됐습니다." 메시지 표시<br />

일반 전화번호는 지역번호(02, 070, 기타 지역번호)를 포함한 형식을 정규식으로 검증하도록 구현했습니다.<br /> 
형식이 맞지 않을 경우 시각적 피드백과 안내 문구를 제공하여 사용자 입력 오류를 최소화했습니다.<br /> 
검증 로직과 정규식 검사를 별도 함수로 분리하여 코드 가독성과 유지보수성을 고려했습니다.<br />

<h5>주소 유효성 검사</h5>
<img width="745" height="1257" alt="join16-02" src="https://github.com/user-attachments/assets/3708fbe8-c1e1-49ca-b07f-fe10fbfadcbb" /><br />


<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script><br />
👉 외부 API를 활용해 우편번호 + 기본주소 자동 입력 기능을 구현했습니다.<br />

① 주소 검색 후 자동 입력<br />
new daum.Postcode({<br />
  oncomplete: function (data) {<br />
  
사용자가 주소 검색 완료 시 oncomplete 실행<br />

선택 유형에 따라:<br />
도로명 주소 (roadAddress)<br />
지번 주소 (jibunAddress)<br />
중 하나를 자동으로 입력<br />

postcode.value = data.zonecode;<br />
basicAdress.value = addr;<br />
detailAdress.focus();<br />

👉 우편번호 + 기본주소 자동 입력 처리<br />
그리고 상세주소 입력칸으로 자동 포커스 이동<br />

const regexAdress = /[`~!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]/;<br />
👉 특수문자 입력 제한<br />

상세주소 입력 시:<br />

값이 비어 있으면 → 안내 메시지 유지<br />
특수문자 포함 시 → 빨간 테두리 + 오류 메시지<br />

정상 입력 시 → 오렌지색 테두리 + "주소 확인됐습니다." 표시<br />

* 기본 주소는 API로 신뢰성 확보<br />
* 상세 주소는 직접 입력이므로 별도 유효성 검사 추가<br />
👉 상세 주소 유효성 검사<br />

카카오 우편번호 API를 활용하여 주소 검색 기능을 구현하고, 우편번호 및 기본 주소를 자동 입력하도록 설계했습니다. <br />
사용자가 직접 입력하는 상세주소의 경우 특수문자 입력을 제한하는 정규식을 적용하여 데이터 무결성을 유지했습니다.<br />
주소 선택 후 상세주소 입력란으로 자동 포커스를 이동시켜 사용자 경험을 개선했습니다.<br />


<h5>회웝가입 전체 검사</h5>
<img width="603" height="310" alt="join12" src="https://github.com/user-attachments/assets/597f218c-71d3-4418-a29b-aea58c8e3a58" /><br />

각 입력 항목에서 개별적으로 유효성 검사를 진행했지만,
회원가입 버튼 클릭 시 모든 필수 항목이 입력되었는지 한 번 더 확인하는
최종 검증 단계로 구현했습니다.

1차: 각 항목별 실시간 유효성 검사
validateId.value = 아이디값,<br />
validatePw.value = 비밀번호값,<br />
validatePw02.value = 비밀번호 확인된 비밀번호값,<br />
validateName.value = 성명값,<br />
validateEmail.value = 이메일값,<br />
validatePhone.value = 휴대전화값,<br />
validateAdress.value = 주소값,<br />

2차: 가입 버튼 클릭 시 전체 입력 여부 최종 확인
idInput =  아이디 입력창,<br />
pwInput =  비밀번호 입력창,<br />
pwchkInput =  비밀번호 확인 입력창,<br />
nameInput =  이름 입력창,<br />
emailInput =  이메일 입력창,<br />
phoneInput =  휴대전화 입력창,<br />
adressInput =  주소 입력창,<br />

* 항목 누락 시 처리

alert로 안내<br />
해당 input으로 포커스 이동<br />
scrollIntoView()를 통해 화면 중앙으로 부드럽게 이동<br />
return으로 가입 중단<br />
확인 안내 메세지와 해당 입력창을 포커스로 표시<br />
입력창이 하나도 비어있지 않았을 경우에 chkJoin() 함수 실행<br />

<img width="485" height="408" alt="join15" src="https://github.com/user-attachments/assets/c6378ca7-7e8b-4da3-b792-d0ae612de61a" /><br />
<h5>회원가입란 하단에 취소버튼과 가입하기 버튼에 대한 코드기능</h5>

모든 입력창을 입력하고 가입하기 클릭 시, 다시 가입할지를 재확인하고 "예"를 누르면 "회원가입 완료됐습니다!"라는 메세지 표시와 함께 페이지 새로고침.<br />

만약 취소버튼을 클릭 시, 취소를 할 것인지 재확인하고 "예"를 누르면 "회원가입 취소됐습니다."라는 메세지 표시와 함께 메인 페이지 index.html로 이동.<br />

회원가입 버튼 클릭 시 모든 필수 입력값이 작성되었는지 최종적으로 검증하도록 구현했습니다.<br />
각 항목이 비어 있을 경우 해당 입력란으로 포커스를 이동시키고 scrollIntoView()를 활용해 화면 중앙으로 이동하도록 하여 사용자 경험을 개선했습니다.<br /> 
모든 조건을 통과하면 confirm()을 통해 한 번 더 사용자 확인을 거친 뒤 회원가입을 완료하도록 설계했습니다.<br />

<h5>반려동물 종류 및 성별 선택</h5>
<img width="538" height="274" alt="join10" src="https://github.com/user-attachments/assets/6b4805e0-009a-4e1f-ad15-453948cd3d79" /><br />

여러 버튼 중 한 개만 선택 가능하도록 구현<br />
선택 시 이전 선택 해제 후 클릭한 버튼 강조(active)<br />

<h5>반려동물 생년월일 유효성 검사</h5>
<img width="480" height="331" alt="join11" src="https://github.com/user-attachments/assets/c791e452-0dc5-4ac5-b1bd-3dea4e926da2" /><br />

숫자 8자리인지 체크 (YYYYMMDD 형식)<br />
잘못 입력 시 빨간색 경고 + 포커스 이동<br />
올바른 입력 시 오렌지색으로 안내<br />

회원가입에서 선택 사항인 반려동물 정보와 생년월일 입력 기능을 구현했습니다.<br />
버튼 선택 시 UI 강조를 통해 선택 상태를 명확히 표시하고, 생년월일 입력은 숫자 8자리 형식 검증을 적용하여 데이터 정확성을 확보했습니다.<br />
필수 입력은 아니지만, 부가정보를 처리하는 기능 구현 경험을 보여주기 위해 포함했습니다.<br />

## 🔧 트러블 슈팅
1️⃣ 페이지네이션이 렌더링되지 않던 문제

상품 리스트 페이지네이션을 구현하는 과정에서,
렌더링 함수가 정상적으로 실행됨에도 화면에 리스트가 표시되지 않는 문제가 발생했습니다.
처음에는 JavaScript 로직 문제로 생각해 콘솔 로그와 디버깅을 반복했으나,
원인은 부모 태그(productBox)의 CSS에 설정된 overflow: hidden 속성이었습니다.
해당 속성으로 인해 내부 요소가 정상적으로 표시되지 않았고,
CSS를 수정한 후 페이지네이션이 정상적으로 렌더링되는 것을 확인했습니다.

👉 배운 점
DOM 렌더링 문제는 JavaScript뿐만 아니라 CSS 레이아웃 속성의 영향도 함께 고려해야 한다는 점을 알게 되었습니다.

2️⃣ 페이지 이동 시 리스트가 누적되는 문제

다음 페이지로 이동할 때
상품이 교체되지 않고 기존 리스트 아래에 계속 추가되는 문제가 발생했습니다.
원인은 렌더링 전 기존 리스트를 초기화하는 코드
innerHTML = ""가 누락된 것이었습니다.
초기화 로직을 추가한 후,
페이지 이동 시 항상 새로운 리스트만 표시되도록 수정했습니다.

👉 배운 점
동적 렌더링에서는 기존 DOM 정리(초기화)가 중요하다는 것을 체감했습니다.

📍 GitHub Pages 주소: https://bluecode62.github.io/petshop-mall/

⭐[모바일 버전 펫쇼핑몰 코드 보기](https://github.com/bluecode62/mobilePetshop)
