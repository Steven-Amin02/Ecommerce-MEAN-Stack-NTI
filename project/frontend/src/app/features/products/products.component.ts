import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProductService, Product } from '../../core/services/product.service';
import { CategoryService, Category } from '../../core/services/category.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  isLoading = true;

  searchControl = new FormControl('');
  selectedCategory = '';
  sortBy = 'default';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  inStockOnly = false;
  viewMode: 'grid' | 'list' = 'grid';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Listen to reactive product stream
    this.productService.products$.subscribe((p) => {
      this.allProducts = p ?? [];
      this.applyFilters();
      if (p && p.length >= 0) this.isLoading = false;
    });

    // Read query params
    this.route.queryParams.subscribe((params) => {
      this.selectedCategory = params['category'] || '';
      if (params['search'] !== undefined) {
        this.searchControl.setValue(params['search'] || '', { emitEvent: false });
      } else if (params['q'] !== undefined) {
        this.searchControl.setValue(params['q'] || '', { emitEvent: false });
      }
      this.applyFilters();
    });

    // Load data from API
    this.productService.getAll().subscribe({
      next: (res) => {
        this.allProducts = res.data ?? [];
        this.applyFilters();
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
    });

    this.categoryService.getAll().subscribe((res) => {
      this.categories = res.data ?? [];
    });

    // Live search
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => this.applyFilters());
  }

  applyFilters(): void {
    let result = [...this.allProducts];

    // Search filter
    const q = (this.searchControl.value ?? '').toLowerCase().trim();
    if (q) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (this.selectedCategory) {
      result = result.filter((p) => {
        const cat = p.category;
        if (!cat) return false;
        if (typeof cat === 'object') {
          return cat._id === this.selectedCategory || cat.uuid === this.selectedCategory;
        }
        return cat === this.selectedCategory;
      });
    }

    // In stock filter
    if (this.inStockOnly) {
      result = result.filter((p) => (p.stock ?? 0) > 0);
    }

    // Price filter
    if (this.minPrice !== null) result = result.filter((p) => p.price >= this.minPrice!);
    if (this.maxPrice !== null) result = result.filter((p) => p.price <= this.maxPrice!);

    // Sort
    switch (this.sortBy) {
      case 'price-asc':  result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'name-asc':   result.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name-desc':  result.sort((a, b) => b.name.localeCompare(a.name)); break;
    }

    this.filteredProducts = result;
  }

  onCategoryChange(id: string): void {
    this.selectedCategory = id;
    this.applyFilters();
  }

  toggleInStockOnly(): void {
    this.inStockOnly = !this.inStockOnly;
    this.applyFilters();
  }

  onSortChange(value: string): void {
    this.sortBy = value;
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchControl.setValue('');
    this.selectedCategory = '';
    this.sortBy = 'default';
    this.minPrice = null;
    this.maxPrice = null;
    this.inStockOnly = false;
    this.applyFilters();
  }

  getCategoryName(id: string): string {
    return this.categories.find((c) => c._id === id || c.uuid === id)?.name ?? 'All';
  }
}
