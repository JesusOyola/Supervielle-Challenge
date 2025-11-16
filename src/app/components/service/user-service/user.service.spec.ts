import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User, Post } from '../../../models/user.interface';
import { provideHttpClient } from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const API_URL = 'https://jsonplaceholder.typicode.com';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUsers() should return an array of users', () => {
    const dummyUsers: User[] = [
      {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        phone: '123456789',
        website: 'example.com',
        address: { city: 'CityX', zipcode: '12345' },
        company: { name: 'CompanyX' },
      },
    ];

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(1);
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(`${API_URL}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('getPostsByUser() should return posts for a given userId', () => {
    const userId = 1;
    const dummyPosts: Post[] = [
      { userId, id: 1, title: 'Post 1', body: 'Body 1' },
      { userId, id: 2, title: 'Post 2', body: 'Body 2' },
    ];

    service.getPostsByUser(userId).subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyPosts);
    });

    const req = httpMock.expectOne(`${API_URL}/posts?userId=${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });
});
