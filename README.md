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





1. 페이지네이션


<img width="500" height="880" alt="Image" src="https://github.com/user-attachments/assets/a85c61a6-0044-4676-836f-99fbe30c852c" /><br />
<img width="552" height="172" alt="Image" src="https://github.com/user-attachments/assets/9c94d4e7-3400-43f2-ab12-b4a26a94aa83" /><br />

상품 리스트는 data.js에서 관리하며,
추후 필터링·정렬 기능 확장을 고려한 구조로 설계했습니다.

페이지네이션 구현을 위해 다음 상태값을 정의했습니다.

indicators : 페이지 이동 버튼 요소

productBox : 상품 리스트 렌더링 영역

itemsPerPage : 한 페이지당 노출 상품 수 (15개)

currentPage : 현재 페이지 상태값 (초기값 1)

📌 데이터 관리
originHanes
→ 원본 데이터(리스트 상품) 보존

filteredHanes
→ 필터링/정렬/검색 후 변경되는 데이터 관리

currentPage
→ 현재 페이지 상태

원본 데이터를 직접 수정하지 않고 복사본을 관리함으로써
정렬, 필터, 검색 기능이 추가되더라도
데이터 무결성을 유지할 수 있도록 설계했습니다.




## 🔧 트러블 슈팅
문제 상황 + 해결 방법

## 🚀 배포 링크
GitHub Pages 주소
