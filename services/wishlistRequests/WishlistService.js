

import FetchRequest from '../fetchRequests/fetchRequests';
import AsyncStorage from '@react-native-community/async-storage';
export default class WishListService {
  static async AddToWishList(id) {
    let auth_token = await AsyncStorage.getItem('@lahanur_auth:token');
    let callMe = FetchRequest.apiCallPost(
      '/api/v1/products/' + id + '/add_to_wishlist.json',
      'POST',
      '',
      (headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth_token,
      }),
    );
    return callMe.content;
  }

  static async RemoveFromWishList(id) {
    let auth_token = await AsyncStorage.getItem('@lahanur_auth:token');
    let callMe = FetchRequest.apiCallPost(
      '/api/v1/products/' + id + '/remove_from_wishlist.json',
      'DELETE',
      '',
      (headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth_token,
      }),
    );
    return callMe.content;
  }
}
