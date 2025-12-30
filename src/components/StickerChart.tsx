import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Trophy } from "lucide-react";
import happyToothSticker from "@/assets/happy-tooth-sticker.png";
import morningSun from "@/assets/morning-sun.png";
import nightMoon from "@/assets/night-moon.png";

interface BrushingRecord {
  date: string;
  morning: boolean;
  night: boolean;
}

interface StickerChartProps {
  onAddSticker: (period: 'morning' | 'night') => void;
  records: BrushingRecord[];
}

export const StickerChart = ({ onAddSticker, records }: StickerChartProps) => {
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    // Calculate current streak
    let streak = 0;
    const sortedRecords = [...records].sort((a, b) => b.date.localeCompare(a.date));
    
    for (const record of sortedRecords) {
      if (record.morning && record.night) {
        streak++;
      } else {
        break;
      }
    }
    setCurrentStreak(streak);
  }, [records]);

  const today = new Date().toDateString();
  const todayRecord = records.find(r => r.date === today);

  const getLastSevenDays = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    return days;
  };

  const getDayRecord = (date: Date) => {
    return records.find(r => r.date === date.toDateString());
  };

  return (
    <Card className="p-5 md:p-8 bg-card/80 backdrop-blur-sm border-2 border-accent/30 shadow-fun animate-pop-in relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-yellow/20 rounded-full blur-2xl animate-blob" />
      <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-purple/20 rounded-full blur-2xl animate-blob" style={{ animationDelay: '3s' }} />
      
      <div className="relative space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Calendar className="w-7 h-7 md:w-8 md:h-8 text-accent" />
            <h2 className="text-2xl md:text-4xl font-lilita text-foreground">
              Brushing Chart
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-celebration rounded-full shadow-fun">
            <span className="text-lg md:text-xl font-nunito font-bold text-primary-foreground">
              🔥 {currentStreak} day streak!
            </span>
          </div>
        </div>

        {/* Today's Progress */}
        <Card className="p-5 md:p-6 bg-card border-2 border-primary/20 shadow-primary relative overflow-hidden">
          <div className="absolute -top-8 right-5 w-20 h-20 bg-primary/15 rounded-full blur-xl" />
          
          <h3 className="text-xl md:text-2xl font-lilita mb-5 text-center text-foreground relative">Today's Brushing</h3>
          <div className="flex justify-center gap-8 md:gap-12 relative">
            <div className="text-center">
              <div className="mb-3">
                <img src={morningSun} alt="Morning" className="w-14 h-14 md:w-16 md:h-16 mx-auto drop-shadow-md animate-float" />
              </div>
              <div className="mb-3 text-lg font-nunito font-bold text-muted-foreground">Morning</div>
              {todayRecord?.morning ? (
                <div className="flex justify-center">
                  <img src={happyToothSticker} alt="Happy Tooth" className="w-14 h-14 md:w-16 md:h-16 animate-celebrate drop-shadow-lg" />
                </div>
              ) : (
                <Button 
                  variant="morning" 
                  size="lg"
                  onClick={() => onAddSticker('morning')}
                  className="animate-pulse-glow"
                >
                  Add Sticker!
                </Button>
              )}
            </div>

            <div className="text-center">
              <div className="mb-3">
                <img src={nightMoon} alt="Night" className="w-14 h-14 md:w-16 md:h-16 mx-auto drop-shadow-md animate-float" style={{ animationDelay: '1s' }} />
              </div>
              <div className="mb-3 text-lg font-nunito font-bold text-muted-foreground">Night</div>
              {todayRecord?.night ? (
                <div className="flex justify-center">
                  <img src={happyToothSticker} alt="Happy Tooth" className="w-14 h-14 md:w-16 md:h-16 animate-celebrate drop-shadow-lg" />
                </div>
              ) : (
                <Button 
                  variant="night" 
                  size="lg"
                  onClick={() => onAddSticker('night')}
                  className="animate-pulse-glow"
                >
                  Add Sticker!
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Weekly Progress */}
        <div>
          <h3 className="text-xl md:text-2xl font-lilita mb-4 text-center text-foreground">This Week</h3>
          <div className="grid grid-cols-7 gap-1.5 md:gap-3">
            {getLastSevenDays().map((date, index) => {
              const record = getDayRecord(date);
              const dayName = date.toLocaleDateString('en', { weekday: 'short' });
              const isToday = date.toDateString() === today;
              
              return (
                <div 
                  key={index} 
                  className={`p-2 md:p-4 rounded-2xl text-center transition-all duration-300 ${
                    isToday 
                      ? 'bg-gradient-bubbly border-2 border-primary shadow-primary scale-105' 
                      : 'bg-card/60 border-2 border-border hover:scale-105'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="text-xs md:text-sm font-nunito font-bold mb-2 text-muted-foreground">{dayName}</div>
                  <div className="space-y-1.5">
                    <div className="h-6 md:h-8 flex justify-center items-center">
                      {record?.morning ? (
                        <img src={happyToothSticker} alt="Morning done" className="w-5 h-5 md:w-7 md:h-7 animate-pop-in drop-shadow" />
                      ) : (
                        <img src={morningSun} alt="Morning" className="w-5 h-5 md:w-7 md:h-7 opacity-25" />
                      )}
                    </div>
                    <div className="h-6 md:h-8 flex justify-center items-center">
                      {record?.night ? (
                        <img src={happyToothSticker} alt="Night done" className="w-5 h-5 md:w-7 md:h-7 animate-pop-in drop-shadow" />
                      ) : (
                        <img src={nightMoon} alt="Night" className="w-5 h-5 md:w-7 md:h-7 opacity-25" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        {currentStreak >= 3 && (
          <Card className="p-5 bg-gradient-celebration border-0 shadow-glow animate-slide-up relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 rounded-full blur-xl" />
            
            <div className="relative flex items-center justify-center gap-3">
              <Trophy className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground animate-jiggle" />
              <div className="text-center">
                <div className="text-xl md:text-2xl font-lilita text-primary-foreground mb-1">Amazing!</div>
                <div className="text-base md:text-lg font-nunito text-primary-foreground/90">
                  {currentStreak >= 7 ? "You're a Brushing Champion! 🌟" : 
                   currentStreak >= 5 ? "You're on fire! Keep it up! 🔥" : 
                   "Great job staying consistent! 💪"}
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Card>
  );
};