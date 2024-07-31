## 실행방법
python 설치되어있는지 확인(없을 시 3.11.9 버전 설치)  

java 설치되어있는지 확인(없을 시 설치)  

futureassist_server에서 다음 명령어 실행

    pip install -r requirements.txt

설치 완료 후, 다음 명령어로 서버 실행

    uvicorn app.main:app --reload

## 모델 다운 방법
### 1. Git LFS 설치   
* macOS

        brew install git-lfs

* Linux

        sudo apt-get install git-lfs

* windows   
개별 설치


### 2. Git LFS 초기화
    git lfs install

### 3. git pull해서 사용