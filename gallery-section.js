class GallerySection extends HTMLElement {
  connectedCallback() {
    const title   = this.getAttribute('title')   || '';
    const gallery = this.getAttribute('gallery') || '';
    const items   = (window.GALLERY_DATA || {})[gallery] || [];

    const section = document.createElement('section');
    section.className = 'gallery-section';

    const h2 = document.createElement('h2');
    h2.textContent = title;
    section.appendChild(h2);

    if (items.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'empty-state';
      empty.textContent = 'Photos coming soon.';
      section.appendChild(empty);
    } else {
      const grid = document.createElement('div');
      grid.className = 'gallery-grid';

      items.forEach(({ src, title: imgTitle }) => {
        const a = document.createElement('a');
        a.href = src;
        a.className = 'glightbox';
        a.dataset.gallery = gallery;
        if (imgTitle) a.dataset.title = imgTitle;

        const img = document.createElement('img');
        img.src = src;
        img.alt = imgTitle || '';
        img.loading = 'lazy';

        a.appendChild(img);
        grid.appendChild(a);
      });

      section.appendChild(grid);
    }

    this.replaceWith(section);

    // Re-initialise GLightbox after DOM update so it picks up new anchors.
    if (window.GLightbox) {
      window._lightbox = GLightbox({ selector: '.glightbox' });
    }
  }
}

customElements.define('gallery-section', GallerySection);
