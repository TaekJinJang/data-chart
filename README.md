# 서울시 데이터 기반 시계열 차트
 - 주어진 데이터를 기반으로 복합형 그래프 형태의 시계열 차트를 구현합니다.
 - 핵심 기능 : `시계열 차트`, `Hover 툴팁`, `지역별 필터링`

## ⏲️ 개발 기간
 - 2023.09.10 ~ 2023.09.13

## 🙂 시작 가이드
* 배포 주소

  🔗 https://recommend-search.vercel.app/

* 프로젝트 실행 방법
  ```
   $ npm install
   $ npm start
  ```

## 💡 과제 목적
- **데이터 시각화**
  - 사용자가 직관적으로 이해할 수 있도록 데이터를 적절히 가공하고, 이를 차트에 시각화하였습니다.
- **클린 코드 작성**
  - 의존성 역전 원칙(DIP), 단일 책임 원칙(SRP), 개방-폐쇄 원칙(OCP) 를 유의하며 코드를 작성하였습니다.
  - 유연하고 유지보수가 쉬운 구조의 코드를 목표로 하였습니다.
- **직관적이고 편리한 UI/UX**
  - 사용자 경험이 우선이라는 접근 방식을 선택하여 사용자가 불편함 없이 서비스를 이용할 수 있도록 직관적인 UI와 편리한 UX 디자인에 노력을 기울였습니다.
- **가독성 향상**
  - 변수명과 함수명 선택에 주의하여 코드의 명확성과 가독성을 높이는 것에 신경썼습니다.
  - 차트 옵션 설정 부분은 별도의 함수로 분리하여 복잡성을 줄이고 가독성을 향상시켰습니다.

## 🎥 화면 구성

|   화면 구성     |   
| :-------------------------: | 
| ![recommendSearch](https://github.com/TaekJinJang/recommend-search/assets/93184838/7eb71b5c-5137-4865-8f70-98a4b25de0c0) |


## 📁 디렉토리 구조
```
📦src
 ┣ 📂apis
 ┣ 📂assets
 ┣ 📂components
 ┃ ┣ 📂chart
 ┃ ┗ 📂icon
 ┣ 📂constants
 ┣ 📂hooks
 ┣ 📂pages
 ┣ 📂styles
 ┣ 📂types
 ┣ 📂utils
 ```
## 🚩 코드 컨벤션
<details>
    <summary><b>👈 컨벤션 보기 </b></summary>
 
| 커밋 유형 | 의미 |
| --- | --- |
| init | 프로젝트 시작 |
| feat | 기능 추가 |
| style | 코드 포맷팅 |
| refactor | 코드 리팩토링 |
| chore | 패키지 매니저 및 그 외 기타 수정 ex) .gitignore |
| rename | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우 |
| remove | 파일을 삭제하는 작업만 수행한 경우 |
| setting | 기본 세팅 변경의 경우 |
| docs | README.md 수정 등 |
| design | UI 디자인 |
| fix | 오타 및 오류로 인한 버그 수정 |
| merge | 머지, 충돌해결 등  |

</details>
<br/>

## ✔️ 주요 기능

### `시계열 차트`
- **영역(area)** 그래프와 **막대(bar) 그래프**를 결합하여 **복합형 그래프**를 제공합니다.
- 두 그래프의 **가독성**을 높이기 위해, 영역 그래프의 y축 눈금 **최대값**을 **2배**로 설정하였습니다.
  - 영역 그래프와 막대 그래프 간의 **상호작용을 명확**하게 보여줍니다.

