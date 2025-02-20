import React, { useState } from "react";
import { MessageSquare, Search, Send, Star, Trash2, User, Mail, Archive, AlertCircle } from "lucide-react";
import { Pagination } from "../components/Pagination";
interface Message {
  id: string;
  sender: string;
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  folder: "inbox" | "sent" | "archived" | "trash";
}
export const Communication = () => {
  const [activeFolder, setActiveFolder] = useState<"inbox" | "sent" | "archived" | "trash">("inbox");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [composing, setComposing] = useState(false);
  const messages: Message[] = [{
    id: "1",
    sender: "John Smith",
    subject: "Case Update #123",
    content: "The investigation has been updated with new evidence...",
    timestamp: "2024-01-15T10:30:00",
    isRead: false,
    isStarred: true,
    folder: "inbox"
  }];
  const filteredMessages = messages.filter(message => message.folder === activeFolder && (message.subject.toLowerCase().includes(searchTerm.toLowerCase()) || message.sender.toLowerCase().includes(searchTerm.toLowerCase())));
  const paginatedMessages = filteredMessages.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  return <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Communication</h1>
        <p className="text-gray-500">Internal messaging system</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="grid grid-cols-4 min-h-[600px]">
          <div className="border-r p-4 space-y-4">
            <button onClick={() => setComposing(true)} className="w-full flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <MessageSquare className="h-4 w-4" />
              Compose
            </button>
            <nav className="space-y-1">
              {[{
              label: "Inbox",
              icon: <Mail className="h-4 w-4" />,
              value: "inbox" as const
            }, {
              label: "Sent",
              icon: <Send className="h-4 w-4" />,
              value: "sent" as const
            }, {
              label: "Archived",
              icon: <Archive className="h-4 w-4" />,
              value: "archived" as const
            }, {
              label: "Trash",
              icon: <Trash2 className="h-4 w-4" />,
              value: "trash" as const
            }].map(folder => <button key={folder.value} onClick={() => setActiveFolder(folder.value)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${activeFolder === folder.value ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}>
                  {folder.icon}
                  <span>{folder.label}</span>
                  {folder.value === "inbox" && <span className="ml-auto bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                      3
                    </span>}
                </button>)}
            </nav>
          </div>
          <div className="col-span-3 flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input type="text" placeholder="Search messages..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              {paginatedMessages.map(message => <div key={message.id} onClick={() => setSelectedMessage(message)} className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${!message.isRead ? "bg-blue-50" : ""}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">{message.sender}</p>
                        <p className="text-sm text-gray-500">
                          {message.subject}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                      {message.isStarred && <Star className="h-4 w-4 text-yellow-400 fill-current" />}
                    </div>
                  </div>
                </div>)}
            </div>
            <Pagination currentPage={currentPage} totalItems={filteredMessages.length} pageSize={pageSize} onPageChange={setCurrentPage} onPageSizeChange={setPageSize} />
          </div>
        </div>
      </div>
      {composing && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">New Message</h2>
              <button onClick={() => setComposing(false)} className="text-gray-500 hover:text-gray-700">
                <AlertCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">To</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="Recipient" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="Message subject" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea className="w-full px-4 py-2 border rounded-lg" rows={6} placeholder="Type your message here..." />
              </div>
            </div>
            <div className="flex justify-end gap-4 p-4 border-t">
              <button onClick={() => setComposing(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </div>
          </div>
        </div>}
    </div>;
};