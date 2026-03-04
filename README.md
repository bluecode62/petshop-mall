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
현재는 innerHTML += 방식으로 구현했지만,<br />
성능 개선을 위해 DocumentFragment 방식으로 리팩토링 가능합니다.<br />

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
상품 상세 페이지에서 사용자가 리뷰를 작성하고 즉시 확인할 수 있도록 구현한 로직<br />

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
상품 상세 페이지에서 사용자가 문의글을 작성하고 확인할 수 있도록 구현한 로직

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



## 🔧 트러블 슈팅
문제 상황 + 해결 방법

## 🚀 배포 링크
GitHub Pages 주소