### `호버 기능`
- 차트에 마우스 호버 시 해당 구역의 **지역(id)**, **area**, **bar**, **time** 데이터를 툴팁 형태로 제공합니다.

 |호버 시 (필터링 X)|호버 시 (필터링 O)|
 |:---:|:---:|
 |![](https://velog.velcdn.com/images/taek_jini/post/cf9fc2ce-aac8-4217-b3dd-40bb41aa8662/image.png)|![](https://velog.velcdn.com/images/taek_jini/post/fc5cc95c-048e-4ff4-a75f-ff375c4f8b8a/image.png)


### `필터링 기능`
- 필터링 기능은 버튼 형태로 **id(지역)** 를 제공합니다.
- 버튼 **클릭** 시 선택한 id값과 동일한 데이터 구역을 하이라이트 처리합니다.
- 특정 데이터 구역을 **`클릭`**  시에도 id값에 따라서 필터링 기능을 제공합니다.
- 1개 이상의 다중 필터링 기능을 제공합니다.
- 필터링 시 area 데이터가 잘 보일 수 있도록 **마커** 생성

 |필터링 데모 영상|필터링 시 area 마커|
 |:---:|:---:|
 |![filtering](https://github.com/TaekJinJang/data-chart/assets/93184838/bd477c09-b317-45ee-8099-bdbfefda1c30)|![](https://velog.velcdn.com/images/taek_jini/post/504d0f1e-7b0a-4af3-b81f-3e1bf9c27ff8/image.png)


## ⭐️ 구현 방법 ⭐️

### 0. 차트 라이브러리 선택
 - 차트 라이브러리 선택의 **기준**
   - 공식문서가 잘 정리되어 있는가 ?
   - 지속적인 업데이트 및 질의응답이 잘 되고 있는가 ?
   - 커스터마이징이 자유로운가 ?
 - 기준에 충족하는 라이브러리 `chart.js`, `recharts`, `apexcharts` 를 탐색하였습니다. 
 - 그 중 차트 템플릿에 **여러 기본 기능**(줌 인/아웃, 차트 이미지 다운로드 등)이 내장되어 있으며  커스터마이징이 가장 자유로운 **`apexCharts`** 를 선택하게 되었습니다.
  
### 1. 데이터 전처리
- API 통신을 통해 받은 데이터를 차트에 적용할 수 있도록 **전처리하는 작업**을 진행하였습니다.
- 전처리 코드를 **유틸 함수**로 분리하여 **코드의 가독성**과 **재사용성**을 높였습니다.

https://github.com/TaekJinJang/data-chart/blob/68e08232a66be93c2869544bf65cd8647e806b66/src/utils/processChartData.ts#L3-L10

### 2. 데이터 에러 시 처리
- 차트 컴포넌트가 데이터를 제대로 받아오지 못한 경우, 모든 필터링된 마커들을 지우는 방식으로 사용자의 혼동을 최소화하는 처리를 하였습니다.
- **잠재적인 오류 상황**에 대응하고 **UX**를 개선하였습니다.

|데이터가 없거나 로딩중일 시|
|:---:|
|<img src="https://github.com/TaekJinJang/data-chart/assets/93184838/6c7423a3-fdec-420e-a518-c77b37108ae0" style="width:500px; height:300px;"/> |


### 3. 커스텀 툴팁
- 툴팁에 id,area,bar의 값이 모두 표시될 수 있도록 커스텀 툴팁을 제작하였습니다.
- 기존 툴팁의 디자인을 개선하여 시각적으로 더욱 **효과적인 UI**로 변경하였습니다.
- **ApexCharts**는 현재 HTML 문법만을 커스텀 툴팁에서 지원하고 있습니다. 하지만 **가독성**을 높이기 위해 JSX로 툴팁을 제작한 후, `renderToString` 함수를 이용하여 HTML 문자열로 변환하였습니다.

https://github.com/TaekJinJang/data-chart/blob/68e08232a66be93c2869544bf65cd8647e806b66/src/components/chart/CustomTooltip.tsx#L15-L45

### 4. 다중 필터링
- `useSearchParams` 를 활용하여 사용자가 **한 개 이상**의 **필터링 조건**을 설정할 수 있는 기능을 구현하였습니다.
- 데이터가 필터링 될 때마다 해당 area 데이터를 명확히 보여주기 위해 **마커**를 생성합니다.
- 차트 내 특정 데이터 구역 **클릭** 시에도 해당 영역에 대한 필터링이 적용되도록 기능을 추가하였습니다.

https://github.com/TaekJinJang/data-chart/blob/68e08232a66be93c2869544bf65cd8647e806b66/src/hooks/useQueryString.ts#L3-L25


## 🔫 트러블 슈팅
### ApexCharts 차트 우선순위 이슈
- **문제**
  - ApexCharts에서는 차트의 우선 순위가 **area**보다 **bar**가 높게 설정되어 있어, 이를 직접 변경할 수 없었습니다.
    
- **해결방안**
  - 과제 기간이 짧아 라이브러리를 변경하기에는 무리가 있다고 판단하였습니다.
  - 따라서, chartOptions 중 fill의 **opacity(투명도)** 와 **stroke(선 굵기)** 를 조정하여 사용자가 차트의 데이터를 쉽게 인식할 수 있도록 **UI** 를 개선하였습니다.
  
### 커스텀 툴팁 renderToString 사용으로 인한 스타일 적용 이슈
- **문제**
  - 커스텀 툴팁은 HTML 문자열을 받아 처리하는데, JSX를 사용하려면 **renderToString** 을 통해 **변환** 해야 했습니다.
  - 하지만 renderToString으로 변환된 문자열은 실제 **DOM** 요소와 연결되지 않아 스타일 적용이 제대로 되지 않았습니다.
   
- **해결방안**
  - `styled-components` 모듈에서 제공하는 `ServerStyleSheet`을 활용해 보았으나, 문제 해결에 실패하였습니다.
  - 특정 조건 하에서 간혈적으로 발생하는 버그였으나 현재는 정상 작동 중입니다.
  - 해당 문제의 원인과 해결 방법을 파악하기 위해 **ApexCharts**에 **issue**를 등록하여 지속적인 모니터링 및 수정을 위한 대응을 하고 있습니다.

## 💡 기술스택 

### Development

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">

### Library
<img src="https://img.shields.io/badge/styled%20components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"> <img src="https://img.shields.io/badge/Axios-DA291C?style=for-the-badge&logo=axios&logoColor=white">  <img src="https://img.shields.io/badge/React Router Dom-3178C6?style=for-the-badge&logo=&logoColor=white"> <img src="https://img.shields.io/badge/ApexCharts-512BD4?style=for-the-badge">

### Convention

<img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white"> <img src="https://img.shields.io/badge/husky-FF4088?style=for-the-badge&logo=hugo&logoColor=white">

### Environment

<img src="https://img.shields.io/badge/visual Studio code-007ACC?style=for-the-badge&logo=VisualStudioCode&logoColor=white"> <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

### Config

<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">

### Communication

<img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">

 
