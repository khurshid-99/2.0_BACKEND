
import { Link, useNavigate, useSearchParams } from "react-router";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");

  const orderDetails = {
    number: orderId || "#SNT-29847",
    date: new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    payment: "Paid via Razorpay",
    delivery: "14–16 May 2026",
  };

  const items = [
    {
      title: "Midnight Velvet Blazer",
      variant: "Navy / L",
      qty: 1,
      price: "$450",
      image: null,
    },
    {
      title: "Silk Pocket Square",
      variant: "Gold / One Size",
      qty: 1,
      price: "$85",
      image: null,
    },
  ];

  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#1b1c1a] font-sans selection:bg-[#C9A96E]/30">
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* Top Nav */}
      <nav className="sticky top-0 bg-[#fbf9f5] px-8 py-6 border-b border-[#e4e2df] flex items-center z-50">
        <Link
          to="/"
          className="font-['Cormorant_Garamond'] text-2xl tracking-[0.2em] text-[#C9A96E] hover:opacity-80 transition-opacity"
        >
          Snitch.
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-20 pb-12 px-6 text-center">
        {/* Animated Checkmark Container */}
        <div className="relative w-32 h-32 mb-8">
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-full border-2 border-[#C9A96E] animate-ping opacity-20"></div>
          <div className="absolute inset-0 rounded-full border border-[#C9A96E] animate-pulse opacity-40"></div>
          
          <svg
            viewBox="0 0 120 120"
            className="relative w-full h-full drop-shadow-sm"
          >
            <circle
              cx="60"
              cy="60"
              r="55"
              stroke="#C9A96E"
              strokeWidth="2"
              fill="none"
              className="opacity-20"
            />
            <circle
              cx="60"
              cy="60"
              r="55"
              stroke="#C9A96E"
              strokeWidth="2"
              fill="none"
              strokeDasharray="345"
              strokeDashoffset="345"
              className="animate-[draw_1.5s_ease-out_forwards]"
            />
            <path
              d="M40 60 L55 75 L80 45"
              stroke="#C9A96E"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="100"
              strokeDashoffset="100"
              className="animate-[draw_0.8s_ease-out_0.5s_forwards]"
            />
          </svg>
        </div>

        <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-7xl font-light leading-tight mb-4 text-[#1b1c1a]">
          Your order is confirmed.
        </h1>
        
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#B5ADA3] font-medium mb-12 max-w-md mx-auto leading-loose">
          Thank you for your purchase. We'll notify you once your order ships.
        </p>

        <div className="w-24 h-px bg-[#C9A96E]/40 mb-20"></div>
      </section>

      {/* Order Details & Summary Container */}
      <main className="max-w-3xl mx-auto px-6 pb-24">
        {/* Details Card */}
        <div className="bg-white rounded-sm shadow-[0_20px_40px_rgba(27,28,26,0.03)] p-8 md:p-12 mb-12 border border-[#e4e2df]/50">
          <h3 className="font-['Cormorant_Garamond'] text-2xl mb-8 font-light">Order Summary</h3>
          
          <div className="space-y-6">
            {Object.entries(orderDetails).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 py-1 border-b border-[#f5f3f0] last:border-0"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A6E63] font-semibold">
                  {key.replace(/([A-Z])/g, " $1").trim().toUpperCase()}
                </span>
                <span className="text-[13px] tracking-wide text-[#1b1c1a] font-medium">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Items Ordered List */}
        <div className="space-y-8 mb-16">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex gap-8 items-center p-4 hover:bg-white transition-colors duration-300 rounded-sm"
            >
              <div className="w-24 h-32 bg-[#f5f3f0] flex-shrink-0 flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-['Cormorant_Garamond'] italic text-[#B5ADA3] text-sm">Sample</span>
                )}
              </div>
              
              <div className="flex-1">
                <h2 className="font-['Cormorant_Garamond'] text-xl text-[#1b1c1a] mb-1">
                  {item.title}
                </h2>
                <p className="text-[10px] uppercase tracking-widest text-[#B5ADA3] mb-3">
                  {item.variant}
                </p>
                <div className="flex justify-between items-end">
                  <p className="text-xs text-[#7A6E63]">
                    Qty: <span className="text-[#1b1c1a] font-medium">{item.qty}</span>
                  </p>
                  <p className="text-sm font-medium tracking-tight text-[#1b1c1a]">
                    {item.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            className="w-full sm:w-auto min-w-[240px] px-10 py-5 bg-[#1b1c1a] text-white text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-[#C9A96E] transition-all duration-500 shadow-lg shadow-black/5"
            onClick={() => {/* tracking logic */}}
          >
            Track Your Order
          </button>
          
          <button
            className="w-full sm:w-auto min-w-[240px] px-10 py-5 bg-transparent border border-[#d0c5b5] text-[#1b1c1a] text-[11px] uppercase tracking-[0.25em] font-medium hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-500"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </main>

      {/* Footer Strip */}
      <footer className="py-12 border-t border-[#e4e2df] bg-white">
        <p className="text-center text-[9px] uppercase tracking-[0.3em] text-[#B5ADA3] font-medium">
          Free Returns · 14 Days · Authenticity Guaranteed
        </p>
      </footer>

      {/* Custom Keyframes for Animations */}
      <style>{`
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};

export default OrderSuccess;
