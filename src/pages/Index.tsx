import { useState } from "react";
import { Timer } from "@/components/Timer";
import { StickerChart } from "@/components/StickerChart";
import { FloatingElements } from "@/components/FloatingElements";
import { BlobBackground } from "@/components/BlobBackground";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useBrushingData } from "@/hooks/useBrushingData";
import { toast } from "sonner";
import { Sparkles, Timer as TimerIcon, Award, ArrowLeft } from "lucide-react";
import happyTooth from "@/assets/happy-tooth.png";

type View = 'home' | 'timer' | 'chart';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('home');
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
      <div className="min-h-screen bg-background relative overflow-hidden">
        <BlobBackground />
        <FloatingElements />
        <div className="relative z-10 max-w-2xl mx-auto pt-8 px-4">
          <div className="mb-6 text-center">
            <Button 
              variant="bubbly" 
              onClick={() => setCurrentView('home')}
              className="mb-4 animate-pop-in"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Button>
          </div>
          <Timer onComplete={handleTimerComplete} />
        </div>
      </div>
    );
  }

  if (currentView === 'chart') {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <BlobBackground />
        <FloatingElements />
        <div className="relative z-10 max-w-4xl mx-auto pt-8 px-4">
          <div className="mb-6 text-center">
            <Button 
              variant="bubbly" 
              onClick={() => setCurrentView('home')}
              className="mb-4 animate-pop-in"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BlobBackground />
      <FloatingElements />
      
      <div className="relative z-10 max-w-4xl mx-auto pt-8 px-4 pb-12">
        {/* Header */}
        <div className="text-center mb-12 animate-pop-in">
          <div className="flex justify-center items-center gap-4 mb-6">
            <img 
              src={happyTooth} 
              alt="Happy Tooth" 
              className="w-20 h-20 md:w-24 md:h-24 animate-float drop-shadow-lg"
            />
            <h1 className="text-5xl md:text-7xl font-lilita bg-gradient-rainbow bg-clip-text text-transparent drop-shadow-sm">
              Brushy Time!
            </h1>
            <img 
              src={happyTooth} 
              alt="Happy Tooth" 
              className="w-20 h-20 md:w-24 md:h-24 animate-float drop-shadow-lg"
              style={{ animationDelay: '1s' }}
            />
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground font-nunito font-semibold">
            Make brushing teeth fun and earn amazing stickers! 🌟
          </p>
        </div>

        {/* Main Menu Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {/* Timer Card */}
          <Card 
            className="p-6 md:p-8 bg-card/80 backdrop-blur-sm border-2 border-primary/30 shadow-primary hover:shadow-glow transition-all duration-500 hover:scale-[1.02] hover:-rotate-1 cursor-pointer animate-pop-in overflow-hidden relative"
            style={{ animationDelay: '0.1s' }}
            onClick={() => setCurrentView('timer')}
          >
            {/* Decorative blob */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
            
            <div className="relative text-center space-y-5">
              <div className="flex justify-center">
                <div className="p-5 bg-gradient-primary rounded-[2rem] shadow-glow animate-jiggle">
                  <TimerIcon className="w-12 h-12 md:w-16 md:h-16 text-primary-foreground" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-lilita text-foreground">2-Minute Timer</h2>
              <p className="text-base md:text-lg text-muted-foreground font-nunito">
                Start your brushing adventure with our fun animated timer!
              </p>
              <Button variant="fun" size="lg" className="w-full">
                <Sparkles className="w-5 h-5" />
                Start Brushing!
              </Button>
            </div>
          </Card>

          {/* Sticker Chart Card */}
          <Card 
            className="p-6 md:p-8 bg-card/80 backdrop-blur-sm border-2 border-accent/30 shadow-fun hover:shadow-glow transition-all duration-500 hover:scale-[1.02] hover:rotate-1 cursor-pointer animate-pop-in overflow-hidden relative"
            style={{ animationDelay: '0.2s' }}
            onClick={() => setCurrentView('chart')}
          >
            {/* Decorative blob */}
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
            
            <div className="relative text-center space-y-5">
              <div className="flex justify-center">
                <div className="p-5 bg-gradient-accent rounded-[2rem] shadow-fun animate-jiggle" style={{ animationDelay: '0.3s' }}>
                  <Award className="w-12 h-12 md:w-16 md:h-16 text-accent-foreground" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-lilita text-foreground">Sticker Chart</h2>
              <p className="text-base md:text-lg text-muted-foreground font-nunito">
                Track your progress and earn amazing stickers every day!
              </p>
              <Button variant="celebration" size="lg" className="w-full">
                <Award className="w-5 h-5" />
                View Chart
              </Button>
            </div>
          </Card>
        </div>

        {/* Today's Progress */}
        <Card 
          className="p-6 bg-card/80 backdrop-blur-sm border-2 border-yellow/40 shadow-fun animate-pop-in relative overflow-hidden"
          style={{ animationDelay: '0.3s' }}
        >
          {/* Decorative elements */}
          <div className="absolute -top-8 right-10 w-24 h-24 bg-yellow/20 rounded-full blur-xl" />
          <div className="absolute -bottom-6 left-20 w-20 h-20 bg-purple/20 rounded-full blur-xl" />
          
          <div className="relative">
            <h3 className="text-2xl md:text-3xl font-lilita text-center mb-6 text-foreground">Today's Progress</h3>
            <div className="flex justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-lg font-nunito font-bold mb-3 text-muted-foreground">Morning</div>
                <div className={`w-18 h-18 md:w-20 md:h-20 rounded-[1.5rem] border-4 flex items-center justify-center text-3xl transition-all duration-500 ${
                  todaysProgress.morning 
                    ? 'bg-gradient-morning border-yellow shadow-fun scale-110 animate-jiggle' 
                    : 'bg-muted border-border'
                }`}>
                  {todaysProgress.morning ? '☀️' : '○'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-nunito font-bold mb-3 text-muted-foreground">Night</div>
                <div className={`w-18 h-18 md:w-20 md:h-20 rounded-[1.5rem] border-4 flex items-center justify-center text-3xl transition-all duration-500 ${
                  todaysProgress.night 
                    ? 'bg-gradient-night border-purple shadow-bubbly scale-110 animate-jiggle' 
                    : 'bg-muted border-border'
                }`}>
                  {todaysProgress.night ? '🌙' : '○'}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Encouraging Footer */}
        <div className="text-center mt-12 space-y-4 animate-pop-in" style={{ animationDelay: '0.4s' }}>
          <div className="text-xl font-nunito font-semibold text-muted-foreground">
            Keep up the great work! Healthy teeth make happy smiles! 😊
          </div>
          <div className="flex justify-center gap-3 text-4xl animate-bounce-gentle">
            🦷✨🌟✨🦷
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;