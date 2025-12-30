import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import happyTooth from "@/assets/happy-tooth.png";
import toothbrushHero from "@/assets/toothbrush-hero.png";

interface TimerProps {
  onComplete: () => void;
}

export const Timer = ({ onComplete }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            toast("🎉 Great job! You brushed for 2 minutes!", {
              duration: 5000,
              style: { fontSize: "18px" }
            });
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, onComplete]);

  const handleStart = () => {
    setIsRunning(true);
    toast("🦷 Let's start brushing! Keep going for 2 minutes!", {
      style: { fontSize: "16px" }
    });
  };

  const handlePause = () => {
    setIsRunning(false);
    toast("⏸️ Timer paused. Ready to continue?");
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(120);
    setIsCompleted(false);
    toast("🔄 Timer reset! Ready for another brushing session?");
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((120 - timeLeft) / 120) * 100;

  const getEncouragementMessage = () => {
    if (isCompleted) return "🌟 Amazing job! Your teeth are sparkling clean!";
    if (timeLeft <= 30) return "🎯 Almost done! Keep brushing!";
    if (timeLeft <= 60) return "💪 You're doing great! One more minute!";
    if (timeLeft <= 90) return "🚀 Halfway there! Keep it up!";
    return "🦷 Let's make those teeth shine!";
  };

  return (
    <Card className="p-6 md:p-8 bg-card/80 backdrop-blur-sm border-2 border-primary/30 shadow-glow animate-pop-in relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-primary/20 rounded-full blur-2xl animate-blob" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-secondary/20 rounded-full blur-2xl animate-blob" style={{ animationDelay: '2s' }} />
      
      <div className="relative text-center space-y-6 md:space-y-8">
        {/* Characters */}
        <div className="flex justify-center items-center gap-6 md:gap-10">
          <div className={`transition-all duration-500 ${isRunning ? 'animate-bounce-gentle' : 'animate-float'}`}>
            <img 
              src={happyTooth} 
              alt="Happy Tooth" 
              className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-lg"
            />
          </div>
          <div className={`transition-all duration-500 ${isRunning ? 'animate-wiggle' : 'animate-float'}`} style={{ animationDelay: '0.5s' }}>
            <img 
              src={toothbrushHero} 
              alt="Toothbrush Hero" 
              className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-lg"
            />
          </div>
        </div>

        {/* Timer Display */}
        <div className="space-y-4">
          <div className={`text-7xl md:text-9xl font-lilita bg-gradient-rainbow bg-clip-text text-transparent ${isRunning ? 'animate-pulse-glow' : ''}`}>
            {minutes}:{seconds.toString().padStart(2, '0')}
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-6 md:h-8 bg-muted rounded-full overflow-hidden shadow-inner border-2 border-border">
            <div 
              className="h-full bg-gradient-rainbow transition-all duration-1000 ease-out rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              {/* Sparkle effect on progress */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white/50 rounded-full blur-sm animate-pulse" />
            </div>
          </div>
        </div>

        {/* Encouragement Message */}
        <div className="text-xl md:text-2xl font-nunito font-bold text-center animate-slide-up text-foreground">
          {getEncouragementMessage()}
        </div>

        {/* Control Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {!isRunning ? (
            <Button 
              variant="fun" 
              size="lg" 
              onClick={handleStart}
              className="animate-pulse-glow text-lg"
            >
              <Play className="w-6 h-6" />
              Start Brushing!
            </Button>
          ) : (
            <Button 
              variant="morning" 
              size="lg" 
              onClick={handlePause}
              className="text-lg"
            >
              <Pause className="w-6 h-6" />
              Pause
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleReset}
            className="text-lg"
          >
            <RotateCcw className="w-6 h-6" />
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
};