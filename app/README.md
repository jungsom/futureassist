## 실행방법
### 사전 설정
python 설치되어있는지 확인(없을 시 3.11.9 버전 설치)  

java 설치되어있는지 확인(없을 시 설치)   

java 설치 후 환경설정 필요   
- [windows] https://www.codeit.kr/tutorials/43/KoNLPy-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0-Windows   
- [MAC] https://www.codeit.kr/tutorials/44/KoNLPy-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0-M1

### 서버 실행
futureassist_server/app에서 다음 명령어 실행

    python install_packages.py

or

    python3 install_packages.py

설치 완료 후, futureassist_serve/app에서 다음 명령어로 서버 실행

    uvicorn main:app --reload

## 모델 다운 방법(최초1번)
### 1. Git LFS 설치
* macOS

        brew install git-lfs

* Linux

        sudo apt-get install git-lfs

* windows : 개별 설치

### 2. Git LFS 초기화
    git lfs install

### 3. git pull해서 사용
    git pull