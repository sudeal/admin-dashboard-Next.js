export type ProductStockItem = {
    id: string;
    imageUrl: string;
    name: string;
    category: string;
    price: number;
    piece: number;
    colors: string[]; // hex
  };
  
  export async function getProductStock(): Promise<ProductStockItem[]> {
    
    return [
      {
        id: "p1",
        imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80",
        name: "Apple Watch Series 4",
        category: "Digital Product",
        price: 690,
        piece: 63,
        colors: ["#111827", "#9CA3AF", "#EF4444"],
      },
      {
        id: "p2",
        imageUrl: "https://raw.githubusercontent.com/mdn/learning-area/main/html/multimedia-and-embedding/images-in-html/dinosaur_small.jpg",
        name: "Headphone",
        category: "Digital Product",
        price: 190,
        piece: 13,
        colors: ["#111827", "#EF4444", "#3B82F6", "#F59E0B"],
      },
      {
        id: "p3",
        imageUrl: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=400&q=80",
        name: "Women's Dress",
        category: "Fashion",
        price: 640,
        piece: 635,
        colors: ["#7C3AED", "#60A5FA", "#111827", "#1D4ED8"],
      },
      {
        id: "p4",
        imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
        name: "Samsung A50",
        category: "Mobile",
        price: 400,
        piece: 67,
        colors: ["#1D4ED8", "#111827", "#EF4444"],
      },
      {
        id: "p5",
        imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
        name: "Galaxy",
        category: "Mobile",
        price: 420,
        piece: 52,
        colors: ["#1D4ED8", "#111827", "#EF4444"],
      },
      {
        id: "p6",
        imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
        name: "Jewelry",
        category: "Accessory",
        price: 250,
        piece: 40,
        colors: ["#F59E0B", "#111827", "#9CA3AF"],
      },
    ];
  }
  