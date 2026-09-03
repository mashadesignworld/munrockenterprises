"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export default function FloatingWhatsApp({
  phoneNumber = "254715558499", // Replace with your actual WhatsApp business phone number
  defaultMessage = "Hello! I am inquiring about importing a vehicle through Munrock Enterprises.",
}: FloatingWhatsAppProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const textToSend = customMessage.trim() || defaultMessage;
    const encodedMessage = encodeURIComponent(textToSend);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
    setCustomMessage("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* ========== WHATSAPP CHAT POPUP BOX ========== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto mb-4 w-80 sm:w-88 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#0A2540] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                    <MessageCircle className="w-6 h-6 fill-current" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#0A2540] rounded-full" />
                </div>
                <div>
                  <h4 className="text-sm font-black tracking-wide">Munrock Support</h4>
                  <p className="text-[11px] text-slate-300 font-medium">
                    Typically replies in minutes
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1"
                aria-label="Close chat window"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-slate-50 space-y-3">
              <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm text-xs text-slate-700 leading-relaxed">
                👋 Hi there! Looking for a specific car or need help with Mombasa customs clearance? Chat with our team now!
              </div>
            </div>

            {/* Input & Form */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
              <input
                type="text"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Ask about a car..."
                className="flex-1 bg-slate-100 text-xs text-[#0A2540] placeholder-slate-400 font-medium rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#F26522]"
              />
              <button
                type="submit"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-2.5 rounded-full transition-all shadow-md shrink-0"
                aria-label="Send WhatsApp message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== FLOATING TRIGGER BUTTON ========== */}
      <div className="pointer-events-auto flex items-center gap-3">
        {/* Tooltip Label (Visible when closed) */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:block bg-[#0A2540] text-white text-xs font-extrabold py-2 px-3.5 rounded-xl shadow-lg border border-slate-700/50"
          >
            Need Help? Chat with us!
          </motion.div>
        )}

        {/* Floating Action Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-colors"
          aria-label="Open WhatsApp Chat"
        >
          {/* Subtle pulse ring animation */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
          
          {isOpen ? (
            <X className="w-7 h-7 relative z-10" />
          ) : (
            <MessageCircle className="w-7 h-7 fill-current relative z-10" />
          )}
        </motion.button>
      </div>
    </div>
  );
}