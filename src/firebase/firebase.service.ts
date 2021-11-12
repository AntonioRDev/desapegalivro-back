import { Injectable } from '@nestjs/common';
import * as firebase from "firebase-admin";
import firebaseConfig from '../config/firebaseConfig';

@Injectable()
export class FirebaseService {
    private firebaseApp: firebase.app.App;

    constructor() {
        this.firebaseApp = firebase.initializeApp({
            credential: firebase.credential.cert(firebaseConfig)
        });
    }

    getAuth = (): firebase.auth.Auth => {
        return this.firebaseApp.auth();
    }
}
