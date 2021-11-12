import { FirebaseService } from './firebase.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [FirebaseService],
  exports: [FirebaseService]
})
export class FirebaseModule {}
