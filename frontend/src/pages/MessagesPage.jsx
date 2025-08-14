import { useState } from "react";

const mockProfiles = [
  { id: 1, name: "Fatima Ali", lastMsg: "Hey! How are you?", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
  { id: 2, name: "Ali Raza", lastMsg: "Let's meet tomorrow", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
  { id: 3, name: "Ayesha Khan", lastMsg: "Thanks for your help!", avatar: "https://randomuser.me/api/portraits/women/21.jpg" },
];

const mockMessages = [
  { id: 1, sender: "them", text: "Hey! How are you?" },
  { id: 2, sender: "me", text: "I'm good! How about you?" },
  { id: 3, sender: "them", text: "Doing great, thanks!" },
];

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState(mockMessages);
  const [newMsg, setNewMsg] = useState("");

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "me", text: newMsg }]);
    setNewMsg("");
  };

  return (
    <div className="h-screen flex bg-white mt-16 px-6 gap-6">
      {/* Sidebar */}
      <div className="w-72 backdrop-blur-lg bg-slate-50 shadow border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Messages</h2>
        <div className="space-y-3">
          {mockProfiles.map((profile) => (
            <div
              key={profile.id}
              onClick={() => setSelectedChat(profile)}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-white/40 transition ${
                selectedChat?.id === profile.id ? "bg-white/60" : ""
              }`}
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-10 h-10 rounded-full border"
              />
              <div>
                <p className="font-medium">{profile.name}</p>
                <p className="text-sm text-gray-600 truncate">{profile.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white rounded-lg shadow border">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-4 border-b bg-white rounded-t-lg">
              <img
                src={selectedChat.avatar}
                alt={selectedChat.name}
                className="w-10 h-10 rounded-full"
              />
              <h3 className="font-semibold">{selectedChat.name}</h3>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-xs ${
                      msg.sender === "me"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t bg-white flex gap-2 rounded-b-lg">
              <input
                type="text"
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 rounded-lg">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
