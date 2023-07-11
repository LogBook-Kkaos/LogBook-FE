# Logbook: 사내 릴리즈 노트 공유 시스템

Logbook은 기술 문서를 자동으로 요약하여 릴리즈 노트를 작성해주는 사내 릴리즈 노트 공유 시스템입니다.
기술 문서를 요약해서 릴리즈 노트를 자동으로 작성할 수 있습니다.
릴리즈 노트 작성 규칙에 따라 문장을 자동 완성해주는 차별점을 가지고 있습니다.

## 프론트엔드 기술 스택

- IDE: [Visual Studio Code (VSCode)](https://code.visualstudio.com/)
- Front-end framework: [React with TypeScript](https://reactjs.org/docs/static-type-checking.html)
- Server-side rendering and static site generation: [Next.js](https://nextjs.org/)
- State management: [Recoil](https://recoiljs.org/)
- HTTP client: [Axios](https://axios-http.com/)
- Package manager: [PNPM](https://pnpm.io/)
- End-to-end Testing: [Cypress](https://www.cypress.io/)

## 시작하기

### 프로젝트 복제

```bash
git clone https://github.com/your-username/logbook.git
```

### 의존성 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm run dev
```

[http://localhost:3000](http://localhost:3000)로 웹 브라우저에서 접속하여 애플리케이션을 확인할 수 있습니다.

### 프로덕션 빌드

```bash
pnpm build
```

`next build` 명령어를 실행하여 프로덕션 환경용 빌드를 생성합니다.

```bash
pnpm start
```

생성된 빌드를 실행하며 이를 통해 애플리케이션을 확인합니다.

## 기능

- 기술 문서에서 주요 내용을 추출하여 릴리즈 노트 작성
- 릴리즈 노트 작성 규칙에 따라 문장을 자동 완성
- 릴리즈 노트 공유 및 관리를 통한 쉬운 협업 가능

## 문서
- Logbook [Google Drive](https://drive.google.com/drive/folders/1_o-brVhdnHVWNCXrYy9JFwxZykRHrk8S?usp=drive_link)
- K-Kaos [Notion](https://www.notion.so/seobinlee00/Daily-Scrum-07-07-dcbac130e1b64a58ad6b8160df767645?pvs=4)
- K-Kaos [Slack](k-kaos.slack.com)
- K-Kaos [Jira]([https://gachon-001021.atlassian.net/jira/your-work](https://leeseobin.atlassian.net/jira/software/projects/LB/boards/1)https://leeseobin.atlassian.net/jira/software/projects/LB/boards/1)
