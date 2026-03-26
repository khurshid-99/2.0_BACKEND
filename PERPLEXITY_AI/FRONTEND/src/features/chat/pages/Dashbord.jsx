import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { useChat } from "../hooks/useChat";
import { useEffect, useRef, useState } from "react";

const Dashbord = () => {
  const chat = useChat();

  const [text, setText] = useState(null);
  const inputRef = useRef(null);
  const { user, loading } = useSelector((state) => state.auth);

  console.log(user);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  useEffect(() => {
    chat.initializeSocketConnection();
  }, []);

  const handleInput = () => {
    inputRef.current.style.height = "auto";
    inputRef.current.style.height = inputRef.current.scrollHeight + "px";
  };

  return (
    <main className="w-full h-screen flex">
      <aside className="h-screen hidden lg:inline-block w-[clamp(20rem,20vw,40rem)] bg-[#1E1F20] px-4 py-4 ">
        left
      </aside>
      <aside className="w-full h-screen overflow-hidden pt-4 px-8 mx-auto relative ">
        <nav className="flex items-center justify-between">
          <div>left</div>
          <div>right</div>
        </nav>
        <div className="w-full h-screen overflow-y-auto">
          <div className="w-[40vw] pb-[20rem] mx-auto overflow-y-auto  ">
            {/* chats */}
            <div className="">
              {/* user */}
              <div className="text-end flex justify-end ">
                <p className="w-fit bg-[#282A2C] px-4 py-5 rounded-es-full rounded-ee-full rounded-l-full text-[1.5rem] ">
                  hi
                </p>
              </div>

              {/* ai */}
              <div className="text-start ">
                <p className="text-[1.4rem] ">hello</p>
              </div>
            </div>
            <div className="">
              {/* user */}
              <div className="text-end flex justify-end ">
                <p className="w-fit bg-[#282A2C] px-4 py-5 rounded-es-full rounded-ee-full rounded-l-full text-[1.5rem] ">
                  hi
                </p>
              </div>

              {/* ai */}
              <div className="text-start ">
                <p className="text-[1.4rem] ">hello</p>
              </div>
            </div>
            <div className="">
              {/* user */}
              <div className="text-end flex justify-end ">
                <p className="w-fit bg-[#282A2C] px-4 py-5 rounded-es-full rounded-ee-full rounded-l-full text-[1.5rem] ">
                  hi
                </p>
              </div>

              {/* ai */}
              <div className="text-start ">
                <p className="text-[1.4rem] ">hello</p>
              </div>
            </div>
            <div className="">
              {/* user */}
              <div className="text-end flex justify-end ">
                <p className="w-fit bg-[#282A2C] px-4 py-5 rounded-es-full rounded-ee-full rounded-l-full text-[1.5rem] ">
                  hi
                </p>
              </div>

              {/* ai */}
              <div className="text-start ">
                <p className="text-[1.4rem] ">hello</p>
              </div>
            </div>
            <div className="">
              {/* user */}
              <div className="text-end flex justify-end ">
                <p className="w-fit bg-[#282A2C] px-4 py-5 rounded-es-full rounded-ee-full rounded-l-full text-[1.5rem] ">
                  hi
                </p>
              </div>

              {/* ai */}
              <div className="text-start ">
                <p className="text-[1.4rem] ">hello</p>
              </div>
            </div>
            <div className="">
              {/* user */}
              <div className="text-end flex justify-end ">
                <p className="w-fit bg-[#282A2C] px-4 py-5 rounded-es-full rounded-ee-full rounded-l-full text-[1.5rem] ">
                  hi
                </p>
              </div>

              {/* ai */}
              <div className="text-start ">
                <p className="text-[1.4rem] ">hello</p>
              </div>
            </div>
            <div className="">
              {/* user */}
              <div className="text-end flex justify-end ">
                <p className="w-fit bg-[#282A2C] px-4 py-5 rounded-es-full rounded-ee-full rounded-l-full text-[1.5rem] ">
                  hi
                </p>
              </div>

              {/* ai */}
              <div className="text-start ">
                <p className="text-[1.4rem] ">hello</p>
              </div>
            </div>
            <div className="">
              {/* user */}
              <div className="text-end flex justify-end ">
                <p className="w-fit bg-[#282A2C] px-4 py-5 rounded-es-full rounded-ee-full rounded-l-full text-[1.5rem] ">
                  hi
                </p>
              </div>

              {/* ai */}
              <div className="text-start ">
                <p className="text-[1.4rem] ">hello</p>
              </div>
            </div>
            <div className="">
              {/* user */}
              <div className="text-end flex justify-end ">
                <p className="w-fit bg-[#282A2C] px-4 py-5 rounded-es-full rounded-ee-full rounded-l-full text-[1.5rem] ">
                  hi
                </p>
              </div>

              {/* ai */}
              <div className="text-start ">
                <p className="text-[1.4rem] ">hello</p>
              </div>
            </div>
            <div className="">
              {/* user */}
              <div className="text-end flex justify-end ">
                <p className="w-fit bg-[#282A2C] px-4 py-5 rounded-es-full rounded-ee-full rounded-l-full text-[1.5rem] ">
                  hi
                </p>
              </div>

              {/* ai */}
              <div className="text-start ">
                <p className="text-[1.4rem] ">hello</p>
              </div>
            </div>
            <div className="">
              {/* user */}
              <div className="text-end flex justify-end ">
                <p className="w-fit bg-[#282A2C] px-4 py-5 rounded-es-full rounded-ee-full rounded-l-full text-[1.5rem] ">
                  hi
                </p>
              </div>

              {/* ai */}
              <div className="text-start ">
                <p className="text-[1.4rem] ">hello</p>
              </div>
            </div>
            <div className="">
              {/* user */}
              <div className="text-end flex justify-end ">
                <p className="w-fit bg-[#282A2C] px-4 py-5 rounded-es-full rounded-ee-full rounded-l-full text-[1.5rem] ">
                  hi
                </p>
              </div>

              {/* ai */}
              <div className="text-start ">
                <p className="text-[1.4rem] ">hello</p>
              </div>
            </div>
            <div className="">
              {/* user */}
              <div className="text-end flex justify-end ">
                <p className="w-fit bg-[#282A2C] px-4 py-5 rounded-es-full rounded-ee-full rounded-l-full text-[1.5rem] ">
                  hi
                </p>
              </div>

              {/* ai */}
              <div className="text-start ">
                <p className="text-[1.4rem] ">hello</p>
              </div>
            </div>
            <div className="">
              {/* user */}
              <div className="text-end flex justify-end ">
                <p className="w-fit bg-[#282A2C] px-4 py-5 rounded-es-full rounded-ee-full rounded-l-full text-[1.5rem] ">
                  hi
                </p>
              </div>

              {/* ai */}
              <div className="text-start ">
                <p className="text-[1.4rem] ">hello</p>
              </div>
            </div>
            <div className="">
              {/* user */}
              <div className="text-end flex justify-end ">
                <p className="w-fit bg-[#282A2C] px-4 py-5 rounded-es-full rounded-ee-full rounded-l-full text-[1.5rem] ">
                  hi
                </p>
              </div>

              {/* ai */}
              <div className="text-start ">
                <p className="text-[1.4rem] ">hello</p>
              </div>
            </div>

            {/* input */}
            <div className="w-[40vw] fixed bottom-20 mx-auto ">
              <div
                className="w-full h-fit bg-[#1E1F20] px-4 py-4 rounded 
               "
              >
                <textarea
                  ref={inputRef}
                  onInput={handleInput}
                  placeholder="Ask Me..."
                  className="border-none outline-none text-white w-full resize-none overflow-hidden"
                  rows={1}
                />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
};

export default Dashbord;
