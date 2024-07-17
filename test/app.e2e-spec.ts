import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthService } from '../src/auth/auth.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;


  const mocktest = {
    findAll() {
      return 'Hello world'
    }
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideProvider(AuthService)
      .useValue(mocktest)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth (GET)', () => {
    return request(app.getHttpServer())
      .get('/auth')
      .expect(200)
      .expect('Hello world');
  });
});
