# Project History

## 2026-09-14 — P0 foundation

- 빈 저장소에 Astro 5 정적 사이트 기반을 구성했다.
- `Species`를 공통 사육 정보와 `slug`를 포함한 TypeScript 인터페이스로 정의했다. 수치 범위는 `{ min, max }`로 두어 향후 필터와 비교 UI에 재사용할 수 있게 했다.
- 베타·구피·체리새우만 검증용 최소 레코드로 추가했다. 상세 콘텐츠와 이미지는 아직 확장하지 않았다.
- Aquarium 전용 디자인은 deep water 배경, 청록 accent, monospace 수치 레이블, specimen card 중심으로 결정했다.
- 홈페이지는 Field Guide → 생물 도감 → 관리 가이드 → 도구 로드맵 → 카테고리 탐색 흐름으로 구성했다.
- 도구는 현재 목록 UI만 제공하고 실제 계산·합사 로직은 후속 작업으로 남겼다.
- 외부 API, DB, 로그인, CMS, UI 프레임워크와 임의 연락처를 추가하지 않았다.

## 2026-09-14 — P1 species profiles

- 초기 도감 10종을 구축했다: 베타, 구피, 체리새우, 몰리, 네온테트라, 체리바브, 엔젤피시, 코리도라스, 오토싱, 안시.
- 기존 URL 규칙을 유지하고 `src/pages/species/[slug].astro`의 `getStaticPaths()`가 모든 상세 페이지를 데이터에서 생성하도록 했다. 수동 상세 페이지 파일은 만들지 않았다.
- `Source` 타입을 추가하고 각 종에 FishBase 종별 요약 URL과 확인일을 저장했다. 출처는 상세 페이지 하단 `참고 자료`에서 새 탭 링크로 제공한다.
- 기존 Species 스키마는 유지하면서 `sources`, `recommendedKeeping`, `breedingNotes`만 추가했다. 수치 범위는 min/max를 유지하고 단위는 cm·°C·pH·L로 일관화했다.
- 상세 페이지는 소개 → Quick Facts → Care Profile → Compatibility → Breeding → Recommendation → References 흐름의 Species Profile로 고도화했다.
- Quick Facts는 6개 정보 셀로 시각화하고, 모바일에서는 2열로 전환해 긴 학명과 수치가 화면을 압박하지 않도록 했다.
- 검색·필터·계산기·합사 로직·CMS·DB·이미지는 이번 단계에서 추가하지 않았다.
- 검증: `npm run check` 0 errors/0 warnings/0 hints, `npm run build` 성공, 종별 10개 상세 HTML 생성, 내부 경로 및 placeholder 스캔 완료.

## 2026-09-14 — Aquarium management guides

- `src/data/guides.ts`에 `Guide`, `GuideStep`, `GuideSource` 타입과 7개 가이드를 추가했다: 물잡이, 환수, 수온, 여과, 먹이, 이끼, 수초.
- 가이드는 긴 블로그 글 대신 quickAnswer, why, principles, steps, checks, mistakes, whenConcerned, relatedSpecies, relatedGuides, sources 구조를 사용한다.
- `src/pages/guides/[slug].astro`의 `getStaticPaths()`로 7개 상세 페이지를 데이터에서 생성했다. 목록과 상세 모두 기존 Aquarium Field Guide 스타일을 유지한다.
- 상세 페이지는 Quick Answer, numbered step cards, 기준 목록, caution box, 관련 생물·가이드, 참고 자료 흐름으로 구성했다.
- Species 상세 페이지에는 활동 영역과 분류에 맞춰 수온·먹이·환수·여과·수초 등 실제 존재하는 가이드로 연결되는 관련 가이드 링크를 추가했다.
- 출처는 UF/IFAS의 질소 순환·수질 자료와 Aquarium Co-Op 참고 자료를 사용했다. 숫자를 단일 절대값으로 단정하지 않고 수조·종·상태에 따라 달라지는 조건을 명시했다.
- sitemap이 가이드 7개 상세 URL을 포함하도록 확장했다. 이미지, 검색, 필터, 계산기, 합사 기능은 추가하지 않았다.
- 검증: `npm run check` 0 errors/0 warnings/0 hints, `npm run build` 성공, 가이드 상세 7개 생성, 브라우저에서 `/guides/`와 물잡이 상세 렌더링 확인, placeholder 스캔 완료.

## 2026-09-14 — Tank volume calculator

