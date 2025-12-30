import { QRCodeSVG } from "qrcode.react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Smartphone } from "lucide-react";

interface QRCodeShareProps {
  onClose: () => void;
}

export const QRCodeShare = ({ onClose }: QRCodeShareProps) => {
  const appUrl = window.location.origin;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="p-8 bg-card border-2 border-primary/20 shadow-glow max-w-sm w-full relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </Button>
        
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-primary rounded-full">
              <Smartphone className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold">Open on Another Device</h2>
          <p className="text-muted-foreground">
            Scan this QR code with your phone or tablet to open Brushy Time!
          </p>
          
          <div className="flex justify-center p-4 bg-background rounded-xl border-2 border-border">
            <QRCodeSVG
              value={appUrl}
              size={200}
              level="H"
              includeMargin
              bgColor="transparent"
              fgColor="hsl(var(--foreground))"
            />
          </div>
          
          <p className="text-sm text-muted-foreground break-all">
            {appUrl}
          </p>
        </div>
      </Card>
    </div>
  );
};
