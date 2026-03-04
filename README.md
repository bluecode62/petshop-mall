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
3. 수량제한/개수 가격
4. 로그인/회원가입
5. 리뷰&문의 작성





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
→ 필터링/정렬/검색 후 변경되는 데이터 관리

<b>currentPage</b>
→ 현재 페이지 상태

원본 데이터를 직접 수정하지 않고 복사본을 관리함으로써
정렬, 필터 기능이 추가되더라도
데이터 무결성을 유지할 수 있도록 설계했습니다.<br />
현재는 innerHTML += 방식으로 구현했지만,
성능 개선을 위해 DocumentFragment 방식으로 리팩토링 가능합니다.

<img width="584" height="1076" alt="Image" src="https://github.com/user-attachments/assets/16341cab-c83a-4ab3-9bd9-69ec19f23ad6" /><br />
<h5>상품 리스트 렌더링 함수</h5>
renderList 함수는 페이지네이션을 통해 전달받은 상품 배열을 기반으로
상품 리스트 DOM을 동적으로 생성하는 역할.

기존 리스트 초기화 (innerHTML = "")
ul위주로 각 페이지 마다 요소 동적 생성
전달받은 배열을 순회하며 상품 카드이미지 생성
최종적으로 부모태그인 productBox에 append로 추가

데이터 처리 로직과 UI 렌더링 로직을 분리하여
기능 확장 시 유지보수성을 고려한 구조로 설계했습니다.

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

페이지 로드 시 changePage(1)을 먼저 호출하여
첫 번째 페이지가 즉시 렌더링되도록 구성했습니다.
별도의 조건문 없이도 초기 화면과 페이지 이동 로직을 동일한 흐름으로 처리할 수 있도록 설계했습니다.

<img width="452" height="176" alt="Image" src="https://github.com/user-attachments/assets/aed2b94c-2bff-4767-98fb-ff61402ab49e" /><br />
<h5>페이지 버튼 이벤트 처리</h5>

각 페이지 버튼에 클릭 이벤트를 등록하여 해당 인덱스를 기반으로 changePage(index + 1)을 호출하도록 구현했습니다.
버튼의 index 값을 활용해 페이지 번호 계산
페이지 이동 로직을 changePage 함수 하나로 통합
이벤트 처리와 데이터 처리 로직을 분리하여 구조를 단순화

페이지 이동 방식이 변경되더라도 changePage 함수만 재사용 가능하도록 설계했고,
페이지 이동 로직을 하나의 함수로 모아 유지보수성과 확장성을 고려했습니다.

<img width="539" height="562" alt="Image" src="https://github.com/user-attachments/assets/c91a892e-ab01-4011-b4c6-ec34d656d269" />><br />
<h5>필터링 기능 구현(1)</h5>

상품 리스트를 가격순,리뷰순,별점순, 기간순, 사이즈 등 조건별로 필터링할 수 있도록 구현한 로직
각 필터 버튼(.filter-toggle, .btnSize) 클릭 시 필터 목록을 열거나 닫음
목록 내 항목 클릭 시 선택한 옵션(data-sort)에 따라 정렬 또는 필터 적용
선택 후에는 필터 라벨을 업데이트하고 목록을 자동으로 닫아 UX를 개선

두 개 이상의 필터 그룹을 동일한 구조로 구현하여 재사용성을 높였습니다.


<img width="595" height="462" alt="Image" src="https://github.com/user-attachments/assets/b5600b15-4127-4941-9b17-c8e376a285cd" />><br />
<h5>필터링 기능 구현(2)</h5>

원본 데이터를 복사하여(filteredHanes = [...originHanes])<br />
정렬이나 필터링 시 데이터 무결성을 유지<br />
가격, 날짜, 평점, 리뷰 등 기준에 따라 배열을 정렬<br />
사이즈 필터(big, sm)는 조건에 맞는 항목만 남기도록 필터링<br />
필터/정렬 적용 후에는 항상 첫 페이지(changePage(1))를 렌더링<br />

데이터 처리 로직과 UI 렌더링을 분리하여 필터, 정렬, 페이지네이션 기능이 서로 영향을 최소화하도록 설계했습니다.<br />

<img width="565" height="155" alt="Image" src="https://github.com/user-attachments/assets/18f005a2-46b4-475b-b91a-2eaa157a724e" />
<h5>필터명 변경</h5>

필터 선택 시 현재 선택된 옵션을 화면에 표시하도록 updateFilterLabel() 함수를 구현해 UX를 개선했습니다.

## 🔧 트러블 슈팅
문제 상황 + 해결 방법

## 🚀 배포 링크
GitHub Pages 주소
