```markdown
# M✱MIT – 일정 관리 웹 애플리케이션
## ✨ 프로젝트 소개
**M✱MIT**는 React 기반의 일정 관리 웹 애플리케이션으로, 사용자가 월간, 주간, 일간 일정을 효율적으로 관리할 수 있도록 도와줍니다. 일정의 중요도에 따라 시각적으로 구분되며, 오늘의 할 일과 주간 기록을 한눈에 확인할 수 있습니다.

---

## 🖥 주요 기능

### 📅 월간 일정 캘린더
- 한 달치 일정을 달력에 표시
- 일정이 있는 날짜에 ● 도트로 시각화
- **도트 색상으로 중요도 구분**:
  - 🔴 빨간색: 매우 중요한 일정
  - 🟠 주황색: 중요한 일정
  - 🟢 초록색: 일반 일정

### 🕒 실시간 시계 & 날짜
- 화면 우측 상단에서 현재 시간과 날짜 실시간 표시

### 🧠 이번 주 최장 기록
- 주간 활동 시간 순위 표시 (집중도 기록)

### ➕ 일정 추가 및 삭제 기능
- 연/월/일 선택 후 일정 제목 입력하여 등록
- 당일 일정은 리스트 형태로 표시 및 삭제 가능

### 🌙 다크 모드 지원
- 버튼 클릭으로 라이트/다크 테마 전환
- 눈에 편안한 모드 제공

---

## ⚙️ 사용 기술

- **Frontend**: React, HTML, CSS, JavaScript
- **상태 관리**: React Hooks (useState, useEffect)
- **스타일링**: CSS Modules

---

## 📂 폴더 구조
```

📁 momit-project/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md

````

---

## 🛠 설치 및 실행 방법

1. 저장소 클론:
   ```bash
   git clone https://github.com/roxxny/momit-project.git
   cd momit-project
````

2. 패키지 설치:

   ```bash
   npm install
   ```

3. 개발 서버 실행:

   ```bash
   npm start
   ```

---

## 👨‍💻 개발자

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/roxxny">
        <img src="https://avatars.githubusercontent.com/u/137818103?v=4" width="100px;" alt="roxxny"/>
        <br /><sub><b>roxxny</b></sub><br />
        <sub>UI/UX 디자인</sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/kimyusin027">
        <img src="https://avatars.githubusercontent.com/u/117889573?v=4" width="100px;" alt="kimyusin027"/>
        <br /><sub><b>kimyusin027</b></sub><br />
        <sub>기능 구현</sub>
      </a>
    </td>
  </tr>
</table>

---

## 📃 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

```