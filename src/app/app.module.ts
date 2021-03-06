import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { ChatComponent } from './component/chat/chat.component';
import { UserComponent } from './component/user/user.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { SocketService } from './shared/services/socket/socket.service';
import { HttpService } from './shared/services/http/http.service';
import { RoomListComponent } from './component/chat/room-list/room-list.component';
import { UserListComponent } from './component/chat/user-list/user-list.component';
import { InputComponent } from './component/chat/input/input.component';
import { MessageContainerComponent } from './component/chat/message-container/message-container.component';
import { UserImageComponent } from './component/chat/user-list/user-image/user-image.component';
import { DatePipe } from '@angular/common';

export function tokenGetter() {
  return localStorage.getItem('auth-token');
}

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    AppLayoutComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    ChatComponent,
    RoomListComponent,
    UserListComponent,
    InputComponent,
    MessageContainerComponent,
    UserImageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/auth/']
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    SocketService,
    HttpService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
