import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Dashbord = () => {
  const chat = useChat();
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);

  const { chats, currentChatId, loading } = useSelector((state) => state.chat);

  useEffect(() => {
    chat.initializeSocketConnection();
    chat.handleGetChat();
  }, []);

  const handleInput = () => {
    inputRef.current.style.height = "auto";
    inputRef.current.style.height = inputRef.current.scrollHeight + "px";
  };

  const handleSubmitMessage = (e) => {
    e.preventDefault();

    const trimMessage = inputText.trim();

    if (!trimMessage) return;

    console.log(currentChatId);

    chat.handleSendMessage({
      message: trimMessage,
      chatId: currentChatId,
    });

    setInputText("");
    inputRef.current.style.height = "auto";
  };

  const handleOpenChat = async (chatId) => {
    // console.log(chatId);
    chat.handleGetMessages(chatId, chats);
    // console.log(currentChatId);
  };

  if (loading) {
    console.log("true: Loading");
  } else if (!loading) {
    chats[currentChatId]?.messages.map((chat) => console.log(chat));
  }

  console.log(chats);

  return (
    <main className="w-full h-screen flex">
      <aside className="h-screen hidden lg:inline-block w-[clamp(20rem,20vw,40rem)] bg-[#1E1F20] px-4 py-4 overflow-hidden ">
        <h1 className="text-center text-[2rem]">AI</h1>
        <div className="flex flex-col  gap-y-[1rem] h-screen overflow-y-auto ">
          {chats ? (
            Object.values(chats).map((chat, index) => (
              <h2
                key={index}
                onClick={() => handleOpenChat(chat.id)}
                className="px-6 py-2 shrink-0 text-[1.5rem] text-nowrap overflow-hidden  bg-[#ffffff33] rounded-full border border-transparent opacity-50 active:opacity-100 hover:border-white duration-300 cursor-pointer "
              >
                {chat.title}
              </h2>
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </aside>
      <aside className="w-full h-screen overflow-hidden pt-4 px-8 mx-auto relative ">
        <nav className="flex items-center justify-between">
          <div>left</div>
          <div>right</div>
        </nav>
        <div className="w-full h-screen overflow-y-auto">
          <div className="w-[40vw] pb-[20rem] mx-auto overflow-y-auto  ">
            <div className="messages flex-1 space-y-3 overflow-y-auto pr-1 pb-30">
              {loading ? (
                <div className="w-full h-screen flex items-center justify-center">
                  <h1 className="text-center ">Loading...</h1>
                </div>
              ) : (
                chats[currentChatId]?.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`max-w-[82%] w-fit rounded-2xl px-4 py-3 text-[4rem] md:text-base ${
                      message.role === "user"
                        ? "ml-auto rounded-br-none bg-white/12 text-white"
                        : "mr-auto border-none text-white/90"
                    }`}
                  >
                    {message.role === "user" ? (
                      <p>{message.content}</p>
                    ) : (
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0 text-2xl">
                              {children}
                            </p>
                          ),
                          ul: ({ children }) => (
                            <ul className="mb-2 list-disc pl-5 text-[1.2rem] ">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="mb-2 list-decimal pl-5">
                              {children}
                            </ol>
                          ),
                          code: ({ children }) => (
                            <code className="rounded bg-[#03030a] px-1 py-0.5 text-[1.2rem] text-[#8200ce] ">
                              {children}
                            </code>
                          ),
                          pre: ({ children }) => (
                            <pre className="mb-2 overflow-x-auto rounded-xl bg-black/30 p-3">
                              {children}
                            </pre>
                          ),
                        }}
                        remarkPlugins={[remarkGfm]}
                      >
                        {message.content}
                      </ReactMarkdown>
                    )}
                  </div>
                ))
              )}
            </div>
            {/* input */}
            <div className="w-[40vw] fixed bottom-20 mx-auto ">
              <form
                onSubmit={handleSubmitMessage}
                className="w-full h-fit bg-[#1E1F20] px-4 py-4 rounded flex justify-between items-end 
               "
              >
                <textarea
                  ref={inputRef}
                  onInput={handleInput}
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                  }}
                  placeholder="Ask Me..."
                  className="border-none outline-none text-white w-full resize-none overflow-hidden"
                  rows={1}
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="px-8 py-2 rounded-full bg-[white] text-[black] text-[1.2rem] font-semibold "
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
};

export default Dashbord;
//
