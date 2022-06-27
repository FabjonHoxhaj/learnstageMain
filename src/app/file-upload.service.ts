import { Injectable, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileUpload } from '../app/models/file-upload.model';
import { finalize } from 'rxjs/operators';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService implements OnInit{

  constructor(private storage: AngularFireStorage, private item: CrudService) { }

  hashtag: any;

  ngOnInit(): void {
    this.item.getHashtag().subscribe((res) =>{
      this.hashtag = res;
    })
  }

  private basePath = '/uploads';
  urlLinks: any = [];
  fileName: any = [];

  pushFileToStorage(hashtagString: any, fileUpload: FileUpload) {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(
        finalize(() => {
            storageRef.getDownloadURL().subscribe(downloadURL => {
                fileUpload.url = downloadURL;
                fileUpload.name = fileUpload.file.name;
                this.saveFileData(fileUpload);
                const url: String = fileUpload.url;
                this.urlLinks.push(url);
                const filename: String = fileUpload.name;
                this.fileName.push(filename);
                this.item.saveHashtagFile(hashtagString, filename, url);
            });
        })
    ).subscribe();
}

private saveFileData(fileUpload: FileUpload): void {
  //this.db.list(this.basePath).push(fileUpload);
}


saveURL() {
   return this.urlLinks[0];
}

saveFileName() {
  return this.fileName[0];

}

}