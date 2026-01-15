export type DashboardStat = {
    id: string;
    title: string;        
    value: string;        
    deltaText: string;    
    deltaType: "up" | "down";
    icon: string;         
    iconBgClass: string;  
  };
  
  export async function getDashboardStats(): Promise<DashboardStat[]> {
    
    return [
      {
        id: "users",
        title: "Total User",
        value: "40,689",
        deltaText: "8.5% Up from yesterday",
        deltaType: "up",
        icon: "bi-people",
        iconBgClass: "ds-stat__iconbg--purple",
      },
      {
        id: "orders",
        title: "Total Order",
        value: "10293",
        deltaText: "1.3% Up from past week",
        deltaType: "up",
        icon: "bi-box-seam",
        iconBgClass: "ds-stat__iconbg--orange",
      },
      {
        id: "sales",
        title: "Total Sales",
        value: "$89,000",
        deltaText: "4.3% Down from yesterday",
        deltaType: "down",
        icon: "bi-graph-up",
        iconBgClass: "ds-stat__iconbg--green",
      },
      {
        id: "pending",
        title: "Total Pending",
        value: "2040",
        deltaText: "1.8% Up from yesterday",
        deltaType: "up",
        icon: "bi-clock",
        iconBgClass: "ds-stat__iconbg--red",
      },
    ];
  }
  