- `/tools/tank-volume/`에 수조 물량 계산기를 추가했다.
- 계산 공식은 `가로 × 세로 × 높이 ÷ 1000 = 이론상 총 용량(L)`이며, 실사용 비율을 곱한 추정 실제 물량도 함께 표시한다. 기본값은 85%다.
- `src/lib/tankVolume.ts`에 순수 함수 `calculateTankVolume()`를 분리했다. 빈 값·NaN·Infinity·0 이하·100% 초과·각 치수 1000cm 초과를 거부한다.
- 입력 변경 즉시 결과가 갱신되며 서버 전송·DB·localStorage는 사용하지 않는다. 숫자 입력에는 decimal numeric keyboard 힌트를 제공한다.
- 결과는 이론상 용량, 예상 실제 물량, mL 보조값으로 구성하고, 내부 치수·바닥재·장식물·수면 여유에 따른 추정치임을 설명한다.
- `/tools/`에서 계산기만 활성 링크로 표시하고 합사 확인·입문 체크리스트는 예정 상태를 유지했다. sitemap에 계산기 URL을 추가했다.
- 검증: `npm run check` 및 `npm run build` 통과, 60×30×35cm가 63.0L / 85%에서 53.6L로 표시되는 코드 경로 확인, 모바일 1열 CSS 및 placeholder 스캔 완료.

## 2026-09-14 — Aquarium starter checklist

- `/tools/aquarium-checklist/`에 7단계, 31개 항목의 수조 입문 체크리스트를 추가했다.
- 수조 결정 → 기본 장비 → 물 준비 → 물잡이 → 생물 선택 전 확인 → 생물 투입 → 초기 관리 흐름으로 구성했다.
- `src/data/checklist.ts`에 `ChecklistItem`, `ChecklistStep` 타입과 관련 도구·가이드 링크를 구조화했다.
- 실제 checkbox와 label을 사용하고, 완료 수·퍼센트 텍스트·progress bar를 함께 표시한다. 전체 완료 메시지도 준비 보조 도구라는 한계를 명시한다.
- 체크 상태는 브라우저 localStorage에만 저장하며 서버 전송은 없다. 확인 대화상자가 있는 `체크리스트 초기화` 기능을 제공하고 Privacy 페이지에 저장 정책을 기록했다.
- `/tools/`에서 체크리스트를 활성 기능으로 변경하고 합사 확인은 준비 중으로 유지했다. sitemap에 체크리스트 URL을 추가했다.
- 검증: `npm run check` 0 errors/0 warnings/0 hints, `npm run build` 성공, 브라우저에서 체크 시 1/31·3% 갱신 및 새로고침 상태 유지 확인, 모바일용 1열 CSS와 placeholder 스캔 완료.

## 2026-09-14 — Compatibility tool

- `/tools/compatibility/`에 현재 10종을 대상으로 하는 어종 합사 확인 도구를 추가했다.
- `src/data/compatibility.ts`에 보조 `CompatibilityProfile`, 필요한 조합만 담은 `CompatibilityRule`, `CompatibilityResult` 타입을 두었다. 45개 조합을 페이지 코드에 하드코딩하지 않는다.
- `evaluateCompatibility(a, b)`는 Species의 수온·pH·성어 크기·최소 수조·활동 영역을 기본 데이터로 검사하고, 베타·새우·엔젤피시 등 예외 조합은 pair-specific rule로 보완한다.
- pair key는 정렬된 slug를 사용해 A+B와 B+A가 같은 결과를 반환한다.
- 평가 level은 `대체로 무난`, `주의 필요`, `권장하지 않음` 3단계다. 확정적인 안전·불가 표현을 피하고 개체 성격, 성별, 크기, 개체 수, 수조·레이아웃에 따른 변동 disclaimer를 제공한다.
- 결과에는 공통 수온·pH·최소 수조 기준, 핵심 이유, 위험 요소(Water parameters·Size·Temperament·Predation·Fin/aggression·Space), 양쪽 Species Profile 링크를 표시한다.
- 동일 종 선택은 동종 합사 안내로 처리한다. 합사 도구는 마릿수·stocking·자동 추천·수조 입력을 구현하지 않는다.
- `/tools/`와 sitemap에 도구를 추가하고, Species Profile에서도 합사 도구로 이동할 수 있게 했다.
- 검증: `npm run check` 0 errors/0 warnings/0 hints, `npm run build` 성공, 대표 7개 조합 평가와 A+B/B+A 대칭성 확인, 브라우저에서 베타+구피 결과 렌더링 및 선택 UI 확인.

## 2026-09-14 — Species search and filters

