# react-native-Facebook-Login

Practice for Facebook Login with react-native

---

### React Native FBSDK 사용하기 (Android)

- library 설치

```
yarn add react-native-fbsdk
```

or

```
npm install --save react-native-fbsdk
```

- 링크

```
react-native link react-native-fbsdk
```

- Facebook App ID 추가

  - /app/res/values/strings.xml 열기
  - 아래 코드 추가

  ```
  <string name="facebook_app_id">Facebook App ID</string>
  ```

  - /app/manifests/AndroidManifest.xml 열기
  - 아래 코드 추가

  ```
  <uses-permission android:name="android.permission.INTERNET" />
  ```

  - 아래 코드는 application 요소에 추가

  ```
  <application android:label="@string/app_name" ...>
    ...
    <meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>
    ...
  </application>
  ```

- import 해오기

```
import { LoginButton, AccessToken, LoginManager, ShareDialog } from 'react-native-fbsdk';
```

- 링크 참고하여 사용
  https://github.com/facebook/react-native-fbsdk
