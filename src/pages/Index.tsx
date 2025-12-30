import { useState } from "react";
import { Timer } from "@/components/Timer";
import { StickerChart } from "@/components/StickerChart";
import { QRCodeShare } from "@/components/QRCodeShare";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useBrushingData } from "@/hooks/useBrushingData";
import { toast } from "sonner";
import { Sparkles, Timer as TimerIcon, Award, QrCode } from "lucide-react";
import happyTooth from "@/assets/happy-tooth.png";

type View = 'home' | 'timer' | 'chart';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [showQR, setShowQR] = useState(false);
  const { records, addBrushingSession, getTodaysProgress } = useBrushingData();

  const handleTimerComplete = () => {
    toast("🎉 Congratulations! Timer completed!", {
      duration: 3000,
      style: { fontSize: "18px" }
    });
    setCurrentView('chart');
  };

  const handleAddSticker = (period: 'morning' | 'night') => {
    addBrushingSession(period);
    toast(
      period === 'morning' 
        ? "🌅 Good morning! You earned your morning sticker!" 
        : "🌙 Good night! You earned your night sticker!",
      {
        duration: 3000,
        style: { fontSize: "16px" }
      }
    );
  };

  const todaysProgress = getTodaysProgress();

  if (currentView === 'timer') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-light/20 via-secondary-light/20 to-accent-light/20 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <div className="mb-6 text-center">
            <Button 
              variant="outline" 
              onClick={() => setCurrentView('home')}
              className="mb-4"
            >
              ← Back to Home
            </Button>
          </div>
          <Timer onComplete={handleTimerComplete} />
        </div>
      </div>
    );
  }

  if (currentView === 'chart') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-light/30 via-purple-light/20 to-primary-light/20 p-4">
        <div className="max-w-4xl mx-auto pt-8">
          <div className="mb-6 text-center">
            <Button 
              variant="outline" 
              onClick={() => setCurrentView('home')}
              className="mb-4"
            >
              ← Back to Home
            </Button>
          </div>
          <StickerChart 
            records={records} 
            onAddSticker={handleAddSticker} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/20 via-secondary-light/20 to-accent-light/20 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <img 
              src={happyTooth} 
              alt="Happy Tooth" 
              className="w-20 h-20 animate-bounce-gentle"
            />
            <h1 className="text-6xl font-bold bg-gradient-rainbow bg-clip-text text-transparent">
              Brushy Time!
            </h1>
            <img 
              src={happyTooth} 
              alt="Happy Tooth" 
              className="w-20 h-20 animate-bounce-gentle"
              style={{ animationDelay: '0.5s' }}
            />
          </div>
          <p className="text-2xl text-muted-foreground font-semibold">
            Make brushing teeth fun and earn amazing stickers! 🌟
          </p>
        </div>

        {/* Main Menu Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Timer Card */}
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary-light/20 border-2 border-primary/20 shadow-primary hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="text-center space-y-6" onClick={() => setCurrentView('timer')}>
              <div className="flex justify-center">
                <div className="p-4 bg-gradient-primary rounded-full shadow-glow">
                  <TimerIcon className="w-16 h-16 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold">2-Minute Timer</h2>
              <p className="text-lg text-muted-foreground">
                Start your brushing adventure with our fun animated timer!
              </p>
              <Button variant="fun" size="xl" className="w-full">
                <Sparkles className="w-6 h-6" />
                Start Brushing!
              </Button>
            </div>
          </Card>

          {/* Sticker Chart Card */}
          <Card className="p-8 bg-gradient-to-br from-accent/10 to-yellow-light/20 border-2 border-accent/20 shadow-fun hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="text-center space-y-6" onClick={() => setCurrentView('chart')}>
              <div className="flex justify-center">
                <div className="p-4 bg-gradient-accent rounded-full shadow-fun">
                  <Award className="w-16 h-16 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold">Sticker Chart</h2>
              <p className="text-lg text-muted-foreground">
                Track your progress and earn amazing stickers every day!
              </p>
              <Button variant="celebration" size="xl" className="w-full">
                <Award className="w-6 h-6" />
                View Chart
              </Button>
            </div>
          </Card>
        </div>

        {/* Today's Progress */}
        <Card className="p-6 bg-gradient-to-r from-morning-sun/20 to-night-moon/20 border-2 border-yellow/30 shadow-fun">
          <h3 className="text-2xl font-bold text-center mb-6">Today's Progress</h3>
          <div className="flex justify-center gap-12">
            <div className="text-center">
              <div className="text-lg font-semibold mb-2">Morning</div>
              <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-2xl ${
                todaysProgress.morning 
                  ? 'bg-gradient-morning border-yellow text-white' 
                  : 'bg-gray-100 border-gray-300 text-gray-400'
              }`}>
                {todaysProgress.morning ? '✓' : '○'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold mb-2">Night</div>
              <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-2xl ${
                todaysProgress.night 
                  ? 'bg-gradient-night border-purple text-white' 
                  : 'bg-gray-100 border-gray-300 text-gray-400'
              }`}>
                {todaysProgress.night ? '✓' : '○'}
              </div>
            </div>
          </div>
        </Card>

        {/* Encouraging Footer */}
        <div className="text-center mt-12 space-y-4">
          <div className="text-xl font-semibold text-muted-foreground">
            Keep up the great work! Healthy teeth make happy smiles! 😊
          </div>
          <div className="flex justify-center gap-4 text-4xl animate-bounce-gentle">
            🦷✨🌟✨🦷
          </div>
          <Button
            variant="outline"
            onClick={() => setShowQR(true)}
            className="mt-4"
          >
            <QrCode className="w-5 h-5 mr-2" />
            Open on Another Device
          </Button>
        </div>

        {showQR && <QRCodeShare onClose={() => setShowQR(false)} />}
      </div>
    </div>
  );
};

export default Index;