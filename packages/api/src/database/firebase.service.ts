import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private app: admin.app.App;
  private db: admin.firestore.Firestore;
  private auth: admin.auth.Auth;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const projectId = this.configService.get<string>('firebase.projectId');
    const privateKey = this.configService.get<string>('firebase.privateKey');
    const clientEmail = this.configService.get<string>('firebase.clientEmail');

    if (!projectId || !privateKey || !clientEmail) {
      console.warn('Firebase credentials not configured');
      return;
    }

    if (!admin.apps.length) {
      this.app = admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          privateKey,
          clientEmail,
        }),
      });
    } else {
      this.app = admin.apps[0]!;
    }

    this.db = admin.firestore();
    this.auth = admin.auth();
  }

  getFirestore(): admin.firestore.Firestore {
    return this.db;
  }

  getAuth(): admin.auth.Auth {
    return this.auth;
  }

  // Helper method to get a collection reference
  collection(name: string): admin.firestore.CollectionReference {
    return this.db.collection(name);
  }

  // Helper method to get a document reference
  doc(collection: string, id: string): admin.firestore.DocumentReference {
    return this.db.collection(collection).doc(id);
  }
}
