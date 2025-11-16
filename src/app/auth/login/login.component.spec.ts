import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzIconService } from 'ng-zorro-antd/icon';
import { UserOutline, LockOutline } from '@ant-design/icons-angular/icons';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        NzCheckboxModule,
        NzGridModule,
        NzIconModule,
      ],
      providers: [{ provide: Router, useValue: routerSpy }, NzIconService],
    }).compileComponents();

    const iconService = TestBed.inject(NzIconService);
    iconService.addIcon(...[UserOutline, LockOutline]);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.validateForm).toBeDefined();
    expect(component.validateForm.controls['email']).toBeDefined();
    expect(component.validateForm.controls['password']).toBeDefined();
  });

  it('should navigate to /users when form is valid', () => {
    component.validateForm.setValue({
      email: 'testuser@gmail.com',
      password: '123456',
    });
    component.submitForm();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/users']);
  });

  it('should mark controls as dirty when form is invalid', () => {
    const usernameControl = component.validateForm.controls['email'];
    const passwordControl = component.validateForm.controls['password'];

    component.validateForm.setValue({
      email: '',
      password: '',
    });

    component.submitForm();

    expect(usernameControl.dirty).toBeTrue();
    expect(passwordControl.dirty).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
