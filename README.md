
### `npm start`
### `npm test`
### `npm run build`
### `npm run eject`
### `npm run build` fails to minify
### folder directory

capcut-clone/
│
├── public/
│   ├── index.html
│   └── assets/               # 공통 이미지, 아이콘 등 정적 파일
│
├── src/
│   ├── assets/               # 프로젝트 내에서 사용하는 정적 리소스 (예: 이미지, 비디오, 오디오)
│   ├── components/           # 재사용 가능한 컴포넌트 (버튼, 헤더 등)
│   ├── features/             # 각 기능별 컴포넌트 (동영상 편집, 타임라인 관리 등)
│   │   ├── timeline/         # 타임라인 관련 기능
│   │   ├── editor/           # 동영상 편집 기능
│   │   └── export/           # 동영상 내보내기 관련 기능
│   ├── hooks/                # 커스텀 훅
│   ├── pages/                # 각 페이지 (홈, 편집 화면 등)
│   ├── services/             # API 및 비즈니스 로직 (ffmpeg.js 연동 등)
│   ├── styles/               # 전역 스타일 (CSS, SASS, Styled-Components)
│   ├── utils/                # 유틸리티 함수 (날짜 처리, 파일 변환 등)
│   ├── App.js                # 최상위 컴포넌트
│   ├── index.js              # 엔트리 포인트
│   └── router/               # 라우팅 관련 파일
│
├── .gitignore
├── package.json
└── README.md