import Image from "next/image";
import { redirect } from "next/navigation";

import Agent from "@/components/Agent";
import { getRandomInterviewCover } from "@/lib/utils";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import DisplayTechIcons from "@/components/DisplayTechIcons";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border border-muted-foreground/10 bg-muted/40 rounded-xl p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={48}
              height={48}
              className="rounded-full object-cover size-12"
            />
            <h3 className="text-xl font-semibold capitalize">
              {interview.role} Interview
            </h3>
          </div>
          <DisplayTechIcons techStack={interview.techstack} />
        </div>

        <div className="shrink-0">
          <p className="text-sm font-medium bg-dark-200/70 px-4 py-2 rounded-md text-muted-foreground whitespace-nowrap">
            {interview.type}
          </p>
        </div>
      </div>

      {/* Agent Component */}
      <Agent
        userName={user?.name!}
        userId={user?.id}
        interviewId={id}
        type="interview"
        questions={interview.questions}
        feedbackId={feedback?.id}
      />
    </div>
  );
};

export default InterviewDetails;
