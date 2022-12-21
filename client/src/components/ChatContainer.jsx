import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components'
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import axios from "axios";
import {getMessagesRoute, sendMessageRoute} from "../utils/APIRoutes";
import {v4 as uuid4} from 'uuid'

const ChatContainer = ({currentChat, currentUser, socket}) => {

    const [messages, setMessages] = useState([])

    const [arrivalMessage, setArrivalMessages] = useState(null)

    const scrollRef = useRef()

    const handleSendMessage = async (message) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message
        })
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            message
        })

        const msgs = [...messages]
        msgs.push({fromSelf: true, message})
        setMessages(msgs)
    }

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                console.log({msg})
                setArrivalMessages({fromSelf: false, message: msg})
            })
        }
    }, [])

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    useEffect(() => {
        const foo = async () => {
            if (currentChat) {
                const res = await axios.post(getMessagesRoute, {
                    from: currentUser._id,
                    to: currentChat._id
                })
                setMessages(res.data)
                console.log(messages)
            }
        }
        foo()
    }, [currentChat])

    return (
        <>
            {
                currentChat &&
                <Container>
                    <div className="chatHeader">
                        <div className="userDetails">
                            <div className="avatar">
                                <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="curr"/>
                            </div>
                            <div className="userName">
                                <h3>{currentChat.userName}</h3>
                            </div>
                        </div>
                        <Logout/>
                    </div>
                    {/*<Messages/>*/}
                    <div className="chatMessages">
                        {messages.map((message) => {
                            return (
                                <div ref={scrollRef} key={uuid4()}>
                                    <div className={`message ${message.fromSelf ? 'sent' : 'received'}`}>
                                        <div className="content">
                                            <p>
                                                {message.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <ChatInput handleSendMessage={handleSendMessage}/>
                </Container>
            }
        </>
    );
};

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and(min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }

  .chatHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;

    .userDetails {
      display: flex;
      align-items: center;
      gap: 1rem;

      .avatar {
        img {
          height: 3rem;
        }
      }

      .userName {
        h3 {
          color: white;
        }
      }
    }
  }

  .chatMessages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;

    .message {
      display: flex;
      align-items: center;

      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }

    .sent {
      justify-content: flex-end;

      .content {
        background-color: #4f04ff21;
      }
    }

    .received {
      justify-content: flex-start;

      .content {
        background-color: #9900ff20;
      }
    }
  }

`;
export default ChatContainer;