import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpService } from 'src/app/shared/services/http.service';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.css']
})
export class UserImageComponent implements OnInit {
  private photo: SafeResourceUrl;
  @Input() photoUrl: string;

  constructor(private sanitizer: DomSanitizer, private service: HttpService) {}

  ngOnInit() {
    this.getPhoto(this.photoUrl);
  }

  getPhoto = (photo: string) => {
    this.service
      .download(photo)
      .pipe(take(1))
      .subscribe(
        ({ url }) =>
          (this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(url))
      );
  }
}
