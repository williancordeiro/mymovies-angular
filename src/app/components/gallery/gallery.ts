import { Component, inject, signal, OnInit } from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.html',
})
export class Gallery implements OnInit {
  protected service = inject(ProfileService);
  images = signal<{ id: number; url: string }[]>([]);
  error = signal<string | null>(null);

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getGalleryImages().subscribe({
      next: (res) => this.images.set(res.images),
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.service.addGalleryImage(input.files[0]).subscribe({
        next: () => this.load(), // recarrega após subir
        error: (err) => this.error.set(err.errors?.['image_file']?.[0] ?? 'Erro no upload'),
      });
    }
  }

  remove(id: number) {
    this.service.deleteGalleryImage(id).subscribe({
      next: () => this.images.update((list) => list.filter((i) => i.id !== id)),
    });
  }
}
