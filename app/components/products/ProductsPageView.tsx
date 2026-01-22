"use client";

import { useEffect, useState } from "react";
import { getProductStock, ProductStockItem } from "@/app/services/product-stock.service";
import useTranslation from "@/app/hooks/useTranslation";

export default function ProductsPage() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<ProductStockItem[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProductStock();
      setProducts(data);
    };
    fetchProducts();
  }, []); 

  return (
    <div className="ds-products">
      <h1 className="ds-page-title">{t("sidebar.products")}</h1>

      <div className="ds-promo">
        
        <div className="ds-promo__content">
          <div className="ds-promo__date">{t("products.promoDate")}</div>

          <div className="ds-promo__title" dangerouslySetInnerHTML={{ __html: t("products.promoTitle") }} />

          <div className="ds-promo__desc">
            {t("products.promoDescription")}
          </div>

          <button className="ds-promo__btn" type="button">
            {t("products.promoButton")}
          </button>
        </div>

        
        <button
          className="ds-promo__arrow ds-promo__arrow--left"
          type="button"
          aria-label="Previous"
        >
          <i className="bi bi-chevron-left" />
        </button>

        <button
          className="ds-promo__arrow ds-promo__arrow--right"
          type="button"
          aria-label="Next"
        >
          <i className="bi bi-chevron-right" />
        </button>
      </div>

      
      <div className="p-grid">
        {products.slice(0, 6).map((p, idx) => (
          <div className="p-card" key={p.id}>
            
            <div className="p-img-area">
              <button className="p-mini-arrow p-mini-arrow--left" type="button" aria-label="Prev image">
                <i className="bi bi-chevron-left" />
              </button>

              
              <img className="p-img" src={p.imageUrl} alt={p.name} />

              <button className="p-mini-arrow p-mini-arrow--right" type="button" aria-label="Next image">
                <i className="bi bi-chevron-right" />
              </button>
            </div>

            <div className="p-body">
              <div className="p-name-row">
                <div className="p-name">{p.name}</div>
                <button className="p-like" type="button" aria-label="Favorite">
                  <i className="bi bi-heart" />
                </button>
              </div>

              <div className="p-price">${p.price.toFixed(2)}</div>

            
              <div className="p-rating">
                <div className="p-stars" aria-label="Rating">
                  <i className="bi bi-star-fill" />
                  <i className="bi bi-star-fill" />
                  <i className="bi bi-star-fill" />
                  <i className="bi bi-star-fill" />
                  <i className="bi bi-star" />
                </div>
                <span className="p-reviews">({120 + idx * 11})</span>
              </div>

              <button className="p-edit-btn" type="button">
                {t("sidebar.editProduct")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
