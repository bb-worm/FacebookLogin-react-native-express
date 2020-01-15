import React, {Component} from 'react';
import {StyleSheet, Text, TouchableHighlight, View, Button} from 'react-native';
import {LoginButton, LoginManager, AccessToken} from 'react-native-fbsdk';

export default class fblogin extends Component {
  handleFacebookLogin() {
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
            `Login success with premissions: ${result.grantedPermissions.toString()}`,
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
        <Button
          onPress={this.handleFacebookLogin}
          title="페이스북으로 로그인"
          color="#4267B2"
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
