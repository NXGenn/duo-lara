import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import DisplayTechIcons from "./DisplayTechIcons";
import { Calendar, Star } from "lucide-react";

import { cn, getRandomInterviewCover } from "@/lib/utils";
import { getFeedbackByInterviewId } from "@/lib/actions/general.action";

interface InterviewCardProps {
  interviewId: string;
  userId?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt: string;
}

const InterviewCard = async ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback =
    userId && interviewId
      ? await getFeedbackByInterviewId({ interviewId, userId })
      : null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const badgeVariants = {
    Behavioral: "bg-yellow-500/90 text-yellow-50 shadow-yellow-500/25",
    Mixed: "bg-purple-500/90 text-purple-50 shadow-purple-500/25",
    Technical: "bg-green-500/90 text-green-50 shadow-green-500/25",
  };

  const badgeStyle =
    badgeVariants[normalizedType as keyof typeof badgeVariants] ||
    "bg-slate-500/90 text-slate-50";

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <Card className="relative w-[360px] max-sm:w-full min-h-96 border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
      {/* Gradient overlay for subtle depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Type Badge */}
      <div
        className={cn(
          "absolute top-0 right-0 rounded-bl-xl px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-sm z-10 border border-white/10",
          badgeStyle
        )}
      >
        {normalizedType}
      </div>

      <CardContent className="flex flex-col justify-between h-full gap-6 p-6 relative z-10">
        {/* Top: Avatar + Title */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <Image
              src={getRandomInterviewCover()}
              alt="interview cover"
              width={80}
              height={80}
              className="rounded-full object-cover border-2 border-slate-600 shadow-lg ring-2 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all duration-300"
              priority={false}
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white capitalize leading-snug">
              {role} Interview
            </h3>

            <div className="flex items-center justify-center gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="font-medium text-white">
                  {feedback?.totalScore || "---"}/100
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback or Message */}
        <div className="flex-1 flex items-center justify-center px-2">
          <p className="text-sm text-slate-300 text-center leading-relaxed line-clamp-3">
            {feedback?.finalAssessment ||
              "You haven't taken this interview yet. Take it now to improve your skills."}
          </p>
        </div>

        {/* Footer: Stack + Button */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5 max-w-[65%]">
            <DisplayTechIcons techStack={techstack} />
          </div>

          <Link
            href={
              feedback
                ? `/interview/${interviewId}/feedback`
                : `/interview/${interviewId}`
            }
            className="ml-2"
          >
            <Button className="rounded-lg px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-105 border border-white/10">
              {feedback ? "Check Feedback" : "View Interview"}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewCard;