- `/species/`에 텍스트 검색, 분류, 사육 난이도, 수온 조건, 최소 수조 크기 필터를 추가했다. 현재 10종 데이터만 사용하며 새 생물은 추가하지 않았다.
- 검색 대상은 이름·영문명·학명·summary·category이고 `trim + lowercase` normalization을 사용한다. 검색과 모든 필터는 AND 조건으로 결합한다.
- 수온 필터는 종의 권장 범위와 선택 조건이 겹치는지 deterministic하게 검사하며, 최소 수조 필터는 30L·60L·100L·100L 초과 구간을 사용한다.
- `src/lib/speciesSearch.ts`에 `normalizeSearchText`, `matchesSpecies`, `filterSpecies`를 분리해 UI 없이도 확인 가능한 구조로 유지했다.
- `/species/?q=betta` query parameter를 지원하고 canonical은 기존 기본 `/species/`로 유지한다. 결과 수와 empty state, 전체 초기화를 제공한다.
- 카드의 기존 specimen 디자인은 유지하고 결과가 숨겨질 때 레이아웃이 비지 않도록 empty state를 표시한다. 검색어는 HTML로 삽입하지 않는다.
- CSS는 모바일에서 검색 → 필터 → 결과 → 카드 순서가 되도록 1열로 전환하며, label·select·focus 상태와 텍스트 결과 수를 제공한다.
- 검색 페이지 자체에는 합사 로직을 중복 구현하지 않고 기존 Species 상세 및 합사 도구 연결을 유지했다.

## 2026-09-14 — Aquarium starter checklist

- `/tools/aquarium-checklist/`에 수조 입문 체크리스트를 추가했다.
- `src/data/checklist.ts`에 수조 결정, 기본 장비, 물 준비, 물잡이, 생물 선택 전 확인, 생물 투입, 초기 관리의 7단계와 31개 확인 항목을 구조화했다.
- 실제 checkbox와 label을 사용하고, 진행률을 `완료 수 / 전체 수`와 퍼센트 텍스트·progress bar로 함께 표시한다. 전체 완료 시에도 안전을 보장하는 표현은 사용하지 않는다.
- 체크 상태는 서버 전송 없이 브라우저 localStorage에만 저장하며, `체크리스트 초기화` 버튼과 확인 대화상자를 제공한다. Privacy 페이지에 저장 정책을 반영했다.
- 수조 물량 계산기, 물잡이·수온·환수·여과·먹이 가이드, 생물 도감으로 연결하고 합사 알고리즘이나 자동 추천은 구현하지 않았다.
- `/tools/`에서 계산기와 체크리스트를 활성 기능으로, 합사 확인을 준비 중으로 표시했다. sitemap에 체크리스트 URL을 추가했다.

## 2026-09-14 — Species imagery foundation

- `SpeciesImage` 타입을 추가해 로컬 이미지 경로, alt, 표시 크기, 원본, 저작자, 라이선스를 추적할 수 있게 했다. `Species.image`는 optional로 두어 이미지 없는 종도 정상 동작한다.
- `src/components/SpeciesVisual.astro`를 추가했다. 검증된 이미지가 있으면 카드/상세 문맥별로 표시하고, 현재처럼 이미지가 없으면 taxonomy 기반 specimen mark fallback을 렌더링한다.
- 이미지 저장 규칙은 `public/images/species/{slug}.webp` 또는 `.avif`를 기준으로 문서화했다. 현재 라이선스와 원본을 직접 확인한 로컬 이미지가 없어 10종 모두 실제 사진은 적용하지 않았다.
- 사진 출처·저작자·라이선스와 생물학적 참고 자료를 분리하고, alt는 실제로 확인 가능한 식별 정보만 작성하도록 했다. 검색 결과 이미지·원격 hotlink·출처 불명 이미지는 금지한다.
- 이미지 영역은 4:3 비율, width/height 메타데이터, `decoding="async"`를 사용하며 목록은 lazy, 상세 대표 이미지는 eager 로딩하도록 준비했다. OG 이미지는 아직 구현하지 않았다.
- `DESIGN_SYSTEM.md`, `SITE_STRATEGY.md`, `TASKS.md`에 이미지 정책과 미확보 이미지 후속 작업을 반영했다.

## 2026-09-14 — Verified species image pilot

