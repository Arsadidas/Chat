import React, {useState} from 'react';
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'

const ChatInput = ({handleSendMessage}) => {

    const [msg, setMsg] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (event, emojiObject) => {
        let message = msg;
        message += emojiObject.emoji;
        setMsg(message);
    };

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMessage(msg);
            setMsg("");
        }
    };

    return (
        <Container>
            <div className="buttonContainer">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                    {
                        showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>
                    }
                </div>
            </div>
            <form className={'inputContainer'} onSubmit={(e) => sendChat(e)}>
                <input
                    type="text"
                    placeholder={'Type your message here..'}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}/>
                <button className={'submit'}>
                    <IoMdSend/>
                </button>
            </form>
        </Container>
    );
};

const Container = styled.div`
  display: grid;
  grid-template-columns:5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0.2rem 0.2rem 0.3rem;

  .buttonContainer {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;

    .emoji {
      position: relative;

      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }

      .EmojiPickerReact {
        position: absolute;
        top: -505px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9186f3;

        .emojiCategories {
          button {
            filter: contrast(0);
          }
        }

        .epr-emoji-category-label {
          background-color: #080420;
          border: 1px solid lightgray;
        }

        .epr-search {
          background-color: transparent;
          border-color: #9186f3;
        }

        .emojiGroup:before {
          background-color: #080420;
        }

        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;

          &-thumb {
            background-color: #9186f3;
          }
        }
      }
    }
  }

  .inputContainer {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;

    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9186f3;
      }

      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;

      svg {
        font-size: 1.8rem;
        color: white;
      }
    }


  }

`;

export default ChatInput;