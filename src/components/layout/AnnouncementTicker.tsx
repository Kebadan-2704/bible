import React from "react";
import { Sparkles } from "lucide-react";

export const AnnouncementTicker: React.FC = () => {
  const primaryMessage =
    "Beloved Servants of Jesus Christ ... Please come and Join Us — University of Trinity International (Trinity Church of India Diocese) • Head Quarters: YGM – Bangalore";

  const secondaryMessage =
    "Admin Centres: Trinity • Coimbatore • Chennai • Dandeli • New Delhi • Malaysia • Georgia (USA)";

  const unit = (
    <span className="inline-flex items-center gap-4 whitespace-nowrap px-6 text-xs sm:text-sm font-medium tracking-wide text-gold-200">
      <Sparkles className="w-4 h-4 text-gold-400 shrink-0" aria-hidden="true" />
      <span className="text-white font-semibold">{primaryMessage}</span>
      <span className="text-gold-400" aria-hidden="true">
        ✦
      </span>
      <span className="text-gold-200">{secondaryMessage}</span>
    </span>
  );

  return (
    <div
      role="region"
      aria-label="Institutional Invitation Banner"
      className="tiu-marquee-container bg-[#050E22] border-b border-gold-500/35 text-white overflow-hidden select-none"
    >
      <div className="w-full flex items-center min-h-[38px]">
        <div className="w-full overflow-hidden">
          <div className="tiu-marquee-track motion-reduce:animate-none">
            <div className="flex items-center shrink-0">{unit}</div>
            <div className="flex items-center shrink-0 motion-reduce:hidden" aria-hidden="true">
              {unit}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AnnouncementTicker;
