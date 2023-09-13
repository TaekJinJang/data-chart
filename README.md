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
- ㅁㄴㅇ

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
  
### 1. 데이터 전처리
- api 통신으로 응답받은 데이터를 차트에 넣을 수 있도록 전처리하는 코드를 유틸 함수로 분리하였습니다.
https://github.com/TaekJinJang/data-chart/blob/68e08232a66be93c2869544bf65cd8647e806b66/src/utils/processChartData.ts#L3-L10

### 2. 데이터 에러 시 처리
- 만약 차트 컴포넌트가 데이터를 받아 오지 못했다면 필터링 한 모든 마커들을 지워 사용자의 혼동을 최소화합니다.

|데이터가 없거나 로딩중일 시|
|:---:|
|<img src="https://github.com/TaekJinJang/data-chart/assets/93184838/6c7423a3-fdec-420e-a518-c77b37108ae0" style="width:500px; height:300px;"/> |


### 3. 커스텀 툴팁
- 툴팁에 id,area,bar의 값이 다 들어갈 수 있도록 커스텀 툴팁을 제작하였습니다.
- 기존 툴팁보다 사용자가 보기 편한 UI로 변경하였습니다.
- apexCharts 에선 현재 커스텀 툴팁에 HTML 문법만 허용하지만 가독성을 위해 jsx로 제작 후 renderToString으로 변경하였습니다.

https://github.com/TaekJinJang/data-chart/blob/68e08232a66be93c2869544bf65cd8647e806b66/src/components/chart/CustomTooltip.tsx#L15-L45

### 4. 다중 필터링
- `useSearchParams` 을 통해 1개 이상의 다중 필터링 기능을 제공합니다.
- 필터링 시 area 데이터가 잘 보일 수 있도록 마커를 생성합니다.
- 차트 내 특정 데이터 구역 클릭 시에도 필터링 기능을 제공합니다.

https://github.com/TaekJinJang/data-chart/blob/68e08232a66be93c2869544bf65cd8647e806b66/src/hooks/useQueryString.ts#L3-L25


## 🔫 트러블 슈팅
### Input에서 '[', '*' 입력 시 ERROR 발생
- **문제**

- **해결방안**


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

 
