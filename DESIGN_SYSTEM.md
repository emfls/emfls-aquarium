# Aquarium Design System

## Design concept
어두운 수중 관찰실의 차분한 field guide. 데이터가 주인공인 specimen card를 사용한다.

## Typography
본문은 Noto Sans KR, 영문·수치·레이블은 Manrope와 DM Mono를 사용한다. 제목은 크게, 설명은 짧고 넉넉하게 둔다.

## Layout
1120px 중심 컨테이너, 넓은 수직 여백, 3열 카드에서 모바일 1열로 전환한다.

## Colors
Deep water `#071B20`, panel `#0D292E`, line `#1E4145`, ink `#DBEEEA`, muted `#8CA9A7`, aqua `#78D7C4`, warm marker `#E8BA76`.

## Navigation
초기에는 생물 도감·관리 가이드·Aquarium Tools 세 항목만 노출한다. 세부 카테고리는 탐색 영역에서 제공한다.

## Card system
얇은 테두리와 낮은 대비의 패널, hover 시 테두리만 강조한다. 수치와 분류는 monospace 레이블로 분리한다.

## Species/specimen card
이름, 학명, 분류, 크기·수온·난이도를 한눈에 보인다. 이미지는 데이터가 준비될 때까지 사용하지 않는다.

## Species imagery
검증된 이미지만 `public/images/species/`에 로컬 WebP/AVIF로 저장하며, 파일명은 slug를 따른다. `SpeciesImage`가 alt, 원본, 저작자, 라이선스와 표시 크기를 함께 기록한다. 이미지가 없는 종은 이미지가 없는 상태를 드러내는 문구 없이 taxonomy 기반 specimen mark fallback을 사용한다. 대표 이미지는 4:3 비율과 고정 크기 정보를 사용하고 카드에는 lazy loading, 상세에는 eager loading을 적용한다. 사진 출처와 생물학적 참고 자료는 별도로 관리한다.

이미지 alt는 실제 식별 가능한 내용만 짧게 기술하며, 장식 그래픽은 빈 alt를 사용한다. 검색 결과 이미지, 쇼핑몰·블로그 이미지, 원격 hotlink와 라이선스 불명 이미지는 금지한다.

## Illustration/photo policy
외부 임시 이미지, 깨진 이미지, 출처 없는 사진을 사용하지 않는다. 현재는 기하학적 수중 도형만 사용한다.

## Responsive behavior
모바일에서 navigation은 줄바꿈 가능하며, 그리드는 1열, hero 도형은 축소한다. 터치 대상과 본문 대비를 유지한다.

문서형 Trust 페이지는 얇은 패널과 accent heading으로 긴 텍스트를 구획한다. Hero와 카드 제목은 문장 중간의 강제 개행을 피하고 viewport에 따라 자연스럽게 줄바꿈한다. 사진 figure는 기본 브라우저 좌우 margin을 제거해 320px 폭에서도 콘텐츠가 넘치지 않도록 한다.

## Forbidden patterns
과도한 네온, 게임 UI, glassmorphism, 자동 재생 애니메이션, 장식 때문에 정보가 묻히는 레이아웃을 금지한다.
