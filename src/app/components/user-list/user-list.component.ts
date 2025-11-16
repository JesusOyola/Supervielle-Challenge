import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { UserService } from '../service/user-service/user.service';
import { User, Post } from '../../models/user.interface';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzDrawerModule,
    NzPaginationModule,
    NzSelectModule,
    NzDividerModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService);

  users = signal<User[]>([]);
  drawerVisible = signal(false);
  selectedUser = signal<User | null>(null);
  posts = signal<Post[]>([]);

  filterText = signal('');
  filterCompany = signal('');

  readonly pageSize = 5;
  currentPage = signal(1);

  ngOnInit(): void {
    this.userService.getUsers().subscribe((list) => {
      this.users.set(list || []);
      this.currentPage.set(1);
    });
  }

  get filteredUsers(): User[] {
    let arr = this.users();
    const txt = this.filterText().trim().toLowerCase();
    if (txt) {
      arr = arr.filter(
        (u) => u.name.toLowerCase().includes(txt) || u.email.toLowerCase().includes(txt),
      );
    }
    if (this.filterCompany()) {
      arr = arr.filter((u) => u.company?.name === this.filterCompany());
    }
    return arr;
  }

  get pagedUsers(): User[] {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredUsers.slice(start, start + this.pageSize);
  }

  onPageIndexChange(index: number): void {
    this.currentPage.set(index);
  }

  openDrawer(user: User) {
    console.log(user);
    this.selectedUser.set(user);

    this.drawerVisible.set(true);

    this.userService.getPostsByUser(user.id).subscribe((posts) => {
      this.posts.set(posts.slice(0, 5));
    });
  }

  closeDrawer() {
    this.drawerVisible.set(false);
    this.selectedUser.set(null);
    this.posts.set([]);
  }

  get companies(): string[] {
    return Array.from(
      new Set(
        this.users()
          .map((u) => u.company?.name)
          .filter(Boolean),
      ),
    );
  }
}
