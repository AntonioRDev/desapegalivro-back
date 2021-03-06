import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private firebaseApp: firebase.app.App;

  constructor() {
    const firebaseCredentials = {
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };

    this.firebaseApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebaseCredentials),
    });
  }

  getAuth = (): firebase.auth.Auth => {
    return this.firebaseApp.auth();
  };
}
