export const BlobBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large background blobs */}
      <div 
        className="absolute -top-20 -left-20 w-96 h-96 bg-primary/15 animate-blob"
        style={{ animationDelay: "0s" }}
      />
      <div 
        className="absolute top-1/4 -right-20 w-80 h-80 bg-accent/15 animate-blob"
        style={{ animationDelay: "2s" }}
      />
      <div 
        className="absolute bottom-20 left-1/4 w-72 h-72 bg-secondary/15 animate-blob"
        style={{ animationDelay: "4s" }}
      />
      <div 
        className="absolute -bottom-10 right-1/3 w-64 h-64 bg-purple/15 animate-blob"
        style={{ animationDelay: "6s" }}
      />
      <div 
        className="absolute top-1/2 left-10 w-48 h-48 bg-yellow/15 animate-blob"
        style={{ animationDelay: "3s" }}
      />
    </div>
  );
};