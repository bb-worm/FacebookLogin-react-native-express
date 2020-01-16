import React, {Component} from 'react';
import {StyleSheet, Text, TouchableHighlight, View, Button} from 'react-native';
import {
  LoginButton,
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

export default class fblogin extends Component {
  __getAccessToken() {
    AccessToken.getCurrentAccessToken()
      .then(data => {
        if (data) {
          console.log(data.accessToken.toString());
          return data.accessToken.toString();
        } else {
          console.log(`There is no accessToken`);
        }
      })
      .catch(err => console.log(err));
  }

  __getUserInfo() {
    const req = new GraphRequest(
      '/me',
      {
        httpMethod: 'GET',
        version: 'v2.5',
        parameters: {
          fields: {
            string: 'email,name, friends',
          },
        },
      },
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
      },
    );

    new GraphRequestManager().addRequest(req).start();
  }

  // LoginManager
  __handleFacebookLogin() {
    LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'user_friends',
    ])
      .then(result => {
        if (result.isCancelled) {
          console.log(`Login cancelled`);
        } else {
          console.log(
            `Login success with permissions: ${result.grantedPermissions.toString()}`,
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <LoginButton
          // LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log(result.error);
            } else if (result.isCancelled) {
              console.log(`login is cancelled`);
            } else {
              console.log(result.grantedPermissions);
              this.__getAccessToken();
            }
          }}
          onLogoutFinished={() => console.log(`logout~`)}
        />
        <Button
          // LoginManager
          onPress={this.__handleFacebookLogin}
          title="페이스북으로 로그인"
          color="#4267B2"
        />
        <Button
          // AccessToken
          onPress={this.__getAccessToken}
          title="Get accessToken"
          color="#111111"
        />
        <Button
          // GraphRequest
          onPress={this.__getUserInfo}
          title="Get GraphRequest"
          color="#111111"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
