import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  getGalleryImages() {
  return this.http.get<{ images: { id: number; url: string }[] }>(
    `${this.API_URL}/gallery/images`
  ).pipe(catchError(handleError));
}

// Sobe uma imagem nova
addGalleryImage(file: File) {
  const formData = new FormData();
  formData.append('image_file', file);            // mesmo nome que o backend lê em $_FILES
  return this.http.post(`${this.API_URL}/gallery/images`, formData)
    .pipe(catchError(handleError));
}

// Remove uma imagem específica por id
deleteGalleryImage(id: number) {
  return this.http.delete(`${this.API_URL}/gallery/images/${id}`)
    .pipe(catchError(handleError));
}

// URL pública da imagem (mesmo padrão de getAvatarUrl)
getGalleryUrl(path: string): string {
  return `${this.API_URL}${path}`;
}
});
