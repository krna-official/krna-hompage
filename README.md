# ㈜케이알앤에이 홈페이지

www.k-rna.co.kr 의 소스입니다. 저장하면 GitHub Actions가 자동으로 사이트를 다시 만들어 올립니다(1~2분).

## 내용 고치는 방법
- **웹 관리자:** https://app.pagescms.org 에서 GitHub로 로그인 → `krna-hompage` 선택. 구축 사례, 제품, 공지사항, 회사 정보를 글쓰기처럼 고칠 수 있습니다.
- **Claude에게 요청:** 프로젝트에서 "사례 하나 추가해줘"처럼 말하면 됩니다.

## 파일 위치
- 회사 정보(주소·전화): `src/_data/site.json`
- 연혁: `src/_data/history.json`
- 메뉴: `src/_data/nav.json`
- 구축 사례: `src/cases/*.md` / 제품: `src/products/*.md` / 공지: `src/notices/*.md`
- 사진: `src/images/`
- 디자인: `src/assets/css/style.css`, 페이지 틀: `src/_includes/`

## 내 컴퓨터에서 미리보기
```
npm install
npm start
```
