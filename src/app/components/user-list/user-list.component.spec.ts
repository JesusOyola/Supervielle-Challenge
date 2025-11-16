import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../service/user-service/user.service';
import { of } from 'rxjs';
import { User, Post } from '../../models/user.interface';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  const mockUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      username: 'johnd',
      email: 'john@example.com',
      phone: '123456789',
      website: 'example.com',
      address: { city: 'NY', zipcode: '10001' },
      company: { name: 'Company A' },
    },
    {
      id: 2,
      name: 'Jane Smith',
      username: 'janes',
      email: 'jane@example.com',
      phone: '987654321',
      website: 'example.org',
      address: { city: 'LA', zipcode: '90001' },
      company: { name: 'Company B' },
    },
  ];

  const mockPosts: Post[] = [
    { userId: 1, id: 1, title: 'Post 1', body: 'Body 1' },
    { userId: 1, id: 2, title: 'Post 2', body: 'Body 2' },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['getUsers', 'getPostsByUser']);
    spy.getUsers.and.returnValue(of(mockUsers));
    spy.getPostsByUser.and.returnValue(of(mockPosts));

    await TestBed.configureTestingModule({
      imports: [
        UserListComponent,
        CommonModule,
        FormsModule,
        NzTableModule,
        NzButtonModule,
        NzDrawerModule,
        NzPaginationModule,
        NzSelectModule,
        NzDividerModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: UserService, useValue: spy },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    expect(component.users().length).toBe(2);
    expect(userServiceSpy.getUsers).toHaveBeenCalled();
  });

  it('should filter users by name or email', () => {
    component.filterText.set('Jane');
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('Jane Smith');
  });

  it('should filter users by company', () => {
    component.filterCompany.set('Company A');
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].company?.name).toBe('Company A');
  });

  it('should paginate users correctly', () => {
    component.currentPage.set(1);
    expect(component.pagedUsers.length).toBe(2);
  });

  it('should open drawer and load posts', () => {
    component.openDrawer(mockUsers[0]);
    expect(component.drawerVisible()).toBeTrue();
    expect(component.selectedUser()).toEqual(mockUsers[0]);
    expect(component.posts().length).toBe(2);
    expect(userServiceSpy.getPostsByUser).toHaveBeenCalledWith(mockUsers[0].id);
  });

  it('should close drawer and reset data', () => {
    component.openDrawer(mockUsers[0]);
    component.closeDrawer();
    expect(component.drawerVisible()).toBeFalse();
    expect(component.selectedUser()).toBeNull();
    expect(component.posts().length).toBe(0);
  });

  it('should return unique company names', () => {
    const companies = component.companies;
    expect(companies).toEqual(['Company A', 'Company B']);
  });
});
