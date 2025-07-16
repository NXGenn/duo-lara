"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.log("Error:", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      console.log("handleGenerateFeedback");

      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId!,
        userId: userId!,
        transcript: messages,
        feedbackId,
      });

      if (success && id) {
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        console.log("Error saving feedback");
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          username: userName,
          userid: userId,
        },
      });
    } else {
      let formattedQuestions = "";
      if (questions) {
        formattedQuestions = questions
          .map((question) => `- ${question}`)
          .join("\n");
      }

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
      });
    }
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Interview Session
          </h1>
          <p className="text-gray-300 text-lg">
            {callStatus === CallStatus.ACTIVE
              ? "Interview in progress..."
              : "Ready to begin your interview"}
          </p>
        </div>

        {/* Video Call Interface */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* AI Interviewer Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300">
              <div className="relative mb-6">
                <div
                  className={cn(
                    "w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-1 transition-all duration-500",
                    isSpeaking && "animate-pulse ring-4 ring-purple-400/50"
                  )}
                >
                  <div className="w-full h-full bg-white/10 rounded-full flex items-center justify-center">
                    <Image
                      src="/ai-avatar.png"
                      alt="AI Interviewer"
                      width={65}
                      height={54}
                      className="object-cover rounded-full"
                    />
                  </div>
                </div>
                {isSpeaking && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-2 border-purple-400 rounded-full animate-ping opacity-30"></div>
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                AI Interviewer
              </h3>
              <div className="flex items-center justify-center space-x-2">
                <div
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    callStatus === CallStatus.ACTIVE
                      ? "bg-green-400 animate-pulse"
                      : "bg-gray-400"
                  )}
                ></div>
                <span className="text-sm text-gray-300">
                  {callStatus === CallStatus.ACTIVE ? "Active" : "Waiting"}
                </span>
              </div>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300">
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-purple-400 p-1">
                  <div className="w-full h-full bg-white/10 rounded-full flex items-center justify-center">
                    <Image
                      src="/user-avatar.png"
                      alt="User Profile"
                      width={120}
                      height={120}
                      className="rounded-full object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                {userName}
              </h3>
              <div className="flex items-center justify-center space-x-2">
                <div
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    callStatus === CallStatus.ACTIVE
                      ? "bg-green-400 animate-pulse"
                      : "bg-gray-400"
                  )}
                ></div>
                <span className="text-sm text-gray-300">
                  {callStatus === CallStatus.ACTIVE ? "Connected" : "Ready"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Transcript */}
        {messages.length > 0 && (
          <div className="mb-8">
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-3"></div>
                <span className="text-sm text-gray-300 uppercase tracking-wide">
                  Live Transcript
                </span>
              </div>
              <div className="bg-white/5 rounded-lg p-4 min-h-[80px] flex items-center">
                <p
                  key={lastMessage}
                  className={cn(
                    "text-white text-lg leading-relaxed transition-all duration-500 opacity-0",
                    "animate-fadeIn opacity-100"
                  )}
                >
                  {lastMessage}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Control Panel */}
        <div className="flex justify-center">
          {callStatus !== "ACTIVE" ? (
            <button
              className="group relative px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
              onClick={() => handleCall()}
              disabled={callStatus === CallStatus.CONNECTING}
            >
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                )}
              ></div>

              {callStatus === CallStatus.CONNECTING && (
                <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>
              )}

              <span className="relative flex items-center space-x-2">
                {callStatus === CallStatus.CONNECTING ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>Start Interview</span>
                  </>
                )}
              </span>
            </button>
          ) : (
            <button
              className="group relative px-12 py-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              onClick={() => handleDisconnect()}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="relative flex items-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>End Interview</span>
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Agent;