- Wikimedia Commons 개별 File page를 확인해 베타(`Betta splendens`)와 구피(`Poecilia reticulata`) 이미지를 선정했다. 두 파일 모두 원본 페이지에서 종 식별, 저작자, 출처, 라이선스를 확인했다.
- 이미지는 `public/images/species/betta.jpg`, `public/images/species/guppy.jpg`에 저장했으며 각각 1200×814, 900×564로 리사이즈·JPEG 최적화했다. 원본 고해상도 파일은 저장하지 않았다.
- `verifiedImages` metadata에 Commons File page, 저작자, author URL, CC BY-SA 라이선스와 라이선스 URL을 기록했다. 베타는 Eric Savage / CC BY-SA 2.0, 구피는 Vincent Eisfeld / CC BY-SA 4.0이다.
- Species 상세에는 의미 있는 alt와 attribution을 표시하고, Species 목록 카드에는 로컬 이미지가 연결된다. 나머지 8종은 검증되지 않은 이미지를 사용하지 않고 specimen mark fallback을 유지한다.
- 이미지 영역은 4:3 표시 비율, 고정 width/height metadata, 상세 eager·목록 lazy loading 정책을 따른다. OG 이미지는 아직 구현하지 않았다.
- 검증: `npm run check` 0 errors/0 warnings/0 hints, `npm run build` 28 pages 성공, 주요 회귀 경로 생성 확인, 이미지 파일 존재 및 외부 hotlink 없음.

## 2026-09-14 — Species image expansion

- 기존 2종에 더해 체리새우(`Neocaridina davidi`)와 몰리(`Poecilia sphenops`) 이미지를 추가했다. Commons 개별 File page에서 묘사 종, 저작자, 원본, 라이선스를 확인한 자료만 사용했다.
- 체리새우는 FishManHari의 CC0 1.0 파일, 몰리는 Tereso Hernández Morales의 CC BY 4.0 파일을 사용했다. 각각 `public/images/species/cherry-shrimp.jpg`, `public/images/species/molly.jpg`에 로컬 저장했다.
- 이미지 수는 10종 중 4종이 되었고, 네온테트라·체리바브·엔젤피시·코리도라스·오토싱·안시는 이번 검증 범위에서 미적용 상태로 fallback을 유지한다.
- 신규 이미지는 각각 900×675, 1200×900으로 리사이즈·JPEG 최적화했으며 기존 4:3 표시 정책과 `SpeciesImage` metadata를 유지했다.
- 검색·필터, 상세 attribution, alt text, 이미지 없는 종의 fallback 구조는 변경하지 않았다.

## 2026-09-15 — Launch QA audit

- 전체 정적 페이지, Species 10종, Guide 7개, Tools 3개, SEO metadata, sitemap, robots, 이미지 asset, 내부 링크를 감사했다.
- sitemap에서 누락된 Species 상세 URL 10개를 발견해 `src/pages/sitemap.xml.ts`가 Species 데이터에서 상세 경로를 생성하도록 수정했다. build 산출물의 Species URL은 index 포함 11개로 확인했다.
- 순수 기능 QA에서 수조 계산 기준값(60×30×35cm, 85%), Species 필수 데이터, 합사 A+B/B+A 대칭성, 검색·빈 결과를 확인했다.
- 내부 링크 audit은 0 missing, `npm run check`는 0 errors/0 warnings/0 hints, `npm run build`는 28 pages 성공이었다.
- 이미지 audit은 현재 4/10 적용 상태에서 모든 로컬 파일·metadata·alt·author·license·license URL을 확인했다. 나머지 6종 fallback은 정상적인 최종 UI로 유지한다.
- QA에서 checklist가 손상된 localStorage JSON을 `JSON.parse`에서 예외 처리하지 않는 HIGH 항목을 발견했다. 현재 인라인 스크립트를 안전하게 정리해 다음 pre-launch 수정으로 남겼다.
- production DNS·실제 배포 URL은 이 환경에서 검증하지 않았다. 최종 판정은 `LOCAL: READY AFTER FIXES / PRODUCTION: NOT YET VERIFIED`다.

## 2026-09-15 — Checklist storage recovery fix

- `/tools/aquarium-checklist/`의 기존 `{checkId: boolean}` localStorage 스키마를 유지하면서 `readState()`와 `writeState()` 방어 계층을 추가했다.
- `JSON.parse()`는 `try/catch`로 감싸고, null·배열·비객체·boolean이 아닌 값이 포함된 구조는 기본 unchecked 상태로 복구한다. 누락된 ID는 unchecked로 남고, 알 수 없는 ID는 현재 checkbox 복원에 영향을 주지 않는다.
- localStorage 읽기·쓰기 자체가 차단되는 브라우저에서도 checkbox와 진행률은 현재 세션에서 계속 동작한다. 저장 실패를 사용자에게 크게 노출하지 않는다.
- 초기화 버튼과 진행률 계산은 기존 흐름을 유지하며, 복구 직후에도 0/31·0% 또는 유효하게 복원된 개수로 표시된다.
- 검증: `npm run check` 0 errors/0 warnings/0 hints, `npm run build` 28 pages 성공. 최종 Local 판정은 `READY FOR PRODUCTION`, production은 아직 검증하지 않았다.
